import { create } from 'zustand'
import type { Product } from '../types'

export type CartItem = Product & {
  quantity: number
}

type CartState = {
  items: CartItem[]
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  addItem: (product) => {
    set((state) => {
      const existing = state.items.find((item) => item.id === product.id)
      if (existing) {
        return {
          items: state.items.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
          ),
        }
      }

      return {
        items: [...state.items, { ...product, quantity: 1 }],
      }
    })
  },
  removeItem: (productId) => {
    set((state) => ({
      items: state.items.filter((item) => item.id !== productId),
    }))
  },
  updateQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      get().removeItem(productId)
      return
    }

    set((state) => ({
      items: state.items.map((item) =>
        item.id === productId ? { ...item, quantity } : item,
      ),
    }))
  },
  clearCart: () => set({ items: [] }),
}))
