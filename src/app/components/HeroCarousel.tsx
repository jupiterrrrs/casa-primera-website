import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const slides = [
  {
    id: 1,
    image: "/images/hero/carousel5.jpg",
    alt: "Casa Primera Villa 1 exterior",
    label: "Casa Primera Villa 1",
  },
  {
    id: 2,
    image: "/images/villas/villa2.jpg",
    alt: "Casa Primera Villa 2 exterior",
    label: "Casa Primera Villa 2",
  },
  {
    id: 3,
    image: "/images/villas/villa3.jpg",
    alt: "Casa Primera Villa 3 exterior",
    label: "Casa Primera Villa 3",
  },
  {
    id: 4,
    image: "/images/villas/villa4.jpg",
    alt: "Casa Primera Villa 4 exterior",
    label: "Casa Primera Villa 4",
  },
  {
    id: 5,
    image: "/images/hero/carousel1.jpg",
    alt: "Casa Primera Villa 5 exterior",
    label: "Casa Primera Villa 5",
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
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden bg-[#333333]">
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
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pt-28 sm:pt-24">
        <motion.div
          key={`label-${current}`}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="mb-5 mt-2 w-full flex justify-center"
        >
          <span
            className="inline-block px-5 py-2 rounded-full text-sm font-bold tracking-widest uppercase text-center"
            style={{ backgroundColor: "#45B3C0", color: "#fff", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            {slides[current].label}
          </span>
        </motion.div>

        {/* Tagline — soft glow, no card edges, blends into photo */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.7, ease: "easeOut" }}
          className="mb-10 mx-auto px-7 py-10 sm:px-14 sm:py-14 max-w-xl w-full"
          style={{
            background: "radial-gradient(ellipse 85% 80% at center, rgba(15,90,100,0.38) 0%, rgba(15,90,100,0.22) 45%, rgba(15,90,100,0.08) 70%, rgba(15,90,100,0) 88%)",
          }}
        >
          <p
            style={{
              fontFamily: "'Alex Brush', cursive",
              fontSize: "clamp(1.5rem, 4.2vw, 2.5rem)",
              color: "#FFEB3B",
              lineHeight: 1.1,
              textShadow: "0 2px 10px rgba(0,0,0,0.3)",
            }}
          >
            Your Private Escape.
          </p>
          <h1
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(1.4rem, 7.5vw, 3.4rem)",
              color: "#fff",
              letterSpacing: "0.01em",
              lineHeight: 1.08,
              textShadow: "0 3px 14px rgba(0,0,0,0.4)",
              margin: "0.15em 0",
              whiteSpace: "nowrap",
            }}
          >
            RELAX. REFRESH.
          </h1>
          <p
            style={{
              fontFamily: "'Alex Brush', cursive",
              fontSize: "clamp(2.1rem, 7vw, 3.6rem)",
              color: "#FFEB3B",
              lineHeight: 1,
              textShadow: "0 2px 10px rgba(0,0,0,0.3)",
              marginBottom: "0.55em",
            }}
          >
            Reconnect.
          </p>
          <p
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "clamp(0.82rem, 2.1vw, 1.05rem)",
              color: "rgba(255,255,255,0.95)",
              lineHeight: 1.65,
            }}
          >
            Natural Hot Spring. A place where comfort feels like home — to <strong style={{ fontWeight: 700 }}>gather, sing, laugh,</strong> and create <strong style={{ fontWeight: 700 }}>memories your heart will always return to.</strong>
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex gap-4 flex-wrap justify-center"
        >
          <a
            href="#booking"
            className="px-8 py-3.5 rounded-full text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl"
            style={{ backgroundColor: "#45B3C0", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "1rem" }}
          >
            Book Now
          </a>
          <a
            href="#villas"
            className="px-8 py-3.5 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl border-2 border-white/70 text-white hover:bg-white/10"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "1rem" }}
          >
            Explore Villas
          </a>
        </motion.div>
      </div>

      {/* Prev/Next */}
      <button
        onClick={() => { prev(); setIsAutoPlaying(false); }}
        className="absolute left-2 sm:left-4 md:left-8 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm flex items-center justify-center text-white transition-all duration-200 hover:scale-110"
        aria-label="Previous slide"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={() => { next(); setIsAutoPlaying(false); }}
        className="absolute right-2 sm:right-4 md:right-8 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm flex items-center justify-center text-white transition-all duration-200 hover:scale-110"
        aria-label="Next slide"
      >
        <ChevronRight size={20} />
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
              backgroundColor: i === current ? "#45B3C0" : "rgba(255,255,255,0.55)",
            }}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
