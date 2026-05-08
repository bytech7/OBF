import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus, Trash2 } from "lucide-react";
import { useCart } from "../context/CartContext";
import { api } from "../services/api";
import { useSearchParams } from "react-router-dom";

const categories = [
  "TOUS",
  "MARIAGE",
  "SAINT-VALENTIN",
  "ANNIVERSAIRE",
  "NAISSANCE",
  "DEUIL",
  "DÉCORATION",
  "ORNEMENTS"
];

export default function Products() {
  const { cart, addToCart, removeFromCart, updateQuantity } = useCart();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get("category")?.toUpperCase() || "TOUS";
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) {
      // Normalize: uppercase, remove "LE " if exists, and replace spaces with dashes
      let normalized = cat.toUpperCase();
      if (normalized.startsWith("LE ")) {
        normalized = normalized.substring(3);
      }
      setActiveCategory(normalized);
    }
  }, [searchParams]);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    if (category === "TOUS") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", category.toLowerCase());
    }
    setSearchParams(searchParams);
  };

  const fetchProducts = async () => {
    try {
      const data = await api.getProducts();
      if (data) {
        const formattedData = data.map((p: any) => ({
          ...p,
          id: p.id.toString(),
          price: p.price ? (typeof p.price === 'number' ? p.price.toLocaleString('fr-FR') : p.price) + " FCFA" : "Contactez-nous"
        }));
        setProducts(formattedData);
      }
    } catch (err) {
      console.error("Failed to fetch products", err);
    }
  };

  const filteredProducts = activeCategory === "TOUS" 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <section id="shop" className="py-20 sm:py-32 md:py-40 bg-white border-y border-luxury-border">
      <div className="container mx-auto px-4 xs:px-6 md:px-12">
        <div className="flex flex-col items-center mb-16 sm:mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] sm:text-xs uppercase tracking-[0.4em] font-bold text-luxury-gold mb-12"
          >
            Curations Saisonnières
          </motion.h2>

          {/* Categories Filter Bar */}
          <div className="w-full overflow-x-auto no-scrollbar pb-4 border-b border-luxury-border">
            <div className="flex items-center justify-between min-w-max md:min-w-0 md:justify-center gap-8 md:gap-12 lg:gap-16 px-4">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`relative pb-6 text-[10px] sm:text-[11px] lg:text-[12px] uppercase tracking-[0.25em] font-medium transition-colors duration-300 ${
                    activeCategory === category ? "text-luxury-ink" : "text-luxury-ink/40 hover:text-luxury-ink"
                  }`}
                >
                  {category}
                  {activeCategory === category && (
                    <motion.div
                      layoutId="categoryUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-luxury-gold"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-x-4 xs:gap-x-6 sm:gap-x-8 gap-y-10 xs:gap-y-12 md:gap-y-20">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, index) => {
              const cartItem = cart.find((item) => item.id === product.id);
              
              return (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="group flex flex-col h-full"
                >
                  <div className="relative aspect-[3/4] xs:aspect-[4/5] mb-6 overflow-hidden bg-white border border-luxury-border shadow-sm group-hover:shadow-2xl group-hover:shadow-luxury-ink/5 transition-all duration-700">
                    <div className="absolute inset-0 bg-luxury-gold opacity-[0.02] z-10 pointer-events-none"></div>
                    
                    <motion.img
                      src={product.image}
                      alt={product.name}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 1.5, ease: [0.33, 1, 0.68, 1] }}
                      className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700"
                    />

                    {/* Desktop Hover UI */}
                    <div className="absolute inset-x-0 bottom-0 z-20 p-4 translate-y-full lg:group-hover:translate-y-0 transition-transform duration-500 ease-out bg-white/95 backdrop-blur-md border-t border-luxury-border hidden lg:block">
                      <AnimatePresence mode="wait">
                        {!cartItem ? (
                          <motion.button 
                            key="add"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              addToCart(product);
                            }}
                            className="w-full py-4 bg-luxury-ink text-white text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-luxury-gold transition-colors duration-300 flex items-center justify-center gap-2"
                          >
                            <Plus size={14} /> Ajouter au Panier
                          </motion.button>
                        ) : (
                          <motion.div 
                            key="quantity"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center justify-between bg-luxury-beige border border-luxury-border"
                          >
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                updateQuantity(product.id, cartItem.quantity - 1);
                                if (cartItem.quantity === 1) removeFromCart(product.id);
                              }}
                              className="p-4 hover:text-luxury-gold transition-colors"
                            >
                              {cartItem.quantity === 1 ? <Trash2 size={14} className="text-rose-500" /> : <Minus size={14} />}
                            </button>
                            <span className="text-[11px] font-bold text-luxury-ink font-serif">{cartItem.quantity} Choisi(s)</span>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                updateQuantity(product.id, cartItem.quantity + 1);
                              }}
                              className="p-4 hover:text-luxury-gold transition-colors"
                            >
                              <Plus size={14} />
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between items-start gap-2 px-1 mb-auto">
                    <div>
                      <h3 className="text-[13px] sm:text-[14px] md:text-[15px] font-bold uppercase tracking-wider text-luxury-ink mb-1 group-hover:text-luxury-gold transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-[11px] sm:text-[12px] text-luxury-soft italic font-serif">
                        {product.category}
                      </p>
                    </div>
                    <span className="text-[13px] sm:text-[14px] font-serif font-semibold text-luxury-ink">
                      {product.price}
                    </span>
                  </div>
                  
                  {/* Mobile/Tablet View Add to Cart - More ergonomic */}
                  <div className="mt-6 lg:hidden">
                    {!cartItem ? (
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(product);
                        }}
                        className="w-full py-3 bg-luxury-ink text-white text-[9px] sm:text-[10px] uppercase tracking-[0.22em] font-bold flex items-center justify-center gap-2 hover:bg-luxury-gold transition-colors active:scale-[0.98]"
                      >
                        <Plus size={14} /> Ajouter
                      </button>
                    ) : (
                      <div className="flex items-center justify-between bg-white border border-luxury-border">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            updateQuantity(product.id, cartItem.quantity - 1);
                            if (cartItem.quantity === 1) removeFromCart(product.id);
                          }}
                          className="p-3 hover:text-luxury-gold transition-colors"
                        >
                          {cartItem.quantity === 1 ? <Trash2 size={14} className="text-rose-500" /> : <Minus size={14} />}
                        </button>
                        <span className="text-[11px] font-bold text-luxury-ink font-serif">{cartItem.quantity}</span>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            updateQuantity(product.id, cartItem.quantity + 1);
                          }}
                          className="p-3 hover:text-luxury-gold transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        <div className="mt-24 text-center">
          <button className="text-[11px] uppercase tracking-[0.3em] font-medium border-b border-luxury-gold pb-1 hover:text-luxury-gold transition-colors">
            Voir Toutes les Créations
          </button>
        </div>
      </div>
    </section>
  );
}
