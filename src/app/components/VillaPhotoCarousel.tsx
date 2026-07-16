import { useState, useRef, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, X, Images } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// ── Fullscreen lightbox for browsing a villa's photos ───────────────────────
function PhotoLightbox({
  photos,
  villaName,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  photos: string[];
  villaName: string;
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
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
      className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-label={`${villaName} photo viewer`}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />

      <button
        onClick={onClose}
        aria-label="Close photo viewer"
        className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow-lg transition-transform duration-200 hover:scale-110 active:scale-95"
        style={{ backgroundColor: "#fff" }}
      >
        <X size={22} color="#333333" />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        aria-label="Previous photo"
        className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow-lg transition-transform duration-200 hover:scale-110 active:scale-95"
        style={{ backgroundColor: "rgba(255,255,255,0.92)" }}
      >
        <ChevronLeft size={24} color="#333333" />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        aria-label="Next photo"
        className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow-lg transition-transform duration-200 hover:scale-110 active:scale-95"
        style={{ backgroundColor: "rgba(255,255,255,0.92)" }}
      >
        <ChevronRight size={24} color="#333333" />
      </button>

      <motion.div
        key={index}
        className="relative w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl"
        style={{ maxHeight: "82vh" }}
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.96, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={photos[index]}
          alt={`${villaName} photo ${index + 1}`}
          className="w-full h-full object-contain bg-black"
          style={{ maxHeight: "82vh" }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 px-4 py-2.5 flex items-center justify-between"
          style={{ backgroundColor: "rgba(0,0,0,0.65)" }}
        >
          <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#fff", fontSize: "0.85rem", fontWeight: 600 }}>
            {villaName}
          </span>
          <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#DCF1F3", fontSize: "0.78rem" }}>
            {index + 1} / {photos.length}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Horizontal scrollable photo strip, opens the lightbox on tap ───────────
export function VillaPhotoCarousel({ photos, villaName }: { photos: string[]; villaName: string }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const showPrev = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i - 1 + photos.length) % photos.length));
  }, [photos.length]);
  const showNext = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i + 1) % photos.length));
  }, [photos.length]);

  const scrollBy = (dir: 1 | -1) => {
    trackRef.current?.scrollBy({ left: dir * 260, behavior: "smooth" });
  };

  if (!photos || photos.length === 0) return null;

  return (
    <div className="mb-5">
      <div className="flex items-center justify-between mb-2.5">
        <span
          className="flex items-center gap-1.5"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.8rem", fontWeight: 700, color: "#333333" }}
        >
          <Images size={14} color="#45B3C0" />
          Photo Gallery
          <span style={{ color: "#999999", fontWeight: 500 }}>({photos.length})</span>
        </span>
        <div className="hidden sm:flex items-center gap-1.5">
          <button
            onClick={() => scrollBy(-1)}
            aria-label="Scroll photos left"
            className="w-7 h-7 rounded-full flex items-center justify-center transition-transform duration-150 hover:scale-110"
            style={{ backgroundColor: "#DCF1F3" }}
          >
            <ChevronLeft size={14} color="#333333" />
          </button>
          <button
            onClick={() => scrollBy(1)}
            aria-label="Scroll photos right"
            className="w-7 h-7 rounded-full flex items-center justify-center transition-transform duration-150 hover:scale-110"
            style={{ backgroundColor: "#DCF1F3" }}
          >
            <ChevronRight size={14} color="#333333" />
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        className="flex gap-2.5 overflow-x-auto pb-1"
        style={{ scrollSnapType: "x mandatory", scrollbarWidth: "thin" }}
      >
        {photos.map((src, i) => (
          <button
            key={src}
            onClick={() => setLightboxIndex(i)}
            className="relative flex-shrink-0 rounded-xl overflow-hidden group"
            style={{ width: 128, height: 96, scrollSnapAlign: "start" }}
            aria-label={`View ${villaName} photo ${i + 1}`}
          >
            <img
              src={src}
              alt={`${villaName} photo ${i + 1}`}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-200" />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <PhotoLightbox
            photos={photos}
            villaName={villaName}
            index={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onPrev={showPrev}
            onNext={showNext}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
