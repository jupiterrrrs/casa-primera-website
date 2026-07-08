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
            Easily accessible from Metro Manila — just over an hour drive. We're nestled in the scenic springs area of Calamba, Laguna.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Map */}
          <div className="lg:col-span-2 rounded-3xl overflow-hidden shadow-xl" style={{ height: 420 }}>
            <iframe
              title="Casa Primera Hotspring Resort Location"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              src="https://maps.google.com/maps?q=Pansol+Hotspring+Calamba+Laguna+Philippines&t=&z=14&ie=UTF8&iwloc=&output=embed"
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
                    Brgy. Pansol, Calamba City,<br />Laguna 4027, Philippines
                  </p>
                </div>
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
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem", color: "#1a2e1a", fontWeight: 500 }}>+63 917 123 4567</p>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem", color: "#6b7a5e" }}>reservations@casaprimera.ph</p>
                </div>
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href="https://maps.google.com/?q=Pansol+Hotspring+Calamba+Laguna+Philippines"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3.5 rounded-2xl font-semibold text-white transition-all duration-200 hover:scale-105 hover:shadow-md text-sm"
                style={{ backgroundColor: "#00b4d8", fontFamily: "'DM Sans', sans-serif" }}
              >
                <Navigation size={15} />
                Google Maps
              </a>
              <a
                href="https://waze.com/ul?q=Pansol+Calamba+Laguna+Philippines&navigate=yes"
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
                🚗 <strong>From Manila:</strong> Via SLEX, take the Calamba exit (approx. 1 hr 15 min). Head toward Pansol Hotspring Area. Look for the Casa Primera signage on the right.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
