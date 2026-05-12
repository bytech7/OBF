import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Star, Quote, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';

export default function ReviewsSection() {
  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await api.getReviews();
        // Just take the first 3 for the home page
        setReviews(data.slice(0, 3));
      } catch (err) {
        console.error("Error fetching reviews", err);
      }
    };
    fetchReviews();
  }, []);

  if (reviews.length === 0) return null;

  return (
    <section className="py-24 bg-luxury-beige/30 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-[10px] uppercase tracking-[0.4em] text-luxury-gold mb-4 block">Témoignages</span>
            <h2 className="text-4xl md:text-5xl font-serif text-luxury-ink">Ce que nos clients disent</h2>
          </div>
          <Link 
            to="/avis" 
            className="flex items-center gap-2 text-luxury-ink hover:text-luxury-gold transition-colors text-xs font-bold uppercase tracking-widest group"
          >
            Voir tous les avis <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-10 rounded-3xl border border-luxury-border/30 shadow-sm relative group hover:shadow-xl transition-all duration-500"
            >
              <Quote className="absolute top-8 right-10 text-luxury-gold/10 group-hover:text-luxury-gold/20 transition-colors" size={60} />
              
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, starIndex) => (
                  <Star 
                    key={starIndex} 
                    size={14} 
                    className={starIndex < review.rating ? "text-luxury-gold fill-luxury-gold" : "text-gray-200"} 
                  />
                ))}
              </div>

              <p className="text-luxury-ink italic mb-8 leading-relaxed relative z-10">
                "{review.comment}"
              </p>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-luxury-gold/10 flex items-center justify-center text-luxury-gold font-serif">
                  {review.customerName.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-luxury-ink text-sm">{review.customerName}</h4>
                  <p className="text-[10px] text-luxury-muted uppercase tracking-widest">{new Date(review.date).toLocaleDateString()}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
