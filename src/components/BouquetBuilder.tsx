import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Sparkles, ChevronRight, ChevronLeft, CheckCircle2 } from "lucide-react";
import { useCart } from "../context/CartContext";

const steps = [
  { id: 1, name: "Palette", options: ["Pastels Doux", "Blanc Monochromatique", "Coucher de Soleil Vibrant", "Vert Forêt Profond"] },
  { id: 2, name: "Profil Olfactif", options: ["Agrumes & Frais", "Chaud & Musqué", "Rose Classique", "Fleurs Sauvages"] },
  { id: 3, name: "Occasion", options: ["Cadeau Romantique", "Cérémonie Solennelle", "Gala d'Entreprise", "Soirée Intime"] },
];

export default function BouquetBuilder() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState<string[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  const { addToCart } = useCart();

  const handleSelect = (option: string) => {
    const newSelections = [...selections];
    newSelections[currentStep] = option;
    setSelections(newSelections);
    
    if (currentStep < steps.length - 1) {
      setTimeout(() => setCurrentStep(prev => prev + 1), 400);
    }
  };

  const handleAddToCart = () => {
    const customBouquet = {
      id: `custom-${Date.now()}`,
      name: `Création Sur Mesure: ${selections[0]}`,
      price: "210 €", // Fixed price for custom creations
      category: "Atelier Sur Mesure",
      image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&q=80&w=800",
      details: selections.join(", ")
    };
    addToCart(customBouquet);
    setIsFinished(true);
    setTimeout(() => {
      setIsFinished(false);
      setCurrentStep(0);
      setSelections([]);
    }, 3000);
  };

  return (
    <section id="atelier" className="py-20 sm:py-32 md:py-40 bg-luxury-beige relative overflow-hidden scroll-mt-24">
      {/* Decorative floral elements (conceptual) */}
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-luxury-gold/5 rounded-full blur-[100px]" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-luxury-green/5 rounded-full blur-[100px]" />

      <div className="container mx-auto px-4 xs:px-6 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-20 items-center">
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-6 xs:p-8 sm:p-12 lg:p-16 rounded-[30px] xs:rounded-[40px] shadow-xl shadow-luxury-ink/5 relative overflow-hidden"
            >
              <AnimatePresence>
                {isFinished && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-30 bg-white flex flex-col items-center justify-center text-center p-6 xs:p-12"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", damping: 12 }}
                      className="w-16 xs:w-20 h-16 xs:h-20 bg-luxury-gold/10 text-luxury-gold rounded-full flex items-center justify-center mb-4 xs:mb-6"
                    >
                      <CheckCircle2 size={32} />
                    </motion.div>
                    <h3 className="text-xl xs:text-2xl font-serif text-luxury-ink mb-4">Ajouté au Panier</h3>
                    <p className="text-xs xs:text-sm text-luxury-muted leading-relaxed italic">Votre création artisanale a été ajoutée à votre panier.</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex items-center gap-4 mb-8 xs:mb-12">
                <div className="w-8 h-8 xs:w-10 xs:h-10 bg-luxury-gold/10 rounded-full flex items-center justify-center text-luxury-gold">
                  <Sparkles size={16} />
                </div>
                <div>
                  <h3 className="text-lg xs:text-xl font-serif text-luxury-ink">Atelier Sur Mesure</h3>
                  <p className="text-[9px] uppercase tracking-[0.2em] text-luxury-ink/40">Composition Personnalisée</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="flex gap-2 mb-8 xs:mb-12">
                {steps.map((_, idx) => (
                  <div 
                    key={idx} 
                    className={`h-1 flex-1 rounded-full transition-all duration-700 ${
                      idx <= currentStep ? "bg-luxury-gold" : "bg-luxury-beige"
                    }`}
                  />
                ))}
              </div>

              <div className="min-h-[250px] xs:min-h-[300px] flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5 }}
                  >
                    <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.4em] text-luxury-gold mb-3 xs:mb-4">
                      Étape 0{steps[currentStep].id}
                    </p>
                    <h4 className="text-2xl xs:text-3xl font-serif mb-6 xs:mb-8 text-luxury-ink leading-tight">
                      Choisissez votre <span className="italic">{steps[currentStep].name}</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 xs:gap-4">
                      {steps[currentStep].options.map((option) => (
                        <button
                          key={option}
                          onClick={() => handleSelect(option)}
                          className={`px-4 xs:px-6 py-3 xs:py-4 rounded-full text-left text-[10px] xs:text-xs uppercase tracking-[0.1em] transition-all duration-500 border ${
                            selections[currentStep] === option
                              ? "bg-luxury-ink text-white border-luxury-ink"
                              : "bg-transparent text-luxury-ink/60 border-luxury-beige hover:border-luxury-gold/40"
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="mt-8 xs:mt-12 flex justify-between items-center pt-6 xs:pt-8 border-t border-luxury-beige">
                <button 
                  disabled={currentStep === 0}
                  onClick={() => setCurrentStep(prev => prev - 1)}
                  className={`flex items-center gap-2 text-[9px] xs:text-[10px] uppercase tracking-[0.2em] ${
                    currentStep === 0 ? "opacity-0 invisible" : "opacity-50 hover:opacity-100 transition-opacity"
                  }`}
                >
                  <ChevronLeft size={14} /> Retour
                </button>
                {selections.length === steps.length && currentStep === steps.length - 1 && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    onClick={handleAddToCart}
                    className="bg-luxury-gold text-white px-6 xs:px-8 py-2.5 xs:py-3 rounded-full text-[9px] xs:text-[10px] uppercase tracking-[0.3em] font-medium shadow-lg shadow-luxury-gold/20 hover:scale-105 transition-transform"
                  >
                    Ajouter au Panier
                  </motion.button>
                )}
              </div>
            </motion.div>
          </div>

          <div className="order-1 lg:order-2">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-[9px] sm:text-[10px] uppercase tracking-[0.4em] text-luxury-gold mb-4 xs:mb-6 block"
            >
              Expérience Interactive
            </motion.span>
            <motion.h2
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
              className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-serif text-luxury-ink mb-6 xs:mb-8 leading-tight"
            >
              Composez Votre <br /> <span className="italic">Récit Botanique</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-luxury-ink/60 text-sm xs:text-base leading-relaxed mb-10 max-w-sm"
            >
              Notre concierge interactif vous guide à travers un voyage sensoriel pour définir un bouquet qui encapsule parfaitement l'indicible.
            </motion.p>
            
            <div className="space-y-4">
              {steps.map((step, idx) => (
                <div key={idx} className="flex items-center gap-4 xs:gap-6 group">
                  <span className="text-lg xs:text-xl font-serif italic text-luxury-gold opacity-50 group-hover:opacity-100 transition-opacity">0{step.id}</span>
                  <div>
                    <h5 className="text-[11px] xs:text-sm font-medium uppercase tracking-widest text-luxury-ink/80">{step.name}</h5>
                    <p className="text-[9px] xs:text-[10px] text-luxury-ink/40">
                      {selections[idx] || "En attente de choix..."}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
