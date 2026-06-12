import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import api from "../../utils/api";
import { 
  Users, 
  Search, 
  Mail, 
  Calendar, 
  ShoppingBag, 
  MoreVertical,
  Filter,
  Download,
  Trash2
} from "lucide-react";

export default function AdminCustomers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({});

  useEffect(() => {
    fetchCustomers();
  }, [search]);

  const fetchCustomers = async (page = 1) => {
    try {
      setLoading(true);
      const response = await api.get(`/admin/users?page=${page}&search=${search}&role=client`);
      if (response.data.success) {
        setCustomers(response.data.data.data);
        setPagination(response.data.data);
      }
    } catch (error) {
      console.error("Erreur chargement clients:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer ce client ?")) {
      try {
        await api.delete(`/admin/users/${id}`);
        fetchCustomers();
      } catch (error) {
        alert("Erreur lors de la suppression.");
      }
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Clients</h1>
          <p className="text-slate-500 font-medium pb-2 flex items-center gap-2">
            Gérez votre base de clients et leurs historiques · {pagination.total || 0} inscrits
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="h-11 px-5 bg-white border border-slate-200 rounded-2xl text-slate-600 text-sm font-bold shadow-sm hover:border-slate-300 transition-all flex items-center gap-2">
            <Download size={16} />
            Exporter CSV
          </button>
        </div>
      </div>

      {/* Filters/Toolbar */}
      <div className="bg-white p-4 rounded-[24px] border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Rechercher un client par nom ou email..." 
            className="w-full h-11 pl-12 pr-4 bg-slate-50 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#3653E2]/10 transition-all"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button className="h-11 px-6 bg-slate-50 text-slate-600 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-slate-100 transition-all">
          <Filter size={16} />
          Filtres avancés
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-slate-50">
                <th className="px-6 py-5 font-bold text-slate-400 uppercase tracking-widest text-[10px]">Client</th>
                <th className="px-6 py-5 font-bold text-slate-400 uppercase tracking-widest text-[10px]">Contact</th>
                <th className="px-6 py-5 font-bold text-slate-400 uppercase tracking-widest text-[10px]">Date d'inscription</th>
                <th className="px-6 py-5 font-bold text-slate-400 uppercase tracking-widest text-[10px]">Commandes</th>
                <th className="px-6 py-5"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan="5" className="px-6 py-8 h-20 bg-slate-50/10"></td>
                  </tr>
                ))
              ) : customers.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-20 text-center text-slate-400 font-medium italic">
                    Aucun client trouvé.
                  </td>
                </tr>
              ) : (
                customers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#3653E2]/10 text-[#3653E2] flex items-center justify-center font-bold text-xs">
                          {customer.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="font-bold text-slate-900">{customer.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-slate-600 font-medium">
                          <Mail size={14} className="text-slate-300" />
                          {customer.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-slate-500 font-medium">
                        <Calendar size={14} className="text-slate-300" />
                        {new Date(customer.created_at).toLocaleDateString('fr-FR')}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-50 border border-slate-100 rounded-lg font-bold text-slate-700">
                        <ShoppingBag size={14} className="text-[#3653E2]" />
                        {customer.orders_count || 0}
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => handleDelete(customer.id)}
                          className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-all"
                        >
                          <Trash2 size={18} />
                        </button>
                        <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-lg transition-all">
                          <MoreVertical size={18} />
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
        <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
          <div className="text-[12px] font-bold text-slate-400 uppercase tracking-widest">
            Page {pagination.current_page} sur {pagination.last_page}
          </div>
          <div className="flex gap-2">
             <button 
               disabled={pagination.current_page === 1}
               onClick={() => fetchCustomers(pagination.current_page - 1)}
               className="h-9 px-4 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:border-slate-300 disabled:opacity-50 transition-all"
             >
                Précédent
             </button>
             <button 
               disabled={pagination.current_page === pagination.last_page}
               onClick={() => fetchCustomers(pagination.current_page + 1)}
               className="h-9 px-4 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:border-slate-300 disabled:opacity-50 transition-all"
             >
                Suivant
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}
