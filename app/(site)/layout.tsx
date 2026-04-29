import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getSettings } from "@/lib/db/settings";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSettings();

  return (
    <div className="bg-bg-primary text-text-primary min-h-screen">
      <Navbar />
      {children}
      <Footer socials={settings.socials} contact={settings.contact} />
    </div>
  );
}
