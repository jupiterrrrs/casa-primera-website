import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const slides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1594099462046-1df31fd4a66c?w=1600&h=900&fit=crop&auto=format",
    alt: "Natural hotspring pool surrounded by lush greenery",
    label: "Natural Hotspring Pools",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1766937754720-4d30de201fd1?w=1600&h=900&fit=crop&auto=format",
    alt: "Private villa nestled in tropical foliage",
    label: "Private Tropical Villas",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1776762893034-c437e452f1be?w=1600&h=900&fit=crop&auto=format",
    alt: "Lush resort garden with lounge chairs by the pool",
    label: "Serene Garden Escapes",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1565190503580-3fe10c3f12db?w=1600&h=900&fit=crop&auto=format",
    alt: "Night swimming in illuminated pool",
    label: "Night Swimming Experience",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1756802156662-d0fa771ba255?w=1600&h=900&fit=crop&auto=format",
    alt: "Resort events area and pool lounge",
    label: "Events & Celebrations",
  },
];

export function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const next = useCallback(() => setCurrent((c) => (c + 1) % slides.length), []);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + slides.length) % slides.length), []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, next]);

  return (
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden bg-[#1a2e1a]">
      <AnimatePresence mode="wait">
        <motion.div
          key={slides[current].id}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <img
            src={slides[current].image}
            alt={slides[current].alt}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60" />
        </motion.div>
      </AnimatePresence>

      {/* Overlay content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <motion.div
          key={`label-${current}`}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-4"
        >
          <span
            className="inline-block px-4 py-1.5 rounded-full text-sm tracking-widest uppercase text-white/90"
            style={{ backgroundColor: "rgba(244,114,27,0.75)", fontFamily: "'DM Sans', sans-serif" }}
          >
            {slides[current].label}
          </span>
        </motion.div>
        <motion.h1
          key={`title-${current}`}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.7 }}
          style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.4rem, 6vw, 5rem)", fontWeight: 800, color: "#fff", lineHeight: 1.15, textShadow: "0 2px 24px rgba(0,0,0,0.35)" }}
          className="mb-4 max-w-4xl"
        >
          Casa Primera<br />
          <span style={{ color: "#f4a261" }}>Hotspring Resort</span>
        </motion.h1>
        <motion.p
          key={`tag-${current}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(1rem, 2.5vw, 1.4rem)", color: "rgba(255,255,255,0.88)", letterSpacing: "0.08em" }}
          className="mb-10 tracking-wide"
        >
          Relax, Refresh, Reconnect
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.6 }}
          className="flex gap-4 flex-wrap justify-center"
        >
          <a
            href="#booking"
            className="px-8 py-3.5 rounded-full text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl"
            style={{ backgroundColor: "#f4721b", fontFamily: "'DM Sans', sans-serif", fontSize: "1rem" }}
          >
            Book Now
          </a>
          <a
            href="#villas"
            className="px-8 py-3.5 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl border-2 border-white/70 text-white hover:bg-white/10"
            style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem" }}
          >
            Explore Villas
          </a>
        </motion.div>
      </div>

      {/* Prev/Next */}
      <button
        onClick={() => { prev(); setIsAutoPlaying(false); }}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm flex items-center justify-center text-white transition-all duration-200 hover:scale-110"
        aria-label="Previous slide"
      >
        <ChevronLeft size={22} />
      </button>
      <button
        onClick={() => { next(); setIsAutoPlaying(false); }}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm flex items-center justify-center text-white transition-all duration-200 hover:scale-110"
        aria-label="Next slide"
      >
        <ChevronRight size={22} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2.5">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => { setCurrent(i); setIsAutoPlaying(false); }}
            className="transition-all duration-300 rounded-full"
            style={{
              width: i === current ? "2rem" : "0.5rem",
              height: "0.5rem",
              backgroundColor: i === current ? "#f4721b" : "rgba(255,255,255,0.55)",
            }}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
