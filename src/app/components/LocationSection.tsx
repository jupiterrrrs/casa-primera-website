import { MapPin, Navigation, Clock, Phone } from "lucide-react";

export function LocationSection() {
  return (
    <section id="location" className="py-20" style={{ background: "#e0f7fa" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full text-sm tracking-widest uppercase mb-4" style={{ backgroundColor: "#fff8e1", color: "#7a6000", fontFamily: "'DM Sans', sans-serif" }}>
            Find Us
          </span>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3rem)", color: "#1a2e1a", fontWeight: 700 }}>
            Our <span style={{ color: "#00b4d8" }}>Location</span>
          </h2>
          <p className="mt-4 max-w-lg mx-auto" style={{ fontFamily: "'DM Sans', sans-serif", color: "#4a5e40", fontSize: "1.05rem", lineHeight: 1.7 }}>
            Easily accessible from Metro Manila — just over an hour drive. We're along the national highway in Pansol, Calamba City, Laguna, near convenience stores, sari-sari stores, and the local talipapa.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Map */}
          <div className="lg:col-span-2 rounded-3xl overflow-hidden shadow-xl" style={{ height: 420 }}>
            <iframe
              title="Casa Primera Hot Spring Resorts Location"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              src="https://maps.google.com/maps?q=Nayong+Maharlika+Village+Pansol+Calamba+Laguna+Philippines&t=&z=15&ie=UTF8&iwloc=&output=embed"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Info panel */}
          <div className="space-y-5">
            <div className="rounded-2xl p-5 shadow-sm" style={{ backgroundColor: "#fff" }}>
              <div className="flex items-start gap-3 mb-1">
                <MapPin size={18} color="#00b4d8" className="flex-shrink-0 mt-0.5" />
                <div>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: "#9aaa8e", textTransform: "uppercase", letterSpacing: "0.07em" }}>Address</p>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem", color: "#1a2e1a", fontWeight: 500, lineHeight: 1.55 }}>
                    Purok 7, Nayong Maharlika Village,<br />Brgy. Pansol, Calamba City, Laguna
                  </p>
                </div>
              </div>
            </div>

            {/* Per-villa map links */}
            <div className="rounded-2xl p-5 shadow-sm" style={{ backgroundColor: "#fff" }}>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: "#9aaa8e", textTransform: "uppercase", letterSpacing: "0.07em" }} className="mb-3">
                Directions Per Villa
              </p>
              <div className="grid grid-cols-1 gap-2">
                {[
                  { label: "Casa Primera Villa 1", url: "https://maps.app.goo.gl/LARN7e4uVJHVUR3E8" },
                  { label: "Casa Primera Villa 2", url: "https://maps.app.goo.gl/MVBUS2poRPWQaj968" },
                  { label: "Casa Primera Villa 3", url: "https://maps.app.goo.gl/bP3MiQJtL5F2eyJD9" },
                  { label: "Casa Primera Villa 4", url: "https://maps.app.goo.gl/5HYH5Ev2wusbDn4r8" },
                  { label: "Casa Primera Villa 5", url: "https://maps.app.goo.gl/Vqk9nGUox3oagxbq7" },
                ].map((v) => (
                  <a
                    key={v.label}
                    href={v.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between px-3 py-2 rounded-xl transition-colors duration-200 hover:bg-[#e0f7fa]"
                    style={{ backgroundColor: "#f0fafe" }}
                  >
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", color: "#1a2e1a", fontWeight: 500 }}>{v.label}</span>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.78rem", color: "#007a9a", fontWeight: 600 }}>View Map →</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="rounded-2xl p-5 shadow-sm" style={{ backgroundColor: "#fff" }}>
              <div className="flex items-start gap-3">
                <Clock size={18} color="#f5c42c" className="flex-shrink-0 mt-0.5" />
                <div>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: "#9aaa8e", textTransform: "uppercase", letterSpacing: "0.07em" }}>Hours</p>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem", color: "#1a2e1a", fontWeight: 500 }}>
                    Open Daily · 24/7 for guests
                  </p>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem", color: "#6b7a5e" }}>
                    Check-in: 3:00 PM · Check-out: 12:00 NN
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl p-5 shadow-sm" style={{ backgroundColor: "#fff" }}>
              <div className="flex items-start gap-3">
                <Phone size={18} color="#2d6a4f" className="flex-shrink-0 mt-0.5" />
                <div>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: "#9aaa8e", textTransform: "uppercase", letterSpacing: "0.07em" }}>Contact</p>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", color: "#1a2e1a", fontWeight: 500, lineHeight: 1.6 }}>
                    Globe: 0917.114.6956 / 0956.836.6100<br />
                    Smart: 0919.007.8821 / 0960.381.7151<br />
                    Landline: (049) 502-3746
                  </p>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem", color: "#6b7a5e", marginTop: "0.3rem" }}>sales@casaprimeravilla.com</p>
                </div>
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href="https://maps.google.com/?q=Nayong+Maharlika+Village+Pansol+Calamba+Laguna+Philippines"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3.5 rounded-2xl font-semibold text-white transition-all duration-200 hover:scale-105 hover:shadow-md text-sm"
                style={{ backgroundColor: "#00b4d8", fontFamily: "'DM Sans', sans-serif" }}
              >
                <Navigation size={15} />
                Google Maps
              </a>
              <a
                href="https://waze.com/ul?q=Nayong+Maharlika+Village+Pansol+Calamba+Laguna&navigate=yes"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3.5 rounded-2xl font-semibold transition-all duration-200 hover:scale-105 hover:shadow-md text-sm"
                style={{ backgroundColor: "#f5c42c", color: "#1a2e1a", fontFamily: "'DM Sans', sans-serif" }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" fill="#00d4ff" />
                  <circle cx="12" cy="11" r="4.5" fill="#fff" />
                  <circle cx="10.5" cy="10" r="1" fill="#333" />
                  <circle cx="13.5" cy="10" r="1" fill="#333" />
                  <path d="M10 13 Q12 15 14 13" stroke="#333" strokeWidth="1" fill="none" strokeLinecap="round" />
                </svg>
                Waze
              </a>
            </div>

            {/* Driving tip */}
            <div className="rounded-2xl p-4" style={{ backgroundColor: "#fff8e1" }}>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem", color: "#7a6000", lineHeight: 1.65 }}>
                🚗 <strong>Finding us:</strong> We're along the national highway, with signage at the corner of Nayong Maharlika Village for easy reference. From Manila via SLEX, take the Calamba exit (approx. 1 hr 15 min) toward Pansol.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
