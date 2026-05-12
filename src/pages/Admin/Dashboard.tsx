import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { 
  BarChart3, 
  Package, 
  Settings, 
  Users, 
  User,
  LogOut, 
  Plus, 
  Trash2, 
  Edit2, 
  GraduationCap,
  Grid,
  ChevronRight,
  TrendingUp,
  ShoppingBag,
  ExternalLink,
  Search,
  Upload,
  X,
  Menu,
  Mail,
  Phone,
  Sparkles
} from "lucide-react";
import { api } from "../../services/api";

type Tab = "overview" | "products" | "services" | "collections" | "formations" | "atelier" | "reviews" | "customers" | "reports" | "settings";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [data, setData] = useState({
    products: [] as any[],
    services: [] as any[],
    collections: [] as any[],
    formations: [] as any[],
    reviews: [] as any[],
    customers: [] as any[],
    quotes: [] as any[],
    bouquetConfig: null as any
  });
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) navigate("/admin/login");
    fetchData();
  }, [navigate]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [products, services, collections, formations, reviews, customers, quotes, config] = await Promise.all([
        api.getProducts(),
        api.getServices(),
        api.getCollections(),
        api.getFormations(),
        api.getReviews(),
        api.getCustomers(),
        api.getQuotes(),
        api.getBouquetConfig()
      ]);
      setData({ products, services, collections, formations, reviews, customers, quotes, bouquetConfig: config });
    } catch (err) {
      console.error("Fetch error", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
    navigate("/admin/login");
  };

  const handleDelete = async (type: string, id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cet élément ?")) return;
    try {
      if (type === "products") await api.deleteProduct(id);
      if (type === "services") await api.deleteService(id);
      if (type === "collections") await api.deleteCollection(id);
      if (type === "formations") await api.deleteFormation(id);
      if (type === "reviews") await api.deleteReview(id);
      fetchData();
    } catch (err) {
      alert("Erreur lors de la suppression");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { ...formData };
    if ((activeTab === "products" || activeTab === "formations") && payload.price) {
      payload.price = Number(payload.price);
    }
    
    try {
      if (activeTab === "products") {
        if (editingItem) await api.updateProduct(editingItem.id, payload);
        else await api.createProduct(payload);
      } else if (activeTab === "services") {
        if (editingItem) await api.updateService(editingItem.id, payload);
        else await api.createService(payload);
      } else if (activeTab === "collections") {
        if (editingItem) await api.updateCollection(editingItem.id, payload);
        else await api.createCollection(payload);
      } else if (activeTab === "formations") {
        if (editingItem) await api.updateFormation(editingItem.id, payload);
        else await api.createFormation(payload);
      } else if (activeTab === "reviews") {
        if (editingItem) await api.updateReview(editingItem.id, payload);
        else await api.createReview({ ...payload, date: new Date().toISOString().split('T')[0] });
      }
      setIsModalOpen(false);
      setEditingItem(null);
      setFormData({});
      fetchData();
    } catch (err) {
      alert("Erreur lors de l'enregistrement");
    }
  };

  const openForm = (item: any = null) => {
    setEditingItem(item);
    setFormData(item || {});
    setImagePreview(item?.image || null);
    setIsModalOpen(true);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setFormData({ ...formData, image: base64String });
      setImagePreview(base64String);
      setUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const SidebarItem = ({ id, icon: Icon, label }: { id: Tab, icon: any, label: string }) => (
    <button
      id={`nav-${id}`}
      onClick={() => {
        setActiveTab(id);
        setIsSidebarOpen(false);
      }}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
        activeTab === id 
          ? "bg-luxury-gold text-white shadow-lg" 
          : "text-luxury-muted hover:bg-luxury-beige"
      }`}
    >
      <Icon size={20} />
      <span className="font-medium text-sm md:text-base">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-luxury-beige flex relative">
      {/* Sidebar Mobile Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={`
        w-64 bg-white border-r border-luxury-border/30 p-6 flex flex-col fixed h-full z-50 
        transition-transform duration-300 lg:translate-x-0
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <div className="mb-10 flex items-center justify-between">
          <img 
            src="/PHOTO-2026-04-28-14-16-16-removebg-preview.png" 
            alt="Logo" 
            className="w-20 md:w-24"
          />
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden p-2 text-luxury-muted"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="space-y-1 flex-1 overflow-y-auto">
          <SidebarItem id="overview" icon={BarChart3} label="Tableau de bord" />
          <SidebarItem id="reports" icon={TrendingUp} label="Analytique" />
          <SidebarItem id="products" icon={Package} label="Produits" />
          <SidebarItem id="services" icon={Settings} label="Services" />
          <SidebarItem id="collections" icon={Grid} label="Collections" />
          <SidebarItem id="formations" icon={GraduationCap} label="Formations" />
          <SidebarItem id="atelier" icon={Sparkles} label="Atelier" />
          <SidebarItem id="reviews" icon={Users} label="Avis" />
          <SidebarItem id="customers" icon={Users} label="Clients" />
          <SidebarItem id="settings" icon={Settings} label="Système" />
        </nav>

        <button
          id="logout-btn"
          onClick={handleLogout}
          className="mt-6 flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-all font-medium text-sm md:text-base"
        >
          <LogOut size={20} />
          Déconnexion
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 p-4 md:p-8 min-w-0">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 bg-white rounded-lg border border-luxury-border/30 text-luxury-ink shadow-sm"
            >
              <Menu size={20} />
            </button>
            <div>
              <h1 className="text-2xl md:text-3xl font-serif text-luxury-ink capitalize">{activeTab.replace("_", " ")}</h1>
              <p className="text-luxury-muted text-sm mt-1">Gérez votre contenu en temps réel</p>
            </div>
          </div>

          <div className="flex items-center justify-between md:justify-end gap-3 md:gap-4">
             <Link 
               to="/"
               className="text-[10px] md:text-[11px] uppercase tracking-widest text-luxury-muted hover:text-luxury-gold transition-all flex items-center gap-2"
             >
               <ExternalLink size={14} /> <span className="hidden sm:inline">Voir le site</span>
             </Link>
             <div className="flex items-center gap-3 md:gap-4">
               {activeTab !== "overview" && activeTab !== "customers" && (
                  <button
                    id="add-btn"
                    onClick={() => openForm()}
                    className="bg-luxury-ink text-white px-4 md:px-6 py-2 md:py-2.5 rounded-full flex items-center gap-2 hover:bg-luxury-ink/90 transition-all shadow-md text-sm md:text-base"
                  >
                    <Plus size={20} />
                    <span className="hidden xs:inline">Ajouter</span>
                  </button>
               )}
               <div className="h-9 w-9 md:h-10 md:w-10 bg-luxury-gold/10 rounded-full flex items-center justify-center text-luxury-gold border border-luxury-gold/20 flex-shrink-0">
                 <User className="text-luxury-gold" size={18} />
               </div>
             </div>
          </div>
        </header>

        {loading ? (
          <div className="flex items-center justify-center h-64">
             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-luxury-gold"></div>
          </div>
        ) : (
          <div className="space-y-8">
            {activeTab === "overview" && <Overview data={data} />}
            {activeTab === "reports" && <Reports data={data} />}
            {activeTab === "products" && <DataTable items={data.products} onDelete={(id) => handleDelete("products", id)} onEdit={openForm} />}
            {activeTab === "services" && <DataTable items={data.services} onDelete={(id) => handleDelete("services", id)} onEdit={openForm} />}
            {activeTab === "collections" && <DataTable items={data.collections} onDelete={(id) => handleDelete("collections", id)} onEdit={openForm} />}
            {activeTab === "formations" && <DataTable items={data.formations} onDelete={(id) => handleDelete("formations", id)} onEdit={openForm} />}
            {activeTab === "reviews" && <DataTable items={data.reviews.map(r => ({ ...r, name: r.customerName, description: r.comment, details: `Note: ${r.rating}/5` }))} onDelete={(id) => handleDelete("reviews", id)} onEdit={openForm} />}
            {activeTab === "atelier" && <AtelierManagement config={data.bouquetConfig} fetchData={fetchData} />}
            {activeTab === "customers" && <CustomerTable items={data.customers} />}
            {activeTab === "settings" && <DataManagement fetchData={fetchData} />}
          </div>
        )}
      </main>

      {/* Modal / Form */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-8 max-h-[90vh] overflow-y-auto"
            >
              <h2 className="text-2xl font-serif text-luxury-ink mb-6">
                {editingItem ? "Modifier" : "Ajouter"} {activeTab}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="col-span-2">
                     <label className="block text-sm font-medium mb-1">
                       {activeTab === "reviews" ? "Nom du client" : "Titre / Nom"}
                     </label>
                     <input 
                       id="form-title"
                       type="text" 
                       value={formData.name || formData.title || formData.customerName || ""} 
                       onChange={(e) => setFormData({...formData, name: e.target.value, title: e.target.value, customerName: e.target.value})} 
                       className="w-full px-4 py-2 border rounded-lg"
                       required
                     />
                   </div>
                   <div className="col-span-2">
                     <label className="block text-sm font-medium mb-1">
                       {activeTab === "reviews" ? "Commentaire" : "Description"}
                     </label>
                     <textarea 
                       id="form-desc"
                       value={formData.description || formData.comment || ""} 
                       onChange={(e) => setFormData({...formData, description: e.target.value, comment: e.target.value})} 
                       className="w-full px-4 py-2 border rounded-lg h-24"
                     />
                   </div>
                   {activeTab === "reviews" && (
                     <div>
                       <label className="block text-sm font-medium mb-1">Note /5</label>
                       <select 
                         value={formData.rating || 5} 
                         onChange={(e) => setFormData({...formData, rating: Number(e.target.value)})}
                         className="w-full px-4 py-2 border rounded-lg"
                       >
                         {[1,2,3,4,5].map(n => <option key={n} value={n}>{n} / 5</option>)}
                       </select>
                     </div>
                   )}
                   {(activeTab === "products" || activeTab === "formations") && (
                     <div>
                       <label className="block text-sm font-medium mb-1">Prix (CFA)</label>
                       <input 
                         id="form-price"
                         type="number" 
                         value={formData.price || ""} 
                         onChange={(e) => setFormData({...formData, price: e.target.value})} 
                         className="w-full px-4 py-2 border rounded-lg"
                       />
                     </div>
                   )}
                   <div className="col-span-2">
                     <label className="block text-sm font-medium mb-1">Image</label>
                     <div className="flex flex-col md:flex-row gap-4 items-start">
                       <div className="w-full md:w-48 h-32 rounded-xl bg-gray-50 border-2 border-dashed border-luxury-border flex items-center justify-center overflow-hidden group relative">
                         {imagePreview ? (
                           <>
                             <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                             <button 
                               type="button"
                               onClick={() => { setImagePreview(null); setFormData({...formData, image: ""}); }}
                               className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                             >
                               <X size={14} />
                             </button>
                           </>
                         ) : (
                           <div className="text-luxury-muted flex flex-col items-center text-center p-4">
                             <Upload size={24} className="mb-2" />
                             <span className="text-[10px] uppercase font-bold tracking-wider">Aucune image</span>
                           </div>
                         )}
                       </div>
                       <div className="flex-1 w-full space-y-3">
                         <div className="relative">
                           <input 
                             type="file" 
                             accept="image/*"
                             onChange={handleImageUpload}
                             className="absolute inset-0 opacity-0 cursor-pointer z-10"
                             id="file-upload"
                           />
                           <button 
                             type="button"
                             className="w-full px-4 py-2 border-2 border-luxury-ink rounded-lg text-luxury-ink font-bold text-xs uppercase tracking-widest hover:bg-luxury-ink hover:text-white transition-all flex items-center justify-center gap-2"
                           >
                             <Upload size={16} />
                             {uploading ? "Téléchargement..." : "Choisir une photo"}
                           </button>
                         </div>
                         <div className="relative">
                           <div className="text-[10px] text-luxury-muted uppercase tracking-widest mb-1 font-bold">Ou URL directe</div>
                           <input 
                             id="form-image"
                             type="text" 
                             value={formData.image || ""} 
                             placeholder="https://..."
                             onChange={(e) => {
                               setFormData({...formData, image: e.target.value});
                               setImagePreview(e.target.value);
                             }} 
                             className="w-full px-4 py-2 border rounded-lg text-sm"
                           />
                         </div>
                       </div>
                     </div>
                   </div>
                   {activeTab === "products" && (
                      <div>
                        <label className="block text-sm font-medium mb-1">Catégorie</label>
                        <select 
                          id="form-category"
                          value={formData.category || ""} 
                          onChange={(e) => setFormData({...formData, category: e.target.value})} 
                          className="w-full px-4 py-2 border rounded-lg"
                        >
                          <option value="">Sélectionner</option>
                          <option value="MARIAGE">MARIAGE</option>
                          <option value="SAINT-VALENTIN">SAINT-VALENTIN</option>
                          <option value="ANNIVERSAIRE">ANNIVERSAIRE</option>
                          <option value="NAISSANCE">NAISSANCE</option>
                          <option value="DEUIL">DEUIL</option>
                          <option value="DÉCORATION">DÉCORATION</option>
                          <option value="ORNEMENTS">ORNEMENTS</option>
                        </select>
                      </div>
                   )}
                   {activeTab === "services" && (
                      <div>
                        <label className="block text-sm font-medium mb-1">Catégorie</label>
                        <select 
                          id="form-category-service"
                          value={formData.category || ""} 
                          onChange={(e) => setFormData({...formData, category: e.target.value})} 
                          className="w-full px-4 py-2 border rounded-lg"
                        >
                          <option value="">Sélectionner</option>
                          <option value="Intérieur">Intérieur</option>
                          <option value="Cérémonie">Cérémonie</option>
                          <option value="Culture">Culture</option>
                          <option value="Sur Mesure">Sur Mesure</option>
                          <option value="Événementiel">Événementiel</option>
                        </select>
                      </div>
                   )}
                   {activeTab === "collections" && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">Sous-titre</label>
                          <input 
                            id="form-subtitle"
                            type="text" 
                            value={formData.subtitle || ""} 
                            onChange={(e) => setFormData({...formData, subtitle: e.target.value})} 
                            className="w-full px-4 py-2 border rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Catégorie</label>
                          <select 
                            id="form-category-collection"
                            value={formData.category || ""} 
                            onChange={(e) => setFormData({...formData, category: e.target.value})} 
                            className="w-full px-4 py-2 border rounded-lg"
                          >
                            <option value="">Sélectionner</option>
                            <option value="MARIAGE">MARIAGE</option>
                            <option value="DÉCORATION">DÉCORATION</option>
                            <option value="ORNEMENTS">ORNEMENTS</option>
                          </select>
                        </div>
                      </div>
                   )}
                </div>
                <div className="flex justify-end gap-4 pt-6">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2 border rounded-full">Annuler</button>
                  <button type="submit" className="px-8 py-2 bg-luxury-ink text-white rounded-full hover:bg-luxury-ink/90">Enregistrer</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  AreaChart, 
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';

function Reports({ data }: { data: any }) {
  // Simulated sales data for analytics
  const salesData = [
    { name: 'Jan', revenue: 1200000, orders: 12 },
    { name: 'Fév', revenue: 1850000, orders: 15 },
    { name: 'Mar', revenue: 1400000, orders: 11 },
    { name: 'Avr', revenue: 2300000, orders: 20 },
    { name: 'Mai', revenue: 2100000, orders: 18 },
    { name: 'Juin', revenue: 2800000, orders: 25 },
  ];

  const categoryData = [
    { name: 'Mariage', value: 40 },
    { name: 'Décoration', value: 25 },
    { name: 'Anniversaire', value: 20 },
    { name: 'Ornements', value: 10 },
    { name: 'Autre', value: 5 },
  ];

  const COLORS = ['#D4AF37', '#1A1A1A', '#8E8E8E', '#F5E6D3'];

  const totalRevenue = salesData.reduce((acc, curr) => acc + curr.revenue, 0);
  const totalOrders = salesData.reduce((acc, curr) => acc + curr.orders, 0);
  const avgOrderValue = totalRevenue / totalOrders;

  return (
    <div className="space-y-8 pb-10">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-luxury-border/30 shadow-sm">
          <p className="text-luxury-muted text-xs font-bold uppercase tracking-widest mb-1">Chiffre d'Affaires Total</p>
          <h3 className="text-3xl font-serif text-luxury-ink">{totalRevenue.toLocaleString()} CFA</h3>
          <div className="flex items-center gap-1 mt-2 text-emerald-600 text-sm">
            <TrendingUp size={14} />
            <span>+12.5% vs mois dernier</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-luxury-border/30 shadow-sm">
          <p className="text-luxury-muted text-xs font-bold uppercase tracking-widest mb-1">Nombre de Ventes</p>
          <h3 className="text-3xl font-serif text-luxury-ink">{totalOrders}</h3>
          <div className="flex items-center gap-1 mt-2 text-emerald-600 text-sm">
            <TrendingUp size={14} />
            <span>+8.2% vs mois dernier</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-luxury-border/30 shadow-sm">
          <p className="text-luxury-muted text-xs font-bold uppercase tracking-widest mb-1">Panier Moyen</p>
          <h3 className="text-3xl font-serif text-luxury-ink">{Math.round(avgOrderValue).toLocaleString()} CFA</h3>
          <div className="flex items-center gap-1 mt-2 text-luxury-gold text-sm font-medium">
            <span>Stabilité relative</span>
          </div>
        </div>
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-2xl border border-luxury-border/30 shadow-sm">
          <h4 className="text-lg font-serif mb-8">Évolution du Chiffre d'Affaires</h4>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F5F5F5" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#8E8E8E' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#8E8E8E' }} tickFormatter={(val) => `${val/1000}k`} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  formatter={(val: number) => [`${val.toLocaleString()} CFA`, 'Chiffre d\'affaires']}
                />
                <Area type="monotone" dataKey="revenue" stroke="#D4AF37" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-luxury-border/30 shadow-sm">
          <h4 className="text-lg font-serif mb-8">Ventes par Catégorie</h4>
          <div className="h-80 w-full flex flex-col items-center">
            <ResponsiveContainer width="100%" height="80%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                   contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-4 mt-4 w-full">
               {categoryData.map((cat, i) => (
                 <div key={i} className="flex items-center gap-2">
                   <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                   <span className="text-xs text-luxury-ink font-medium">{cat.name}</span>
                   <span className="text-xs text-luxury-muted ml-auto">{cat.value}%</span>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </div>

      {/* Comparative Section */}
      <div className="bg-luxury-ink text-white p-8 rounded-2xl shadow-xl overflow-hidden relative">
        <div className="relative z-10">
          <h3 className="text-2xl font-serif mb-4">Analyse Comparative</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <p className="text-luxury-muted leading-relaxed">
                Le chiffre d'affaires du mois de Juin a connu une augmentation de <span className="text-luxury-gold font-bold">25%</span> par rapport à Mai, principalement portée par la collection de <span className="font-bold">Mariage</span> qui représente <span className="text-luxury-gold font-bold">45%</span> de votre activité totale ce trimestre.
              </p>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex-1 p-4 bg-white/5 rounded-xl border border-white/10">
                   <span className="block text-luxury-muted text-[10px] uppercase tracking-widest mb-1 font-bold">Objectif Q2</span>
                   <span className="text-lg font-serif">Atteint à 105%</span>
                </div>
                <div className="flex-1 p-4 bg-white/5 rounded-xl border border-white/10">
                   <span className="block text-luxury-muted text-[10px] uppercase tracking-widest mb-1 font-bold">Panier Moyen vs 2025</span>
                   <span className="text-lg font-serif">+15,000 CFA</span>
                </div>
              </div>
            </div>
            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
              <h5 className="text-luxury-gold text-sm uppercase tracking-widest font-bold mb-4">Recommandations Analytiques</h5>
              <ul className="space-y-3 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <div className="mt-1 w-1 h-1 rounded-full bg-luxury-gold shrink-0" />
                  <span>Augmenter le stock de fleurs blanches pour la saison des mariages.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 w-1 h-1 rounded-full bg-luxury-gold shrink-0" />
                  <span>Lancer une campagne ciblée sur la "Décoration d'Intérieur" pour équilibrer les ventes hors-saison.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 w-1 h-1 rounded-full bg-luxury-gold shrink-0" />
                  <span>Réviser les tarifs des formations "Prestige" au vu de la forte demande du trimestre.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* Background Accent */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-luxury-gold/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
      </div>
    </div>
  );
}

function Overview({ data }: { data: any }) {
  const stats = [
    { label: "Produits", value: data.products.length, icon: Package, color: "text-blue-500", bg: "bg-blue-50" },
    { label: "Services", value: data.services.length, icon: Settings, color: "text-purple-500", bg: "bg-purple-50" },
    { label: "Formations", value: data.formations.length, icon: GraduationCap, color: "text-emerald-500", bg: "bg-emerald-50" },
    { label: "Clients", value: data.customers.length, icon: Users, color: "text-luxury-gold", bg: "bg-luxury-gold/10" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, i) => (
        <motion.div 
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="bg-white p-6 rounded-2xl shadow-sm border border-luxury-border/30"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`${stat.bg} ${stat.color} p-3 rounded-xl`}>
              <stat.icon size={24} />
            </div>
            <TrendingUp size={16} className="text-gray-400" />
          </div>
          <p className="text-luxury-muted text-sm font-medium">{stat.label}</p>
          <h3 className="text-3xl font-serif text-luxury-ink mt-1">{stat.value}</h3>
        </motion.div>
      ))}

      <div className="col-span-full bg-white p-8 rounded-2xl border border-luxury-border/30 shadow-sm">
        <h3 className="text-xl font-serif text-luxury-ink mb-6 flex items-center gap-2">
           <ShoppingBag size={20} className="text-luxury-gold" />
           Demandes de Devis Récentes
        </h3>
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-luxury-muted text-sm border-b pb-4">
                <th className="pb-4 font-medium">Client</th>
                <th className="pb-4 font-medium">Service</th>
                <th className="pb-4 font-medium">Date</th>
                <th className="pb-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-luxury-border/10">
              {data.quotes.slice(-5).reverse().map((quote: any, i: number) => (
                <tr key={i} className="hover:bg-luxury-beige/30 transition-colors group">
                  <td className="py-4">
                    <p className="font-medium text-luxury-ink">{quote.customerName}</p>
                    <p className="text-xs text-luxury-muted">{quote.customerEmail}</p>
                  </td>
                  <td className="py-4 text-sm">{quote.serviceType || "Sur Mesure"}</td>
                  <td className="py-4 text-sm text-luxury-muted">{new Date(quote.date || Date.now()).toLocaleDateString("fr-FR")}</td>
                  <td className="py-4 text-right">
                    <button className="p-2 hover:bg-luxury-gold/10 rounded-lg text-luxury-gold transition-all">
                      <ExternalLink size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="md:hidden divide-y divide-luxury-border/10">
          {data.quotes.slice(-5).reverse().map((quote: any, i: number) => (
            <div key={i} className="py-4 space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium text-luxury-ink">{quote.customerName}</p>
                  <p className="text-xs text-luxury-muted">{quote.customerEmail}</p>
                </div>
                <button className="p-2 bg-luxury-gold/10 rounded-lg text-luxury-gold">
                  <ExternalLink size={14} />
                </button>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="bg-luxury-beige px-2 py-1 rounded text-luxury-muted">{quote.serviceType || "Sur Mesure"}</span>
                <span className="text-luxury-muted font-medium">{new Date(quote.date || Date.now()).toLocaleDateString("fr-FR")}</span>
              </div>
            </div>
          ))}
        </div>

        {data.quotes.length === 0 && (
          <div className="py-8 text-center text-luxury-muted text-sm border-t border-luxury-border/10">Aucune demande pour le moment</div>
        )}
      </div>
    </div>
  );
}

function DataTable({ items, onDelete, onEdit }: { items: any[], onDelete: (id: string) => void, onEdit: (item: any) => void }) {
  const [search, setSearch] = useState("");
  const filteredItems = items.filter(item => 
    (item.name || item.title || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white rounded-2xl border border-luxury-border/30 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-luxury-border/30 flex items-center gap-3">
        <Search size={18} className="text-luxury-muted" />
        <input 
          type="text" 
          placeholder="Rechercher..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-transparent outline-none text-sm"
        />
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-luxury-beige/20 text-luxury-muted text-xs uppercase tracking-wider">
              <th className="px-6 py-4 font-medium">Élément</th>
              <th className="px-6 py-4 font-medium">Prix / Détails</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-luxury-border/10">
            {filteredItems.map((item) => (
              <tr key={item.id} className="hover:bg-luxury-beige/30 transition-all group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-lg bg-gray-100 overflow-hidden border border-luxury-border/20 flex-shrink-0">
                      {item.image ? (
                        <img src={item.image} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                          <Package size={20} />
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-luxury-ink">{item.name || item.title}</p>
                      <p className="text-xs text-luxury-muted truncate max-w-[200px]">{item.description}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-luxury-gold">
                    {item.price ? `${(typeof item.price === 'number' ? item.price.toLocaleString('fr-FR') : item.price)} FCFA` : (item.category || "Standard")}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => onEdit(item)} className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors">
                      <Edit2 size={16} />
                    </button>
                    <button onClick={() => onDelete(item.id)} className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden divide-y divide-luxury-border/10">
        {filteredItems.map((item) => (
          <div key={item.id} className="p-4 flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-xl bg-gray-50 border border-luxury-border/20 overflow-hidden flex-shrink-0">
                {item.image ? (
                  <img src={item.image} alt="" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300">
                    <Package size={24} />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-luxury-ink truncate">{item.name || item.title}</p>
                <p className="text-xs text-luxury-muted line-clamp-1">{item.description}</p>
                <div className="mt-1">
                  <span className="text-sm font-semibold text-luxury-gold">
                    {item.price ? `${(typeof item.price === 'number' ? item.price.toLocaleString('fr-FR') : item.price)} FCFA` : (item.category || "Standard")}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 pt-2 border-t border-luxury-border/5">
              <button 
                onClick={() => onEdit(item)} 
                className="flex-1 flex items-center justify-center gap-2 py-2 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold uppercase tracking-widest"
              >
                <Edit2 size={14} /> Modifier
              </button>
              <button 
                onClick={() => onDelete(item.id)} 
                className="flex-1 flex items-center justify-center gap-2 py-2 bg-red-50 text-red-600 rounded-lg text-xs font-bold uppercase tracking-widest"
              >
                <Trash2 size={14} /> Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="py-12 text-center text-luxury-muted text-sm">Aucun élément trouvé</div>
      )}
    </div>
  );
}

function CustomerTable({ items }: { items: any[] }) {
  return (
    <div className="bg-white rounded-2xl border border-luxury-border/30 shadow-sm overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-luxury-beige/20 text-luxury-muted text-xs uppercase tracking-wider">
              <th className="px-6 py-4 font-medium">Client</th>
              <th className="px-6 py-4 font-medium">Email</th>
              <th className="px-6 py-4 font-medium">Téléphone</th>
              <th className="px-6 py-4 font-medium">Dernière activité</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-luxury-border/10">
            {items.map((client, i) => (
              <tr key={i} className="hover:bg-luxury-beige/30 transition-all">
                <td className="px-6 py-4 font-medium text-luxury-ink">{client.name}</td>
                <td className="px-6 py-4 text-sm">{client.email}</td>
                <td className="px-6 py-4 text-sm">{client.phone}</td>
                <td className="px-6 py-4 text-sm text-luxury-muted">{new Date(client.lastQuoteDate || Date.now()).toLocaleDateString("fr-FR")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden divide-y divide-luxury-border/10">
        {items.map((client, i) => (
          <div key={i} className="p-4 space-y-3">
            <div className="flex justify-between items-start">
              <h4 className="font-serif text-lg text-luxury-ink">{client.name}</h4>
              <span className="text-[10px] uppercase tracking-widest text-luxury-muted bg-luxury-beige px-2 py-1 rounded">
                {new Date(client.lastQuoteDate || Date.now()).toLocaleDateString("fr-FR")}
              </span>
            </div>
            <div className="grid grid-cols-1 gap-2 text-sm">
              <div className="flex items-center gap-2 text-luxury-muted">
                <Mail size={14} className="text-luxury-gold" />
                <span>{client.email}</span>
              </div>
              <div className="flex items-center gap-2 text-luxury-muted">
                <Phone size={14} className="text-luxury-gold" />
                <span>{client.phone}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {items.length === 0 && (
        <div className="py-12 text-center text-luxury-muted text-sm">Aucun client répertorié</div>
      )}
    </div>
  );
}

function DataManagement({ fetchData }: { fetchData: () => void }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleClear = async (entity: string | "all") => {
    const message = entity === "all" 
      ? "Êtes-vous sûr de vouloir supprimer l'INTÉGRALITÉ des données de la boutique ? Cette action est irréversible."
      : `Êtes-vous sûr de vouloir supprimer tous les éléments de la rubrique "${entity}" ?`;
    
    if (!confirm(message)) return;

    setIsDeleting(true);
    try {
      if (entity === "all") {
        await api.clearAllData();
      } else {
        await api.clearEntity(entity);
      }
      alert("Données supprimées avec succès.");
      fetchData();
    } catch (err) {
      alert("Erreur lors de la suppression massive.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white p-8 rounded-2xl border border-luxury-border/30 shadow-sm">
        <h3 className="text-xl font-serif text-luxury-ink mb-2">Gestion des Données</h3>
        <p className="text-luxury-muted text-sm mb-8 italic">
          Options avancées de maintenance. Utilisez ces fonctions avec précaution, elles sont irréversibles.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 border border-luxury-border/30 rounded-xl bg-gray-50 flex flex-col justify-between">
            <div>
              <h4 className="font-bold text-luxury-ink text-sm mb-2">Demandes de Devis</h4>
              <p className="text-xs text-luxury-muted mb-4">Supprime tout l'historique des prises de contact client.</p>
            </div>
            <button 
              disabled={isDeleting}
              onClick={() => handleClear("quotes")}
              className="w-full py-2 bg-red-50 text-red-600 text-[10px] uppercase tracking-widest font-bold border border-red-100 hover:bg-red-600 hover:text-white transition-all rounded-lg"
            >
              Vider l'historique
            </button>
          </div>

          <div className="p-6 border border-luxury-border/30 rounded-xl bg-gray-50 flex flex-col justify-between">
            <div>
              <h4 className="font-bold text-luxury-ink text-sm mb-2">Catalogue Produits</h4>
              <p className="text-xs text-luxury-muted mb-4">Supprime tous les produits de la boutique.</p>
            </div>
            <button 
              disabled={isDeleting}
              onClick={() => handleClear("products")}
              className="w-full py-2 bg-red-50 text-red-600 text-[10px] uppercase tracking-widest font-bold border border-red-100 hover:bg-red-600 hover:text-white transition-all rounded-lg"
            >
              Vider le catalogue
            </button>
          </div>

          <div className="p-6 border border-luxury-border/30 rounded-xl bg-gray-50 flex flex-col justify-between">
            <div>
              <h4 className="font-bold text-luxury-ink text-sm mb-2">Services & Formations</h4>
              <p className="text-xs text-luxury-muted mb-4">Réinitialise les rubriques services et formations.</p>
            </div>
            <div className="flex gap-2">
              <button 
                disabled={isDeleting}
                onClick={() => handleClear("services")}
                className="flex-1 py-2 bg-red-50 text-red-600 text-[10px] uppercase tracking-widest font-bold border border-red-100 rounded-lg"
              >
                Services
              </button>
              <button 
                disabled={isDeleting}
                onClick={() => handleClear("formations")}
                className="flex-1 py-2 bg-red-50 text-red-600 text-[10px] uppercase tracking-widest font-bold border border-red-100 rounded-lg"
              >
                Formations
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-luxury-border/30">
          <div className="bg-red-50 border border-red-200 p-6 rounded-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h4 className="text-red-700 font-serif text-lg mb-1">Zone Critique</h4>
              <p className="text-red-600/80 text-xs">Supprime l'intégralité du contenu de la base de données (Produits, Services, Devis, etc.)</p>
            </div>
            <button 
              disabled={isDeleting}
              onClick={() => handleClear("all")}
              className="px-8 py-4 bg-red-600 text-white text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-red-700 transition-all shadow-xl shadow-red-200 rounded-xl"
            >
              <Trash2 className="inline-block mr-2" size={16} /> 
              Tout réinitialiser
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function AtelierManagement({ config, fetchData }: { config: any; fetchData: () => void }) {
  const [localConfig, setLocalConfig] = useState(config || { pricingType: "fixed", price: 137000, steps: [] });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (config) {
      // Ensure options are in the new object format if they are strings
      const sanitizedSteps = config.steps.map((step: any) => ({
        ...step,
        options: step.options.map((opt: any) => typeof opt === 'string' ? { name: opt, price: 0 } : opt)
      }));
      setLocalConfig({ ...config, steps: sanitizedSteps });
    }
  }, [config]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await api.updateBouquetConfig(localConfig);
      alert("Configuration de l'atelier mise à jour.");
      fetchData();
    } catch (err) {
      alert("Erreur lors de la mise à jour.");
    } finally {
      setIsSaving(false);
    }
  };

  const addStep = () => {
    const newSteps = [...localConfig.steps, { id: localConfig.steps.length + 1, name: "Nouvelle Étape", options: [{ name: "Option 1", price: 0 }] }];
    setLocalConfig({ ...localConfig, steps: newSteps });
  };

  const removeStep = (idx: number) => {
    const newSteps = localConfig.steps.filter((_: any, i: number) => i !== idx).map((s: any, i: number) => ({ ...s, id: i + 1 }));
    setLocalConfig({ ...localConfig, steps: newSteps });
  };

  const updateStepName = (idx: number, name: string) => {
    const newSteps = [...localConfig.steps];
    newSteps[idx].name = name;
    setLocalConfig({ ...localConfig, steps: newSteps });
  };

  const addOption = (stepIdx: number) => {
    const newSteps = [...localConfig.steps];
    newSteps[stepIdx].options.push({ name: "Nouvelle Option", price: 0 });
    setLocalConfig({ ...localConfig, steps: newSteps });
  };

  const removeOption = (stepIdx: number, optIdx: number) => {
    const newSteps = [...localConfig.steps];
    newSteps[stepIdx].options = newSteps[stepIdx].options.filter((_: any, i: number) => i !== optIdx);
    setLocalConfig({ ...localConfig, steps: newSteps });
  };

  const updateOptionName = (stepIdx: number, optIdx: number, name: string) => {
    const newSteps = [...localConfig.steps];
    newSteps[stepIdx].options[optIdx].name = name;
    setLocalConfig({ ...localConfig, steps: newSteps });
  };

  const updateOptionPrice = (stepIdx: number, optIdx: number, price: number) => {
    const newSteps = [...localConfig.steps];
    newSteps[stepIdx].options[optIdx].price = price;
    setLocalConfig({ ...localConfig, steps: newSteps });
  };

  if (!localConfig) return <div className="text-luxury-muted italic">Chargement...</div>;

  return (
    <div className="space-y-8">
      <div className="bg-white p-8 rounded-2xl border border-luxury-border/30 shadow-sm">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h3 className="text-xl font-serif text-luxury-ink mb-1">Configuration de l'Atelier</h3>
            <p className="text-luxury-muted text-sm italic">Gérez les étapes et options de la composition personnalisée.</p>
          </div>
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="px-6 py-2 bg-luxury-gold text-white text-[11px] uppercase tracking-widest font-bold rounded-full shadow-lg shadow-luxury-gold/20 hover:scale-105 transition-transform"
          >
            {isSaving ? "Enregistrement..." : "Sauvegarder"}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="p-6 bg-gray-50 rounded-xl border border-luxury-border/20">
            <label className="text-[10px] uppercase tracking-widest font-bold text-luxury-ink mb-3 block">Type de Tarification</label>
            <div className="flex bg-white border border-luxury-border/30 p-1 rounded-lg">
              <button 
                onClick={() => setLocalConfig({...localConfig, pricingType: 'fixed'})}
                className={`flex-1 py-2 text-[10px] uppercase tracking-widest font-bold rounded ${localConfig.pricingType === 'fixed' ? 'bg-luxury-ink text-white' : 'text-luxury-muted'}`}
              >
                Prix Fixe
              </button>
              <button 
                onClick={() => setLocalConfig({...localConfig, pricingType: 'variable'})}
                className={`flex-1 py-2 text-[10px] uppercase tracking-widest font-bold rounded ${localConfig.pricingType === 'variable' ? 'bg-luxury-ink text-white' : 'text-luxury-muted'}`}
              >
                Prix Variable
              </button>
            </div>
          </div>

          <div className="p-6 bg-gray-50 rounded-xl border border-luxury-border/20">
            <label className="text-[10px] uppercase tracking-widest font-bold text-luxury-ink mb-3 block">
              {localConfig.pricingType === 'fixed' ? "Prix Unique de la Création" : "Prix de Base (FCFA)"}
            </label>
            <input 
              type="number"
              value={localConfig.price}
              onChange={(e) => setLocalConfig({...localConfig, price: parseInt(e.target.value) || 0})}
              className="w-full bg-white border border-luxury-border/30 p-3 rounded-lg focus:outline-none focus:border-luxury-gold"
            />
            {localConfig.pricingType === 'variable' && (
              <p className="text-[10px] text-luxury-muted mt-2 italic">Ce prix s'ajoutera aux options des étapes 1 et 2.</p>
            )}
          </div>
        </div>

        <div className="space-y-6">
          {localConfig.steps.map((step: any, sIdx: number) => (
            <div key={sIdx} className="p-6 border border-luxury-border/30 rounded-xl bg-white relative group">
              <button 
                onClick={() => removeStep(sIdx)}
                className="absolute top-4 right-4 text-red-400 hover:text-red-600 transition-colors opacity-0 group-hover:opacity-100"
              >
                <Trash2 size={18} />
              </button>
              
              <div className="mb-6">
                <label className="text-[10px] uppercase tracking-widest font-bold text-luxury-muted mb-2 block">Nom de l'étape {sIdx + 1}</label>
                <input 
                  type="text"
                  value={step.name}
                  onChange={(e) => updateStepName(sIdx, e.target.value)}
                  className="text-lg font-serif text-luxury-ink bg-transparent border-b border-luxury-border focus:border-luxury-gold outline-none pb-1 w-full max-w-md"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-widest font-bold text-luxury-muted mb-4 block">
                  Options disponibles {(localConfig.pricingType === 'variable' && sIdx < 2) ? "(avec prix additionnel)" : ""}
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                  {step.options.map((opt: any, oIdx: number) => (
                    <div key={oIdx} className="flex flex-col gap-2 p-3 bg-gray-50 border border-luxury-border/20 rounded-lg group/opt relative">
                      <div className="flex gap-2">
                        <input 
                          type="text"
                          value={opt.name}
                          onChange={(e) => updateOptionName(sIdx, oIdx, e.target.value)}
                          placeholder="Nom de l'option"
                          className="flex-1 text-xs p-2 bg-white border border-luxury-border/30 rounded focus:border-luxury-gold outline-none"
                        />
                        <button 
                          onClick={() => removeOption(sIdx, oIdx)}
                          className="text-red-300 hover:text-red-500 transition-colors"
                        >
                          <X size={14} />
                        </button>
                      </div>
                      
                      {localConfig.pricingType === "variable" && sIdx < 2 && (
                        <div className="flex items-center gap-2">
                          <label className="text-[9px] uppercase font-bold text-luxury-muted shrink-0">Prix supp. +</label>
                          <input 
                            type="number"
                            value={opt.price || 0}
                            onChange={(e) => updateOptionPrice(sIdx, oIdx, parseInt(e.target.value) || 0)}
                            className="w-24 text-xs p-1 bg-white border border-luxury-border/30 rounded focus:border-luxury-gold outline-none"
                          />
                          <span className="text-[10px] text-luxury-muted">FCFA</span>
                        </div>
                      )}
                    </div>
                  ))}
                  <button 
                    onClick={() => addOption(sIdx)}
                    className="flex items-center justify-center gap-2 py-4 border border-dashed border-luxury-border/50 text-[10px] uppercase tracking-widest text-luxury-muted hover:text-luxury-gold hover:border-luxury-gold transition-all rounded-lg"
                  >
                    <Plus size={14} /> Ajouter Option
                  </button>
                </div>
              </div>
            </div>
          ))}

          <button 
            onClick={addStep}
            className="w-full py-4 border-2 border-dashed border-luxury-border/30 text-luxury-muted hover:text-luxury-gold hover:border-luxury-gold transition-all rounded-xl flex items-center justify-center gap-3 uppercase text-[11px] tracking-[0.2em] font-bold"
          >
            <Plus size={18} /> Ajouter une Étape au Voyage Sensoriel
          </button>
        </div>
      </div>
    </div>
  );
}
