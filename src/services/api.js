import axios from 'axios'

// ─── Base Axios Instance ─────────────────────────────
const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL || // Production live backend (Railway)
    (import.meta.env.DEV ? 'http://localhost:5000/api' : ''), // Dev fallback
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000, // 15s timeout
})

// ─── Request interceptor (e.g. add auth token later) ───
api.interceptors.request.use(
  (config) => {
    // const token = localStorage.getItem('token')
    // if (token) config.headers.Authorization = `Bearer ${token}`
    return config
  },
  (err) => Promise.reject(err)
)

// ─── Response interceptor (global error handling) ───
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const status = err.response?.status
    const message = err.response?.data?.message || err.message

    if (status === 401) {
      // Optional: redirect to login later
      // window.location.href = '/login'
    }
    if (status === 403) {
      // Optional: show "Forbidden" toast
    }
    if (status >= 500) {
      err.message = message || 'Server error. Please try again later.'
    }
    if (err.code === 'ECONNABORTED') {
      err.message = 'Request timed out. Please try again.'
    }
    if (err.code === 'ERR_NETWORK') {
      err.message = 'Network error. Check your connection.'
    }

    return Promise.reject(err)
  }
)

// ─── Jobs API ─────────────────────────────────────────
export const jobsApi = {
  getAll: (params, config = {}) => api.get('/jobs', { params, ...config }),
  getById: (id, config = {}) => api.get(`/jobs/${id}`, config),
  create: (data, config = {}) => api.post('/jobs', data, config),
  delete: (id, config = {}) => api.delete(`/jobs/${id}`, config),
}

// ─── Applications API ─────────────────────────────────
export const applicationsApi = {
  submit: (data, config = {}) => api.post('/applications', data, config),
  getByJobId: (id, config = {}) => api.get(`/jobs/${id}/applications`, config),
}

export default api