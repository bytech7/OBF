import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export default function Story() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  return (
    <section ref={containerRef} id="story" className="py-20 sm:py-32 md:py-40 bg-luxury-green text-luxury-beige overflow-hidden">
      <div className="container mx-auto px-4 xs:px-6 sm:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-24 items-center">
        <div className="relative order-2 lg:order-1 mt-8 lg:mt-0">
          <motion.div 
            style={{ y }}
            className="aspect-[4/5] overflow-hidden rounded-[80px] xs:rounded-[150px] md:rounded-[400px] border border-luxury-beige/10"
          >
            <img
              src="/boss.jpg"
              alt="Boss - Ô Belles Fleurs"
              className="w-full h-[150%] object-cover opacity-90"
            />
          </motion.div>
          <motion.div
            style={{ scale }}
            className="absolute -bottom-4 -right-4 xs:-bottom-6 xs:-right-6 md:-bottom-10 md:-right-10 w-24 h-24 xs:w-32 xs:h-32 md:w-64 md:h-64 border border-luxury-gold/40 rounded-full flex items-center justify-center p-4 xs:p-6 md:p-8 backdrop-blur-md bg-luxury-green/30 shadow-2xl"
          >
            <p className="text-[7px] xs:text-[9px] md:text-sm text-luxury-gold uppercase tracking-[0.3em] xs:tracking-[0.45em] text-center leading-tight xs:leading-relaxed font-semibold">
              Inspiré par Kribi <br className="hidden xs:block" /> Fier du Cameroun
            </p>
          </motion.div>
        </div>

        <div className="lg:pl-12 order-1 lg:order-2">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[10px] md:text-[12px] uppercase tracking-[0.45em] text-luxury-gold mb-6 block font-bold"
          >
            Notre Histoire
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif mb-6 xs:mb-8 leading-[1.2] md:leading-tight tracking-tight"
          >
            L'Art de <br /> <span className="italic font-light">l'Excellence Florale</span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="space-y-4 xs:space-y-6 text-luxury-beige/80 text-sm xs:text-base md:text-lg font-light leading-relaxed max-w-lg"
          >
            <p className="italic">
              À Kribi, notre maison s’impose comme une référence incontournable et pionnière dans l’univers de l’art floral. Unique en son genre, notre boutique est aujourd’hui le seul espace entièrement dédié aux créations florales, naturelles et artificielles, alliant élégance, originalité et savoir-faire professionnel.
            </p>
            <p className="italic">
              Derrière cette signature se trouve une expertise construite depuis 2001. Notre fondatrice, décoratrice passionnée, a su imposer son talent à Douala et dans toute la sous-région, en accompagnant avec succès de nombreux événements et projets d’envergure.
            </p>
            <p className="italic">
              Formée dès 2001 à Rungis, haut lieu international de l’art floral, elle apporte une touche d’excellence, mêlant techniques professionnelles et créativité sur mesure pour sublimer chaque occasion.
            </p>
            <p className="italic font-normal text-luxury-gold">
              Aujourd’hui, nous rapprochons ce savoir-faire d’exception de vous. Plus besoin de chercher des décorateurs à Douala ou à Yaoundé : à Kribi, vous bénéficiez désormais d’un service premium, disponible sur place, avec une qualité digne des plus grandes réalisations.
            </p>
            <p className="italic">
              Confiez-nous vos projets, et transformons ensemble vos idées en expériences visuelles inoubliables.
            </p>
            <div className="pt-6 xs:pt-8">
              <button className="flex items-center gap-4 xs:gap-6 group">
                <div className="w-12 xs:w-16 h-[2px] bg-luxury-gold group-hover:w-20 xs:group-hover:w-24 transition-all duration-700" />
                <span className="text-[10px] xs:text-[12px] uppercase tracking-[0.35em] text-luxury-gold font-bold">Découvrir Notre Voyage</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
