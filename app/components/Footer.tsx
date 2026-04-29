import { Instagram, Twitter, Facebook, Linkedin } from "lucide-react";
import Image from "next/image";

interface FooterProps {
  socials?: {
    instagram: string;
    twitter: string;
    facebook: string;
    linkedin: string;
  };
}

export default function Footer({ socials }: FooterProps) {
  return (
    <footer className="bg-bg-primary py-12 px-6 border-t border-white/5">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-center md:text-left">
            <div className="relative w-40 h-10 mb-4 mx-auto md:mx-0">
                <Image 
                    src="/logo.png" 
                    alt="Niniola Photography" 
                    fill 
                    className="object-contain object-center md:object-left"
                />
            </div>
            <p className="text-text-muted text-sm">
                © {new Date().getFullYear()} Niniola Photography. All rights reserved.
            </p>
        </div>

        <div className="flex items-center gap-6">
            <a href={socials?.instagram || "#"} target="_blank" rel="noopener noreferrer" className="text-white hover:text-accent-gold transition-colors"><Instagram size={20} /></a>
            <a href={socials?.twitter || "#"} target="_blank" rel="noopener noreferrer" className="text-white hover:text-accent-gold transition-colors"><Twitter size={20} /></a>
            <a href={socials?.facebook || "#"} target="_blank" rel="noopener noreferrer" className="text-white hover:text-accent-gold transition-colors"><Facebook size={20} /></a>
            <a href={socials?.linkedin || "#"} target="_blank" rel="noopener noreferrer" className="text-white hover:text-accent-gold transition-colors"><Linkedin size={20} /></a>
        </div>
      </div>
    </footer>
  );
}
