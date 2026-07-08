import { Users, Star, ArrowRight } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export const villas = [
  {
    id: 1,
    name: "La Palma Villa",
    tag: "Luxury Suite",
    pricePerNight: 8500,
    capacity: 34,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1752769041812-d956228c1e81?w=700&h=480&fit=crop&auto=format",
    features: ["Private Pool", "Full Kitchen", "4 Bedrooms", "Jacuzzi"],
    desc: "Our flagship villa with a private heated pool, premium furnishings, and a wraparound terrace with panoramic garden views.",
    highlight: true,
    blocked: [
      { from: new Date(2026, 6, 4), to: new Date(2026, 6, 6) },
      { from: new Date(2026, 6, 18), to: new Date(2026, 6, 22) },
      { from: new Date(2026, 7, 1), to: new Date(2026, 7, 4) },
    ],
  },
  {
    id: 2,
    name: "Villa Sampaguita",
    tag: "Family Deluxe",
    pricePerNight: 5500,
    capacity: 40,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1756802156662-d0fa771ba255?w=700&h=480&fit=crop&auto=format",
    features: ["Pool Access", "3 Bedrooms", "Garden View", "BBQ Area"],
    desc: "Spacious and elegantly designed for families, featuring a full sala, dedicated dining area, and easy pool access.",
    highlight: false,
    blocked: [
      { from: new Date(2026, 6, 5), to: new Date(2026, 6, 8) },
      { from: new Date(2026, 6, 25), to: new Date(2026, 6, 27) },
    ],
  },
  {
    id: 3,
    name: "Villa Ilang-Ilang",
    tag: "Standard Comfort",
    pricePerNight: 3800,
    capacity: 50,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1776762893034-c437e452f1be?w=700&h=480&fit=crop&auto=format",
    features: ["Pool Access", "2 Bedrooms", "Air-Con", "WiFi"],
    desc: "A charming mid-range villa perfect for small groups, with all essential comforts and a lovely garden-facing porch.",
    highlight: false,
    blocked: [
      { from: new Date(2026, 6, 10), to: new Date(2026, 6, 13) },
    ],
  },
  {
    id: 4,
    name: "Bougainvillea Suite",
    tag: "Romantic Getaway",
    pricePerNight: 4200,
    capacity: 40,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1709390083401-4fdbc56970d9?w=700&h=480&fit=crop&auto=format",
    features: ["Private Terrace", "1 King Bed", "Soaking Tub", "Breakfast"],
    desc: "Designed for couples seeking a serene escape — intimate, lush, and quietly tucked away in the heart of the garden.",
    highlight: false,
    blocked: [
      { from: new Date(2026, 6, 15), to: new Date(2026, 6, 17) },
      { from: new Date(2026, 7, 8), to: new Date(2026, 7, 10) },
    ],
  },
  {
    id: 5,
    name: "Casa Bamboo",
    tag: "Budget Friendly",
    pricePerNight: 2200,
    capacity: 34,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1562131470-af37433ba70c?w=700&h=480&fit=crop&auto=format",
    features: ["Pool Access", "1 Bedroom", "Fan Room", "WiFi"],
    desc: "Our most affordable option — clean, cozy, and full of character. Ideal for budget travelers who still want a tropical retreat.",
    highlight: false,
    blocked: [
      { from: new Date(2026, 6, 20), to: new Date(2026, 6, 23) },
    ],
  },
];

export const specialPackages = [
  {
    id: 6,
    name: "3 Villas Package",
    tag: "Grand Event",
    pricePerNight: 16000,
    capacity: 100,
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1776762893034-c437e452f1be?w=700&h=480&fit=crop&auto=format",
    features: ["3 Villas Combined", "All Amenities", "Events Coordinator", "BBQ + Karaoke"],
    desc: "Book three villas together for grand celebrations. Ideal for big family reunions, company outings, and group trips of up to 100 guests.",
    highlight: false,
    blocked: [],
  },
  {
    id: 7,
    name: "Reconnecting Venue",
    tag: "100 Pax Events",
    pricePerNight: 18000,
    capacity: 100,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1756802156662-d0fa771ba255?w=700&h=480&fit=crop&auto=format",
    features: ["100 Pax Capacity", "Full Sound System", "Catering Available", "Pool Access"],
    desc: "Our dedicated events venue perfect for weddings, debuts, corporate retreats, and milestone celebrations of up to 100 guests.",
    highlight: false,
    blocked: [],
  },
];

