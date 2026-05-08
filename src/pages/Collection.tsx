import Collections from "../components/Collections";
import { motion } from "motion/react";

export default function Collection() {
  return (
    <>
      <section className="relative h-[40vh] md:h-[50vh] xl:h-[60vh] w-full overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img
            src="/fleurs 1.jpg"
            alt="Nos Collections"
            className="w-full h-full object-cover brightness-75 saturate-[0.9]"
          />
          <div className="absolute inset-0 bg-luxury-ink/20" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-luxury-beige" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-[10px] md:text-[12px] uppercase tracking-[0.4em] text-white font-bold mb-4 block"
          >
            L'Univers Ô Belles Fleurs
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-serif text-white drop-shadow-xl"
          >
            Nos Collections <span className="italic">Botaniques</span>
          </motion.h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="h-[1px] w-32 bg-luxury-gold mx-auto mt-8"
          />
        </div>
      </section>

      <div className="-mt-12 md:-mt-20 relative z-20">
        <Collections />
      </div>
    </>
  );
}
