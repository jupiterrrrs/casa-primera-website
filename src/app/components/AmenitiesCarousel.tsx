import { useState, useRef, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Waves, Home, Mic2, Flame, Wifi, TreePine, Star, Users, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const amenities = [
  {
    id: 1,
    icon: Waves,
    title: "Natural Hotspring Pool",
    desc: "Soak in mineral-rich volcanic spring water renowned for its therapeutic benefits, open day and night.",
    image: "/images/amenities/hotspring-pool.jpg",
    color: "#00b4d8",
  },
  {
    id: 2,
    icon: Home,
    title: "Private Villas",
    desc: "Cozy, fully-furnished villas with air conditioning, private bathrooms, and breathtaking garden views.",
    image: "/images/amenities/private-villas.jpg",
    color: "#2d6a4f",
  },
  {
    id: 3,
    icon: Mic2,
    title: "Karaoke Area",
    desc: "Belt out your favorite songs with friends and family in our fully-equipped karaoke rooms.",
    image: "/images/amenities/karaoke.jpg",
    color: "#f4721b",
  },
  {
    id: 4,
    icon: Flame,
    title: "BBQ Grill Station",
    desc: "Fire up the grill under the stars. All cooking equipment provided for the perfect outdoor feast.",
    image: "/images/amenities/bbq-grill.jpg",
    color: "#e76f51",
  },
  {
    id: 5,
    icon: Wifi,
    title: "Free High-Speed WiFi",
    desc: "Stay connected throughout the resort with complimentary fast and reliable internet access.",
    image: "/images/amenities/wifi-room.jpg",
    color: "#00b4d8",
  },
  {
    id: 6,
    icon: TreePine,
    title: "Tropical Garden",
    desc: "Stroll through our lush, manicured tropical gardens — a living sanctuary of calm and natural beauty.",
    image: "/images/amenities/garden.jpg",
    color: "#52b788",
  },
  {
    id: 7,
    icon: Star,
    title: "Events Area",
    desc: "Host birthdays, reunions, and celebrations in our spacious covered events hall with full catering support.",
    image: "/images/amenities/events-area.jpg",
    color: "#f4a261",
  },
  {
    id: 8,
    icon: Users,
    title: "Family-Friendly Pools",
    desc: "Separate shallow pools for kids and adults — safe, clean, and perfect for all-day family fun.",
    image: "/images/amenities/family-pools.jpg",
    color: "#2d6a4f",
  },
];

// ── Fullscreen lightbox for browsing amenity photos ─────────────────────────
function AmenityLightbox({
  index,
  onClose,
  onPrev,
  onNext,
}: {
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const amenity = amenities[index];
  const Icon = amenity.icon;

  // Lock background scroll while open
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  // Keyboard navigation: Escape to close, arrows to flip through
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, onPrev, onNext]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-label={`${amenity.title} photo viewer`}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" />

      {/* Close button — always visible, easy to tap on mobile */}
      <button
        onClick={onClose}
        aria-label="Close photo viewer"
        className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow-lg transition-transform duration-200 hover:scale-110 active:scale-95"
        style={{ backgroundColor: "#fff" }}
      >
        <X size={22} color="#1a2e1a" />
      </button>

      {/* Prev arrow */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        aria-label="Previous amenity"
        className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow-lg transition-transform duration-200 hover:scale-110 active:scale-95"
        style={{ backgroundColor: "rgba(255,255,255,0.92)" }}
      >
        <ChevronLeft size={24} color="#1a2e1a" />
      </button>

      {/* Next arrow */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        aria-label="Next amenity"
        className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow-lg transition-transform duration-200 hover:scale-110 active:scale-95"
        style={{ backgroundColor: "rgba(255,255,255,0.92)" }}
      >
        <ChevronRight size={24} color="#1a2e1a" />
      </button>

      <motion.div
        key={amenity.id}
        className="relative w-full max-w-3xl rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl"
        style={{ backgroundColor: "#fff", maxHeight: "88vh" }}
        initial={{ scale: 0.94, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.94, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full" style={{ aspectRatio: "4 / 3", maxHeight: "62vh" }}>
          <img src={amenity.image} alt={amenity.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <div
            className="absolute top-4 left-4 w-10 h-10 rounded-full flex items-center justify-center"
            style={{ backgroundColor: amenity.color }}
          >
            <Icon size={18} color="#fff" />
          </div>
        </div>
        <div className="p-5 sm:p-7">
          <h3
            style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.35rem", fontWeight: 700, color: "#1a2e1a" }}
            className="mb-2"
          >
            {amenity.title}
          </h3>
          <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#6b7a5e", fontSize: "0.95rem", lineHeight: 1.7 }}>
            {amenity.desc}
          </p>
          <p
            className="mt-4 text-center sm:hidden"
            style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.78rem", color: "#9aaa8e" }}
          >
            {index + 1} / {amenities.length} · Swipe or tap the arrows to browse
          </p>
          <p
            className="mt-4 hidden sm:block"
            style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.78rem", color: "#9aaa8e" }}
          >
            {index + 1} of {amenities.length}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function AmenitiesCarousel() {
  const [startIdx, setStartIdx] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const cardsVisible = 3;
  const trackRef = useRef<HTMLDivElement>(null);

  const canPrev = startIdx > 0;
  const canNext = startIdx < amenities.length - cardsVisible;

  const showPrevAmenity = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i - 1 + amenities.length) % amenities.length));
  }, []);
  const showNextAmenity = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i + 1) % amenities.length));
  }, []);

  return (
    <section className="py-20 overflow-hidden" style={{ background: "#fdf6ec" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <span
            className="inline-block px-4 py-1.5 rounded-full text-sm tracking-widest uppercase mb-4"
            style={{ backgroundColor: "#e8f5e9", color: "#2d6a4f", fontFamily: "'DM Sans', sans-serif" }}
          >
            What We Offer
          </span>
          <h2
            style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3rem)", color: "#1a2e1a", fontWeight: 700 }}
          >
            Resort <span style={{ color: "#f4721b" }}>Amenities</span>
          </h2>
          <p
            className="mt-4 max-w-2xl mx-auto"
            style={{ fontFamily: "'DM Sans', sans-serif", color: "#6b7a5e", fontSize: "1.05rem", lineHeight: 1.7 }}
          >
            Everything you need for a perfect tropical getaway — all in one beautiful place.
          </p>
        </div>

        <div className="relative">
          {/* Nav buttons */}
          <button
            onClick={() => setStartIdx((i) => Math.max(0, i - 1))}
            disabled={!canPrev}
            className="absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110 disabled:opacity-30 disabled:cursor-not-allowed"
            style={{ backgroundColor: "#f4721b", color: "#fff" }}
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => setStartIdx((i) => Math.min(amenities.length - cardsVisible, i + 1))}
            disabled={!canNext}
            className="absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110 disabled:opacity-30 disabled:cursor-not-allowed"
            style={{ backgroundColor: "#f4721b", color: "#fff" }}
          >
            <ChevronRight size={20} />
          </button>

          <div className="overflow-hidden mx-4" ref={trackRef}>
            <motion.div
              className="flex gap-6"
              animate={{ x: `calc(-${startIdx} * (100% / ${cardsVisible} + 8px))` }}
              transition={{ type: "spring", stiffness: 280, damping: 32 }}
            >
              {amenities.map((a) => {
                const Icon = a.icon;
                return (
                  <div
                    key={a.id}
                    className="flex-shrink-0 rounded-2xl overflow-hidden shadow-md group cursor-pointer transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl"
                    style={{ width: `calc((100% - ${(cardsVisible - 1) * 24}px) / ${cardsVisible})`, backgroundColor: "#fff" }}
                    onClick={() => setLightboxIndex(amenities.findIndex((x) => x.id === a.id))}
                    role="button"
                    tabIndex={0}
                    aria-label={`View ${a.title} photo`}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setLightboxIndex(amenities.findIndex((x) => x.id === a.id));
                      }
                    }}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={a.image}
                        alt={a.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                      <div
                        className="absolute top-4 left-4 w-10 h-10 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: a.color }}
                      >
                        <Icon size={18} color="#fff" />
                      </div>
                    </div>
                    <div className="p-5">
                      <h3
                        style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.15rem", fontWeight: 700, color: "#1a2e1a" }}
                        className="mb-2"
                      >
                        {a.title}
                      </h3>
                      <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#6b7a5e", fontSize: "0.9rem", lineHeight: 1.65 }}>
                        {a.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: amenities.length - cardsVisible + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setStartIdx(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === startIdx ? "1.5rem" : "0.5rem",
                height: "0.5rem",
                backgroundColor: i === startIdx ? "#f4721b" : "#d6c9a8",
              }}
              aria-label={`Go to position ${i + 1}`}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <AmenityLightbox
            index={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onPrev={showPrevAmenity}
            onNext={showNextAmenity}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
