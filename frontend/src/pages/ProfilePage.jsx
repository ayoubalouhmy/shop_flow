import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import {
  ShoppingBag,
  LogOut,
  Package,
  Heart,
  Settings,
  ChevronRight,
  MapPin,
  CreditCard,
  Bell,
  Shield,
  ShieldCheck,
  User,
  Mail,
  Phone,
  Calendar,
  Moon,
  Sun,
  LayoutDashboard,
  History,
  Lock,
  ExternalLink,
  Award,
  TrendingDown,
  Star,
  X,
  Save,
  Camera,
  Loader2
} from 'lucide-react'
import { ordersAPI, authAPI } from '../services/api'
import { useCart } from '../context/CartContext'

const sidebarItems = [
  { icon: LayoutDashboard, label: 'Vue d\'ensemble', id: 'overview' },
  { icon: History, label: 'Historique des commandes', id: 'orders' },
  { icon: MapPin, label: 'Adresses enregistrées', id: 'addresses' },
  { icon: CreditCard, label: 'Moyens de paiement', id: 'payments' },
  { icon: Shield, label: 'Sécurité & Accès', id: 'security' },
  { icon: Bell, label: 'Préférences notifications', id: 'notifications' },
]

function OrdersTable({ orders, loading }) {
  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-16 rounded-2xl bg-slate-50 animate-pulse" />
        ))}
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-20 rounded-3xl border-2 border-dashed border-slate-100 bg-slate-50">
        <Package size={48} className="mx-auto text-slate-300 mb-6" />
        <h3 className="text-xl font-bold text-[#111827] mb-2">Aucune commande</h3>
        <p className="text-slate-500 mb-8">Vous n'avez pas encore passé de commande.</p>
        <Link
          to="/shop"
          className="inline-flex h-12 px-8 rounded-xl bg-[#3653E2] text-white font-bold items-center shadow-lg shadow-[#3653E2]/20 hover:scale-105 transition-all"
        >
          Commencer mes achats
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="text-slate-400 text-[10px] font-bold uppercase tracking-widest border-b border-slate-50">
            <th className="pb-4 font-bold">N° Commande</th>
            <th className="pb-4 font-bold">Articles</th>
            <th className="pb-4 font-bold">Date</th>
            <th className="pb-4 font-bold">Statut</th>
            <th className="pb-4 font-bold">Total</th>
            <th className="pb-4 font-bold text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {orders.map((order) => (
            <tr key={order.id} className="group hover:bg-slate-50/50 transition-colors">
              <td className="py-5 font-bold text-sm text-[#3653E2]">#{order.id}</td>
              <td className="py-5">
                <div className="flex items-center gap-2">
                  {(order.items || []).slice(0, 3).map((item, idx) => (
                    <div key={idx} className="w-10 h-10 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 flex-shrink-0">
                      <img
                        src={item.product?.images?.[0] 
                          ? (item.product.images[0].startsWith('http') ? item.product.images[0] : `http://localhost:8000/storage/${item.product.images[0]}`) 
                          : 'https://via.placeholder.com/40'}
                        alt={item.product?.name || 'Produit'}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                  {(order.items || []).length > 3 && (
                    <span className="text-xs font-bold text-slate-400">+{(order.items || []).length - 3}</span>
                  )}
                  <div className="ml-1">
                    <p className="text-xs font-bold text-slate-800 line-clamp-1">
                      {order.items?.[0]?.product?.name || 'Commande'}
                    </p>
                    <p className="text-[10px] text-slate-400">
                      {(order.items || []).length} article{(order.items || []).length > 1 ? 's' : ''}
                    </p>
                  </div>
                </div>
              </td>
              <td className="py-5 text-sm text-slate-600 font-medium whitespace-nowrap">
                {new Date(order.created_at).toLocaleDateString('fr-FR')}
              </td>
              <td className="py-5 text-sm">
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold whitespace-nowrap ${
                  order.status === 'delivered' ? 'bg-emerald-50 text-emerald-600' :
                  order.status === 'shipped' ? 'bg-blue-50 text-blue-600' :
                  order.status === 'confirmed' ? 'bg-indigo-50 text-indigo-600' :
                  order.status === 'cancelled' ? 'bg-rose-50 text-rose-600' :
                  'bg-amber-50 text-amber-600'
                }`}>
                  {order.status === 'delivered' ? '✓ Livré' :
                   order.status === 'shipped' ? '🚚 Expédié' :
                   order.status === 'confirmed' ? '✓ Confirmé' :
                   order.status === 'cancelled' ? '✗ Annulé' :
                   '⏳ En attente'}
                </span>
              </td>
              <td className="py-5 text-sm text-slate-900 font-bold whitespace-nowrap">
                {Number(order.total_amount || 0).toFixed(2)} €
              </td>
              <td className="py-5 text-right">
                <button className="text-xs font-bold text-slate-400 hover:text-[#3653E2] transition-colors">
                  Détails
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


export default function ProfilePage() {
  const { user, logout, isAuthenticated } = useAuth()
  const { cartCount } = useCart()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')
  const [profile, setProfile] = useState(null)
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [isDarkMode, setIsDarkMode] = useState(document.documentElement.classList.contains('dark'))
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editLoading, setEditLoading] = useState(false)
  const [formData, setFormData] = useState({ name: '', phone: '', birthday: '' })

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [ordersRes, profileRes] = await Promise.all([
          ordersAPI.getAll(),
          authAPI.profile() 
        ])
        // Laravel paginate() wraps data inside res.data.data.data
        const ordersData = ordersRes.data.data?.data || ordersRes.data.data || []
        setOrders(Array.isArray(ordersData) ? ordersData : [])
        setProfile(profileRes.data.data || null)
      } catch (error) {
        console.error("Error fetching profile data:", error)
        setOrders([])
      } finally {
        setLoading(false)
      }
    }
    if (isAuthenticated) fetchData()
  }, [isAuthenticated])

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.classList.contains('dark'))
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const handleUpdateProfile = async (e) => {
    e.preventDefault()
    try {
      setEditLoading(true)
      const res = await authAPI.updateProfile(formData)
      if (res.data.success) {
        setProfile(res.data.data)
        setIsEditModalOpen(false)
        // Optionnel: rafraîchir le contexte Auth si nécessaire
      }
    } catch (error) {
      console.error("Error updating profile:", error)
      alert("Erreur lors de la mise à jour du profil")
    } finally {
      setEditLoading(false)
    }
  }

  const openEditModal = () => {
    setFormData({
      name: profile?.name || user?.name || '',
      phone: profile?.phone || '',
      birthday: profile?.birthday ? new Date(profile.birthday).toISOString().split('T')[0] : ''
    })
    setIsEditModalOpen(true)
  }

  if (!isAuthenticated) {
    navigate('/login')
    return null
  }

  const displayName = profile?.name || user?.name || ''
  const initials = displayName
    ? displayName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : '??'

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-[#F8FAFC] text-slate-900'} font-sans pb-20`}>
      {/* ─── NAVBAR ─── */}
      <header className={`sticky top-0 z-50 w-full border-b backdrop-blur-md transition-colors duration-500 ${isDarkMode ? 'border-slate-800 bg-slate-950/80' : 'border-slate-100 bg-white/80'}`}>
        <div className="max-w-[1440px] mx-auto px-6 sm:px-12 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-[#3653E2] shadow-md shadow-[#3653E2]/25">
              <ShoppingBag size={18} className="text-white" strokeWidth={2} />
            </div>
            <span className={`font-bold text-lg tracking-tight ${isDarkMode ? 'text-white' : 'text-[#111827]'}`}>
              Shop<span className="text-[#3653E2]">Flow</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-10 font-medium text-sm text-slate-500">
            <Link to="/" className="hover:text-[#3653E2] transition-colors">Accueil</Link>
            <Link to="/shop" className="hover:text-[#3653E2] transition-colors text-slate-900">Produit</Link>
            <Link to="#" className="hover:text-[#3653E2] transition-colors">A propos</Link>
          </nav>

          <div className="flex items-center gap-5">
            <button 
              onClick={() => {
                setIsDarkMode(!isDarkMode);
                document.documentElement.classList.toggle('dark');
              }}
              className="text-slate-400 hover:text-slate-900 transition-colors"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <Link to="/cart" className="relative text-slate-400 hover:text-slate-900 transition-colors group">
              <ShoppingBag size={20} className={cartCount > 0 ? 'text-[#3653E2]' : 'text-slate-400'} />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#3653E2] text-white text-[10px] flex items-center justify-center font-bold animate-in zoom-in duration-300">
                  {cartCount}
                </span>
              )}
            </Link>
            <div className="w-9 h-9 rounded-full overflow-hidden border border-slate-200">
               <div className="w-full h-full bg-[#3653E2] text-white flex items-center justify-center font-bold text-xs ring-2 ring-white">
                {initials}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1440px] mx-auto px-6 sm:px-12 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ──── SIDEBAR (Left) ──── */}
          <aside className="lg:col-span-3 space-y-4">
            <div className={`rounded-[24px] border shadow-sm overflow-hidden text-center transition-colors duration-500 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
              <div className="p-8 pb-6">
                <div className="relative inline-block mb-4">
                  <div className={`w-24 h-24 rounded-full border-4 shadow-md flex items-center justify-center font-black text-2xl overflow-hidden ${isDarkMode ? 'bg-slate-800 border-slate-900 text-[#3653E2]' : 'bg-slate-100 border-white text-[#3653E2]'}`}>
                     {initials}
                  </div>
                  <div className={`absolute bottom-0 right-0 w-6 h-6 rounded-full border flex items-center justify-center shadow-sm ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                    <Award size={12} className="text-[#3653E2]" />
                  </div>
                </div>
                <h2 className={`text-lg font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{displayName || 'Prénom Nom'}</h2>
                <p className="text-xs text-slate-400 font-medium mb-4">
                  {profile?.member_since || profile?.created_at || user?.created_at 
                    ? `Membre depuis ${new Date(profile?.member_since || profile?.created_at || user?.created_at).getFullYear()}`
                    : 'Membre depuis 2024'}
                </p>
                <span className="inline-block px-4 py-1.5 rounded-full border border-[#3653E2]/20 text-[#3653E2] text-[10px] font-bold uppercase tracking-wider bg-[#3653E2]/5">
                  {profile?.loyalty_points >= 1000 ? 'Gold Member' : profile?.loyalty_points >= 500 ? 'Silver Member' : 'Bronze Member'}
                </span>
              </div>

              <div className="px-3 pb-4">
                <nav className="space-y-1">
                  {sidebarItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`
                        w-full flex items-center justify-between px-5 py-3 rounded-2xl text-sm font-semibold transition-all
                        ${activeTab === item.id 
                          ? 'bg-[#3653E2] text-white' 
                          : isDarkMode ? 'text-slate-400 hover:bg-slate-800 hover:text-slate-100' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}
                      `}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon size={18} />
                        {item.label}
                      </div>
                      {activeTab === item.id && <ChevronRight size={16} />}
                    </button>
                  ))}
                </nav>
              </div>

              <div className={`px-3 pb-6 pt-2 border-t ${isDarkMode ? 'border-slate-800' : 'border-slate-50'}`}>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-5 py-3 rounded-2xl text-sm font-bold text-rose-500 hover:bg-rose-50 transition-all"
                >
                  <LogOut size={18} />
                  Se déconnecter
                </button>
              </div>
            </div>
          </aside>

          {/* ──── CONTENT (Right) ──── */}
          <div className="lg:col-span-9 space-y-8">
            
            {/* Conditional Content based on activeTab */}
            {activeTab === 'overview' && (
              <>
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { icon: Package, label: 'Commandes totales', val: profile?.orders_count || 0, sub: 'Sur votre compte', color: 'text-blue-600', bg: 'bg-blue-50' },
                    { icon: Star, label: 'Points de fidélité', val: profile?.loyalty_points || 0, sub: 'Statut Membre', color: 'text-indigo-600', bg: 'bg-indigo-50' },
                    { icon: ShieldCheck, label: 'Économies réalisées', val: `${profile?.total_savings || 0} €`, sub: 'Sur l\'année', color: 'text-emerald-600', bg: 'bg-emerald-50' },
                  ].map((stat, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm flex items-center gap-5"
                    >
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
                        <stat.icon size={24} />
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">{stat.label}</p>
                        <p className="text-xl font-bold text-slate-900">{stat.val}</p>
                        <p className="text-[11px] text-slate-400 font-medium mt-0.5">{stat.sub}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Personal Infos */}
                <section className="bg-white rounded-[24px] border border-slate-100 shadow-sm p-8">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-1">Informations Personnelles</h3>
                      <p className="text-sm text-slate-500">Gérez vos informations de base et vos coordonnées.</p>
                    </div>
                    <button 
                      onClick={openEditModal}
                      className="px-5 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all"
                    >
                      Modifier le profil
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                    {[
                      { icon: User, label: 'Nom Complet', val: profile?.name || user?.name },
                      { icon: Mail, label: 'Adresse Email', val: profile?.email || user?.email },
                      { icon: Phone, label: 'Téléphone', val: profile?.phone || 'Non renseigné' },
                      { icon: Calendar, label: 'Date d\'anniversaire', val: profile?.birthday ? new Date(profile.birthday).toLocaleDateString() : 'Non renseignée' },
                    ].map((info, i) => (
                      <div key={i} className="flex items-start gap-4">
                        <div className="p-2 bg-slate-50 rounded-lg text-slate-400 mt-0.5">
                          <info.icon size={18} />
                        </div>
                        <div>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">{info.label}</p>
                          <p className="text-sm font-bold text-slate-800">{info.val}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
                
                {/* Recent Orders Short list */}
                <section className="bg-white rounded-[24px] border border-slate-100 shadow-sm p-8">
                  <div className="flex justify-between items-center mb-8">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-1">Commandes Récentes</h3>
                      <p className="text-sm text-slate-500">Vos 3 derniers achats.</p>
                    </div>
                    <button onClick={() => setActiveTab('orders')} className="text-xs font-bold text-[#3653E2] hover:underline">Voir tout</button>
                  </div>
                  <OrdersTable orders={orders.slice(0, 3)} loading={loading} />
                </section>
              </>
            )}

            {activeTab === 'orders' && (
              <section className="bg-white rounded-[24px] border border-slate-100 shadow-sm p-8">
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-slate-900 mb-1">Historique des Commandes</h3>
                  <p className="text-sm text-slate-500">Retrouvez toutes vos commandes passées.</p>
                </div>
                <OrdersTable orders={orders} loading={loading} />
              </section>
            )}

            {activeTab !== 'overview' && activeTab !== 'orders' && (
              <section className="bg-white rounded-[24px] border border-slate-100 shadow-sm p-20 text-center">
                 <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Shield size={32} className="text-slate-300" />
                 </div>
                 <h3 className="text-xl font-bold text-slate-900 mb-2">Section en cours de développement</h3>
                 <p className="text-slate-500 max-w-sm mx-auto">Cette fonctionnalité sera disponible prochainement dans une mise à jour.</p>
              </section>
            )}

          </div>
        </div>
      </main>

      {/* ─── FOOTER ─── */}
      <footer className="mt-20 pt-20 pb-10 border-t border-slate-100 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-12 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1">
             <Link to="/" className="flex items-center gap-2.5 mb-6">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#3653E2]">
                  <ShoppingBag size={18} className="text-white" />
                </div>
                <span className="font-bold text-lg text-[#111827]">ShopFlow</span>
             </Link>
             <p className="text-slate-400 text-xs leading-relaxed max-w-xs">
               Elevating your lifestyle with premium essentials designed for modern living.
             </p>
          </div>
          <div>
            <h4 className="font-bold text-xs uppercase tracking-widest text-[#111827] mb-6">Shop</h4>
            <ul className="space-y-4 text-xs text-slate-500 font-medium">
              <li><Link to="#" className="hover:text-[#3653E2]">New Arrivals</Link></li>
              <li><Link to="#" className="hover:text-[#3653E2]">Best Sellers</Link></li>
              <li><Link to="#" className="hover:text-[#3653E2]">Sale</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-xs uppercase tracking-widest text-[#111827] mb-6">Support</h4>
            <ul className="space-y-4 text-xs text-slate-500 font-medium">
              <li><Link to="#" className="hover:text-[#3653E2]">Shipping Policy</Link></li>
              <li><Link to="#" className="hover:text-[#3653E2]">Returns & Exchanges</Link></li>
              <li><Link to="#" className="hover:text-[#3653E2]">FAQs</Link></li>
            </ul>
          </div>
          <div>
             <h4 className="font-bold text-xs uppercase tracking-widest text-[#111827] mb-6">Newsletter</h4>
             <p className="text-xs text-slate-400 mb-6">Join our list for exclusive offers.</p>
             <div className="flex gap-2">
                <input type="email" placeholder="Email address" className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-xs focus:outline-none focus:border-[#3653E2]" />
                <button className="px-4 py-2.5 bg-[#3653E2] text-white rounded-xl text-xs font-bold hover:bg-blue-600 transition-colors">Join</button>
             </div>
          </div>
        </div>
        <div className="max-w-[1440px] mx-auto px-6 sm:px-12 flex flex-col md:row justify-between items-center gap-6 pt-10 border-t border-slate-50">
           <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">© 2024 SHOPFLOW. ALL RIGHTS RESERVED.</p>
           <div className="flex gap-8">
              <Link to="#" className="text-[10px] text-slate-400 font-bold uppercase tracking-widest hover:text-[#3653E2]">Privacy Policy</Link>
              <Link to="#" className="text-[10px] text-slate-400 font-bold uppercase tracking-widest hover:text-[#3653E2]">Terms of Service</Link>
           </div>
        </div>
      </footer>
      {/* Modal d'édition du profil */}
      <AnimatePresence>
        {isEditModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setIsEditModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-[32px] shadow-2xl overflow-hidden"
            >
              <div className="p-8 pb-4 flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Modifier le profil</h2>
                  <p className="text-sm text-slate-500 mt-1">Mettez à jour vos informations personnelles.</p>
                </div>
                <button 
                  onClick={() => setIsEditModalOpen(false)}
                  className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400"
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleUpdateProfile} className="p-8 pt-4 space-y-6">
                <div className="space-y-5">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 px-1">Nom Complet</label>
                    <div className="relative text-slate-400 focus-within:text-[#3653E2] transition-colors">
                       <User className="absolute left-4 top-1/2 -translate-y-1/2" size={18} />
                       <input 
                         type="text"
                         value={formData.name}
                         onChange={(e) => setFormData({...formData, name: e.target.value})}
                         className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm text-slate-700 outline-none focus:border-[#3653E2] focus:bg-white transition-all"
                         placeholder="Votre nom"
                         required
                       />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 px-1">Téléphone</label>
                    <div className="relative text-slate-400 focus-within:text-[#3653E2] transition-colors">
                       <Phone className="absolute left-4 top-1/2 -translate-y-1/2" size={18} />
                       <input 
                         type="tel"
                         value={formData.phone}
                         onChange={(e) => setFormData({...formData, phone: e.target.value})}
                         className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm text-slate-700 outline-none focus:border-[#3653E2] focus:bg-white transition-all"
                         placeholder="+33 0 00 00 00 00"
                       />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 px-1">Date de naissance</label>
                    <div className="relative text-slate-400 focus-within:text-[#3653E2] transition-colors">
                       <Calendar className="absolute left-4 top-1/2 -translate-y-1/2" size={18} />
                       <input 
                         type="date"
                         value={formData.birthday}
                         onChange={(e) => setFormData({...formData, birthday: e.target.value})}
                         className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm text-slate-700 outline-none focus:border-[#3653E2] focus:bg-white transition-all"
                       />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-4">
                  <button 
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    className="flex-1 px-6 py-4 rounded-2xl border border-slate-100 font-bold text-slate-600 hover:bg-slate-50 transition-all"
                  >
                    Annuler
                  </button>
                  <button 
                    type="submit"
                    disabled={editLoading}
                    className="flex-1 px-6 py-4 rounded-2xl bg-[#3653E2] text-white font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#3653E2]/30 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-70 disabled:pointer-events-none"
                  >
                    {editLoading ? (
                      <Loader2 className="animate-spin" size={20} />
                    ) : (
                      <><Save size={20} /> Enregistrer</>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
