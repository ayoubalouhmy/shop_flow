import { TrendingUp, Package, ArrowRight } from "lucide-react";

export default function BestSellingProducts({ products }) {
  const displayProducts = products || [];

  return (
    <div className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm flex flex-col h-full">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-lg font-bold text-slate-900 tracking-tight">Performances</h3>
          <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest mt-1">Produits les plus vendus</p>
        </div>
        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
           <TrendingUp size={18} />
        </div>
      </div>

      <div className="flex-1 space-y-6">
        {displayProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full py-12 text-center">
            <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 mb-4">
               <Package size={24} />
            </div>
            <p className="text-sm font-medium text-slate-400">Aucune donnée disponible</p>
          </div>
        ) : (
          displayProducts.map((product, i) => (
            <div key={product.id} className="flex items-center gap-4 group cursor-default">
              <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-xs font-black text-slate-400 group-hover:bg-[#3653E2] group-hover:text-white transition-all">
                {i + 1}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-bold text-slate-800 truncate mb-0.5">{product.name}</div>
                <div className="flex items-center gap-2">
                   <span className="text-[11px] font-bold text-[#3653E2] bg-[#3653E2]/5 px-2 py-0.5 rounded-md">
                    {product.order_items_count || 0} ventes
                   </span>
                   <span className="text-[11px] text-slate-400 font-medium">
                    {Number(product.price).toLocaleString("fr-FR")} €
                   </span>
                </div>
              </div>
              <div className={`text-[11px] font-bold ${product.stock > 10 ? "text-emerald-500" : "text-rose-500"}`}>
                {product.stock} stock
              </div>
            </div>
          ))
        )}
      </div>

      <button
        className="mt-8 h-12 w-full flex items-center justify-center gap-2 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-2xl text-xs font-bold transition-all group"
        onClick={() => window.location.href='/admin/products'}
      >
        Accéder à l'inventaire
        <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
      </button>
    </div>
  );
}