import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getSettings } from "@/lib/db/settings";
import { buildBusinessSchema, buildWebsiteSchema } from "@/lib/seo";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSettings();
  const structuredData = [buildWebsiteSchema(), buildBusinessSchema(settings)];

  return (
    <div className="bg-bg-primary text-text-primary min-h-screen">
      {structuredData.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <Navbar />
      {children}
      <Footer socials={settings.socials} contact={settings.contact} />
    </div>
  );
}
