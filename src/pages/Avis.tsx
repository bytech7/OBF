import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Star, Quote, MessageSquare, Plus } from 'lucide-react';
import { api } from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Avis() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ customerName: '', comment: '', rating: 5 });

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const data = await api.getReviews();
      setReviews(data);
    } catch (err) {
      console.error("Error fetching reviews", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.createReview({
        ...formData,
        date: new Date().toISOString().split('T')[0]
      });
      setIsModalOpen(false);
      setFormData({ customerName: '', comment: '', rating: 5 });
      fetchReviews();
      alert("Merci pour votre avis !");
    } catch (err) {
      alert("Erreur lors de l'envoi de l'avis.");
    }
  };

  return (
    <div className="min-h-screen bg-luxury-beige/20">
      <Navbar />
      
      <main className="pt-32 pb-20 container mx-auto px-6">
        <header className="max-w-3xl mx-auto text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-serif text-luxury-ink mb-6"
          >
            Avis de nos Clients
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-luxury-muted leading-relaxed"
          >
            Découvrez les témoignages de ceux qui nous font confiance pour sublimer leurs plus beaux moments.
          </motion.p>
          
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            onClick={() => setIsModalOpen(true)}
            className="mt-8 bg-luxury-ink text-white px-8 py-3 rounded-full hover:bg-luxury-ink/90 transition-all shadow-lg flex items-center gap-2 mx-auto"
          >
            <Plus size={20} /> Laisser un avis
          </motion.button>
        </header>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-luxury-gold"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review, i) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-3xl border border-luxury-border/30 shadow-sm relative group"
              >
                <Quote className="absolute top-6 right-8 text-luxury-gold/10 group-hover:text-luxury-gold/20 transition-colors" size={60} />
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={16} 
                      className={i < review.rating ? "text-luxury-gold fill-luxury-gold" : "text-gray-200"} 
                    />
                  ))}
                </div>
                <p className="text-luxury-ink italic mb-6 leading-relaxed">
                  "{review.comment}"
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-luxury-ink">{review.customerName}</h4>
                    <p className="text-xs text-luxury-muted">{new Date(review.date).toLocaleDateString()}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>

      {/* Modal Avis */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative bg-white w-full max-w-md rounded-3xl p-8 shadow-2xl"
          >
            <h2 className="text-2xl font-serif mb-6">Votre Témoignage</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nom complet</label>
                <input 
                  type="text"
                  required
                  value={formData.customerName}
                  onChange={(e) => setFormData({...formData, customerName: e.target.value})}
                  className="w-full px-4 py-2 border rounded-xl"
                  placeholder="Jean Dupont"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Note</label>
                <div className="flex gap-2">
                  {[1,2,3,4,5].map(n => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setFormData({...formData, rating: n})}
                      className={`p-2 rounded-lg transition-all ${formData.rating >= n ? 'text-luxury-gold' : 'text-gray-300'}`}
                    >
                      <Star fill={formData.rating >= n ? 'currentColor' : 'none'} size={24} />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Commentaire</label>
                <textarea 
                  required
                  value={formData.comment}
                  onChange={(e) => setFormData({...formData, comment: e.target.value})}
                  className="w-full px-4 py-2 border rounded-xl h-32"
                  placeholder="Partagez votre expérience..."
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-luxury-ink text-white py-3 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-luxury-gold transition-all"
              >
                Publier l'avis
              </button>
            </form>
          </motion.div>
        </div>
      )}

      <Footer />
    </div>
  );
}
