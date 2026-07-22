import { X, Building2 } from "lucide-react";
import { motion } from "motion/react";

interface Props {
  onAccept: () => void;
  onClose: () => void;
}

export function TermsModal({ onAccept, onClose }: Props) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <motion.div
        className="relative w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl flex flex-col"
        style={{ backgroundColor: "#fff", maxHeight: "90vh" }}
        initial={{ opacity: 0, scale: 0.93, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b flex-shrink-0" style={{ borderColor: "#DCF1F3", backgroundColor: "#45B3C0" }}>
          <h2 style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: "1.2rem", color: "#fff" }}>
            Terms & Conditions
          </h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center transition-colors">
            <X size={16} color="#fff" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto flex-1 px-6 py-5 space-y-6" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

          {/* Check-in/out */}
          <div>
            <h3 style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, color: "#333333", fontSize: "1rem" }} className="mb-2">
              🕐 Check-in & Check-out
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl text-center" style={{ backgroundColor: "#DCF1F3" }}>
                <p style={{ fontSize: "1.6rem", fontWeight: 800, color: "#45B3C0" }}>3:00 PM</p>
                <p style={{ fontSize: "0.8rem", color: "#666666" }}>Check-in time</p>
              </div>
              <div className="p-3 rounded-xl text-center" style={{ backgroundColor: "#EAF7F8" }}>
                <p style={{ fontSize: "1.6rem", fontWeight: 800, color: "#FFEB3B" }}>12:00 NN</p>
                <p style={{ fontSize: "0.8rem", color: "#666666" }}>Check-out time</p>
              </div>
            </div>
            <p style={{ fontSize: "0.85rem", color: "#666666", marginTop: "0.5rem" }}>
              Early check-in and late check-out are subject to availability and may incur additional fees. Please arrange in advance.
            </p>
          </div>

          {/* Capacity */}
          <div>
            <h3 style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, color: "#333333", fontSize: "1rem" }} className="mb-2">
              👥 Guest Capacity
            </h3>
            <ul style={{ fontSize: "0.88rem", color: "#4d4d4d", lineHeight: 1.85 }} className="list-disc pl-4 space-y-1">
              <li><strong>Capacity per villa:</strong> 34–50 pax (varies by villa)</li>
              <li><strong>Casa Primera Villa 1:</strong> Up to 34 guests</li>
              <li><strong>Casa Primera Villa 2:</strong> Up to 40 guests</li>
              <li><strong>Casa Primera Villa 3:</strong> Up to 50 guests</li>
              <li><strong>Casa Primera Villa 4:</strong> Up to 40 guests</li>
              <li><strong>Casa Primera Villa 5:</strong> Up to 34 guests</li>
            </ul>
            <p style={{ fontSize: "0.85rem", color: "#c0392b", marginTop: "0.5rem" }}>
              ⚠ If you go over the strict maximum capacity of the villa, the overcapacity penalty charge is Php 5,000 on top of the extra pax surcharges for every person exceeding your package inclusion. If you have question or concern about this matter, please feel free to contact us directly.
            </p>
          </div>

          {/* Mode of Payment */}
          <div>
            <h3 style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, color: "#333333", fontSize: "1rem" }} className="mb-3">
              💳 Mode of Payment
            </h3>
            <div className="flex items-start gap-3 p-3 rounded-xl" style={{ backgroundColor: "#f8feff", border: "1px solid #DCF1F3" }}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: "#DCF1F3" }}>
                <Building2 size={15} color="#45B3C0" />
              </div>
              <div>
                <p style={{ fontSize: "0.88rem", fontWeight: 600, color: "#333333" }}>BDO Bank Transfer</p>
                <p style={{ fontSize: "0.78rem", color: "#666666" }}>Acct No: 1234-5678-9012 · Casa Primera Resort</p>
              </div>
            </div>
          </div>

          {/* Payment limitation */}
          <div>
            <h3 style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, color: "#333333", fontSize: "1rem" }} className="mb-2">
              ⚠ Payment Policy & Limitations
            </h3>
            <ul style={{ fontSize: "0.88rem", color: "#4d4d4d", lineHeight: 1.85 }} className="list-disc pl-4 space-y-1">
              <li>A <strong>50% down payment</strong> is required to confirm your reservation.</li>
              <li>The remaining balance must be settled <strong>upon check-in</strong>.</li>
              <li>Reservations without payment confirmation within <strong>24 hours</strong> will be automatically released.</li>
              <li>Down payments are <strong>non-refundable</strong> for cancellations made less than 7 days before check-in.</li>
              <li>For cancellations made <strong>7+ days</strong> in advance, a refund (less 10% processing fee) may be requested.</li>
              <li>No cash advances or in-resort credit. All charges must be settled before departure.</li>
            </ul>
          </div>

          {/* House rules */}
          <div>
            <h3 style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, color: "#333333", fontSize: "1rem" }} className="mb-2">
              🏡 House Rules
            </h3>
            <ul style={{ fontSize: "0.88rem", color: "#4d4d4d", lineHeight: 1.85 }} className="list-disc pl-4 space-y-1">
              <li>No outside food and drinks without prior arrangement.</li>
              <li>Strictly <strong>no pets</strong> allowed inside the villas.</li>
              <li>Quiet hours from <strong>10:00 PM to 7:00 AM</strong>.</li>
              <li>Guests are responsible for any damage caused to villa property.</li>
              <li>Smoking is allowed only in designated areas.</li>
              <li>Children below 12 must be supervised by an adult at all times near the pools.</li>
              <li>The resort reserves the right to refuse admission to intoxicated individuals.</li>
            </ul>
          </div>

          {/* Data & Privacy */}
          <div>
            <h3 style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, color: "#333333", fontSize: "1rem" }} className="mb-2">
              🔒 Data Privacy
            </h3>
            <p style={{ fontSize: "0.88rem", color: "#4d4d4d", lineHeight: 1.75 }}>
              By submitting a reservation, you consent to the collection and use of your personal information in accordance with the Data Privacy Act of 2012 (R.A. 10173). Your data will only be used for reservation management and resort communications.
            </p>
          </div>
        </div>

        {/* Footer actions */}
        <div className="px-6 py-4 border-t flex gap-3 flex-shrink-0" style={{ borderColor: "#DCF1F3" }}>
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-full font-semibold border transition-all duration-200 hover:bg-gray-50"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.9rem", color: "#666666", borderColor: "#A8DDE3" }}
          >
            Cancel
          </button>
          <button
            onClick={onAccept}
            className="flex-1 py-3 rounded-full font-semibold text-white transition-all duration-200 hover:opacity-90 hover:scale-[1.02]"
            style={{ backgroundColor: "#45B3C0", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.9rem" }}
          >
            I Agree & Reserve Now
          </button>
        </div>
      </motion.div>
    </div>
  );
}
