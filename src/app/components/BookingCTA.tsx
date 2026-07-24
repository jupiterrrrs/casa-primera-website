import { motion, AnimatePresence } from "motion/react";
import { CalendarDays, Phone, Mail, ChevronLeft, ChevronRight, X, Users, CheckCircle, Check, Ban } from "lucide-react";
import { useState, useEffect } from "react";
import { DayPicker, DateRange } from "react-day-picker";
import { format, differenceInCalendarDays, isWithinInterval, addDays } from "date-fns";
import { TermsModal } from "./TermsModal";
import { villas as ratedVillas } from "./VillaShowcase";
import "react-day-picker/dist/style.css";

// Google Apps Script webhook: creates a Calendar event + emails sales@casaprimeravilla.com
const BOOKING_WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbwMFqNUZKecSv_DfshldTLIRn9cEHYNup3nZdWdrFNnb0ifRcYLJM33_feoVEdBReBQ7g/exec";

// Static villa info — this doesn't change, so it stays hardcoded.
// "blocked" starts empty; it's filled in live from Google Calendar (see
// useVillaAvailability below) once the page loads.
const VILLA_META = [
  { label: "Casa Primera Villa 1", short: "Villa 1", pax: 34, price: 18000, tag: "Pioneer" },
  { label: "Casa Primera Villa 2", short: "Villa 2", pax: 40, price: 18000, tag: "Family" },
  { label: "Casa Primera Villa 3", short: "Villa 3", pax: 50, price: 18000, tag: "Garden" },
  { label: "Casa Primera Villa 4", short: "Villa 4", pax: 40, price: 21000, tag: "Mountain View" },
  { label: "Casa Primera Villa 5", short: "Villa 5", pax: 34, price: 21000, tag: "Modern" },
];

type BlockedRange = { from: Date; to: Date };
type Villa = (typeof VILLA_META)[number] & { blocked: BlockedRange[] };

const EMPTY_VILLAS: Villa[] = VILLA_META.map((v) => ({ ...v, blocked: [] }));

// Fetches live booking data from the Casa Primera Apps Script webhook
// (doGet), which reads each villa's Google Calendar and reports back which
// dates are marked "Fully Booked". Falls back to "nothing blocked" if the
// fetch fails, so the booking form still works (just without live data)
// rather than breaking entirely.
function useVillaAvailability() {
  const [villas, setVillas] = useState<Villa[]>(EMPTY_VILLAS);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(BOOKING_WEBHOOK_URL);
        const data = await res.json();
        if (data.status !== "success") throw new Error(data.message || "Unknown error");

        const merged = VILLA_META.map((meta) => {
          const ranges: { from: string; to: string }[] = data.villas?.[meta.label] || [];
          return {
            ...meta,
            blocked: ranges.map((r) => ({ from: new Date(r.from + "T00:00:00"), to: new Date(r.to + "T00:00:00") })),
          };
        });
        if (!cancelled) {
          setVillas(merged);
          setStatus("ready");
        }
      } catch (err) {
        console.error("Failed to load live villa availability:", err);
        if (!cancelled) setStatus("error");
      }
    })();
    return () => { cancelled = true; };
  }, []);

  return { villas, status };
}

function isVillaAvailable(villa: Villa, range: DateRange | undefined): boolean {
  if (!range?.from) return true;
  // Only check the NIGHTS actually being booked: from check-in through the
  // night before checkout. The checkout day itself is a turnover day, not an
  // occupied night — a guest can check out that morning while a different
  // guest checks into the same villa that afternoon, so it must never be
  // compared against other bookings' blocked nights.
  const lastNight = range.to ? addDays(range.to, -1) : range.from;
  for (let d = new Date(range.from); d <= lastNight; d = addDays(d, 1)) {
    if (villa.blocked.some((b) => isWithinInterval(d, { start: b.from, end: b.to }))) {
      return false;
    }
  }
  return true;
}

