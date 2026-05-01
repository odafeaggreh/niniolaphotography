"use client";

import Image from "next/image";
import { Briefcase, ThumbsUp, Camera } from "lucide-react";
import { motion } from "framer-motion";

import { Reveal } from "./ui/Animations";

interface AboutSectionProps {
  stats?: {
    yearsOfExperience: string;
    clientsServed: string;
    photosTaken: string;
  };
}

export default function AboutSection({ stats }: AboutSectionProps) {
  const displayStats = [
    { icon: Briefcase, count: stats?.yearsOfExperience || "16+", label: "Years Experience" },
    { icon: ThumbsUp, count: stats?.clientsServed || "386+", label: "Happy Clients" },
    { icon: Camera, count: stats?.photosTaken || "806+", label: "Photo Shoots" },
  ];

  return (
    <section id="about-me" className="pt-30 bg-bg-primary px-6 scroll-mt-28">
      <div className="max-w-300 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
        <div className="relative w-full hidden md:grid grid-cols-2 gap-4 h-full items-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative w-full aspect-3/4 rounded-2xl overflow-hidden translate-y-12"
          >
            <Image
              src="/ninola_2.jpg"
              alt="Niniola Blessing Samuel - conceptual and storytelling photographer in Benin City, Nigeria"
              fill
              className="object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full aspect-3/4 rounded-2xl overflow-hidden -translate-y-12"
          >
            <Image
              src="/ninola_1.jpg"
              alt="Niniola Photography - fine art portrait session in Benin City, Nigeria"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>

        <div className="block md:hidden relative h-100 w-full rounded-2xl overflow-hidden mb-8">
          <Image
            src="/ninola_1.jpg"
            alt="Niniola Photography - fine art portrait session in Benin City, Nigeria"
            fill
            className="object-cover"
          />
        </div>

        <div>
          <Reveal>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-accent-gold"></span>
              <span className="text-text-secondary uppercase tracking-widest text-xs font-bold">
                About Me
              </span>
            </div>

            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6">
              Nigerian Fine Art Photographer,
              <br />
              Storytelling Through the Lens
            </h2>

            <p className="text-text-secondary text-base md:text-lg leading-relaxed mb-10">
              I&apos;m Niniola Blessing Samuel, a conceptual and fine art photographer based in
              Benin City, Nigeria. Photography is my solace, and storytelling is the language I
              speak through it. With over a decade of professional experience, I create portraits,
              editorial images, street photography, and conceptual series for clients in Edo State,
              across Nigeria, and around the world.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
            {displayStats.map((stat, idx) => (
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
        </div>
      </div>
    </section>
  );
}
