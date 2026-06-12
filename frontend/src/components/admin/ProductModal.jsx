import { useState, useEffect } from "react";
import api from "../../utils/api";

const EMPTY_FORM = {
  name: "",
  sku: "",
  category_id: "",
  price: "",
  stock: "",
  is_active: true,
  description: "",
};

const CloseIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const TrashIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
  </svg>
);

// ── View Product Modal ──────────────────────────────────────
function ViewModal({ product, onClose }) {
  if (!product) return null;

  return (
    <div className="sf-modal-overlay" onClick={onClose}>
      <div className="sf-modal" onClick={e => e.stopPropagation()}>
        <div className="sf-modal-header">
          <h2 className="sf-modal-title">Détail du Produit</h2>
          <button className="sf-modal-close" onClick={onClose}><CloseIcon /></button>
        </div>
        <div className="sf-modal-body">
          {/* Image */}
          <div style={{
            width: "100%", height: 160, background: "var(--sf-body-bg)",
            borderRadius: 10, border: "1px solid var(--sf-border)",
            display: "flex", alignItems: "center", justifyContent: "center",
            marginBottom: 20, overflow: 'hidden'
          }}>
            {product.images?.length > 0 ? (
              <img 
                src={product.images[0].startsWith('http') ? product.images[0] : `http://localhost:8000/storage/${product.images[0]}`} 
                alt={product.name} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            ) : (
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
            )}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px 20px" }}>
            <div>
              <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--sf-muted)",
                textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 3 }}>
                Nom du produit
              </div>
              <div style={{ fontWeight: 700, fontSize: "0.95rem" }}>{product.name}</div>
            </div>
            <div>
              <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--sf-muted)",
                textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 3 }}>
                SKU
              </div>
              <div style={{ fontFamily: "var(--sf-mono)", fontSize: "0.85rem" }}>{product.sku || 'N/A'}</div>
            </div>
            <div>
              <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--sf-muted)",
                textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 3 }}>
                Catégorie
              </div>
              <div>{product.category?.name || "Sans catégorie"}</div>
            </div>
            <div>
              <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--sf-muted)",
                textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 3 }}>
                Statut
              </div>
              <span className={`sf-badge ${product.is_active ? 'sf-badge-success' : 'sf-badge-muted'}`}>
                {product.is_active ? 'Actif' : 'Inactif'}
              </span>
            </div>
            <div>
              <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--sf-muted)",
                textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 3 }}>
                Prix
              </div>
              <div style={{ fontWeight: 800, fontSize: "1.1rem", color: "var(--sf-primary)" }}>
                {parseFloat(product.price).toLocaleString('fr-FR')} €
              </div>
            </div>
            <div>
              <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--sf-muted)",
                textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 3 }}>
                Stock
              </div>
              <div style={{ fontWeight: 600 }}>
                {product.stock} unités
              </div>
            </div>
          </div>

          {product.description && (
            <div style={{ marginTop: 16 }}>
              <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--sf-muted)",
                textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6 }}>
                Description
              </div>
              <p style={{ fontSize: "0.875rem", color: "var(--sf-muted)",
                lineHeight: 1.6, margin: 0 }}>
                {product.description}
              </p>
            </div>
          )}
        </div>
        <div className="sf-modal-footer">
          <button className="sf-btn sf-btn-primary" onClick={onClose}>Fermer</button>
        </div>
      </div>
    </div>
  );
}

