import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  ShoppingBag,
  Moon,
  Sun,
  Star,
  ChevronRight,
  Plus,
  Minus,
  Truck,
  RefreshCw,
  ShieldCheck,
  Mail,
  ChevronLeft,
  Menu,
  X,
  ArrowRight,
  Heart
} from 'lucide-react'

// --- MOCK DATA ---
const product = {
  id: 1,
  name: "Veste en Laine Mérinos Premium",
  category: "Vêtements d'extérieur",
  price: 249,
  rating: 4.9,
  reviews: 128,
  badge: "Collection Hiver",
  description: "Cette veste d'exception allie la chaleur naturelle de la laine mérinos à une coupe contemporaine épurée. Conçue pour durer, elle offre une respirabilité optimale tout en vous protégeant des éléments avec élégance.",
  features: [
    "100% Laine Mérinos certifiée",
    "Coupe ajustée moderne",
    "Doublure thermique légère",
    "Poches invisibles découpées au laser"
  ],
  colors: [
    { name: 'Charcoal', hex: '#374151' },
    { name: 'Marine', hex: '#1E3A8A' },
    { name: 'Sable', hex: '#D1D5DB' }
  ],
  sizes: ['S', 'M', 'L', 'XL'],
  images: [
    "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1544022613-e87cd039ce95?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1551028711-031c50728753?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?auto=format&fit=crop&w=400&q=80"
  ]
}

