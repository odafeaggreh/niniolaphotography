"use client";

import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { Reveal } from "./ui/Animations";
import type { Project } from "@/app/types";
import Link from "next/link";

interface Props {
  projects: Project[];
  title?: string;
  subtitle?: string;
  showHeader?: boolean;
  showViewAll?: boolean;
}

export default function PortfolioGrid({ 
  projects, 
  title = "Our Featured Portfolio Projects",
  subtitle = "Portfolio",
  showHeader = true,
  showViewAll = true
}: Props) {
  return (
    <section id="works" className="py-20 bg-bg-primary px-6">
      <div className="max-w-300 mx-auto">
        {showHeader && (
          <Reveal>
            <div className="flex flex-col md:flex-row justify-between items-end mb-16">
              <div>
                <p className="text-accent-gold uppercase tracking-[0.2em] text-sm mb-2">
                  {subtitle}
                </p>
                <h2 className="text-3xl md:text-5xl text-white font-serif">
                  {title}
                </h2>
              </div>
              {showViewAll && (
                <motion.a href="/portfolio"
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className="hidden md:flex items-center gap-2 text-white hover:text-accent-gold transition-colors pb-2 border-b border-transparent hover:border-accent-gold"
                >
                  View All Works <ArrowUpRight size={18} />
                </motion.a>
              )}
            </div>
          </Reveal>
        )}

        {/* Masonry-ish Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {projects.map((project, i) => {
            const primaryImage = project.images?.find(img => img.isPrimary) || project.images?.[0];
            
            // Automatic height calculation for masonry layout
            const heights = ["h-[400px]", "h-[500px]", "h-[350px]", "h-[600px]", "h-[450px]"];
            const heightClass = heights[i % heights.length];
            
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`relative group overflow-hidden rounded-md break-inside-avoid ${heightClass}`}
              >
                <Link href={`/portfolio/${project.id}`} className="block h-full w-full">
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity z-10" />

                  <motion.div
                    className="w-full h-full bg-cover bg-center"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.7 }}
                    style={{ backgroundImage: `url('${primaryImage?.url || "/placeholder-image.jpg"}')` }}
                  />

                  {/* Overlay Content */}
                  <div className="absolute bottom-0 left-0 w-full p-6 z-20 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-accent-gold text-xs uppercase tracking-widest mb-1 opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                      {project.category}
                    </p>
                    <h3 className="text-white text-xl font-serif">{project.title}</h3>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {showHeader && showViewAll && (
          <div className="mt-12 flex justify-center md:hidden">
            <Link href="/portfolio" className="flex items-center gap-2 text-white hover:text-accent-gold transition-colors pb-1 border-b border-white hover:border-accent-gold">
              View All Works <ArrowUpRight size={18} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

