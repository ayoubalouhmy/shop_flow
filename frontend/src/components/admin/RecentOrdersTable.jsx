const statusConfig = {
  "delivered": { cls: "sf-badge-success", label: "Livré",      dot: "#22c55e" },
  "pending":   { cls: "sf-badge-warning", label: "En attente", dot: "#f59e0b" },
  "confirmed": { cls: "sf-badge-info",    label: "Confirmé",   dot: "#3b82f6" },
  "shipped":   { cls: "sf-badge-primary", label: "Expédié",    dot: "#3653E2" },
  "cancelled": { cls: "sf-badge-danger",  label: "Annulé",     dot: "#ef4444" },
};

function StatusBadge({ status }) {
  const cfg = statusConfig[status] || { cls: "sf-badge-muted", label: status, dot: "#9ca3af" };
  return (
    <span className={`sf-badge ${cfg.cls}`}>
      <span style={{
        width: 6, height: 6, borderRadius: "50%",
        background: cfg.dot, display: "inline-block", flexShrink: 0
      }} />
      {cfg.label}
    </span>
  );
}

export default function RecentOrdersTable({ orders }) {
  const displayOrders = orders || [];

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
              {displayOrders.map(order => (
                <tr key={order.id}>
                  <td>
                    <span className="sf-order-id">#{order.id}</span>
                  </td>
                  <td>
                    <div className="sf-customer-cell">
                      <div className="sf-avatar-sm">
                        {order.user?.name?.charAt(0) || "U"}
                      </div>
                      <span style={{ fontWeight: 500 }}>{order.user?.name || "Client Inconnu"}</span>
                    </div>
                  </td>
                  <td><StatusBadge status={order.status} /></td>
                  <td style={{ color: "var(--sf-muted)" }}>
                    {new Date(order.created_at).toLocaleDateString("fr-FR")}
                  </td>
                  <td style={{ textAlign: "right", fontWeight: 700 }}>
                    {order.total_amount.toLocaleString("fr-FR")} €
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}