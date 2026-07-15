import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const photos = [
  { id: 1, src: "/images/gallery/gallery1.jpg", alt: "Aerial drone view of Casa Primera Villa 1" },
  { id: 2, src: "/images/gallery/gallery2.jpg", alt: "Casa Primera Villa 1 entrance gate" },
  { id: 3, src: "/images/gallery/gallery3.jpg", alt: "Casa Primera Villa 1 front exterior" },
  { id: 4, src: "/images/gallery/gallery4.jpg", alt: "Casa Primera Villa 1 private hot spring pool" },
  { id: 5, src: "/images/gallery/gallery5.jpg", alt: "Casa Primera Villa 1 pool waterfall feature" },
  { id: 6, src: "/images/gallery/gallery6.jpg", alt: "Casa Primera Villa 1 garden gazebo" },
  { id: 7, src: "/images/gallery/gallery7.jpg", alt: "Casa Primera Villa 1 garden trellis walkway" },
  { id: 8, src: "/images/gallery/gallery8.jpg", alt: "Casa Primera Villa 1 veranda" },
  { id: 9, src: "/images/gallery/gallery9.jpg", alt: "Casa Primera Villa 1 dining hall" },
  { id: 10, src: "/images/gallery/gallery10.jpg", alt: "Casa Primera Villa 1 kitchen area" },
  { id: 11, src: "/images/gallery/gallery11.jpg", alt: "Casa Primera Villa 1 billiards and darts area" },
  { id: 12, src: "/images/gallery/gallery12.jpg", alt: "Casa Primera Villa 1 air-conditioned bedroom" },
  { id: 13, src: "/images/gallery/gallery13.jpg", alt: "Casa Primera Villa 1 bedroom interior" },
  { id: 14, src: "/images/gallery/gallery14.jpg", alt: "Casa Primera Villa 1 bathroom with shower heater" },
  { id: 15, src: "/images/gallery/gallery15.jpg", alt: "Casa Primera Villa 1 staircase" },
  { id: 16, src: "/images/gallery/gallery16.jpg", alt: "Casa Primera Villa 1 pool at night" },
  { id: 17, src: "/images/gallery/gallery17.jpg", alt: "Casa Primera Villa 1 kids' play area" },
  { id: 18, src: "/images/gallery/gallery18.jpg", alt: "Casa Primera Villa 2 exterior and pool" },
  { id: 19, src: "/images/gallery/gallery19.jpg", alt: "Casa Primera Villa 3 exterior and pool" },
  { id: 20, src: "/images/gallery/gallery20.jpg", alt: "Casa Primera Villa 4 exterior and pool" },
  { id: 21, src: "/images/gallery/gallery21.jpg", alt: "Casa Primera Villa 5 swimming area with cabanas" },
  { id: 22, src: "/images/gallery/gallery22.jpg", alt: "Casa Primera Villa 5 pool with mountain view" },
  { id: 23, src: "/images/gallery/gallery23.jpg", alt: "Casa Primera Villa 5 kids' play area" },
  { id: 24, src: "/images/gallery/gallery24.jpg", alt: "Casa Primera Villa 5 recreation hall with darts" },
];

function Lightbox({
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
  const photo = photos[index];

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
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, onPrev, onNext]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-3 sm:p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-label="Gallery photo viewer"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        aria-label="Close photo viewer"
        className="absolute top-4 right-4 sm:top-5 sm:right-5 z-20 w-11 h-11 sm:w-10 sm:h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center text-gray-800 shadow-lg transition-transform duration-200 hover:scale-110 active:scale-95"
      >
        <X size={20} />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        aria-label="Previous photo"
        className="absolute left-2 sm:left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/90 hover:bg-white flex items-center justify-center text-gray-800 shadow-lg transition-transform duration-200 hover:scale-110 active:scale-95"
      >
        <ChevronLeft size={22} />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        aria-label="Next photo"
        className="absolute right-2 sm:right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/90 hover:bg-white flex items-center justify-center text-gray-800 shadow-lg transition-transform duration-200 hover:scale-110 active:scale-95"
      >
        <ChevronRight size={22} />
      </button>

      <motion.img
        key={photo.id}
        src={photo.src}
        alt={photo.alt}
        className="max-w-full max-h-[85vh] rounded-2xl shadow-2xl object-contain"
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      />
      <p
        className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-xs sm:text-sm px-3 py-1 rounded-full"
        style={{ backgroundColor: "rgba(0,0,0,0.5)", fontFamily: "'DM Sans', sans-serif" }}
      >
        {index + 1} / {photos.length}
      </p>
    </motion.div>
  );
}

export function GallerySection() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const showPrev = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i - 1 + photos.length) % photos.length));
  }, []);
  const showNext = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i + 1) % photos.length));
  }, []);

  return (
    <section id="gallery" className="py-20" style={{ background: "#e8f5e9" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <span
            className="inline-block px-4 py-1.5 rounded-full text-sm tracking-widest uppercase mb-4"
            style={{ backgroundColor: "#fff3e0", color: "#f4721b", fontFamily: "'DM Sans', sans-serif" }}
          >
            Gallery
          </span>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3rem)", color: "#1a2e1a", fontWeight: 700 }}>
            A Glimpse of <span style={{ color: "#2d6a4f" }}>Paradise</span>
          </h2>
          <p className="mt-4 max-w-xl mx-auto" style={{ fontFamily: "'DM Sans', sans-serif", color: "#4a5e40", fontSize: "1.05rem", lineHeight: 1.7 }}>
            Every corner of Casa Primera is a photo waiting to happen.
          </p>
        </div>

        {/* Uniform responsive grid — fills full width, consistent landscape tiles */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {photos.map((photo, i) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 8) * 0.05, duration: 0.45 }}
              className="relative aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer group shadow-md hover:shadow-xl transition-shadow duration-300"
              onClick={() => setLightboxIndex(i)}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300 flex items-center justify-center">
                <span
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-center"
                  style={{ backgroundColor: "rgba(244,114,27,0.85)", fontFamily: "'DM Sans', sans-serif" }}
                >
                  View Photo
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox index={lightboxIndex} onClose={() => setLightboxIndex(null)} onPrev={showPrev} onNext={showNext} />
        )}
      </AnimatePresence>
    </section>
  );
}
