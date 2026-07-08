import "../styles/fonts.css";
import { Navbar } from "./components/Navbar";
import { HeroCarousel } from "./components/HeroCarousel";
import { AmenitiesCarousel } from "./components/AmenitiesCarousel";
import { VillaShowcase } from "./components/VillaShowcase";
import { HowToBook } from "./components/HowToBook";
import { AboutSection } from "./components/AboutSection";
import { ReviewsSection } from "./components/ReviewsSection";
import { GallerySection } from "./components/GallerySection";
import { LocationSection } from "./components/LocationSection";
import { BookingCTA } from "./components/BookingCTA";
import { Footer } from "./components/Footer";
import { LiveChat } from "./components/LiveChat";
import { SocialFloat } from "./components/SocialFloat";

export default function App() {
  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", backgroundColor: "#fdf6ec", overflowX: "hidden" }}>
      <Navbar />
      <HeroCarousel />
      <AmenitiesCarousel />
      <VillaShowcase />
      <HowToBook />
      <AboutSection />
      <ReviewsSection />
      <GallerySection />
      <LocationSection />
      <BookingCTA />
      <Footer />
      {/* Floating widgets */}
      <SocialFloat />
      <LiveChat />
    </div>
  );
}
