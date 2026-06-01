import { recentOrders } from "../../data/adminData";

const statusConfig = {
  "Livré":      { cls: "sf-badge-success", dot: "#22c55e" },
  "En cours":   { cls: "sf-badge-info",    dot: "#3b82f6" },
  "Expédié":    { cls: "sf-badge-primary", dot: "#3653E2" },
  "En attente": { cls: "sf-badge-warning", dot: "#f59e0b" },
  "Annulé":     { cls: "sf-badge-danger",  dot: "#ef4444" },
};

function StatusBadge({ status }) {
  const cfg = statusConfig[status] || { cls: "sf-badge-muted", dot: "#9ca3af" };
  return (
    <span className={`sf-badge ${cfg.cls}`}>
      <span style={{
        width: 6, height: 6, borderRadius: "50%",
        background: cfg.dot, display: "inline-block", flexShrink: 0
      }} />
      {status}
    </span>
  );
}

export default function RecentOrdersTable() {
  return (
    <div className="sf-card">
      <div className="sf-card-header">
        <div>
          <p className="sf-card-title">Commandes Récentes</p>
          <p className="sf-card-subtitle">Dernières transactions effectuées sur la boutique.</p>
        </div>
        <button className="sf-btn sf-btn-outline sf-btn-sm">Voir tout</button>
      </div>

      <div className="sf-card-body" style={{ padding: "12px 0 0" }}>
        <div className="sf-table-wrap">
          <table className="sf-table">
            <thead>
              <tr>
                <th>Commande</th>
                <th>Client</th>
                <th>Statut</th>
                <th>Date</th>
                <th style={{ textAlign: "right" }}>Montant</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map(order => (
                <tr key={order.id}>
                  <td>
                    <span className="sf-order-id">{order.id}</span>
                  </td>
                  <td>
                    <div className="sf-customer-cell">
                      <div className="sf-avatar-sm">{order.avatar}</div>
                      <span style={{ fontWeight: 500 }}>{order.customer}</span>
                    </div>
                  </td>
                  <td><StatusBadge status={order.status} /></td>
                  <td style={{ color: "var(--sf-muted)" }}>{order.date}</td>
                  <td style={{ textAlign: "right", fontWeight: 700 }}>{order.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}