// Works out the rate tier + room count for a villa based on guest count,
// using the same rate tiers shown on the Villas section of the site.
function computeQuote(villaLabel: string, guestsStr: string) {
  const villaData = ratedVillas.find((v) => v.name === villaLabel);
  if (!villaData) return null;
  const guests = parseInt(guestsStr, 10) || 1;
  const tiers = villaData.rateTiers;

  let tier = tiers[0];
  let extraHeads = 0;
  if (guests <= 10) tier = tiers[0];
  else if (guests <= 15) tier = tiers[1];
  else if (guests <= 20) tier = tiers[2];
  else if (guests <= 25) { tier = tiers[2]; extraHeads = guests - 20; }
  else if (guests <= 30) tier = tiers[3];
  else { tier = tiers[3]; extraHeads = guests - 30; }

  const extraCost = extraHeads * 500;
  return {
    villaName: villaData.name,
    tierLabel: tier.label,
    rooms: tier.rooms,
    basePrice: tier.price,
    extraHeads,
    extraCost,
    total: tier.price + extraCost,
    guests,
  };
}

// ── Calendar modal with inline villa availability ──────────────────────────
function ReservationCalendar({
  range,
  onChange,
  onClose,
  selectedVilla,
  onSelectVilla,
  villas,
  availabilityStatus,
}: {
  range: DateRange | undefined;
  onChange: (r: DateRange | undefined) => void;
  onClose: () => void;
  selectedVilla: string;
  onSelectVilla: (v: string) => void;
  villas: Villa[];
  availabilityStatus: "loading" | "ready" | "error";
}) {
  const nights = range?.from && range?.to ? differenceInCalendarDays(range.to, range.from) : 0;
  const anySelected = !!range?.from;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/55 backdrop-blur-sm" />
      <motion.div
        className="relative rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row w-full sm:w-auto"
        style={{ backgroundColor: "#fff", maxWidth: 820, maxHeight: "92dvh" }}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{ type: "spring", stiffness: 280, damping: 28 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── LEFT: Calendar ── */}
        <div className="flex flex-col lg:w-[340px]" style={{ minWidth: 0, flex: "0 0 auto" }}>
          <div className="flex items-center justify-between px-5 py-4" style={{ backgroundColor: "#45B3C0" }}>
            <div>
              <h3 style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: "1.05rem", color: "#fff" }}>
                Select Stay Dates
              </h3>
              <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.72rem", color: "rgba(255,255,255,0.82)" }}>
                {availabilityStatus === "loading"
                  ? "⏳ Checking live availability…"
                  : availabilityStatus === "error"
                  ? "⚠️ Couldn't load live availability — please confirm by calling us"
                  : "🔴 Crossed-out dates are in the past · check villa status on the right"}
              </p>
            </div>
            <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center transition-colors">
              <X size={15} color="#fff" />
            </button>
          </div>

          <div className="flex-1 flex flex-col justify-center px-3 py-4 lg:py-2 overflow-x-hidden overflow-y-auto">
            <style>{`
              .rdp {
                --rdp-cell-size: clamp(2.3rem, 9vw, 3.1rem);
                --rdp-accent-color: #45B3C0;
                --rdp-background-color: #DCF1F3;
                margin: 0 auto;
                width: 100%;
                max-width: calc(var(--rdp-cell-size) * 7 + 1rem);
                font-family: 'Plus Jakarta Sans', sans-serif;
              }
              .rdp-months { justify-content: center; width: 100%; }
              .rdp-month { width: 100%; margin: 0; }
              .rdp-table { width: 100% !important; max-width: none !important; margin: 0 auto !important; table-layout: fixed !important; border-collapse: collapse !important; }
              .rdp-head_row, .rdp-row { display: table-row !important; }
              .rdp-head_cell, .rdp-cell { display: table-cell !important; width: 14.2857% !important; max-width: none !important; padding: 0 !important; text-align: center !important; }
              .rdp-day { width: var(--rdp-cell-size) !important; max-width: var(--rdp-cell-size) !important; height: var(--rdp-cell-size) !important; margin: 0 auto !important; }
              .rdp-caption { padding: 0 0.15rem; }
              .rdp-nav_button { width: 2.25rem; height: 2.25rem; }
              .rdp-day_selected, .rdp-day_range_start, .rdp-day_range_end { background-color: #45B3C0 !important; color: #fff !important; border-radius: 50% !important; }
              .rdp-day_range_middle { background-color: #DCF1F3 !important; color: #333333 !important; border-radius: 0 !important; }
              .rdp-day:hover:not(.rdp-day_selected):not(.rdp-day_range_middle):not(.rdp-day_disabled) { background-color: #A8DDE3 !important; border-radius: 50% !important; }
              .rdp-day_disabled { color: #e57373 !important; text-decoration: line-through !important; opacity: 0.55 !important; }
              .rdp-caption_label { font-family: 'Fraunces', serif; font-weight: 700; color: #333333; font-size: clamp(0.92rem, 4vw, 1.1rem); }
              .rdp-head_cell { font-family: 'Plus Jakarta Sans', sans-serif; color: #666666; font-size: 0.75rem; font-weight: 600; text-transform: uppercase; }
            `}</style>
            <DayPicker
              mode="range"
              selected={range}
              onSelect={onChange}
              disabled={[{ before: new Date() }]}
              numberOfMonths={1}
              components={{ IconLeft: () => <ChevronLeft size={15} />, IconRight: () => <ChevronRight size={15} /> }}
            />

            {/* Date summary bar */}
            {range?.from && range?.to && (
              <div className="mx-1 mt-4 p-3 rounded-2xl grid grid-cols-3 gap-1 text-center" style={{ backgroundColor: "#DCF1F3" }}>
                <div>
                  <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.65rem", color: "#666666", textTransform: "uppercase", letterSpacing: "0.06em" }}>Check-in</p>
                  <p style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, color: "#333333", fontSize: "0.82rem" }}>{format(range.from, "MMM d, yyyy")}</p>
                  <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.65rem", color: "#333333" }}>3:00 PM</p>
                </div>
                <div style={{ borderLeft: "1px solid #A8DDE3", borderRight: "1px solid #A8DDE3" }}>
                  <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.65rem", color: "#666666", textTransform: "uppercase", letterSpacing: "0.06em" }}>Nights</p>
                  <p style={{ fontFamily: "'Fraunces', serif", fontWeight: 800, color: "#45B3C0", fontSize: "1.3rem", lineHeight: 1 }}>{nights}</p>
                </div>
                <div>
                  <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.65rem", color: "#666666", textTransform: "uppercase", letterSpacing: "0.06em" }}>Check-out</p>
                  <p style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, color: "#333333", fontSize: "0.82rem" }}>{format(range.to, "MMM d, yyyy")}</p>
                  <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.65rem", color: "#333333" }}>12:00 NN</p>
                </div>
              </div>
            )}

            {!range?.from && (
              <p className="text-center mt-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.82rem", color: "#999999" }}>
                👆 Click a date to start selecting
              </p>
            )}
          </div>
        </div>

        {/* ── RIGHT: Villa Availability Panel ── */}
        <div className="flex flex-col border-t lg:border-t-0 lg:border-l overflow-y-auto" style={{ borderColor: "#DCF1F3", flex: 1, minWidth: 0 }}>
          <div className="px-5 py-4 sticky top-0 z-10" style={{ backgroundColor: "#f8fdff", borderBottom: "1px solid #DCF1F3" }}>
            <h4 style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: "1rem", color: "#333333" }}>
              Villa Availability
            </h4>
            <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.75rem", color: "#666666" }}>
              {anySelected
                ? range?.to
                  ? `For ${format(range.from!, "MMM d")} – ${format(range.to, "MMM d, yyyy")}`
                  : `From ${format(range.from!, "MMM d, yyyy")} — pick check-out`
                : "Select dates to see availability"}
            </p>
          </div>

          <div className="px-4 py-3 space-y-2.5">
            {villas.map((villa) => {
              const available = isVillaAvailable(villa, range);
              const isSelected = selectedVilla === villa.label;
              return (
                <button
                  key={villa.label}
                  type="button"
                  disabled={!available || !range?.from}
                  onClick={() => { onSelectVilla(villa.label); onClose(); }}
                  className="w-full text-left rounded-2xl px-4 py-3 transition-all duration-200 border"
                  style={{
                    backgroundColor: isSelected ? "#DCF1F3" : available ? "#fff" : "#fafafa",
                    borderColor: isSelected ? "#45B3C0" : available ? "rgba(69,179,192,0.15)" : "#f0f0f0",
                    opacity: !range?.from ? 0.6 : 1,
                    cursor: !available || !range?.from ? "not-allowed" : "pointer",
                  }}
                >
                  <div className="flex items-center gap-3">
                    {/* Status dot */}
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{
                        backgroundColor: !range?.from
                          ? "#e5e7eb"
                          : available
                          ? "#dcfce7"
                          : "#fee2e2",
                      }}
                    >
                      {!range?.from ? (
                        <CalendarDays size={13} color="#9ca3af" />
                      ) : available ? (
                        <Check size={13} color="#16a34a" strokeWidth={2.5} />
                      ) : (
                        <Ban size={12} color="#dc2626" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.88rem", color: "#333333" }}>
                          {villa.label}
                        </span>
                        <span
                          className="px-2 py-0.5 rounded-full text-xs"
                          style={{
                            backgroundColor: villa.pax >= 100 ? "#EAF7F8" : "#EAF7F8",
                            color: villa.pax >= 100 ? "#333333" : "#333333",
                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                          }}
                        >
                          {villa.tag}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 mt-0.5">
                        <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.75rem", color: "#666666" }}>
                          <Users size={11} className="inline mr-1" />Up to {villa.pax} pax
                        </span>
                        <span style={{ fontFamily: "'Fraunces', serif", fontSize: "0.82rem", fontWeight: 700, color: "#45B3C0" }}>
                          From ₱{villa.price.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Status label */}
                    {range?.from && (
                      <span
                        className="text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0"
                        style={{
                          backgroundColor: available ? "#dcfce7" : "#fee2e2",
                          color: available ? "#16a34a" : "#dc2626",
                          fontFamily: "'Plus Jakarta Sans', sans-serif",
                        }}
                      >
                        {available ? "Available" : "Booked"}
                      </span>
                    )}
                  </div>

                  {isSelected && available && (
                    <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.72rem", color: "#333333", marginTop: "0.4rem", paddingLeft: "2.5rem" }}>
                      ✓ Selected — click Confirm to apply
                    </p>
                  )}
                </button>
              );
            })}
          </div>

          <div className="px-4 py-3 mt-auto sticky bottom-0" style={{ backgroundColor: "#f8fdff", borderTop: "1px solid #DCF1F3" }}>
            <button
              onClick={onClose}
              disabled={!range?.from || !range?.to}
              className="w-full py-3 rounded-full font-semibold text-white transition-all duration-200 hover:opacity-90 disabled:opacity-35 disabled:cursor-not-allowed"
              style={{ backgroundColor: "#45B3C0", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              {range?.from && range?.to ? "Confirm Dates →" : "Select Check-in & Check-out"}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ── Main section ──────────────────────────────────────────────────────────
export function BookingCTA() {
  const { villas: allVillas, status: availabilityStatus } = useVillaAvailability();
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", villa: "", guests: "2" });
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const nights = dateRange?.from && dateRange?.to ? differenceInCalendarDays(dateRange.to, dateRange.from) : 0;
  const quote = formData.villa ? computeQuote(formData.villa, formData.guests) : null;

  const selectedVillaMeta = allVillas.find((v) => v.label === formData.villa);
  const maxGuests = selectedVillaMeta ? selectedVillaMeta.pax : 50;

  // If the selected villa becomes booked for the chosen dates (e.g. the guest
  // changes dates after already picking a villa), drop the now-invalid selection.
  useEffect(() => {
    if (formData.villa && dateRange?.from) {
      const villa = allVillas.find((v) => v.label === formData.villa);
      if (villa && !isVillaAvailable(villa, dateRange)) {
        setFormData((p) => ({ ...p, villa: "" }));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateRange, allVillas]);

  // If the selected villa changes to one with a lower capacity, clamp the
  // guest count so it never exceeds what that villa can actually hold.
  useEffect(() => {
    if (selectedVillaMeta) {
      const guestsNum = parseInt(formData.guests, 10) || 1;
      if (guestsNum > selectedVillaMeta.pax) {
        setFormData((p) => ({ ...p, guests: String(selectedVillaMeta.pax) }));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.villa]);

  const dateLabel = dateRange?.from && dateRange?.to
    ? `${format(dateRange.from, "MMM d")} → ${format(dateRange.to, "MMM d, yyyy")}  (${nights} night${nights !== 1 ? "s" : ""})`
    : dateRange?.from
    ? `${format(dateRange.from, "MMM d, yyyy")} → Pick check-out`
    : "Select check-in & check-out";

  function handleReserveClick(e: React.FormEvent) {
    e.preventDefault();
    setTermsOpen(true);
  }

  function handleAcceptTerms() {
    setTermsOpen(false);
    if (dateRange?.from && dateRange?.to) {
      const checkIn = new Date(dateRange.from); checkIn.setHours(15, 0, 0, 0);
      const checkOut = new Date(dateRange.to); checkOut.setHours(12, 0, 0, 0);

      // Send the booking request to the Casa Primera booking webhook
      // (creates a calendar event + emails sales@casaprimeravilla.com)
      fetch(BOOKING_WEBHOOK_URL, {
        method: "POST",
        mode: "no-cors", // Apps Script web apps don't return CORS headers;
        // "no-cors" lets the request go through, we just can't read the response.
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          villa: formData.villa,
          guests: formData.guests,
          nights,
          checkIn: checkIn.toISOString(),
          checkOut: checkOut.toISOString(),
        }),
      }).catch((err) => {
        // Fails silently for the guest, but logs for debugging.
        console.error("Booking webhook failed:", err);
      });
    }
    setSubmitted(true);
  }

  // Availability summary for selected dates (shown in form)
  const availabilityRows = dateRange?.from
    ? allVillas.map((v) => ({ ...v, available: isVillaAvailable(v, dateRange) }))
    : [];
  const availableCount = availabilityRows.filter((v) => v.available).length;

  return (
    <section id="booking" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0">
        <img src="/images/misc/booking-cta.jpg" alt="Pool" className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(24,64,70,0.88) 0%, rgba(51,51,51,0.85) 100%)" }} />
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left info */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <span className="inline-block px-4 py-1.5 rounded-full text-sm tracking-widest uppercase mb-6" style={{ backgroundColor: "#FFEB3B", color: "#333333", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700 }}>
              Reservations
            </span>
            <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(2.2rem, 4.5vw, 3.2rem)", color: "#fff", fontWeight: 800, lineHeight: 1.2 }} className="mb-6">
              Plan Your Perfect<br /><span style={{ color: "#FFEB3B" }}>Getaway Today</span>
            </h2>
            <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "rgba(255,255,255,0.82)", lineHeight: 1.8, fontSize: "1.05rem" }} className="mb-10">
              Reserve your slice of tropical paradise at Casa Primera. Whether it's a weekend with family or a romantic escape for two, we have the perfect villa waiting for you.
            </p>
            <div className="space-y-5">
              {[
                { icon: Phone, label: "Call Us", value: "Globe: 0917.114.6956 / 0956.836.6100\nSmart: 0919.007.8821 / 0960.381.7151\nLandline: (049) 502-3746" },
                { icon: Mail, label: "Email Us", value: "sales@casaprimeravilla.com" },
                { icon: CalendarDays, label: "Check-in / Check-out", value: "3:00 PM / 12:00 NN" },
                { icon: Users, label: "Guest Capacity", value: "34–50 pax per villa" },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "rgba(69,179,192,0.25)" }}>
                    <Icon size={18} color="#9FE0E6" />
                  </div>
                  <div>
                    <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.78rem", color: "rgba(255,255,255,0.55)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}</p>
                    <p className="whitespace-pre-line" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.95rem", color: "#fff", fontWeight: 500, lineHeight: 1.6 }}>{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15 }}
            className="rounded-3xl p-8 shadow-2xl"
            style={{ backgroundColor: "#fff" }}
          >
            <>
              <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: "1.5rem", color: "#333333", fontWeight: 700 }} className="mb-6">Reserve Now</h3>
              <form onSubmit={handleReserveClick} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.82rem", color: "#4d4d4d", fontWeight: 600 }} className="block mb-1.5">Full Name</label>
                      <input type="text" required placeholder="Juan dela Cruz" value={formData.name}
                        onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                        className="w-full px-4 py-2.5 rounded-xl border outline-none transition-all duration-200 focus:border-[#45B3C0] focus:ring-2 focus:ring-[#45B3C0]/20"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.9rem", borderColor: "#A8DDE3", backgroundColor: "#EAF7F8" }} />
                    </div>
                    <div>
                      <label style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.82rem", color: "#4d4d4d", fontWeight: 600 }} className="block mb-1.5">Phone</label>
                      <input type="tel" required placeholder="+63 9XX XXX XXXX" value={formData.phone}
                        onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
                        className="w-full px-4 py-2.5 rounded-xl border outline-none transition-all duration-200 focus:border-[#45B3C0] focus:ring-2 focus:ring-[#45B3C0]/20"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.9rem", borderColor: "#A8DDE3", backgroundColor: "#EAF7F8" }} />
                    </div>
                  </div>

                  <div>
                    <label style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.82rem", color: "#4d4d4d", fontWeight: 600 }} className="block mb-1.5">Email Address</label>
                    <input type="email" required placeholder="you@email.com" value={formData.email}
                      onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl border outline-none transition-all duration-200 focus:border-[#45B3C0] focus:ring-2 focus:ring-[#45B3C0]/20"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.9rem", borderColor: "#A8DDE3", backgroundColor: "#EAF7F8" }} />
                  </div>

                  {/* Date picker trigger */}
                  <div>
                    <label style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.82rem", color: "#4d4d4d", fontWeight: 600 }} className="block mb-1.5">Stay Dates & Villa Availability</label>
                    <button type="button" onClick={() => setCalendarOpen(true)}
                      className="w-full px-4 py-2.5 rounded-xl border text-left flex items-center gap-3 transition-all duration-200 hover:border-[#45B3C0]"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.9rem", borderColor: dateRange?.from ? "#45B3C0" : "#A8DDE3", backgroundColor: dateRange?.from ? "#DCF1F3" : "#EAF7F8", color: dateRange?.from ? "#333333" : "#999999" }}>
                      <CalendarDays size={16} color={dateRange?.from ? "#45B3C0" : "#999999"} />
                      <span className="flex-1">{dateLabel}</span>
                      {dateRange?.from && (
                        <span style={{ fontSize: "0.75rem", color: "#333333", fontWeight: 600 }}>
                          {availableCount}/{allVillas.length} villas available
                        </span>
                      )}
                    </button>
                    {nights > 0 && (
                      <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.78rem", color: "#333333", marginTop: "4px" }}>
                        ✓ {nights} night{nights !== 1 ? "s" : ""} · Check-in 3PM · Check-out 12NN
                      </p>
                    )}
                  </div>

                  {/* Compact availability list (once dates chosen) */}
                  {availabilityRows.length > 0 && (
                    <div className="rounded-2xl overflow-hidden border" style={{ borderColor: "#DCF1F3" }}>
                      <div className="px-4 py-2 flex items-center justify-between" style={{ backgroundColor: "#EAF7F8" }}>
                        <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.78rem", fontWeight: 700, color: "#333333" }}>All Villa Availability</span>
                        <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.72rem", color: "#666666" }}>Tap to select</span>
                      </div>
                      <div className="divide-y">
                        {availabilityRows.map((v) => (
                          <button
                            key={v.label}
                            type="button"
                            disabled={!v.available}
                            onClick={() => setFormData((p) => ({ ...p, villa: v.label }))}
                            className="w-full px-4 py-2.5 flex items-center gap-3 transition-colors duration-150 text-left"
                            style={{
                              backgroundColor: formData.villa === v.label ? "#DCF1F3" : v.available ? "#fff" : "#fafafa",
                              cursor: v.available ? "pointer" : "not-allowed",
                              borderBottom: "1px solid #EAF7F8",
                            }}
                          >
                            <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                              style={{ backgroundColor: v.available ? "#dcfce7" : "#fee2e2" }}>
                              {v.available ? <Check size={11} color="#16a34a" strokeWidth={2.5} /> : <Ban size={10} color="#dc2626" />}
                            </div>
                            <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.84rem", fontWeight: 600, color: v.available ? "#333333" : "#9ca3af", flex: 1 }}>
                              {v.label}
                            </span>
                            <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.75rem", color: "#999999" }}>
                              Up to {v.pax} pax
                            </span>
                            <span
                              className="text-xs font-semibold px-2 py-0.5 rounded-full"
                              style={{ backgroundColor: v.available ? "#dcfce7" : "#fee2e2", color: v.available ? "#16a34a" : "#dc2626", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                              {v.available ? "✓ Available" : "Booked"}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.82rem", color: "#4d4d4d", fontWeight: 600 }} className="block mb-1.5">Selected Villa</label>
                      <select value={formData.villa} onChange={(e) => setFormData((p) => ({ ...p, villa: e.target.value }))}
                        className="w-full px-4 py-2.5 rounded-xl border outline-none transition-all duration-200 focus:border-[#45B3C0]"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.85rem", borderColor: "#A8DDE3", backgroundColor: "#EAF7F8" }}>
                        <option value="">Any Villa</option>
                        {allVillas.map((v) => {
                          const booked = dateRange?.from ? !isVillaAvailable(v, dateRange) : false;
                          return (
                            <option key={v.label} value={v.label} disabled={booked}>
                              {v.label} (Up to {v.pax} pax){booked ? " — Booked" : ""}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div>
                      <label style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.82rem", color: "#4d4d4d", fontWeight: 600 }} className="block mb-1.5">Guests (Max {maxGuests})</label>
                      <select value={formData.guests} onChange={(e) => setFormData((p) => ({ ...p, guests: e.target.value }))}
                        className="w-full px-4 py-2.5 rounded-xl border outline-none transition-all duration-200 focus:border-[#45B3C0]"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.9rem", borderColor: "#A8DDE3", backgroundColor: "#EAF7F8" }}>
                        {Array.from({ length: maxGuests }, (_, i) => i + 1).map((n) => <option key={n}>{n}</option>)}
                      </select>
                      <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.72rem", color: "#888888", fontStyle: "italic", marginTop: "5px" }}>
                        Note: Children aged 5 and below are not counted, as they stay free of charge.
                      </p>
                    </div>
                  </div>

                  {/* Live rate estimate — only once a specific villa is picked */}
                  {quote && (
                    <div className="rounded-2xl p-4" style={{ backgroundColor: "#DCF1F3", border: "1px solid #A8DDE3" }}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.75rem", color: "#666666", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 700 }}>
                          Estimated Rate
                        </span>
                        <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ backgroundColor: "#45B3C0", color: "#fff", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                          Package {quote.tierLabel}
                        </span>
                      </div>
                      <div className="flex items-baseline gap-1.5">
                        <span style={{ fontFamily: "'Fraunces', serif", fontSize: "1.65rem", fontWeight: 800, color: "#333333" }}>
                          ₱{quote.total.toLocaleString()}
                        </span>
                        <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.8rem", color: "#666666" }}>/ night</span>
                      </div>
                      {nights > 0 && (
                        <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.84rem", color: "#333333", marginTop: "2px" }}>
                          × {nights} night{nights !== 1 ? "s" : ""} = <strong>₱{(quote.total * nights).toLocaleString()}</strong> total
                        </p>
                      )}
                      {quote.extraHeads > 0 && (
                        <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.78rem", color: "#c0392b", marginTop: "4px" }}>
                          Includes +₱{quote.extraCost.toLocaleString()} extra-pax surcharge ({quote.extraHeads} head{quote.extraHeads !== 1 ? "s" : ""} × ₱500)
                        </p>
                      )}
                      <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.8rem", color: "#666666", marginTop: "5px" }}>
                        🛏 {quote.rooms} included in this package
                      </p>
                    </div>
                  )}

                  <button type="submit"
                    className="w-full py-4 rounded-full font-bold transition-all duration-300 hover:opacity-90 hover:scale-[1.02] hover:shadow-lg mt-2"
                    style={{ backgroundColor: "#FFEB3B", color: "#333333", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "1rem" }}>
                    Reserve Now — View T&C →
                  </button>
                  <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.75rem", color: "#999999", textAlign: "center" }}>
                    Terms & Conditions shown before final confirmation
                  </p>
                </form>
              </>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {calendarOpen && (
          <ReservationCalendar
            range={dateRange}
            onChange={setDateRange}
            onClose={() => setCalendarOpen(false)}
            selectedVilla={formData.villa}
            onSelectVilla={(v) => setFormData((p) => ({ ...p, villa: v }))}
            villas={allVillas}
            availabilityStatus={availabilityStatus}
          />
        )}
        {termsOpen && (
          <TermsModal
            onAccept={handleAcceptTerms}
            onClose={() => setTermsOpen(false)}
            villa={formData.villa}
            guests={formData.guests}
            dateRange={dateRange}
            nights={nights}
            quote={quote}
          />
        )}
        {submitted && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4" onClick={() => setSubmitted(false)}>
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div
              className="relative w-full max-w-sm rounded-3xl shadow-2xl p-7 text-center"
              style={{ backgroundColor: "#fff" }}
              initial={{ opacity: 0, scale: 0.92, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ type: "spring", stiffness: 300, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSubmitted(false)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-gray-100"
                aria-label="Close"
              >
                <X size={16} color="#999999" />
              </button>
              <CheckCircle className="mx-auto mb-3" size={46} color="#16a34a" />
              <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: "1.25rem", fontWeight: 700, color: "#333333" }} className="mb-2">
                Reservation Received!
              </h3>
              <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.9rem", color: "#4d4d4d", lineHeight: 1.65 }}>
                Your reservation request has been received. Thank you for choosing Casa Primera! Please expect an email within 24 hours containing our Terms and Conditions, bank details, and the next steps to complete your reservation.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-5 w-full py-2.5 rounded-full font-semibold transition-colors hover:bg-gray-50"
                style={{ border: "1px solid #A8DDE3", color: "#666666", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.85rem" }}
              >
                Close
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
