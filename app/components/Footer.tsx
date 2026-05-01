import { Instagram, Twitter, Facebook } from "lucide-react";
import Image from "next/image";

interface FooterProps {
  socials?: {
    instagram: string;
    twitter: string;
    facebook: string;
    substack: string;
  };
  contact?: {
    email: string;
    phone: string;
    address: string;
  };
}

const SubstackIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.534 8.285H1.466V0h21.068v8.285zM1.466 10.88h21.068V24L12 18.21 1.466 24V10.88z" />
  </svg>
);

export default function Footer({ socials, contact }: FooterProps) {
  return (
    <footer className="bg-bg-primary py-12 px-6 border-t border-white/5">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="relative w-40 h-10 mb-4">
            <Image
              src="/logo.png"
              alt="Niniola Photography"
              fill
              className="object-contain object-center md:object-left"
            />
          </div>
          <p className="text-text-muted text-sm">
            Copyright {new Date().getFullYear()} Niniola Photography. All rights reserved.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
          <div className="flex flex-col items-center md:items-start gap-1">
            <p className="text-accent-gold text-xs uppercase tracking-widest font-bold mb-1">
              Contact
            </p>
            <a
              href={`mailto:${contact?.email}`}
              className="text-white/70 hover:text-white text-sm transition-colors"
            >
              {contact?.email}
            </a>
            <a
              href={`tel:${contact?.phone}`}
              className="text-white/70 hover:text-white text-sm transition-colors"
            >
              {contact?.phone}
            </a>
            <p className="text-white/50 text-sm">{contact?.address || "Benin City, Edo State, Nigeria"}</p>
            <p className="text-white/50 text-xs uppercase tracking-wider">
              Available across Nigeria and worldwide
            </p>
          </div>

          <div className="flex items-center gap-6">
            <a
              href={socials?.instagram || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-accent-gold transition-colors"
            >
              <Instagram size={20} />
            </a>
            <a
              href={socials?.twitter || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-accent-gold transition-colors"
            >
              <Twitter size={20} />
            </a>
            <a
              href={socials?.facebook || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-accent-gold transition-colors"
            >
              <Facebook size={20} />
            </a>
            <a
              href={socials?.substack || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-accent-gold transition-colors"
            >
              <SubstackIcon size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
