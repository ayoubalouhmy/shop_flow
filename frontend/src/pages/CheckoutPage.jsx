import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import {
  ShoppingBag,
  ChevronRight,
  Truck,
  ShieldCheck,
  CreditCard,
  Lock,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  MapPin,
  Phone,
  User,
  CheckCircle2,
  Calendar,
  Package,
  Sun,
  Moon
} from 'lucide-react'
import { useOrderSummary, useCheckout } from '../hooks/useCheckoutHooks'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'


// --- SHARED COMPONENTS ---
const Navbar = ({ isDarkMode, setIsDarkMode }) => {
  const { cartCount } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  
  return (
    <header className={`sticky top-0 z-50 w-full border-b transition-colors duration-500 ${isDarkMode ? 'border-slate-800 bg-slate-950/80' : 'border-slate-100 bg-white/75'} backdrop-blur-md`}>
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 h-20 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-[#3653E2] shadow-md shadow-[#3653E2]/25 group-hover:scale-105 transition-transform duration-300">
            <ShoppingBag size={18} className="text-white" strokeWidth={2} />
          </div>
          <span className={`font-bold text-lg tracking-tight ${isDarkMode ? 'text-white' : 'text-[#171a1f]'}`}>
            Shop<span className="text-[#3653E2]">Flow</span>
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8 font-medium text-sm text-slate-600">
          <Link to="/" className="hover:text-[#3653E2] transition-colors">Accueil</Link>
          <Link to="/shop" className="hover:text-slate-900 transition-colors">Produits</Link>
          <Link to="/about" className="hover:text-slate-900 transition-colors">À propos</Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => {
              setIsDarkMode(!isDarkMode);
              document.documentElement.classList.toggle('dark');
            }}
            className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100/50 rounded-full transition-all duration-200"
            aria-label="Thème"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <Link to="/cart" className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100/50 rounded-full relative transition-all duration-200" aria-label="Panier">
            <ShoppingBag size={20} strokeWidth={1.8} />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#3653E2] text-white text-[9px] flex items-center justify-center font-bold">{cartCount}</span>
            )}
          </Link>
          {isAuthenticated ? (
            <div className="flex items-center gap-3 ml-2">
              <div 
                className="w-10 h-10 rounded-full bg-[#3653E2] text-white flex items-center justify-center font-bold shadow-lg shadow-[#3653E2]/20 shadow-lg shadow-[#3653E2]/20 cursor-pointer"
                title={user?.name}
              >
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <button 
                onClick={() => { logout(); navigate('/'); }}
                className="
                  px-4 h-9 rounded-xl bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-600
                  text-xs font-bold transition-all duration-200
                "
              >
                Déconnecter
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
                <Link to="/login" className="text-sm font-bold text-slate-600 hover:text-[#3653E2]">Connexion</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

const Footer = ({ isDarkMode }) => {
  return (
    <footer className={`py-20 px-6 sm:px-12 lg:px-16 border-t transition-colors duration-500 ${isDarkMode ? 'bg-slate-950 border-slate-900' : 'bg-white border-slate-100'}`}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-12 text-left">
        <div className="lg:col-span-4">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-[#3653E2] flex items-center justify-center">
              <ShoppingBag size={20} className="text-white" />
            </div>
            <span className={`text-xl font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>ShopFlow</span>
          </div>
          <p className="text-sm text-slate-500 leading-relaxed max-w-sm">Découvrez une sélection curatée de produits premium alliant design minimaliste et qualité exceptionnelle.</p>
        </div>
        <div className="lg:col-span-2 lg:col-start-6">
          <h4 className={`font-bold text-xs uppercase tracking-widest mb-8 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Shop</h4>
          <ul className="space-y-4 text-xs text-slate-500">
            <li><Link to="/shop" className="hover:text-[#3653E2] transition-colors">New Arrivals</Link></li>
            <li><Link to="#" className="hover:text-[#3653E2] transition-colors">Best Sellers</Link></li>
            <li><Link to="#" className="hover:text-[#3653E2] transition-colors">Sale</Link></li>
          </ul>
        </div>
        <div className="lg:col-span-2">
          <h4 className={`font-bold text-xs uppercase tracking-widest mb-8 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Support</h4>
          <ul className="space-y-4 text-xs text-slate-500">
            <li><Link to="#" className="hover:text-[#3653E2] transition-colors">Shipping Policy</Link></li>
            <li><Link to="#" className="hover:text-[#3653E2] transition-colors">Returns</Link></li>
            <li><Link to="#" className="hover:text-[#3653E2] transition-colors">Contact</Link></li>
          </ul>
        </div>
        <div className="lg:col-span-3">
          <h4 className={`font-bold text-xs uppercase tracking-widest mb-8 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Newsletter</h4>
          <div className="flex gap-2">
            <input type="email" placeholder="Email" className={`flex-1 h-12 px-4 rounded-xl border text-xs outline-none transition-all ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-100'}`} />
            <button className="h-12 px-6 bg-[#111827] text-white text-[10px] font-bold rounded-xl active:scale-95 transition-all">OK</button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto pt-16 mt-16 border-t border-slate-50 flex flex-col sm:flex-row items-center justify-between gap-6 text-[11px] font-bold text-slate-400">
        <p>© 2024 SHOPFLOW. TOUS DROITS RÉSERVÉS.</p>
        <div className="flex gap-8 uppercase tracking-widest">
          <Link to="#" className="hover:text-slate-900 transition-colors">Privacy Policy</Link>
          <Link to="#" className="hover:text-slate-900 transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  )
}

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 last:border-0 py-4">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left group"
      >
        <span className="text-sm font-bold text-gray-700 group-hover:text-[#3653E2] transition-colors">{question}</span>
        {isOpen ? <ChevronUp size={18} className="text-[#3653E2]" /> : <ChevronDown size={18} className="text-gray-400" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pt-4 text-xs text-gray-500 leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// --- MAIN PAGE ---
export default function CheckoutPage() {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(document.documentElement.classList.contains('dark'));
  const { data: summary, isLoading: isSummaryLoading } = useOrderSummary();
  const { saveShipping, isSaving } = useCheckout();
  
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      same_billing: true
    }
  });

  const onSubmit = async (data) => {
    // Save shipping info to sessionStorage so PaymentPage can use it when creating the order
    sessionStorage.setItem('shipping_data', JSON.stringify(data));
    navigate('/checkout/payment');
  };

  const steps = [
    { id: 1, label: 'Livraison', icon: Package, status: 'active' },
    { id: 2, label: 'Paiement', icon: CreditCard, status: 'pending' },
    { id: 3, label: 'Confirmation', icon: CheckCircle2, status: 'pending' },
  ];

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDarkMode ? 'bg-slate-950' : 'bg-surface'} selection:bg-[#3653E2]/10 selection:text-[#3653E2] font-sans`}>
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
                      : 'bg-white border-slate-100 text-slate-300'
                  }`}>
                     <step.icon size={20} className={step.status === 'active' ? 'text-white' : 'text-slate-300'} />
                  </div>
                  <span className={`text-[11px] font-bold uppercase tracking-[0.15em] ${step.status === 'active' ? 'text-[#3653E2]' : 'text-slate-400'}`}>
                    {step.label}
                  </span>
               </div>
             ))}
          </div>
        </div>

        {/* Page Title */}
        <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#111827] mb-4">Informations de livraison</h1>
            <p className="text-lg text-slate-500">Veuillez renseigner vos informations pour finaliser votre commande.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
           
           {/* Left Column: Form */}
           <div className="lg:col-span-8 space-y-10">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-[24px] border border-gray-100 p-8 shadow-sm"
              >
                 <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div className="space-y-2 text-left">
                          <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Prénom</label>
                          <div className="relative">
                             <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                             <input 
                                {...register('first_name', { required: 'Le prénom est requis', minLength: { value: 2, message: 'Min 2 caractères' } })}
                                className={`w-full h-[52px] pl-12 pr-4 rounded-xl border bg-slate-50/50 outline-none transition-all ${errors.first_name ? 'border-rose-400 bg-rose-50/20' : 'border-gray-100 focus:border-[#3653E2] focus:bg-white'}`}
                                placeholder="Jean"
                             />
                          </div>
                          {errors.first_name && <p className="text-[10px] font-bold text-rose-500 ml-1">{errors.first_name.message}</p>}
                       </div>
                       <div className="space-y-2 text-left">
                          <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Nom</label>
                          <input 
                             {...register('last_name', { required: 'Le nom est requis', minLength: { value: 2, message: 'Min 2 caractères' } })}
                             className={`w-full h-[52px] px-4 rounded-xl border bg-slate-50/50 outline-none transition-all ${errors.last_name ? 'border-rose-400 bg-rose-50/20' : 'border-gray-100 focus:border-[#3653E2] focus:bg-white'}`}
                             placeholder="Dupont"
                          />
                          {errors.last_name && <p className="text-[10px] font-bold text-rose-500 ml-1">{errors.last_name.message}</p>}
                       </div>
                    </div>

                    <div className="space-y-2 text-left">
                       <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Adresse</label>
                       <div className="relative">
                          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                          <input 
                             {...register('address', { required: 'L\'adresse est requise', minLength: { value: 5, message: 'Adresse trop courte' } })}
                             className={`w-full h-[52px] pl-12 pr-4 rounded-xl border bg-slate-50/50 outline-none transition-all ${errors.address ? 'border-rose-400 bg-rose-50/20' : 'border-gray-100 focus:border-[#3653E2] focus:bg-white'}`}
                             placeholder="12 rue de la Paix"
                          />
                       </div>
                       {errors.address && <p className="text-[10px] font-bold text-rose-500 ml-1">{errors.address.message}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div className="space-y-2 text-left">
                          <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Code Postal</label>
                          <input 
                             {...register('postal_code', { required: 'Requis', pattern: { value: /^[0-9]{5}$/, message: 'Invalide' } })}
                             className={`w-full h-[52px] px-4 rounded-xl border bg-slate-50/50 outline-none transition-all ${errors.postal_code ? 'border-rose-400 bg-rose-50/20' : 'border-gray-100 focus:border-[#3653E2] focus:bg-white'}`}
                             placeholder="75000"
                          />
                          {errors.postal_code && <p className="text-[10px] font-bold text-rose-500 ml-1">{errors.postal_code.message}</p>}
                       </div>
                       <div className="space-y-2 text-left">
                          <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Ville</label>
                          <input 
                             {...register('city', { required: 'La ville est requise' })}
                             className={`w-full h-[52px] px-4 rounded-xl border bg-slate-50/50 outline-none transition-all ${errors.city ? 'border-rose-400 bg-rose-50/20' : 'border-gray-100 focus:border-[#3653E2] focus:bg-white'}`}
                             placeholder="Paris"
                          />
                          {errors.city && <p className="text-[10px] font-bold text-rose-500 ml-1">{errors.city.message}</p>}
                       </div>
                    </div>

                    <div className="space-y-2 text-left">
                       <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Téléphone</label>
                       <div className="relative">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                          <input 
                             {...register('phone', { required: 'Le téléphone est requis', pattern: { value: /^[0-9+]{10,15}$/, message: 'Numéro invalide' } })}
                             className={`w-full h-[52px] pl-12 pr-4 rounded-xl border bg-slate-50/50 outline-none transition-all ${errors.phone ? 'border-rose-400 bg-rose-50/20' : 'border-gray-100 focus:border-[#3653E2] focus:bg-white'}`}
                             placeholder="0612345678"
                          />
                       </div>
                       {errors.phone && <p className="text-[10px] font-bold text-rose-500 ml-1">{errors.phone.message}</p>}
                    </div>

                    <label className="flex items-center gap-3 cursor-pointer group mt-4">
                       <div className="relative flex items-center justify-center">
                          <input type="checkbox" {...register('same_billing')} className="peer sr-only" />
                          <div className={`w-5 h-5 rounded-md border-2 transition-all ${isDarkMode ? 'border-slate-800' : 'border-gray-200'} peer-checked:bg-[#3653E2] peer-checked:border-[#3653E2]`} />
                          <CheckCircle2 size={12} className="absolute text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                       </div>
                       <span className="text-xs font-bold text-slate-500 group-hover:text-slate-700 transition-colors">L'adresse de facturation est la même que l'adresse de livraison</span>
                    </label>

                    <button 
                       type="submit"
                       disabled={isSaving}
                       className="w-full h-14 bg-[#3653E2] hover:bg-[#2a44c8] active:scale-[0.98] text-white rounded-2xl font-bold text-sm shadow-xl shadow-[#3653E2]/20 transition-all duration-300 flex items-center justify-center gap-3 group mt-4 overflow-hidden"
                    >
                       {isSaving ? (
                         <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                       ) : (
                         <>
                           Continuer vers le paiement
                           <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                         </>
                       )}
                    </button>
                 </form>
              </motion.div>

              {/* FAQ Section */}
              <div className="pt-12 text-left">
                  <h3 className="text-xl font-extrabold text-[#111827] mb-8">Besoin d'aide ?</h3>
                  <div className="bg-white rounded-3xl border border-gray-100 p-8">
                     <FAQItem 
                       question="Quels sont les délais de livraison ?"
                       answer="Nous livrons généralement sous 3 à 5 jours ouvrés partout en France métropolitaine via nos partenaires premium."
                     />
                     <FAQItem 
                       question="Puis-je retourner mes articles ?"
                       answer="Oui, vous disposez de 30 jours à compter de la réception pour nous retourner gratuitement vos articles."
                     />
                     <FAQItem 
                       question="Quels moyens de paiement acceptez-vous ?"
                       answer="Nous acceptons les cartes Visa, Mastercard, American Express ainsi que les solutions PayPal et Apple Pay."
                     />
                     <FAQItem 
                      question="Comment suivre ma commande ?"
                      answer="Dès que votre colis est expédié, vous recevrez un email avec un lien de suivi pour consulter son état en temps réel."
                     />
                  </div>
              </div>
           </div>

           {/* Right Column: Order Summary */}
           <aside className="lg:col-span-4 sticky top-24 space-y-6">
              <div className="bg-white p-8 rounded-[24px] border border-gray-100 shadow-xl shadow-slate-200/40">
                 <div className="flex items-center justify-between mb-8">
                    <h2 className="text-xl font-extrabold text-[#111827]">Résumé</h2>
                    <span className="px-3 py-1 rounded-full bg-slate-50 text-slate-400 text-[10px] font-bold uppercase tracking-widest border border-slate-100">
                       {summary?.items?.length || 0} articles
                    </span>
                 </div>

                 <div className="space-y-6 max-h-[300px] overflow-y-auto pr-2 mb-8 custom-scrollbar">
                    {summary?.items?.map((item) => (
                       <div key={item.id} className="flex gap-4">
                          <div className="w-16 h-16 rounded-xl bg-slate-50 overflow-hidden flex-shrink-0">
                             <img 
                                src={item.product?.images ? (item.product.images[0].startsWith('http') ? item.product.images[0] : `http://localhost:8000/storage/${item.product.images[0]}`) : item.product?.image || 'https://via.placeholder.com/100'} 
                                className="w-full h-full object-cover" 
                                alt={item.product?.name} 
                             />
                          </div>
                          <div className="flex-1 text-left">
                             <h4 className="text-xs font-bold text-gray-800 line-clamp-1 mb-1">{item.product?.name}</h4>
                             <p className="text-[10px] text-gray-400 mb-1">Quantité : {item.quantity}</p>
                             <span className="text-xs font-bold text-[#3653E2]">{Number(item.product?.price * item.quantity).toFixed(2)}€</span>
                          </div>
                       </div>
                    ))}
                    {isSummaryLoading && (
                      <div className="space-y-4">
                         {[...Array(2)].map((_, i) => <div key={i} className="h-16 w-full bg-slate-50 rounded-xl animate-pulse" />)}
                      </div>
                    )}
                 </div>

                 <div className="space-y-4 pt-6 border-t border-slate-50">
                    <div className="flex justify-between items-center text-xs font-bold">
                       <span className="text-slate-400 uppercase tracking-widest">Sous-total</span>
                       <span className="text-[#111827]">{Number(summary?.items?.reduce((acc, i) => acc + (i.product.price * i.quantity), 0) || 0).toFixed(2)}€</span>
                    </div>
                    <div className="flex justify-between items-center text-xs font-bold">
                       <span className="text-slate-400 uppercase tracking-widest">Livraison</span>
                       <span className="text-emerald-500 uppercase tracking-widest">Offerte</span>
                    </div>
                    <div className="pt-4 border-t border-slate-50 flex justify-between items-center">
                       <span className="text-base font-extrabold text-[#111827]">Total</span>
                       <span className="text-xl font-extrabold text-[#3653E2]">{Number(summary?.items?.reduce((acc, i) => acc + (i.product.price * i.quantity), 0) || 0).toFixed(2)}€</span>
                    </div>
                 </div>
              </div>

              {/* Security Block */}
              <div className="space-y-4">
                  <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                     <Lock size={12} className="text-slate-300" />
                     Paiement sécurisé SSL
                  </div>
                  <div className="p-6 rounded-3xl bg-[#F2F4FD] border border-[#3653E2]/10 flex gap-4">
                     <div className="w-10 h-10 rounded-xl bg-[#3653E2]/10 text-[#3653E2] flex items-center justify-center flex-shrink-0">
                        <ShieldCheck size={20} />
                     </div>
                     <div className="text-left">
                        <h5 className="text-[11px] font-bold text-[#111827] mb-1">Garantie ShopFlow</h5>
                        <p className="text-[10px] text-slate-500 leading-relaxed">Paiements 100% sécurisés et service client premium disponible 24/7.</p>
                     </div>
                  </div>
              </div>
           </aside>
        </div>

      </main>

      <Footer isDarkMode={isDarkMode} />
    </div>
  )
}
