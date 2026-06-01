import { bestSellingProducts } from "../../data/adminData";

const TrendUpIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
    <polyline points="16 7 22 7 22 13" />
  </svg>
);

const TrendDownIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 17 13.5 8.5 8.5 13.5 2 7" />
    <polyline points="16 17 22 17 22 11" />
  </svg>
);

const ManageIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" />
    <line x1="8" y1="18" x2="21" y2="18" />
    <line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" />
    <line x1="3" y1="18" x2="3.01" y2="18" />
  </svg>
);

export default function BestSellingProducts() {
  return (
    <div className="sf-card" style={{ height: "100%" }}>
      <div className="sf-card-header">
        <div>
          <p className="sf-card-title">Meilleures Ventes</p>
          <p className="sf-card-subtitle">Produits les plus populaires ce mois-ci.</p>
        </div>
      </div>

      <div className="sf-card-body">
        {bestSellingProducts.map((product, i) => (
          <div key={product.id} className="sf-bestseller-item">
            <div className="sf-bestseller-rank">#{i + 1}</div>
            <div className="sf-bestseller-info">
              <div className="sf-bestseller-name">{product.name}</div>
              <div className="sf-bestseller-meta">
                {product.sales} ventes · {product.category}
              </div>
            </div>
            <div className={`sf-bestseller-change ${product.up ? "up" : "down"}`}>
              {product.up ? <TrendUpIcon /> : <TrendDownIcon />}
              {" "}{product.change}
            </div>
          </div>
        ))}

        <button
          className="sf-btn sf-btn-outline sf-btn-sm"
          style={{ width: "100%", justifyContent: "center", marginTop: 14 }}
        >
          <ManageIcon />
          Gestion de l'inventaire
        </button>
      </div>
    </div>
  );
}