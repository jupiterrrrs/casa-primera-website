import { Leaf, Heart, Sun, Shield } from "lucide-react";
import { motion } from "motion/react";

const pillars = [
  { icon: Leaf, label: "Natural Springs", desc: "Mineral-rich volcanic water with healing properties, sourced straight from the earth." },
  { icon: Heart, label: "Family First", desc: "Designed for all ages — a place where family memories are made and cherished." },
  { icon: Sun, label: "Year-Round Fun", desc: "Open every day of the year with activities and amenities that never get old." },
  { icon: Shield, label: "Safe & Clean", desc: "Pool water tested daily; our facilities are maintained to the highest hygiene standards." },
];

export function AboutSection() {
  return (
    <section id="about" className="py-24 overflow-hidden" style={{ background: "#fdf6ec" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[500px]">
              <img
                src="/images/misc/about.jpg"
                alt="Casa Primera Resort villa exterior and pool"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#2d6a4f]/30 to-transparent" />
            </div>
            {/* Floating badge */}
            <div
              className="absolute -bottom-6 -right-6 w-36 h-36 rounded-full flex flex-col items-center justify-center shadow-xl"
              style={{ backgroundColor: "#f4721b" }}
            >
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 800, color: "#fff", lineHeight: 1 }}>15+</span>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", color: "rgba(255,255,255,0.9)", textAlign: "center", lineHeight: 1.3, marginTop: "4px" }}>Years of Happy<br />Guests</span>
            </div>
            {/* Floating stat */}
            <div
              className="absolute -top-5 -left-5 px-5 py-3 rounded-2xl shadow-lg"
              style={{ backgroundColor: "#2d6a4f" }}
            >
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", color: "rgba(255,255,255,0.85)" }}>📍 Calamba, Laguna</span>
            </div>
          </motion.div>

          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <span
              className="inline-block px-4 py-1.5 rounded-full text-sm tracking-widest uppercase mb-5"
              style={{ backgroundColor: "#fff3e0", color: "#f4721b", fontFamily: "'DM Sans', sans-serif" }}
            >
              Our Story
            </span>
            <h2
              style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 2.8rem)", color: "#1a2e1a", fontWeight: 700, lineHeight: 1.25 }}
              className="mb-6"
            >
              A Tropical Sanctuary<br />
              <span style={{ color: "#2d6a4f" }}>Built for Your Soul</span>
            </h2>
            <p
              style={{ fontFamily: "'DM Sans', sans-serif", color: "#4a5e40", lineHeight: 1.85, fontSize: "1.05rem" }}
              className="mb-5"
            >
              Tucked away in the lush landscapes of Calamba, Laguna, Casa Primera Hotspring Resort was born from a simple belief: everyone deserves a place to truly unwind. Since opening, we have welcomed thousands of families, couples, and friends seeking the restorative magic of natural mineral springs.
            </p>
            <p
              style={{ fontFamily: "'DM Sans', sans-serif", color: "#4a5e40", lineHeight: 1.85, fontSize: "1.05rem" }}
              className="mb-10"
            >
              Our resort blends the warmth of Filipino hospitality with world-class amenities — natural hotspring pools, private villas nestled in tropical gardens, and a host of activities that make every visit unforgettable.
            </p>

            <div className="grid grid-cols-2 gap-5">
              {pillars.map(({ icon: Icon, label, desc }) => (
                <div key={label} className="flex gap-3 items-start">
                  <div
                    className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center mt-0.5"
                    style={{ backgroundColor: "#e8f5e9" }}
                  >
                    <Icon size={18} color="#2d6a4f" />
                  </div>
                  <div>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", fontWeight: 600, color: "#1a2e1a" }}>{label}</p>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem", color: "#7a8c6e", lineHeight: 1.55 }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
