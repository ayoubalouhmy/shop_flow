import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  User,
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
        {/* Icône gauche */}
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

        {/* Slot droit (bouton show/hide) */}
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

/* ─── Indicateur de force du mot de passe ─── */
function PasswordStrength({ password }) {
  if (!password) return null

  const checks = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[0-9]/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ]
  const score = checks.filter(Boolean).length

  const colors = ['bg-red-400', 'bg-orange-400', 'bg-yellow-400', 'bg-green-500']
  const labels = ['Très faible', 'Faible', 'Moyen', 'Fort']

  return (
    <div className="space-y-1.5">
      <div className="flex gap-1">
        {[0, 1, 2, 3].map(i => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-all duration-300 ${
              i < score ? colors[score - 1] : 'bg-slate-200'
            }`}
          />
        ))}
      </div>
      <p className={`text-xs font-medium ${score < 2 ? 'text-red-500' : score < 3 ? 'text-yellow-500' : 'text-green-600'}`}>
        {labels[score - 1] || 'Très faible'}
      </p>
    </div>
  )
}

/* ─── Page principale ─── */
export default function RegisterPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = field => e => setForm(prev => ({ ...prev, [field]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 1400)) // simulation
    setLoading(false)
    setSubmitted(true)
  }

  /* ── Vue succès ── */
  if (submitted) {
    return (
      <div className="min-h-screen bg-[#F5F5F7] flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/70 p-10 w-full max-w-[420px] text-center animate-fadeIn">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-green-50 mb-5">
            <CheckCircle2 size={32} className="text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Compte créé !</h2>
          <p className="text-slate-500 text-sm leading-relaxed">
            Bienvenue sur <span className="font-semibold text-[#3653E2]">ShopFlow</span>,{' '}
            {form.name}. Votre compte a été créé avec succès.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F5F5F7] flex items-center justify-center p-4 font-sans">

      {/* Fond décoratif */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#3653E2]/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#3653E2]/5 rounded-full blur-3xl" />
      </div>

      {/* Card principale */}
      <div
        className="
          relative w-full max-w-[420px] bg-white rounded-3xl
          shadow-xl shadow-slate-200/80
          p-6 sm:p-8
          transition-all duration-300
          hover:shadow-2xl hover:shadow-[#3653E2]/10 hover:-translate-y-0.5
          animate-fadeIn
        "
      >
        {/* ── Logo ── */}
        <div className="flex flex-col items-center mb-5">
          <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-[#3653E2] shadow-lg shadow-[#3653E2]/30 mb-3">
            <ShoppingBag size={22} className="text-white" strokeWidth={1.8} />
          </div>
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">Créer un compte</h1>
          <p className="text-xs text-slate-500 mt-0.5">Rejoignez ShopFlow dès aujourd'hui</p>
        </div>

        {/* ── Formulaire ── */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-2.5">

          <InputField
            id="name"
            label="Nom complet"
            placeholder="Jean Dupont"
            icon={User}
            value={form.name}
            onChange={handleChange('name')}
          />

          <InputField
            id="email"
            label="Adresse e-mail"
            type="email"
            placeholder="jean@exemple.com"
            icon={Mail}
            value={form.email}
            onChange={handleChange('email')}
          />

          <div className="flex flex-col gap-1.5">
            <PasswordField
              id="password"
              label="Mot de passe"
              placeholder="Minimum 8 caractères"
              value={form.password}
              onChange={handleChange('password')}
            />
            <PasswordStrength password={form.password} />
          </div>

          <PasswordField
            id="confirmPassword"
            label="Confirmer le mot de passe"
            placeholder="Répétez votre mot de passe"
            value={form.confirmPassword}
            onChange={handleChange('confirmPassword')}
          />

          {/* Alerte si les mots de passe ne correspondent pas */}
          {form.confirmPassword && form.password !== form.confirmPassword && (
            <p className="text-xs text-red-500 -mt-2">
              Les mots de passe ne correspondent pas.
            </p>
          )}

          {/* ── Bouton S'inscrire ── */}
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
                Création en cours…
              </>
            ) : (
              <>
                S'inscrire
                <ArrowRight size={16} strokeWidth={2.2} />
              </>
            )}
          </button>
        </form>

        {/* ── Lien connexion ── */}
        <p className="text-center text-sm text-slate-500 mt-4">
          Déjà un compte ?{' '}
          <Link
            to="/login"
            className="font-semibold text-[#3653E2] hover:text-[#2a44c8] transition-colors duration-150 underline-offset-2 hover:underline"
          >
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  )
}
