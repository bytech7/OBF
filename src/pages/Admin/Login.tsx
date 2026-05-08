import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Lock, User, AlertCircle } from "lucide-react";
import { api } from "../../services/api";

export default function AdminLogin() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isLogin) {
        const response = await api.login({ username, password });
        localStorage.setItem("admin_token", response.token);
        localStorage.setItem("admin_user", username);
        navigate("/admin/dashboard");
      } else {
        await api.register({ username, password });
        setIsLogin(true);
        alert("Compte créé avec succès ! Connectez-vous.");
      }
    } catch (err: any) {
      setError(err.message || "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-luxury-beige flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-luxury-border/30"
      >
        <div className="text-center mb-8">
          <img 
            src="/PHOTO-2026-04-28-14-16-16-removebg-preview.png" 
            alt="Logo" 
            className="w-32 mx-auto mb-4"
          />
          <h1 className="text-2xl font-serif text-luxury-ink">
            {isLogin ? "Espace Administrateur" : "Créer un compte Admin"}
          </h1>
          <p className="text-luxury-muted text-sm mt-2">
            {isLogin ? "Connectez-vous pour gérer votre boutique" : "Enregistrez-vous comme administrateur"}
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg flex items-center gap-2 mb-6 text-sm">
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-luxury-ink mb-1">Identifiant</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-luxury-muted" size={18} />
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-luxury-border rounded-lg focus:ring-2 focus:ring-luxury-gold focus:border-transparent outline-none transition-all"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-luxury-ink mb-1">Mot de passe</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-luxury-muted" size={18} />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-luxury-border rounded-lg focus:ring-2 focus:ring-luxury-gold focus:border-transparent outline-none transition-all"
                required
              />
            </div>
          </div>

          <button
            id="login-btn"
            type="submit"
            disabled={loading}
            className="w-full bg-luxury-ink text-white py-3 rounded-lg font-medium hover:bg-luxury-ink/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? "Chargement..." : isLogin ? "Se connecter" : "S'inscrire"}
          </button>

          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="w-full text-sm text-luxury-muted hover:text-luxury-gold transition-colors"
          >
            {isLogin ? "Pas encore de compte ? S'inscrire" : "Déjà un compte ? Se connecter"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
