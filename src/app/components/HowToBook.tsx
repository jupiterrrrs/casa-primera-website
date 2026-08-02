import { motion } from "motion/react";
import { Home, CalendarDays, CheckCircle2, MapPin, Clock } from "lucide-react";

function PesoIcon({ size = 22, color = "#333333" }: { size?: number; color?: string }) {
  return (
    <span style={{ fontSize: size, color, fontWeight: 800, lineHeight: 1, fontFamily: "'Fraunces', serif" }}>
      ₱
    </span>
  );
}

const steps = [
  {
    number: "01",
    icon: Home,
    title: "Choose your Villa",
    desc: "Browse our villa collection and find the perfect villa for your group. Need assistance? Click the chat icon in the bottom-right corner then choose \"Live Chat with Us.\"",
    color: "#45B3C0",
    bg: "#DCF1F3",
  },
  {
    number: "02",
    icon: CalendarDays,
    title: "Check Availability & Request Booking",
    desc: "Click Book Now and fill out the reservation form. Click the calendar to check available dates & villas. Review our Terms & Conditions before confirming your booking request.",
    color: "#FFEB3B",
    bg: "#EAF7F8",
  },
  {
    number: "03",
    icon: PesoIcon,
    title: "Pay the Down Payment",
    desc: "You will receive our bank details on your email. Secure your reservation by paying 50% down payment via Bank Transfer/Deposit, then email us back your payment receipt for verification.",
    color: "#45B3C0",
    bg: "#DCF1F3",
  },
  {
    number: "04",
    icon: CheckCircle2,
    title: "Reservation Confirmation",
    desc: "Once payment is verified, you will receive a Reservation Confirmation email.",
    color: "#333333",
    bg: "#DCF1F3",
  },
  {
    number: "05",
    icon: MapPin,
    title: "Head to Casa Primera & Check-In",
    desc: "Navigate to our resort via Google Maps or Waze. Check-in just right on time. Kindly note that we don't have a lobby or waiting area inside the villa. Settle the remaining balance upon arrival.",
    color: "#FFEB3B",
    bg: "#EAF7F8",
  },
  {
    number: "06",
    icon: Clock,
    title: "Enjoy & Check-Out",
    desc: "Relax, refresh, and reconnect with your family and friends! Check-out on time. We hope to see you again!",
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
            How to <span style={{ color: "#45B3C0" }}>Book</span>
          </h2>
          <p className="mt-4 max-w-xl mx-auto" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#666666", fontSize: "1.05rem", lineHeight: 1.7 }}>
            Booking your tropical getaway at Casa Primera is quick and simple. Follow these easy steps to secure your private villa.
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {[
            { label: "Down Payment", value: "50%", note: "to secure reservation", color: "#45B3C0" },
            { label: "Balance", value: "50%", note: "Payable Upon Arrival", color: "#333333" },
            { label: "Security Deposit", value: "Php 2,000", note: "Refundable Upon Check-out (if no incidental expenses are incurred)", color: "#FFEB3B" },
            { label: "Guest Capacity", value: "34–50 pax", note: "per villa", color: "#45B3C0" },
          ].map(({ label, value, note, color }) => (
            <div key={label} className="rounded-2xl p-4 text-center shadow-sm flex flex-col" style={{ backgroundColor: "#fff" }}>
              <p style={{ fontFamily: "'Fraunces', serif", fontSize: "1.5rem", fontWeight: 800, color }}>{value}</p>
              <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.82rem", fontWeight: 600, color: "#333333" }}>{label}</p>
              <p className="mt-0.5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.72rem", color: "#999999", lineHeight: 1.4 }}>{note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
