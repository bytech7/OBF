import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Link } from "react-router-dom";
import { api } from "../services/api";

export default function Collections() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [collections, setCollections] = useState<any[]>([]);

  useEffect(() => {
    fetchCollections();
  }, []);

  const fetchCollections = async () => {
    try {
      const data = await api.getCollections();
      if (data) {
        const formatted = data.map((c: any) => ({
          ...c,
          id: c.id.toString(),
          subtitle: c.subtitle || "Collection Exclusive"
        }));
        setCollections(formatted);
      }
    } catch (err) {
      console.error("Failed to fetch collections", err);
    }
  };

  const selectedCollection = collections.find(c => c.id === selectedId);

  return (
    <section id="collections" className="py-20 sm:py-32 md:py-40 px-4 xs:px-6 sm:px-12 container mx-auto scroll-mt-24">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 sm:mb-16 gap-6 sm:gap-8 border-b border-luxury-border pb-8 sm:pb-12">
        <div className="max-w-2xl">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-luxury-gold mb-4 block font-bold"
          >
            Collections Curatées
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-serif text-luxury-ink leading-tight"
          >
            Botaniques <span className="italic">Artisanales</span>
          </motion.h2>
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-xs sm:text-sm text-luxury-muted max-w-sm lg:text-right leading-relaxed italic"
        >
          Chaque composition est un récit botanique curaté, façonné à la main à partir de fleurs rares provenant de horticulteurs héritage éthiques.
        </motion.p>
      </div>

      <div className="relative">
        <AnimatePresence mode="wait">
          {!selectedId ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xs:gap-8"
            >
              {collections.map((item, index) => (
                <motion.div
                  key={item.id}
                  layoutId={`collection-container-${item.id}`}
                  onClick={() => setSelectedId(item.id)}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 * index, duration: 0.8 }}
                  className="group relative overflow-hidden bg-white cursor-pointer"
                >
                  <motion.div 
                    layoutId={`collection-img-${item.id}`}
                    className="aspect-[3/4] sm:aspect-[4/5] overflow-hidden"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[0.2] group-hover:grayscale-0"
                    />
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-luxury-ink/60 via-transparent to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-700 sm:opacity-0" />
                  
                  <div className="absolute bottom-0 left-0 w-full p-6 sm:p-8 translate-y-0 sm:translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                    <motion.p 
                      layoutId={`collection-subtitle-${item.id}`}
                      className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-luxury-gold mb-2 transition-opacity duration-700 opacity-100 sm:opacity-0 group-hover:opacity-100"
                    >
                      {item.subtitle}
                    </motion.p>
                    <motion.h3 
                      layoutId={`collection-title-${item.id}`}
                      className="text-xl sm:text-2xl md:text-3xl font-serif text-white"
                    >
                      {item.title}
                    </motion.h3>
                    <div className="mt-4 pt-4 border-t border-white/20 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                      <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-white hover:text-luxury-gold transition-colors">
                        Découvrir
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            selectedCollection && (
              <motion.div
                key="detail"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 40 }}
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                className="bg-white border border-luxury-border flex flex-col lg:flex-row overflow-hidden"
              >
                <motion.div 
                  layoutId={`collection-img-${selectedCollection.id}`}
                  className="w-full lg:w-1/2 aspect-[4/3] sm:aspect-video lg:aspect-auto min-h-[300px] sm:min-h-[400px] lg:h-[700px]"
                >
                  <img 
                    src={selectedCollection.image} 
                    alt={selectedCollection.title}
                    className="w-full h-full object-cover" 
                  />
                </motion.div>
                
                <div className="w-full lg:w-1/2 p-6 xs:p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
                  <button 
                    onClick={() => setSelectedId(null)}
                    className="flex items-center gap-4 text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-luxury-gold mb-8 sm:mb-12 hover:pl-2 transition-all group"
                  >
                    <X size={14} className="group-hover:rotate-90 transition-transform" /> Retour aux collections
                  </button>

                  <motion.span 
                    layoutId={`collection-subtitle-${selectedCollection.id}`}
                    className="text-[10px] sm:text-[12px] uppercase tracking-[0.4em] text-luxury-gold font-bold mb-4 block"
                  >
                    {selectedCollection.subtitle}
                  </motion.span>
                  <motion.h3 
                    layoutId={`collection-title-${selectedCollection.id}`}
                    className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-serif text-luxury-ink mb-6 sm:mb-8 leading-tight"
                  >
                    {selectedCollection.title}
                  </motion.h3>
                  <p className="text-luxury-muted text-sm xs:text-base sm:text-lg leading-relaxed mb-10 sm:mb-12 font-light italic max-w-md">
                    {selectedCollection.description}
                  </p>
                  
                  <div className="flex flex-col xs:flex-row gap-4 sm:gap-6 mt-4 sm:mt-auto">
                    <Link 
                      to={`/boutique?category=${encodeURIComponent(selectedCollection.title)}`}
                      onClick={() => setSelectedId(null)}
                      className="w-full xs:w-1/2 px-8 sm:px-12 py-4 sm:py-5 bg-luxury-ink text-white text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-luxury-gold transition-all duration-500 shadow-xl shadow-black/10 text-center"
                    >
                      Voir les Produits
                    </Link>
                    <Link 
                      to="/boutique"
                      onClick={() => setSelectedId(null)}
                      className="w-full xs:w-1/2 px-8 sm:px-12 py-4 sm:py-5 border border-luxury-ink text-luxury-ink text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-luxury-ink hover:text-white transition-all text-center"
                    >
                      Sur Mesure
                    </Link>
                  </div>
                </div>
              </motion.div>
            )
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
