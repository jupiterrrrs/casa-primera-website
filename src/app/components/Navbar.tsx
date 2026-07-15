import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#about", label: "About" },
  { href: "#villas", label: "Villas" },
  { href: "#how-to-book", label: "How to Book" },
  { href: "#reviews", label: "Reviews" },
  { href: "#gallery", label: "Gallery" },
  { href: "#faq", label: "FAQs" },
  { href: "#location", label: "Location" },
  { href: "#booking", label: "Contact" },
];

function LogoMark() {
  return (
    <img
      src="/images/logo.jpg"
      alt="Casa Primera Hotspring Resort logo"
      width={36}
      height={36}
      className="rounded-full object-cover"
      style={{ width: 36, height: 36 }}
    />
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-40 transition-all duration-400"
      style={{
        backgroundColor: scrolled ? "rgba(253,246,236,0.97)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(0,180,216,0.15)" : "none",
        boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.07)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-0 group">
          <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: "1.05rem", color: scrolled ? "#1a2e1a" : "#fff", letterSpacing: "0.05em" }}>
            CASA
          </span>
          <span className="mx-2"><LogoMark /></span>
          <div className="flex flex-col leading-none">
            <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: "1.05rem", color: scrolled ? "#1a2e1a" : "#fff", letterSpacing: "0.05em" }}>
              PRIMERA
            </span>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.55rem", color: scrolled ? "#00b4d8" : "#f5c42c", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 600 }}>
              Hotspring Resort
            </span>
          </div>
        </a>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-6">
          {links.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem", color: scrolled ? "#4a5e40" : "rgba(255,255,255,0.88)", fontWeight: 500 }}
              className="hover:opacity-70 transition-opacity duration-200 whitespace-nowrap"
            >
              {label}
            </a>
          ))}
          <a
            href="#booking"
            className="px-5 py-2 rounded-full text-white text-sm font-semibold transition-all duration-200 hover:scale-105"
            style={{ backgroundColor: "#00b4d8", fontFamily: "'DM Sans', sans-serif" }}
          >
            Book Now
          </a>
        </div>

        {/* Mobile */}
        <button
          className="lg:hidden"
          onClick={() => setMenuOpen((m) => !m)}
          style={{ color: scrolled ? "#1a2e1a" : "#fff" }}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {menuOpen && (
        <div className="lg:hidden px-6 pb-6 pt-2 space-y-4" style={{ backgroundColor: "#fdf6ec" }}>
          {links.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="block"
              style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", color: "#4a5e40", fontWeight: 500 }}
            >
              {label}
            </a>
          ))}
          <a
            href="#booking"
            onClick={() => setMenuOpen(false)}
            className="block px-5 py-2.5 rounded-full text-white text-center font-semibold"
            style={{ backgroundColor: "#00b4d8", fontFamily: "'DM Sans', sans-serif" }}
          >
            Book Now
          </a>
        </div>
      )}
    </nav>
  );
}
