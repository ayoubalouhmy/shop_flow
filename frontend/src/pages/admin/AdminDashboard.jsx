import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import StatsCard from "../../components/admin/StatsCard";
import RecentOrdersTable from "../../components/admin/RecentOrdersTable";
import BestSellingProducts from "../../components/admin/BestSellingProducts";
import QuickActions from "../../components/admin/QuickActions";
import api from "../../utils/api";
import {
  TrendingUp,
  ShoppingBag,
  Users,
  Package,
  Calendar,
  Plus,
  ArrowRight
} from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await api.get("/admin/dashboard");
      setStats(response.data.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const today = new Date().toLocaleDateString("fr-FR", {
    weekday: "long", year: "numeric", month: "long", day: "numeric"
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-12 h-12 border-4 border-[#3653E2]/20 border-t-[#3653E2] rounded-full animate-spin"></div>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  const statsConfig = [
    {
      label: "Chiffre d'Affaires",
      value: `${stats?.revenue?.total.toLocaleString("fr-FR")} €`,
      change: stats?.revenue?.month > 0 ? "En hausse ce mois" : "Données en cours",
      up: true,
      icon: <TrendingUp size={20} />,
      iconBg: "rgba(54,83,226,0.12)",
      iconColor: "#3653E2",
    },
    {
      label: "Commandes Totales",
      value: stats?.orders?.total.toLocaleString("fr-FR"),
      change: `+${stats?.orders?.pending} en attente`,
      up: true,
      icon: <ShoppingBag size={20} />,
      iconBg: "#FDEDDD",
      iconColor: "#F97316",
    },
    {
      label: "Utilisateurs",
      value: `${stats?.users?.total}`,
      change: `${stats?.users?.new_this_month} ce mois-ci`,
      up: true,
      icon: <Users size={20} />,
      iconBg: "#f0fdf4",
      iconColor: "#16a34a",
    },
    {
      label: "Produits en Stock",
      value: stats?.products?.total,
      change: `${stats?.products?.out_of_stock} en rupture`,
      up: stats?.products?.out_of_stock === 0,
      icon: <Package size={20} />,
      iconBg: "#fef2f2",
      iconColor: "#dc2626",
    },
  ];

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-8"
    >
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <motion.div variants={itemVariants}>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Tableau de Bord</h1>
          <p className="text-slate-500 font-medium flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Performance de votre boutique · {today}
          </p>
        </motion.div>
        
        <motion.div variants={itemVariants} className="flex items-center gap-3">
          <button className="h-11 px-5 bg-white border border-slate-200 rounded-2xl text-slate-600 text-sm font-bold shadow-sm hover:border-slate-300 transition-all flex items-center gap-2">
            <Calendar size={16} />
            Filtrer par date
          </button>
          <button className="h-11 px-5 bg-[#3653E2] text-white rounded-2xl text-sm font-bold shadow-lg shadow-[#3653E2]/25 hover:bg-[#2a42c8] transition-all flex items-center gap-2">
            <Plus size={16} />
            Nouvelle campagne
          </button>
        </motion.div>
      </div>

      {/* KPI Cards Grid */}
      <motion.div 
        variants={itemVariants}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {statsConfig.map(s => (
          <StatsCard key={s.label} {...s} />
        ))}
      </motion.div>

      {/* Main Content stacked vertically */}
      <div className="space-y-8">
        {/* Recent Orders Section */}
        <motion.div variants={itemVariants} className="space-y-6">
          <div className="flex items-center justify-between">
             <h3 className="text-xl font-bold text-slate-900">Commandes Récentes</h3>
             <button className="text-[#3653E2] text-sm font-bold hover:underline flex items-center gap-1">
                Voir tout l'historique
                <ArrowRight size={14} />
             </button>
          </div>
          <RecentOrdersTable orders={stats?.recent_orders} />
        </motion.div>

        {/* Best Sellers Section */}
        <motion.div variants={itemVariants} className="space-y-6">
           <h3 className="text-xl font-bold text-slate-900">Meilleures Ventes</h3>
           <BestSellingProducts products={stats?.top_products} />
        </motion.div>
      </div>

      {/* Quick Actions & Bottom Content */}
      <motion.div variants={itemVariants} className="pt-8 border-t border-slate-100">
        <QuickActions />
      </motion.div>

      {/* Analytics Placeholder / Additional Grid Element */}
      <motion.div 
        variants={itemVariants}
        className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[32px] p-8 text-white relative overflow-hidden"
      >
        <div className="relative z-10 max-w-lg">
          <h2 className="text-2xl font-bold mb-3">Analysez vos performances en profondeur</h2>
          <p className="text-slate-400 mb-6">Découvrez quels produits génèrent le plus d'engagement et optimisez vos stocks pour maximiser vos ventes ce trimestre.</p>
          <button className="h-12 px-8 bg-white text-slate-900 rounded-2xl text-sm font-bold hover:bg-slate-100 transition-all">
            Générer un rapport complet
          </button>
        </div>
        
        {/* Abstract background blobs */}
        <div className="absolute top-[-50%] right-[-10%] w-[400px] h-[400px] bg-[#3653E2]/20 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-20%] right-[10%] w-[200px] h-[200px] bg-emerald-500/10 rounded-full blur-[60px]"></div>
      </motion.div>
    </motion.div>
  );
}