type Villa = typeof villas[0];

function VillaModal({ villa, onClose }: { villa: Villa; onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        <motion.div
          className="relative max-w-2xl w-full rounded-3xl overflow-hidden shadow-2xl"
          style={{ backgroundColor: "#fff" }}
          initial={{ scale: 0.92, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.92, y: 20 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative h-64">
            <img src={villa.image} alt={villa.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/80 hover:bg-white flex items-center justify-center text-gray-700 transition-colors text-lg font-bold"
            >
              ×
            </button>
            <div className="absolute bottom-4 left-6">
              <span
                className="px-3 py-1 rounded-full text-xs uppercase tracking-widest"
                style={{ backgroundColor: "#00b4d8", color: "#fff", fontFamily: "'DM Sans', sans-serif" }}
              >
                {villa.tag}
              </span>
            </div>
          </div>
          <div className="p-7">
            <div className="flex items-start justify-between mb-3">
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.6rem", fontWeight: 700, color: "#1a2e1a" }}>
                {villa.name}
              </h3>
              <div className="text-right">
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", fontWeight: 800, color: "#00b4d8" }}>
                  ₱{villa.pricePerNight.toLocaleString()}
                </p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: "#6b7a5e" }}>per night</p>
              </div>
            </div>
            <div className="flex items-center gap-4 mb-4">
              <span className="flex items-center gap-1.5" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.88rem", color: "#6b7a5e" }}>
                <Users size={14} color="#00b4d8" />
                Up to <strong style={{ color: "#1a2e1a" }}>{villa.capacity} pax</strong>
              </span>
            </div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#4a5e40", lineHeight: 1.75, fontSize: "0.95rem" }} className="mb-5">
              {villa.desc}
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {villa.features.map((f) => (
                <span key={f} className="px-3 py-1 rounded-full text-sm" style={{ backgroundColor: "#e0f7fa", color: "#007a9a", fontFamily: "'DM Sans', sans-serif" }}>
                  {f}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl mb-5" style={{ backgroundColor: "#fff8e1" }}>
              <span style={{ fontSize: "1.1rem" }}>🕐</span>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", color: "#7a6000" }}>
                <strong>Check-in:</strong> 3:00 PM &nbsp;|&nbsp; <strong>Check-out:</strong> 12:00 NN
              </p>
            </div>
            <a
              href="#booking"
              onClick={onClose}
              className="block w-full text-center py-3.5 rounded-full font-semibold text-white transition-all duration-200 hover:opacity-90 hover:scale-[1.02]"
              style={{ backgroundColor: "#00b4d8", fontFamily: "'DM Sans', sans-serif" }}
            >
              Reserve This Villa
            </a>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export function VillaShowcase() {
  const [selected, setSelected] = useState<Villa | null>(null);
  const allListings = [...villas, ...specialPackages] as Villa[];

  return (
    <section id="villas" className="py-20" style={{ background: "linear-gradient(180deg, #fdf6ec 0%, #e0f7fa 100%)" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <span
            className="inline-block px-4 py-1.5 rounded-full text-sm tracking-widest uppercase mb-4"
            style={{ backgroundColor: "#e0f7fa", color: "#007a9a", fontFamily: "'DM Sans', sans-serif" }}
          >
            Accommodations
          </span>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3rem)", color: "#1a2e1a", fontWeight: 700 }}>
            Our <span style={{ color: "#00b4d8" }}>Villa</span> Collection
          </h2>
          <p className="mt-4 max-w-xl mx-auto" style={{ fontFamily: "'DM Sans', sans-serif", color: "#6b7a5e", fontSize: "1.05rem", lineHeight: 1.7 }}>
            Five private villas plus grand event packages — each designed for comfort, joy, and unforgettable memories.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-5">
            {[
              { label: "Max 50 pax/villa", color: "#e0f7fa", text: "#007a9a" },
              { label: "3 Villas Package · 100 pax", color: "#fff8e1", text: "#7a6000" },
              { label: "Reconnecting Venue · 100 pax", color: "#fce4ec", text: "#880e4f" },
            ].map(({ label, color, text }) => (
              <span key={label} className="px-4 py-1.5 rounded-full text-sm font-medium" style={{ backgroundColor: color, color: text, fontFamily: "'DM Sans', sans-serif" }}>
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* Individual villas */}
        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.25rem", color: "#1a2e1a", fontWeight: 700, marginBottom: "1rem" }}>
          Private Villas
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mb-12">
          {villas.map((villa, i) => (
            <motion.div
              key={villa.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.55 }}
              className="rounded-2xl overflow-hidden shadow-md group cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              style={{ backgroundColor: "#fff", border: villa.highlight ? "2px solid #00b4d8" : "none" }}
              onClick={() => setSelected(villa)}
            >
              {villa.highlight && (
                <div className="text-center py-1.5 text-xs font-semibold tracking-widest uppercase text-white" style={{ backgroundColor: "#00b4d8", fontFamily: "'DM Sans', sans-serif" }}>
                  ★ Most Popular
                </div>
              )}
              <div className="relative h-52 overflow-hidden">
                <img src={villa.image} alt={villa.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs uppercase tracking-wide" style={{ backgroundColor: "rgba(0,180,216,0.85)", color: "#fff", fontFamily: "'DM Sans', sans-serif" }}>
                  {villa.tag}
                </span>
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.2rem", fontWeight: 700, color: "#1a2e1a" }}>{villa.name}</h3>
                  <div className="flex items-center gap-1">
                    <Star size={13} fill="#f5c42c" stroke="none" />
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", color: "#6b7a5e" }}>{villa.rating}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.35rem", fontWeight: 800, color: "#00b4d8" }}>
                    ₱{villa.pricePerNight.toLocaleString()}
                  </span>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: "#9aaa8e" }}>/night</span>
                  <span className="flex items-center gap-1 ml-auto" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", color: "#6b7a5e" }}>
                    <Users size={13} color="#00b4d8" />
                    up to {villa.capacity} pax
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {villa.features.slice(0, 3).map((f) => (
                    <span key={f} className="px-2.5 py-0.5 rounded-full text-xs" style={{ backgroundColor: "#e0f7fa", color: "#007a9a", fontFamily: "'DM Sans', sans-serif" }}>
                      {f}
                    </span>
                  ))}
                </div>
                <button className="flex items-center gap-2 text-sm font-semibold transition-all duration-200 group-hover:gap-3" style={{ color: "#00b4d8", fontFamily: "'DM Sans', sans-serif" }}>
                  View Details <ArrowRight size={15} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Special packages */}
        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.25rem", color: "#1a2e1a", fontWeight: 700, marginBottom: "1rem" }}>
          Grand Event Packages
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {specialPackages.map((pkg, i) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.55 }}
              className="rounded-2xl overflow-hidden shadow-md group cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              style={{ backgroundColor: "#fff", border: "2px solid #f5c42c" }}
              onClick={() => setSelected(pkg as Vila)}
            >
              <div className="text-center py-1.5 text-xs font-semibold tracking-widest uppercase" style={{ backgroundColor: "#f5c42c", color: "#1a2e1a", fontFamily: "'DM Sans', sans-serif" }}>
                ★ Up to 100 Pax
              </div>
              <div className="relative h-52 overflow-hidden">
                <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs uppercase tracking-wide" style={{ backgroundColor: "rgba(245,196,44,0.9)", color: "#1a2e1a", fontFamily: "'DM Sans', sans-serif" }}>
                  {pkg.tag}
                </span>
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.2rem", fontWeight: 700, color: "#1a2e1a" }}>{pkg.name}</h3>
                  <div className="flex items-center gap-1">
                    <Star size={13} fill="#f5c42c" stroke="none" />
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", color: "#6b7a5e" }}>{pkg.rating}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.35rem", fontWeight: 800, color: "#00b4d8" }}>
                    ₱{pkg.pricePerNight.toLocaleString()}
                  </span>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: "#9aaa8e" }}>/night</span>
                  <span className="flex items-center gap-1 ml-auto" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", color: "#6b7a5e" }}>
                    <Users size={13} color="#f5c42c" />
                    up to {pkg.capacity} pax
                  </span>
                </div>
                <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#6b7a5e", fontSize: "0.88rem", lineHeight: 1.65 }} className="mb-4">
                  {pkg.desc}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {pkg.features.map((f) => (
                    <span key={f} className="px-2.5 py-0.5 rounded-full text-xs" style={{ backgroundColor: "#fff8e1", color: "#7a6000", fontFamily: "'DM Sans', sans-serif" }}>
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {selected && <VillaModal villa={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}

// type alias to avoid TS error on specialPackages
type Vila = typeof villas[0];
