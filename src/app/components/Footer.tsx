import { MapPin, Phone, Mail } from "lucide-react";

const socials = [
  {
    label: "Facebook",
    href: "https://facebook.com/casaprimera",
    color: "#1877f2",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="white">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com/casaprimeravilla",
    color: "#e1306c",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="white">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "https://tiktok.com/@casaprimera",
    color: "#010101",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.27 8.27 0 004.84 1.55V6.79a4.85 4.85 0 01-1.07-.1z" />
      </svg>
    ),
  },
  {
    label: "Messenger",
    href: "https://m.me/casaprimera",
    color: "#0084ff",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="white">
        <path d="M12 2C6.477 2 2 6.145 2 11.243c0 3.11 1.58 5.876 4.063 7.683V22l3.71-2.04c.99.274 2.04.42 3.127.42 5.523 0 10-4.145 10-9.243S17.523 2 12 2zm1.093 12.453l-2.55-2.72-4.977 2.72 5.473-5.81 2.612 2.72 4.915-2.72-5.473 5.81z" />
      </svg>
    ),
  },
  {
    label: "Viber",
    href: "viber://chat?number=+639171234567",
    color: "#7360f2",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
        <path d="M11.398 1.999c-2.353.001-7.9.677-9.466 6.044-.633 2.199-.681 4.929-.046 8.349.77 4.118 5.082 7.29 7.69 8.09v2.5s-.017.455.282.546c.361.11.573-.231 1.354-1.095l.695-.804c3.337.28 5.891-.354 6.181-.447.674-.219 4.485-1.339 5.107-5.484.641-4.276.246-8.036-1.508-10.457C19.46 5.697 16.58 1.996 11.398 2z" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/639171234567",
    color: "#25d366",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="white">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
      </svg>
    ),
  },
];

export function Footer() {
  return (
    <footer style={{ backgroundColor: "#333333", color: "rgba(255,255,255,0.75)" }}>
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: "#45B3C0" }}>CP</div>
            <div>
              <div className="flex items-center gap-1">
                <span style={{ fontFamily: "'Fraunces', serif", fontWeight: 800, fontSize: "0.95rem", color: "#fff" }}>CASA</span>
                <span style={{ fontFamily: "'Fraunces', serif", fontWeight: 800, fontSize: "0.95rem", color: "#FFEB3B" }}>PRIMERA</span>
              </div>
              <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.6rem", color: "#45B3C0", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                Hotspring Resorts
              </span>
            </div>
          </div>
          <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.88rem", fontStyle: "italic", color: "#FFEB3B", marginBottom: "0.5rem", marginTop: "0.25rem" }}>
            "Relax, Refresh, Reconnect"
          </p>
          <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.85rem", lineHeight: 1.75 }} className="mb-5">
            Your tropical sanctuary in the heart of Calamba, Laguna. Natural hotspring pools, private villas, and unforgettable moments.
          </p>
          {/* Social links */}
          <div className="flex flex-wrap gap-2">
            {socials.map(({ label, href, color, icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                title={label}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                style={{ backgroundColor: color }}
              >
                {icon}
              </a>
            ))}
          </div>
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
              "Casa Primera Villa 1 · 30–50 pax",
              "Casa Primera Villa 2 · 30–50 pax",
              "Casa Primera Villa 3 · 30–50 pax",
              "Casa Primera Villa 4 · 30–50 pax",
              "Casa Primera Villa 5 · 30–50 pax",
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
          <div>
            <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.78rem", color: "rgba(255,255,255,0.4)", marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>Reach Us On</p>
            <div className="flex flex-wrap gap-2">
              {["Messenger", "WhatsApp", "Viber", "Instagram", "TikTok"].map((c) => {
                const s = socials.find((x) => x.label === c)!;
                return (
                  <a key={c} href={s.href} target="_blank" rel="noopener noreferrer"
                    className="px-2.5 py-1 rounded-full text-xs font-medium transition-all hover:scale-105"
                    style={{ backgroundColor: s.color, color: "#fff", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    {c}
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-3" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
        <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.8rem" }}>
          © 2026 Casa Primera Hotspring Resorts. All rights reserved.
        </p>
        <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.8rem" }}>
          Made with ❤️ in Calamba, Laguna · <span style={{ color: "#45B3C0" }}>Relax, Refresh, Reconnect</span>
        </p>
      </div>
    </footer>
  );
}
