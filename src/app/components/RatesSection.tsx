import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Users, BedDouble, Sparkles, ArrowRight, PhoneCall, Check } from "lucide-react";
import { villas, tierNote } from "./VillaShowcase";
import { publishReserveSelection, guestsForPackageLabel } from "../lib/reserveSelection";

export function RatesSection() {
  const [activeId, setActiveId] = useState(villas[0].id);
  const active = villas.find((v) => v.id === activeId) ?? villas[0];

  // Which package is selected per villa (keyed by villa id), so switching
  // villas and coming back keeps each villa's own pick remembered. Defaults
  // to each villa's first package so the section still looks "chosen" out
  // of the box.
  const [selectedByVilla, setSelectedByVilla] = useState<Record<number, string>>(
    () => Object.fromEntries(villas.map((v) => [v.id, v.rateTiers[0].label]))
  );
  const selectedLabel = selectedByVilla[active.id] ?? active.rateTiers[0].label;

  function handleReserveClick() {
    publishReserveSelection({
      villa: active.name,
      packageLabel: selectedLabel,
      guests: guestsForPackageLabel(selectedLabel),
    });
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section id="rates" className="py-20" style={{ backgroundColor: "#ffffff" }}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <span
            className="inline-block px-4 py-1.5 rounded-full text-sm tracking-widest uppercase mb-4"
            style={{ backgroundColor: "#DCF1F3", color: "#333333", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700 }}
          >
            Villa Rates
          </span>
          <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(2rem, 4vw, 3rem)", color: "#333333", fontWeight: 700 }}>
            Simple, Package-Based <span style={{ color: "#45B3C0" }}>Pricing</span>
          </h2>
          <p className="mt-5 max-w-2xl mx-auto" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#666666", fontSize: "1.05rem", lineHeight: 1.7 }}>
            Choose a villa to view its available packages. Package rates and the number of rooms vary based on your group size. Children aged 5 and below stay free and are not included in the headcount.
          </p>
          <p className="mt-4 max-w-2xl mx-auto" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#666666", fontSize: "1.05rem", lineHeight: 1.7 }}>
            Every package includes exclusive use of your private villa, natural hot spring pools, air-conditioned rooms, a kitchen with appliances and cooking utensils, Wi-Fi, indoor parking, and entertainment amenities like videoke, billiards, darts, and more—everything you need for a comfortable and memorable stay.
          </p>
        </div>

        {/* Villa switcher — horizontally scrollable on mobile, wraps on desktop */}
        <div
          className="flex lg:flex-wrap lg:justify-center gap-3 mb-10 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 -mx-6 px-6 lg:mx-0 lg:px-0"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {villas.map((v) => {
            const isActive = v.id === activeId;
            return (
              <button
                key={v.id}
                onClick={() => setActiveId(v.id)}
                className="flex-shrink-0 flex flex-col items-start gap-1 px-5 py-3 rounded-2xl transition-all duration-200"
                style={{
                  scrollSnapAlign: "start",
                  backgroundColor: isActive ? "#45B3C0" : "#EAF7F8",
                  border: isActive ? "2px solid #45B3C0" : "2px solid transparent",
                  minWidth: 152,
                }}
              >
                <span
                  className="text-xs uppercase tracking-wide font-bold"
                  style={{ color: isActive ? "rgba(255,255,255,0.75)" : "#45B3C0", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  {v.tag}
                </span>
                <span
                  style={{ fontFamily: "'Fraunces', serif", fontSize: "1.05rem", fontWeight: 700, color: isActive ? "#fff" : "#333333" }}
                >
                  {v.name.replace("Casa Primera ", "")}
                </span>
                <span
                  className="flex items-center gap-1 text-xs"
                  style={{ color: isActive ? "rgba(255,255,255,0.85)" : "#666666", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  <Users size={11} /> {v.capacity} pax
                </span>
              </button>
            );
          })}
        </div>

        {/* Active villa's rate packages */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
              {active.rateTiers.map((pkg, i) => {
                const isSelected = selectedLabel === pkg.label;
                return (
                  <motion.div
                    key={pkg.label}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.35 }}
                    role="button"
                    tabIndex={0}
                    aria-pressed={isSelected}
                    onClick={() => setSelectedByVilla((p) => ({ ...p, [active.id]: pkg.label }))}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setSelectedByVilla((p) => ({ ...p, [active.id]: pkg.label }));
                      }
                    }}
                    className="relative rounded-2xl p-6 flex flex-col shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer select-none"
                    style={{
                      backgroundColor: isSelected ? "#45B3C0" : "#EAF7F8",
                      border: isSelected ? "none" : "1px solid rgba(69,179,192,0.2)",
                      outline: isSelected ? "2px solid #2f8f9a" : "none",
                      outlineOffset: 2,
                    }}
                  >
                    {isSelected && (
                      <div
                        className="absolute top-4 right-4 w-6 h-6 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: "rgba(255,255,255,0.25)" }}
                      >
                        <Check size={14} color="#fff" strokeWidth={3} />
                      </div>
                    )}
                    <span
                      className="text-xs font-bold uppercase tracking-widest mb-3"
                      style={{ color: isSelected ? "rgba(255,255,255,0.75)" : "#45B3C0", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      Package {pkg.label}
                    </span>
                    <div className="flex items-baseline gap-1 mb-1">
                      <span
                        style={{ fontFamily: "'Fraunces', serif", fontSize: "1.9rem", fontWeight: 800, color: isSelected ? "#fff" : "#333333" }}
                      >
                        ₱{pkg.price.toLocaleString()}
                      </span>
                    </div>
                    <span
                      className="text-xs mb-4"
                      style={{ color: isSelected ? "rgba(255,255,255,0.75)" : "#999999", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      per night
                    </span>

                    <div className="space-y-2 mt-auto pt-4" style={{ borderTop: isSelected ? "1px solid rgba(255,255,255,0.25)" : "1px solid rgba(69,179,192,0.2)" }}>
                      <div className="flex items-center gap-2">
                        <Users size={14} color={isSelected ? "#fff" : "#45B3C0"} />
                        <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.85rem", color: isSelected ? "#fff" : "#4d4d4d" }}>
                          {pkg.pax}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BedDouble size={14} color={isSelected ? "#fff" : "#45B3C0"} />
                        <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.85rem", color: isSelected ? "#fff" : "#4d4d4d" }}>
                          {pkg.rooms}
                        </span>
                      </div>
                    </div>

                    {"note" in pkg && pkg.note && (
                      <p
                        className="mt-3 text-xs leading-relaxed"
                        style={{ color: isSelected ? "rgba(255,255,255,0.85)" : "#c0392b", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                      >
                        {tierNote(pkg, active.maxPax)}
                      </p>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Footnote + CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 rounded-2xl p-5" style={{ backgroundColor: "#EAF7F8" }}>
          <div className="flex items-start gap-3 max-w-xl">
            <Sparkles size={18} color="#45B3C0" className="flex-shrink-0 mt-0.5" />
            <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.85rem", color: "#666666", lineHeight: 1.6 }}>
              Senior citizens and PWDs enjoy a 20% discount on their pro-rated share. A 50% down payment confirms
              your reservation.
            </p>
          </div>
          <button
            type="button"
            onClick={handleReserveClick}
            className="flex items-center gap-2 px-6 py-3 rounded-full font-bold whitespace-nowrap transition-all duration-200 hover:scale-105 hover:shadow-lg"
            style={{ backgroundColor: "#FFEB3B", color: "#333333", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Reserve This Villa <ArrowRight size={16} />
          </button>
        </div>

        {/* Large group notice */}
        <div className="flex items-start gap-3 mt-5 rounded-2xl p-5" style={{ backgroundColor: "#FFF7D6", border: "1px solid #FFE49A" }}>
          <PhoneCall size={18} color="#B8860B" className="flex-shrink-0 mt-0.5" />
          <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.88rem", color: "#7a5c00", lineHeight: 1.6, fontWeight: 600 }}>
            For 51–100 pax, we can provide 2–3 combined villas. Please contact us directly for more details.
          </p>
        </div>
      </div>
    </section>
  );
}
