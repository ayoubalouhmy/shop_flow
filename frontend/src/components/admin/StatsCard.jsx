import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";

export default function StatsCard({ label, value, change, up = true, icon, iconBg, iconColor }) {
  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className="bg-white rounded-[24px] p-6 border border-slate-100 shadow-sm transition-shadow hover:shadow-xl hover:shadow-slate-200/50 flex flex-col gap-4"
    >
      <div className="flex items-center justify-between">
        <div 
          className="w-12 h-12 rounded-2xl flex items-center justify-center"
          style={{ background: iconBg, color: iconColor }}
        >
          {icon}
        </div>
        <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ${up ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
          {up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {up ? '+12%' : '-2%'}
        </div>
      </div>

      <div>
        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">{label}</p>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">{value}</h2>
      </div>

      <div className="pt-4 border-t border-slate-50">
        <p className="text-[11px] text-slate-500 font-medium">
          <span className={up ? 'text-emerald-500 font-bold' : 'text-rose-500 font-bold'}>
            {change}
          </span>
          <span className="ml-1 text-slate-400">depuis le début de la semaine</span>
        </p>
      </div>
    </motion.div>
  );
}