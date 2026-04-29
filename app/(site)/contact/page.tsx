import { getSettings } from "@/lib/db/settings";
import ContactForm from "@/app/components/ContactForm";
import { Mail, Phone, MapPin, Instagram, Twitter, Facebook } from "lucide-react";

const SubstackIcon = ({ size = 24 }: { size?: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor"
  >
    <path d="M22.534 8.285H1.466V0h21.068v8.285zM1.466 10.88h21.068V24L12 18.21 1.466 24V10.88z" />
  </svg>
);

export const metadata = {
  title: "Contact | Niniola Photography",
  description: "Get in touch with Niniola Photography for bookings and inquiries.",
};

export default async function ContactPage() {
  const settings = await getSettings();
  const { contact, socials } = settings;

  return (
    <main className="pt-32 pb-24 px-6 bg-bg-primary min-h-screen">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24">
          {/* Left Side: Contact Info */}
          <div className="space-y-12">
            <div>
              <p className="text-accent-gold uppercase tracking-[0.2em] text-sm mb-2">
                Get in touch
              </p>
              <h1 className="text-4xl md:text-6xl text-white font-serif mb-6">
                Let's Create Something Beautiful
              </h1>
              <p className="text-text-secondary max-w-md">
                Ready to book a session? Fill out the form and I'll get back to you within 24 hours. I can't wait to hear from you!
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="bg-bg-secondary p-3 rounded-lg border border-white/5 text-accent-gold">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-white font-medium mb-1">Email</p>
                  <a href={`mailto:${contact.email}`} className="text-text-secondary hover:text-accent-gold transition-colors">
                    {contact.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-bg-secondary p-3 rounded-lg border border-white/5 text-accent-gold">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-white font-medium mb-1">Phone</p>
                  <a href={`tel:${contact.phone}`} className="text-text-secondary hover:text-accent-gold transition-colors">
                    {contact.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-bg-secondary p-3 rounded-lg border border-white/5 text-accent-gold">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-white font-medium mb-1">Office</p>
                  <p className="text-text-secondary">
                    {contact.address}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-white/5">
              <p className="text-white font-medium mb-6 uppercase tracking-widest text-xs">Follow My Journey</p>
              <div className="flex items-center gap-6">
                <a href={socials.instagram} target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-accent-gold transition-colors">
                  <Instagram size={24} />
                </a>
                <a href={socials.twitter} target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-accent-gold transition-colors">
                  <Twitter size={24} />
                </a>
                <a href={socials.facebook} target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-accent-gold transition-colors">
                  <Facebook size={24} />
                </a>
                <a href={socials.substack} target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-accent-gold transition-colors">
                  <SubstackIcon size={24} />
                </a>
              </div>
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <div className="bg-bg-secondary p-8 md:p-12 rounded-2xl border border-white/5">
            <ContactForm />
          </div>
        </div>
      </div>
    </main>
  );
}
