"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { name: "Home", path: "/#home", sectionId: "home" },
  { name: "About Me", path: "/#about-me", sectionId: "about-me" },
  { name: "Portfolio", path: "/portfolio" },
  { name: "Frames", path: "/frames" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (!target) return;

    target.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", `/#${sectionId}`);
  };

  const handleSectionNavigation = (path: string, sectionId: string) => {
    setIsOpen(false);

    if (pathname === "/") {
      scrollToSection(sectionId);
      return;
    }

    router.push(path);
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/80 backdrop-blur-md py-4 border-b border-white/10"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-300 mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link href="/#home" className="relative w-40 h-12">
          <Image 
            src="/logo.png" 
            alt="Niniola Photography" 
            fill 
            className="object-contain object-left"
            priority
          />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            item.sectionId ? (
              <button
                key={item.name}
                type="button"
                onClick={() => handleSectionNavigation(item.path, item.sectionId)}
                className="text-xs uppercase tracking-widest text-white hover:text-accent-gold transition-colors"
              >
                {item.name}
              </button>
            ) : (
              <Link
                key={item.name}
                href={item.path}
                className="text-xs uppercase tracking-widest text-white hover:text-accent-gold transition-colors"
              >
                {item.name}
              </Link>
            )
          ))}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/contact"
              className="bg-accent-gold text-text-inverse px-6 py-2 rounded-sm font-bold text-sm tracking-wide hover:bg-accent-hover transition-colors inline-flex"
            >
              Book Now
            </Link>
          </motion.div>
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
            <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="absolute top-full left-0 w-full bg-bg-secondary border-t border-white/10 overflow-hidden md:hidden"
            >
                <div className="p-6 flex flex-col gap-4">
                {navItems.map((item) => (
                    item.sectionId ? (
                      <button
                        key={item.name}
                        type="button"
                        className="text-white uppercase tracking-widest text-xs hover:text-accent-gold text-left"
                        onClick={() => handleSectionNavigation(item.path, item.sectionId)}
                      >
                        {item.name}
                      </button>
                    ) : (
                      <Link
                        key={item.name}
                        href={item.path}
                        className="text-white uppercase tracking-widest text-xs hover:text-accent-gold"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                    )
                ))}
                <motion.div whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/contact"
                    className="bg-accent-gold text-text-inverse px-6 py-3 rounded-sm font-bold text-sm tracking-wide w-full inline-flex justify-center"
                    onClick={() => setIsOpen(false)}
                  >
                    Book Now
                  </Link>
                </motion.div>
                </div>
            </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
