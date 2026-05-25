import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  ShoppingBag,
  Moon,
  Sun,
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  ChevronRight,
  ShieldCheck,
  Truck,
  MessageSquare,
  CreditCard,
  Lock,
  Mail,
  Menu,
  X
} from 'lucide-react'

// --- MOCK DATA ---
const initialCartItems = [
  {
    id: 1,
    name: "Veste en Laine Mérinos Premium",
    color: "Charcoal",
    size: "M",
    price: 249,
    quantity: 1,
    stock: "En stock",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 2,
    name: "Fauteuil Velours 'Aura'",
    color: "Bleu Minuit",
    size: "Standard",
    price: 349,
    quantity: 1,
    stock: "En stock",
    image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 3,
    name: "Lampe de Bureau 'Archi'",
    color: "Noir Mat",
    size: "Standard",
    price: 89,
    quantity: 2,
    stock: "En stock",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=400&q=80"
  }
]

// --- COMPONENTS ---

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/75 backdrop-blur-md transition-all duration-300">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 sm:px-12 lg:px-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-[#3653E2] shadow-md shadow-[#3653E2]/25 group-hover:scale-105 transition-transform duration-300">
            <ShoppingBag size={18} className="text-white" strokeWidth={2} />
          </div>
          <span className="font-bold text-lg tracking-tight text-[#171a1f]">
            Shop<span className="text-[#3653E2]">Flow</span>
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8 font-medium text-sm text-slate-600">
          <Link to="/" className="hover:text-[#3653E2] transition-colors">Accueil</Link>
          <Link to="/shop" className="hover:text-[#3653E2] transition-colors">Produits</Link>
          <Link to="#" className="hover:text-slate-900 transition-colors">À propos</Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100/50 rounded-full transition-all duration-200"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <Link to="/cart" className="p-2 text-[#3653E2] bg-[#3653E2]/5 rounded-full relative transition-all duration-200" aria-label="Panier">
            <ShoppingBag size={20} strokeWidth={1.8} />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#3653E2]" />
          </Link>

          <div className="h-9 w-9 rounded-full overflow-hidden border-2 border-white shadow-sm ml-2">
            <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80" alt="Profile" className="w-full h-full object-cover" />
          </div>

          <button className="md:hidden p-2 text-slate-500" onClick={() => setMobileMenuOpen(true)}>
            <Menu size={24} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-[60] bg-white p-6"
          >
            <div className="flex justify-between items-center mb-8">
              <span className="font-bold text-lg">Menu</span>
              <button onClick={() => setMobileMenuOpen(false)}><X size={24} /></button>
            </div>
            <ul className="space-y-6 font-semibold text-lg">
              <li><Link to="/" onClick={() => setMobileMenuOpen(false)}>Accueil</Link></li>
              <li><Link to="/shop" onClick={() => setMobileMenuOpen(false)}>Produits</Link></li>
              <li><Link to="#" onClick={() => setMobileMenuOpen(false)}>À propos</Link></li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

const Footer = () => {
  return (
    <footer className="pt-24 pb-12 px-6 sm:px-12 lg:px-16 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
        <div className="lg:col-span-4">
          <Link to="/" className="flex items-center gap-2.5 group mb-6">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#3653E2] shadow-md shadow-[#3653E2]/25">
              <ShoppingBag size={15} className="text-white" strokeWidth={2} />
            </div>
            <span className="font-bold text-lg tracking-tight text-[#171a1f]">
              Shop<span className="text-[#3653E2]">Flow</span>
            </span>
          </Link>
          <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
            Elevating your lifestyle with premium essentials designed for modern living.
          </p>
        </div>

        <div className="lg:col-span-2">
          <h4 className="font-bold text-xs uppercase tracking-widest text-slate-900 mb-6">Shop</h4>
          <ul className="space-y-4 text-xs text-slate-500">
            <li><Link to="/shop" className="hover:text-slate-900 transition-colors">New Arrivals</Link></li>
            <li><Link to="#" className="hover:text-slate-900 transition-colors">Best Sellers</Link></li>
            <li><Link to="#" className="hover:text-slate-900 transition-colors">Sale</Link></li>
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h4 className="font-bold text-xs uppercase tracking-widest text-slate-900 mb-6">Support</h4>
          <ul className="space-y-4 text-xs text-slate-500">
            <li><Link to="#" className="hover:text-slate-900 transition-colors">Shipping Policy</Link></li>
            <li><Link to="#" className="hover:text-slate-900 transition-colors">Returns</Link></li>
            <li><Link to="#" className="hover:text-slate-900 transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div className="lg:col-span-4">
          <h4 className="font-bold text-xs uppercase tracking-widest text-slate-900 mb-6">Newsletter</h4>
          <p className="text-xs text-slate-500 mb-5 leading-relaxed">Join our list for exclusive offers.</p>
          <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Email"
              className="flex-1 h-10 px-4 rounded-xl bg-slate-50 border border-slate-100 text-xs outline-none focus:border-[#3653E2] transition-colors"
            />
            <button className="h-10 px-6 bg-[#111827] text-white text-[10px] font-bold rounded-xl hover:bg-[#3653E2] transition-colors">
              Join
            </button>
          </form>
        </div>
      </div>
      <div className="max-w-7xl mx-auto pt-8 border-t border-slate-50 flex flex-col sm:flex-row items-center justify-between gap-6 text-[11px] text-slate-400">
        <p>© 2024 SHOPFLOW. ALL RIGHTS RESERVED.</p>
        <div className="flex gap-8">
          <Link to="#" className="hover:text-slate-900">Privacy Policy</Link>
          <Link to="#" className="hover:text-slate-900">Terms of Service</Link>
        </div>
      </div>
    </footer>
  )
}

// --- MAIN PAGE ---

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems)

  const updateQuantity = (id, delta) => {
    setCartItems(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ))
  }

  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id))
  }

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0)
  const shipping = 15
  const taxes = subtotal * 0.2
  const total = subtotal + shipping + taxes

  return (
    <div className="min-h-screen bg-white font-sans text-[#111827] selection:bg-[#3653E2]/10 selection:text-[#3653E2]">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 py-12 md:py-20 text-left">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="flex flex-col items-start gap-4">
             <Link to="/shop" className="group flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-[#3653E2] transition-colors">
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                Retour au catalogue
             </Link>
             <h1 className="text-4xl md:text-5xl font-extrabold text-[#111827] tracking-tight">Mon Panier</h1>
          </div>
          <div className="hidden md:block">
             <span className="text-lg font-semibold text-slate-400">{cartItems.length} articles sélectionnés</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Cart Items List */}
          <div className="lg:col-span-8 space-y-8">
            <AnimatePresence>
              {cartItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="group relative flex flex-col sm:flex-row items-center gap-6 p-6 rounded-3xl bg-white border border-slate-100 hover:shadow-xl hover:shadow-slate-100/50 transition-all duration-300"
                >
                  {/* Product Image */}
                  <div className="w-full sm:w-32 aspect-square rounded-2xl overflow-hidden bg-slate-50 flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 text-center sm:text-left">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                       <div>
                          <h3 className="font-bold text-lg text-[#111827] mb-1">{item.name}</h3>
                          <p className="text-sm text-slate-400 mb-3">{item.color} <span className="mx-2">|</span> Taille : {item.size}</p>
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase tracking-wider">
                             {item.stock}
                          </span>
                       </div>
                       <div className="flex flex-col items-center sm:items-end gap-4">
                          <span className="text-xl font-extrabold text-[#111827]">{item.price}€</span>
                          
                          <div className="flex items-center w-28 h-10 rounded-xl border border-slate-100 bg-slate-50 overflow-hidden">
                             <button 
                               onClick={() => updateQuantity(item.id, -1)}
                               className="flex-1 flex items-center justify-center text-slate-400 hover:text-[#3653E2] transition-colors"
                             >
                               <Minus size={14} />
                             </button>
                             <span className="flex-1 text-center font-bold text-sm">{item.quantity}</span>
                             <button 
                               onClick={() => updateQuantity(item.id, 1)}
                               className="flex-1 flex items-center justify-center text-slate-400 hover:text-[#3653E2] transition-colors"
                             >
                               <Plus size={14} />
                             </button>
                          </div>
                       </div>
                    </div>
                  </div>

                  {/* Trash Button */}
                  <button 
                    onClick={() => removeItem(item.id)}
                    className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 size={18} />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>

            {cartItems.length === 0 && (
              <div className="text-center py-20 bg-slate-50 rounded-[3rem] border border-dashed border-slate-200">
                <ShoppingBag size={48} className="mx-auto text-slate-300 mb-6" />
                <h3 className="text-xl font-bold text-[#111827] mb-2">Votre panier est vide</h3>
                <p className="text-slate-500 mb-8">Découvrez nos collections et commencez votre shopping.</p>
                <Link to="/shop" className="inline-flex h-12 px-8 rounded-xl bg-[#3653E2] text-white font-bold items-center shadow-lg shadow-[#3653E2]/20 hover:scale-105 transition-all">
                  Retour à la boutique
                </Link>
              </div>
            )}

            {/* Delivery Card */}
            <div className="p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-6 mt-12 group hover:bg-slate-100/50 transition-colors transition-duration-500">
              <div className="flex items-center gap-5">
                 <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-[#3653E2]">
                    <Truck size={24} />
                 </div>
                 <div className="text-center sm:text-left">
                    <h4 className="font-bold text-slate-900">Livraison Standard</h4>
                    <p className="text-sm text-slate-400">Livraison estimée sous 3 à 5 jours ouvrés.</p>
                 </div>
              </div>
              <Link to="/shop" className="h-12 px-8 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold text-sm hover:shadow-lg transition-all flex items-center">
                 Continuer mes achats
              </Link>
            </div>
          </div>

          {/* Sidebar / Summary */}
          <aside className="lg:col-span-4 sticky top-24">
            <div className="p-8 rounded-[2.5rem] bg-white border border-slate-100 shadow-xl shadow-slate-100/40">
              <h2 className="text-xl font-bold text-[#111827] mb-8">Résumé de la commande</h2>
              
              <div className="space-y-4 mb-8">
                 <div className="flex justify-between items-center text-sm font-medium">
                    <span className="text-slate-400">Sous-total</span>
                    <span className="text-[#111827]">{subtotal.toFixed(2)}€</span>
                 </div>
                 <div className="flex justify-between items-center text-sm font-medium">
                    <span className="text-slate-400">Livraison estimée</span>
                    <span className="text-[#111827]">{shipping.toFixed(2)}€</span>
                 </div>
                 <div className="flex justify-between items-center text-sm font-medium">
                    <span className="text-slate-400">Taxes (20%)</span>
                    <span className="text-[#111827]">{taxes.toFixed(2)}€</span>
                 </div>
                 <div className="pt-4 border-t border-slate-50 flex justify-between items-center">
                    <span className="text-lg font-extrabold text-[#111827]">Total</span>
                    <span className="text-2xl font-extrabold text-[#3653E2]">{total.toFixed(2)}€</span>
                 </div>
              </div>

              <button className="w-full h-14 bg-[#3653E2] hover:bg-[#2a44c8] text-white rounded-2xl font-bold text-sm shadow-xl shadow-[#3653E2]/20 transition-all duration-300 flex items-center justify-center gap-3 mb-8 group active:scale-[0.98]">
                 Passer à la caisse
                 <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="space-y-4">
                 {[
                   { icon: Lock, label: "Paiement 100% sécurisé" },
                   { icon: Truck, label: "Livraison rapide assurée" },
                   { icon: CreditCard, label: "Moyens de paiement acceptés" }
                 ].map((trust, idx) => (
                   <div key={idx} className="flex items-center gap-3 text-xs font-semibold text-slate-400">
                      <trust.icon size={14} className="text-[#3653E2]" />
                      <span>{trust.label}</span>
                   </div>
                 ))}
                 <div className="flex gap-2 pt-2 grayscale opacity-40">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-4" alt="Visa" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-4" alt="Mastercard" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" className="h-4" alt="Paypal" />
                 </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Benefits Section */}
        <section className="mt-28 grid grid-cols-1 md:grid-cols-3 gap-12 pt-16 border-t border-slate-50">
           <div className="text-center group">
              <h4 className="text-sm font-bold text-[#3653E2] uppercase tracking-[0.2em] mb-4 group-hover:scale-105 transition-transform">Qualité Garantie</h4>
              <p className="text-xs text-slate-400 leading-relaxed max-w-[240px] mx-auto">Chaque produit est méticuleusement inspecté pour répondre aux standards ShopFlow.</p>
           </div>
           <div className="text-center group">
              <h4 className="text-sm font-bold text-[#3653E2] uppercase tracking-[0.2em] mb-4 group-hover:scale-105 transition-transform">Retours Faciles</h4>
              <p className="text-xs text-slate-400 leading-relaxed max-w-[240px] mx-auto">Un imprévu ? Retournez vos articles gratuitement sous 30 jours après réception.</p>
           </div>
           <div className="text-center group">
              <h4 className="text-sm font-bold text-[#3653E2] uppercase tracking-[0.2em] mb-4 group-hover:scale-105 transition-transform">Service Client</h4>
              <p className="text-xs text-slate-400 leading-relaxed max-w-[240px] mx-auto">Une question ? Nos experts vous répondent sous 24h ouvrées par email ou chat.</p>
           </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
