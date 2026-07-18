import { useState, useRef, useEffect } from "react";
import { X, Send, MessageSquare, Bot, MessageCircle, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const MESSENGER_URL = "https://m.me/casaprimera";
const MAPS_URL = "https://maps.google.com/?q=Nayong+Maharlika+Village+Pansol+Calamba+Laguna+Philippines";

interface Message {
  id: number;
  from: "user" | "bot";
  text: string;
  showMessenger?: boolean;
  showMap?: boolean;
}

const faqMap: Array<{ keywords: string[]; answer: string; isLocation?: boolean }> = [
  { keywords: ["check-in", "checkin", "check in", "arrival", "arrive"], answer: "Check-in time is 3:00 PM. Early check-in may be arranged subject to availability — please contact us in advance!" },
  { keywords: ["check-out", "checkout", "check out", "departure", "leave"], answer: "Check-out time is 12:00 NN (noon). Late check-out can be requested for an additional fee." },
  { keywords: ["price", "rate", "cost", "how much", "magkano"], answer: "Our villa rates start at ₱18,000 for Villas 1–3 and ₱21,000 for Villas 4–5, depending on your headcount. Scroll up to see the full rate breakdown for each villa! 😊" },
  { keywords: ["capacity", "pax", "guests", "how many", "max"], answer: "Our villas accommodate 30–50 pax each. Scroll up to see the exact capacity for each villa! 🎉" },
  { keywords: ["payment", "pay", "gcash", "maya", "bank transfer", "cash"], answer: "We accept GCash, Maya, BDO/BPI Bank Transfer, and Cash. A 50% down payment is required to confirm your reservation." },
  { keywords: ["cancel", "refund", "cancellation"], answer: "Cancellations 7+ days before check-in may be refunded less 10%. Cancellations within 7 days are non-refundable. Contact us ASAP if plans change!" },
  { keywords: ["book", "reserve", "reservation", "how to"], answer: "To book: 1️⃣ Check availability on the calendar 2️⃣ Fill out the reservation form or message us 3️⃣ Pay 50% down payment 4️⃣ Receive confirmation. Easy! 🌊" },
  { keywords: ["wifi", "internet"], answer: "Yes! We have complimentary high-speed WiFi available throughout the resort. 📶" },
  { keywords: ["pool", "hotspring", "hot spring", "spring"], answer: "Our natural mineral hotspring pools are open day and night! The mineral-rich volcanic water is known for its therapeutic properties. 🌊✨" },
  { keywords: ["parking", "park", "car"], answer: "Yes, we have free parking available for resort guests. Limited spaces, so arriving early is recommended especially on weekends!" },
  { keywords: ["food", "eat", "bbq", "grill", "catering"], answer: "We have BBQ grill stations available! You may bring personal food. In-house catering can also be arranged for large groups — just ask us in advance." },
  { keywords: ["pet", "dog", "cat", "animal"], answer: "We're sorry — pets are not allowed inside the villas and resort premises. 🐾" },
  { keywords: ["location", "address", "where", "how to get", "directions", "malapit", "saan"], answer: "We're at Nayong Maharlika Village, Brgy. Pansol, Calamba City, Laguna. From Manila via SLEX, take the Calamba exit (~1hr 15min). Tap the button below to open our exact location on Google Maps! 📍", isLocation: true },
  { keywords: ["kids", "children", "family", "baby"], answer: "Absolutely! We are a family-friendly resort. 👨‍👩‍👧‍👦 Children must be supervised near pools. We have shallow pools safe for kids too!" },
  { keywords: ["karaoke", "sing"], answer: "Yes! We have fully-equipped karaoke rooms — great for barkadas and family celebrations! 🎤🎵" },
  { keywords: ["villa", "room", "accommodation"], answer: "We have 5 private villas (Casa Primera Villa 1 to Villa 5), each accommodating 30–50 pax. Scroll up to see full details and photos! 🏡" },
];

const quickReplies = ["Check-in time?", "Payment options?", "How to book?", "Rates?", "Location?"];

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function matchesKeyword(lower: string, keyword: string): boolean {
  return new RegExp(`\\b${escapeRegExp(keyword)}\\b`, "i").test(lower);
}

function getAnswer(input: string): { text: string; showMessenger: boolean; showMap: boolean } {
  const lower = input.toLowerCase();
  for (const { keywords, answer, isLocation } of faqMap) {
    if (keywords.some((k) => matchesKeyword(lower, k))) {
      return { text: answer, showMessenger: false, showMap: !!isLocation };
    }
  }
  return {
    text: "Thanks for your question! I don't have a ready answer for that, but our team can help you directly on Facebook Messenger 👇",
    showMessenger: true,
    showMap: false,
  };
}

export function LiveChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, from: "bot", text: "Hi! 👋 Welcome to Casa Primera Hotspring Resorts. I'm your virtual assistant! Ask me anything about our villas, rates, bookings, or amenities." },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  function sendMessage(text: string) {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now(), from: "user", text };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      const { text: answer, showMessenger, showMap } = getAnswer(text);
      setMessages((m) => [...m, { id: Date.now() + 1, from: "bot", text: answer, showMessenger, showMap }]);
      setTyping(false);
    }, 900 + Math.random() * 600);
  }

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
        style={{ backgroundColor: "#45B3C0" }}
        aria-label="Open live chat"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X size={22} color="#fff" />
            </motion.span>
          ) : (
            <motion.span key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageSquare size={22} color="#fff" />
            </motion.span>
          )}
        </AnimatePresence>
        {!open && (
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-white flex items-center justify-center text-xs" style={{ backgroundColor: "#FFEB3B", color: "#333333", fontWeight: 700 }}>
            1
          </span>
        )}
      </button>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed bottom-24 right-6 z-50 w-80 rounded-3xl shadow-2xl overflow-hidden flex flex-col"
            style={{ height: 480, backgroundColor: "#fff" }}
            initial={{ opacity: 0, scale: 0.85, y: 20, transformOrigin: "bottom right" }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
          >
            {/* Header */}
            <div className="px-4 py-3 flex items-center gap-3" style={{ backgroundColor: "#45B3C0" }}>
              <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ backgroundColor: "rgba(255,255,255,0.2)" }}>
                <Bot size={18} color="#fff" />
              </div>
              <div className="flex-1">
                <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.9rem", color: "#fff" }}>Casa Primera AI</p>
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-300 animate-pulse" />
                  <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.72rem", color: "rgba(255,255,255,0.85)" }}>Online · Usually replies instantly</p>
                </div>
              </div>
              <a
                href={MESSENGER_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat with us on Facebook Messenger"
                title="Chat with us on Facebook Messenger"
                className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-200 hover:scale-110"
                style={{ backgroundColor: "#0084FF" }}
              >
                <MessageCircle size={16} color="#fff" />
              </a>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex flex-col ${msg.from === "user" ? "items-end" : "items-start"}`}>
                  <div className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"} w-full`}>
                    {msg.from === "bot" && (
                      <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mr-2 mt-0.5" style={{ backgroundColor: "#DCF1F3" }}>
                        <Bot size={13} color="#45B3C0" />
                      </div>
                    )}
                    <div
                      className="max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed"
                      style={{
                        backgroundColor: msg.from === "user" ? "#45B3C0" : "#EAF7F8",
                        color: msg.from === "user" ? "#fff" : "#333333",
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        borderBottomRightRadius: msg.from === "user" ? 4 : undefined,
                        borderBottomLeftRadius: msg.from === "bot" ? 4 : undefined,
                      }}
                    >
                      {msg.text}
                    </div>
                  </div>
                  {msg.showMessenger && (
                    <a
                      href={MESSENGER_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-9 mt-2 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-white transition-all duration-200 hover:scale-105"
                      style={{ backgroundColor: "#0084FF", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      <MessageCircle size={15} />
                      Chat on Messenger
                    </a>
                  )}
                  {msg.showMap && (
                    <a
                      href={MAPS_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-9 mt-2 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-white transition-all duration-200 hover:scale-105"
                      style={{ backgroundColor: "#45B3C0", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      <MapPin size={15} />
                      Open in Google Maps
                    </a>
                  )}
                </div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mr-2 mt-0.5" style={{ backgroundColor: "#DCF1F3" }}>
                    <Bot size={13} color="#45B3C0" />
                  </div>
                  <div className="px-4 py-3 rounded-2xl flex gap-1.5 items-center" style={{ backgroundColor: "#EAF7F8" }}>
                    {[0, 1, 2].map((i) => (
                      <span key={i} className="w-2 h-2 rounded-full" style={{ backgroundColor: "#45B3C0", animation: `bounce 1.2s ${i * 0.2}s infinite` }} />
                    ))}
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Quick replies */}
            <div className="px-3 pb-2 flex gap-2 flex-wrap">
              {quickReplies.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="px-3 py-1 rounded-full text-xs transition-all duration-200 hover:scale-105"
                  style={{ backgroundColor: "#DCF1F3", color: "#333333", fontFamily: "'Plus Jakarta Sans', sans-serif", border: "1px solid #A8DDE3" }}
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="px-3 pb-3">
              <form
                onSubmit={(e) => { e.preventDefault(); sendMessage(input); }}
                className="flex gap-2 items-center px-4 py-2 rounded-full"
                style={{ backgroundColor: "#EAF7F8", border: "1px solid #A8DDE3" }}
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask anything..."
                  className="flex-1 bg-transparent outline-none text-sm"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#333333" }}
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 disabled:opacity-40"
                  style={{ backgroundColor: "#45B3C0" }}
                >
                  <Send size={14} color="#fff" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-6px); }
        }
      `}</style>
    </>
  );
}
