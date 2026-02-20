"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/80 backdrop-blur-md py-4 border-b border-white/10"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="relative w-40 h-12">
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
          {["Home", "About Me", "Portfolio", "Frame Shop", "Get in touch"].map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase().replace(" ", "-")}`}
              className="text-xs uppercase tracking-widest text-white hover:text-accent-gold transition-colors"
            >
              {item}
            </Link>
          ))}
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-accent-gold text-text-inverse px-6 py-2 rounded-sm font-bold text-sm tracking-wide hover:bg-accent-hover transition-colors"
          >
            Book Now
          </motion.button>
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
                {["Home", "About Me", "Portfolio", "Frame Shop", "Get in touch"].map((item) => (
                    <Link
                    key={item}
                    href={`#${item.toLowerCase().replace(" ", "-")}`}
                    className="text-white uppercase tracking-widest text-xs hover:text-accent-gold"
                    onClick={() => setIsOpen(false)}
                    >
                    {item}
                    </Link>
                ))}
                <motion.button 
                    whileTap={{ scale: 0.95 }}
                    className="bg-accent-gold text-text-inverse px-6 py-3 rounded-sm font-bold text-sm tracking-wide w-full"
                >
                    Book Now
                </motion.button>
                </div>
            </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
