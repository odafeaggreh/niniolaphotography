"use client";

import { Camera, Image as ImageIcon, Video, User, type LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Reveal } from "./ui/Animations";
import type { ServiceData } from "@/app/types";

/** Map of iconName strings (stored in Firestore) → Lucide components */
const ICON_MAP: Record<string, LucideIcon> = {
  Camera,
  Image: ImageIcon,
  Video,
  User,
};

interface Props {
  services: ServiceData[];
}

export default function ServiceCards({ services }: Props) {
  return (
    <section id="services" className="py-[120px] bg-bg-primary px-6">
      <div className="max-w-[1200px] mx-auto">
        <Reveal>
          <div className="mb-16">
            <p className="text-accent-gold uppercase tracking-[0.2em] text-sm mb-2">
              Services
            </p>
            <h2 className="text-3xl md:text-5xl text-white font-serif mb-4">
              Take A Look At Our Offers <br /> To Suit Your Needs
            </h2>
            <p className="text-text-secondary max-w-2xl">
              We provide a wide range of photography services tailored to your specific requirements.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = ICON_MAP[service.iconName] ?? Camera;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="bg-bg-secondary p-8 rounded-md border border-white/5 hover:border-accent-gold/50 transition-colors group cursor-default"
              >
                <div className="w-12 h-12 bg-bg-tertiary rounded-full flex items-center justify-center mb-6 group-hover:bg-accent-gold transition-colors duration-300">
                  <Icon className="text-accent-gold group-hover:text-black w-6 h-6 transition-colors duration-300" />
                </div>
                <h3 className="text-xl text-white font-bold mb-3">{service.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed mb-6">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

