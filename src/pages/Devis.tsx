import { motion, AnimatePresence } from "motion/react";
import React, { useState, useRef, useEffect } from "react";
import { Send, CheckCircle2, Eye, Download, X, Printer, FileText } from "lucide-react";
import { api } from "../services/api";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useSearchParams } from "react-router-dom";

export default function Devis() {
  const [searchParams] = useSearchParams();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "+237 ",
    serviceType: searchParams.get("service") || "",
    occasion: "",
    date: "",
    budget: "",
    details: ""
  });

  useEffect(() => {
    const service = searchParams.get("service");
    if (service) {
      setFormData(prev => ({ ...prev, serviceType: service }));
    }
  }, [searchParams]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await api.createQuote({
        ...formData,
        date: new Date().toISOString(),
        submissionDate: formData.date
      });
      setSubmitted(true);
      setShowPreview(false);
    } catch (err) {
      alert("Une erreur est survenue lors de l'envoi de votre demande.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDownloadPDF = async () => {
    if (!previewRef.current) return;
    
    setLoading(true);
    try {
      const canvas = await html2canvas(previewRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff"
      });
      
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`devis-obellesfleurs-${formData.customerName.replace(/\s+/g, '-').toLowerCase()}.pdf`);
    } catch (error) {
      console.error("PDF generation failed:", error);
      alert("Erreur lors de la génération du PDF");
    } finally {
      setLoading(false);
    }
  };

  const getServiceName = (id: string) => {
    const services: Record<string, string> = {
      deco: "Décoration & Design Intérieur",
      mortuaire: "Décoration Mortuaire",
      africaine: "Décoration Africaine",
      art: "Art Floral & Confection",
      logistique: "Logistique & Location"
    };
    return services[id] || id;
  };

  const getBudgetName = (id: string) => {
    const budgets: Record<string, string> = {
      under100k: "Moins de 100 000 FCFA",
      "100k-300k": "100 000 - 300 000 FCFA",
      "300k-1M": "300 000 - 1 000 000 FCFA",
      above1M: "Plus de 1 000 000 FCFA",
      sur_devis: "Sur devis uniquement"
    };
    return budgets[id] || id;
  };

  const OrderPreview = ({ showSubmit = true, onClose }: { showSubmit?: boolean, onClose?: () => void }) => (
    <div className="bg-white p-8 md:p-12 border border-luxury-border shadow-2xl max-w-4xl w-full mx-auto font-serif text-luxury-ink">
       <div ref={previewRef} className="bg-white p-10 border-luxury-border border">
          <div className="flex justify-between items-start border-b border-luxury-border/30 pb-8 mb-8">
            <div>
               <img src="/PHOTO-2026-04-28-14-16-16-removebg-preview.png" alt="Logo" className="w-28 mb-4" />
               <p className="text-[12px] uppercase tracking-widest text-luxury-muted">Maison Florale & Design</p>
            </div>
            <div className="text-right">
               <h2 className="text-4xl uppercase tracking-widest mb-1">Bon de Commande</h2>
               <p className="text-base text-luxury-muted">
                 N° {Math.floor(Math.random() * 9999).toString().padStart(4, '0')}-{(new Date().getMonth() + 1).toString().padStart(2, '0')}-{new Date().getFullYear().toString().slice(-2)}
               </p>
               <p className="text-base text-luxury-muted mt-2">{new Date().toLocaleDateString("fr-FR")}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-12 mb-12">
             <div>
                <p className="text-[12px] uppercase tracking-[0.2em] text-luxury-gold mb-3">Client</p>
                <p className="text-xl font-medium mb-1">{formData.customerName}</p>
                <p className="text-sm text-luxury-muted mb-1">{formData.customerEmail}</p>
                <p className="text-sm text-luxury-muted">{formData.customerPhone}</p>
             </div>
             <div>
                <p className="text-[12px] uppercase tracking-[0.2em] text-luxury-gold mb-3">Prestataire</p>
                <p className="text-lg italic font-medium">Ô Belles Fleurs</p>
                <p className="text-sm text-luxury-muted italic">Maison Florale & Design</p>
                <p className="text-sm text-luxury-muted">Kribi, Cameroun</p>
                <p className="text-sm text-luxury-muted">+237 6 97 30 94 41</p>
                <p className="text-sm text-luxury-muted">obellefleurs@gmail.com</p>
             </div>
          </div>

          <div className="mb-12">
             <table className="w-full text-left text-base">
                <thead>
                   <tr className="border-b border-luxury-border text-[12px] uppercase tracking-widest text-luxury-muted">
                      <th className="py-4 font-normal">Description de la prestation</th>
                      <th className="py-4 font-normal text-right">Informations</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-luxury-border/10">
                   <tr>
                      <td className="py-5">Service Principal</td>
                      <td className="py-5 text-right font-medium">{getServiceName(formData.serviceType)}</td>
                   </tr>
                   <tr>
                      <td className="py-5">Occasion</td>
                      <td className="py-5 text-right text-luxury-muted">{formData.occasion}</td>
                   </tr>
                   <tr>
                      <td className="py-5">Date de l'événement</td>
                      <td className="py-5 text-right text-luxury-muted">{new Date(formData.date).toLocaleDateString("fr-FR")}</td>
                   </tr>
                   <tr>
                      <td className="py-5">Budget Estimé</td>
                      <td className="py-5 text-right text-luxury-gold font-bold">{getBudgetName(formData.budget)}</td>
                   </tr>
                </tbody>
             </table>
          </div>

          <div className="mb-12">
             <p className="text-[12px] uppercase tracking-widest text-luxury-gold mb-4 underline">Détails et Exigences Spécifiques</p>
             <p className="text-sm text-luxury-muted leading-relaxed whitespace-pre-wrap italic bg-luxury-beige/30 p-6 border-l-2 border-luxury-gold">
                "{formData.details}"
             </p>
          </div>

          <div className="border-t border-luxury-border pt-8 text-[11px] text-luxury-muted text-center italic">
             Ce document constitue une expression de besoin. Un devis final et définitif vous sera transmis après étude technique par nos équipes.
          </div>
       </div>

       {showSubmit && (
         <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <button 
              onClick={onClose}
              className="flex-1 py-4 border border-luxury-ink text-luxury-ink text-[10px] uppercase tracking-widest font-bold hover:bg-luxury-beige transition-all flex items-center justify-center gap-2"
            >
               <X size={14} /> Modifier
            </button>
            <button 
              onClick={handleDownloadPDF}
              disabled={loading}
              className="flex-1 py-4 border border-luxury-gold text-luxury-gold text-[10px] uppercase tracking-widest font-bold hover:bg-luxury-beige transition-all flex items-center justify-center gap-2"
            >
               <Download size={14} /> {loading ? "Traitement..." : "Télécharger PDF"}
            </button>
            <button 
              onClick={handleSubmit}
              disabled={loading}
              className="flex-[2] py-4 bg-luxury-ink text-white text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-luxury-gold transition-all shadow-xl shadow-black/10 flex items-center justify-center gap-2"
            >
               <Send size={14} /> {loading ? "Envoi..." : "Confirmer et Envoyer"}
            </button>
         </div>
       )}
    </div>
  );

  if (submitted) {
    return (
      <div className="pt-28 pb-20 min-h-screen flex items-center justify-center bg-luxury-beige px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full"
        >
          <div className="bg-white p-8 md:p-12 border border-luxury-border shadow-2xl text-center mb-6">
            <CheckCircle2 className="w-16 h-16 text-luxury-gold mx-auto mb-6" />
            <h2 className="text-3xl font-serif text-luxury-ink mb-4">Demande Envoyée</h2>
            <p className="text-luxury-muted font-light italic mb-8">
              Nous avons bien reçu votre demande de devis. Un maître de notre maison vous contactera sous 24 heures pour finaliser votre projet.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <button 
                 onClick={handleDownloadPDF}
                 className="py-4 border border-luxury-gold text-luxury-gold text-[11px] uppercase tracking-widest font-bold hover:bg-luxury-beige transition-all flex items-center justify-center gap-2"
               >
                 <Download size={14} /> Télécharger le Bon
               </button>
               <button 
                 onClick={() => setSubmitted(false)}
                 className="py-4 bg-luxury-ink text-white text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-luxury-gold transition-all"
               >
                 Fermer
               </button>
            </div>
          </div>
          
          <div className="hidden">
             <OrderPreview showSubmit={false} />
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-24 md:pt-28 pb-20 bg-luxury-beige min-h-screen">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="bg-white border border-luxury-border shadow-2xl overflow-hidden flex flex-col md:flex-row"
        >
          {/* Form Side */}
          <div className="flex-1 p-8 md:p-12 lg:p-16">
            <span className="text-[10px] uppercase tracking-[0.4em] text-luxury-gold mb-4 block">Conciergerie</span>
            <h1 className="text-3xl md:text-4xl font-serif text-luxury-ink mb-8">Demande de Devis</h1>
            
            <form onSubmit={(e) => { e.preventDefault(); setShowPreview(true); }} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-luxury-muted font-bold">Nom Complet</label>
                  <input 
                    required
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleChange}
                    type="text" 
                    className="w-full bg-transparent border-b border-luxury-border py-2 focus:border-luxury-gold outline-none transition-colors text-luxury-ink font-light"
                    placeholder="Votre nom..."
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-luxury-muted font-bold">Email</label>
                  <input 
                    required
                    name="customerEmail"
                    value={formData.customerEmail}
                    onChange={handleChange}
                    type="email" 
                    className="w-full bg-transparent border-b border-luxury-border py-2 focus:border-luxury-gold outline-none transition-colors text-luxury-ink font-light"
                    placeholder="votre@email.com"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-luxury-muted font-bold">Téléphone</label>
                  <input 
                    required
                    name="customerPhone"
                    value={formData.customerPhone}
                    onChange={handleChange}
                    type="tel" 
                    className="w-full bg-transparent border-b border-luxury-border py-2 focus:border-luxury-gold outline-none transition-colors text-luxury-ink font-light"
                    placeholder="+237 6..."
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-[0.2em] text-luxury-muted font-bold">Service Souhaité</label>
                <select 
                  required
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-luxury-border py-2 focus:border-luxury-gold outline-none transition-colors text-luxury-ink font-light appearance-none"
                >
                  <option value="">Sélectionnez un service</option>
                  <option value="deco">Décoration & Design Intérieur</option>
                  <option value="mortuaire">Décoration Mortuaire</option>
                  <option value="africaine">Décoration Africaine</option>
                  <option value="art">Art Floral & Confection</option>
                  <option value="logistique">Logistique & Location</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-luxury-muted font-bold">Occasion / Type d'événement</label>
                  <select 
                    required
                    name="occasion"
                    value={formData.occasion}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-luxury-border py-2 focus:border-luxury-gold outline-none transition-colors text-luxury-ink font-light appearance-none"
                  >
                    <option value="">Sélectionnez l'occasion</option>
                    <option value="mariage">Mariage</option>
                    <option value="anniversaire">Anniversaire</option>
                    <option value="naissance">Naissance</option>
                    <option value="deuil">Deuil</option>
                    <option value="entreprise">Événement d'entreprise</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-luxury-muted font-bold">Date souhaitée</label>
                  <input 
                    required
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    type="date" 
                    className="w-full bg-transparent border-b border-luxury-border py-2 focus:border-luxury-gold outline-none transition-colors text-luxury-ink font-light"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-[0.2em] text-luxury-muted font-bold">Budget estimé (FCFA)</label>
                <select 
                  required
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-luxury-border py-2 focus:border-luxury-gold outline-none transition-colors text-luxury-ink font-light appearance-none"
                >
                  <option value="">Sélectionnez votre budget</option>
                  <option value="under100k">Moins de 100 000 FCFA</option>
                  <option value="100k-300k">100 000 - 300 000 FCFA</option>
                  <option value="300k-1M">300 000 - 1 000 000 FCFA</option>
                  <option value="above1M">Plus de 1 000 000 FCFA</option>
                  <option value="sur_devis">Sur devis uniquement</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-[0.2em] text-luxury-muted font-bold">Détails du Projet</label>
                <textarea 
                  required
                  name="details"
                  value={formData.details}
                  onChange={handleChange}
                  rows={4}
                  className="w-full bg-transparent border border-luxury-border p-4 focus:border-luxury-gold outline-none transition-colors text-luxury-ink font-light resize-none"
                  placeholder="Décrivez votre besoin..."
                />
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full py-5 bg-luxury-ink text-white text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-luxury-gold transition-all shadow-xl shadow-black/10 flex items-center justify-center gap-3 disabled:opacity-50"
              >
                Accéder à la prévisualisation <Eye size={16} />
              </button>
            </form>
          </div>

          {/* Info Side */}
          <div className="w-full md:w-1/3 bg-luxury-ink p-8 md:p-12 text-white flex flex-col justify-center">
            <h3 className="text-xl font-serif mb-8 text-luxury-gold">Accompagnement Personnalisé</h3>
            <p className="text-sm font-light leading-relaxed mb-8 opacity-70 italic text-white/80">
              "Chaque projet est unique. Nous mettons notre expertise à votre service pour créer des ambiances qui vous ressemblent."
            </p>
            <div className="space-y-6">
              <div>
                <p className="text-[9px] uppercase tracking-[0.2em] text-luxury-gold mb-2">Téléphone</p>
                <p className="text-sm font-serif">+237 6 97 30 94 41</p>
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-[0.2em] text-luxury-gold mb-2">Email</p>
                <p className="text-sm font-serif">obellefleurs@gmail.com</p>
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-[0.2em] text-luxury-gold mb-2">Atelier & Boutique</p>
                <p className="text-sm font-serif">Kribi, Cameroun</p>
              </div>
              <div className="pt-4 border-t border-white/10">
                <p className="text-[10px] italic text-white/60">Services et livraisons disponibles dans tout le Cameroun.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Preview Modal Overlay */}
      <AnimatePresence>
        {showPreview && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-luxury-ink/90 backdrop-blur-md flex items-center justify-center p-6 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-4xl my-auto"
            >
              <OrderPreview onClose={() => setShowPreview(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hidden container for rendering PDF from submitted data */}
      <div className="absolute left-[-9999px] top-[-9999px] w-[800px]">
         <div ref={submitted ? previewRef : null}>
            <OrderPreview showSubmit={false} />
         </div>
      </div>
    </div>
  );
}

