import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, Mail, Phone, X, ExternalLink, Facebook } from "lucide-react";
import { useUI } from "../context/UIContext";

export default function ContactModal() {
  const { isContactModalOpen, setContactModalOpen } = useUI();

  const contactMethods = [
    {
      name: "WhatsApp",
      icon: MessageCircle,
      value: "+237 6 97 30 94 41",
      link: "https://api.whatsapp.com/send?phone=%2B237697309441&token=eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjEyNSJ9.eyJleHAiOjE3NzgxMDcxMzYsInBob25lIjoiKzIzNzY5NzMwOTQ0MSIsImNvbnRleHQiOiJBZmlKaUlzb3pJdlpyV2ZMc0hhMU93VW9DR01FaWstWWhGZXdKQ3JaNUJhSjJrTmRXaFRWa2tibXhpTnF4Y2NpUnRyUnd3eERKejlKOXJBejhXMFcxazRrSHJqT1VQUlZ6NUJIekw2VUlOd3dNcWZtRVE5MEhPR2ZqNkliSGpsVS1sMDdlTHVZemc5OVlyZ2pHTEtDZEF4ZHNRIiwic291cmNlIjoiRkJfUGFnZSIsImFwcCI6ImZhY2Vib29rIiwiZW50cnlfcG9pbnQiOiJwYWdlX2N0YSJ9.Sv_4IiuG9INv_6LfydFac_-D0JBv8oRhPcjsHovwLASWK7E5ytmTKOSg3ZkSi-EGSdt0ADvDmVJ9THT40F-msw&fbclid=IwY2xjawRnUYhleHRuA2FlbQIxMABicmlkETF6Q0tGdWVQZVJ3MWhhZE9pc3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHunszU7yTA8ttpdVaBR96b0fsGyo7wmQ_Gx4BzIcRqsLprPaFdVkbTIIMCTU_aem_z-sZ4TJdcXo8nQRD4OC4ig",
      color: "text-green-600"
    },
    {
      name: "Téléphone",
      icon: Phone,
      value: "+237 6 97 30 94 41",
      link: "tel:+237697309441",
      color: "text-luxury-gold"
    },
    {
      name: "E-mail",
      icon: Mail,
      value: "obellefleurs@gmail.com",
      link: "mailto:obellefleurs@gmail.com",
      color: "text-blue-600"
    },
    {
      name: "Facebook",
      icon: Facebook,
      value: "Ô Belles Fleurs",
      link: "https://web.facebook.com/profile.php?id=61589275109450",
      color: "text-blue-800"
    }
  ];

  return (
    <AnimatePresence>
      {isContactModalOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setContactModalOpen(false)}
            className="fixed inset-0 bg-luxury-ink/60 backdrop-blur-sm z-[200]"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white border border-luxury-border shadow-2xl z-[201] overflow-hidden"
          >
            <div className="bg-luxury-ink p-6 text-white flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-luxury-gold/20 flex items-center justify-center rounded-full">
                  <MessageCircle className="text-luxury-gold" size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-serif">Nous Contacter</h3>
                  <p className="text-[10px] uppercase tracking-widest text-luxury-muted">À votre service</p>
                </div>
              </div>
              <button 
                onClick={() => setContactModalOpen(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-8 space-y-4 bg-luxury-beige/30">
              {contactMethods.map((method, idx) => (
                <motion.a
                  key={method.name}
                  href={method.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center justify-between p-4 bg-white border border-luxury-border hover:border-luxury-gold hover:shadow-lg transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-full bg-gray-50 group-hover:scale-110 transition-transform ${method.color}`}>
                      <method.icon size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-luxury-muted font-bold">{method.name}</p>
                      <p className="text-sm font-serif text-luxury-ink">{method.value}</p>
                    </div>
                  </div>
                  <ExternalLink size={14} className="text-luxury-muted group-hover:text-luxury-gold transition-colors" />
                </motion.a>
              ))}
            </div>

            <div className="p-6 border-t border-luxury-border bg-white text-center">
              <p className="text-[10px] uppercase tracking-[0.2em] text-luxury-muted italic mb-4">
                Passer à l'atelier
              </p>
              <p className="text-xs text-luxury-ink font-bold">
                KRIBI, CAMEROUN
              </p>
              <p className="text-[9px] text-luxury-muted mt-1 leading-relaxed">
                Quartier Administratif, face à la Préfecture
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
