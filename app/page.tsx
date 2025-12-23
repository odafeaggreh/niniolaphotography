import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AboutSection from "./components/AboutSection";
import ServiceCards from "./components/ServiceCards";
import PortfolioGrid from "./components/PortfolioGrid";
import ShopSection from "./components/ShopSection";
import Testimonials from "./components/Testimonials";
import BookingSection from "./components/BookingSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-bg-primary text-text-primary selection:bg-accent-gold selection:text-black">
      <Navbar />
      <Hero />
      <AboutSection />
      <ServiceCards />
      <PortfolioGrid />
      <ShopSection />
      <Testimonials />
      <BookingSection />
      <Footer />
    </main>
  );
}