// ── Delete Confirm Modal ────────────────────────────────────
function DeleteModal({ product, onClose, onConfirm }) {
  if (!product) return null;
  return (
    <div className="sf-modal-overlay" onClick={onClose}>
      <div className="sf-modal sf-delete-modal" style={{ maxWidth: 400 }} onClick={e => e.stopPropagation()}>
        <div className="sf-modal-header">
          <h2 className="sf-modal-title">Supprimer le produit</h2>
          <button className="sf-modal-close" onClick={onClose}><CloseIcon /></button>
        </div>
        <div className="sf-modal-body" style={{ textAlign: "center", padding: "28px 24px" }}>
          <div className="sf-delete-icon"><TrashIcon /></div>
          <h3 style={{ fontSize: "1rem", fontWeight: 700, margin: "0 0 8px" }}>
            Êtes-vous sûr ?
          </h3>
          <p style={{ fontSize: "0.875rem", color: "var(--sf-muted)", margin: 0 }}>
            Vous êtes sur le point de supprimer{" "}
            <strong style={{ color: "var(--sf-dark)" }}>{product.name}</strong>.
            Cette action est irréversible.
          </p>
        </div>
        <div className="sf-modal-footer">
          <button className="sf-btn sf-btn-outline" onClick={onClose}>Annuler</button>
          <button
            className="sf-btn sf-btn-primary"
            style={{ background: "var(--sf-danger)", borderColor: "var(--sf-danger)" }}
            onClick={() => { onConfirm(product.id); onClose(); }}
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Add / Edit Modal ────────────────────────────────────────
function EditModal({ product, onClose, onSave, isAdd }) {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(
    product
      ? { ...product, price: product.price, stock: product.stock }
      : EMPTY_FORM
  );

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await api.get("/categories");
      setCategories(response.data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = () => {
    if (!form.name.trim() || !form.category_id) return;
    onSave({
      ...form,
      price: parseFloat(form.price) || 0,
      stock: parseInt(form.stock) || 0,
      is_active: !!form.is_active
    });
  };

  return (
    <div className="sf-modal-overlay" onClick={onClose}>
      <div className="sf-modal" onClick={e => e.stopPropagation()}>
        <div className="sf-modal-header">
          <h2 className="sf-modal-title">
            {isAdd ? "Ajouter un Produit" : "Modifier le Produit"}
          </h2>
          <button className="sf-modal-close" onClick={onClose}><CloseIcon /></button>
        </div>
        <div className="sf-modal-body">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
            <div className="sf-form-group" style={{ gridColumn: "1 / -1" }}>
              <label className="sf-form-label">Nom du produit *</label>
              <input
                className="sf-form-control"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Ex: Fauteuil Minimaliste Nordique"
              />
            </div>

            <div className="sf-form-group">
              <label className="sf-form-label">SKU</label>
              <input
                className="sf-form-control"
                name="sku"
                value={form.sku || ''}
                onChange={handleChange}
                placeholder="FUR-001"
              />
            </div>

            <div className="sf-form-group">
              <label className="sf-form-label">Catégorie *</label>
              <select
                className="sf-form-control sf-select"
                name="category_id"
                value={form.category_id}
                onChange={handleChange}
              >
                <option value="">Sélectionner...</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>

            <div className="sf-form-group">
              <label className="sf-form-label">Prix (€)</label>
              <input
                className="sf-form-control"
                name="price"
                type="number"
                min="0"
                step="0.01"
                value={form.price}
                onChange={handleChange}
                placeholder="0.00"
              />
            </div>

            <div className="sf-form-group">
              <label className="sf-form-label">Stock (unités)</label>
              <input
                className="sf-form-control"
                name="stock"
                type="number"
                min="0"
                value={form.stock}
                onChange={handleChange}
                placeholder="0"
              />
            </div>

            <div className="sf-form-group" style={{ gridColumn: "1 / -1" }}>
              <div className="flex items-center gap-2">
                 <input
                  type="checkbox"
                  id="is_active"
                  name="is_active"
                  checked={form.is_active}
                  onChange={handleChange}
                />
                <label htmlFor="is_active" className="sf-form-label" style={{ marginBottom: 0 }}>Rendre le produit visible</label>
              </div>
            </div>

            <div className="sf-form-group" style={{ gridColumn: "1 / -1" }}>
              <label className="sf-form-label">Description</label>
              <textarea
                className="sf-form-control"
                name="description"
                value={form.description || ''}
                onChange={handleChange}
                placeholder="Description courte du produit..."
                rows={3}
              />
            </div>
          </div>
        </div>
        <div className="sf-modal-footer">
          <button className="sf-btn sf-btn-outline" onClick={onClose}>Annuler</button>
          <button className="sf-btn sf-btn-primary" onClick={handleSubmit}>
            {isAdd ? "Ajouter le produit" : "Enregistrer les modifications"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main Export ─────────────────────────────────────────────
/**
 * ProductModal – unified modal controller
 * mode: "view" | "edit" | "add" | "delete"
 */
export default function ProductModal({ mode, product, onClose, onSave, onDelete }) {
  // Close on ESC key
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!mode) return null;

  if (mode === "view")   return <ViewModal   product={product} onClose={onClose} />;
  if (mode === "delete") return <DeleteModal product={product} onClose={onClose} onConfirm={onDelete} />;
  if (mode === "edit")   return <EditModal   product={product} onClose={onClose} onSave={onSave} isAdd={false} />;
  if (mode === "add")    return <EditModal   product={null}    onClose={onClose} onSave={onSave} isAdd={true} />;

  return null;
}