import StatsCard from "../../components/admin/StatsCard";
import RecentOrdersTable from "../../components/admin/RecentOrdersTable";
import BestSellingProducts from "../../components/admin/BestSellingProducts";
import QuickActions from "../../components/admin/QuickActions";
import { adminStats } from "../../data/adminData";

// ── Stat Icons ──
const SalesIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

const OrdersIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);

const UsersIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const ConvIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
    <polyline points="16 7 22 7 22 13" />
  </svg>
);

const statsConfig = [
  {
    label: "Chiffre d'Affaires",
    value: adminStats.totalSales,
    change: adminStats.totalSalesChange,
    up: true,
    icon: <SalesIcon />,
    iconBg: "rgba(54,83,226,0.12)",
    iconColor: "#3653E2",
  },
  {
    label: "Commandes Totales",
    value: adminStats.totalOrders.toLocaleString("fr-FR"),
    change: adminStats.totalOrdersChange,
    up: true,
    icon: <OrdersIcon />,
    iconBg: "#FDEDDD",
    iconColor: "#F97316",
  },
  {
    label: "Nouveaux Clients",
    value: `+${adminStats.totalCustomers}`,
    change: adminStats.totalCustomersChange,
    up: true,
    icon: <UsersIcon />,
    iconBg: "#f0fdf4",
    iconColor: "#16a34a",
  },
  {
    label: "Taux de Conversion",
    value: adminStats.conversionRate,
    change: adminStats.conversionRateChange,
    up: false,
    icon: <ConvIcon />,
    iconBg: "#fef2f2",
    iconColor: "#dc2626",
  },
];

export default function AdminDashboard() {
  const today = new Date().toLocaleDateString("fr-FR", {
    weekday: "long", year: "numeric", month: "long", day: "numeric"
  });

  return (
    <div>
      {/* Page Header */}
      <div className="sf-page-header">
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div>
            <h1 className="sf-page-title">Tableau de bord</h1>
            <p className="sf-page-subtitle">
              Bon retour, voici les performances de votre boutique · {today}
            </p>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button className="sf-btn sf-btn-outline sf-btn-sm">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              Filtrer par date
            </button>
            <button className="sf-btn sf-btn-primary sf-btn-sm">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2.5" strokeLinecap="round">
                <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Nouvelle campagne
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="row g-3 mb-4">
        {statsConfig.map(s => (
          <div className="col-12 col-sm-6 col-xl-3" key={s.label}>
            <StatsCard {...s} />
          </div>
        ))}
      </div>

      {/* Main content – Orders + Best Sellers */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-xl-8">
          <RecentOrdersTable />
        </div>
        <div className="col-12 col-xl-4">
          <BestSellingProducts />
        </div>
      </div>

      {/* Quick Actions */}
      <QuickActions />
    </div>
  );
}