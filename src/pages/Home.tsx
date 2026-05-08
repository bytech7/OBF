import Hero from "../components/Hero";
import { motion } from "motion/react";

export default function Home() {
  return (
    <>
      <Hero />
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <span className="text-[10px] uppercase tracking-[0.4em] text-luxury-gold mb-6 block">Bienvenue</span>
            <h2 className="text-4xl font-serif text-luxury-ink mb-8">L'excellence au service du végétal</h2>
            <p className="text-luxury-muted font-light italic leading-relaxed">
              La Maison Ô Belles Fleurs cultive l'art de l'éphémère avec une passion transmise depuis des générations. 
              Découvrez nos univers à travers nos pages dédiées.
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
