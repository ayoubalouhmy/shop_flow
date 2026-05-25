import { useState, useEffect, useCallback } from 'react'
import { authAPI } from '../services/api'

export const useAuth = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Vérifier si l'utilisateur est connecté au chargement
  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    const token = localStorage.getItem('auth_token')
    
    if (storedUser && token) {
      setUser(JSON.parse(storedUser))
      setIsAuthenticated(true)
    }
  }, [])

  const login = useCallback(async (email, password) => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await authAPI.login(email, password)
      const { data } = response.data // La réponse est { success, message, data: { user, token } }
      const { user, token } = data
      
      localStorage.setItem('auth_token', token)
      localStorage.setItem('user', JSON.stringify(user))
      
      setUser(user)
      setIsAuthenticated(true)
      
      return { success: true, user }
    } catch (err) {
      const message = err.response?.data?.message || 'Erreur de connexion'
      setError(message)
      return { success: false, error: message }
    } finally {
      setLoading(false)
    }
  }, [])

  const register = useCallback(async (name, email, password, password_confirmation) => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await authAPI.register(name, email, password, password_confirmation)
      const { data } = response.data // La réponse est { success, message, data: { user, token } }
      const { user, token } = data
      
      localStorage.setItem('auth_token', token)
      localStorage.setItem('user', JSON.stringify(user))
      
      setUser(user)
      setIsAuthenticated(true)
      
      return { success: true, user }
    } catch (err) {
      const message = err.response?.data?.message || 'Erreur lors de l\'inscription'
      setError(message)
      return { success: false, error: message }
    } finally {
      setLoading(false)
    }
  }, [])

  const logout = useCallback(async () => {
    try {
      await authAPI.logout()
    } catch (err) {
      console.error('Logout error:', err)
    } finally {
      localStorage.removeItem('auth_token')
      localStorage.removeItem('user')
      setUser(null)
      setIsAuthenticated(false)
    }
  }, [])

  return {
    user,
    loading,
    error,
    isAuthenticated,
    login,
    register,
    logout,
    setError,
  }
}
