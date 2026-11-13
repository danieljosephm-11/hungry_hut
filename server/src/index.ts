import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import morgan from 'morgan'

import {
  adminOverview,
  categories,
  moodOptions,
  products,
  promotions,
  restaurantSettings,
} from './data/menu.js'

dotenv.config()

const app = express()
const port = Number(process.env.PORT ?? 4000)

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'hungry-hut-api' })
})

app.get('/api/categories', (_req, res) => {
  res.json(categories)
})

app.get('/api/moods', (_req, res) => {
  res.json(moodOptions)
})

app.get('/api/products', (_req, res) => {
  res.json(products)
})

app.get('/api/products/:id', (req, res) => {
  const { id } = req.params
  const product = products.find((item) => item.id === id)

  if (!product) {
    res.status(404).json({ message: 'Product not found' })
    return
  }

  res.json(product)
})

app.get('/api/promotions', (_req, res) => {
  res.json(promotions)
})

app.get('/api/settings', (_req, res) => {
  res.json(restaurantSettings)
})

app.get('/api/admin/overview', (_req, res) => {
  res.json(adminOverview)
})

app.post('/api/orders', (req, res) => {
  const { customerName, mobile, orderType = 'delivery', items = [], paymentType = 'UPI' } = req.body ?? {}

  if (!customerName || !mobile || !Array.isArray(items) || items.length === 0) {
    res.status(400).json({ message: 'Customer details and ordered items are required.' })
    return
  }

  const subtotal = items.reduce((sum: number, item: any) => {
    const itemPrice = Number(item.price ?? 0)
    const qty = Number(item.quantity ?? 1)
    return sum + itemPrice * qty
  }, 0)

  const deliveryFee = orderType === 'delivery' ? restaurantSettings.deliveryFee : 0
  const tax = subtotal * restaurantSettings.taxRate
  const total = subtotal + deliveryFee + tax

  const order = {
    id: `HH-${Date.now()}`,
    customerName,
    mobile,
    orderType,
    paymentType,
    items,
    subtotal,
    deliveryFee,
    tax,
    total,
    status: 'PENDING',
    createdAt: new Date().toISOString(),
  }

  res.status(201).json({ message: 'Order created successfully', order })
})

app.post('/api/payments/create', (req, res) => {
  const { amount = 0 } = req.body ?? {}

  res.json({
    success: true,
    provider: 'Razorpay Sandbox',
    orderId: `rzp_${Date.now()}`,
    amount,
  })
})

app.post('/api/payments/verify', (_req, res) => {
  res.json({ verified: true, status: 'captured' })
})

app.listen(port, () => {
  console.log(`Hungry Hut API running on http://localhost:${port}`)
})
