import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import {
  ShoppingBag,
  ArrowRight,
  Truck,
  ShieldCheck,
  RefreshCw,
  Mail,
  ChevronRight,
  Star,
  Sun,
  Moon
} from 'lucide-react'
import { productsAPI, categoriesAPI } from '../services/api'

// Variants d'animation Framer Motion réutilisables
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export default function LandingPage() {
  const navigate = useNavigate();
  const { isAuthenticated, logout, user } = useAuth();
  const { cartCount } = useCart();
  const [isDarkMode, setIsDarkMode] = useState(document.documentElement.classList.contains('dark'))

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.classList.contains('dark'))
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  const [featuredProducts, setFeaturedProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLandingData = async () => {
      try {
        const [prodRes, catRes] = await Promise.all([
          productsAPI.getAll({ limit: 4 }),
          categoriesAPI.getAll()
        ])
        setFeaturedProducts(prodRes.data.data.data.slice(0, 4) || [])
        setCategories(catRes.data.data.slice(0, 3) || [])
      } catch (error) {
        console.error("Error fetching landing data:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchLandingData()
  }, [])

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-[#171a1f]'} selection:bg-[#3653E2]/10 selection:text-[#3653E2] font-sans`}>

      {/* ─── NAVBAR STICKY WITH BLUR ─── */}
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
            <Link to="/" className="text-[#3653E2] hover:text-[#3653E2] transition-colors">Accueil</Link>
            <Link to="/shop" className="hover:text-slate-900 transition-colors">Produits</Link>
            <a href="#propos" className="hover:text-slate-900 transition-colors">À propos</a>
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
                <Link 
                  to="/profile"
                  className="w-10 h-10 rounded-full bg-[#3653E2] text-white flex items-center justify-center font-bold shadow-lg shadow-[#3653E2]/20 hover:scale-105 transition-transform"
                  title={user?.name}
                >
                  {user?.name?.charAt(0).toUpperCase()}
                </Link>
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
              <Link
                to="/login"
                className="
                  hidden sm:inline-flex items-center justify-center h-10 px-5 rounded-xl
                  bg-[#3653E2] hover:bg-[#2a44c8] active:bg-[#2035a8]
                  text-white text-sm font-semibold
                  shadow-lg shadow-[#3653E2]/15 hover:shadow-xl hover:shadow-[#3653E2]/25
                  transition-all duration-200 hover:-translate-y-0.5
                "
              >
                Se connecter
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* ─── HERO SECTION ─── */}
      <section className="relative overflow-hidden pt-10 pb-24 sm:pt-14 sm:pb-32 md:pt-16 md:pb-40 bg-gradient-to-br from-white via-slate-50 to-slate-100/80">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-[#3653E2]/5 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#fdeddd]/40 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative">
          {/* Contenu gauche */}
          <motion.div
            className="lg:col-span-7 flex flex-col items-start text-left"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            {/* Tag / Badge */}
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#3653E2]/10 text-[#3653E2] text-xs font-semibold tracking-wider uppercase mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#3653E2] animate-pulse" />
              Nouvelle Collection Disponible
            </motion.div>

            {/* Titre */}
            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#171a1f] leading-[1.1] tracking-tight mb-6"
            >
              L’Essence du <br className="hidden sm:inline" />
              <span className="text-[#3653E2] relative">
                Minimalisme
                <span className="absolute bottom-0 left-0 w-full h-[6px] bg-[#3653E2]/10 rounded-full -z-10" />
              </span> Moderne
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={fadeInUp}
              className="text-slate-500 text-base sm:text-lg max-w-lg leading-relaxed mb-8"
            >
              Découvrez une sélection de pièces intemporelles conçues pour s'adapter à votre quotidien. Alliance parfaite de fonctionnalité, de matériaux haut de gamme et d'élégance épurée.
            </motion.p>

            {/* Actions CTA */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap items-center gap-4 mb-12 w-full sm:w-auto"
            >
              <Link
                to="/shop"
                className="
                  h-12 px-8 rounded-xl bg-[#3653E2] hover:bg-[#2a44c8] text-white
                  flex items-center justify-center gap-2 font-semibold text-sm
                  shadow-lg shadow-[#3653E2]/20 hover:shadow-xl hover:shadow-[#3653E2]/35
                  transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98]
                "
              >
                Acheter maintenant
                <ArrowRight size={16} strokeWidth={2.2} />
              </Link>
              <button
                className="
                  h-12 px-8 rounded-xl bg-white border border-slate-200 hover:border-slate-300
                  text-slate-700 font-semibold text-sm
                  hover:bg-slate-50 hover:shadow-sm
                  transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98]
                "
              >
                Voir le Lookbook
              </button>
            </motion.div>

            {/* Statistiques */}
            <motion.div
              variants={fadeInUp}
              className="grid grid-cols-2 gap-8 border-t border-slate-200/60 pt-8 w-full sm:max-w-md"
            >
              <div>
                <p className="text-3xl sm:text-4xl font-extrabold text-[#171a1f] tracking-tight">15k+</p>
                <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mt-1">Clients Satisfaits</p>
              </div>
              <div>
                <p className="text-3xl sm:text-4xl font-extrabold text-[#171a1f] tracking-tight">500+</p>
                <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mt-1">Designs Uniques</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Image lifestyle droite */}
          <motion.div
            className="lg:col-span-5 relative flex justify-center"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Support Arrière-plan coloré pour l'image */}
            <div className="absolute inset-0 bg-[#fdeddd] rounded-[2.5rem] transform rotate-3 scale-95 opacity-50 -z-10" />

            <div className="relative rounded-[2.5rem] overflow-hidden border-8 border-white shadow-2xl shadow-slate-300/60 max-w-[420px] lg:max-w-full aspect-[4/5]">
              <img
                src="/hero_lifestyle.png"
                alt="Minimalist Lifestyle Collection"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>

            {/* Carte flottante premium */}
            <motion.div
              className="absolute -bottom-6 -left-6 bg-white/90 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-white/60 shadow-lg max-w-[220px]"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#fdeddd] flex items-center justify-center">
                  <Star size={18} className="text-amber-500 fill-amber-500" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">Qualité Premium</p>
                  <p className="text-xs text-slate-500">Matières certifiées</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── FEATURES SECTION ─── */}
      <section className="py-16 md:py-24 bg-white relative z-10 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Card 1 */}
          <div className="group flex items-center gap-5 p-6 rounded-2xl hover:bg-slate-50 transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-[#3653E2]/5 text-[#3653E2] flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
              <Truck size={22} strokeWidth={1.8} />
            </div>
            <div>
              <h3 className="font-bold text-[#171a1f] text-base">Livraison Express</h3>
              <p className="text-sm text-slate-500 mt-0.5">Offerte dès 150 € d'achat en France</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="group flex items-center gap-5 p-6 rounded-2xl hover:bg-slate-50 transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-[#3653E2]/5 text-[#3653E2] flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
              <ShieldCheck size={22} strokeWidth={1.8} />
            </div>
            <div>
              <h3 className="font-bold text-[#171a1f] text-base">Paiement Sécurisé</h3>
              <p className="text-sm text-slate-500 mt-0.5">Transactions 3D Secure cryptées</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="group flex items-center gap-5 p-6 rounded-2xl hover:bg-slate-50 transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-[#3653E2]/5 text-[#3653E2] flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
              <RefreshCw size={22} strokeWidth={1.8} />
            </div>
            <div>
              <h3 className="font-bold text-[#171a1f] text-base">Retours Faciles</h3>
              <p className="text-sm text-slate-500 mt-0.5">Retournez vos articles sous 30 jours</p>
            </div>
          </div>

        </div>
      </section>

      {/* ─── CATEGORIES SECTION ─── */}
      <section id="categories" className="py-24 sm:py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">
          <div className="text-center max-w-lg mx-auto mb-16">
            <h2 className="text-3xl font-extrabold tracking-tight text-[#171a1f]">Inspirations Thématiques</h2>
            <p className="text-slate-500 text-sm mt-3">Explorez nos catégories sélectionnées avec soin pour une harmonie parfaite.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {loading ? (
              [...Array(3)].map((_, i) => (
                <div key={i} className="rounded-3xl aspect-[4/5] bg-slate-100 animate-pulse" />
              ))
            ) : categories.map((category) => (
              <div key={category.id} className="group relative rounded-3xl overflow-hidden aspect-[4/5] shadow-md hover:shadow-xl transition-all duration-300">
                <img
                  src={category.image?.startsWith('http') ? category.image : `http://localhost:8000/storage/${category.image}`}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8" />
                <div className="absolute bottom-0 left-0 w-full p-8 z-10">
                  <p className="text-[#fdeddd] text-xs font-semibold tracking-wider uppercase mb-1">Collection</p>
                  <h3 className="text-white text-2xl font-bold mb-4">{category.name}</h3>
                  <Link 
                    to={`/shop?category_id=${category.id}`} 
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-white text-slate-900 rounded-xl text-xs font-semibold hover:bg-[#fdeddd] hover:text-[#3653E2] transition-colors duration-200"
                  >
                    Explorer
                    <ChevronRight size={14} strokeWidth={2.5} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURED PRODUCTS SECTION ─── */}
      <section id="produits" className="py-24 sm:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">

          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight text-[#171a1f]">Nos Pièces Vedettes</h2>
              <p className="text-slate-500 text-sm mt-2">L'esthétique minimaliste alliée aux matières les plus nobles.</p>
            </div>
            <Link to="/shop" className="group inline-flex items-center gap-1.5 font-bold text-sm text-[#3653E2] hover:text-[#2a44c8] transition-colors">
              Voir tous les produits
              <ArrowRight size={16} strokeWidth={2.2} className="transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Grid Produits */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {loading ? (
              [...Array(4)].map((_, i) => (
                <div key={i} className="rounded-3xl h-[400px] bg-slate-100 animate-pulse" />
              ))
            ) : featuredProducts.map((product) => (
              <motion.div
                key={product.id}
                className={`group flex flex-col rounded-3xl border overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100/80'}`}
              whileHover={{ y: -5 }}
              >
                <Link to={`/product/${product.id}`} className="relative aspect-[3/4] overflow-hidden bg-slate-50 block w-full">
                  <img
                    src={product.images && product.images.length > 0
                      ? (product.images[0].startsWith('http') ? product.images[0] : `http://localhost:8000/storage/${product.images[0]}`)
                      : 'https://via.placeholder.com/400'}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Badge */}
                  {product.badge && (
                    <span className="absolute top-4 left-4 px-2.5 py-1 bg-white/90 backdrop-blur-sm text-slate-800 text-[10px] font-bold tracking-wider uppercase rounded-full shadow-sm">
                      {product.badge}
                    </span>
                  )}
                </Link>

                {/* Détails Produit */}
                <div className="p-5 flex flex-col flex-1">
                  <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">{product.category?.name || 'Général'}</p>
                  <Link to="/product">
                    <h3 className={`font-bold text-sm mt-1 ${isDarkMode ? 'text-slate-300' : 'text-slate-800'} hover:text-[#3653E2] transition-colors duration-150 cursor-pointer`}>
                      {product.name}
                    </h3>
                  </Link>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mt-2 mb-3">
                    <Star size={12} className="text-amber-500 fill-amber-500" />
                    <span className="text-xs font-bold text-slate-700">{product.rating}</span>
                  </div>

                  {/* Prix + CTA */}
                  <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-50">
                    <span className="text-slate-900 font-extrabold text-sm">{product.price}</span>
                    <button className="h-8 px-4 bg-slate-950 hover:bg-[#3653E2] active:bg-[#2035a8] text-white rounded-lg text-xs font-semibold transition-all duration-200">
                      Ajouter
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ─── NEWSLETTER SECTION ─── */}
      <section className="py-24 sm:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">
          <div className="bg-[#fdeddd] rounded-[2.5rem] overflow-hidden relative p-8 sm:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

            {/* Contenu gauche */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#171a1f] leading-tight mb-4">
                Profitez de -15% sur votre <br />première commande
              </h2>
              <p className="text-slate-600 text-sm max-w-md mb-8 leading-relaxed">
                Inscrivez-vous à notre lettre d'information et recevez en avant-première nos lookbooks exclusifs et nos lancements de produits.
              </p>

              {/* Formulaire Email */}
              <form className="flex flex-col sm:flex-row gap-3 w-full max-w-md" onSubmit={(e) => e.preventDefault()}>
                <div className="relative flex-1">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <Mail size={16} />
                  </span>
                  <input
                    type="email"
                    placeholder="Votre adresse email"
                    className="
                      w-full h-11 pl-11 pr-4 rounded-xl bg-white border border-slate-200/80
                      text-sm text-slate-800 placeholder-slate-400 outline-none
                      focus:border-[#3653E2] focus:ring-4 focus:ring-[#3653E2]/5 transition-all
                    "
                  />
                </div>
                <button
                  type="submit"
                  className="
                    h-11 px-6 rounded-xl bg-slate-900 hover:bg-[#3653E2] active:bg-[#2035a8]
                    text-white text-sm font-semibold transition-all duration-200 flex-shrink-0
                  "
                >
                  S'abonner
                </button>
              </form>
            </div>

            {/* Image droite */}
            <div className="lg:col-span-5 hidden lg:flex justify-end relative">
              <div className="w-[300px] h-[340px] rounded-[2rem] overflow-hidden border-4 border-white shadow-xl relative">
                <img
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80"
                  alt="Minimalist Lifestyle Details"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── FINAL CTA SECTION ─── */}
      <section id="propos" className="py-28 sm:py-36 bg-[#171a1f] relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#3653E2] rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#3653E2] rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto px-6 sm:px-12 lg:px-16 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6">
            Prêt à Redéfinir Votre Style ?
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-lg mx-auto mb-10 leading-relaxed">
            Rejoignez-nous et adoptez une mode plus réfléchie, plus épurée et plus durable.
          </p>
          <a
            href="#produits"
            className="
              inline-flex items-center justify-center h-12 px-8 rounded-xl bg-white hover:bg-[#fdeddd]
              text-slate-900 font-bold text-sm shadow-lg transition-all duration-300 hover:-translate-y-0.5
            "
          >
            Découvrir la Collection
          </a>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className={`mt-20 pt-24 pb-12 px-6 sm:px-12 lg:px-16 border-t transition-colors duration-500 ${isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-100'}`}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10">

          {/* Logo + Description */}
          <div className="md:col-span-4 flex flex-col items-start">
            <Link to="/" className="flex items-center gap-2.5 group mb-4">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#3653E2] shadow-md shadow-[#3653E2]/25">
                <ShoppingBag size={15} className="text-white" strokeWidth={2} />
              </div>
              <span className={`font-bold text-base tracking-tight ${isDarkMode ? 'text-white' : 'text-[#171a1f]'}`}>
                Shop<span className="text-[#3653E2]">Flow</span>
              </span>
            </Link>
            <p className="text-slate-400 text-xs leading-relaxed max-w-xs text-left">
              Créer des designs minimalistes et durables pour les intérieurs et styles de vie contemporains. Inspiré par la pureté des lignes.
            </p>
            {/* Réseaux Sociaux */}
            <div className="flex items-center gap-4 mt-6">
              <a href="#" className="w-8 h-8 rounded-lg border border-slate-100 flex items-center justify-center text-slate-400 hover:text-[#3653E2] hover:border-[#3653E2]/30 transition-all duration-200" aria-label="Instagram">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-lg border border-slate-100 flex items-center justify-center text-slate-400 hover:text-[#3653E2] hover:border-[#3653E2]/30 transition-all duration-200" aria-label="Facebook">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-lg border border-slate-100 flex items-center justify-center text-slate-400 hover:text-[#3653E2] hover:border-[#3653E2]/30 transition-all duration-200" aria-label="Twitter">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                </svg>
              </a>
            </div>
          </div>

          {/* Liens Utiles */}
          <div className="md:col-span-2 text-left">
            <h4 className={`font-bold text-xs uppercase tracking-wider mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Navigation</h4>
            <ul className="space-y-2.5 text-xs text-slate-500">
              <li><Link to="/" className="hover:text-slate-900 transition-colors">Accueil</Link></li>
              <li><Link to="/shop" className="hover:text-slate-900 transition-colors">Produits</Link></li>
              <li><a href="#propos" className="hover:text-slate-900 transition-colors">À propos</a></li>
            </ul>
          </div>

          <div className="md:col-span-2 text-left">
            <h4 className={`font-bold text-xs uppercase tracking-wider mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Assistance</h4>
            <ul className="space-y-2.5 text-xs text-slate-500">
              <li><a href="#" className="hover:text-slate-900 transition-colors">Livraison & Retours</a></li>
              <li><a href="#" className="hover:text-slate-900 transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-slate-900 transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-slate-900 transition-colors">Mentions légales</a></li>
            </ul>
          </div>

          {/* Newsletter Mini */}
          <div className="md:col-span-4 text-left">
            <h4 className={`font-bold text-xs uppercase tracking-wider mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Newsletter</h4>
            <p className="text-xs text-slate-500 mb-3 leading-relaxed">
              Inscrivez-vous pour recevoir des offres exclusives.
            </p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Votre email"
                className={`
                  flex-1 h-9 px-3 rounded-lg border text-xs placeholder-slate-400 outline-none transition-all
                  ${isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-slate-200/80 text-slate-800'}
                  focus:border-[#3653E2]
                `}
              />
              <button
                type="submit"
                className="h-9 px-4 bg-slate-900 hover:bg-[#3653E2] text-white rounded-lg text-xs font-semibold transition-all duration-200"
              >
                OK
              </button>
            </form>
          </div>

        </div>

        <div className="max-w-7xl mx-auto border-t border-slate-100 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <p>© {new Date().getFullYear()} ShopFlow. Tous droits réservés. Conçu avec soin pour une expérience moderne.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-700 transition-colors">Politique de confidentialité</a>
            <a href="#" className="hover:text-slate-700 transition-colors">CGV</a>
          </div>
        </div>
      </footer>

    </div>
  )
}
