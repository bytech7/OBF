import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, useRef } from "react";
import { X, Search, ArrowRight, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { api } from "../services/api";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<{ products: any[], services: any[], collections: any[] }>({ products: [], services: [], collections: [] });
  const [allData, setAllData] = useState<{ products: any[], services: any[], collections: any[] }>({ products: [], services: [], collections: [] });
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      fetchData();
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery("");
      setResults({ products: [], services: [], collections: [] });
    }
  }, [isOpen]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [products, services, collections] = await Promise.all([
        api.getProducts(),
        api.getServices(),
        api.getCollections()
      ]);
      setAllData({ 
        products: products || [], 
        services: services || [],
        collections: collections || []
      });
    } catch (err) {
      console.error("Search fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query.trim().length === 0) {
      setResults({ products: [], services: [], collections: [] });
      return;
    }

    const lowerQuery = query.toLowerCase();
    const filteredProducts = allData.products.filter(p => 
      p.name.toLowerCase().includes(lowerQuery) || 
      p.category.toLowerCase().includes(lowerQuery) ||
      (p.description && p.description.toLowerCase().includes(lowerQuery))
    );
    
    const filteredServices = allData.services.filter(s => 
      s.title.toLowerCase().includes(lowerQuery) || 
      (s.description && s.description.toLowerCase().includes(lowerQuery))
    );

    const filteredCollections = allData.collections.filter(c => 
      c.title.toLowerCase().includes(lowerQuery) || 
      (c.subtitle && c.subtitle.toLowerCase().includes(lowerQuery)) ||
      (c.description && c.description.toLowerCase().includes(lowerQuery))
    );

    setResults({ 
      products: filteredProducts, 
      services: filteredServices,
      collections: filteredCollections
    });
  }, [query, allData]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-luxury-beige z-[10000] flex flex-col p-6 sm:p-12 md:p-20 overflow-y-auto"
        >
          <div className="max-w-6xl mx-auto w-full">
            <div className="flex justify-between items-center mb-12">
              <span className="text-[10px] uppercase tracking-[0.4em] text-luxury-gold font-bold">Exploration</span>
              <button 
                onClick={onClose}
                className="p-2 text-luxury-ink hover:text-luxury-gold transition-colors"
                aria-label="Fermer"
              >
                <X size={32} strokeWidth={1} />
              </button>
            </div>

            <div className="relative mb-20">
              <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-luxury-gold" size={32} strokeWidth={1} />
              <input
                ref={inputRef}
                type="text"
                placeholder="Rechercher une fleur, un service, un événement..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent border-b border-luxury-border py-8 pl-14 text-2xl md:text-4xl font-serif text-luxury-ink focus:outline-none focus:border-luxury-gold placeholder:text-luxury-muted/30 transition-colors"
              />
            </div>

            {query.trim().length > 0 && !loading && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16">
                {/* Products Result */}
                <div>
                  <h3 className="text-[11px] uppercase tracking-[0.3em] font-bold text-luxury-muted mb-8 pb-4 border-b border-luxury-border">Produits ({results.products.length})</h3>
                  {results.products.length > 0 ? (
                    <div className="space-y-8">
                      {results.products.slice(0, 5).map(product => (
                        <Link 
                          key={product.id} 
                          to="/boutique" 
                          onClick={onClose}
                          className="flex gap-6 group hover:translate-x-2 transition-transform duration-300"
                        >
                          <div className="w-20 h-24 bg-white border border-luxury-border overflow-hidden flex-shrink-0">
                            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex flex-col justify-center">
                            <span className="text-[9px] uppercase tracking-widest text-luxury-gold mb-1">{product.category}</span>
                            <h4 className="text-lg font-serif text-luxury-ink group-hover:text-luxury-gold transition-colors">{product.name}</h4>
                            <span className="text-sm font-light text-luxury-muted">{typeof product.price === 'number' ? product.price.toLocaleString() + ' FCFA' : product.price}</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm italic text-luxury-muted/60">Aucun produit trouvé.</p>
                  )}
                </div>

                {/* Collections Result */}
                <div>
                  <h3 className="text-[11px] uppercase tracking-[0.3em] font-bold text-luxury-muted mb-8 pb-4 border-b border-luxury-border">Collections ({results.collections.length})</h3>
                  {results.collections.length > 0 ? (
                    <div className="space-y-8">
                      {results.collections.map(collection => (
                        <Link 
                          key={collection.id} 
                          to="/collection" 
                          onClick={onClose}
                          className="flex gap-6 group hover:translate-x-2 transition-transform duration-300"
                        >
                          <div className="w-20 h-24 bg-white border border-luxury-border overflow-hidden flex-shrink-0">
                            <img src={collection.image} alt={collection.title} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex flex-col justify-center">
                            <span className="text-[9px] uppercase tracking-widest text-luxury-gold mb-1">{collection.subtitle}</span>
                            <h4 className="text-lg font-serif text-luxury-ink group-hover:text-luxury-gold transition-colors">{collection.title}</h4>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm italic text-luxury-muted/60">Aucune collection trouvée.</p>
                  )}
                </div>

                {/* Services Result */}
                <div>
                  <h3 className="text-[11px] uppercase tracking-[0.3em] font-bold text-luxury-muted mb-8 pb-4 border-b border-luxury-border">Services ({results.services.length})</h3>
                  {results.services.length > 0 ? (
                    <div className="space-y-8">
                      {results.services.map(service => (
                        <Link 
                          key={service.id} 
                          to="/services" 
                          onClick={onClose}
                          className="flex flex-col group hover:translate-x-2 transition-transform duration-300"
                        >
                          <h4 className="text-lg font-serif text-luxury-ink group-hover:text-luxury-gold transition-colors mb-2">{service.title}</h4>
                          <p className="text-sm font-light text-luxury-muted line-clamp-2 leading-relaxed">{service.description}</p>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm italic text-luxury-muted/60">Aucun service trouvé.</p>
                  )}
                </div>
              </div>
            )}

            {query.trim().length === 0 && !loading && (
              <div>
                <h3 className="text-[11px] uppercase tracking-[0.3em] font-bold text-luxury-muted mb-12">Recherches Suggerées</h3>
                <div className="flex flex-wrap gap-4">
                  {["Bouquet XL", "Mariage", "Decoration", "Rose", "Formation", "Ornements"].map(tag => (
                    <button 
                      key={tag}
                      onClick={() => setQuery(tag)}
                      className="px-6 py-3 border border-luxury-border text-[10px] uppercase tracking-widest text-luxury-ink hover:border-luxury-gold hover:text-luxury-gold transition-all"
                    >
                      {tag}
                    </button>
                  ))}
                </div>

                <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-12">
                  <div className="bg-white p-8 border border-luxury-border group hover:border-luxury-gold transition-colors h-full">
                    <ShoppingBag className="text-luxury-gold mb-6" size={24} strokeWidth={1} />
                    <h4 className="text-lg font-serif text-luxury-ink mb-4">Notre Boutique</h4>
                    <p className="text-sm text-luxury-muted font-light mb-6">Explorez nos créations signature disponibles en livraison immédiate.</p>
                    <Link to="/boutique" onClick={onClose} className="text-[10px] uppercase tracking-widest font-bold text-luxury-gold flex items-center gap-2">Découvrir <ArrowRight size={14} /></Link>
                  </div>
                  <div className="bg-white p-8 border border-luxury-border group hover:border-luxury-gold transition-colors h-full">
                    <Search className="text-luxury-gold mb-6" size={24} strokeWidth={1} />
                    <h4 className="text-lg font-serif text-luxury-ink mb-4">Sur Mesure</h4>
                    <p className="text-sm text-luxury-muted font-light mb-6">Besoin d'un arrangement unique ? Nos artisans sont à votre écoute.</p>
                    <Link to="/services" onClick={onClose} className="text-[10px] uppercase tracking-widest font-bold text-luxury-gold flex items-center gap-2">Services <ArrowRight size={14} /></Link>
                  </div>
                  <div className="bg-white p-8 border border-luxury-border group hover:border-luxury-gold transition-colors h-full">
                    <X className="text-luxury-gold mb-6" size={24} strokeWidth={1} />
                    <h4 className="text-lg font-serif text-luxury-ink mb-4">Aide</h4>
                    <p className="text-sm text-luxury-muted font-light mb-6">Consultez notre histoire et nos valeurs pour mieux nous connaître.</p>
                    <Link to="/histoire" onClick={onClose} className="text-[10px] uppercase tracking-widest font-bold text-luxury-gold flex items-center gap-2">Histoire <ArrowRight size={14} /></Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
