import { useState } from "react";
import { categories } from "../../data/adminData";
import ProductModal from "./ProductModal";

const ITEMS_PER_PAGE = 6;

// ── Icons ──
const SearchIcon = () => (
  <svg className="sf-search-field-icon" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const EyeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EditIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const TrashIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
  </svg>
);

const PlusIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const FilterIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);

const ExportIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const ImgPlaceholder = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <polyline points="21 15 16 10 5 21" />
  </svg>
);

// ── Status badge helper ──
function StatusBadge({ status }) {
  const map = {
    Actif:          "sf-badge-success",
    "Stock faible": "sf-badge-warning",
    Rupture:        "sf-badge-danger",
    Inactif:        "sf-badge-muted",
  };
  return <span className={`sf-badge ${map[status] || "sf-badge-muted"}`}>{status}</span>;
}

// ── Stock indicator ──
function StockCell({ stock }) {
  const color = stock === 0
    ? "var(--sf-danger)"
    : stock <= 5
    ? "var(--sf-warning)"
    : "var(--sf-text)";
  return <span style={{ color, fontWeight: stock <= 5 ? 700 : 400 }}>{stock}</span>;
}

// ── Main Component ──
export default function ProductsTable({ initialProducts }) {
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState({ mode: null, product: null });
  const [alert, setAlert] = useState(null);

  // ── Filter logic ──
  const filtered = products.filter(p => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCat ? p.category === filterCat : true;
    const matchStatus = filterStatus ? p.status === filterStatus : true;
    return matchSearch && matchCat && matchStatus;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const showAlert = (msg, type = "success") => {
    setAlert({ msg, type });
    setTimeout(() => setAlert(null), 3000);
  };

  // ── CRUD Handlers ──
  const handleSave = (formData) => {
    if (modal.mode === "add") {
      setProducts(prev => [formData, ...prev]);
      showAlert("Produit ajouté avec succès !");
    } else {
      setProducts(prev => prev.map(p => p.id === formData.id ? formData : p));
      showAlert("Produit modifié avec succès !");
    }
    setPage(1);
  };

  const handleDelete = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    showAlert("Produit supprimé.", "danger");
  };

  const closeModal = () => setModal({ mode: null, product: null });

  const handleFilterChange = (setter) => (e) => {
    setter(e.target.value);
    setPage(1);
  };

  return (
    <>
      {/* Alert */}
      {alert && (
        <div className={`sf-alert sf-alert-${alert.type}`}>
          {alert.type === "success"
            ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
            : <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          }
          {alert.msg}
        </div>
      )}

      {/* Toolbar */}
      <div className="sf-toolbar" style={{ marginBottom: 18 }}>
        <div className="sf-search-field">
          <SearchIcon />
          <input
            type="text"
            placeholder="Rechercher un produit, SKU..."
            value={search}
            onChange={handleFilterChange(setSearch)}
          />
        </div>

        <select
          className="sf-select"
          value={filterCat}
          onChange={handleFilterChange(setFilterCat)}
        >
          <option value="">Toutes catégories</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>

        <select
          className="sf-select"
          value={filterStatus}
          onChange={handleFilterChange(setFilterStatus)}
        >
          <option value="">Tous les statuts</option>
          <option value="Actif">Actif</option>
          <option value="Stock faible">Stock faible</option>
          <option value="Rupture">Rupture</option>
          <option value="Inactif">Inactif</option>
        </select>

        <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
          <button className="sf-btn sf-btn-outline sf-btn-sm">
            <FilterIcon /> Filtres
          </button>
          <button className="sf-btn sf-btn-outline sf-btn-sm">
            <ExportIcon /> Exporter
          </button>
          <button
            className="sf-btn sf-btn-primary sf-btn-sm"
            onClick={() => setModal({ mode: "add", product: null })}
          >
            <PlusIcon /> Ajouter un Produit
          </button>
        </div>
      </div>

      {/* Table card */}
      <div className="sf-card">
        <div className="sf-table-wrap">
          <table className="sf-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Nom du Produit ↕</th>
                <th>SKU</th>
                <th>Catégorie</th>
                <th>Prix</th>
                <th>Stock</th>
                <th>Statut</th>
                <th style={{ textAlign: "center" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{
                    textAlign: "center", padding: "48px 16px",
                    color: "var(--sf-muted)", fontSize: "0.875rem"
                  }}>
                    Aucun produit trouvé.
                  </td>
                </tr>
              ) : (
                paginated.map(product => (
                  <tr key={product.id}>
                    <td>
                      <div className="sf-product-img">
                        {product.image
                          ? <img src={product.image} alt={product.name} />
                          : <ImgPlaceholder />
                        }
                      </div>
                    </td>
                    <td>
                      <span style={{ fontWeight: 600 }}>{product.name}</span>
                    </td>
                    <td>
                      <span style={{ fontFamily: "var(--sf-mono)", fontSize: "0.8rem",
                        color: "var(--sf-muted)" }}>
                        {product.sku}
                      </span>
                    </td>
                    <td>
                      <span className="sf-badge sf-badge-muted">{product.category}</span>
                    </td>
                    <td>
                      <span style={{ fontWeight: 700 }}>{product.price.toFixed(2)} €</span>
                    </td>
                    <td>
                      <StockCell stock={product.stock} />
                    </td>
                    <td>
                      <StatusBadge status={product.status} />
                    </td>
                    <td>
                      <div className="sf-action-btns" style={{ justifyContent: "center" }}>
                        <button
                          className="sf-btn sf-btn-outline sf-btn-icon"
                          title="Voir"
                          onClick={() => setModal({ mode: "view", product })}
                        >
                          <EyeIcon />
                        </button>
                        <button
                          className="sf-btn sf-btn-outline sf-btn-icon"
                          title="Modifier"
                          onClick={() => setModal({ mode: "edit", product })}
                        >
                          <EditIcon />
                        </button>
                        <button
                          className="sf-btn sf-btn-danger-outline sf-btn-icon"
                          title="Supprimer"
                          onClick={() => setModal({ mode: "delete", product })}
                        >
                          <TrashIcon />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="sf-pagination">
          <span>
            Affichage de{" "}
            <strong>{Math.min((page - 1) * ITEMS_PER_PAGE + 1, filtered.length)}</strong>
            –
            <strong>{Math.min(page * ITEMS_PER_PAGE, filtered.length)}</strong>
            {" "}sur <strong>{filtered.length}</strong> produits
          </span>
          <div className="sf-pagination-btns">
            <button
              className="sf-page-btn"
              disabled={page === 1}
              onClick={() => setPage(p => p - 1)}
              aria-label="Page précédente"
            >
              ‹
            </button>
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map(n => (
              <button
                key={n}
                className={`sf-page-btn ${n === page ? "active" : ""}`}
                onClick={() => setPage(n)}
              >
                {n}
              </button>
            ))}
            {totalPages > 5 && <span style={{ padding: "0 4px" }}>…</span>}
            <button
              className="sf-page-btn"
              disabled={page === totalPages || totalPages === 0}
              onClick={() => setPage(p => p + 1)}
              aria-label="Page suivante"
            >
              ›
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      <ProductModal
        mode={modal.mode}
        product={modal.product}
        onClose={closeModal}
        onSave={handleSave}
        onDelete={handleDelete}
      />
    </>
  );
}