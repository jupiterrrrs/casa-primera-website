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
      src="/images/logo-transparent.png"
      alt="Casa Primera Hotspring Resorts logo"
      className="object-contain h-11 sm:h-14 lg:h-[68px] w-auto"
      style={{ filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.35))" }}
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
        background: scrolled || menuOpen
          ? "#ffffff"
          : "rgba(255,255,255,0.55)",
        backdropFilter: "blur(10px)",
        borderBottom: scrolled || menuOpen ? "1px solid rgba(0,0,0,0.06)" : "1px solid rgba(0,0,0,0.04)",
        boxShadow: scrolled || menuOpen ? "0 2px 20px rgba(0,0,0,0.07)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center group">
          <LogoMark />
        </a>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-6">
          {links.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.82rem", color: "#1a1a1a", fontWeight: 500 }}
              className="hover:opacity-70 transition-opacity duration-200 whitespace-nowrap"
            >
              {label}
            </a>
          ))}
          <a
            href="#booking"
            className="px-5 py-2 rounded-full text-sm font-bold transition-all duration-200 hover:scale-105"
            style={{ backgroundColor: "#FFEB3B", color: "#333333", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Book Now
          </a>
        </div>

        {/* Mobile */}
        <button
          className="lg:hidden"
          onClick={() => setMenuOpen((m) => !m)}
          style={{ color: "#1a1a1a" }}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {menuOpen && (
        <div
          className="lg:hidden px-6 pb-6 pt-2 space-y-4"
          style={{ backgroundColor: "#ffffff", borderTop: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 8px 20px rgba(0,0,0,0.08)" }}
        >
          {links.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="block"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "1rem", color: "#4d4d4d", fontWeight: 500 }}
            >
              {label}
            </a>
          ))}
          <a
            href="#booking"
            onClick={() => setMenuOpen(false)}
            className="block px-5 py-2.5 rounded-full text-center font-bold"
            style={{ backgroundColor: "#FFEB3B", color: "#333333", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Book Now
          </a>
        </div>
      )}
    </nav>
  );
}
