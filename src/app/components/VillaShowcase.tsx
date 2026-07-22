import { Users, Star, ArrowRight, Play, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { VillaPhotoCarousel } from "./VillaPhotoCarousel";

// Standard rate packages shared by Villa 1, 2 & 3
export const rateTiersABC = [
  { label: "A", price: 18000, pax: "1â€“10 pax", rooms: "2 Rooms" },
  { label: "B", price: 20000, pax: "11â€“15 pax", rooms: "3 Rooms" },
  { label: "C", price: 22000, pax: "16â€“20 pax", rooms: "4 Rooms", note: "+ â‚±500/head for 21â€“25 pax" },
  { label: "Dâ€“E", price: 27000, pax: "26â€“30 pax", rooms: "5 Rooms", note: "+ â‚±500/head in excess of 30 pax (Villa 2 or Villa 3 only)" },
];

// Standard rate packages for Villa 4 & 5
export const rateTiersDE = [
  { label: "A", price: 21000, pax: "1â€“10 pax", rooms: "2 Rooms" },
  { label: "B", price: 23000, pax: "11â€“15 pax", rooms: "3 Rooms" },
  { label: "C", price: 25000, pax: "16â€“20 pax", rooms: "4 Rooms", note: "+ â‚±500/head for 21â€“25 pax" },
  { label: "Dâ€“E", price: 30000, pax: "26â€“30 pax", rooms: "5 Rooms", note: "+ â‚±500/head in excess of 30 pax" },
];

export const villas = [
  {
    id: 1,
    name: "Casa Primera Villa 1",
    tourVideo: "https://www.youtube.com/embed/n3ePjSwWJOA?autoplay=1&rel=0",
    tag: "Pioneer Villa",
    startingPrice: rateTiersABC[0].price,
    rateTiers: rateTiersABC,
    capacity: "Up to 34",
    rating: 4.9,
    image: "/images/villas/villa1.jpg",
    photos: [
      "/images/villas/villa1-gallery/villa1-01.jpg", "/images/villas/villa1-gallery/villa1-02.jpg", "/images/villas/villa1-gallery/villa1-03.jpg",
      "/images/villas/villa1-gallery/villa1-04.jpg", "/images/villas/villa1-gallery/villa1-05.jpg", "/images/villas/villa1-gallery/villa1-06.jpg",
      "/images/villas/villa1-gallery/villa1-07.jpg", "/images/villas/villa1-gallery/villa1-08.jpg", "/images/villas/villa1-gallery/villa1-09.jpg",
      "/images/villas/villa1-gallery/villa1-10.jpg", "/images/villas/villa1-gallery/villa1-11.jpg", "/images/villas/villa1-gallery/villa1-12.jpg",
      "/images/villas/villa1-gallery/villa1-13.jpg", "/images/villas/villa1-gallery/villa1-14.jpg", "/images/villas/villa1-gallery/villa1-15.jpg",
      "/images/villas/villa1-gallery/villa1-16.jpg", "/images/villas/villa1-gallery/villa1-17.jpg", "/images/villas/villa1-gallery/villa1-18.jpg",
      "/images/villas/villa1-gallery/villa1-19.jpg", "/images/villas/villa1-gallery/villa1-20.jpg", "/images/villas/villa1-gallery/villa1-21.jpg",
      "/images/villas/villa1-gallery/villa1-22.jpg", "/images/villas/villa1-gallery/villa1-23.jpg", "/images/villas/villa1-gallery/villa1-24.jpg",
      "/images/villas/villa1-gallery/villa1-25.jpg", "/images/villas/villa1-gallery/villa1-26.jpg", "/images/villas/villa1-gallery/villa1-27.jpg",
      "/images/villas/villa1-gallery/villa1-28.jpg", "/images/villas/villa1-gallery/villa1-29.jpg", "/images/villas/villa1-gallery/villa1-30.jpg",
      "/images/villas/villa1-gallery/villa1-31.jpg", "/images/villas/villa1-gallery/villa1-32.jpg",
    ] as string[],
    features: ["5 Air-Con Bedrooms", "Adult & Kiddie Pool", "Garden & Playground", "Senior/PWD-Friendly"],
    desc: "As the pioneer villa of Casa Primera Hot Spring Resorts, Villa 1 is a 2-storey private villa perfect for family vacations, reunions, and intimate celebrations. It features a vast garden, a children's playground, a spacious dining hall, and a kitchen area. Guests can enjoy a private hot spring adult pool (4â€“5.5 ft deep) and a kiddie pool (2â€“3 ft deep). Designed to accommodate up to 34 guests, the villa offers five fully air-conditioned bedrooms, each with a private bathroom, shower heater, and hair dryer. With two ground-floor bedrooms and a wheelchair ramp, the villa is senior and PWD-friendly. Also includes FREE Wi-Fi, TVs, FREE videoke, a dining hall, kitchen, grilling area, and indoor parking for 1â€“2 vehicles.",
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
    tourVideo: "https://www.youtube.com/embed/XkJTKyfAStM?autoplay=1&rel=0&start=64",
    tag: "Family Deluxe",
    startingPrice: rateTiersABC[0].price,
    rateTiers: rateTiersABC,
    capacity: "Up to 40",
    rating: 4.8,
    image: "/images/villas/villa2.jpg",
    photos: [
      "/images/villas/villa2-gallery/villa2-01.jpg", "/images/villas/villa2-gallery/villa2-02.jpg", "/images/villas/villa2-gallery/villa2-03.jpg",
      "/images/villas/villa2-gallery/villa2-04.jpg", "/images/villas/villa2-gallery/villa2-05.jpg", "/images/villas/villa2-gallery/villa2-06.jpg",
      "/images/villas/villa2-gallery/villa2-07.jpg", "/images/villas/villa2-gallery/villa2-08.jpg", "/images/villas/villa2-gallery/villa2-09.jpg",
      "/images/villas/villa2-gallery/villa2-10.jpg", "/images/villas/villa2-gallery/villa2-11.jpg", "/images/villas/villa2-gallery/villa2-12.jpg",
      "/images/villas/villa2-gallery/villa2-13.jpg", "/images/villas/villa2-gallery/villa2-14.jpg", "/images/villas/villa2-gallery/villa2-15.jpg",
      "/images/villas/villa2-gallery/villa2-16.jpg", "/images/villas/villa2-gallery/villa2-17.jpg", "/images/villas/villa2-gallery/villa2-18.jpg",
      "/images/villas/villa2-gallery/villa2-19.jpg", "/images/villas/villa2-gallery/villa2-20.jpg", "/images/villas/villa2-gallery/villa2-21.jpg",
      "/images/villas/villa2-gallery/villa2-22.jpg", "/images/villas/villa2-gallery/villa2-23.jpg", "/images/villas/villa2-gallery/villa2-24.jpg",
      "/images/villas/villa2-gallery/villa2-25.jpg", "/images/villas/villa2-gallery/villa2-26.jpg", "/images/villas/villa2-gallery/villa2-27.jpg",
      "/images/villas/villa2-gallery/villa2-28.jpg", "/images/villas/villa2-gallery/villa2-29.jpg", "/images/villas/villa2-gallery/villa2-30.jpg",
      "/images/villas/villa2-gallery/villa2-31.jpg", "/images/villas/villa2-gallery/villa2-32.jpg", "/images/villas/villa2-gallery/villa2-33.jpg",
      "/images/villas/villa2-gallery/villa2-34.jpg", "/images/villas/villa2-gallery/villa2-35.jpg", "/images/villas/villa2-gallery/villa2-36.jpg",
      "/images/villas/villa2-gallery/villa2-37.jpg", "/images/villas/villa2-gallery/villa2-38.jpg", "/images/villas/villa2-gallery/villa2-39.jpg",
      "/images/villas/villa2-gallery/villa2-40.jpg", "/images/villas/villa2-gallery/villa2-41.jpg",
    ] as string[],
    features: ["5 Air-Con Bedrooms", "Adult & Kiddie Pool", "Children's Playground", "Senior/PWD-Friendly"],
    desc: "Create unforgettable moments with family and friends at Villa 2, a private villa designed for reunions, celebrations, and relaxing group getaways. It features a spacious children's playground and a private hot spring adult pool (4â€“5.5 ft deep) with kiddie pool (2â€“3 ft deep). Designed to accommodate up to 40 guests, the villa offers five fully air-conditioned bedrooms, including one ground-floor bedroom, making it senior and PWD-friendly. Each bedroom has a private bathroom, shower heater, and hair dryer. Includes a spacious dining hall, kitchen area, grilling area, FREE Wi-Fi, TVs, FREE videoke, and indoor parking for 4â€“5 vehicles.",
    highlight: false,
    blocked: [
      { from: new Date(2026, 6, 5), to: new Date(2026, 6, 8) },
      { from: new Date(2026, 6, 25), to: new Date(2026, 6, 27) },
    ],
  },
  {
    id: 3,
    name: "Casa Primera Villa 3",
    tourVideo: "https://www.youtube.com/embed/Mr_V3ZC_cMA?autoplay=1&rel=0",
    tag: "Tropical",
    startingPrice: rateTiersABC[0].price,
    rateTiers: rateTiersABC,
    capacity: "Up to 50",
    rating: 4.7,
    image: "/images/villas/villa3.jpg",
    photos: [
      "/images/villas/villa3-gallery/villa3-01.jpg", "/images/villas/villa3-gallery/villa3-02.jpg", "/images/villas/villa3-gallery/villa3-03.jpg",
      "/images/villas/villa3-gallery/villa3-04.jpg", "/images/villas/villa3-gallery/villa3-05.jpg", "/images/villas/villa3-gallery/villa3-06.jpg",
      "/images/villas/villa3-gallery/villa3-07.jpg", "/images/villas/villa3-gallery/villa3-08.jpg", "/images/villas/villa3-gallery/villa3-09.jpg",
      "/images/villas/villa3-gallery/villa3-10.jpg", "/images/villas/villa3-gallery/villa3-11.jpg", "/images/villas/villa3-gallery/villa3-12.jpg",
      "/images/villas/villa3-gallery/villa3-13.jpg", "/images/villas/villa3-gallery/villa3-14.jpg", "/images/villas/villa3-gallery/villa3-15.jpg",
      "/images/villas/villa3-gallery/villa3-16.jpg", "/images/villas/villa3-gallery/villa3-17.jpg", "/images/villas/villa3-gallery/villa3-18.jpg",
      "/images/villas/villa3-gallery/villa3-19.jpg", "/images/villas/villa3-gallery/villa3-20.jpg", "/images/villas/villa3-gallery/villa3-21.jpg",
      "/images/villas/villa3-gallery/villa3-22.jpg", "/images/villas/villa3-gallery/villa3-23.jpg", "/images/villas/villa3-gallery/villa3-24.jpg",
      "/images/villas/villa3-gallery/villa3-25.jpg", "/images/villas/villa3-gallery/villa3-26.jpg", "/images/villas/villa3-gallery/villa3-27.jpg",
      "/images/villas/villa3-gallery/villa3-28.jpg", "/images/villas/villa3-gallery/villa3-29.jpg", "/images/villas/villa3-gallery/villa3-30.jpg",
      "/images/villas/villa3-gallery/villa3-31.jpg", "/images/villas/villa3-gallery/villa3-32.jpg", "/images/villas/villa3-gallery/villa3-33.jpg",
      "/images/villas/villa3-gallery/villa3-34.jpg", "/images/villas/villa3-gallery/villa3-35.jpg", "/images/villas/villa3-gallery/villa3-36.jpg",
      "/images/villas/villa3-gallery/villa3-37.jpg", "/images/villas/villa3-gallery/villa3-38.jpg", "/images/villas/villa3-gallery/villa3-39.jpg",
      "/images/villas/villa3-gallery/villa3-40.jpg", "/images/villas/villa3-gallery/villa3-41.jpg", "/images/villas/villa3-gallery/villa3-42.jpg",
      "/images/villas/villa3-gallery/villa3-43.jpg", "/images/villas/villa3-gallery/villa3-44.jpg",
    ] as string[],
    features: ["6 Air-Con Bedrooms", "Jacuzzi Available", "Adult & Kiddie Pool", "Senior/PWD-Friendly"],
    desc: "Surrounded by lush trees and greenery, Villa 3 provides a peaceful setting to relax, reconnect, and create lasting memories. It features larger bedrooms, a private hot spring adult pool (4â€“4.5 ft deep), a kiddie pool (2â€“2.5 ft deep), and a jacuzzi available for rent. Designed to accommodate up to 50 guests, the villa offers six fully air-conditioned bedrooms, including two ground-floor bedrooms, making it senior and PWD-friendly. Four bedrooms have their own private bathroom, while two share a nearby common bathroom. Includes a dining area, kitchen, grilling area, FREE Wi-Fi, TVs, FREE videoke, table tennis, billiards, darts, water volleyball, a playground, and indoor parking for 2â€“3 vehicles.",
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
    capacity: "Up to 40",
    rating: 4.9,
    image: "/images/villas/villa4.jpg",
    photos: [
      "/images/villas/villa4-gallery/villa4-01.jpg", "/images/villas/villa4-gallery/villa4-02.jpg", "/images/villas/villa4-gallery/villa4-03.jpg",
      "/images/villas/villa4-gallery/villa4-04.jpg", "/images/villas/villa4-gallery/villa4-05.jpg", "/images/villas/villa4-gallery/villa4-06.jpg",
      "/images/villas/villa4-gallery/villa4-07.jpg", "/images/villas/villa4-gallery/villa4-08.jpg", "/images/villas/villa4-gallery/villa4-09.jpg",
      "/images/villas/villa4-gallery/villa4-10.jpg", "/images/villas/villa4-gallery/villa4-11.jpg", "/images/villas/villa4-gallery/villa4-12.jpg",
      "/images/villas/villa4-gallery/villa4-13.jpg", "/images/villas/villa4-gallery/villa4-14.jpg", "/images/villas/villa4-gallery/villa4-15.jpg",
      "/images/villas/villa4-gallery/villa4-16.jpg", "/images/villas/villa4-gallery/villa4-17.jpg", "/images/villas/villa4-gallery/villa4-18.jpg",
      "/images/villas/villa4-gallery/villa4-19.jpg", "/images/villas/villa4-gallery/villa4-20.jpg", "/images/villas/villa4-gallery/villa4-21.jpg",
      "/images/villas/villa4-gallery/villa4-22.jpg", "/images/villas/villa4-gallery/villa4-23.jpg", "/images/villas/villa4-gallery/villa4-24.jpg",
      "/images/villas/villa4-gallery/villa4-25.jpg", "/images/villas/villa4-gallery/villa4-26.jpg", "/images/villas/villa4-gallery/villa4-27.jpg",
      "/images/villas/villa4-gallery/villa4-28.jpg",
    ] as string[],
    features: ["5 Air-Con Bedrooms", "Mountain View Terrace", "Adult & Kiddie Pool", "Senior/PWD-Friendly"],
    desc: "Combining modern comfort with scenic surroundings, Villa 4 is a 2-storey private villa designed for families, reunions, and group gatherings. It features larger bedrooms, a spacious dining area, and a large terrace overlooking a beautiful mountain view. Guests can enjoy a private hot spring adult pool (3.2â€“5.2 ft deep) and a kiddie pool (2.7 ft deep). Designed to accommodate up to 40 guests, the villa offers five fully air-conditioned bedrooms, including one ground-floor bedroom, making it senior and PWD-friendly. Three bedrooms have their own private bathroom with shower heater, while two rooms share a bathroom with shower heater. Includes a dining area, kitchen, grilling area, FREE Wi-Fi, TVs, FREE videoke, table tennis, billiards, darts, water volleyball, a playground, and indoor parking for 5â€“6 vehicles.",
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
    capacity: "Up to 34",
    rating: 4.6,
    image: "/images/villas/villa5.jpg",
    photos: [
      "/images/villas/villa5-gallery/villa5-01.jpg", "/images/villas/villa5-gallery/villa5-02.jpg", "/images/villas/villa5-gallery/villa5-03.jpg",
      "/images/villas/villa5-gallery/villa5-04.jpg", "/images/villas/villa5-gallery/villa5-05.jpg", "/images/villas/villa5-gallery/villa5-06.jpg",
      "/images/villas/villa5-gallery/villa5-07.jpg", "/images/villas/villa5-gallery/villa5-08.jpg", "/images/villas/villa5-gallery/villa5-09.jpg",
      "/images/villas/villa5-gallery/villa5-10.jpg", "/images/villas/villa5-gallery/villa5-11.jpg", "/images/villas/villa5-gallery/villa5-12.jpg",
      "/images/villas/villa5-gallery/villa5-13.jpg", "/images/villas/villa5-gallery/villa5-14.jpg", "/images/villas/villa5-gallery/villa5-15.jpg",
      "/images/villas/villa5-gallery/villa5-16.jpg", "/images/villas/villa5-gallery/villa5-17.jpg", "/images/villas/villa5-gallery/villa5-18.jpg",
      "/images/villas/villa5-gallery/villa5-19.jpg", "/images/villas/villa5-gallery/villa5-20.jpg", "/images/villas/villa5-gallery/villa5-21.jpg",
      "/images/villas/villa5-gallery/villa5-22.jpg", "/images/villas/villa5-gallery/villa5-23.jpg", "/images/villas/villa5-gallery/villa5-24.jpg",
      "/images/villas/villa5-gallery/villa5-25.jpg", "/images/villas/villa5-gallery/villa5-26.jpg", "/images/villas/villa5-gallery/villa5-27.jpg",
      "/images/villas/villa5-gallery/villa5-28.jpg", "/images/villas/villa5-gallery/villa5-29.jpg", "/images/villas/villa5-gallery/villa5-30.jpg",
      "/images/villas/villa5-gallery/villa5-31.jpg", "/images/villas/villa5-gallery/villa5-32.jpg", "/images/villas/villa5-gallery/villa5-33.jpg",
      "/images/villas/villa5-gallery/villa5-34.jpg", "/images/villas/villa5-gallery/villa5-35.jpg", "/images/villas/villa5-gallery/villa5-36.jpg",
      "/images/villas/villa5-gallery/villa5-37.jpg", "/images/villas/villa5-gallery/villa5-38.jpg", "/images/villas/villa5-gallery/villa5-39.jpg",
      "/images/villas/villa5-gallery/villa5-40.jpg", "/images/villas/villa5-gallery/villa5-41.jpg", "/images/villas/villa5-gallery/villa5-42.jpg",
      "/images/villas/villa5-gallery/villa5-43.jpg", "/images/villas/villa5-gallery/villa5-44.jpg", "/images/villas/villa5-gallery/villa5-45.jpg",
      "/images/villas/villa5-gallery/villa5-46.jpg", "/images/villas/villa5-gallery/villa5-47.jpg", "/images/villas/villa5-gallery/villa5-48.jpg",
      "/images/villas/villa5-gallery/villa5-49.jpg", "/images/villas/villa5-gallery/villa5-50.jpg", "/images/villas/villa5-gallery/villa5-51.jpg",
      "/images/villas/villa5-gallery/villa5-52.jpg", "/images/villas/villa5-gallery/villa5-53.jpg", "/images/villas/villa5-gallery/villa5-54.jpg",
      "/images/villas/villa5-gallery/villa5-55.jpg", "/images/villas/villa5-gallery/villa5-56.jpg", "/images/villas/villa5-gallery/villa5-57.jpg",
      "/images/villas/villa5-gallery/villa5-58.jpg", "/images/villas/villa5-gallery/villa5-59.jpg", "/images/villas/villa5-gallery/villa5-60.jpg",
      "/images/villas/villa5-gallery/villa5-61.jpg", "/images/villas/villa5-gallery/villa5-62.jpg", "/images/villas/villa5-gallery/villa5-63.jpg",
      "/images/villas/villa5-gallery/villa5-64.jpg", "/images/villas/villa5-gallery/villa5-65.jpg", "/images/villas/villa5-gallery/villa5-66.jpg",
      "/images/villas/villa5-gallery/villa5-67.jpg", "/images/villas/villa5-gallery/villa5-68.jpg", "/images/villas/villa5-gallery/villa5-69.jpg",
    ] as string[],
    features: ["5 Air-Con Bedrooms", "Jacuzzi Available", "Color-Changing Pool Lights", "Senior/PWD-Friendly"],
    desc: "As the latest addition to Casa Primera Hot Spring Resorts, Villa 5 offers a modern and stylish retreat for families, reunions, and group getaways. It features a wide garden, a children's playground, a private hot spring adult pool (3â€“5 ft deep) with kiddie pool (2 ft deep), color-changing pool lights, and a jacuzzi available for rent. Designed to accommodate up to 34 guests, the villa offers five fully air-conditioned bedrooms, each with a private bathroom and shower heater. With two ground-floor bedrooms and a wheelchair ramp, the villa is senior and PWD-friendly. Includes a dining area, kitchen, grilling area, FREE Wi-Fi, TVs, FREE videoke, table tennis, billiards, darts, water volleyball, a playground, and indoor parking for 2â€“4 vehicles.",
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
        {src.includes("youtube.com") || src.includes("youtu.be") ? (
          <div className="w-full bg-black" style={{ aspectRatio: "16 / 9", maxHeight: "85vh" }}>
            <iframe
              src={src}
              title={`${title} tour video`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
              style={{ border: 0 }}
            />
          </div>
        ) : (
          <video
            src={src}
            controls
            autoPlay
            playsInline
            className="w-full h-auto max-h-[85vh] bg-black"
          >
            Sorry, your browser doesn't support embedded videos.
          </video>
        )}
        <div className="px-5 py-3" style={{ backgroundColor: "#333333" }}>
          <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#fff", fontSize: "0.9rem", fontWeight: 600 }}>
            {title} â€” Villa Tour
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
        className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-6"
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
          className="relative w-full h-full sm:h-auto sm:max-w-4xl sm:max-h-[92vh] rounded-none sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row"
          style={{ backgroundColor: "#fff", maxHeight: "100dvh" }}
          initial={{ scale: 0.92, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.92, y: 20 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button â€” always visible, easy to tap on mobile */}
          <button
            onClick={onClose}
            aria-label="Close villa details"
            className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 w-10 h-10 sm:w-10 sm:h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center text-gray-700 shadow-md transition-transform duration-200 hover:scale-110 active:scale-95 text-lg font-bold"
          >
            Ã—
          </button>

          {/* Landscape photo â€” compact banner on mobile, fixed side column on desktop */}
          <div className="relative w-full lg:w-[42%] flex-shrink-0 aspect-[16/10] sm:aspect-video lg:aspect-auto lg:h-auto lg:self-stretch">
            <img src={villa.image} alt={villa.name} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
            <div className="absolute bottom-4 left-5 sm:left-6">
              <span
                className="px-3 py-1 rounded-full text-xs uppercase tracking-widest"
                style={{ backgroundColor: "#45B3C0", color: "#fff", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                {villa.tag}
              </span>
            </div>
          </div>

          {/* Scrollable content column â€” stretches full width on mobile for a roomier, more legible description */}
          <div className="px-5 py-5 sm:p-7 overflow-y-auto flex-1 w-full" style={{ minWidth: 0 }}>
            <div className="flex items-start justify-between gap-3 mb-3">
              <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: "1.5rem", fontWeight: 700, color: "#333333" }}>
                {villa.name}
              </h3>
              <div className="text-right flex-shrink-0">
                <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.72rem", color: "#999999", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  Starting at
                </p>
                <p style={{ fontFamily: "'Fraunces', serif", fontSize: "1.4rem", fontWeight: 800, color: "#45B3C0" }}>
                  â‚±{villa.startingPrice.toLocaleString()}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 mb-4">
              <span className="flex items-center gap-1.5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.88rem", color: "#666666" }}>
                <Users size={14} color="#45B3C0" />
                <strong style={{ color: "#333333" }}>{villa.capacity} Pax</strong> capacity
              </span>
            </div>
            <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#4d4d4d", lineHeight: 1.75, fontSize: "0.92rem" }} className="mb-5">
              {villa.desc}
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {villa.features.map((f) => (
                <span key={f} className="px-3 py-1 rounded-full text-sm" style={{ backgroundColor: "#DCF1F3", color: "#333333", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  {f}
                </span>
              ))}
            </div>

            {villa.rateTiers.length > 0 && (
              <div className="rounded-2xl overflow-hidden border mb-5" style={{ borderColor: "#DCF1F3" }}>
                <div className="px-4 py-2.5" style={{ backgroundColor: "#EAF7F8" }}>
                  <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.8rem", fontWeight: 700, color: "#333333" }}>
                    Standard Rates
                  </span>
                </div>
                <div className="divide-y" style={{ borderColor: "#EAF7F8" }}>
                  {villa.rateTiers.map((pkg) => (
                    <div key={pkg.label} className="px-4 py-2.5 flex items-center justify-between gap-3" style={{ borderBottom: "1px solid #EAF7F8" }}>
                      <div className="flex items-baseline gap-2 flex-wrap">
                        <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.9rem", fontWeight: 700, color: "#333333" }}>
                          â‚±{pkg.price.toLocaleString()}
                        </span>
                        <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.78rem", color: "#666666" }}>
                          {tier.pax} Â· {tier.rooms}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                {villa.rateTiers.some((t) => "note" in t && t.note) && (
                  <div className="px-4 py-2.5" style={{ backgroundColor: "#EAF7F8" }}>
                    {villa.rateTiers.filter((t): t is typeof t & { note: string } => "note" in t && !!t.note).map((t) => (
                      <p key={t.label} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.74rem", color: "#333333", lineHeight: 1.5 }}>
                        {t.label}: {t.note}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* YouTube-style villa tour thumbnail */}
            <button
              onClick={() => setShowVideo(true)}
              className="relative w-full rounded-2xl overflow-hidden mb-5 group/tour"
              aria-label={`Watch ${villa.name} tour video`}
            >
              <div className="relative w-full aspect-video">
                <img src={villa.image} alt={`${villa.name} tour thumbnail`} className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover/tour:scale-105" />
                <div className="absolute inset-0 bg-black/35 group-hover/tour:bg-black/45 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span
                    className="flex items-center justify-center rounded-full shadow-xl transition-transform duration-200 group-hover/tour:scale-110"
                    style={{ width: 64, height: 64, backgroundColor: "rgba(255,0,0,0.92)" }}
                  >
                    <Play size={26} color="#fff" fill="#fff" style={{ marginLeft: 4 }} />
                  </span>
                </div>
                <span
                  className="absolute bottom-3 left-3 px-2.5 py-1 rounded text-xs font-semibold"
                  style={{ backgroundColor: "rgba(0,0,0,0.75)", color: "#fff", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  â–¶ {villa.name} â€” Villa Tour
                </span>
              </div>
            </button>

            {/* Per-villa photo carousel */}
            <VillaPhotoCarousel photos={villa.photos} villaName={villa.name} />

            <div className="flex items-center gap-3 p-3 rounded-xl mb-5" style={{ backgroundColor: "#EAF7F8" }}>
              <span style={{ fontSize: "1.1rem" }}>ðŸ•</span>
              <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.85rem", color: "#333333" }}>
                <strong>Check-in:</strong> 3:00 PM &nbsp;|&nbsp; <strong>Check-out:</strong> 12:00 NN
              </p>
            </div>
            <a
              href="#booking"
              onClick={onClose}
              className="block w-full text-center py-3.5 rounded-full font-semibold text-white transition-all duration-200 hover:opacity-90 hover:scale-[1.02]"
              style={{ backgroundColor: "#45B3C0", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Reserve This Villa
            </a>
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
    <section id="villas" className="py-20" style={{ background: "linear-gradient(180deg, #EAF7F8 0%, #DCF1F3 100%)" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <span
            className="inline-block px-4 py-1.5 rounded-full text-sm tracking-widest uppercase mb-4"
            style={{ backgroundColor: "#DCF1F3", color: "#333333", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Accommodations
          </span>
          <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(2rem, 4vw, 3rem)", color: "#333333", fontWeight: 700 }}>
            Our <span style={{ color: "#45B3C0" }}>Private</span> Villas
          </h2>
          <p className="mt-4 max-w-xl mx-auto" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#666666", fontSize: "1.05rem", lineHeight: 1.7 }}>
            Five private villas â€” each designed for comfort, joy, and unforgettable memories.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-5">
            {[
              { label: "34â€“50 Pax per Villa", color: "#DCF1F3", text: "#333333" },
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
              style={{ backgroundColor: "#fff", border: villa.highlight ? "2px solid #45B3C0" : "none" }}
              onClick={() => setSelected(villa)}
            >
              {villa.highlight && (
                <div className="text-center py-1.5 text-xs font-semibold tracking-widest uppercase text-white" style={{ backgroundColor: "#45B3C0", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  â˜… Most Popular
                </div>
              )}
              <div className="relative h-52 overflow-hidden">
                <img src={villa.image} alt={villa.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs uppercase tracking-wide" style={{ backgroundColor: "rgba(69,179,192,0.85)", color: "#fff", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  {villa.tag}
                </span>

                {/* YouTube-style video thumbnail trigger */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setVideoVilla(villa);
                  }}
                  className="absolute inset-0 flex items-center justify-center group/play"
                  aria-label={`Watch ${villa.name} tour video`}
                >
                  <div className="absolute inset-0 bg-black/0 group-hover/play:bg-black/20 transition-colors duration-300" />
                  <span
                    className="relative flex items-center justify-center rounded-full shadow-lg transition-transform duration-200 group-hover/play:scale-110"
                    style={{ width: 52, height: 52, backgroundColor: "rgba(255,0,0,0.92)" }}
                  >
                    <Play size={20} color="#fff" fill="#fff" style={{ marginLeft: 3 }} />
                  </span>
                  <span
                    className="absolute bottom-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-semibold"
                    style={{ backgroundColor: "rgba(0,0,0,0.75)", color: "#fff", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    Villa Tour
                  </span>
                </button>
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: "1.2rem", fontWeight: 700, color: "#333333" }}>{villa.name}</h3>
                  <div className="flex items-center gap-1">
                    <Star size={13} fill="#FFEB3B" stroke="none" />
                    <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.85rem", color: "#666666" }}>{villa.rating}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <span style={{ fontFamily: "'Fraunces', serif", fontSize: "1.35rem", fontWeight: 800, color: "#45B3C0" }}>
                    â‚±{villa.startingPrice.toLocaleString()}
                  </span>
                  <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.8rem", color: "#999999" }}>starting rate</span>
                  <span className="flex items-center gap-1 ml-auto" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.85rem", color: "#666666" }}>
                    <Users size={13} color="#45B3C0" />
                    {villa.capacity} pax
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {villa.features.slice(0, 3).map((f) => (
                    <span key={f} className="px-2.5 py-0.5 rounded-full text-xs" style={{ backgroundColor: "#DCF1F3", color: "#333333", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      {f}
                    </span>
                  ))}
                </div>
                <button className="flex items-center gap-2 font-bold transition-all duration-200 group-hover:gap-3" style={{ color: "#45B3C0", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "1rem" }}>
                  View Details <ArrowRight size={17} />
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
