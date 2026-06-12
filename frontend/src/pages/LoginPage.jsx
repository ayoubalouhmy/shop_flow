import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../utils/api'
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShoppingBag,
  CheckCircle2,
} from 'lucide-react'

/* ─── Composant InputField ─── */
function InputField({ id, label, type = 'text', placeholder, icon: Icon, value, onChange, rightElement }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-slate-700">
        {label}
      </label>
      <div className="relative group">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#3653E2] transition-colors duration-200">
          <Icon size={18} strokeWidth={1.8} />
        </span>
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="
            w-full h-10 pl-11 pr-12 rounded-xl border border-slate-200
            bg-slate-50/60 text-slate-800 text-sm placeholder-slate-400
            outline-none transition-all duration-200
            focus:bg-white focus:border-[#3653E2]
            focus:ring-4 focus:ring-[#3653E2]/10
            hover:border-slate-300
          "
        />
        {rightElement && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2">
            {rightElement}
          </span>
        )}
      </div>
    </div>
  )
}

/* ─── Composant PasswordField ─── */
function PasswordField({ id, label, placeholder, value, onChange }) {
  const [show, setShow] = useState(false)

  const toggleBtn = (
    <button
      type="button"
      onClick={() => setShow(p => !p)}
      className="p-1 text-slate-400 hover:text-[#3653E2] transition-colors duration-200 focus:outline-none"
      tabIndex={-1}
      aria-label={show ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
    >
      {show ? <EyeOff size={18} strokeWidth={1.8} /> : <Eye size={18} strokeWidth={1.8} />}
    </button>
  )

  return (
    <InputField
      id={id}
      label={label}
      type={show ? 'text' : 'password'}
      placeholder={placeholder}
      icon={Lock}
      value={value}
      onChange={onChange}
      rightElement={toggleBtn}
    />
  )
}

/* ─── Page Login ─── */
export default function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = field => e => {
    setError('')
    setForm(prev => ({ ...prev, [field]: e.target.value }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await api.post('/auth/login', {
        email: form.email,
        password: form.password
      })
      
      const { user: userData, token } = response.data.data
      
      // Sauvegarder le token
      localStorage.setItem('token', token)
      
      login(userData)
      
      setLoading(false)
      
      
      // Redirection selon le rôle
      if (userData.role === 'admin') {
        navigate('/admin')
      } else {
        navigate('/')
      }
    } catch (err) {
      console.error(err)
      setLoading(false)
      setError(err.response?.data?.message || 'Identifiants invalides.')
    }
  }

  return (
    <div className="min-h-screen bg-[#F5F5F7] flex items-center justify-center p-4 font-sans">

      {/* Fond décoratif */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#3653E2]/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#3653E2]/5 rounded-full blur-3xl" />
      </div>

      {/* Card principale */}
      <div className="
        relative w-full max-w-[420px] bg-white rounded-3xl
        shadow-xl shadow-slate-200/80
        p-6 sm:p-8
        transition-all duration-300
        hover:shadow-2xl hover:shadow-[#3653E2]/10 hover:-translate-y-0.5
        animate-fadeIn
      ">
        {/* ── Logo ── */}
        <div className="flex flex-col items-center mb-6">
          <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-[#3653E2] shadow-lg shadow-[#3653E2]/30 mb-3">
            <ShoppingBag size={22} className="text-white" strokeWidth={1.8} />
          </div>
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">Bon retour !</h1>
          <p className="text-xs text-slate-500 mt-0.5">Connectez-vous à votre compte ShopFlow</p>
        </div>

        {/* ── Formulaire ── */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">

          <InputField
            id="login-email"
            label="Adresse e-mail"
            type="email"
            placeholder="jean@exemple.com"
            icon={Mail}
            value={form.email}
            onChange={handleChange('email')}
          />

          <div className="flex flex-col gap-1">
            <PasswordField
              id="login-password"
              label="Mot de passe"
              placeholder="Votre mot de passe"
              value={form.password}
              onChange={handleChange('password')}
            />
            {/* Mot de passe oublié aligné à droite */}
            <div className="flex justify-end">
              <a
                href="#"
                className="text-xs font-medium text-[#3653E2] hover:text-[#2a44c8] transition-colors duration-150 underline-offset-2 hover:underline"
              >
                Mot de passe oublié ?
              </a>
            </div>
          </div>

          {/* ── Message d'erreur ── */}
          {error && (
            <div className="flex items-center gap-2 px-3 py-2 bg-red-50 border border-red-100 rounded-lg">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
              <p className="text-xs text-red-600">{error}</p>
            </div>
          )}

          {/* ── Bouton Se connecter ── */}
          <button
            type="submit"
            disabled={loading}
            className="
              mt-1 w-full h-10 flex items-center justify-center gap-2
              bg-[#3653E2] hover:bg-[#2a44c8] active:bg-[#2035a8]
              text-white text-sm font-semibold rounded-xl
              shadow-lg shadow-[#3653E2]/30 hover:shadow-xl hover:shadow-[#3653E2]/40
              transition-all duration-200 active:scale-[0.98]
              focus:outline-none focus:ring-4 focus:ring-[#3653E2]/30
              disabled:opacity-70 disabled:cursor-not-allowed
            "
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Connexion en cours…
              </>
            ) : (
              <>
                Se connecter
                <ArrowRight size={16} strokeWidth={2.2} />
              </>
            )}
          </button>
        </form>

        {/* ── Lien inscription ── */}
        <p className="text-center text-sm text-slate-500 mt-5">
          Pas encore de compte ?{' '}
          <Link
            to="/register"
            className="font-semibold text-[#3653E2] hover:text-[#2a44c8] transition-colors duration-150 underline-offset-2 hover:underline"
          >
            S'inscrire
          </Link>
        </p>
      </div>
    </div>
  )
}
