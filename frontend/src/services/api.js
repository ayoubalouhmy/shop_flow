import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
})

// Attach auth token to every request
apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Global 401 handler → redirect to login
apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// ── Products ──────────────────────────────────────────────────────────────────
export const productsAPI = {
  getAll: (params = {}) =>
    apiClient.get('/products', { params }),               // GET /api/products

  getById: (id) =>
    apiClient.get(`/products/${id}`),                     // GET /api/products/:id
}

// ── Categories ────────────────────────────────────────────────────────────────
export const categoriesAPI = {
  getAll: () =>
    apiClient.get('/categories'),                         // GET /api/categories

  getById: (id) =>
    apiClient.get(`/categories/${id}`),                   // GET /api/categories/:id
}

// ── Cart (auth required) ──────────────────────────────────────────────────────
export const cartAPI = {
  getCart: () =>
    apiClient.get('/cart'),                               // GET /api/cart

  addItem: (productId, quantity = 1) =>
    apiClient.post('/cart', { product_id: productId, quantity }), // POST /api/cart

  updateItem: (cartItemId, quantity) =>
    apiClient.put(`/cart/${cartItemId}`, { quantity }),   // PUT  /api/cart/:id

  removeItem: (cartItemId) =>
    apiClient.delete(`/cart/${cartItemId}`),              // DELETE /api/cart/:id

  clear: () =>
    apiClient.delete('/cart'),                            // DELETE /api/cart
}

// ── Orders (auth required) ────────────────────────────────────────────────────
export const ordersAPI = {
  getAll: (params = {}) =>
    apiClient.get('/orders', { params }),                 // GET /api/orders

  getById: (id) =>
    apiClient.get(`/orders/${id}`),                       // GET /api/orders/:id

  create: (data) =>
    apiClient.post('/orders', data),                      // POST /api/orders

  cancel: (id) =>
    apiClient.post(`/orders/${id}/cancel`),               // POST /api/orders/:id/cancel
}

// ── Auth ──────────────────────────────────────────────────────────────────────
export const authAPI = {
  login: (email, password) =>
    apiClient.post('/auth/login', { email, password }),

  register: (name, email, password, password_confirmation) =>
    apiClient.post('/auth/register', { name, email, password, password_confirmation }),

  logout: () =>
    apiClient.post('/auth/logout'),

  profile: () =>
    apiClient.get('/auth/profile'),

  updateProfile: (data) =>
    apiClient.put('/auth/profile', data),
}

export default apiClient
