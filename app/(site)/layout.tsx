import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-bg-primary text-text-primary min-h-screen">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
