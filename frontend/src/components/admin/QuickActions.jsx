import { useNavigate } from "react-router-dom";

const actions = [
  {
    label: "Vérifier l'Inventaire",
    desc: "12 articles en stock critique",
    iconBg: "#eef0fd",
    iconColor: "#3653E2",
    to: "/admin/products",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
  },
  {
    label: "Gérer les Clients",
    desc: "4 nouvelles demandes de support",
    iconBg: "#FDEDDD",
    iconColor: "#F97316",
    to: "/admin/customers",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    label: "Plus d'outils",
    desc: "Configuration et intégrations",
    iconBg: "#171A1F",
    iconColor: "#fff",
    to: "/admin/settings",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" />
      </svg>
    ),
  },
];

export default function QuickActions() {
  const navigate = useNavigate();

  return (
    <div>
      <h3 style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--sf-muted)",
        textTransform: "uppercase", letterSpacing: "0.6px", marginBottom: 12 }}>
        Actions Rapides
      </h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
        {actions.map(action => (
          <button
            key={action.label}
            className="sf-quick-action"
            onClick={() => navigate(action.to)}
          >
            <div
              className="sf-quick-action-icon"
              style={{ background: action.iconBg, color: action.iconColor }}
            >
              {action.icon}
            </div>
            <div>
              <div className="sf-quick-action-label">{action.label}</div>
              <div className="sf-quick-action-desc">{action.desc}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}