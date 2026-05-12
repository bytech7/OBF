/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BackButton from "./components/BackButton";
import { useEffect } from "react";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { UIProvider } from "./context/UIContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ContactModal from "./components/ContactModal";

// Pages
import Home from "./pages/Home";
import Boutique from "./pages/Boutique";
import Collection from "./pages/Collection";
import Services from "./pages/Services";
import Formation from "./pages/Formation";
import Avis from "./pages/Avis";
import Histoire from "./pages/Histoire";
import Devis from "./pages/Devis";
import AdminLogin from "./pages/Admin/Login";
import AdminDashboard from "./pages/Admin/Dashboard";
import { useLocation } from "react-router-dom";

function AppContent() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <main className="relative bg-luxury-beige selection:bg-luxury-gold selection:text-white min-h-screen flex flex-col overflow-x-hidden w-full">
      <Loader />
      {!isAdminPage && <Navbar />}
      {!isAdminPage && <BackButton />}
      <ContactModal />
      
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/boutique" element={<Boutique />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/services" element={<Services />} />
          <Route path="/formation" element={<Formation />} />
          <Route path="/avis" element={<Avis />} />
          <Route path="/histoire" element={<Histoire />} />
          <Route path="/devis" element={<Devis />} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </div>

      {!isAdminPage && <Footer />}
    </main>
  );
}

export default function App() {
  // Smooth scroll implementation (basic)
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  return (
    <AuthProvider>
      <CartProvider>
        <UIProvider>
          <Router>
            <ScrollToTop />
            <AppContent />
          </Router>
        </UIProvider>
      </CartProvider>
    </AuthProvider>
  );
}
