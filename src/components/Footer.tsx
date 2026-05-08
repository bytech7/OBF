import { motion } from "motion/react";
import { Instagram, Facebook, Twitter, ShieldCheck, MessageCircle, Mail } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [subscribed, setSubscribed] = useState(false);

  return (
    <footer className="px-6 md:px-12 py-20 bg-luxury-beige border-t border-luxury-border">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">
          <div className="lg:col-span-1">
            <Link to="/" className="flex flex-col items-start gap-3 mb-8">
              <img 
                src="/PHOTO-2026-04-28-14-16-16-removebg-preview.png" 
                alt="Ô Belles Fleurs Logo" 
                className="w-48 h-32 object-fill"
              />
            </Link>
            <p className="text-sm text-luxury-muted leading-relaxed max-w-xs mb-6">
              L'excellence de l'art floral au Cameroun. Siège à Kribi • Services partout dans le pays
            </p>
            <div className="flex flex-col gap-2">
              <p className="text-[10px] uppercase tracking-widest text-luxury-gold font-bold">Nous joindre</p>
              <p className="text-sm font-serif text-luxury-ink">+237 6 97 30 94 41</p>
            </div>
          </div>

          <div>
            <h4 className="text-[12px] uppercase tracking-[0.3em] font-bold text-luxury-ink mb-6">Maison</h4>
            <ul className="space-y-4 text-sm text-luxury-muted">
              <li><Link to="/collection" className="hover:text-luxury-gold transition-colors">Nos Collections</Link></li>
              <li><Link to="/histoire" className="hover:text-luxury-gold transition-colors">Notre Histoire</Link></li>
              <li><Link to="/boutique" className="hover:text-luxury-gold transition-colors">Boutique</Link></li>
              <li><Link to="/admin/login" className="hover:text-luxury-gold transition-colors">Espace Admin</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[12px] uppercase tracking-[0.3em] font-bold text-luxury-ink mb-6">Service Client</h4>
            <ul className="space-y-4 text-sm text-luxury-muted">
              <li><a href="#" className="hover:text-luxury-gold transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-luxury-gold transition-colors">Livraison de Luxe</a></li>
              <li><a href="#" className="hover:text-luxury-gold transition-colors">Guide d'Entretien</a></li>
              <li><a href="#" className="hover:text-luxury-gold transition-colors">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[12px] uppercase tracking-[0.3em] font-bold text-luxury-ink mb-6">Newsletter</h4>
            <p className="text-sm text-luxury-muted mb-6 font-light">Inscrivez-vous pour recevoir nos curations saisonnières.</p>
            {subscribed ? (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-luxury-gold text-sm font-serif italic"
              >
                Merci de votre confiance. Vous recevrez bientôt nos nouvelles.
              </motion.div>
            ) : (
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubscribed(true);
                }}
                className="border-b border-luxury-ink/30 pb-2 flex"
              >
                <input 
                  required
                  type="email" 
                  placeholder="ADRESSE E-MAIL" 
                  className="bg-transparent text-[11px] tracking-[0.15em] outline-none flex-1 text-luxury-ink font-bold"
                />
                <button type="submit" className="text-[11px] px-2 uppercase text-luxury-gold font-bold hover:tracking-[0.25em] transition-all">S'inscrire</button>
              </form>
            )}
          </div>
        </div>

        <div className="pt-12 border-t border-luxury-border/50 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col gap-2 text-center md:text-left">
            <div className="text-[10px] uppercase tracking-[0.3em] text-luxury-ink/40 font-semibold">
              &copy; {currentYear} Ô Belles Fleurs — Haute Fleuristerie du Cameroun
            </div>
            <div className="text-[8px] uppercase tracking-[0.5em] text-luxury-gold/40 font-bold">
              Conçu par <span className="text-luxury-gold/60">BYTECH AGENCY</span>
            </div>
          </div>
          
          <div className="flex items-center gap-6 text-luxury-ink/60">
            <Link 
              to="/admin/login" 
              className="group flex items-center gap-2 text-luxury-ink/40 hover:text-luxury-gold transition-colors pr-6 border-r border-luxury-border/30"
              title="Connexion Admin"
            >
              <ShieldCheck size={16} strokeWidth={1.5} className="group-hover:scale-110 transition-transform" />
              <span className="text-[9px] uppercase tracking-[0.2em] font-bold">Accès Admin</span>
            </Link>
            
            <div className="flex space-x-6">
              <a href="mailto:obellefleurs@gmail.com" className="hover:text-luxury-gold transition-colors" title="Email"><Mail size={18} strokeWidth={1.5} /></a>
              <a href="https://web.facebook.com/profile.php?id=61589275109450" target="_blank" rel="noopener noreferrer" className="hover:text-luxury-gold transition-colors" title="Facebook"><Facebook size={18} strokeWidth={1.5} /></a>
              <a href="https://api.whatsapp.com/send?phone=%2B237697309441&token=eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjEyNSJ9.eyJleHAiOjE3NzgxMDcxMzYsInBob25lIjoiKzIzNzY5NzMwOTQ0MSIsImNvbnRleHQiOiJBZmlKaUlzb3pJdlpyV2ZMc0hhMU93VW9DR01FaWstWWhGZXdKQ3JaNUJhSjJrTmRXaFRWa2tibXhpTnF4Y2NpUnRyUnd3eERKejlKOXJBejhXMFcxazRrSHJqT1VQUlZ6NUJIekw2VUlOd3dNcWZtRVE5MEhPR2ZqNkliSGpsVS1sMDdlTHVZemc5OVlyZ2pHTEtDZEF4ZHNRIiwic291cmNlIjoiRkJfUGFnZSIsImFwcCI6ImZhY2Vib29rIiwiZW50cnlfcG9pbnQiOiJwYWdlX2N0YSJ9.Sv_4IiuG9INv_6LfydFac_-D0JBv8oRhPcjsHovwLASWK7E5ytmTKOSg3ZkSi-EGSdt0ADvDmVJ9THT40F-msw&fbclid=IwY2xjawRnUYhleHRuA2FlbQIxMABicmlkETF6Q0tGdWVQZVJ3MWhhZE9pc3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHunszU7yTA8ttpdVaBR96b0fsGyo7wmQ_Gx4BzIcRqsLprPaFdVkbTIIMCTU_aem_z-sZ4TJdcXo8nQRD4OC4ig" target="_blank" rel="noopener noreferrer" className="hover:text-luxury-gold transition-colors" title="WhatsApp"><MessageCircle size={18} strokeWidth={1.5} /></a>
              <a href="#" className="hover:text-luxury-gold transition-colors" title="Instagram"><Instagram size={18} strokeWidth={1.5} /></a>
              <a href="#" className="hover:text-luxury-gold transition-colors" title="Twitter"><Twitter size={18} strokeWidth={1.5} /></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
