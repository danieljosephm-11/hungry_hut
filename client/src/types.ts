export type Product = {
  id: string
  name: string
  category: string
  price: number
  description: string
  image: string
  veg: boolean
  available: boolean
}

export type CartItem = Product & {
  quantity: number
}

export type MoodOption = {
  id: string
  label: string
  description: string
  emoji: string
}
