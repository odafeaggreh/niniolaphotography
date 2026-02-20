"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ShoppingBag, XIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Reveal } from "./ui/Animations";
import { SHOP_CONTENT, products } from "@/app/constants/shop";
import { Product } from "@/app/types";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

function ShopSectionContent() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const productId = searchParams.get("product");
    if (productId) {
      const product = products.find(p => p.id === parseInt(productId));
      if (product) {
        setSelectedProduct(product);
        // Scroll to shop section after a small delay to ensure rendering
        setTimeout(() => {
          document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [searchParams]);

  const handleOpenProduct = (product: Product) => {
    setSelectedProduct(product);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("product", product.id.toString());
      window.history.pushState({}, "", url.toString());
    }
  };

  const handleCloseProduct = () => {
    setSelectedProduct(null);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.delete("product");
      window.history.pushState({}, "", url.toString());
    }
  };

  const handleInquiry = (product: Product) => {
    if (typeof window === "undefined") return;
    
    const url = new URL(window.location.origin + window.location.pathname);
    url.searchParams.set("product", product.id.toString());
    url.hash = "shop";
    const directLink = url.toString();

    const message = SHOP_CONTENT.contact.messageTemplate
      .replaceAll("{title}", product.title)
      .replaceAll("{price}", product.price)
      .replaceAll("{details}", product.details || "N/A")
      .replaceAll("{edition}", product.edition || "N/A")
      .replaceAll("{link}", directLink);

    const phone = SHOP_CONTENT.contact.whatsapp.replace(/\D/g, "");
    const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <>
      <div className="max-w-[1200px] mx-auto">
        <Reveal>
            <div className="text-center mb-16">
            <p className="text-accent-gold uppercase tracking-[0.2em] text-sm mb-2">
                {SHOP_CONTENT.badge}
            </p>
            <h2 className="text-3xl md:text-5xl text-white font-serif mb-4">
                {SHOP_CONTENT.title}
            </h2>
            <p className="text-text-secondary max-w-xl mx-auto">
                {SHOP_CONTENT.description}
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
                onClick={() => handleOpenProduct(product)}
            >
              <div className="relative overflow-hidden rounded-md mb-4 aspect-[4/5] bg-bg-tertiary">
                <motion.div 
                    className="w-full h-full bg-cover bg-center"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                    style={{ backgroundImage: `url('${product.image}')` }}
                ></motion.div>
              </div>
              <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-white font-medium text-lg mb-1">{product.title}</h3>
                    <p className="text-text-muted text-sm">{product.details || "Premium Art Framed"}</p>
                </div>
                <span className="text-accent-gold font-bold">{product.price}</span>
              </div>
              <motion.button 
                whileTap={{ scale: 0.98 }}
                className="w-full bg-white/5 text-white py-3 rounded-xl font-medium text-sm hover:bg-accent-gold hover:text-black transition-all border border-white/10 backdrop-blur-sm"
              >
                View Details
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Product Information Dialog */}
      <Dialog 
        open={!!selectedProduct} 
        onOpenChange={(open) => !open && handleCloseProduct()}
      >
        <DialogContent 
          showCloseButton={false}
          className="sm:max-w-5xl !max-w-5xl w-[95vw] h-[90vh] md:h-[min(800px,85vh)] bg-bg-primary border-white/10 p-0 overflow-hidden outline-none shadow-[0_0_80px_-20px_rgba(0,0,0,0.8)] rounded-2xl md:rounded-3xl border gap-0"
        >
          {selectedProduct && (
            <div className="relative flex flex-col md:flex-row w-full h-full overflow-hidden">
              {/* Close Button - Pinned to Modal Root for Correct Mobile Placement */}
              <DialogClose className="absolute top-4 right-4 z-50 text-white/60 hover:text-white transition-all p-2.5 bg-black/40 md:bg-transparent backdrop-blur-xl md:backdrop-blur-none rounded-full border border-white/10 md:border-0 hover:bg-white/10 group">
                <XIcon size={20} className="transition-transform group-hover:rotate-90" />
                <span className="sr-only">Close</span>
              </DialogClose>

              {/* Left Side: Main Image Hero */}
              <div className="w-full md:w-1/2 lg:w-3/5 bg-bg-tertiary relative group overflow-hidden shrink-0 aspect-[4/3] md:aspect-auto border-b md:border-b-0 md:border-r border-white/5">
                <motion.img 
                  initial={{ scale: 1.05, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  src={selectedProduct.image} 
                  alt={selectedProduct.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-60 md:opacity-0 md:group-hover:opacity-60 transition-opacity duration-700" />
                
                {/* Mobile Floating Category */}
                {(selectedProduct.category || selectedProduct.edition) && (
                  <div className="absolute bottom-6 left-6 md:hidden z-10 flex items-center gap-3">
                    {selectedProduct.category && (
                      <span className="bg-white/10 backdrop-blur-md text-white px-3 py-1 rounded-full text-[9px] uppercase tracking-widest font-medium border border-white/10">
                        {selectedProduct.category}
                      </span>
                    )}
                    {selectedProduct.category && selectedProduct.edition && (
                      <div className="h-1 w-1 rounded-full bg-accent-gold" />
                    )}
                    {selectedProduct.edition && (
                      <span className="text-white text-xs font-serif italic">{selectedProduct.edition}</span>
                    )}
                  </div>
                )}
              </div>

              {/* Right Side: Information & Inquire */}
              <div className="flex-1 flex flex-col bg-bg-primary relative overflow-hidden">
                {/* Inner Scroll Container */}
                <div className="flex-1 overflow-y-auto custom-scrollbar px-6 py-8 sm:px-10 md:px-12 md:py-14">
                  <div className="max-w-full space-y-10">
                    {/* Header */}
                    <div className="space-y-5">
                      <div className="flex items-center gap-3">
                        <span className="text-accent-gold text-[10px] uppercase tracking-[0.4em] font-bold">
                          {selectedProduct.series || SHOP_CONTENT.dialog.seriesTitleSnippet}
                        </span>
                        <div className="flex-1 h-px bg-white/5" />
                      </div>
                      
                      <DialogHeader className="p-0 border-none items-start text-left">
                        <DialogTitle className="text-3xl sm:text-4xl md:text-3xl lg:text-5xl text-white font-serif leading-[1.1] tracking-tight">
                            {selectedProduct.title}
                        </DialogTitle>
                      </DialogHeader>

                      <div className="pt-2">
                        <p className="text-2xl text-white font-light tracking-tight">{selectedProduct.price}</p>
                        <p className="text-text-muted text-[8px] uppercase tracking-[0.3em] font-medium mt-1">{SHOP_CONTENT.dialog.shippingInfo}</p>
                      </div>
                    </div>

                    {/* Minimalist Specs Line */}
                    {selectedProduct.specs && selectedProduct.specs.length > 0 && (
                      <div className="flex flex-wrap gap-x-8 gap-y-4 py-6 border-y border-white/5">
                        {selectedProduct.specs.map((s, i) => (
                          <div key={i} className="space-y-1">
                            <p className="text-[11px] text-white/90 font-medium">{s.value}</p>
                            <p className="text-accent-gold/40 text-[8px] uppercase tracking-widest font-bold">{s.label}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Narrative Description */}
                    <p className="text-text-secondary leading-relaxed text-sm md:text-[15px] font-light italic opacity-85">
                      {selectedProduct.description}
                    </p>

                    {/* Macro Gallery */}
                    {selectedProduct.images && selectedProduct.images.length > 0 && (
                      <div className="space-y-5">
                        <h4 className="text-white/20 text-[9px] uppercase tracking-[0.5em] font-black">
                          {SHOP_CONTENT.dialog.materialDetailTitle}
                        </h4>
                        <div className="grid grid-cols-3 gap-3">
                          {selectedProduct.images.map((img, idx) => (
                            <div 
                              key={idx} 
                              className="aspect-square rounded-xl overflow-hidden bg-bg-tertiary border border-white/10 cursor-zoom-in group/img"
                            >
                              <img 
                                src={img} 
                                alt="Detail" 
                                className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Streamlined Action Bar */}
                <div className="px-6 py-6 md:px-10 md:py-8 bg-bg-secondary/30 backdrop-blur-2xl border-t border-white/10 shrink-0">
                  <motion.button 
                    onClick={() => selectedProduct && handleInquiry(selectedProduct)}
                    whileHover={{ scale: 1.01, backgroundColor: "#E0C8A0" }}
                    whileTap={{ scale: 0.99 }}
                    className="w-full bg-accent-gold text-black py-4 rounded-xl font-black tracking-[0.25em] uppercase transition-all flex items-center justify-center gap-3 text-[10px] shadow-[0_15px_30px_-10px_rgba(198,168,124,0.3)] ring-0 outline-none hover:shadow-accent-gold/20"
                  >
                    <ShoppingBag size={14} strokeWidth={3} />
                    {SHOP_CONTENT.dialog.actionButton}
                    <span className="opacity-40">/</span>
                    <span className="font-serif italic lowercase tracking-normal text-xs font-normal">{SHOP_CONTENT.dialog.actionButtonSub}</span>
                  </motion.button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default function ShopSection() {
  return (
    <section id="shop" className="py-30 bg-bg-secondary px-6">
      <Suspense fallback={
        <div className="max-w-[1200px] mx-auto text-center py-20">
          <p className="text-text-muted animate-pulse">Loading collection...</p>
        </div>
      }>
        <ShopSectionContent />
      </Suspense>
    </section>
  );
}
