import { X, Building2 } from "lucide-react";
import { motion } from "motion/react";
import { format } from "date-fns";
import type { DateRange } from "react-day-picker";

interface Quote {
  villaName: string;
  tierLabel: string;
  rooms: string;
  basePrice: number;
  extraHeads: number;
  extraCost: number;
  total: number;
  guests: number;
}

interface Props {
  onAccept: () => void;
  onClose: () => void;
  villa: string;
  guests: string;
  dateRange: DateRange | undefined;
  nights: number;
  quote: Quote | null;
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, color: "#333333", fontSize: "1rem" }} className="mb-2">
      {children}
    </h3>
  );
}

function List({ items }: { items: React.ReactNode[] }) {
  return (
    <ul style={{ fontSize: "0.86rem", color: "#4d4d4d", lineHeight: 1.8 }} className="list-disc pl-4 space-y-1.5">
      {items.map((item, i) => <li key={i}>{item}</li>)}
    </ul>
  );
}

export function TermsModal({ onAccept, onClose, villa, guests, dateRange, nights, quote }: Props) {
  const bookingDate = format(new Date(), "MMM d, yyyy");
  const stayLabel = dateRange?.from && dateRange?.to
    ? `${format(dateRange.from, "MMM d")} – ${format(dateRange.to, "MMM d, yyyy")} (${nights} night${nights !== 1 ? "s" : ""})`
    : "To be confirmed";

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <motion.div
        className="relative w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl flex flex-col"
        style={{ backgroundColor: "#fff", maxHeight: "92dvh" }}
        initial={{ opacity: 0, scale: 0.93, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b flex-shrink-0" style={{ borderColor: "#DCF1F3", backgroundColor: "#45B3C0" }}>
          <h2 style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: "1.05rem", color: "#fff", lineHeight: 1.3 }}>
            Booking Details and<br className="sm:hidden" /> Terms & Conditions
          </h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center transition-colors flex-shrink-0 ml-3">
            <X size={16} color="#fff" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto flex-1 px-5 sm:px-6 py-5 space-y-6" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

          {/* Booking summary */}
          <div className="rounded-2xl p-4" style={{ backgroundColor: "#EAF7F8", border: "1px solid #DCF1F3" }}>
            <p style={{ fontSize: "0.75rem", color: "#666666", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 700 }} className="mb-3">
              Your Booking Summary
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
              <div>
                <p style={{ fontSize: "0.72rem", color: "#999999" }}>Booking Date</p>
                <p style={{ fontSize: "0.9rem", color: "#333333", fontWeight: 600 }}>{bookingDate}</p>
              </div>
              <div>
                <p style={{ fontSize: "0.72rem", color: "#999999" }}>Check-in / Check-out</p>
                <p style={{ fontSize: "0.9rem", color: "#333333", fontWeight: 600 }}>3:00 PM / 12:00 NN</p>
                <p style={{ fontSize: "0.78rem", color: "#666666" }}>{stayLabel}</p>
              </div>
              <div>
                <p style={{ fontSize: "0.72rem", color: "#999999" }}>Villa</p>
                <p style={{ fontSize: "0.9rem", color: "#333333", fontWeight: 600 }}>{villa || "To be selected"}</p>
              </div>
              <div>
                <p style={{ fontSize: "0.72rem", color: "#999999" }}>Number of Pax</p>
                <p style={{ fontSize: "0.9rem", color: "#333333", fontWeight: 600 }}>{guests}</p>
              </div>
              <div className="sm:col-span-2">
                <p style={{ fontSize: "0.72rem", color: "#999999" }}>Package Rate</p>
                {quote ? (
                  <p style={{ fontSize: "0.95rem", color: "#333333", fontWeight: 700 }}>
                    ₱{quote.total.toLocaleString()} / night
                    {quote.extraHeads > 0 && (
                      <span style={{ fontSize: "0.78rem", color: "#c0392b", fontWeight: 500 }}> (incl. +₱{quote.extraCost.toLocaleString()} extra-pax surcharge)</span>
                    )}
                    {nights > 0 && (
                      <span style={{ fontSize: "0.82rem", color: "#666666", fontWeight: 500 }}> · ₱{(quote.total * nights).toLocaleString()} total for {nights} night{nights !== 1 ? "s" : ""}</span>
                    )}
                  </p>
                ) : (
                  <p style={{ fontSize: "0.9rem", color: "#999999" }}>Select a villa to see your rate</p>
                )}
              </div>
            </div>
          </div>

          {/* Reservation, Cancellation and Rebooking Policies */}
          <div>
            <SectionHeading>📅 Reservation, Cancellation and Rebooking Policies</SectionHeading>
            <List items={[
              <><strong><em>Once confirmed, no downgrades or decrease in the number of pax, refunds or rebookings made less than 10 days from your date of reservation.</em></strong></>,
              <>Reservations affected by the community quarantine restrictions are only subject for rebooking or open rebooking.</>,
              <>In case of last minute rebookings (made 1 to 9 days before the date of reservation), a penalty of Php 5,000/night will be charged on top of the rental fee.</>,
              <>If you cancel at least 10 days prior to your reservation date, we will refund 50% of your down payment or you could rebook once with no extra cost. You will be given 14 days to provide us with a final rebooking date.</>,
              <>Rebookings requested less than 10 days from the date of booking are subject for approval by the management. All succeeding rebookings after the first free rebooking have a Php 5,000/night rebooking fee on top of the rental rate. Refunds or cancellations of reservations are no longer possible.</>,
              <>In case of severe weather conditions where the province of Laguna is declared signal number three or as advised by PAGASA, we allow last minute rebookings. No cancellations and refunds are allowed under these circumstances.</>,
              <>"No show" prior to check-in are non-refundable, non-transferable to other villas, cannot be cancelled and rebooked.</>,
            ]} />
          </div>

          {/* Check-In / Check-Out Policies */}
          <div>
            <SectionHeading>🕐 Check-In / Check-Out Policies</SectionHeading>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="p-3 rounded-xl text-center" style={{ backgroundColor: "#DCF1F3" }}>
                <p style={{ fontSize: "1.5rem", fontWeight: 800, color: "#45B3C0" }}>3:00 PM</p>
                <p style={{ fontSize: "0.78rem", color: "#666666" }}>Check-in time</p>
              </div>
              <div className="p-3 rounded-xl text-center" style={{ backgroundColor: "#EAF7F8" }}>
                <p style={{ fontSize: "1.5rem", fontWeight: 800, color: "#c9a600" }}>12:00 NN</p>
                <p style={{ fontSize: "0.78rem", color: "#666666" }}>Check-out time</p>
              </div>
            </div>
            <List items={[
              <>Present a printed or soft copy of the Reservation Confirmation Sheet.</>,
              <>Upon check-in, settle your remaining balance, if any, by handing it over to the resort's staff. Also, note that we only accept cash or bank transfers (BPI) at the resort.</>,
              <>Check-in and check-out time is strictly implemented at our private villas. We do not have a waiting area in case the guests arrive early.</>,
              <>Time adjustment requests are subject for approval.</>,
              <>Extensions at Php 1,000/hour if the villa is available.</>,
              <>Every villa has its own caretakers, do not hesitate to contact them.</>,
              <>The resort will issue the receipt. The guest is solely responsible for securing a copy before leaving the resort.</>,
            ]} />
          </div>

          {/* Security Deposit */}
          <div>
            <SectionHeading>🔐 Security Deposit</SectionHeading>
            <p style={{ fontSize: "0.86rem", color: "#4d4d4d", lineHeight: 1.75 }}>
              The management will collect <strong>Php 2,000 per villa</strong> for incidental expenses upon check-in. Full refund will be given upon check-out if no incidental expenses are incurred.
            </p>
          </div>

          {/* Resort Amenities */}
          <div>
            <SectionHeading>🎁 Resort Amenities</SectionHeading>
            <List items={[
              <>Private Villas</>,
              <>Private Hot Spring Pool</>,
              <>Kiddie Pool & Playground</>,
              <>Fully-Air Conditioned Rooms w/ TVs</>,
              <>Bathrooms with Shower Heaters <em>(toiletries such as shampoo, soap, toothbrush etc. are not provided)</em></>,
              <>FREE WIFI</>,
              <>FREE use of Videoke & Sound System</>,
              <>FREE use of beddings, blankets and towels good for your number of pax</>,
              <>FREE use of basic cooking utensils such as cooking pot, cooking wok, knife, cooking ladle, cooking spatula, grill tongs, chopping board, dish covers <em>(dishwashing liquid, kitchen hand towels and dining utensils such as plates, cups, spoons, forks, and table napkins are not provided)</em></>,
              <>FREE use of kitchen appliances such as Ref, Stove, LPG, Oven Toaster, Microwave (upon request), Rice Cooker, BBQ Grill, Hot and Cold Water Dispenser <em>(with one free bottle/5gallons. Php 50 for each succeeding bottle)</em></>,
              <>FREE use of Billiards, Table Tennis, Water Volleyball, Darts, Poker, Mahjong etc.</>,
              <>Secured indoor and street parking with 24-hours CCTV monitoring</>,
              <>Generator</>,
              <>Roof deck <em>(for Villa 4. Not included in the package but guests will be allowed to use it for 30 minutes only and for picture-taking purposes only)</em></>,
            ]} />
          </div>

          {/* Additional Charges */}
          <div>
            <SectionHeading>💰 Additional Charges</SectionHeading>
            <List items={[
              <>Extra pax | Php 500/head/night <em>(except kids below 5 years old. We also count everyone that goes inside the resort whether they are staying overnight or not.)</em></>,
              <>Extra room | Php 2,500/room/night</>,
              <>Extension | Php 1,000/hour <em>(in excess of 21 hours | only if the villa is available)</em></>,
              <>Pet surcharge/deep cleaning | Php 500/pet/night <em>(see pet-friendly policy below)</em></>,
              <>Catering corkage | Php 1,500/night</>,
              <>Professional lights and sounds set-up, live bands etc. | Php 5,000/night</>,
              <>Food carts, photo booths etc. | Php 1,000/supplier/night</>,
              <>Small appliances/electronics | Php 500/item/night</>,
              <>Jacuzzi | Php 500/30 minutes <em>(for Villa 3 and Villa 5 only)</em></>,
            ]} />
          </div>

          {/* Property Damage */}
          <div>
            <SectionHeading>🛠 Property Damage</SectionHeading>
            <p style={{ fontSize: "0.86rem", color: "#4d4d4d", lineHeight: 1.75 }} className="mb-3">
              Resort guests are responsible for any damage, abuse, excessive clean-up requirements, considered, but not limited to: vomit and/or other bodily fluids; large quantities of beverage and food debris; floors covered in sticky residue, broken appliances, damaged resort fixtures, or loss caused by any member of the resort guest's party or hired suppliers to the property or its contents during occupancy. Casa Primera Hot Spring Resorts reserves the right to further bill the guest for additional cleaning, losses, damages or repairs. Excessive clean-up fee starts at Php 500.
            </p>
            <p style={{ fontSize: "0.86rem", color: "#4d4d4d", lineHeight: 1.75 }}>
              A detailed agreement and resort amenities checklist (with costing) will be presented and signed upon turnover at the resort.
            </p>
          </div>

          {/* Guest Count */}
          <div>
            <SectionHeading>👥 Guest Count</SectionHeading>
            <p style={{ fontSize: "0.86rem", color: "#4d4d4d", lineHeight: 1.75 }} className="mb-2">
              Guests agree that the premises shall be occupied by no more than the number of pax paid for and stated herein and in the Reservation Confirmation Sheet. We count both adults and kids alike, except for children below five (5) years old. We also count everyone that goes inside the resort whether they are staying overnight or not.
            </p>
            <p style={{ fontSize: "0.86rem", color: "#4d4d4d", lineHeight: 1.75 }} className="mb-2">
              Occupancy by more than the stated number of guests will result in a required upgrade to the next available package. If no upgrade is available, extra pax surcharge of <strong>Php 500/head/night</strong> applies.
            </p>
            <p style={{ fontSize: "0.84rem", color: "#c0392b", lineHeight: 1.75, marginBottom: "0.6rem" }}>
              <u>IMPORTANT NOTICE:</u> In compliance with the IATF Guidelines, we are only allowing 50% of the villa's maximum capacity. If you go over the strict maximum capacity of the villa, the overcapacity penalty charge is Php 5,000 on top of the extra pax surcharges for every person exceeding your package inclusion.
            </p>
            <List items={[
              <>Villa 1 – up to 34 pax maximum capacity</>,
              <>Villa 2 – up to 40 pax maximum capacity</>,
              <>Villa 3 – up to 50 pax maximum capacity</>,
              <>Villa 4 – up to 40 pax maximum capacity</>,
              <>Villa 5 – up to 34 pax maximum capacity</>,
            ]} />
          </div>

          {/* Senior citizen and PWD discount policy */}
          <div>
            <SectionHeading>🎖 Senior Citizen and PWD Discount Policy</SectionHeading>
            <p style={{ fontSize: "0.86rem", color: "#4d4d4d", lineHeight: 1.75 }} className="mb-2">
              Casa Primera Hot Spring Resorts gives a 20% discount to Senior Citizens or Persons with Disability. Discount shall only apply on the prorated share of the package rate of the entitled person. The discount will be deducted in the resort upon arrival and presentation of the required Philippine-Issued Senior Citizen's or Person with Disability Identification Card.
            </p>
            <p style={{ fontSize: "0.86rem", color: "#4d4d4d", lineHeight: 1.75 }}>
              Senior and PWD discount cannot be availed in conjunction with any of our on-going promos and discounted rates. The guests can either avail the promotional discount or the discount provided under the Expanded Senior Citizens Act of 2010, whichever is higher.
            </p>
          </div>

          {/* Pet-friendly policy */}
          <div>
            <SectionHeading>🐾 Pet-Friendly Policy</SectionHeading>
            <p style={{ fontSize: "0.86rem", color: "#4d4d4d", lineHeight: 1.75 }} className="mb-2">
              Please be informed that we allow pets inside our resort as long as the pet owner/owners are following our Pet Policy listed below:
            </p>
            <List items={[
              <>The charge for every pet brought into our resort is Php 500/pet/night to cover our costs for extra cleaning. The pet charge must be settled upon your arrival at the resort.</>,
              <>We only allow dogs and cats for a maximum of 5 in total.</>,
              <>All pets must be well-behaved, house-trained, vaccinated, and must be kept on a leash or in a pet carrier/cage while in the common areas of our resort.</>,
              <>If in case the pet has bitten, scratched, or hurt any person while inside the resort premises, the pet owner will be responsible for paying charges for the medical treatments of the bitten/scratched/hurt person.</>,
              <>The pet owner will also be responsible for paying charges if the pet has caused any damage to our resort's property.</>,
              <>Pets are only allowed in the open areas on the ground floor of the villa such as the dining hall, garden, hallways, parking, and the rooms on the ground floor only. Pets must be in diapers at all times.</>,
              <>Pets are not allowed inside the rooms on the second floor and they are not allowed to swim in the pool.</>,
              <>The penalty for breaking this pet policy is an additional deep-cleaning fee of Php 2,500 per timeslot.</>,
            ]} />
          </div>

          {/* Additional Event Set-up Surcharge */}
          <div>
            <SectionHeading>🎉 Additional Event Set-up Surcharge</SectionHeading>
            <p style={{ fontSize: "0.86rem", color: "#4d4d4d", lineHeight: 1.75 }} className="mb-2">
              Additional charges may be incurred for weddings, debuts, baptisms, reunions, anniversaries, team building activities, and other parties that require additional event setup over and above our included amenities. Below are corresponding fees for some usual items:
            </p>
            <List items={[
              <>Professional Lights & Sounds, Live Bands, and the like: Php 5,000/night (by approval based on electrical load capacity).</>,
              <>We do not charge any corkage fee for bringing your own food and drinks, or delivery of food trays, except if you hire a professional caterer with tables and chairs setup: Php 1,500/night catering corkage fee.</>,
              <>Mobile Bar, Food Carts, Photo Booth etc.: Php 1,000/night per supplier.</>,
              <>Projectors, Mini Component/Sound System, and other small appliances & electronics: Php 1,000/night per item.</>,
            ]} />
            <p style={{ fontSize: "0.86rem", color: "#4d4d4d", lineHeight: 1.75 }} className="mt-2">
              Note that Casa Primera Villa Hot Spring Resorts does not supply any of the above-mentioned items, but we charge for the additional use of our facilities, electricity, and water, over and above the regular amenities that we provide.
            </p>
          </div>

          {/* Mode of Payment */}
          <div>
            <SectionHeading>💳 Mode of Payment</SectionHeading>
            <div className="flex items-start gap-3 p-3 rounded-xl" style={{ backgroundColor: "#f8feff", border: "1px solid #DCF1F3" }}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: "#DCF1F3" }}>
                <Building2 size={15} color="#45B3C0" />
              </div>
              <div>
                <p style={{ fontSize: "0.88rem", fontWeight: 600, color: "#333333" }}>BDO Bank Transfer</p>
                <p style={{ fontSize: "0.78rem", color: "#666666" }}>Casa Primera Resort · A 50% down payment secures your reservation; send proof of payment to our contact number.</p>
              </div>
            </div>
          </div>

          {/* Data & Privacy */}
          <div>
            <SectionHeading>🔒 Data Privacy</SectionHeading>
            <p style={{ fontSize: "0.86rem", color: "#4d4d4d", lineHeight: 1.75 }}>
              By submitting a reservation, you consent to the collection and use of your personal information in accordance with the Data Privacy Act of 2012 (R.A. 10173). Your data is used only for reservation management and resort communications.
            </p>
          </div>
        </div>

        {/* Footer actions */}
        <div className="px-5 sm:px-6 py-4 border-t flex gap-3 flex-shrink-0" style={{ borderColor: "#DCF1F3" }}>
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
