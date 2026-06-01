import StatsCard from "../../components/admin/StatsCard";
import ProductsTable from "../../components/admin/ProductsTable";
import { productsData, productStats } from "../../data/adminData";

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

const ValueIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

const statsCards = [
  {
    label: "Total Produits",
    value: productStats.total.toLocaleString("fr-FR"),
    change: "+48 ce mois",
    up: true,
    icon: <BoxesIcon />,
    iconBg: "rgba(54,83,226,0.12)",
    iconColor: "#3653E2",
  },
  {
    label: "Produits Actifs",
    value: productStats.active.toLocaleString("fr-FR"),
    change: "98% du catalogue",
    up: true,
    icon: <CheckCircleIcon />,
    iconBg: "#f0fdf4",
    iconColor: "#16a34a",
  },
  {
    label: "Stock Critique",
    value: productStats.lowStock,
    change: "Réapprovisionnement requis",
    up: false,
    icon: <AlertIcon />,
    iconBg: "#fffbeb",
    iconColor: "#d97706",
  },
  {
    label: "Valeur Inventaire",
    value: productStats.inventoryValue,
    change: "+12.3% ce mois",
    up: true,
    icon: <ValueIcon />,
    iconBg: "#FDEDDD",
    iconColor: "#F97316",
  },
];

export default function AdminProducts() {
  return (
    <div>
      {/* Page Header */}
      <div className="sf-page-header">
        <h1 className="sf-page-title">Gestion des Produits</h1>
        <p className="sf-page-subtitle">
          Bienvenue dans votre espace d'administration de l'inventaire.
        </p>
      </div>

      {/* Product Stats */}
      <div className="row g-3 mb-4">
        {statsCards.map(s => (
          <div className="col-6 col-xl-3" key={s.label}>
            <StatsCard {...s} />
          </div>
        ))}
      </div>

      {/* Products Table (full CRUD) */}
      <ProductsTable initialProducts={productsData} />
    </div>
  );
}