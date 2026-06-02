import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import {
  ShoppingBag,
  Search,
  User,
  Moon,
  Sun,
  LayoutGrid,
  List,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Star,
  Mail,
  HelpCircle,
  X,
  Menu,
  Filter,
  Check
} from 'lucide-react'
import { productsAPI, categoriesAPI } from '../services/api'

// --- COMPONENTS ---

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth()
  const { cartCount } = useCart()
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(document.documentElement.classList.contains('dark'))

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.classList.contains('dark'))
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  return (
    <header className={`sticky top-0 z-50 w-full border-b backdrop-blur-md transition-colors duration-500 ${isDarkMode ? 'border-slate-800 bg-slate-950/80' : 'border-slate-100 bg-white/75'}`}>
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 sm:px-12 lg:px-16">
        {/* Logo Left */}
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-[#3653E2] shadow-md shadow-[#3653E2]/25 group-hover:scale-105 transition-transform duration-300">
              <ShoppingBag size={18} className="text-white" strokeWidth={2} />
            </div>
            <span className="font-bold text-lg tracking-tight text-[#171a1f]">
              Shop<span className="text-[#3653E2]">Flow</span>
            </span>
          </Link>
        </div>

        {/* Menu Center */}
        <nav className="hidden md:flex items-center gap-8 font-medium text-sm text-slate-600">
          <Link to="/" className="hover:text-[#3653E2] transition-colors">Accueil</Link>
          <Link to="/shop" className="text-[#3653E2] hover:text-[#3653E2] transition-colors">Produits</Link>
          <Link to="#" className="hover:text-slate-900 transition-colors">À propos</Link>
        </nav>

        {/* Icons Right */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => {
              setIsDarkMode(!isDarkMode);
              document.documentElement.classList.toggle('dark');
            }}
            className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100/50 rounded-full transition-all duration-200"
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
              <Link 
                to="/profile"
                className="w-9 h-9 rounded-full bg-[#3653E2] text-white flex items-center justify-center font-bold text-sm shadow-sm hover:scale-105 transition-transform"
                title={user?.name}
              >
                {user?.name?.charAt(0).toUpperCase()}
              </Link>
              <button 
                onClick={() => { logout(); navigate('/'); }}
                className="px-3 h-8 rounded-lg bg-slate-50 hover:bg-red-50 text-slate-500 hover:text-red-500 text-[10px] font-bold transition-colors"
              >
                Déconnecter
              </button>
            </div>
          ) : (
            <Link 
              to="/login"
              className="hidden sm:inline-flex items-center justify-center h-9 px-4 rounded-lg bg-[#3653E2] text-white text-xs font-semibold"
            >
              Connexion
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button 
            className="flex md:hidden p-2 text-slate-500 hover:text-slate-900"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-[70] bg-black/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 z-[80] h-full w-4/5 max-w-sm bg-white p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="text-xl font-bold text-[#111827]">Menu</span>
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              <ul className="space-y-6">
                {['Accueil', 'Produits', 'À propos'].map((item) => (
                  <li key={item}>
                    <Link
                      to={item === 'Accueil' ? '/' : item === 'Produits' ? '/shop' : '#'}
                      className="text-lg font-semibold text-[#111827] hover:text-[#3653E2] transition-colors block"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}

const FilterSidebar = ({ categories, selectedCategories, toggleCategory, isDarkMode }) => {
  return (
    <aside className="hidden lg:block w-52 flex-shrink-0">
      <div className="sticky top-24">
        {/* Filters Header Icon */}
        <div className="flex gap-1 mb-2">
            <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
            <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
            <div className="w-1.5 h-1.5 rounded-full bg-gray-500" />
        </div>
        <h3 className={`text-sm font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-[#111827]'}`}>Filtres</h3>

        {/* Categories Dropdown Style */}
        <div className="mb-8">
          <div className={`flex items-center justify-between p-3 border rounded-lg mb-4 cursor-pointer transition-colors ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-[#E5E7EB]'}`}>
            <span className={`text-xs font-bold ${isDarkMode ? 'text-slate-300' : 'text-[#111827]'}`}>Catégories</span>
            <ChevronDown size={14} className="text-[#6B7280]" />
          </div>
          
          <div className="space-y-3 px-1">
            {categories.map((cat) => (
              <label key={cat.id} className="flex items-center gap-3 group cursor-pointer">
                <div className="relative flex items-center justify-center">
                  <input
                    type="checkbox"
                    className={`appearance-none w-4 h-4 border rounded transition-all checked:bg-[#3653E2] checked:border-[#3653E2] ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-[#E5E7EB]'}`}
                    checked={selectedCategories.includes(cat.id)}
                    onChange={() => toggleCategory(cat.id)}
                  />
                  <Check size={10} className="absolute text-white opacity-0 group-has-[:checked]:opacity-100 transition-opacity pointer-events-none" />
                </div>
                <span className={`text-[13px] transition-colors ${isDarkMode ? 'text-slate-400 group-hover:text-white' : 'text-[#6B7280] group-hover:text-[#111827]'}`}>
                  {cat.name}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className={`h-px my-10 ${isDarkMode ? 'bg-slate-800' : 'bg-[#E5E7EB]'}`} />

        {/* Need Help Card */}
        <div className={`p-6 rounded-2xl transition-colors duration-500 ${isDarkMode ? 'bg-slate-900/50 border border-slate-800' : 'bg-[#F2F4FD]'}`}>
          <h4 className={`text-[13px] font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-[#111827]'}`}>Besoin d'aide ?</h4>
          <p className="text-[11px] text-[#6B7280] mb-5 leading-relaxed">Nos conseillers sont disponibles pour vous accompagner dans votre aménagement.</p>
          <button className={`w-full py-2 rounded-lg text-[11px] font-bold border transition-all ${isDarkMode ? 'bg-slate-800 text-white border-slate-700 hover:bg-slate-700' : 'bg-white text-[#111827] border-gray-200 hover:bg-gray-50'}`}>
            Nous contacter
          </button>
        </div>
      </div>
    </aside>
  )
}

const ProductCard = ({ product, isDarkMode }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`group overflow-hidden transition-all duration-300 ${isDarkMode ? 'bg-slate-950' : 'bg-white'}`}
    >
      {/* Image Container */}
      <Link to={`/product/${product.id}`} className={`block relative aspect-square rounded-xl overflow-hidden mb-4 group ${isDarkMode ? 'bg-slate-900' : 'bg-gray-50'}`}>
        <img
          src={product.images && product.images.length > 0
            ? (product.images[0].startsWith('http') ? product.images[0] : `http://localhost:8000/storage/${product.images[0]}`)
            : 'https://via.placeholder.com/400'}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Badges */}
        {product.badge && (
          <div className="absolute top-3 left-3">
            <span className={`px-2.5 py-1 rounded text-[9px] font-bold tracking-wider uppercase ${
              product.badge === 'Promo' ? 'bg-orange-500 text-white' : 'bg-blue-600 text-white'
            }`}>
              {product.badge}
            </span>
          </div>
        )}
      </Link>

      {/* Details */}
      <div>
        <span className="text-[10px] font-medium text-[#6B7280] uppercase tracking-wider">{product.category?.name || 'Général'}</span>
        
        <div className="flex items-start justify-between mt-1">
          <Link to="/product">
            <h3 className={`text-[13px] font-bold hover:text-[#3653E2] transition-colors leading-tight max-w-[180px] ${isDarkMode ? 'text-white' : 'text-[#111827]'}`}>
              {product.name}
            </h3>
          </Link>
          <span className={`text-[13px] font-bold ${isDarkMode ? 'text-white' : 'text-[#111827]'}`}>{product.price}€</span>
        </div>

        <div className="flex items-center gap-1 mt-2">
            <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                    <Star key={i} size={10} className={`${i < Math.floor(product.rating) ? 'text-[#3653E2] fill-[#3653E2]' : 'text-gray-200'}`} />
                ))}
            </div>
            <span className="text-[10px] text-[#6B7280]">({product.reviews})</span>
        </div>
      </div>
    </motion.div>
  )
}

const Newsletter = ({ isDarkMode }) => {
  return (
    <section className={`py-24 px-6 transition-colors duration-500 ${isDarkMode ? 'bg-slate-950 text-white' : 'bg-white text-slate-900'}`}>
      <div className={`max-w-7xl mx-auto rounded-[3rem] relative p-12 lg:p-20 overflow-hidden flex flex-col lg:flex-row items-center gap-12 transition-colors duration-500 ${isDarkMode ? 'bg-slate-900 border border-slate-800 shadow-2xl shadow-black/50' : 'bg-[#F4F7FF]'}`}>
        <div className="flex-1 text-left relative z-10 max-w-xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <span className="inline-block px-3 py-1 rounded-full bg-white text-[#3653E2] text-[10px] font-bold mb-6 shadow-sm uppercase tracking-wider">
                Inspiration Intérieure
            </span>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-[#111827] leading-tight mb-6">
              Rejoignez le cercle ShopFlow.
            </h2>
            <p className="text-[#6B7280] text-sm lg:text-base mb-10 leading-relaxed max-w-md">
              Recevez nos conseils d'aménagement, nos avant-premières exclusives et bénéficiez de -15% sur votre première commande.
            </p>
            
            <form className="flex w-full items-center bg-white rounded-full p-1 border border-gray-100 shadow-sm max-w-md" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="votre-email@exemple.com"
                className="flex-1 h-12 px-6 rounded-full text-xs text-[#111827] bg-transparent outline-none placeholder:text-gray-300"
              />
              <button className="h-12 px-8 rounded-full bg-[#3653E2] text-white font-bold text-xs shadow-lg shadow-[#3653E2]/20 hover:bg-[#2a44c8] transition-all">
                S'abonner
              </button>
            </form>
          </motion.div>
        </div>

        <div className="flex-1 relative flex justify-center lg:justify-end">
          <div className="relative w-full max-w-md">
             {/* Main Image */}
             <div className="rounded-[2rem] overflow-hidden shadow-2xl relative z-0">
                <img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80" alt="Interior" className="w-full h-80 object-cover" />
             </div>
             {/* Small Floating Image */}
             <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-[1.5rem] overflow-hidden border-8 border-[#F4F7FF] shadow-2xl z-20">
                <img src="https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=400&q=80" alt="Detail" className="w-full h-full object-cover" />
             </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const Footer = ({ isDarkMode }) => {
  return (
    <footer className={`pt-24 pb-12 px-6 border-t transition-colors duration-500 ${isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-white border-gray-100 text-slate-900'}`}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-4">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#3653E2]">
                <ShoppingBag size={16} className="text-white" />
              </div>
              <span className="text-xl font-bold text-[#111827]">ShopFlow</span>
            </Link>
            <p className="text-[#6B7280] text-xs leading-relaxed max-w-xs mb-8">
              Elevating your lifestyle with premium essentials designed for modern living.
            </p>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold text-[#111827] uppercase tracking-widest mb-6">Shop</h4>
            <ul className="space-y-4 text-xs text-[#6B7280]">
              <li><Link to="#" className="hover:text-[#3653E2]">New Arrivals</Link></li>
              <li><Link to="#" className="hover:text-[#3653E2]">Best Sellers</Link></li>
              <li><Link to="#" className="hover:text-[#3653E2]">Sale</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold text-[#111827] uppercase tracking-widest mb-6">Support</h4>
            <ul className="space-y-4 text-xs text-[#6B7280]">
              <li><Link to="#" className="hover:text-[#3653E2]">Shipping Policy</Link></li>
              <li><Link to="#" className="hover:text-[#3653E2]">Returns & Exchanges</Link></li>
              <li><Link to="#" className="hover:text-[#3653E2]">FAQs</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h4 className="text-xs font-bold text-[#111827] uppercase tracking-widest mb-6">Newsletter</h4>
            <p className="text-xs text-[#6B7280] mb-5">Join our list for exclusive offers.</p>
            <form className="flex w-full items-center bg-white rounded p-1 border border-gray-100" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Email address"
                className="flex-1 h-10 px-4 text-xs outline-none"
              />
              <button className="h-10 px-4 bg-[#3653E2] text-white text-[10px] font-bold rounded">
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-50 flex flex-col sm:flex-row items-center justify-between gap-6 text-[10px] text-[#6B7280]">
          <p>© 2024 SHOPFLOW. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-8">
            <Link to="#" className="hover:text-[#111827]">PRIVACY POLICY</Link>
            <Link to="#" className="hover:text-[#111827]">TERMS OF SERVICE</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

// --- MAIN PAGE ---

export default function ShopPage() {

  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategories, setSelectedCategories] = useState([])
  const [sortBy, setSortBy] = useState('Plus récents')
  const [pagination, setPagination] = useState({ current_page: 1, last_page: 1, total: 0 })
  const [viewMode, setViewMode] = useState('grid')
  const [isDarkMode, setIsDarkMode] = useState(document.documentElement.classList.contains('dark'))

  const fetchCategories = async () => {
    try {
      const catRes = await categoriesAPI.getAll()
      setCategories(catRes.data.data || [])
    } catch (error) {
      console.error("Error fetching categories:", error)
    }
  }

  const fetchProducts = async (page = 1) => {
    try {
      setLoading(true)
      const res = await productsAPI.getAll({
        page,
        category_id: selectedCategories[0], // Simplified to first selection
        sort_by: sortBy === 'Prix croissant' ? 'price' : (sortBy === 'Prix décroissant' ? 'price' : 'created_at'),
        order: sortBy === 'Prix croissant' ? 'asc' : 'desc'
      })
      setProducts(res.data.data.data || [])
      setPagination({
        current_page: res.data.data.current_page,
        last_page: res.data.data.last_page,
        total: res.data.data.total
      })
    } catch (error) {
      console.error("Error fetching products:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    fetchProducts(1)
  }, [selectedCategories, sortBy])

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.classList.contains('dark'))
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  const toggleCategory = (id) => {
    setSelectedCategories(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    )
  }

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-white text-slate-900'} selection:bg-[#3653E2]/10 selection:text-[#3653E2] font-sans`}>
      <Navbar />

      {/* Header Section */}
      <section className={`transition-colors duration-500 pt-16 pb-12 ${isDarkMode ? 'bg-slate-950 border-b border-slate-900' : 'bg-white border-b border-slate-50'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-[9px] font-bold tracking-widest text-gray-300 uppercase mb-6">
            <Link to="/" className="hover:text-[#3653E2]">ACCUEIL</Link>
            <span className="text-gray-200">/</span>
            <span className="text-gray-400">BOUTIQUE</span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <h1 className="text-3xl font-extrabold text-[#111827] mb-3">Tous nos produits</h1>
              <p className="text-[#6B7280] text-sm">
                Découvrez notre sélection exclusive d'objets conçus pour transformer votre intérieur en un sanctuaire de sérénité et de style.
              </p>
            </div>

            {/* Search Bar Capsule */}
            <div className="w-full lg:w-[450px] relative">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
              <input
                type="text"
                placeholder="Rechercher un produit..."
                className="w-full h-12 pl-14 pr-6 rounded-full bg-gray-50 border-none text-xs focus:bg-white focus:ring-1 focus:ring-gray-100 transition-all outline-none"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 lg:px-12 pt-8 pb-24">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Sidebar */}
          <FilterSidebar 
            categories={categories} 
            selectedCategories={selectedCategories} 
            toggleCategory={toggleCategory} 
            isDarkMode={isDarkMode} 
          />

          {/* Product Section */}
          <div className="flex-1">
            
            {/* Top Bar */}
            <div className={`flex items-center justify-between gap-6 mb-10 pb-6 border-b transition-colors duration-500 ${isDarkMode ? 'border-slate-800' : 'border-slate-100'}`}>
              <p className="text-[11px] text-gray-400">
                {products.length > 0 ? (
                  <>
                    Affichage de <span className="font-bold text-[#111827]">1–{products.length}</span> produits
                  </>
                ) : (
                  "Aucun résultat"
                )}
              </p>

              <div className="flex items-center gap-12">
                {/* View Switch */}
                <div className="flex items-center gap-4">
                  <button className="text-[#111827]"><LayoutGrid size={16} /></button>
                  <button className="text-gray-300"><List size={16} /></button>
                </div>

                {/* Sort Dropdown */}
                <div className="flex items-center gap-3">
                   <span className="text-[11px] text-gray-400 whitespace-nowrap">Trier par :</span>
                   <select 
                     value={sortBy}
                     onChange={(e) => setSortBy(e.target.value)}
                     className={`flex items-center justify-between w-40 h-9 px-4 rounded-lg border text-[11px] font-bold transition-all outline-none appearance-none cursor-pointer ${isDarkMode ? 'bg-slate-900 border-slate-800 hover:border-slate-700 text-white' : 'bg-white border-gray-100 hover:border-[#3653E2]'}`}
                   >
                     <option value="Plus récents">Plus récents</option>
                     <option value="Prix croissant">Prix croissant</option>
                     <option value="Prix décroissant">Prix décroissant</option>
                   </select>
                </div>
              </div>
            </div>

            {/* Grid or Skeleton State */}
            {loading ? (
              <div className={`grid gap-8 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
                {[...Array(6)].map((_, i) => (
                  <div key={i} className={`rounded-3xl overflow-hidden shadow-sm animate-pulse ${isDarkMode ? 'bg-slate-900' : 'bg-slate-50'}`}>
                    <div className="aspect-square bg-slate-200/50" />
                    <div className="p-6 space-y-4">
                      <div className="h-2 w-1/3 bg-slate-200/50 rounded" />
                      <div className="h-4 w-3/4 bg-slate-200/50 rounded" />
                      <div className="flex justify-between items-center">
                         <div className="h-4 w-1/4 bg-slate-200/50 rounded" />
                         <div className="h-8 w-1/3 bg-slate-200/50 rounded" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : products.length > 0 ? (
              <div className={`grid gap-8 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
                {products.map(product => (
                  <ProductCard key={product.id} product={product} isDarkMode={isDarkMode} />
                ))}
              </div>
            ) : (
              <div className={`text-center py-20 rounded-3xl border-2 border-dashed ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-100'}`}>
                <HelpCircle size={48} className="mx-auto text-slate-300 mb-6" />
                <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-[#111827]'}`}>Aucun produit trouvé</h3>
                <p className="text-slate-500 mb-8">Nous n'avons trouvé aucun article correspondant à vos critères.</p>
                <button 
                  onClick={() => setSelectedCategories([])}
                  className="inline-flex h-12 px-8 rounded-xl bg-[#3653E2] text-white font-bold items-center shadow-lg shadow-[#3653E2]/20 hover:scale-105 transition-all"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            )}

            {/* Pagination */}
            {pagination.last_page > 1 && (
              <div className="mt-16 flex justify-center">
                <nav className="flex items-center gap-6">
                  <button 
                    disabled={pagination.current_page === 1}
                    onClick={() => fetchProducts(pagination.current_page - 1)}
                    className={`transition-colors ${pagination.current_page === 1 ? 'text-gray-100' : 'text-gray-300 hover:text-[#3653E2]'}`}
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <div className="flex items-center gap-2">
                      {[...Array(pagination.last_page)].map((_, i) => (
                        <button 
                          key={i + 1}
                          onClick={() => fetchProducts(i + 1)}
                          className={`w-8 h-8 flex items-center justify-center rounded-full text-xs font-bold transition-all ${
                            pagination.current_page === i + 1 
                              ? 'bg-[#3653E2] text-white' 
                              : 'text-gray-400 hover:bg-gray-100'
                          }`}
                        >
                          {i + 1}
                        </button>
                      ))}
                  </div>
                  <button 
                    disabled={pagination.current_page === pagination.last_page}
                    onClick={() => fetchProducts(pagination.current_page + 1)}
                    className={`transition-colors ${pagination.current_page === pagination.last_page ? 'text-gray-100' : 'text-gray-300 hover:text-[#3653E2]'}`}
                  >
                    <ChevronRight size={20} />
                  </button>
                </nav>
              </div>
            )}

          </div>
        </div>
      </main>

      <Newsletter isDarkMode={isDarkMode} />
      <Footer isDarkMode={isDarkMode} />

      {/* Mobile Filters Float Button */}
      <button className="lg:hidden fixed bottom-6 right-6 z-50 h-14 px-6 rounded-full bg-[#3653E2] text-white font-bold flex items-center gap-3 shadow-2xl shadow-[#3653E2]/40 animate-bounce">
        <Filter size={20} />
        Filtres
      </button>
    </div>
  )
}
