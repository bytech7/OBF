import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { api } from "../services/api";

export default function Services() {
  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const data = await api.getServices();
      if (data) {
        const formatted = data.map((s: any) => ({
          ...s,
          items: s.items || ["Service personnalisé"]
        }));
        setServices(formatted);
      }
    } catch (err) {
      console.error("Failed to fetch services", err);
    }
  };
  return (
    <div className="pt-20 md:pt-24 lg:pt-28 pb-20 bg-luxury-beige min-h-screen">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mb-20">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[10px] uppercase tracking-[0.4em] text-luxury-gold mb-6 block"
          >
            Savoir-Faire d'Exception
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-7xl font-serif text-luxury-ink leading-tight"
          >
            Services de Haute <br className="hidden sm:block" /> Couture Florale
          </motion.h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <Link to={`/devis?service=${service.id}`} className="block relative h-full">
                <div className="bg-white border border-luxury-border h-full flex flex-col hover:shadow-2xl transition-all duration-700 relative overflow-hidden">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img 
                      src={service.image || "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=1200"} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                      alt={service.title} 
                    />
                  </div>
                  
                  <div className="p-6 md:p-8 flex flex-col flex-1">
                    <span className="text-[9px] uppercase tracking-[0.3em] text-luxury-gold mb-4 block">{service.category}</span>
                    <h3 className="text-xl md:text-2xl font-serif text-luxury-ink mb-6 group-hover:text-luxury-gold transition-colors">{service.title}</h3>
                    <p className="text-sm text-luxury-muted font-light italic leading-relaxed mb-8 flex-grow">
                      {service.description}
                    </p>
                    
                    <ul className="space-y-3 mb-10 border-t border-luxury-border/30 pt-6">
                      {service.items.map((item) => (
                        <li key={item} className="text-[10px] uppercase tracking-widest flex items-center gap-3">
                          <span className="w-1 h-1 rounded-full bg-luxury-gold"></span>
                          {item}
                        </li>
                      ))}
                    </ul>

                    <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold text-luxury-ink group-hover:gap-4 transition-all">
                      Demander un devis <ArrowRight size={14} className="text-luxury-gold" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}

          {/* Last CTA Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-1 bg-luxury-ink p-8 flex flex-col justify-center items-center text-center text-white"
          >
            <h3 className="text-2xl font-serif mb-6 text-luxury-gold">Un Projet Sur-Mesure ?</h3>
            <p className="text-sm font-light italic opacity-70 mb-10">
              Nos artisans se déplacent pour étudier vos espaces et vous proposer une scénographie unique.
            </p>
            <Link 
              to="/devis"
              className="px-10 py-4 border border-luxury-gold text-luxury-gold text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-luxury-gold hover:text-luxury-ink transition-all"
            >
              Consultation Privée
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

