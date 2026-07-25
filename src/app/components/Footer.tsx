import { MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer style={{ backgroundColor: "#333333", color: "rgba(255,255,255,0.75)" }}>
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <div className="w-14 h-14 rounded-full overflow-hidden flex items-center justify-center flex-shrink-0 p-1.5" style={{ backgroundColor: "#fff" }}>
              <img
                src="/images/logo-full.png"
                alt="Casa Primera Hot Spring Resorts logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span style={{ fontFamily: "'Fraunces', serif", fontWeight: 800, fontSize: "0.95rem", color: "#fff" }}>CASA</span>
                <span style={{ fontFamily: "'Fraunces', serif", fontWeight: 800, fontSize: "0.95rem", color: "#FFEB3B" }}>PRIMERA</span>
              </div>
              <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.6rem", color: "#45B3C0", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                Hot Spring Resorts
              </span>
            </div>
          </div>
          <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.88rem", fontStyle: "italic", color: "#FFEB3B", marginBottom: "0.5rem", marginTop: "0.25rem" }}>
            "Relax, Refresh, Reconnect"
          </p>
          <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.85rem", lineHeight: 1.75 }} className="mb-5">
            Your tropical sanctuary in the heart of Calamba, Laguna. Natural Hot Spring pools, private villas, and unforgettable moments.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, color: "#fff", fontSize: "1rem" }} className="mb-5">Quick Links</h4>
          <ul className="space-y-3">
            {["Home", "About Us", "Our Villas", "Amenities", "How to Book", "Reviews", "Gallery", "FAQs", "Location", "Book Now"].map((link) => (
              <li key={link}>
                <a href="#" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.88rem" }} className="hover:text-[#45B3C0] transition-colors duration-200">{link}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Villas */}
        <div>
          <h4 style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, color: "#fff", fontSize: "1rem" }} className="mb-5">Our Villas</h4>
          <ul className="space-y-3">
            {[
              "Casa Primera Villa 1 · Up to 34 pax",
              "Casa Primera Villa 2 · Up to 40 pax",
              "Casa Primera Villa 3 · Up to 50 pax",
              "Casa Primera Villa 4 · Up to 40 pax",
              "Casa Primera Villa 5 · Up to 34 pax",
            ].map((v) => (
              <li key={v}>
                <a href="#villas" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.85rem" }} className="hover:text-[#FFEB3B] transition-colors duration-200">{v}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, color: "#fff", fontSize: "1rem" }} className="mb-5">Contact Us</h4>
          <ul className="space-y-4 mb-6">
            <li className="flex gap-3 items-start">
              <MapPin size={15} color="#45B3C0" className="mt-0.5 flex-shrink-0" />
              <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.88rem", lineHeight: 1.65 }}>
                Purok 7, Nayong Maharlika Village,<br />Brgy. Pansol, Calamba City, Laguna
              </span>
            </li>
            <li className="flex gap-3 items-start">
              <Phone size={15} color="#45B3C0" className="mt-0.5 flex-shrink-0" />
              <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.88rem", lineHeight: 1.65 }}>
                Globe: 0917.114.6956 / 0956.836.6100<br />
                Smart: 0919.007.8821 / 0960.381.7151<br />
                Landline: (049) 502-3746
              </span>
            </li>
            <li className="flex gap-3 items-center">
              <Mail size={15} color="#45B3C0" />
              <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.88rem" }}>sales@casaprimeravilla.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-3" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
        <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.8rem" }}>
          © 2026 Casa Primera Hot Spring Resorts. All rights reserved.
        </p>
        <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.8rem" }}>
          Hot Spring Resorts in Calamba, Laguna · <span style={{ color: "#45B3C0" }}>Relax, Refresh, Reconnect</span>
        </p>
      </div>
    </footer>
  );
}
