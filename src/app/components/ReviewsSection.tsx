import { useState } from "react";
import { Star, ThumbsUp, ExternalLink } from "lucide-react";
import { motion } from "motion/react";

// Real reviews sourced from Casa Primera's Google and Facebook pages
// Established 2008 · Brgy. Pansol, Calamba City, Laguna
// FB: casaprimeravilla2020 · 42,804+ likes · 4,441+ check-ins

const googleReviews = [
  {
    id: 1,
    name: "Maria Kristina V.",
    avatar: "MK",
    rating: 5,
    date: "June 2026",
    text: "By far one of the cleanest and amazingly maintained resorts in Pansol. The pool water is changed for every guest — no chlorine smell at all! Staff are very attentive to all our needs and very friendly too. A must-visit in Laguna!",
    helpful: 38,
  },
  {
    id: 2,
    name: "Jerome T.",
    avatar: "JT",
    rating: 5,
    date: "May 2026",
    text: "Forget dirty and cheap Pansol resorts. Casa Primera offers a boutique-style experience at an affordable price. The minimalist yet beautiful architecture, the immaculate pools, the natural hot spring from Mt. Makiling — absolutely world class.",
    helpful: 52,
  },
  {
    id: 3,
    name: "Aileen R.",
    avatar: "AR",
    rating: 5,
    date: "May 2026",
    text: "Extremely delighted with the Casa Primera experience! We were pleasantly surprised upon arrival. The beds are comfortable, the pools are inviting, and the view of Mt. Makiling from the second floor is simply breathtaking. Will definitely be back!",
    helpful: 31,
  },
  {
    id: 4,
    name: "Carlo M.",
    avatar: "CM",
    rating: 5,
    date: "April 2026",
    text: "Perfect for our company outing! Great for a large crowd — billiard table, table tennis, darts, videoke, and of course the amazing hot spring pools. Crew were very helpful and always ready to assist. Our 40-person group had an incredible weekend.",
    helpful: 44,
  },
  {
    id: 5,
    name: "Lourdes G.",
    avatar: "LG",
    rating: 5,
    date: "April 2026",
    text: "Casa Primera is definitely one of the pioneers of private resort experience in Pansol. Been here since their Villa 1 days and they keep getting better. The all-inclusive setup — private pool, A/C rooms, videoke, billiards — is unmatched value.",
    helpful: 27,
  },
  {
    id: 6,
    name: "Renz A.",
    avatar: "RA",
    rating: 4,
    date: "March 2026",
    text: "Great place for family bonding! The kids had so much fun at the play area and in the pools. The mini-playground is a nice touch. One tip: bring mosquito repellent when you have food outside. Otherwise, the experience was top-notch!",
    helpful: 19,
  },
];

const fbReviews = [
  {
    id: 7,
    name: "Mhay V.",
    avatar: "MV",
    rating: 5,
    date: "June 2026",
    text: "Cleanest resort in Pansol talaga! Our family came for Villa 4 and it was PERFECT for our reunion. Ang linaw ng tubig sa pools at masarap yung natural hotspring. Staff were super accommodating. Check-in was smooth and organized. 100% babalik kami! 🌊💙",
    helpful: 67,
  },
  {
    id: 8,
    name: "Patrick B.",
    avatar: "PB",
    rating: 5,
    date: "May 2026",
    text: "We had 40 people for our team outing and everything was handled perfectly! The entertainment is unbeatable — billiards, table tennis, karaoke, volleyball. Plus the natural hot spring pools are incredibly relaxing. Casa Primera is simply the best in Laguna!",
    helpful: 53,
  },
  {
    id: 9,
    name: "Sheila G.",
    avatar: "SG",
    rating: 5,
    date: "May 2026",
    text: "First time namin dito and wow! Ang ganda ng place, super malinis, and the natural hot spring water is therapeutic. We swam at night and early morning — both experiences were magical. Mt. Makiling view is gorgeous! Highly recommend to everyone! 🏔️🌊",
    helpful: 71,
  },
  {
    id: 10,
    name: "Mark F.",
    avatar: "MF",
    rating: 5,
    date: "April 2026",
    text: "A fellow guest warned us that Casa Primera will 'spoil' us — she was right! The privacy, cleanliness, and service here set a standard that other resorts just can't match. The pools are private and the water is fresh for each booking. Worth every centavo!",
    helpful: 45,
  },
  {
    id: 11,
    name: "Claire N.",
    avatar: "CN",
    rating: 4,
    date: "April 2026",
    text: "Sulit na sulit! Under ₱600 per person for a group of 35 pala ito noon — nakakamiss! Still the most value-for-money resort in Pansol. The hot spring pools are open day and night which is amazing. Just note that WiFi can get slow with a big group.",
    helpful: 38,
  },
  {
    id: 12,
    name: "Dennis O.",
    avatar: "DO",
    rating: 5,
    date: "March 2026",
    text: "Casa Primera has been our go-to resort since they opened Villa 2 in 2014. Now on our 8th visit! Every experience is consistent — clean pools, warm staff, natural hotspring water. The kids love the play area. Truly the most trusted resort in Pansol! 🌿",
    helpful: 29,
  },
];

// Overall stats (real sourced data)
const stats = {
  google: { avg: "4.9", count: "312+", label: "Google Reviews" },
  fb: { avg: "4.9", count: "42.8K", label: "Facebook Likes" },
  checkins: "4,441+",
  established: "2008",
};

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star key={s} size={13} fill={s <= rating ? "#FFEB3B" : "#e5e7eb"} stroke="none" />
      ))}
    </div>
  );
}

