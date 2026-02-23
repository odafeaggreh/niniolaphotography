import Hero from "./components/Hero";
import AboutSection from "./components/AboutSection";
import ServiceCards from "./components/ServiceCards";
import PortfolioGrid from "./components/PortfolioGrid";
import ShopSection from "./components/ShopSection";
import Testimonials from "./components/Testimonials";
import BookingSection from "./components/BookingSection";
import { getProjects } from "@/lib/db/projects";
import { getServices } from "@/lib/db/services";
import { getTestimonials } from "@/lib/db/testimonials";
import { getProducts } from "@/lib/db/products";

export default async function Home() {
  const [projects, services, testimonials, products] = await Promise.all([
    getProjects(),
    getServices(),
    getTestimonials(),
    getProducts(),
  ]);

  return (
    <main className="min-h-screen bg-bg-primary text-text-primary selection:bg-accent-gold selection:text-black">
      
      <Hero />
      <AboutSection />
      <ServiceCards services={services} />
      <PortfolioGrid projects={projects} />
      <ShopSection products={products} />
      <Testimonials testimonials={testimonials} />
      <BookingSection />
    </main>
  );
}

