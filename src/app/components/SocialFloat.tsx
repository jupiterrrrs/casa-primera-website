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
    label: "Viber",
    href: "viber://chat?number=+639171234567",
    bg: "#7360f2",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
        <path d="M11.398 1.999c-2.353.001-7.9.677-9.466 6.044-.633 2.199-.681 4.929-.046 8.349.77 4.118 5.082 7.29 7.69 8.09v2.5s-.017.455.282.546c.361.11.573-.231 1.354-1.095l.695-.804c3.337.28 5.891-.354 6.181-.447.674-.219 4.485-1.339 5.107-5.484.641-4.276.246-8.036-1.508-10.457C19.46 5.697 16.58 1.996 11.398 2z"/>
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
