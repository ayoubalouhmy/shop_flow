// src/pages/admin/AdminPlaceholders.jsx
// AdminOrders was moved to its own file AdminOrders.jsx

// src/pages/admin/AdminSettings.jsx
export function AdminSettings() {
  return (
    <div>
      <div className="sf-page-header">
        <h1 className="sf-page-title">Paramètres</h1>
        <p className="sf-page-subtitle">Configurez votre boutique et vos intégrations.</p>
      </div>
      <div className="sf-card">
        <div className="sf-card-body" style={{ padding: "60px 24px", textAlign: "center" }}>
          <div style={{ fontSize: "3rem", marginBottom: 12 }}>⚙️</div>
          <h3 style={{ fontWeight: 700, marginBottom: 6 }}>Module Paramètres</h3>
          <p style={{ color: "var(--sf-muted)", fontSize: "0.9rem" }}>
            Cette section sera disponible dans la prochaine version.
          </p>
        </div>
      </div>
    </div>
  );
}