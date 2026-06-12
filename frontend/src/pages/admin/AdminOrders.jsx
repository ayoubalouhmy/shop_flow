import { useState, useEffect } from "react";
import api from "../../utils/api";

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

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("");

  useEffect(() => {
    fetchOrders();
  }, [filterStatus]);

  const fetchOrders = async () => {
    try {
      const response = await api.get("/admin/orders", {
        params: { status: filterStatus }
      });
      const data = response.data.data;
      setOrders(Array.isArray(data) ? data : (data?.data || []));
    } catch (error) {
      console.error("Erreur commandes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      await api.put(`/admin/orders/${orderId}/status`, { status: newStatus });
      fetchOrders();
    } catch (error) {
      alert("Erreur lors de la mise à jour du statut");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-12 h-12 border-4 border-[#3653E2]/20 border-t-[#3653E2] rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="animate-fadeIn">
      {/* ── Page Header ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <h1 className="sf-page-title text-3xl font-extrabold tracking-tight">Gestion des Commandes</h1>
          <p className="sf-page-subtitle text-slate-500 font-medium">Suivez et gérez toutes les transactions de votre boutique.</p>
        </div>

        <div className="flex items-center gap-3">
          <select 
            className="h-11 px-4 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:border-[#3653E2] transition-all"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="">Tous les statuts</option>
            <option value="pending">En attente</option>
            <option value="confirmed">Confirmé</option>
            <option value="shipped">Expédié</option>
            <option value="delivered">Livré</option>
            <option value="cancelled">Annulé</option>
          </select>
          <button className="flex items-center gap-2 px-5 h-11 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all">
             <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            Exporter
          </button>
        </div>
      </div>

      {/* ── Orders Table ── */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="sf-table-wrap p-2">
          <table className="sf-table w-full">
            <thead>
              <tr className="bg-transparent border-b border-slate-50">
                <th className="text-left font-bold text-slate-400 text-[11px] uppercase tracking-wider py-4 px-4">Commande</th>
                <th className="text-left font-bold text-slate-400 text-[11px] uppercase tracking-wider py-4 px-4">Client</th>
                <th className="text-left font-bold text-slate-400 text-[11px] uppercase tracking-wider py-4 px-4">Date</th>
                <th className="text-left font-bold text-slate-400 text-[11px] uppercase tracking-wider py-4 px-4">Statut</th>
                <th className="text-left font-bold text-slate-400 text-[11px] uppercase tracking-wider py-4 px-4">Montant</th>
                <th className="text-right font-bold text-slate-400 text-[11px] uppercase tracking-wider py-4 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-20 text-slate-400 text-sm italic font-medium">
                    Aucune commande trouvée.
                  </td>
                </tr>
              ) : (
                orders.map(order => (
                  <tr key={order.id} className="hover:bg-slate-50/80 transition-colors border-b border-slate-50 last:border-0">
                    <td className="py-4 px-4">
                      <span className="font-mono text-[#3653E2] font-bold">#{order.id}</span>
                    </td>
                    <td className="py-4 px-4">
                       <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-slate-100 text-[#3653E2] flex items-center justify-center font-bold text-xs border border-slate-200">
                            {order.user?.name?.charAt(0) || 'U'}
                          </div>
                          <div>
                            <div className="font-bold text-slate-800 text-[13px]">{order.user?.name}</div>
                            <div className="text-[11px] text-slate-400">{order.user?.email}</div>
                          </div>
                       </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-slate-500 text-[13px]">{new Date(order.created_at).toLocaleDateString('fr-FR')}</span>
                    </td>
                    <td className="py-4 px-4">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-bold text-slate-800 text-[14px]">
                        {parseFloat(order.total_amount).toLocaleString('fr-FR')} €
                      </div>
                    </td>
                    <td className="py-4 px-4 text-right">
                       <div className="flex items-center justify-end gap-2">
                          <select 
                            className="bg-slate-50 border border-slate-200 rounded-lg text-[11px] font-bold p-1 outline-none focus:border-[#3653E2]"
                            value={order.status}
                            onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                          >
                            <option value="pending">En attente</option>
                            <option value="confirmed">Confirmé</option>
                            <option value="shipped">Expédié</option>
                            <option value="delivered">Livré</option>
                            <option value="cancelled">Annulé</option>
                          </select>
                          <button className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-[#3653E2] hover:bg-slate-100 transition-all border border-slate-100">
                             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                               <circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>
                             </svg>
                          </button>
                       </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
