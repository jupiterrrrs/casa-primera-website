import { motion } from "motion/react";
import { CalendarDays, MessageCircle, CreditCard, CheckCircle2, MapPin, Clock } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: CalendarDays,
    title: "Check Availability",
    desc: "Browse our villa collection and use the booking calendar to check available dates. Blocked dates in red mean the villa is already reserved.",
    color: "#45B3C0",
    bg: "#DCF1F3",
  },
  {
    number: "02",
    icon: MessageCircle,
    title: "Inquire & Reserve",
    desc: "Fill out the reservation form on this page, or message us via Messenger or Viber to confirm your preferred villa, dates, and guest count.",
    color: "#FFEB3B",
    bg: "#EAF7F8",
  },
  {
    number: "03",
    icon: CreditCard,
    title: "Pay the Down Payment",
    desc: "Secure your reservation by paying a 50% down payment via GCash, Maya, Bank Transfer, or Cash. Send your proof of payment to our contact number.",
    color: "#45B3C0",
    bg: "#DCF1F3",
  },
  {
    number: "04",
    icon: CheckCircle2,
    title: "Receive Confirmation",
    desc: "Once payment is verified, you will receive a confirmation message with your booking details, villa assignment, and pre-arrival checklist.",
    color: "#333333",
    bg: "#DCF1F3",
  },
  {
    number: "05",
    icon: MapPin,
    title: "Head to Casa Primera",
    desc: "Navigate to our resort in Brgy. Pansol, Calamba City, Laguna using Google Maps or Waze. Check-in starts at 3:00 PM.",
    color: "#FFEB3B",
    bg: "#EAF7F8",
  },
  {
    number: "06",
    icon: Clock,
    title: "Enjoy & Check Out",
    desc: "Relax, refresh, and reconnect! Check-out time is 12:00 NN. Settle remaining balance upon arrival. We hope to see you again!",
    color: "#333333",
    bg: "#DCF1F3",
  },
];

export function HowToBook() {
  return (
    <section id="how-to-book" className="py-20 overflow-hidden" style={{ background: "linear-gradient(180deg, #DCF1F3 0%, #EAF7F8 100%)" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full text-sm tracking-widest uppercase mb-4" style={{ backgroundColor: "#DCF1F3", color: "#333333", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Easy as 1-2-3
          </span>
          <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(2rem, 4vw, 3rem)", color: "#333333", fontWeight: 700 }}>
            How to <span style={{ color: "#45B3C0" }}>Book</span> & Reserve
          </h2>
          <p className="mt-4 max-w-xl mx-auto" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#666666", fontSize: "1.05rem", lineHeight: 1.7 }}>
            Booking your tropical getaway at Casa Primera is quick and simple. Follow these easy steps to secure your villa.
          </p>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {steps.map(({ number, icon: Icon, title, desc, color, bg }, i) => (
            <motion.div
              key={number}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="relative rounded-2xl p-6 shadow-sm"
              style={{ backgroundColor: "#fff", border: "1px solid rgba(69,179,192,0.1)" }}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: bg }}>
                  <Icon size={22} color={color} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span style={{ fontFamily: "'Fraunces', serif", fontSize: "0.8rem", fontWeight: 700, color: color }}>{number}</span>
                    <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: "1.05rem", fontWeight: 700, color: "#333333" }}>{title}</h3>
                  </div>
                  <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.88rem", color: "#666666", lineHeight: 1.7 }}>{desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick info bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {[
            { label: "Down Payment", value: "50%", note: "to secure booking", color: "#45B3C0" },
            { label: "Check-in", value: "3:00 PM", note: "earliest arrival", color: "#333333" },
            { label: "Check-out", value: "12:00 NN", note: "latest departure", color: "#FFEB3B" },
            { label: "Guest Capacity", value: "30–50", note: "pax per villa", color: "#45B3C0" },
          ].map(({ label, value, note, color }) => (
            <div key={label} className="rounded-2xl p-4 text-center shadow-sm" style={{ backgroundColor: "#fff" }}>
              <p style={{ fontFamily: "'Fraunces', serif", fontSize: "1.5rem", fontWeight: 800, color }}>{value}</p>
              <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.82rem", fontWeight: 600, color: "#333333" }}>{label}</p>
              <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.75rem", color: "#999999" }}>{note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
