import Masonry from "react-responsive-masonry";
import ResponsiveMasonry from "react-responsive-masonry";
import { motion } from "motion/react";
import { useState } from "react";
import { X } from "lucide-react";

const photos = [
  { id: 1, src: "https://images.unsplash.com/photo-1594099462046-1df31fd4a66c?w=600&h=700&fit=crop&auto=format", alt: "Hotspring pool with mountain backdrop" },
  { id: 2, src: "https://images.unsplash.com/photo-1729391512126-c799d8d3f378?w=600&h=450&fit=crop&auto=format", alt: "Palm trees by the pool" },
  { id: 3, src: "https://images.unsplash.com/photo-1776762893034-c437e452f1be?w=600&h=400&fit=crop&auto=format", alt: "Lounge chairs by the lawn" },
  { id: 4, src: "https://images.unsplash.com/photo-1766937754720-4d30de201fd1?w=600&h=650&fit=crop&auto=format", alt: "Villa surrounded by tropical foliage" },
  { id: 5, src: "https://images.unsplash.com/photo-1565190503580-3fe10c3f12db?w=600&h=500&fit=crop&auto=format", alt: "Fun pool floaty in crystal-clear water" },
  { id: 6, src: "https://images.unsplash.com/photo-1562131470-af37433ba70c?w=600&h=420&fit=crop&auto=format", alt: "Lush tropical garden plants" },
  { id: 7, src: "https://images.unsplash.com/photo-1694885090746-d90472e11c0e?w=600&h=480&fit=crop&auto=format", alt: "Covered BBQ patio area" },
  { id: 8, src: "https://images.unsplash.com/photo-1756802156662-d0fa771ba255?w=600&h=520&fit=crop&auto=format", alt: "Resort pool lounge with chairs" },
  { id: 9, src: "https://images.unsplash.com/photo-1709390083401-4fdbc56970d9?w=600&h=460&fit=crop&auto=format", alt: "Aerial view of resort and gardens" },
];

export function GallerySection() {
  const [lightbox, setLightbox] = useState<typeof photos[0] | null>(null);

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

        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 650: 2, 1000: 3 }}>
          <Masonry gutter="16px">
            {photos.map((photo, i) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.5 }}
                className="relative rounded-2xl overflow-hidden cursor-pointer group shadow-md hover:shadow-xl transition-shadow duration-300"
                onClick={() => setLightbox(photo)}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300 flex items-center justify-center">
                  <span
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-sm px-4 py-2 rounded-full"
                    style={{ backgroundColor: "rgba(244,114,27,0.85)", fontFamily: "'DM Sans', sans-serif" }}
                  >
                    View Photo
                  </span>
                </div>
              </motion.div>
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center text-white transition-colors"
            onClick={() => setLightbox(null)}
          >
            <X size={20} />
          </button>
          <motion.img
            src={lightbox.src.replace("w=600", "w=1200")}
            alt={lightbox.alt}
            className="max-w-full max-h-[90vh] rounded-2xl shadow-2xl object-contain"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
