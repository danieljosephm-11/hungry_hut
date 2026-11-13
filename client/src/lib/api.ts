import axios from 'axios'
import type { Product } from '../types'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:4000/api',
})

export const fetchProducts = async () => {
  const { data } = await api.get<Product[]>('/products')
  return data
}

export const fetchAdminOverview = async () => {
  const { data } = await api.get('/admin/overview')
  return data
}

export const submitOrder = async (payload: Record<string, unknown>) => {
  const { data } = await api.post('/orders', payload)
  return data
}
