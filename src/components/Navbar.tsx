import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { ShoppingBag, Menu, X, Trash2, Plus, Minus, User as UserIcon, LogOut, CheckCircle2, Search } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { Link, NavLink } from "react-router-dom";
import { generateInvoicePDF } from "../utils/invoiceGenerator";
import SearchOverlay from "./SearchOverlay";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const { cart, removeFromCart, updateQuantity, clearCart, cartCount, cartTotal } = useCart();
  const { user, login, register, logout, isAuthModalOpen, setAuthModalOpen } = useAuth();
  const [isLoginView, setIsLoginView] = useState(true);
  const [emailInput, setEmailInput] = useState("");
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    phone: "+237 ",
    password: ""
  });

  useEffect(() => {
    if (!isAuthModalOpen) {
      setIsLoginView(true);
      setEmailInput("");
      setRegisterData({ name: "", email: "", phone: "+237 ", password: "" });
    }
  }, [isAuthModalOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen || cartOpen || isAuthModalOpen || searchOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen, cartOpen, isAuthModalOpen, searchOpen]);

  const navLinks = [
    { name: "Boutique", href: "/boutique" },
    { name: "Collection", href: "/collection" },
    { name: "Services", href: "/services" },
    { name: "Formation", href: "/formation" },
    { name: "Histoire", href: "/histoire" },
  ];

  const handleCheckout = () => {
    if (cart.length === 0) return;

    // Prepare data for PDF
    const orderNumber = `OBF-${Math.floor(100000 + Math.random() * 900000)}`;
    const date = new Date().toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    const invoiceData = {
      orderNumber,
      date,
      customerName: user?.name || "Client Invité",
      items: cart.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        total: parseInt(item.price.replace(/[^0-9]/g, '')) * item.quantity
      })),
      totalAmount: cartTotal
    };

    // Generate and Download PDF
    generateInvoicePDF(invoiceData);

    // Show Success State
    setCheckoutSuccess(true);
    
    // Clear cart after delay
    setTimeout(() => {
      setCheckoutSuccess(false);
      clearCart();
      setCartOpen(false);
    }, 3000);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b border-luxury-border/50 ${
          scrolled ? "bg-luxury-beige/95 py-0 shadow-sm backdrop-blur-md" : "bg-luxury-beige py-1"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Mobile Menu Icon */}
          <button 
            className="xl:hidden text-luxury-ink p-2 -ml-2 hover:text-luxury-gold transition-colors"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Menu"
          >
            <Menu size={24} />
          </button>

          {/* Desktop Links Left */}
          <div className="hidden xl:flex items-center gap-6 xxl:gap-10">
            <NavLink
              to="/boutique"
              className={({ isActive }) => `text-[10px] xxl:text-[11px] uppercase tracking-[0.15em] xxl:tracking-[0.2em] font-semibold transition-colors ${isActive ? 'text-luxury-gold' : 'text-luxury-ink/80 hover:text-luxury-gold'}`}
            >
              Boutique
            </NavLink>
            <NavLink
              to="/collection"
              className={({ isActive }) => `text-[10px] xxl:text-[11px] uppercase tracking-[0.15em] xxl:tracking-[0.2em] font-semibold transition-colors ${isActive ? 'text-luxury-gold' : 'text-luxury-ink/80 hover:text-luxury-gold'}`}
            >
              Collection
            </NavLink>
            <NavLink
              to="/services"
              className={({ isActive }) => `text-[10px] xxl:text-[11px] uppercase tracking-[0.15em] xxl:tracking-[0.2em] font-semibold transition-colors ${isActive ? 'text-luxury-gold' : 'text-luxury-ink/80 hover:text-luxury-gold'}`}
            >
              Services
            </NavLink>
            <button 
              onClick={() => setSearchOpen(true)}
              className="text-luxury-ink/60 hover:text-luxury-gold transition-colors ml-2"
              aria-label="Recherche"
            >
              <Search size={16} strokeWidth={1.5} />
            </button>
          </div>

          <Link to="/" className="flex flex-col items-center group flex-shrink-0 mx-2 sm:mx-4">
            <img 
              src="/PHOTO-2026-04-28-14-16-16-removebg-preview.png" 
              alt="Ô Belles Fleurs Logo" 
              className="w-24 h-16 md:w-32 md:h-20 object-fill"
            />
          </Link>

          {/* Desktop Links Right */}
          <div className="hidden xl:flex items-center gap-6 xxl:gap-10">
            <NavLink
              to="/formation"
              className={({ isActive }) => `text-[10px] xxl:text-[11px] uppercase tracking-[0.15em] xxl:tracking-[0.2em] font-semibold transition-colors ${isActive ? 'text-luxury-gold' : 'text-luxury-ink/80 hover:text-luxury-gold'}`}
            >
              Formation
            </NavLink>
            <NavLink
              to="/histoire"
              className={({ isActive }) => `text-[10px] xxl:text-[11px] uppercase tracking-[0.15em] xxl:tracking-[0.2em] font-semibold transition-colors ${isActive ? 'text-luxury-gold' : 'text-luxury-ink/80 hover:text-luxury-gold'}`}
            >
              Histoire
            </NavLink>
            <div className="flex items-center gap-3 xxl:gap-6">
              {user ? (
                <div className="group relative">
                  <button className="flex items-center gap-2 text-[10px] uppercase tracking-[0.15em] font-bold text-luxury-gold">
                    <UserIcon size={14} /> <span className="max-w-[80px] truncate">{user.name}</span>
                  </button>
                  <div className="absolute top-full right-0 mt-4 py-4 px-6 bg-white border border-luxury-border shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-[100]">
                    <button onClick={logout} className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-luxury-ink hover:text-rose-500 whitespace-nowrap">
                      <LogOut size={12} /> Déconnexion
                    </button>
                  </div>
                </div>
              ) : (
                <button 
                  onClick={() => setAuthModalOpen(true)}
                  className="text-[10px] uppercase tracking-[0.15em] font-bold text-luxury-ink/80 hover:text-luxury-gold transition-colors"
                >
                  Compte
                </button>
              )}
              <button 
                onClick={() => setCartOpen(true)}
                className="relative text-[10px] xxl:text-[12px] uppercase tracking-[0.15em] xxl:tracking-[0.2em] font-semibold text-luxury-ink/80 hover:text-luxury-gold transition-colors flex items-center gap-2"
              >
                Panier ({cartCount})
              </button>
            </div>
          </div>

          {/* Mobile Cart Icon */}
          <div className="flex items-center gap-2 xl:hidden">
            <button 
              onClick={() => setSearchOpen(true)}
              className="text-luxury-ink p-2 hover:text-luxury-gold transition-colors"
              aria-label="Recherche"
            >
              <Search size={22} />
            </button>
            <button 
              onClick={() => setCartOpen(true)}
              className="text-luxury-ink p-2 -mr-2 hover:text-luxury-gold transition-colors relative"
            >
              <ShoppingBag size={22} />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-luxury-gold text-white text-[8px] flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "-100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "-100%" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 bg-luxury-beige z-[9999] flex flex-col p-12 overflow-y-auto"
          >
            <button 
              className="self-end text-luxury-ink p-2 hover:text-luxury-gold transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X size={32} />
            </button>
            <div className="flex flex-col gap-10 mt-12">
              <button 
                onClick={() => { setMobileMenuOpen(false); setSearchOpen(true); }}
                className="text-4xl font-serif tracking-tight text-luxury-gold flex items-center gap-4"
              >
                <Search size={32} strokeWidth={1} /> Rechercher
              </button>
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) => `text-4xl font-serif tracking-tight transition-colors ${isActive ? 'text-luxury-gold' : 'text-luxury-ink hover:text-luxury-gold'}`}
                >
                  {link.name}
                </NavLink>
              ))}
              {!user ? (
                <button 
                  onClick={() => { setMobileMenuOpen(false); setAuthModalOpen(true); }}
                  className="text-4xl font-serif tracking-tight text-luxury-gold text-left"
                >
                  Connexion
                </button>
              ) : (
                <button onClick={logout} className="text-4xl font-serif tracking-tight text-rose-500 text-left">
                  Déconnexion
                </button>
              )}
            </div>
            
            <div className="mt-auto pt-12 border-t border-luxury-border">
              <p className="text-[12px] uppercase tracking-[0.3em] font-bold text-luxury-gold mb-4">Maison Artisanale</p>
              <p className="text-sm text-luxury-muted leading-relaxed">Kribi • Douala • Yaoundé</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Drawer */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCartOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-luxury-beige z-[101] shadow-2xl flex flex-col"
            >
              <div className="p-8 border-b border-luxury-border flex items-center justify-between">
                <h2 className="text-xl font-serif text-luxury-ink uppercase tracking-wider">Votre Panier</h2>
                <button 
                  onClick={() => setCartOpen(false)}
                  className="p-2 hover:text-luxury-gold transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8">
                {checkoutSuccess ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="h-full flex flex-col items-center justify-center text-center"
                  >
                    <CheckCircle2 size={64} className="text-luxury-gold mb-6" />
                    <h3 className="text-2xl font-serif text-luxury-ink mb-2">Commande Validée</h3>
                    <p className="text-luxury-muted mb-8 italic">Votre bon de commande a été généré et sera téléchargé automatiquement.</p>
                    <p className="text-[10px] uppercase tracking-widest text-luxury-gold font-bold">Maison Ô Belles Fleurs</p>
                  </motion.div>
                ) : cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center">
                    <ShoppingBag size={48} className="text-luxury-gold/30 mb-6" />
                    <p className="text-luxury-muted italic font-serif">Votre panier est vide pour le moment.</p>
                    <button 
                      onClick={() => setCartOpen(false)}
                      className="mt-8 px-8 py-4 bg-luxury-ink text-white text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-luxury-gold transition-colors"
                    >
                      Découvrir la Collection
                    </button>
                  </div>
                ) : (
                  <div className="space-y-8">
                    {cart.map((item) => (
                      <div key={item.id} className="flex gap-6">
                        <div className="w-24 h-32 bg-white border border-luxury-border flex-shrink-0 overflow-hidden">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 flex flex-col">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-[13px] font-bold uppercase tracking-wider text-luxury-ink">{item.name}</h3>
                            <button 
                              onClick={() => removeFromCart(item.id)}
                              className="text-luxury-ink/40 hover:text-rose-500 transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                          <p className="text-[13px] font-serif mb-4">{item.price}</p>
                          
                          <div className="mt-auto flex items-center gap-4">
                            <div className="flex items-center border border-luxury-border bg-white">
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-2 hover:text-luxury-gold transition-colors"
                              >
                                <Minus size={14} />
                              </button>
                              <span className="w-8 text-center text-[11px] font-bold">{item.quantity}</span>
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-2 hover:text-luxury-gold transition-colors"
                              >
                                <Plus size={14} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {cart.length > 0 && !checkoutSuccess && (
                <div className="p-8 border-t border-luxury-border bg-white">
                  <div className="flex justify-between items-end mb-8">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-luxury-muted font-bold">Total Partiel</span>
                    <span className="text-xl font-serif text-luxury-ink">{cartTotal.toLocaleString()} FCFA</span>
                  </div>
                  <button 
                    onClick={handleCheckout}
                    className="w-full py-5 bg-luxury-ink text-white text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-luxury-gold transition-all duration-500 shadow-xl shadow-black/10 mb-4"
                  >
                    Passer à la Caisse
                  </button>
                  <p className="text-[9px] text-center uppercase tracking-widest text-luxury-muted">Livraison partout au Cameroun</p>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Auth Modal */}
      <AnimatePresence>
        {isAuthModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setAuthModalOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-md max-h-[90vh] overflow-y-auto bg-luxury-beige z-[201] p-6 xs:p-8 sm:p-12 shadow-2xl"
            >
              <div className="flex flex-col items-center text-center">
                <span className="text-[9px] xs:text-[10px] uppercase tracking-[0.4em] text-luxury-gold mb-4 xs:mb-6 block">Maison Ô Belles Fleurs</span>
                <h2 className="text-2xl xs:text-3xl font-serif text-luxury-ink mb-2">
                  {isLoginView ? "Espace Client" : "Création de Compte"}
                </h2>
                <p className="text-xs xs:text-sm text-luxury-muted mb-8 xs:mb-12 italic leading-relaxed">
                  {isLoginView ? "Accédez à vos commandes et privilèges." : "Rejoignez notre maison pour des offres exclusives."}
                </p>
                
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (isLoginView) {
                      login(emailInput);
                    } else {
                      register(registerData.name, registerData.email, registerData.phone);
                    }
                  }}
                  className="w-full space-y-4 xs:space-y-6"
                >
                  {!isLoginView && (
                    <div className="text-left">
                      <label className="text-[9px] uppercase tracking-[0.2em] font-bold text-luxury-ink mb-2 block">Nom Complet</label>
                      <input 
                        required
                        type="text" 
                        value={registerData.name}
                        onChange={(e) => setRegisterData({...registerData, name: e.target.value})}
                        placeholder="Jean Dupont"
                        className="w-full bg-white border border-luxury-border p-3 xs:p-4 text-sm focus:outline-none focus:border-luxury-gold transition-colors"
                      />
                    </div>
                  )}
                  <div className="text-left">
                    <label className="text-[9px] uppercase tracking-[0.2em] font-bold text-luxury-ink mb-2 block">Adresse E-mail</label>
                    <input 
                      required
                      type="email" 
                      value={isLoginView ? emailInput : registerData.email}
                      onChange={(e) => isLoginView ? setEmailInput(e.target.value) : setRegisterData({...registerData, email: e.target.value})}
                      placeholder="votre@email.com"
                      className="w-full bg-white border border-luxury-border p-3 xs:p-4 text-sm focus:outline-none focus:border-luxury-gold transition-colors"
                    />
                  </div>
                  {!isLoginView && (
                    <div className="text-left">
                      <label className="text-[9px] uppercase tracking-[0.2em] font-bold text-luxury-ink mb-2 block">Numéro de Téléphone</label>
                      <input 
                        required
                        type="tel" 
                        value={registerData.phone}
                        onChange={(e) => setRegisterData({...registerData, phone: e.target.value})}
                        placeholder="+237 6XX XXX XXX"
                        className="w-full bg-white border border-luxury-border p-3 xs:p-4 text-sm focus:outline-none focus:border-luxury-gold transition-colors"
                      />
                    </div>
                  )}
                  <div className="text-left">
                    <label className="text-[9px] uppercase tracking-[0.2em] font-bold text-luxury-ink mb-2 block">Mot de passe</label>
                    <input 
                      required
                      type="password" 
                      value={isLoginView ? "" : registerData.password}
                      onChange={(e) => !isLoginView && setRegisterData({...registerData, password: e.target.value})}
                      placeholder="••••••••"
                      className="w-full bg-white border border-luxury-border p-3 xs:p-4 text-sm focus:outline-none focus:border-luxury-gold transition-colors"
                    />
                  </div>
                  <button type="submit" className="w-full py-4 xs:py-5 bg-luxury-ink text-white text-[10px] xs:text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-luxury-gold transition-all duration-500 shadow-xl shadow-black/10">
                    {isLoginView ? "Se Connecter" : "S'enregistrer"}
                  </button>
                  <div className="flex flex-col xs:flex-row justify-between items-center gap-4 pt-4">
                    {isLoginView ? (
                      <>
                        <button type="button" className="text-[9px] uppercase tracking-[0.1em] text-luxury-muted hover:text-luxury-gold underline transition-colors order-2 xs:order-1">Mot de passe oublié ?</button>
                        <button 
                          type="button" 
                          onClick={() => setIsLoginView(false)}
                          className="text-[9px] uppercase tracking-[0.1em] text-luxury-muted hover:text-luxury-gold transition-colors order-1 xs:order-2"
                        >
                          Créer un compte
                        </button>
                      </>
                    ) : (
                      <button 
                        type="button" 
                        onClick={() => setIsLoginView(true)}
                        className="text-[9px] uppercase tracking-[0.1em] text-luxury-muted hover:text-luxury-gold transition-colors w-full text-center"
                      >
                        Compte existant ? Se connecter
                      </button>
                    )}
                  </div>
                </form>
              </div>
              <button 
                onClick={() => setAuthModalOpen(false)}
                className="absolute top-6 right-6 p-2 text-luxury-ink/40 hover:text-luxury-gold transition-colors"
              >
                <X size={24} />
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
