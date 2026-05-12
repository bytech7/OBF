import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { api } from "../services/api";

export default function Formation() {
  const [formations, setFormations] = useState<any[]>([]);

  useEffect(() => {
    fetchFormations();
  }, []);

  const fetchFormations = async () => {
    try {
      const data = await api.getFormations();
      if (data) {
        const formatted = data.map((f: any) => ({
          ...f,
          price: typeof f.price === 'number' ? f.price.toLocaleString('fr-FR') : f.price
        }));
        setFormations(formatted);
      }
    } catch (err) {
      console.error("Failed to fetch formations", err);
    }
  };

  return (
    <div className="pt-20 md:pt-24 lg:pt-28">
      <section id="formation" className="py-20 sm:py-32 md:py-40 bg-luxury-paper">
        <div className="container mx-auto px-6 xs:px-8 sm:px-12 text-center">
          <div className="max-w-3xl mx-auto mb-20">
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-[9px] sm:text-[10px] uppercase tracking-[0.4em] text-luxury-gold mb-8 block"
            >
              Transmission
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-serif text-luxury-ink mb-10 sm:mb-12"
            >
              L'École de l'Art Floral
            </motion.h2>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="aspect-video mb-10 sm:mb-12 overflow-hidden bg-white border border-luxury-border shadow-xl"
            >
              <img src="/formation%202.jpg" alt="Atelier florissant" className="w-full h-full object-cover grayscale-[0.3] hover:grayscale-0 transition-all duration-1000" />
            </motion.div>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-sm sm:text-lg text-luxury-muted font-light italic leading-relaxed mb-10"
            >
              Découvrez les secrets de nos maîtres fleuristes lors de nos ateliers intensifs. Apprenez à composer avec l'âme des fleurs, de la sélection des tiges à l'harmonie des couleurs. Toutes nos formations sont sanctionnées par une attestation de fin de formation.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {formations.map((f, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white border border-luxury-border shadow-sm hover:shadow-xl transition-all text-left flex flex-col overflow-hidden"
              >
                <div className="aspect-square overflow-hidden">
                  <img src={f.image || "https://images.unsplash.com/photo-1591873386927-ddf4b45a5c1d?auto=format&fit=crop&q=80&w=800"} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <h3 className="text-xl font-serif text-luxury-ink mb-2">{f.title}</h3>
                  <p className="text-[10px] uppercase tracking-widest text-luxury-gold font-bold mb-3">Attestation incluse</p>
                  <p className="text-sm text-luxury-muted mb-6 flex-1">{f.description}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-luxury-gold font-bold">{f.price} CFA</span>
                    <button className="text-[10px] uppercase tracking-wider font-bold border-b border-luxury-ink">Réserver</button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