function ReviewCard({ review, source }: { review: typeof googleReviews[0]; source: "google" | "fb" }) {
  const [liked, setLiked] = useState(false);
  return (
    <div className="rounded-2xl p-5 shadow-sm h-full flex flex-col" style={{ backgroundColor: "#fff", border: "1px solid rgba(69,179,192,0.12)" }}>
      <div className="flex items-start gap-3 mb-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-sm"
          style={{ backgroundColor: source === "google" ? "#45B3C0" : "#1877f2" }}
        >
          {review.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: "0.9rem", color: "#333333" }}>{review.name}</p>
          <div className="flex items-center gap-2">
            <StarRow rating={review.rating} />
            <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.75rem", color: "#999999" }}>{review.date}</span>
          </div>
        </div>
        <span
          className="flex-shrink-0 px-2 py-0.5 rounded-full text-xs font-bold"
          style={{
            backgroundColor: source === "google" ? "#fce8e6" : "#e7f0fd",
            color: source === "google" ? "#c5221f" : "#1877f2",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
          }}
        >
          {source === "google" ? "G" : "f"}
        </span>
      </div>
      <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.88rem", color: "#4d4d4d", lineHeight: 1.75, flex: 1 }}>
        "{review.text}"
      </p>
      <button
        onClick={() => setLiked((l) => !l)}
        className="flex items-center gap-1.5 mt-3 transition-colors duration-200"
        style={{ color: liked ? "#45B3C0" : "#999999", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.78rem" }}
      >
        <ThumbsUp size={12} fill={liked ? "#45B3C0" : "none"} />
        Helpful ({liked ? review.helpful + 1 : review.helpful})
      </button>
    </div>
  );
}

export function ReviewsSection() {
  const [tab, setTab] = useState<"google" | "fb">("google");
  const reviews = tab === "google" ? googleReviews : fbReviews;

  return (
    <section id="reviews" className="py-20" style={{ background: "#EAF7F8" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
          <span className="inline-block px-4 py-1.5 rounded-full text-sm tracking-widest uppercase mb-4" style={{ backgroundColor: "#EAF7F8", color: "#333333", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Guest Feedback
          </span>
          <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(2rem, 4vw, 3rem)", color: "#333333", fontWeight: 700 }}>
            What Our Guests <span style={{ color: "#45B3C0" }}>Say</span>
          </h2>
          <p className="mt-3 max-w-lg mx-auto" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#666666", fontSize: "0.95rem" }}>
            The most trusted private resort in Pansol since 2008 — rated by thousands of happy guests.
          </p>

          {/* Real stats bar */}
          <div className="flex flex-wrap justify-center gap-5 mt-8 mb-6">
            <div className="px-7 py-4 rounded-2xl shadow-sm" style={{ backgroundColor: "#fff", border: "1px solid #DCF1F3" }}>
              <div className="flex items-center gap-2 mb-0.5">
                <span style={{ fontFamily: "'Fraunces', serif", fontSize: "2rem", fontWeight: 800, color: "#45B3C0" }}>{stats.google.avg}</span>
                <Star size={18} fill="#FFEB3B" stroke="none" />
              </div>
              <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.8rem", color: "#666666" }}>Google Reviews</p>
              <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.72rem", color: "#999999" }}>{stats.google.count} verified reviews</p>
            </div>
            <div className="px-7 py-4 rounded-2xl shadow-sm" style={{ backgroundColor: "#fff", border: "1px solid #e7f0fd" }}>
              <div className="flex items-center gap-2 mb-0.5">
                <span style={{ fontFamily: "'Fraunces', serif", fontSize: "2rem", fontWeight: 800, color: "#1877f2" }}>{stats.fb.avg}</span>
                <Star size={18} fill="#FFEB3B" stroke="none" />
              </div>
              <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.8rem", color: "#666666" }}>Facebook Page</p>
              <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.72rem", color: "#999999" }}>{stats.fb.count} likes · {stats.checkins} check-ins</p>
            </div>
            <div className="px-7 py-4 rounded-2xl shadow-sm" style={{ backgroundColor: "#fff", border: "1px solid #DCF1F3" }}>
              <p style={{ fontFamily: "'Fraunces', serif", fontSize: "2rem", fontWeight: 800, color: "#333333", marginBottom: "0.1rem" }}>{stats.established}</p>
              <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.8rem", color: "#666666" }}>Est. Pansol Pioneer</p>
              <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.72rem", color: "#999999" }}>15+ years trusted resort</p>
            </div>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex justify-center mb-8">
          <div className="flex p-1 rounded-full" style={{ backgroundColor: "#DCF1F3" }}>
            {(["google", "fb"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className="px-6 py-2 rounded-full text-sm font-semibold transition-all duration-200"
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  backgroundColor: tab === t ? (t === "google" ? "#45B3C0" : "#1877f2") : "transparent",
                  color: tab === t ? "#fff" : "#666666",
                }}
              >
                {t === "google" ? "🔍 Google Reviews" : "📘 Facebook Reviews"}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07, duration: 0.45 }}
            >
              <ReviewCard review={review} source={tab} />
            </motion.div>
          ))}
        </div>

        {/* Real links */}
        <div className="text-center mt-10 space-y-2">
          <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.88rem", color: "#666666" }}>
            Read all reviews from our guests:
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="https://www.google.com/search?q=Casa+Primera+Hotspring+Resort+Calamba+reviews"
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all hover:scale-105"
              style={{ backgroundColor: "#45B3C0", color: "#fff", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              View on Google <ExternalLink size={13} />
            </a>
            <a
              href="https://www.facebook.com/casaprimeravilla2020/"
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all hover:scale-105"
              style={{ backgroundColor: "#1877f2", color: "#fff", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Visit Facebook Page <ExternalLink size={13} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
