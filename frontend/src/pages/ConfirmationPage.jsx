import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  ShoppingBag,
  CheckCircle2,
  Truck,
  ArrowRight,
  ExternalLink,
  Mail,
  Sun,
  Moon,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const Navbar = ({ isDarkMode, setIsDarkMode }) => {
  const { user, isAuthenticated } = useAuth();
  return (
    <header className={`sticky top-0 z-50 w-full border-b transition-colors duration-500 ${isDarkMode ? 'border-slate-800 bg-slate-950/80' : 'border-slate-100 bg-white/75'} backdrop-blur-md h-20 flex items-center`}>
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 w-full flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-[#3653E2]">
            <ShoppingBag size={18} className="text-white" />
          </div>
          <span className={`font-bold text-lg tracking-tight ${isDarkMode ? 'text-white' : 'text-[#171a1f]'}`}>Shop<span className="text-[#3653E2]">Flow</span></span>
        </Link>
        <div className="flex items-center gap-4">
             <button onClick={() => { setIsDarkMode(!isDarkMode); document.documentElement.classList.toggle('dark'); }} className="p-2 text-slate-500 hover:text-slate-900 transition-all">
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
             </button>
             {isAuthenticated && (
                <div className="w-10 h-10 rounded-full bg-[#3653E2] text-white flex items-center justify-center font-bold">{user?.name?.charAt(0).toUpperCase()}</div>
             )}
        </div>
      </div>
    </header>
  )
}

export default function ConfirmationPage() {
  const [isDarkMode, setIsDarkMode] = useState(document.documentElement.classList.contains('dark'));
  const orderNumber = "ORD-" + Math.random().toString(36).substr(2, 9).toUpperCase();
  const date = new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDarkMode ? 'bg-slate-950' : 'bg-slate-50'} selection:bg-[#3653E2]/10 selection:text-[#3653E2] font-sans`}>
      <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

      <main className="max-w-4xl mx-auto px-6 py-12 md:py-24 flex flex-col items-center text-center">
        
        {/* Success Icon Animation */}
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 12, stiffness: 100 }}
          className="w-24 h-24 rounded-full bg-emerald-100 flex items-center justify-center mb-8 relative"
        >
          <div className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-20" />
          <CheckCircle2 size={48} className="text-emerald-500 relative z-10" />
        </motion.div>

        <motion.div
           initial={{ y: 20, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           transition={{ delay: 0.2 }}
        >
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-[#111827] mb-4">Merci pour votre commande !</h1>
            <p className="text-lg text-slate-500 mb-12 max-w-lg mx-auto">Votre paiement a été traité avec succès. Nous préparons déjà votre colis avec le plus grand soin.</p>
        </motion.div>

        {/* Order Details Card */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="w-full bg-white rounded-[32px] border border-gray-100 p-8 md:p-12 shadow-2xl shadow-slate-200/50 mb-12 text-left"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
             <div className="space-y-6">
                <div>
                   <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Numéro de commande</h4>
                   <p className="text-base font-bold text-[#111827]">{orderNumber}</p>
                </div>
                <div>
                   <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Date de commande</h4>
                   <p className="text-base font-bold text-[#111827]">{date}</p>
                </div>
                <div>
                   <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Méthode de livraison</h4>
                   <p className="text-base font-bold text-[#111827]">Standard (3-5 jours)</p>
                </div>
             </div>
             
             <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-4">
                   <div className="w-10 h-10 rounded-xl bg-[#3653E2]/10 text-[#3653E2] flex items-center justify-center">
                      <Mail size={18} />
                   </div>
                   <div>
                      <h5 className="text-[11px] font-bold text-[#111827]">Confirmation envoyée</h5>
                      <p className="text-[10px] text-slate-500">Un e-mail récapitulatif vous a été envoyé.</p>
                   </div>
                </div>
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                      <Truck size={18} />
                   </div>
                   <div>
                      <h5 className="text-[11px] font-bold text-[#111827]">Suivi en temps réel</h5>
                      <p className="text-[10px] text-slate-500">Vous recevrez le lien de suivi demain.</p>
                   </div>
                </div>
             </div>
          </div>

          <div className="mt-12 pt-8 border-t border-slate-50 flex flex-col sm:flex-row gap-4">
             <Link to="/profile" className="flex-1 h-14 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-[0.98]">
                Consulter ma commande
                <ExternalLink size={14} />
             </Link>
             <Link to="/shop" className="flex-1 h-14 border border-slate-100 hover:border-slate-200 text-slate-600 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition-all hover:bg-slate-50 active:scale-[0.98]">
                Continuer mes achats
                <ArrowRight size={14} />
             </Link>
          </div>
        </motion.div>

        {/* Help Link */}
        <p className="text-sm font-bold text-slate-400">
           Un problème ? <Link to="#" className="text-[#3653E2] hover:underline">Contactez notre support 24/7</Link>
        </p>

      </main>

    </div>
  )
}
