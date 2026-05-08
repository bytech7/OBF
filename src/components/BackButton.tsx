import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export default function BackButton() {
  const navigate = useNavigate();
  const location = useLocation();

  // Don't show on home page
  if (location.pathname === "/") return null;

  return (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => navigate(-1)}
      className="fixed top-24 left-4 z-[40] flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md border border-luxury-border rounded-full shadow-lg text-luxury-ink hover:text-luxury-gold hover:border-luxury-gold transition-all duration-300 md:left-8 group"
    >
      <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
      <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Retour</span>
    </motion.button>
  );
}
