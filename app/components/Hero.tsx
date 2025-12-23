"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative w-full h-[100dvh] flex items-center justify-center overflow-hidden pt-28 pb-12">
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
            className="absolute inset-0 bg-black/40" 
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
            className="text-text-secondary max-w-xl text-[2vh] md:text-[2.2vh] mb-[4vh] md:mb-[5vh] leading-relaxed"
        >
          Professional photography services for those who appreciate the fine art of storytelling through the lens. Available for weddings, portraits, and commercial work.
        </motion.p>
        
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4"
        >
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-transparent border border-white text-white px-[4vh] py-[1.5vh] rounded-sm font-bold tracking-wide hover:bg-white hover:text-black transition-colors w-max text-[1.8vh]"
          >
            See works
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
