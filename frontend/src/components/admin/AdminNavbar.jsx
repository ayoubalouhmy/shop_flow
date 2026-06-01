import { useState } from "react";
import { useLocation } from "react-router-dom";

const pageTitles = {
  "/admin": "Tableau de bord",
  "/admin/products": "Gestion des Produits",
  "/admin/orders": "Commandes",
  "/admin/customers": "Clients",
  "/admin/settings": "Paramètres",
};

const SearchIcon = () => (
  <svg className="sf-topnav-search-icon" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const BellIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const MenuIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const SunIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

export default function AdminNavbar({ onMenuClick }) {
  const location = useLocation();
  const [searchVal, setSearchVal] = useState("");

  const title = pageTitles[location.pathname] || "Admin";

  return (
    <header className="sf-topnav">
      {/* Mobile hamburger */}
      <button className="sf-sidebar-toggle" onClick={onMenuClick} aria-label="Menu">
        <MenuIcon />
      </button>

      {/* Page title */}
      <div className="sf-topnav-title">{title}</div>

      {/* Search */}
      <div className="sf-topnav-search">
        <SearchIcon />
        <input
          type="text"
          placeholder="Rechercher..."
          value={searchVal}
          onChange={e => setSearchVal(e.target.value)}
          aria-label="Rechercher"
        />
      </div>

      {/* Actions */}
      <button className="sf-topnav-btn" title="Mode clair" aria-label="Mode">
        <SunIcon />
      </button>

      <button className="sf-topnav-btn" title="Notifications" aria-label="Notifications">
        <BellIcon />
        <span className="sf-topnav-notif-dot" />
      </button>

      <div className="sf-topnav-avatar" title="Admin ShopFlow" role="button" aria-label="Profil admin">
        AM
      </div>
    </header>
  );
}