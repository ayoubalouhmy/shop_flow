import { useState, useEffect } from "react";
import ProductModal from "./ProductModal";
import api from "../../utils/api";

const ITEMS_PER_PAGE = 10;

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
function StatusBadge({ active, stock }) {
  if (!active) return <span className="sf-badge sf-badge-muted">Inactif</span>;
  if (stock === 0) return <span className="sf-badge sf-badge-danger">Rupture</span>;
  if (stock <= 5) return <span className="sf-badge sf-badge-warning">Stock faible</span>;
  return <span className="sf-badge sf-badge-success">Actif</span>;
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
export default function ProductsTable({ initialProducts, onRefresh, externalSearch = "" }) {
  const [categories, setCategories] = useState([]);
  const [filterCat, setFilterCat] = useState("");
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState({ mode: null, product: null });
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await api.get("/categories");
      setCategories(response.data.data || []);
    } catch (err) {
      console.error("Erreur catégories:", err);
    }
  };

  // ── Filter logic ──
  const filtered = initialProducts.filter(p => {
    const term = externalSearch.toLowerCase();
    const matchSearch =
      p.name.toLowerCase().includes(term) ||
      p.sku?.toLowerCase().includes(term);
    const matchCat = filterCat ? p.category_id == filterCat : true;
    return matchSearch && matchCat;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const showAlert = (msg, type = "success") => {
    setAlert({ msg, type });
    setTimeout(() => setAlert(null), 3000);
  };

  // ── CRUD Handlers ──
  const handleSave = async (formData) => {
    try {
      if (modal.mode === "add") {
        await api.post("/admin/products", formData);
        showAlert("Produit ajouté avec succès !");
      } else {
        await api.put(`/admin/products/${formData.id}`, formData);
        showAlert("Produit modifié avec succès !");
      }
      onRefresh();
      closeModal();
    } catch (err) {
      showAlert(err.response?.data?.message || "Une erreur est survenue.", "danger");
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/admin/products/${id}`);
      showAlert("Produit supprimé.", "danger");
      onRefresh();
    } catch (err) {
      showAlert("Erreur lors de la suppression.", "danger");
    }
  };

  const closeModal = () => setModal({ mode: null, product: null });

  // Listen for "Ajouter un Produit" event from parent
  useEffect(() => {
    const handleOpenAdd = () => setModal({ mode: 'add', product: null });
    document.addEventListener('open-add-product', handleOpenAdd);
    return () => document.removeEventListener('open-add-product', handleOpenAdd);
  }, []);

  return (
    <>
      {/* Alert */}
      {alert && (
        <div className={`sf-alert sf-alert-${alert.type}`} style={{ zIndex: 1000, position: 'fixed', top: 20, right: 20 }}>
          {alert.msg}
        </div>
      )}

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        {/* Table Header Wrapper */}
        <div className="p-6 pb-0 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-800">Inventaire des Produits</h2>
            <p className="text-sm text-slate-500 mt-1">Gérez votre catalogue, mettez à jour les stocks et ajustez vos prix.</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 h-10 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
              </svg>
              Filtres
            </button>
            <button className="flex items-center gap-2 px-4 h-10 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Exporter
            </button>
          </div>
        </div>

        <div className="sf-table-wrap p-2">
          <table className="sf-table w-full">
            <thead>
              <tr className="bg-transparent border-b border-slate-50">
                <th className="text-left font-bold text-slate-400 text-[11px] uppercase tracking-wider py-4 px-4">Image</th>
                <th className="text-left font-bold text-slate-400 text-[11px] uppercase tracking-wider py-4 px-4">Nom du Produit ↕</th>
                <th className="text-left font-bold text-slate-400 text-[11px] uppercase tracking-wider py-4 px-4">SKU</th>
                <th className="text-left font-bold text-slate-400 text-[11px] uppercase tracking-wider py-4 px-4">Catégorie</th>
                <th className="text-left font-bold text-slate-400 text-[11px] uppercase tracking-wider py-4 px-4">Prix</th>
                <th className="text-left font-bold text-slate-400 text-[11px] uppercase tracking-wider py-4 px-4">Stock</th>
                <th className="text-right font-bold text-slate-400 text-[11px] uppercase tracking-wider py-4 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-20 text-slate-400 text-sm italic font-medium">
                    Aucun produit trouvé dans votre inventaire.
                  </td>
                </tr>
              ) : (
                paginated.map(product => (
                  <tr key={product.id} className="hover:bg-slate-50/80 transition-colors border-b border-slate-50 last:border-0 group">
                    <td className="py-4 px-4">
                      <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-100 flex items-center justify-center overflow-hidden">
                        {product.images?.length > 0
                          ? <img 
                              src={product.images[0].startsWith('http') ? product.images[0] : `http://localhost:8000/storage/${product.images[0]}`} 
                              alt={product.name} 
                              className="w-full h-full object-cover" 
                            />
                          : <ImgPlaceholder />
                        }
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-bold text-slate-800 text-[14px]">{product.name}</div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-slate-400 font-mono text-[11px] tracking-tight">{product.sku || 'N/A'}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="inline-block px-3 py-1 bg-white border border-slate-200 rounded-lg text-slate-600 text-[11px] font-bold">
                        {product.category?.name || "Sans catégorie"}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-bold text-slate-800 text-[14px]">
                        {parseFloat(product.price).toLocaleString('fr-FR', { minimumFractionDigits: 2 })} €
                      </div>
                    </td>
                    <td className="py-4 px-4">
                       <div className="flex flex-col gap-1.5 w-[110px]">
                          <div className={`text-[12px] font-bold ${product.stock === 0 ? 'text-rose-500' : 'text-slate-700'}`}>
                            {product.stock} unités
                          </div>
                          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${product.stock === 0 ? 'bg-rose-500' : (product.stock < 5 ? 'bg-amber-400' : 'bg-slate-300')}`}
                              style={{ width: `${Math.min((product.stock / 50) * 100, 100)}%` }}
                            ></div>
                          </div>
                       </div>
                    </td>
                    <td className="py-4 px-4 text-right">
                       <button 
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-300 hover:text-slate-500 hover:bg-slate-100 transition-all ml-auto"
                        onClick={() => setModal({ mode: 'edit', product })}
                       >
                         <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                           <circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>
                         </svg>
                       </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Improved Pagination */}
        <div className="p-6 flex items-center justify-between border-t border-slate-50">
          <div className="text-slate-400 text-[13px] font-medium">
            Affichage de <span className="text-slate-700 font-bold">{Math.min((page - 1) * ITEMS_PER_PAGE + 1, filtered.length)}</span> sur <span className="text-slate-700 font-bold">{filtered.length}</span> produits
          </div>
          <div className="flex items-center gap-2">
            <button 
              className="px-4 h-9 bg-slate-50 border border-slate-200 rounded-lg text-slate-600 text-xs font-bold hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              disabled={page === 1}
              onClick={() => setPage(p => p - 1)}
            >
              Précédent
            </button>
            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                <button
                  key={n}
                  className={`w-9 h-9 rounded-lg text-xs font-bold transition-all ${n === page ? 'bg-[#3653E2] text-white shadow-md shadow-[#3653E2]/20' : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300'}`}
                  onClick={() => setPage(n)}
                >
                  {n}
                </button>
              ))}
            </div>
            <button 
              className="px-4 h-9 bg-slate-50 border border-slate-200 rounded-lg text-slate-600 text-xs font-bold hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              disabled={page === totalPages || totalPages === 0}
              onClick={() => setPage(p => p + 1)}
            >
              Suivant
            </button>
          </div>
        </div>
      </div>

      {/* Modal remain the same but using handleSave */}
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