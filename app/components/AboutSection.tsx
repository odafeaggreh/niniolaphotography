"use client";

import Image from "next/image";
import { Briefcase, ThumbsUp, Camera } from "lucide-react";
import { motion } from "framer-motion";
import { Reveal } from "./ui/Animations";

export default function AboutSection() {
  return (
    <section id="about-me" className="py-[120px] bg-bg-primary px-6">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
        {/* Left Side: Images */}
        {/* Left Side: Images */}
        <div className="relative w-full hidden md:grid grid-cols-2 gap-4 h-full items-center">
            {/* Left Image (Offset Down) */}
           <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative w-full aspect-3/4 rounded-2xl overflow-hidden translate-y-12"
            >
                 <Image 
                    src="/hero2.jpg" 
                    alt="Photographer Portrait" 
                    fill 
                    className="object-cover"
                 />
           </motion.div>
          
          {/* Right Image (Offset Up) */}
          <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative w-full aspect-3/4 rounded-2xl overflow-hidden -translate-y-12"
            >
                  <Image 
                    src="/hero2.jpg" 
                    alt="Photographer at work" 
                    fill 
                    className="object-cover"
                 />
          </motion.div>
        </div>

        {/* Mobile Image (Simple Stack) */}
        <div className="block md:hidden relative h-[400px] w-full rounded-2xl overflow-hidden mb-8">
             <Image 
                src="/hero2.jpg" 
                alt="Photographer Portrait" 
                fill 
                className="object-cover"
             />
        </div>

        {/* Right Side: Content */}
        <div>
          <Reveal>
            <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-accent-gold"></span>
                <span className="text-text-secondary uppercase tracking-widest text-xs font-bold">About Me</span>
            </div>
          
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6">
                Through The Lens Exploring My World Of Photography
            </h2>
            
            <p className="text-text-secondary text-base md:text-lg leading-relaxed mb-10">
                Tristique pharetra nunc sed amet viverra non non libero. Eget turpis ac pretium amet dapibus nullam at bibendum. Facilisis porttitor quam fames ac hendrerit pellentesque vestibulum porttitor.
            </p>
          </Reveal>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
            {[
                { icon: Briefcase, count: "16+", label: "Years Experience" },
                { icon: ThumbsUp, count: "386+", label: "Happy Clients" },
                { icon: Camera, count: "806+", label: "Photo Shoots" },
            ].map((stat, idx) => (
                <motion.div 
                    key={idx} 
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="bg-bg-secondary p-6 rounded-xl border border-white/5 flex flex-col items-center text-center sm:block sm:text-left hover:border-accent-gold/30 transition-colors"
                >
                    <stat.icon className="text-accent-gold mb-4 w-6 h-6" />
                    <h3 className="text-white text-2xl font-bold mb-1">{stat.count}</h3>
                    <p className="text-text-muted text-xs uppercase tracking-wider">{stat.label}</p>
                </motion.div>
            ))}
          </div>

          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-transparent border border-white text-white px-8 py-3 rounded-sm font-bold tracking-wide hover:bg-white hover:text-black transition-colors w-max"
          >
            More About Us
          </motion.button>
        </div>
      </div>
    </section>
  );
}
