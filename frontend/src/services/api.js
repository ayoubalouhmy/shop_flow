import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

// Créer une instance axios avec la configuration de base
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
})

// Ajouter le token aux requêtes si disponible
apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('auth_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Gérer les erreurs de réponse
apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export const authAPI = {
  login: (email, password) => 
    apiClient.post('/auth/login', { email, password }),
  
  register: (name, email, password, password_confirmation) =>
    apiClient.post('/auth/register', { name, email, password, password_confirmation }),
  
  logout: () =>
    apiClient.post('/auth/logout'),
  
  profile: () =>
    apiClient.get('/auth/profile'),
}

export const productsAPI = {
  getAll: (page = 1) =>
    apiClient.get('/products', { params: { page } }),
  
  getById: (id) =>
    apiClient.get(`/products/${id}`),
}

export const categoriesAPI = {
  getAll: () =>
    apiClient.get('/categories'),
  
  getById: (id) =>
    apiClient.get(`/categories/${id}`),
}

export const cartAPI = {
  getCart: () =>
    apiClient.get('/cart'),
  
  addItem: (productId, quantity) =>
    apiClient.post('/cart/items', { product_id: productId, quantity }),
  
  removeItem: (itemId) =>
    apiClient.delete(`/cart/items/${itemId}`),
  
  updateItem: (itemId, quantity) =>
    apiClient.put(`/cart/items/${itemId}`, { quantity }),
}

export const ordersAPI = {
  getAll: () =>
    apiClient.get('/orders'),
  
  getById: (id) =>
    apiClient.get(`/orders/${id}`),
  
  create: (data) =>
    apiClient.post('/orders', data),
}

export default apiClient
