import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import {
  ShoppingBag,
  ShieldCheck,
  CreditCard,
  Lock,
  ArrowLeft,
  Package,
  CheckCircle2,
  CreditCard as CardIcon,
  Wallet,
  Building,
  Info,
  Sun,
  Moon
} from 'lucide-react'
import { useOrderSummary } from '../hooks/useCheckoutHooks'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'


// --- SHARED COMPONENTS (Simplified for this file) ---
const Navbar = ({ isDarkMode, setIsDarkMode }) => {
  const { cartCount } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  return (
    <header className={`sticky top-0 z-50 w-full border-b transition-colors duration-500 ${isDarkMode ? 'border-slate-800 bg-slate-950/80' : 'border-slate-100 bg-white/75'} backdrop-blur-md h-20 flex items-center`}>
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 w-full flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-[#3653E2] shadow-md shadow-[#3653E2]/25 group-hover:scale-105 transition-transform duration-300">
            <ShoppingBag size={18} className="text-white" strokeWidth={2} />
          </div>
          <span className={`font-bold text-lg tracking-tight ${isDarkMode ? 'text-white' : 'text-[#171a1f]'}`}>Shop<span className="text-[#3653E2]">Flow</span></span>
        </Link>
        <div className="flex items-center gap-4">
             <button onClick={() => { setIsDarkMode(!isDarkMode); document.documentElement.classList.toggle('dark'); }} className="p-2 text-slate-500 hover:text-slate-900 transition-all">
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
             </button>
             <Link to="/cart" className="p-2 text-slate-500 hover:text-slate-900 relative">
                <ShoppingBag size={20} />
                {cartCount > 0 && <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#3653E2] text-white text-[9px] flex items-center justify-center font-bold">{cartCount}</span>}
             </Link>
             {isAuthenticated && (
                <Link to="/profile" className="w-10 h-10 rounded-full bg-[#3653E2] text-white flex items-center justify-center font-bold hover:scale-105 transition-transform shadow-md shadow-[#3653E2]/20" title="Mon profil">
                  {user?.name?.charAt(0).toUpperCase()}
                </Link>
             )}
        </div>
      </div>
    </header>
  )
}

const Footer = ({ isDarkMode }) => {
  return (
    <footer className={`py-12 px-6 sm:px-12 lg:px-16 border-t transition-colors duration-500 ${isDarkMode ? 'bg-slate-950 border-slate-900' : 'bg-white border-slate-100'}`}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-[11px] font-bold text-slate-400">
        <p>© 2024 SHOPFLOW. TOUS DROITS RÉSERVÉS.</p>
        <div className="flex gap-8 uppercase tracking-widest">
          <Link to="#" className="hover:text-slate-900 transition-colors">Privacy Policy</Link>
          <Link to="#" className="hover:text-slate-900 transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  )
}

// --- MAIN PAGE ---
export default function PaymentPage() {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(document.documentElement.classList.contains('dark'));
  const { data: summary, isLoading: isSummaryLoading } = useOrderSummary();
  const { clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    setIsProcessing(true);
    // Simulation d'un appel API de paiement
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccess(true);
      clearCart();
      
      // Delai supplémentaire pour apprécier l'animation de succès
      setTimeout(() => {
        navigate('/checkout/confirmation');
      }, 1500);
    }, 2000);
  };

  const steps = [
    { id: 1, label: 'Livraison', icon: Package, status: 'completed' },
    { id: 2, label: 'Paiement', icon: CreditCard, status: 'active' },
    { id: 3, label: 'Confirmation', icon: CheckCircle2, status: 'pending' },
  ];

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDarkMode ? 'bg-slate-950' : 'bg-slate-50'} selection:bg-[#3653E2]/10 selection:text-[#3653E2] font-sans`}>
      <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

      <main className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 py-12 md:py-20 text-left">
        
        {/* Stepper */}
        <div className="max-w-3xl mx-auto mb-20">
          <div className="flex items-center justify-between relative">
             <div className="absolute top-1/2 left-0 w-full h-[2px] bg-slate-200 -translate-y-1/2 -z-0" />
             {steps.map((step, idx) => (
               <div key={step.id} className="relative z-10 flex flex-col items-center gap-3">
                  <div className={`w-12 h-12 rounded-full border-4 flex items-center justify-center transition-all duration-500 ${
                    step.status === 'active' 
                      ? 'bg-[#3653E2] border-white shadow-lg shadow-[#3653E2]/20' 
                      : step.status === 'completed'
                      ? 'bg-emerald-500 border-white text-white'
                      : 'bg-white border-slate-100 text-slate-300'
                  }`}>
                     {step.status === 'completed' ? <CheckCircle2 size={20} /> : <step.icon size={20} className={step.status === 'active' ? 'text-white' : 'text-slate-300'} />}
                  </div>
                  <span className={`text-[11px] font-bold uppercase tracking-[0.15em] ${step.status === 'active' ? 'text-[#3653E2]' : step.status === 'completed' ? 'text-emerald-500' : 'text-slate-400'}`}>
                    {step.label}
                  </span>
               </div>
             ))}
          </div>
        </div>

        {/* Page Title */}
        <div className="mb-12">
            <Link to="/checkout" className="group flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-[#3653E2] transition-colors mb-4">
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                Retour aux informations de livraison
            </Link>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#111827] mb-4">Méthode de paiement</h1>
            <p className="text-lg text-slate-500">Choisissez comment vous souhaitez régler votre commande.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
           
           {/* Left Column: Form */}
           <div className="lg:col-span-8 space-y-10">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-[32px] border border-gray-100 p-8 md:p-12 shadow-sm"
              >
                 {/* Payment Strategy Selection */}
                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
                    <button className="border-2 border-[#3653E2] bg-[#3653E2]/5 rounded-2xl p-4 flex flex-col items-center gap-3 transition-all">
                       <CardIcon size={24} className="text-[#3653E2]" />
                       <span className="text-xs font-bold text-[#3653E2] uppercase tracking-widest">Carte Bancaire</span>
                    </button>
                    <button className="border-2 border-gray-50 bg-gray-50/50 rounded-2xl p-4 flex flex-col items-center gap-3 grayscale opacity-60 cursor-not-allowed">
                       <Wallet size={24} className="text-gray-400" />
                       <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">PayPal</span>
                    </button>
                    <button className="border-2 border-gray-50 bg-gray-50/50 rounded-2xl p-4 flex flex-col items-center gap-3 grayscale opacity-60 cursor-not-allowed">
                       <Building size={24} className="text-gray-400" />
                       <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Virement</span>
                    </button>
                 </div>

                 <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    <div className="space-y-2 text-left">
                       <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Nom sur la carte</label>
                       <input 
                          {...register('card_name', { required: 'Le nom est requis' })}
                          className={`w-full h-[56px] px-5 rounded-2xl border bg-slate-50/50 outline-none transition-all ${errors.card_name ? 'border-rose-400 bg-rose-50/20' : 'border-gray-100 focus:border-[#3653E2] focus:bg-white'}`}
                          placeholder="M. AYOUB ALOUHMY"
                       />
                       {errors.card_name && <p className="text-[10px] font-bold text-rose-500 ml-1">{errors.card_name.message}</p>}
                    </div>

                    <div className="space-y-2 text-left">
                       <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Numéro de carte</label>
                       <div className="relative">
                          <CardIcon className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
                          <input 
                             {...register('card_number', { required: 'Requis', pattern: { value: /^[0-9]{16}$/, message: '16 chiffres requis' } })}
                             maxLength={16}
                             className={`w-full h-[56px] pl-14 pr-5 rounded-2xl border bg-slate-50/50 outline-none transition-all ${errors.card_number ? 'border-rose-400 bg-rose-50/20' : 'border-gray-100 focus:border-[#3653E2] focus:bg-white'}`}
                             placeholder="0000 0000 0000 0000"
                          />
                       </div>
                       {errors.card_number && <p className="text-[10px] font-bold text-rose-500 ml-1">{errors.card_number.message}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                       <div className="space-y-2 text-left">
                          <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Échéance (MM/YY)</label>
                          <input 
                             {...register('expiry', { required: 'Requis', pattern: { value: /^(0[1-9]|1[0-2])\/([0-9]{2})$/, message: 'Format MM/YY' } })}
                             maxLength={5}
                             className={`w-full h-[56px] px-5 rounded-2xl border bg-slate-50/50 outline-none transition-all ${errors.expiry ? 'border-rose-400 bg-rose-50/20' : 'border-gray-100 focus:border-[#3653E2] focus:bg-white'}`}
                             placeholder="12/26"
                          />
                          {errors.expiry && <p className="text-[10px] font-bold text-rose-500 ml-1">{errors.expiry.message}</p>}
                       </div>
                       <div className="space-y-2 text-left">
                          <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">CVC</label>
                          <div className="relative">
                             <input 
                                {...register('cvc', { required: 'Requis', pattern: { value: /^[0-9]{3}$/, message: '3 chiffres' } })}
                                maxLength={3}
                                type="password"
                                className={`w-full h-[56px] px-5 rounded-2xl border bg-slate-50/50 outline-none transition-all ${errors.cvc ? 'border-rose-400 bg-rose-50/20' : 'border-gray-100 focus:border-[#3653E2] focus:bg-white'}`}
                                placeholder="123"
                             />
                             <Info size={16} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300" />
                          </div>
                          {errors.cvc && <p className="text-[10px] font-bold text-rose-500 ml-1">{errors.cvc.message}</p>}
                       </div>
                    </div>

                    <div className={`p-6 rounded-2xl border flex items-center gap-4 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-blue-50/30 border-blue-100'}`}>
                       <Lock size={20} className="text-[#3653E2]" />
                       <p className="text-[11px] text-slate-500 leading-relaxed font-medium">Vos informations de paiement sont cryptées de bout en bout et ne sont jamais stockées sur nos serveurs. Nous utilisons la technologie SSL pour une sécurité maximale.</p>
                    </div>

                    <button 
                       type="submit"
                       disabled={isProcessing}
                       className="w-full h-16 bg-[#3653E2] hover:bg-[#2a44c8] active:scale-[0.98] text-white rounded-[20px] font-bold text-sm shadow-2xl shadow-[#3653E2]/30 transition-all duration-300 flex items-center justify-center gap-3 mt-4"
                    >
                       {isProcessing ? (
                         <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                       ) : (
                         <>
                           Confirmer et payer {Number(summary?.items?.reduce((acc, i) => acc + (i.product.price * i.quantity), 0) || 0 + 15).toFixed(2)}€
                           <CheckCircle2 size={18} />
                         </>
                       )}
                    </button>
                 </form>
              </motion.div>
           </div>

           {/* Right Column: Order Summary */}
           <aside className="lg:col-span-4 sticky top-24 space-y-6">
              <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-xl shadow-slate-200/40">
                 <h2 className="text-xl font-extrabold text-[#111827] mb-8">Votre commande</h2>
                 <div className="space-y-6 mb-8">
                    {summary?.items?.map((item) => (
                       <div key={item.id} className="flex gap-4">
                          <div className="w-12 h-12 rounded-xl bg-slate-50 overflow-hidden flex-shrink-0">
                             <img 
                                src={item.product?.images ? (item.product.images[0].startsWith('http') ? item.product.images[0] : `http://localhost:8000/storage/${item.product.images[0]}`) : item.product?.image || 'https://via.placeholder.com/100'} 
                                className="w-full h-full object-cover" 
                                alt={item.product?.name} 
                             />
                          </div>
                          <div className="flex-1 text-left">
                             <h4 className="text-[11px] font-bold text-gray-800 line-clamp-1">{item.product?.name}</h4>
                             <p className="text-[10px] text-gray-400">Quantité : {item.quantity}</p>
                             <span className="text-[11px] font-bold text-[#3653E2]">{Number(item.product?.price * item.quantity).toFixed(2)}€</span>
                          </div>
                       </div>
                    ))}
                 </div>

                 <div className="space-y-4 pt-6 border-t border-slate-50">
                    <div className="flex justify-between items-center text-xs font-bold">
                       <span className="text-slate-400">SOUS-TOTAL</span>
                       <span className="text-[#111827]">{Number(summary?.items?.reduce((acc, i) => acc + (i.product.price * i.quantity), 0) || 0).toFixed(2)}€</span>
                    </div>
                    <div className="flex justify-between items-center text-xs font-bold">
                       <span className="text-slate-400">LIVRAISON</span>
                       <span className="text-[#111827]">15.00€</span>
                    </div>
                    <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                       <span className="text-base font-extrabold text-[#111827]">TOTAL</span>
                       <span className="text-2xl font-black text-[#3653E2]">{Number(summary?.items?.reduce((acc, i) => acc + (i.product.price * i.quantity), 0) || 0 + 15).toFixed(2)}€</span>
                    </div>
                 </div>
              </div>

              <div className="p-6 rounded-3xl bg-[#F2F4FD] border border-[#3653E2]/10 flex gap-4">
                 <div className="w-10 h-10 rounded-xl bg-[#3653E2]/10 text-[#3653E2] flex items-center justify-center flex-shrink-0">
                    <ShieldCheck size={20} />
                 </div>
                 <div className="text-left">
                    <h5 className="text-[11px] font-bold text-[#111827] mb-1">Garantie ShopFlow</h5>
                    <p className="text-[10px] text-slate-500 leading-relaxed">Transactions 100% sécurisées via protocole 3D-Secure.</p>
                 </div>
              </div>
           </aside>
        </div>

      </main>

      <Footer isDarkMode={isDarkMode} />

      {/* Success Animation Overlay */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-white/90 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", damping: 15 }}
              className="flex flex-col items-center gap-6"
            >
              <div className="w-24 h-24 rounded-full bg-emerald-500 flex items-center justify-center shadow-2xl shadow-emerald-500/40">
                 <CheckCircle2 size={48} className="text-white" />
              </div>
              <div className="text-center">
                 <h2 className="text-3xl font-black text-slate-900 mb-2">Paiement Accepté</h2>
                 <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Traitement de votre commande en cours...</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
