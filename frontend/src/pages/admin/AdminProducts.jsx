import { useState, useEffect } from "react";
import StatsCard from "../../components/admin/StatsCard";
import ProductsTable from "../../components/admin/ProductsTable";
import api from "../../utils/api";

// ── Product Stats Icons ──
const BoxesIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const AlertIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const ConvIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" 
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
  </svg>
);

const ValueIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get("/admin/products");
      const data = response.data.data;
      setProducts(Array.isArray(data) ? data : (data?.data || []));
    } catch (error) {
      console.error("Erreur lors de la récupération des produits:", error);
    } finally {
      setLoading(false);
    }
  };

  const salesThisMonth = products.length > 0 ? 42890 : 0; // Mock or calculate if available

  const statsCards = [
    {
      label: "Total Produits",
      value: products.length.toLocaleString("fr-FR"),
      icon: <BoxesIcon />,
      iconBg: "rgba(54,83,226,0.06)",
      iconColor: "#3653E2",
    },
    {
      label: "Stock Critique",
      value: products.filter(p => p.stock < 5).length,
      icon: <AlertIcon />,
      iconBg: "#fef2f2",
      iconColor: "#ef4444",
      alert: products.filter(p => p.stock < 5).length > 0
    },
    {
      label: "Ventes du Mois",
      value: `€${salesThisMonth.toLocaleString("fr-FR")}`,
      icon: <ConvIcon />,
      iconBg: "#f8fafc",
      iconColor: "#64748b",
    },
    {
      label: "Produits Actifs",
      value: "98%", // Mocking the % from image
      icon: <CheckCircleIcon />,
      iconBg: "#fff7ed",
      iconColor: "#f97316",
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-12 h-12 border-4 border-[#3653E2]/20 border-t-[#3653E2] rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="animate-fadeIn">
      {/* ── Page Header ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <h1 className="sf-page-title text-3xl font-extrabold tracking-tight">Gestion des Produits</h1>
          <p className="sf-page-subtitle text-slate-500 font-medium">
            Bienvenue dans votre espace d'administration de l'inventaire.
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative group">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[#3653E2] transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input 
              type="text" 
              placeholder="Rechercher un produit, SKU..."
              className="w-full md:w-[280px] h-11 pl-10 pr-4 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:border-[#3653E2] focus:ring-4 focus:ring-[#3653E2]/5 transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button 
            className="flex items-center gap-2 px-5 h-11 bg-[#3653E2] hover:bg-[#2a42c8] text-white text-sm font-bold rounded-xl shadow-lg shadow-[#3653E2]/20 transition-all active:scale-95"
            onClick={() => document.dispatchEvent(new CustomEvent('open-add-product'))}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
              <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Ajouter un Produit
          </button>
        </div>
      </div>

      {/* ── Stats Section ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statsCards.map((s, idx) => (
          <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">{s.label}</p>
              <h3 className="text-2xl font-extrabold text-slate-800">{s.value}</h3>
            </div>
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center`} style={{ backgroundColor: s.iconBg, color: s.iconColor }}>
              {s.icon}
            </div>
          </div>
        ))}
      </div>

      {/* ── Inventory Table ── */}
      <div className="mb-8">
        <ProductsTable 
          initialProducts={products} 
          onRefresh={fetchProducts} 
          externalSearch={search}
        />
      </div>

      {/* ── Secondary Info Cards ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Optimisation du Stock */}
        <div className="bg-[#EFF3FF] p-6 rounded-3xl border border-[#DCE4FF] flex gap-5">
          <div className="w-14 h-14 rounded-2xl bg-[#DCE4FF] text-[#3653E2] flex items-center justify-center flex-shrink-0">
            <BoxesIcon />
          </div>
          <div>
            <h4 className="text-lg font-bold text-slate-800 mb-1">Optimisation du Stock</h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              Votre inventaire est actuellement optimal. <span className="font-bold">12 articles</span> nécessitent cependant un réapprovisionnement imminent pour éviter des ruptures de vente.
            </p>
          </div>
        </div>

        {/* Performance Catalogue */}
        <div className="bg-[#FFF4E8] p-6 rounded-3xl border border-[#FFE7CC] flex gap-5">
           <div className="w-14 h-14 rounded-2xl bg-[#FFE7CC] text-[#F97316] flex items-center justify-center flex-shrink-0">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
            </svg>
          </div>
          <div>
            <h4 className="text-lg font-bold text-slate-800 mb-1">Performance Catalogue</h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              Les catégories <span className="font-bold">Mobilier</span> et <span className="font-bold">Éclairage</span> génèrent 65% de vos revenus ce mois-ci. Envisagez d'ajouter de nouvelles références.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}