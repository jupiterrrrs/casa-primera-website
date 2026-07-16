import { Users, Star, ArrowRight, PlayCircle, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

// Standard rate tiers shared by Villa 1, 2 & 3
export const rateTiersABC = [
  { label: "A", price: 18000, pax: "1–10 pax", rooms: "2 Rooms" },
  { label: "B", price: 20000, pax: "11–15 pax", rooms: "3 Rooms" },
  { label: "C", price: 22000, pax: "16–20 pax", rooms: "4 Rooms", note: "+ ₱500/head for 21–25 pax" },
  { label: "D–E", price: 27000, pax: "26–30 pax", rooms: "5 Rooms", note: "+ ₱500/head in excess of 30 pax (Villa 2 or Villa 3 only)" },
];

// Standard rate tiers for Villa 4 & 5
export const rateTiersDE = [
  { label: "A", price: 21000, pax: "1–10 pax", rooms: "2 Rooms" },
  { label: "B", price: 23000, pax: "11–15 pax", rooms: "3 Rooms" },
  { label: "C", price: 25000, pax: "16–20 pax", rooms: "4 Rooms", note: "+ ₱500/head for 21–25 pax" },
  { label: "D–E", price: 30000, pax: "26–30 pax", rooms: "5 Rooms", note: "+ ₱500/head in excess of 30 pax" },
];

export const villas = [
  {
    id: 1,
    name: "Casa Primera Villa 1",
    tourVideo: "/videos/villa1-tour.mp4",
    tag: "Pioneer Villa",
    startingPrice: rateTiersABC[0].price,
    rateTiers: rateTiersABC,
    capacity: "30–50",
    rating: 4.9,
    image: "/images/villas/villa1.jpg",
    features: ["5 Air-Con Bedrooms", "Adult & Kiddie Pool", "Garden & Playground", "Senior/PWD-Friendly"],
    desc: "As the pioneer villa of Casa Primera Hot Spring Resorts, Villa 1 is a 2-storey private villa perfect for family vacations, reunions, and intimate celebrations. It features a vast garden, a children's playground, a spacious dining hall, and a kitchen area. Guests can enjoy a private hot spring adult pool (4–5.5 ft deep) and a kiddie pool (2–3 ft deep). Designed to accommodate 30–50 guests, the villa offers five fully air-conditioned bedrooms, each with a private bathroom, shower heater, and hair dryer. With two ground-floor bedrooms and a wheelchair ramp, the villa is senior and PWD-friendly. Also includes FREE Wi-Fi, TVs, FREE videoke, a dining hall, kitchen, grilling area, and indoor parking for 1–2 vehicles.",
    highlight: true,
    blocked: [
      { from: new Date(2026, 6, 4), to: new Date(2026, 6, 6) },
      { from: new Date(2026, 6, 18), to: new Date(2026, 6, 22) },
      { from: new Date(2026, 7, 1), to: new Date(2026, 7, 4) },
    ],
  },
  {
    id: 2,
    name: "Casa Primera Villa 2",
    tourVideo: "/videos/villa2-tour.mp4",
    tag: "Family Deluxe",
    startingPrice: rateTiersABC[0].price,
    rateTiers: rateTiersABC,
    capacity: "30–50",
    rating: 4.8,
    image: "/images/villas/villa2.jpg",
    features: ["5 Air-Con Bedrooms", "Adult & Kiddie Pool", "Children's Playground", "Senior/PWD-Friendly"],
    desc: "Create unforgettable moments with family and friends at Villa 2, a private villa designed for reunions, celebrations, and relaxing group getaways. It features a spacious children's playground and a private hot spring adult pool (4–5.5 ft deep) with kiddie pool (2–3 ft deep). Designed to accommodate 30–50 guests, the villa offers five fully air-conditioned bedrooms, including one ground-floor bedroom, making it senior and PWD-friendly. Each bedroom has a private bathroom, shower heater, and hair dryer. Includes a spacious dining hall, kitchen area, grilling area, FREE Wi-Fi, TVs, FREE videoke, and indoor parking for 4–5 vehicles.",
    highlight: false,
    blocked: [
      { from: new Date(2026, 6, 5), to: new Date(2026, 6, 8) },
      { from: new Date(2026, 6, 25), to: new Date(2026, 6, 27) },
    ],
  },
  {
    id: 3,
    name: "Casa Primera Villa 3",
    tourVideo: "/videos/villa3-tour.mp4",
    tag: "Garden Retreat",
    startingPrice: rateTiersABC[0].price,
    rateTiers: rateTiersABC,
    capacity: "30–50",
    rating: 4.7,
    image: "/images/villas/villa3.jpg",
    features: ["6 Air-Con Bedrooms", "Jacuzzi Available", "Adult & Kiddie Pool", "Senior/PWD-Friendly"],
    desc: "Surrounded by lush trees and greenery, Villa 3 provides a peaceful setting to relax, reconnect, and create lasting memories. It features larger bedrooms, a private hot spring adult pool (4–4.5 ft deep), a kiddie pool (2–2.5 ft deep), and a jacuzzi available for rent. Designed to accommodate 30–50 guests, the villa offers six fully air-conditioned bedrooms, including two ground-floor bedrooms, making it senior and PWD-friendly. Four bedrooms have their own private bathroom, while two share a nearby common bathroom. Includes a dining area, kitchen, grilling area, FREE Wi-Fi, TVs, FREE videoke, table tennis, billiards, darts, water volleyball, a playground, and indoor parking for 2–3 vehicles.",
    highlight: false,
    blocked: [
      { from: new Date(2026, 6, 10), to: new Date(2026, 6, 13) },
    ],
  },
  {
    id: 4,
    name: "Casa Primera Villa 4",
    tourVideo: "/videos/villa4-tour.mp4",
    tag: "Mountain View",
    startingPrice: rateTiersDE[0].price,
    rateTiers: rateTiersDE,
    capacity: "30–50",
    rating: 4.9,
    image: "/images/villas/villa4.jpg",
    features: ["5 Air-Con Bedrooms", "Mountain View Terrace", "Adult & Kiddie Pool", "Senior/PWD-Friendly"],
    desc: "Combining modern comfort with scenic surroundings, Villa 4 is a 2-storey private villa designed for families, reunions, and group gatherings. It features larger bedrooms, a spacious dining area, and a large terrace overlooking a beautiful mountain view. Guests can enjoy a private hot spring adult pool (3.2–5.2 ft deep) and a kiddie pool (2.7 ft deep). Designed to accommodate 30–50 guests, the villa offers five fully air-conditioned bedrooms, including one ground-floor bedroom, making it senior and PWD-friendly. Three bedrooms have their own private bathroom with shower heater, while two rooms share a bathroom with shower heater. Includes a dining area, kitchen, grilling area, FREE Wi-Fi, TVs, FREE videoke, table tennis, billiards, darts, water volleyball, a playground, and indoor parking for 5–6 vehicles.",
    highlight: false,
    blocked: [
      { from: new Date(2026, 6, 15), to: new Date(2026, 6, 17) },
      { from: new Date(2026, 7, 8), to: new Date(2026, 7, 10) },
    ],
  },
  {
    id: 5,
    name: "Casa Primera Villa 5",
    tourVideo: "/videos/villa5-tour.mp4",
    tag: "Modern Retreat",
    startingPrice: rateTiersDE[0].price,
    rateTiers: rateTiersDE,
    capacity: "30–50",
    rating: 4.6,
    image: "/images/villas/villa5.jpg",
    features: ["5 Air-Con Bedrooms", "Jacuzzi Available", "Color-Changing Pool Lights", "Senior/PWD-Friendly"],
    desc: "As the latest addition to Casa Primera Hot Spring Resorts, Villa 5 offers a modern and stylish retreat for families, reunions, and group getaways. It features a wide garden, a children's playground, a private hot spring adult pool (3–5 ft deep) with kiddie pool (2 ft deep), color-changing pool lights, and a jacuzzi available for rent. Designed to accommodate 30–50 guests, the villa offers five fully air-conditioned bedrooms, each with a private bathroom and shower heater. With two ground-floor bedrooms and a wheelchair ramp, the villa is senior and PWD-friendly. Includes a dining area, kitchen, grilling area, FREE Wi-Fi, TVs, FREE videoke, table tennis, billiards, darts, water volleyball, a playground, and indoor parking for 2–4 vehicles.",
    highlight: false,
    blocked: [
      { from: new Date(2026, 6, 20), to: new Date(2026, 6, 23) },
    ],
  },
];

type Villa = typeof villas[0];

function VideoModal({ src, title, onClose }: { src: string; title: string; onClose: () => void }) {
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[110] flex items-center justify-center bg-black/90 backdrop-blur-sm p-3 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-label={`${title} tour video`}
      onClick={onClose}
    >
      <button
        onClick={onClose}
        aria-label="Close video"
        className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 w-11 h-11 rounded-full bg-white/90 hover:bg-white flex items-center justify-center text-gray-800 shadow-lg transition-transform duration-200 hover:scale-110 active:scale-95"
      >
        <X size={20} />
      </button>
      <motion.div
        className="relative w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl"
        initial={{ scale: 0.94, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.94, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <video
          src={src}
          controls
          autoPlay
          playsInline
          className="w-full h-auto max-h-[85vh] bg-black"
        >
          Sorry, your browser doesn't support embedded videos.
        </video>
        <div className="px-5 py-3" style={{ backgroundColor: "#1a2e1a" }}>
          <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#fff", fontSize: "0.9rem", fontWeight: 600 }}>
            {title} — Villa Tour
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

function VillaModal({ villa, onClose }: { villa: Villa; onClose: () => void }) {
  const [showVideo, setShowVideo] = useState(false);

  // Lock background scroll while modal is open
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !showVideo) onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, showVideo]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        role="dialog"
        aria-modal="true"
        aria-label={`${villa.name} details`}
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        <motion.div
          className="relative w-full max-w-4xl rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row"
          style={{ backgroundColor: "#fff", maxHeight: "92vh" }}
          initial={{ scale: 0.92, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.92, y: 20 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button — always visible, easy to tap on mobile */}
          <button
            onClick={onClose}
            aria-label="Close villa details"
            className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center text-gray-700 shadow-md transition-transform duration-200 hover:scale-110 active:scale-95 text-lg font-bold"
          >
            ×
          </button>

          {/* Landscape photo — full-width banner on mobile, fixed side column on desktop */}
          <div className="relative w-full lg:w-[42%] flex-shrink-0 aspect-video lg:aspect-auto lg:h-auto lg:self-stretch">
            <img src={villa.image} alt={villa.name} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
            <div className="absolute bottom-4 left-6">
              <span
                className="px-3 py-1 rounded-full text-xs uppercase tracking-widest"
                style={{ backgroundColor: "#00b4d8", color: "#fff", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                {villa.tag}
              </span>
            </div>
          </div>

          {/* Scrollable content column */}
          <div className="p-6 sm:p-7 overflow-y-auto flex-1" style={{ minWidth: 0 }}>
            <div className="flex items-start justify-between gap-3 mb-3">
              <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: "1.5rem", fontWeight: 700, color: "#1a2e1a" }}>
                {villa.name}
              </h3>
              <div className="text-right flex-shrink-0">
                <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.72rem", color: "#9aaa8e", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  Starting at
                </p>
                <p style={{ fontFamily: "'Fraunces', serif", fontSize: "1.4rem", fontWeight: 800, color: "#00b4d8" }}>
                  ₱{villa.startingPrice.toLocaleString()}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 mb-4">
              <span className="flex items-center gap-1.5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.88rem", color: "#6b7a5e" }}>
                <Users size={14} color="#00b4d8" />
                <strong style={{ color: "#1a2e1a" }}>{villa.capacity} Pax</strong> capacity
              </span>
            </div>
            <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#4a5e40", lineHeight: 1.75, fontSize: "0.92rem" }} className="mb-5">
              {villa.desc}
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {villa.features.map((f) => (
                <span key={f} className="px-3 py-1 rounded-full text-sm" style={{ backgroundColor: "#e0f7fa", color: "#007a9a", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  {f}
                </span>
              ))}
            </div>

            {villa.rateTiers.length > 0 && (
              <div className="rounded-2xl overflow-hidden border mb-5" style={{ borderColor: "#e0f7fa" }}>
                <div className="px-4 py-2.5" style={{ backgroundColor: "#f0fafe" }}>
                  <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.8rem", fontWeight: 700, color: "#007a9a" }}>
                    Standard Rates
                  </span>
                </div>
                <div className="divide-y" style={{ borderColor: "#f0fafe" }}>
                  {villa.rateTiers.map((tier) => (
                    <div key={tier.label} className="px-4 py-2.5 flex items-center justify-between gap-3" style={{ borderBottom: "1px solid #f0fafe" }}>
                      <div className="flex items-baseline gap-2 flex-wrap">
                        <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.9rem", fontWeight: 700, color: "#1a2e1a" }}>
                          ₱{tier.price.toLocaleString()}
                        </span>
                        <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.78rem", color: "#6b7a5e" }}>
                          {tier.pax} · {tier.rooms}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                {villa.rateTiers.some((t) => "note" in t && t.note) && (
                  <div className="px-4 py-2.5" style={{ backgroundColor: "#fff8e1" }}>
                    {villa.rateTiers.filter((t): t is typeof t & { note: string } => "note" in t && !!t.note).map((t) => (
                      <p key={t.label} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.74rem", color: "#7a6000", lineHeight: 1.5 }}>
                        {t.label}: {t.note}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div className="flex items-center gap-3 p-3 rounded-xl mb-5" style={{ backgroundColor: "#fff8e1" }}>
              <span style={{ fontSize: "1.1rem" }}>🕐</span>
              <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.85rem", color: "#7a6000" }}>
                <strong>Check-in:</strong> 3:00 PM &nbsp;|&nbsp; <strong>Check-out:</strong> 12:00 NN
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowVideo(true)}
                className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-full font-semibold transition-all duration-200 hover:scale-[1.02]"
                style={{ backgroundColor: "#fff8e1", color: "#7a6000", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                <PlayCircle size={18} />
                Villa Tour
              </button>
              <a
                href="#booking"
                onClick={onClose}
                className="flex-1 block text-center py-3.5 rounded-full font-semibold text-white transition-all duration-200 hover:opacity-90 hover:scale-[1.02]"
                style={{ backgroundColor: "#00b4d8", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Reserve This Villa
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
      {showVideo && <VideoModal src={villa.tourVideo} title={villa.name} onClose={() => setShowVideo(false)} />}
    </AnimatePresence>
  );
}

export function VillaShowcase() {
  const [selected, setSelected] = useState<Villa | null>(null);
  const [videoVilla, setVideoVilla] = useState<Villa | null>(null);

  return (
    <section id="villas" className="py-20" style={{ background: "linear-gradient(180deg, #fdf6ec 0%, #e0f7fa 100%)" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <span
            className="inline-block px-4 py-1.5 rounded-full text-sm tracking-widest uppercase mb-4"
            style={{ backgroundColor: "#e0f7fa", color: "#007a9a", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Accommodations
          </span>
          <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(2rem, 4vw, 3rem)", color: "#1a2e1a", fontWeight: 700 }}>
            Our <span style={{ color: "#00b4d8" }}>Villa</span> Collection
          </h2>
          <p className="mt-4 max-w-xl mx-auto" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#6b7a5e", fontSize: "1.05rem", lineHeight: 1.7 }}>
            Five private villas — each designed for comfort, joy, and unforgettable memories.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-5">
            {[
              { label: "30–50 Pax per Villa", color: "#e0f7fa", text: "#007a9a" },
            ].map(({ label, color, text }) => (
              <span key={label} className="px-4 py-1.5 rounded-full text-sm font-medium" style={{ backgroundColor: color, color: text, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* Individual villas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
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
                <div className="text-center py-1.5 text-xs font-semibold tracking-widest uppercase text-white" style={{ backgroundColor: "#00b4d8", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  ★ Most Popular
                </div>
              )}
              <div className="relative h-52 overflow-hidden">
                <img src={villa.image} alt={villa.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs uppercase tracking-wide" style={{ backgroundColor: "rgba(0,180,216,0.85)", color: "#fff", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  {villa.tag}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setVideoVilla(villa);
                  }}
                  className="absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 hover:scale-105"
                  style={{ backgroundColor: "rgba(255,255,255,0.95)", color: "#1a2e1a", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  aria-label={`Watch ${villa.name} tour video`}
                >
                  <PlayCircle size={15} color="#e8a33d" />
                  Villa Tour
                </button>
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: "1.2rem", fontWeight: 700, color: "#1a2e1a" }}>{villa.name}</h3>
                  <div className="flex items-center gap-1">
                    <Star size={13} fill="#f5c42c" stroke="none" />
                    <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.85rem", color: "#6b7a5e" }}>{villa.rating}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <span style={{ fontFamily: "'Fraunces', serif", fontSize: "1.35rem", fontWeight: 800, color: "#00b4d8" }}>
                    ₱{villa.startingPrice.toLocaleString()}
                  </span>
                  <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.8rem", color: "#9aaa8e" }}>starting rate</span>
                  <span className="flex items-center gap-1 ml-auto" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.85rem", color: "#6b7a5e" }}>
                    <Users size={13} color="#00b4d8" />
                    {villa.capacity} pax
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {villa.features.slice(0, 3).map((f) => (
                    <span key={f} className="px-2.5 py-0.5 rounded-full text-xs" style={{ backgroundColor: "#e0f7fa", color: "#007a9a", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      {f}
                    </span>
                  ))}
                </div>
                <button className="flex items-center gap-2 text-sm font-semibold transition-all duration-200 group-hover:gap-3" style={{ color: "#00b4d8", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  View Details <ArrowRight size={15} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {selected && <VillaModal villa={selected} onClose={() => setSelected(null)} />}
      <AnimatePresence>
        {videoVilla && (
          <VideoModal src={videoVilla.tourVideo} title={videoVilla.name} onClose={() => setVideoVilla(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
