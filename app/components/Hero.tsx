"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative w-full h-dvh flex items-center justify-center overflow-hidden pt-28 pb-12">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero.png"
          alt="Cinematic photography background"
          fill
          className="object-cover"
          priority
        />
        <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 1.5 }}
            className="absolute inset-0 bg-black/20" 
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1200px] px-6 text-left w-full flex flex-col justify-center h-full">
        <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="font-serif text-[5vh] font-medium sm:text-[6vh] md:text-[7vh] lg:text-[8vh] text-white leading-[1.1] mb-[3vh] max-w-4xl"
        >
          Capturing Moments, Crafting Stories. Welcome To My Photography Portfolio.
        </motion.h1>
        
        <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="text-text-primary max-w-xl text-[2vh] md:text-[2.2vh] mb-[4vh] md:mb-[5vh] leading-relaxed"
        >
          Professional photography services for those who appreciate the fine art of storytelling through the lens. Available for weddings, portraits, and commercial work.
        </motion.p>
        
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="flex flex-row items-center gap-8"
        >
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-accent-gold text-text-inverse px-6 py-3 rounded-sm font-bold text-sm tracking-wide hover:bg-white hover:text-black transition-all"
          >
            Get in touch
          </motion.button>
          
          <motion.button 
            whileHover={{ x: 5 }}
            className="flex items-center gap-2 text-white hover:text-accent-gold transition-colors font-bold tracking-widest text-xs uppercase group"
          >
            Portfolio <ArrowRight size={16} className="text-accent-gold group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
