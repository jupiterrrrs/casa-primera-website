import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const channels = [
  {
    label: "Messenger",
    href: "https://m.me/casaprimeraresorт",
    bg: "#0084ff",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
        <path d="M12 2C6.477 2 2 6.145 2 11.243c0 3.11 1.58 5.876 4.063 7.683V22l3.71-2.04c.99.274 2.04.42 3.127.42 5.523 0 10-4.145 10-9.243S17.523 2 12 2zm1.093 12.453l-2.55-2.72-4.977 2.72 5.473-5.81 2.612 2.72 4.915-2.72-5.473 5.81z"/>
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com/casaprimera",
    bg: "linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "https://tiktok.com/@casaprimera",
    bg: "#010101",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.27 8.27 0 004.84 1.55V6.79a4.85 4.85 0 01-1.07-.1z"/>
      </svg>
    ),
  },
  {
    label: "Viber",
    href: "viber://chat?number=+639171234567",
    bg: "#7360f2",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
        <path d="M11.398 1.999c-2.353.001-7.9.677-9.466 6.044-.633 2.199-.681 4.929-.046 8.349.77 4.118 5.082 7.29 7.69 8.09v2.5s-.017.455.282.546c.361.11.573-.231 1.354-1.095l.695-.804c3.337.28 5.891-.354 6.181-.447.674-.219 4.485-1.339 5.107-5.484.641-4.276.246-8.036-1.508-10.457C19.46 5.697 16.58 1.996 11.398 2z"/>
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/639171234567",
    bg: "#25d366",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
      </svg>
    ),
  },
];

export function SocialFloat() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="fixed left-4 bottom-6 z-40 flex flex-col-reverse items-start gap-3">
      {/* Toggle */}
      <button
        onClick={() => setExpanded((e) => !e)}
        className="w-12 h-12 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
        style={{ backgroundColor: "#333333" }}
        aria-label="Toggle social links"
      >
        <AnimatePresence mode="wait">
          {expanded ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X size={20} color="#fff" />
            </motion.span>
          ) : (
            <motion.span key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageCircle size={20} color="#fff" />
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      {/* Social icons */}
      <AnimatePresence>
        {expanded && (
          <div className="flex flex-col-reverse gap-2.5">
            {channels.map(({ label, href, bg, icon }, i) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -20, scale: 0.8 }}
                transition={{ delay: i * 0.05, type: "spring", stiffness: 300, damping: 24 }}
                className="flex items-center gap-2.5 group"
                aria-label={label}
              >
                <span
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 px-2.5 py-1 rounded-full text-xs font-semibold text-white shadow-sm whitespace-nowrap"
                  style={{ backgroundColor: "rgba(0,0,0,0.55)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  {label}
                </span>
                <div
                  className="w-11 h-11 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 hover:shadow-xl"
                  style={{ background: bg }}
                >
                  {icon}
                </div>
              </motion.a>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