const similarProducts = [
  { id: 2, name: "Pull Cachemire Col Roulé", category: "Maille", price: 189, image: "https://images.unsplash.com/photo-1574167132757-1447ae94693e?auto=format&fit=crop&w=600&q=80" },
  { id: 3, name: "Pantalon Chino Ajusté", category: "Bas", price: 120, image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=600&q=80" },
  { id: 4, name: "Écharpe Laine & Soie", category: "Accessoires", price: 65, image: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&w=600&q=80" },
  { id: 5, name: "Gants Cuir Tactiles", category: "Accessoires", price: 85, image: "https://images.unsplash.com/photo-1516930845533-377196751b4c?auto=format&fit=crop&w=600&q=80" }
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
          <Link to="/shop" className="text-[#3653E2] hover:text-[#3653E2] transition-colors">Produit</Link>
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
          
          <Link to="/cart" className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100/50 rounded-full relative transition-all duration-200" aria-label="Panier">
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
              <li><Link to="/shop" onClick={() => setMobileMenuOpen(false)} className="text-[#3653E2]">Produit</Link></li>
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
            L'excellence du design minimaliste pour transformer votre intérieur et votre style de vie.
          </p>
        </div>

        <div className="lg:col-span-2">
          <h4 className="font-bold text-xs uppercase tracking-widest text-slate-900 mb-6">Boutique</h4>
          <ul className="space-y-4 text-xs text-slate-500">
            <li><Link to="/shop" className="hover:text-slate-900 transition-colors">Tous les produits</Link></li>
            <li><Link to="#" className="hover:text-slate-900 transition-colors">Nouveautés</Link></li>
            <li><Link to="#" className="hover:text-slate-900 transition-colors">Collections</Link></li>
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h4 className="font-bold text-xs uppercase tracking-widest text-slate-900 mb-6">Support</h4>
          <ul className="space-y-4 text-xs text-slate-500">
            <li><Link to="#" className="hover:text-slate-900 transition-colors">Livraisons</Link></li>
            <li><Link to="#" className="hover:text-slate-900 transition-colors">Retours</Link></li>
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
              OK
            </button>
          </form>
        </div>
      </div>
      <div className="max-w-7xl mx-auto pt-8 border-t border-slate-50 flex flex-col sm:flex-row items-center justify-between gap-6 text-[11px] text-slate-400">
        <p>© 2024 SHOPFLOW. TOUS DROITS RÉSERVÉS.</p>
        <div className="flex gap-8">
          <Link to="#" className="hover:text-slate-900">Privacy Policy</Link>
          <Link to="#" className="hover:text-slate-900">Terms of Service</Link>
        </div>
      </div>
    </footer>
  )
}

const NewsletterSection = () => {
  return (
    <section className="py-24 px-6 sm:px-12 lg:px-16">
      <div className="max-w-7xl mx-auto rounded-[3rem] bg-[#F2F4FD] relative p-12 lg:p-20 overflow-hidden flex flex-col lg:flex-row items-center gap-12">
        <div className="flex-1 text-left relative z-10">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-[#111827] leading-tight mb-6">
            Rejoignez le cercle ShopFlow.
          </h2>
          <p className="text-slate-500 text-sm lg:text-base mb-10 leading-relaxed max-w-md">
            Inscrivez-vous pour bénéficier de nos conseils de style et de -15% sur votre première commande.
          </p>
          <form className="flex w-full items-center bg-white rounded-full p-1.5 border border-slate-100 shadow-sm max-w-md" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="votre-email@exemple.com"
              className="flex-1 h-12 px-6 rounded-full text-xs text-[#111827] bg-transparent outline-none"
            />
            <button className="h-12 px-8 rounded-full bg-[#3653E2] text-white font-bold text-xs shadow-lg shadow-[#3653E2]/20 hover:bg-[#2a44c8] transition-all">
              S'abonner
            </button>
          </form>
        </div>
        <div className="flex-1 relative hidden lg:flex justify-end">
           <div className="relative w-full max-w-md">
              <div className="rounded-[2rem] overflow-hidden shadow-2xl">
                 <img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80" alt="Interior" className="w-full h-80 object-cover" />
              </div>
           </div>
        </div>
      </div>
    </section>
  )
}

// --- MAIN PAGE ---

export default function ProductDetailPage() {
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState(0)
  const [selectedSize, setSelectedSize] = useState('M')
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('details')

  return (
    <div className="min-h-screen bg-white font-sans text-[#111827] selection:bg-[#3653E2]/10 selection:text-[#3653E2]">
      <Navbar />

      {/* Breadcrumb */}
      <nav className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 pt-8 pb-4">
        <ul className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-[#6B7280] uppercase">
          <li><Link to="/shop" className="hover:text-[#3653E2] transition-colors">Boutique</Link></li>
          <li><ChevronRight size={10} strokeWidth={3} /></li>
          <li><Link to="#" className="hover:text-[#3653E2] transition-colors">{product.category}</Link></li>
          <li><ChevronRight size={10} strokeWidth={3} /></li>
          <li className="text-[#111827] truncate max-w-[150px] sm:max-w-none">{product.name}</li>
        </ul>
      </nav>

      {/* Main Product Section */}
      <main className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Gallery - Column Left */}
          <div className="lg:col-span-7 flex flex-col md:flex-row gap-6">
            {/* Thumbnails */}
            <div className="flex md:flex-col gap-4 order-2 md:order-1 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative w-20 h-20 flex-shrink-0 rounded-2xl overflow-hidden border-2 transition-all duration-300 ${
                    selectedImage === idx ? 'border-[#3653E2] scale-105 shadow-md shadow-[#3653E2]/10' : 'border-transparent hover:border-slate-200'
                  }`}
                >
                  <img src={img} alt={`Product ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Main Image */}
            <div className="flex-1 order-1 md:order-2">
              <motion.div 
                key={selectedImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative aspect-[4/5] rounded-[24px] overflow-hidden bg-slate-50 group border border-slate-100"
              >
                <img
                  src={product.images[selectedImage]}
                  alt="Product Main"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                
                {/* Wishlist Button */}
                <button className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-slate-400 hover:text-rose-500 shadow-lg transition-all duration-300 hover:scale-110">
                  <Heart size={20} />
                </button>
              </motion.div>
            </div>
          </div>

          {/* Details - Column Right */}
          <div className="lg:col-span-5 flex flex-col pt-4">
            <span className="inline-block px-3 py-1 rounded-full bg-[#3653E2]/10 text-[#3653E2] text-[10px] font-bold mb-6 uppercase tracking-wider w-fit">
              {product.badge}
            </span>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111827] mb-4 tracking-tight leading-tight">
              {product.name}
            </h1>

            <div className="flex items-center gap-4 mb-8">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className={`${i < Math.floor(product.rating) ? 'text-[#3653E2] fill-[#3653E2]' : 'text-slate-200'}`} />
                ))}
              </div>
              <span className="text-sm font-semibold text-slate-500">
                {product.rating} <span className="text-slate-300 mx-1">|</span> {product.reviews} avis
              </span>
            </div>

            <p className="text-4xl font-extrabold text-[#3653E2] mb-8">
              {product.price}€
            </p>

            <p className="text-slate-500 text-lg leading-relaxed mb-10">
              {product.description}
            </p>

            {/* Selection Options */}
            <div className="space-y-10 mb-12">
              {/* Colors */}
              <div>
                <h4 className="text-sm font-bold uppercase tracking-widest text-slate-900 mb-5">Couleurs</h4>
                <div className="flex items-center gap-4">
                  {product.colors.map((color, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedColor(idx)}
                      className={`relative w-10 h-10 rounded-full transition-all duration-300 flex items-center justify-center ${
                        selectedColor === idx ? 'ring-2 ring-[#3653E2] ring-offset-2' : ''
                      }`}
                      style={{ backgroundColor: color.hex }}
                    >
                      {selectedColor === idx && <div className="w-2 h-2 rounded-full bg-white opacity-40" />}
                    </button>
                  ))}
                  <span className="text-sm font-medium text-slate-400 ml-2">{product.colors[selectedColor].name}</span>
                </div>
              </div>

              {/* Sizes */}
              <div>
                <div className="flex items-center justify-between mb-5">
                  <h4 className="text-sm font-bold uppercase tracking-widest text-slate-900">Taille</h4>
                  <button className="text-xs font-bold text-[#3653E2] hover:underline underline-offset-4">Guide des tailles</button>
                </div>
                <div className="flex items-center gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center text-sm font-bold transition-all duration-300 border-2 ${
                        selectedSize === size 
                          ? 'bg-[#3653E2] border-[#3653E2] text-white shadow-lg shadow-[#3653E2]/25 scale-105' 
                          : 'border-slate-100 text-slate-500 hover:border-slate-200 hover:text-slate-900'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <h4 className="text-sm font-bold uppercase tracking-widest text-slate-900 mb-5">Quantité</h4>
                <div className="flex items-center w-36 h-14 rounded-2xl border-2 border-slate-100 bg-slate-50 overflow-hidden">
                   <button 
                     onClick={() => setQuantity(Math.max(1, quantity - 1))}
                     className="flex-1 flex items-center justify-center text-slate-500 hover:text-[#3653E2] transition-colors"
                   >
                     <Minus size={18} />
                   </button>
                   <span className="flex-1 text-center font-bold">{quantity}</span>
                   <button 
                     onClick={() => setQuantity(quantity + 1)}
                     className="flex-1 flex items-center justify-center text-slate-500 hover:text-[#3653E2] transition-colors"
                   >
                     <Plus size={18} />
                   </button>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <button className="w-full h-16 bg-[#3653E2] hover:bg-[#2a44c8] active:bg-[#2035a8] text-white rounded-[20px] font-bold text-lg shadow-xl shadow-[#3653E2]/20 transition-all duration-300 flex items-center justify-center gap-3 mb-8 group">
               Ajouter au panier
               <ShoppingBag size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Trust Badges */}
            <div className="flex flex-col gap-4 pt-4 border-t border-slate-50">
               <div className="flex items-center gap-3 text-sm text-slate-500">
                  <Truck size={18} className="text-[#3653E2]" />
                  <span>Livraison gratuite partout en France</span>
               </div>
               <div className="flex items-center gap-3 text-sm text-slate-500">
                  <RefreshCw size={18} className="text-[#3653E2]" />
                  <span>Retours gratuits sous 30 jours</span>
               </div>
            </div>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section className="bg-white py-12 px-6 sm:px-12 lg:px-16 border-y border-slate-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-[20px] bg-white border border-slate-100 hover:shadow-xl hover:shadow-slate-100/60 transition-all duration-500 group flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-2xl bg-[#3653E2]/5 text-[#3653E2] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
               <Truck size={24} />
            </div>
            <h3 className="font-bold text-lg mb-2">Livraison Express</h3>
            <p className="text-sm text-slate-500">Livraison à domicile en 24/48h par nos partenaires premium.</p>
          </div>

          <div className="p-8 rounded-[20px] bg-white border border-slate-100 hover:shadow-xl hover:shadow-slate-100/60 transition-all duration-500 group flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-2xl bg-[#3653E2]/5 text-[#3653E2] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
               <RefreshCw size={24} />
            </div>
            <h3 className="font-bold text-lg mb-2">Retours Faciles</h3>
            <p className="text-sm text-slate-500">Pas convaincu ? Retournez votre article sans frais de retour.</p>
          </div>

          <div className="p-8 rounded-[20px] bg-white border border-slate-100 hover:shadow-xl hover:shadow-slate-100/60 transition-all duration-500 group flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-2xl bg-[#3653E2]/5 text-[#3653E2] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
               <ShieldCheck size={24} />
            </div>
            <h3 className="font-bold text-lg mb-2">Garantie 2 ans</h3>
            <p className="text-sm text-slate-500">Nous garantissons la qualité exceptionnelle de nos matériaux.</p>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="py-24 px-6 sm:px-12 lg:px-16 bg-white overflow-hidden">
        <div className="max-w-4xl mx-auto">
           {/* Tab Headers */}
           <div className="flex items-center gap-12 border-b border-slate-100 mb-12 overflow-x-auto pb-px">
              {[
                { id: 'details', label: 'Détails du produit' },
                { id: 'materials', label: 'Entretien & Matériaux' },
                { id: 'shipping', label: 'Expédition' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative pb-6 text-sm font-bold tracking-widest uppercase transition-all whitespace-nowrap ${
                    activeTab === tab.id ? 'text-[#3653E2]' : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <motion.div 
                      layoutId="tab-active"
                      className="absolute bottom-0 left-0 right-0 h-1 bg-[#3653E2] rounded-full"
                    />
                  )}
                </button>
              ))}
           </div>

           {/* Tab Content */}
           <motion.div
             key={activeTab}
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             className="text-slate-500 leading-relaxed"
           >
             {activeTab === 'details' && (
               <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                 <div>
                   <p className="mb-6">{product.description}</p>
                   <ul className="space-y-4">
                     {product.features.map((f, i) => (
                       <li key={i} className="flex items-center gap-3">
                         <div className="w-1.5 h-1.5 rounded-full bg-[#3653E2]" />
                         <span className="text-sm font-medium">{f}</span>
                       </li>
                     ))}
                   </ul>
                 </div>
                 <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100">
                    <h5 className="font-bold text-[#111827] mb-4">Points techniques</h5>
                    <p className="text-sm">Notre technologie mérinos thermo-régulatrice assure un confort climatique unique, en évacuant naturellement l'humidité tout en conservant la chaleur corporelle.</p>
                 </div>
               </div>
             )}
             {activeTab === 'materials' && (
               <div className="space-y-6">
                 <p>Lavage à la main ou nettoyage à sec recommandé. Ne pas utiliser de sèche-linge.</p>
                 <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                    <div className="p-6 bg-slate-50 rounded-2xl text-center">
                        <p className="font-bold text-[#111827] text-xl mb-1">100%</p>
                        <p className="text-[10px] uppercase font-bold tracking-widest">Laine</p>
                    </div>
                    <div className="p-6 bg-slate-50 rounded-2xl text-center">
                        <p className="font-bold text-[#111827] text-xl mb-1">0%</p>
                        <p className="text-[10px] uppercase font-bold tracking-widest">Synthétique</p>
                    </div>
                 </div>
               </div>
             )}
             {activeTab === 'shipping' && (
               <div className="space-y-6">
                 <p>Nos commandes sont expédiées sous 24h. Nous utilisons des emballages recyclables et sans plastique pour minimiser notre impact environnemental.</p>
                 <div className="border-l-4 border-[#3653E2] pl-6 italic">
                    "Une expérience de déballage premium, respectueuse de la planète."
                 </div>
               </div>
             )}
           </motion.div>
        </div>
      </section>

      {/* Similar Products */}
      <section className="py-24 px-6 sm:px-12 lg:px-16 bg-slate-50">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-extrabold text-[#111827] mb-4 tracking-tight">Vous aimerez aussi</h2>
          <p className="text-slate-500 text-sm">Complétez votre look avec notre sélection exclusive.</p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {similarProducts.map((p) => (
            <motion.div
              key={p.id}
              whileHover={{ y: -10 }}
              className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500"
            >
              <div className="aspect-square overflow-hidden bg-slate-50">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
              <div className="p-6">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{p.category}</p>
                <h4 className="font-bold text-sm text-[#111827] mb-3 group-hover:text-[#3653E2] transition-colors">{p.name}</h4>
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-sm">{p.price}€</span>
                  <button className="h-8 px-4 border border-slate-100 rounded-lg text-xs font-bold hover:bg-[#3653E2] hover:text-white hover:border-[#3653E2] transition-all">Détails</button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
            <Link to="/shop" className="inline-flex items-center gap-2 font-bold text-sm text-[#3653E2] group">
                Voir tout le catalogue
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
        </div>
      </section>

      <NewsletterSection />
      <Footer />
    </div>
  )
}
