"use client";

import { ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import { Reveal } from "./ui/Animations";

const products = [
  { id: 1, title: "Alpine Mist Frame", price: "$120.00", image: "https://placehold.co/400x500/1a1a1a/FFF?text=Frame+1" },
  { id: 2, title: "Urban Concrete", price: "$95.00", image: "https://placehold.co/400x500/1a1a1a/FFF?text=Frame+2" },
  { id: 3, title: "Desert Gold", price: "$140.00", image: "https://placehold.co/400x500/1a1a1a/FFF?text=Frame+3" },
  { id: 4, title: "Ocean Blue", price: "$110.00", image: "https://placehold.co/400x500/1a1a1a/FFF?text=Frame+4" },
];

export default function ShopSection() {
  return (
    <section id="shop" className="py-[120px] bg-bg-secondary px-6">
      <div className="max-w-[1200px] mx-auto">
        <Reveal>
            <div className="text-center mb-16">
            <p className="text-accent-gold uppercase tracking-[0.2em] text-sm mb-2">
                Shop
            </p>
            <h2 className="text-3xl md:text-5xl text-white font-serif mb-4">
                Framed Prints & Art
            </h2>
            <p className="text-text-secondary max-w-xl mx-auto">
                Bring the beauty of the world into your home with our premium framed prints.
            </p>
            </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, i) => (
            <motion.div 
                key={product.id} 
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="relative overflow-hidden rounded-md mb-4 aspect-4/5 bg-bg-tertiary">
                <motion.div 
                    className="w-full h-full bg-cover bg-center"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                    style={{ backgroundImage: `url('${product.image}')` }}
                ></motion.div>
                <div className="absolute bottom-4 right-4 translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <motion.button 
                        whileTap={{ scale: 0.9 }}
                        className="bg-white text-black p-3 rounded-full shadow-lg hover:bg-accent-gold transition-colors"
                    >
                        <ShoppingBag size={20} />
                    </motion.button>
                </div>
              </div>
              <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-white font-medium text-lg mb-1">{product.title}</h3>
                    <p className="text-text-muted text-sm">Walnut Frame • 18x24"</p>
                </div>
                <span className="text-accent-gold font-bold">{product.price}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
