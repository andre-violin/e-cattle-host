import axios from 'axios'
// const baseURL = 'http://localhost:3000'
const baseURL = import.meta.env.VITE_BASE_URL
const api = axios.create({
  baseURL
})

// api.interceptors.request.use(
//   config => {
//     config.headers.Authorization = `Bearer ${token}`

//     return config
//   },
//   error => {
//     return Promise.reject(error)
//   }
// )

export default api
