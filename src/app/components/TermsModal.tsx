import { X, Building2 } from "lucide-react";
import { motion } from "motion/react";
import { format } from "date-fns";
import type { DateRange } from "react-day-picker";

interface Quote {
  villaName: string;
  tierLabel: string;
  rooms: string;
  basePrice: number;
  extraHeads: number;
  extraCost: number;
  total: number;
  guests: number;
}

interface Props {
  onAccept: () => void;
  onClose: () => void;
  villa: string;
  guests: string;
  dateRange: DateRange | undefined;
  nights: number;
  quote: Quote | null;
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, color: "#333333", fontSize: "1rem" }} className="mb-2">
      {children}
    </h3>
  );
}

function List({ items }: { items: React.ReactNode[] }) {
  return (
    <ul style={{ fontSize: "0.86rem", color: "#4d4d4d", lineHeight: 1.8 }} className="list-disc pl-4 space-y-1">
      {items.map((item, i) => <li key={i}>{item}</li>)}
    </ul>
  );
}

export function TermsModal({ onAccept, onClose, villa, guests, dateRange, nights, quote }: Props) {
  const bookingDate = format(new Date(), "MMM d, yyyy");
  const stayLabel = dateRange?.from && dateRange?.to
    ? `${format(dateRange.from, "MMM d")} – ${format(dateRange.to, "MMM d, yyyy")} (${nights} night${nights !== 1 ? "s" : ""})`
    : "To be confirmed";

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <motion.div
        className="relative w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl flex flex-col"
        style={{ backgroundColor: "#fff", maxHeight: "92dvh" }}
        initial={{ opacity: 0, scale: 0.93, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b flex-shrink-0" style={{ borderColor: "#DCF1F3", backgroundColor: "#45B3C0" }}>
          <h2 style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: "1.05rem", color: "#fff", lineHeight: 1.3 }}>
            Booking Details and<br className="sm:hidden" /> Terms & Conditions
          </h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center transition-colors flex-shrink-0 ml-3">
            <X size={16} color="#fff" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto flex-1 px-5 sm:px-6 py-5 space-y-6" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

          {/* Booking summary */}
          <div className="rounded-2xl p-4" style={{ backgroundColor: "#EAF7F8", border: "1px solid #DCF1F3" }}>
            <p style={{ fontSize: "0.75rem", color: "#666666", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 700 }} className="mb-3">
              Your Booking Summary
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
              <div>
                <p style={{ fontSize: "0.72rem", color: "#999999" }}>Booking Date</p>
                <p style={{ fontSize: "0.9rem", color: "#333333", fontWeight: 600 }}>{bookingDate}</p>
              </div>
              <div>
                <p style={{ fontSize: "0.72rem", color: "#999999" }}>Check-in / Check-out</p>
                <p style={{ fontSize: "0.9rem", color: "#333333", fontWeight: 600 }}>3:00 PM / 12:00 NN</p>
                <p style={{ fontSize: "0.78rem", color: "#666666" }}>{stayLabel}</p>
              </div>
              <div>
                <p style={{ fontSize: "0.72rem", color: "#999999" }}>Villa</p>
                <p style={{ fontSize: "0.9rem", color: "#333333", fontWeight: 600 }}>{villa || "To be selected"}</p>
              </div>
              <div>
                <p style={{ fontSize: "0.72rem", color: "#999999" }}>Number of Pax</p>
                <p style={{ fontSize: "0.9rem", color: "#333333", fontWeight: 600 }}>{guests}</p>
              </div>
              <div className="sm:col-span-2">
                <p style={{ fontSize: "0.72rem", color: "#999999" }}>Package Rate</p>
                {quote ? (
                  <p style={{ fontSize: "0.95rem", color: "#333333", fontWeight: 700 }}>
                    ₱{quote.total.toLocaleString()} / night
                    {quote.extraHeads > 0 && (
                      <span style={{ fontSize: "0.78rem", color: "#c0392b", fontWeight: 500 }}> (incl. +₱{quote.extraCost.toLocaleString()} extra-pax surcharge)</span>
                    )}
                    {nights > 0 && (
                      <span style={{ fontSize: "0.82rem", color: "#666666", fontWeight: 500 }}> · ₱{(quote.total * nights).toLocaleString()} total for {nights} night{nights !== 1 ? "s" : ""}</span>
                    )}
                  </p>
                ) : (
                  <p style={{ fontSize: "0.9rem", color: "#999999" }}>Select a villa to see your rate</p>
                )}
              </div>
            </div>
          </div>

          {/* Reservation, Cancellation & Rebooking */}
          <div>
            <SectionHeading>📅 Reservation, Cancellation & Rebooking</SectionHeading>
            <List items={[
              <>Once confirmed, no downgrades or decrease in the number of pax, refunds, or rebookings made <strong>less than 10 days</strong> from your reservation date.</>,
              <>Reservations affected by community quarantine restrictions are only subject for rebooking or open rebooking.</>,
              <>Last-minute rebookings (1–9 days before your reservation date) incur a <strong>₱5,000/night</strong> penalty on top of the rental fee.</>,
              <>Cancel at least <strong>10 days</strong> prior and we'll refund 50% of your down payment, or you may rebook once at no extra cost (14 days given to provide a final rebooking date).</>,
              <>Rebookings requested less than 10 days out are subject to management approval. After your first free rebooking, a ₱5,000/night rebooking fee applies on top of the rental rate — refunds or cancellations are no longer possible at that point.</>,
              <>During PAGASA signal no. 3 or higher in Laguna, we allow last-minute rebooking, but cancellations and refunds are not permitted.</>,
              <>"No-shows" prior to check-in are non-refundable, non-transferable to other villas, and cannot be cancelled or rebooked.</>,
            ]} />
          </div>

          {/* Check-in / Check-out */}
          <div>
            <SectionHeading>🕐 Check-in & Check-out</SectionHeading>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="p-3 rounded-xl text-center" style={{ backgroundColor: "#DCF1F3" }}>
                <p style={{ fontSize: "1.5rem", fontWeight: 800, color: "#45B3C0" }}>3:00 PM</p>
                <p style={{ fontSize: "0.78rem", color: "#666666" }}>Check-in time</p>
              </div>
              <div className="p-3 rounded-xl text-center" style={{ backgroundColor: "#EAF7F8" }}>
                <p style={{ fontSize: "1.5rem", fontWeight: 800, color: "#c9a600" }}>12:00 NN</p>
                <p style={{ fontSize: "0.78rem", color: "#666666" }}>Check-out time</p>
              </div>
            </div>
            <List items={[
              <>Present a printed or soft copy of your Reservation Confirmation Sheet upon check-in.</>,
              <>Any remaining balance must be settled with resort staff on check-in — cash or BPI bank transfer only, at the resort.</>,
              <>Check-in and check-out times are strictly implemented; there is no waiting area for early arrivals.</>,
              <>Time adjustment requests are subject to approval. Extensions are ₱1,000/hour if the villa is available.</>,
              <>Every villa has its own caretaker — feel free to reach out to them directly.</>,
              <>The resort issues the official receipt; guests are responsible for securing a copy before leaving.</>,
            ]} />
          </div>

          {/* Security Deposit */}
          <div>
            <SectionHeading>🔐 Security Deposit</SectionHeading>
            <p style={{ fontSize: "0.86rem", color: "#4d4d4d", lineHeight: 1.75 }}>
              A <strong>₱2,000 per villa</strong> security deposit is collected upon check-in for incidental expenses, and fully refunded at check-out if no incidental expenses are incurred.
            </p>
          </div>

          {/* Guest Capacity */}
          <div>
            <SectionHeading>👥 Guest Capacity</SectionHeading>
            <List items={[
              <><strong>Casa Primera Villa 1:</strong> up to 34 pax</>,
              <><strong>Casa Primera Villa 2:</strong> up to 40 pax</>,
              <><strong>Casa Primera Villa 3:</strong> up to 50 pax</>,
              <><strong>Casa Primera Villa 4:</strong> up to 40 pax</>,
              <><strong>Casa Primera Villa 5:</strong> up to 34 pax</>,
            ]} />
            <p style={{ fontSize: "0.84rem", color: "#c0392b", marginTop: "0.6rem", lineHeight: 1.7 }}>
              ⚠ If you go over the strict maximum capacity of the villa, the overcapacity penalty charge is Php 5,000 on top of the extra pax surcharges for every person exceeding your package inclusion. If you have questions or concerns about this matter, please feel free to contact us directly.
            </p>
          </div>

          {/* Resort Amenities */}
          <div>
            <SectionHeading>🎁 Free Resort Amenities</SectionHeading>
            <List items={[
              <>Private villa, private hot spring pool, kiddie pool & playground.</>,
              <>Fully air-conditioned rooms with TVs; bathrooms with shower heaters (toiletries not provided).</>,
              <>FREE Wi-Fi, videoke & sound system.</>,
              <>FREE beddings, blankets, and towels for your number of pax.</>,
              <>FREE use of basic cooking utensils and kitchen appliances (Ref, stove, LPG, oven toaster, microwave on request, rice cooker, BBQ grill, hot & cold water dispenser with one free 5-gallon bottle, ₱50 per succeeding bottle).</>,
              <>FREE use of billiards, table tennis, water volleyball, darts, poker, mahjong, etc.</>,
              <>Secured indoor & street parking with 24-hour CCTV, plus generator backup.</>,
              <>Roof deck (Villa 4 only) — not part of the package, but available for 30 minutes for photos.</>,
            ]} />
          </div>

          {/* Additional Charges */}
          <div>
            <SectionHeading>💰 Additional Charges</SectionHeading>
            <List items={[
              <>Extra pax: ₱500/head/night (kids below 5 excluded; everyone entering the resort is counted).</>,
              <>Extra room: ₱2,500/room/night.</>,
              <>Extension: ₱1,000/hour, in excess of 21 hours, only if the villa is available.</>,
              <>Pet surcharge / deep cleaning: ₱500/pet/night.</>,
              <>Catering corkage: ₱1,500/night.</>,
              <>Professional lights & sound, live bands, etc.: ₱5,000/night.</>,
              <>Food carts, photo booths, etc.: ₱1,000/supplier/night.</>,
              <>Small appliances/electronics: ₱500/item/night.</>,
              <>Jacuzzi (Villa 3 & 5 only): ₱500/30 minutes.</>,
            ]} />
          </div>

          {/* Property Damage */}
          <div>
            <SectionHeading>🛠 Property Damage</SectionHeading>
            <p style={{ fontSize: "0.86rem", color: "#4d4d4d", lineHeight: 1.75 }}>
              Guests are responsible for any damage, abuse, or excessive clean-up required — including bodily fluids, large food/beverage spills, sticky residue, broken appliances, damaged fixtures, or losses caused by their party or hired suppliers. Casa Primera reserves the right to bill for additional cleaning, losses, damages, or repairs. Excessive clean-up fees start at ₱500. A detailed amenities checklist with costing is signed upon turnover.
            </p>
          </div>

          {/* Senior/PWD */}
          <div>
            <SectionHeading>🎖 Senior Citizen & PWD Discount</SectionHeading>
            <p style={{ fontSize: "0.86rem", color: "#4d4d4d", lineHeight: 1.75 }}>
              A 20% discount applies to the prorated share of the entitled person's package rate, deducted on arrival upon presentation of a valid Philippine-issued Senior Citizen or PWD ID. This cannot be combined with ongoing promos — guests may avail either the promo or the Expanded Senior Citizens Act (2010) discount, whichever is higher.
            </p>
          </div>

          {/* Pet Policy */}
          <div>
            <SectionHeading>🐾 Pet-Friendly Policy</SectionHeading>
            <List items={[
              <>₱500/pet/night, settled upon arrival. Maximum of 5 dogs/cats total.</>,
              <>Pets must be well-behaved, house-trained, vaccinated, and leashed or caged in common areas.</>,
              <>Owners are liable for medical costs if a pet injures anyone, and for any property damage caused.</>,
              <>Pets are only allowed on the ground floor (dining hall, garden, hallways, parking) and must be diapered at all times — not allowed upstairs or in the pool.</>,
              <>Breaking this policy incurs an additional ₱2,500 deep-cleaning fee per timeslot.</>,
            ]} />
          </div>

          {/* Mode of Payment */}
          <div>
            <SectionHeading>💳 Mode of Payment</SectionHeading>
            <div className="flex items-start gap-3 p-3 rounded-xl" style={{ backgroundColor: "#f8feff", border: "1px solid #DCF1F3" }}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: "#DCF1F3" }}>
                <Building2 size={15} color="#45B3C0" />
              </div>
              <div>
                <p style={{ fontSize: "0.88rem", fontWeight: 600, color: "#333333" }}>BDO Bank Transfer</p>
                <p style={{ fontSize: "0.78rem", color: "#666666" }}>Casa Primera Resort · A 50% down payment secures your reservation; send proof of payment to our contact number.</p>
              </div>
            </div>
          </div>

          {/* Data & Privacy */}
          <div>
            <SectionHeading>🔒 Data Privacy</SectionHeading>
            <p style={{ fontSize: "0.86rem", color: "#4d4d4d", lineHeight: 1.75 }}>
              By submitting a reservation, you consent to the collection and use of your personal information in accordance with the Data Privacy Act of 2012 (R.A. 10173). Your data is used only for reservation management and resort communications.
            </p>
          </div>
        </div>

        {/* Footer actions */}
        <div className="px-5 sm:px-6 py-4 border-t flex gap-3 flex-shrink-0" style={{ borderColor: "#DCF1F3" }}>
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-full font-semibold border transition-all duration-200 hover:bg-gray-50"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.9rem", color: "#666666", borderColor: "#A8DDE3" }}
          >
            Cancel
          </button>
          <button
            onClick={onAccept}
            className="flex-1 py-3 rounded-full font-semibold text-white transition-all duration-200 hover:opacity-90 hover:scale-[1.02]"
            style={{ backgroundColor: "#45B3C0", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.9rem" }}
          >
            I Agree & Reserve Now
          </button>
        </div>
      </motion.div>
    </div>
  );
}
