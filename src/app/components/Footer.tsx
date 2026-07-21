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
];

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
                alt="Casa Primera Hotspring Resorts logo"
                className="w-full h-full object-contain"
              />
            </div>
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
          <div>
            <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.78rem", color: "rgba(255,255,255,0.4)", marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>Reach Us On</p>
            <div className="flex flex-wrap gap-2">
              {["Messenger", "Viber"].map((c) => {
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
