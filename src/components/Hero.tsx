import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowDown } from "lucide-react";

import { Link } from "react-router-dom";

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section ref={containerRef} className="relative min-h-[100svh] w-full overflow-hidden flex flex-col">
      {/* Background Image with Parallax */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0 z-0"
      >
        <img
          src="https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&q=80&w=2400"
          alt="Luxury Peony"
          className="w-full h-[120%] object-cover brightness-90 saturate-[0.8]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-luxury-beige" />
      </motion.div>

      {/* Content Overlay */}
      <div className="relative z-10 flex-1 flex flex-col md:flex-row pt-20 md:pt-24 lg:pt-28">
        {/* Left/Top Content Box */}
        <div className="w-full md:w-[60%] lg:w-[45%] p-6 xs:p-8 sm:p-12 md:p-16 flex flex-col justify-center bg-luxury-beige/60 backdrop-blur-md md:bg-luxury-beige/10 md:backdrop-blur-[2px] border-b md:border-b-0 md:border-r border-luxury-border/30">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 2.5 }}
            className="mb-4 md:mb-8 text-[10px] md:text-[12px] uppercase tracking-[0.3em] text-luxury-gold font-bold"
          >
            Haute Fleuristerie Française
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 2.8 }}
            className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif leading-[1.1] md:leading-[0.9] text-luxury-ink md:text-white drop-shadow-sm mb-6 md:mb-8"
          >
            Poésie <br /> 
            <span className="italic font-light pl-4 xs:pl-8 md:pl-12">en Fleurs</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 3.2 }}
            className="text-sm xs:text-base sm:text-lg leading-relaxed text-luxury-ink/80 md:text-white drop-shadow-sm max-w-sm mb-8 md:mb-12 font-light italic"
          >
            Découvrez une nouvelle ère du luxe botanique. Chaque composition est un chef-d'œuvre curaté, façonné à la main.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 3.5 }}
            className="flex flex-col xs:flex-row items-stretch xs:items-center gap-4 sm:gap-10"
          >
            <Link 
              to="/collection"
              className="px-8 sm:px-10 py-4 sm:py-5 bg-luxury-ink text-white text-[11px] sm:text-[12px] uppercase tracking-[0.25em] font-bold hover:bg-luxury-gold transition-all duration-500 shadow-xl shadow-black/20 text-center"
            >
              Découvrir
            </Link>
            <Link 
              to="/histoire"
              className="text-[11px] sm:text-[12px] uppercase tracking-[0.25em] font-bold text-luxury-ink md:text-white border-b-2 border-luxury-ink md:border-white pb-1 hover:text-luxury-gold hover:border-luxury-gold transition-all text-center"
            >
              L'Histoire
            </Link>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4 }}
            className="hidden sm:block mt-8 md:mt-auto pt-8 md:pt-12"
          >
            <p className="italic text-lg md:text-xl font-serif text-luxury-ink md:text-white/80 font-light leading-snug">"Le Dior de la fleuristerie. Tout simplement époustouflant."</p>
            <p className="text-[10px] uppercase tracking-widest mt-3 text-luxury-muted md:text-white/50 font-bold">— Vogue Living</p>
          </motion.div>
        </div>
        
        {/* Right/Bottom Space for Visuals */}
        <div className="flex-1 min-h-[150px] md:min-h-0 pointer-events-none"></div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center gap-2"
      >
        <span className="text-[9px] uppercase tracking-[0.4em]">Scroll</span>
        <motion.div
           animate={{ y: [0, 8, 0] }}
           transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={14} />
        </motion.div>
      </motion.div>
    </section>
  );
}
