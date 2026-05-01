import Hero from "../components/Hero";
import AboutSection from "../components/AboutSection";
import ServiceCards from "../components/ServiceCards";
import PortfolioGrid from "../components/PortfolioGrid";
import ShopSection from "../components/ShopSection";
import Testimonials from "../components/Testimonials";
import BookingSection from "../components/BookingSection";
import { getProjects } from "@/lib/db/projects";
import { getServices } from "@/lib/db/services";
import { getTestimonials } from "@/lib/db/testimonials";
import { getProducts } from "@/lib/db/products";
import { getSettings } from "@/lib/db/settings";
import { absoluteUrl, buildBreadcrumbSchema, buildMetadata, seoConfig } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Storytelling Photographer in Benin City, Nigeria",
  description:
    "Book Niniola Photography for storytelling portraits, editorial work, events, and fine art photography in Benin City, across Nigeria, and for international commissions.",
  path: "/",
  keywords: [
    "Benin City portrait photographer",
    "Benin City event photographer",
    "editorial photographer Benin City",
    "photographer available across Nigeria",
  ],
});

export default async function Home() {
  const [projects, services, testimonials, products, settings] = await Promise.all([
    getProjects(),
    getServices(),
    getTestimonials(),
    getProducts({ limit: 8 }),
    getSettings(),
  ]);
  const pageSchema = [
    buildBreadcrumbSchema([{ name: "Home", url: absoluteUrl("/") }]),
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Photography Services",
      serviceType: [
        "Portrait Photography",
        "Editorial Photography",
        "Event Photography",
        "Fine Art Photography",
      ],
      provider: {
        "@type": "Person",
        name: seoConfig.creatorName,
      },
      areaServed: seoConfig.serviceAreas,
      url: absoluteUrl("/"),
      description:
        "Storytelling photography services based in Benin City, Nigeria and available for commissions locally, nationwide, and internationally.",
    },
  ];

  return (
    <main className="min-h-screen bg-bg-primary text-text-primary selection:bg-accent-gold selection:text-black">
      {pageSchema.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <Hero />
      <AboutSection stats={settings.stats} />
      <ServiceCards services={services} />
      <PortfolioGrid projects={projects} />
      <ShopSection products={products} />
      <Testimonials testimonials={testimonials} />
      <BookingSection />
    </main>
  );
}
