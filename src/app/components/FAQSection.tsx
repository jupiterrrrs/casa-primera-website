import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  q: string;
  a: React.ReactNode;
}

const faqs: FAQItem[] = [
  {
    q: "How do I reserve a slot and what are the payment options?",
    a: (
      <>
        <p className="mb-2">
          To officially reserve your preferred date(s), a 50% down payment of the rental rate is required. We accept
          cash, BDO bank deposit, or BDO online transfer. The remaining 50% balance is payable upon arrival on your
          check-in date.
        </p>
        <p>
          Upon check-in, our caretaker will also collect a ₱2,000 security deposit to cover any incidental expenses,
          returned upon check-out provided no charges are incurred. Villa availability is subject to change without
          prior notice — your reservation is confirmed only once the 50% down payment is received.
        </p>
      </>
    ),
  },
  {
    q: "Do you offer flexible check-in and check-out times?",
    a: (
      <p>
        Our standard schedule is 3:00 PM check-in to 12:00 NOON check-out the following day. If you'd prefer other
        times, just let us know — we'll happily check if we can accommodate your request, subject to availability
        and management approval.
      </p>
    ),
  },
  {
    q: "Do you offer day tour packages?",
    a: <p>Yes! Casa Primera offers day tour packages from Monday to Saturday, except during holidays and peak seasons.</p>,
  },
  {
    q: "Is the water in your pool from a natural hot spring?",
    a: (
      <p>
        Yes! Our pools are filled with 100% natural hot spring water sourced from Mt. Makiling — naturally warm and
        comfortable for swimming any time of day. Water temperature may vary slightly with natural conditions, since
        we don't use artificial water heaters; the warmth comes entirely from the spring itself.
      </p>
    ),
  },
  {
    q: "What amenities do you offer?",
    a: (
      <>
        <p className="mb-2">Enjoy a hassle-free staycation with amenities provided for your comfort and convenience:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Private Hot Spring Pool, Kiddie Pool & Playground</li>
          <li>Fully air-conditioned rooms with TVs</li>
          <li>Bathrooms with shower heaters (toiletries not provided)</li>
          <li>FREE Wi-Fi, videoke & sound system</li>
          <li>FREE beddings, blankets, and towels for your headcount</li>
          <li>
            FREE use of kitchen with basic cooking utensils (dining utensils not provided), ref, stove, LPG, oven
            toaster, microwave (upon request), rice cooker, BBQ grill, hot & cold water dispenser (1 free bottle,
            ₱50 per succeeding bottle)
          </li>
          <li>FREE use of billiards, darts, table tennis, water volleyball, mahjong, bingo, chess, and cards</li>
          <li>Indoor parking spaces & generator</li>
          <li>Jacuzzi — ₱500/30-minute use (Villa 3 and Villa 5 only)</li>
        </ul>
      </>
    ),
  },
  {
    q: "Do you give senior/PWD discounts?",
    a: (
      <p>
        Yes! We offer a 20% discount for Senior Citizens and PWDs, applied only to the entitled guest's pro-rated
        share of the package rate and deducted upon arrival with a valid Philippine-issued Senior Citizen or PWD ID.
        This discount cannot be combined with other ongoing promotions.
      </p>
    ),
  },
  {
    q: "Is Casa Primera Hot Spring Resorts pet friendly?",
    a: (
      <p>
        Yes! We're happy to welcome your furry companions for a minimal pet fee of ₱500/pet/night. Pets may stay in
        open areas and ground-floor rooms while wearing diapers at all times, but are not allowed in the pool or on
        the second floor. Breaking the pet policy incurs a deep-cleaning fee of at least ₱2,500. Full pet policy
        details are sent before you confirm your reservation.
      </p>
    ),
  },
  {
    q: "Do you provide towels and blankets?",
    a: <p>Absolutely! We provide free use of towels, blankets, pillows, and complete beddings for every guest in your headcount.</p>,
  },
  {
    q: "Can guests bring their own food and beverages? Is there a corkage charge?",
    a: (
      <p>
        Yes! Guests may bring their own food and beverages at no additional corkage fee, and food deliveries are
        welcome too. A ₱1,500/night catering corkage fee only applies if you hire a professional catering service
        that requires a tables-and-chairs setup at the villa.
      </p>
    ),
  },
  {
    q: "What should we bring during our stay?",
    a: (
      <p>
        We recommend bringing your own toiletries, dishwashing liquid, hand towels, and dining utensils (plates,
        spoons, forks, serving bowls, drinking glasses, etc.) — these aren't provided, to help maintain proper
        hygiene and safety standards.
      </p>
    ),
  },
  {
    q: "How many guests can the villa accommodate?",
    a: (
      <>
        <ul className="list-disc pl-5 space-y-1 mb-2">
          <li>Villa 1 — 30–50 pax</li>
          <li>Villa 2 — 30–50 pax</li>
          <li>Villa 3 — 30–50 pax</li>
          <li>Villa 4 — 30–50 pax</li>
          <li>Villa 5 — 30–50 pax</li>
        </ul>
        <p>
          Guests aged 6 and above are included in the headcount, whether staying overnight or visiting for the day.
          Children 5 and below are free of charge and excluded from the headcount.
        </p>
      </>
    ),
  },
  {
    q: "Is there parking available at the villa?",
    a: (
      <>
        <p className="mb-2">Yes, each villa has its own indoor parking area:</p>
        <ul className="list-disc pl-5 space-y-1 mb-2">
          <li>Villa 1: 1–2 cars</li>
          <li>Villa 2: 4–5 cars</li>
          <li>Villa 3: 2–3 cars</li>
          <li>Villa 4: 5–6 cars</li>
          <li>Villa 5: 2–4 cars</li>
        </ul>
        <p>Additional vehicles can park along the street just outside the gate, also covered by our CCTV.</p>
      </>
    ),
  },
  {
    q: "Will anyone else be staying in the villa with us?",
    a: (
      <p>
        No. When you rent a villa, you have exclusive use of the entire villa and its amenities — pools, rooms,
        entertainment facilities, kitchen, and more — with complete privacy and no sharing with other guests or
        groups.
      </p>
    ),
  },
  {
    q: "Do you offer maid service?",
    a: (
      <p>
        We currently don't offer maid or cook services at our private villas. Our resort staff's primary
        responsibility is the safety and security of the villa and its guests, though they're happy to assist with
        basic needs and reasonable requests whenever possible.
      </p>
    ),
  },
];

