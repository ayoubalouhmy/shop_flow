import { useNavigate } from "react-router-dom";
import { Package, Users, Settings, Plus, ArrowRight } from "lucide-react";

const actions = [
  {
    label: "Produits",
    desc: "Gérer l'inventaire et les prix",
    iconBg: "#eef2ff",
    iconColor: "#3653E2",
    to: "/admin/products",
    icon: <Package size={20} />,
  },
  {
    label: "Clients",
    desc: "Liste des utilisateurs actifs",
    iconBg: "#f0fdf4",
    iconColor: "#16a34a",
    to: "/admin/customers",
    icon: <Users size={20} />,
  },
  {
    label: "Configuration",
    desc: "Réglages de la plateforme",
    iconBg: "#fef2f2",
    iconColor: "#dc2626",
    to: "/admin/settings",
    icon: <Settings size={20} />,
  },
];

export default function QuickActions() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-slate-800 tracking-tight">Raccourcis</h3>
        <button className="text-[12px] font-bold text-slate-400 hover:text-slate-600 transition-colors uppercase tracking-widest">
           Personnaliser
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {actions.map(action => (
          <button
            key={action.label}
            className="group flex flex-col p-6 bg-white border border-slate-100 rounded-[24px] text-left hover:border-[#3653E2] hover:shadow-xl hover:shadow-[#3653E2]/5 transition-all outline-none"
            onClick={() => navigate(action.to)}
          >
            <div
               className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
               style={{ background: action.iconBg, color: action.iconColor }}
            >
              {action.icon}
            </div>
            <div className="flex items-center justify-between w-full">
               <div>
                  <div className="text-sm font-bold text-slate-900 mb-1">{action.label}</div>
                  <div className="text-[11px] text-slate-500 font-medium">{action.desc}</div>
               </div>
               <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-[#3653E2] group-hover:text-white transition-all">
                  <ArrowRight size={14} />
               </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}