export function FAQSection() {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (q: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(q)) {
        next.delete(q);
      } else {
        next.add(q);
      }
      return next;
    });
  };

  return (
    <section id="faq" className="py-20" style={{ background: "#fdf6ec" }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <span
            className="inline-block px-4 py-1.5 rounded-full text-sm tracking-widest uppercase mb-4"
            style={{ backgroundColor: "#fff8e1", color: "#7a6000", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Good to Know
          </span>
          <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(2rem, 4vw, 3rem)", color: "#1a2e1a", fontWeight: 700 }}>
            Frequently Asked <span style={{ color: "#e8a33d" }}>Questions</span>
          </h2>
          <p className="mt-4 max-w-xl mx-auto" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#6b7a5e", fontSize: "1.05rem", lineHeight: 1.7 }}>
            Everything you need to know before booking your stay at Casa Primera. Tap a question to see the answer.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {faqs.map((item, i) => {
            const isOpen = openItems.has(item.q);
            return (
              <motion.div
                key={item.q}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 2) * 0.08, duration: 0.45 }}
                className="rounded-2xl shadow-sm overflow-hidden cursor-pointer transition-shadow duration-200 hover:shadow-md"
                style={{ backgroundColor: "#fff", border: isOpen ? "1px solid rgba(0,180,216,0.35)" : "1px solid rgba(0,180,216,0.1)" }}
                onClick={() => toggleItem(item.q)}
              >
                <button
                  className="w-full flex items-start justify-between gap-3 p-6 text-left"
                  aria-expanded={isOpen}
                >
                  <p
                    style={{
                      fontFamily: "'Fraunces', serif",
                      fontSize: "1.02rem",
                      fontWeight: 700,
                      color: "#007a9a",
                      lineHeight: 1.4,
                    }}
                  >
                    {item.q}
                  </p>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center mt-0.5"
                    style={{ backgroundColor: isOpen ? "#00b4d8" : "#e0f7fa" }}
                  >
                    <ChevronDown size={15} color={isOpen ? "#fff" : "#007a9a"} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      style={{ overflow: "hidden" }}
                    >
                      <div
                        className="px-6 pb-6"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.88rem", color: "#4a5e40", lineHeight: 1.7 }}
                      >
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
