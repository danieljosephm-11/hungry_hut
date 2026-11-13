import { useQuery } from '@tanstack/react-query'
import {
  ArrowRight,
  Clock3,
  MapPin,
  Menu,
  Phone,
  ShoppingBag,
  ShoppingCart,
  Sparkles,
  Star,
  Truck,
  Users,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link, NavLink, Route, Routes, useNavigate } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
import { fetchAdminOverview, fetchProducts, submitOrder } from './lib/api'
import { useCartStore } from './store/cartStore'
import type { Product } from './types'

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Menu', href: '/menu' },
  { label: 'Cart', href: '/cart' },
  { label: 'Checkout', href: '/checkout' },
  { label: 'Admin', href: '/admin' },
]

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#fffaf3] text-slate-800">
        <Header />
        <main className="mx-auto max-w-7xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

function Header() {
  const cartItems = useCartStore((state) => state.items)
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header className="sticky top-0 z-50 border-b border-orange-100 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-500 text-lg font-bold text-white shadow-lg shadow-orange-200">
            HH
          </div>
          <div>
            <p className="text-xl font-black tracking-tight text-slate-900">Hungry Hut</p>
            <p className="text-[10px] uppercase tracking-[0.25em] text-orange-500">Fast food • Coimbatore</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                `text-sm font-semibold transition ${isActive ? 'text-orange-600' : 'text-slate-600 hover:text-slate-900'}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3 py-2 text-sm font-semibold text-orange-700 md:hidden">
            <Menu size={16} />
            Menu
          </button>
          <Link
            to="/cart"
            className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
          >
            <ShoppingCart size={16} />
            Cart {cartCount > 0 ? `(${cartCount})` : ''}
          </Link>
        </div>
      </div>
    </header>
  )
}

function HomePage() {
  const { data: products = [] } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  })

  const highlights = [
    { label: 'Today Orders', value: '42', icon: ShoppingBag },
    { label: 'Average Prep', value: '12 min', icon: Clock3 },
    { label: 'Happy Guests', value: '1.8k', icon: Users },
  ]

  const moodCards = [
    { id: 'crispy', label: 'Something Crispy', emoji: '🍟', desc: 'Crispy fries, nuggets and fried favorites' },
    { id: 'cheesy', label: 'Something Cheesy', emoji: '🧀', desc: 'Cheese-rich bites and crowd-pleasers' },
    { id: 'spicy', label: 'Something Spicy', emoji: '🌶️', desc: 'Bold laid-back comfort heat' },
    { id: 'cold', label: 'Something Cold', emoji: '🥤', desc: 'Shakes and chilled beverages' },
  ]

  const popularProducts = products.slice(0, 4)

  return (
    <div className="space-y-10">
      <section className="overflow-hidden rounded-[32px] bg-gradient-to-br from-[#fff5eb] via-white to-[#fff7ed] p-6 shadow-[0_30px_80px_rgba(249,115,22,0.08)] sm:p-10">
        <div className="grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-orange-600">
              <Sparkles size={12} />
              Freshly made, every time
            </span>
            <h1 className="mt-5 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
              Smart bites, <span className="text-orange-500">fast feels</span> for busy cravings.
            </h1>
            <p className="mt-4 max-w-xl text-base text-slate-600 sm:text-lg">
              Hungry Hut brings premium fast food, quick delivery and custom cravings together in one intelligent restaurant platform.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/menu"
                className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-orange-200 transition hover:bg-orange-600"
              >
                Explore Menu <ArrowRight size={16} />
              </Link>
              <Link
                to="/checkout"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:border-slate-300"
              >
                Order Now
              </Link>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {highlights.map(({ label, value, icon: Icon }) => (
                <div key={label} className="rounded-2xl border border-orange-100 bg-white p-4 shadow-sm">
                  <Icon className="mb-3 text-orange-500" size={18} />
                  <div className="text-2xl font-black text-slate-900">{value}</div>
                  <p className="text-sm text-slate-500">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 -z-10 rounded-[32px] bg-gradient-to-br from-orange-200 to-yellow-100 blur-3xl" />
            <img
              src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80"
              alt="Hungry Hut burger"
              className="h-[500px] w-full rounded-[32px] object-cover shadow-[0_30px_60px_rgba(15,23,42,0.18)]"
            />
            <div className="absolute -bottom-4 left-4 right-4 rounded-2xl border border-orange-100 bg-white/90 p-4 shadow-xl backdrop-blur">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Live crispy meter</p>
                  <div className="mt-1 flex items-center gap-2">
                    <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                    <span className="font-bold text-slate-900">Super crispy today</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-500">ETA</p>
                  <p className="text-lg font-black text-orange-600">12 min</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <SectionTitle heading="What are you craving today?" subheading="Smart mood-based food suggestions" />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {moodCards.map((card) => (
            <div key={card.id} className="rounded-3xl border border-orange-100 bg-white p-5 shadow-sm">
              <div className="mb-4 text-4xl">{card.emoji}</div>
              <h3 className="text-lg font-bold text-slate-900">{card.label}</h3>
              <p className="mt-2 text-sm text-slate-600">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <SectionTitle heading="Popular categories" subheading="Quick picks from our kitchen" />
        <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-6">
          {['Starters', 'Burgers and Sandwiches', 'Snacks', 'Milkshakes', 'Add-ons', 'Beverages'].map((category, index) => (
            <div key={category} className="rounded-3xl border border-orange-100 bg-white p-4 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-lg font-bold text-orange-600">
                {index + 1}
              </div>
              <p className="font-bold text-slate-900">{category}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <SectionTitle heading="Best sellers" subheading="Customer favorites this week" />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {popularProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[28px] bg-slate-900 p-7 text-white shadow-xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-300">Hurry hour</p>
          <h3 className="mt-3 text-3xl font-black">Chicken Popcorn + Milkshake Special</h3>
          <p className="mt-3 max-w-md text-slate-300">From 3 PM – 5 PM daily. Save 15% with this limited-time combo before kitchen rush sets in.</p>
          <div className="mt-6 flex items-center gap-4 text-sm text-slate-200">
            <div className="flex items-center gap-2"><Clock3 size={14} /> 3:00 PM – 5:00 PM</div>
            <div className="flex items-center gap-2"><Star size={14} /> 15% off</div>
          </div>
        </div>

        <div className="rounded-[28px] border border-orange-100 bg-white p-7 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-500">Location</p>
          <h3 className="mt-3 text-3xl font-black text-slate-900">Find us in Coimbatore</h3>
          <div className="mt-4 space-y-4 text-slate-600">
            <div className="flex gap-3"><MapPin className="mt-0.5 text-orange-500" size={18} /> <span>Hudco Colony, Tatabad, Coimbatore, Tamil Nadu, India</span></div>
            <div className="flex gap-3"><Phone className="mt-0.5 text-orange-500" size={18} /> <span>078456 71755</span></div>
            <div className="flex gap-3"><Truck className="mt-0.5 text-orange-500" size={18} /> <span>Delivery, takeaway, dine-in and outdoor seating</span></div>
          </div>
        </div>
      </section>
    </div>
  )
}

function MenuPage() {
  const [query, setQuery] = useState('')
  const { data: products = [] } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  })

  const filteredProducts = useMemo(() => {
    const normalized = query.toLowerCase()
    return products.filter((product) => {
      return (
        product.name.toLowerCase().includes(normalized) ||
        product.category.toLowerCase().includes(normalized)
      )
    })
  }, [products, query])

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-[28px] border border-orange-100 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-500">Our menu</p>
          <h2 className="mt-1 text-3xl font-black text-slate-900">Build a meal worth craving</h2>
        </div>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search menu items"
          className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none ring-0 transition focus:border-orange-300"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

function CartPage() {
  const items = useCartStore((state) => state.items)
  const removeItem = useCartStore((state) => state.removeItem)
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const delivery = subtotal > 0 ? 35 : 0
  const total = subtotal + delivery

  if (items.length === 0) {
    return (
      <div className="rounded-[30px] border border-dashed border-orange-200 bg-white p-10 text-center shadow-sm">
        <p className="text-2xl font-black text-slate-900">Your cart is empty</p>
        <Link to="/menu" className="mt-4 inline-block rounded-full bg-orange-500 px-5 py-3 text-sm font-bold text-white">
          Explore menu
        </Link>
      </div>
    )
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-4 rounded-[24px] border border-orange-100 bg-white p-4 shadow-sm">
            <img src={item.image} alt={item.name} className="h-20 w-20 rounded-2xl object-cover" />
            <div className="flex-1">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{item.name}</h3>
                  <p className="text-sm text-slate-500">₹{item.price}</p>
                </div>
                <button onClick={() => removeItem(item.id)} className="text-sm text-red-500">Remove</button>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <div className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 p-1">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="h-8 w-8 text-lg">−</button>
                  <span className="min-w-8 text-center text-sm font-bold">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="h-8 w-8 text-lg">+</button>
                </div>
                <p className="font-black text-slate-900">₹{item.price * item.quantity}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <aside className="rounded-[28px] border border-orange-100 bg-white p-6 shadow-sm">
        <h3 className="text-2xl font-black text-slate-900">Order Summary</h3>
        <div className="mt-5 space-y-3 text-sm text-slate-600">
          <div className="flex justify-between"><span>Subtotal</span><span>₹{subtotal}</span></div>
          <div className="flex justify-between"><span>Delivery</span><span>₹{delivery}</span></div>
          <div className="flex justify-between"><span>Tax</span><span>₹{Math.round(subtotal * 0.05)}</span></div>
        </div>
        <div className="mt-5 flex items-center justify-between border-t border-slate-200 pt-4 text-lg font-black text-slate-900">
          <span>Total</span>
          <span>₹{total}</span>
        </div>
        <Link to="/checkout" className="mt-6 inline-flex w-full justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-bold text-white">
          Proceed to Checkout
        </Link>
      </aside>
    </div>
  )
}

function CheckoutPage() {
  const navigate = useNavigate()
  const items = useCartStore((state) => state.items)
  const clearCart = useCartStore((state) => state.clearCart)
  const [form, setForm] = useState({
    customerName: '',
    mobile: '',
    orderType: 'delivery',
    paymentType: 'UPI',
    address: '',
    notes: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const delivery = form.orderType === 'delivery' ? 35 : 0
  const total = subtotal + delivery + Math.round(subtotal * 0.05)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    setMessage('')

    try {
      const payload = {
        customerName: form.customerName,
        mobile: form.mobile,
        orderType: form.orderType,
        paymentType: form.paymentType,
        address: form.address,
        notes: form.notes,
        items: items.map((item) => ({ id: item.id, name: item.name, price: item.price, quantity: item.quantity })),
      }

      const result = await submitOrder(payload)
      setMessage(`Order ${result.order.id} placed successfully!`)
      clearCart()
      navigate('/')
    } catch (error) {
      console.error(error)
      setMessage('Unable to create order right now. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr]">
      <form onSubmit={handleSubmit} className="rounded-[30px] border border-orange-100 bg-white p-6 shadow-sm">
        <h2 className="text-3xl font-black text-slate-900">Checkout</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <label className="space-y-2 text-sm font-medium text-slate-700">
            <span>Customer name</span>
            <input value={form.customerName} onChange={(event) => setForm({ ...form, customerName: event.target.value })} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-orange-300" required />
          </label>
          <label className="space-y-2 text-sm font-medium text-slate-700">
            <span>Mobile number</span>
            <input value={form.mobile} onChange={(event) => setForm({ ...form, mobile: event.target.value })} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-orange-300" required />
          </label>
          <label className="space-y-2 text-sm font-medium text-slate-700">
            <span>Order type</span>
            <select value={form.orderType} onChange={(event) => setForm({ ...form, orderType: event.target.value })} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-orange-300">
              <option value="delivery">Delivery</option>
              <option value="takeaway">Takeaway</option>
              <option value="dine-in">Dine-in</option>
            </select>
          </label>
          <label className="space-y-2 text-sm font-medium text-slate-700">
            <span>Payment method</span>
            <select value={form.paymentType} onChange={(event) => setForm({ ...form, paymentType: event.target.value })} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-orange-300">
              <option value="UPI">UPI</option>
              <option value="Card">Card</option>
              <option value="Cash">Cash</option>
            </select>
          </label>
        </div>

        <label className="mt-4 block space-y-2 text-sm font-medium text-slate-700">
          <span>Delivery address</span>
          <textarea value={form.address} onChange={(event) => setForm({ ...form, address: event.target.value })} className="min-h-28 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-orange-300" />
        </label>

        <label className="mt-4 block space-y-2 text-sm font-medium text-slate-700">
          <span>Special instructions</span>
          <textarea value={form.notes} onChange={(event) => setForm({ ...form, notes: event.target.value })} className="min-h-20 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-orange-300" />
        </label>

        {message && <p className="mt-4 rounded-2xl bg-orange-50 px-4 py-3 text-sm font-medium text-orange-700">{message}</p>}

        <button type="submit" disabled={isSubmitting || items.length === 0} className="mt-6 inline-flex w-full justify-center rounded-full bg-orange-500 px-5 py-3 text-sm font-bold text-white disabled:cursor-not-allowed disabled:bg-slate-300">
          {isSubmitting ? 'Placing order...' : 'Place Order'}
        </button>
      </form>

      <aside className="rounded-[30px] border border-orange-100 bg-white p-6 shadow-sm">
        <h3 className="text-2xl font-black text-slate-900">Your items</h3>
        <div className="mt-5 space-y-3">
          {items.map((item) => (
            <div key={item.id} className="flex items-center justify-between gap-3 rounded-2xl bg-slate-50 p-3">
              <div>
                <p className="font-bold text-slate-900">{item.name}</p>
                <p className="text-sm text-slate-500">Qty {item.quantity}</p>
              </div>
              <p className="font-bold text-slate-900">₹{item.price * item.quantity}</p>
            </div>
          ))}
        </div>
        <div className="mt-5 space-y-3 border-t border-slate-200 pt-4 text-sm text-slate-600">
          <div className="flex justify-between"><span>Subtotal</span><span>₹{subtotal}</span></div>
          <div className="flex justify-between"><span>Delivery</span><span>₹{delivery}</span></div>
          <div className="flex justify-between"><span>Tax</span><span>₹{Math.round(subtotal * 0.05)}</span></div>
          <div className="flex justify-between text-lg font-black text-slate-900"><span>Total</span><span>₹{total}</span></div>
        </div>
      </aside>
    </div>
  )
}

function AdminPage() {
  const { data: admin } = useQuery({
    queryKey: ['admin-overview'],
    queryFn: fetchAdminOverview,
  })

  const stats = [
    { label: 'Today Orders', value: admin?.todayOrders ?? 0 },
    { label: 'Today Sales', value: `₹${admin?.todaySales ?? 0}` },
    { label: 'Pending Orders', value: admin?.pendingOrders ?? 0 },
    { label: 'Monthly Revenue', value: `₹${admin?.monthlyRevenue ?? 0}` },
  ]

  return (
    <div className="space-y-6">
      <div className="rounded-[28px] bg-slate-900 p-7 text-white shadow-xl">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-300">Admin Dashboard</p>
        <h2 className="mt-3 text-3xl font-black">Hungry Hut operations</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-[24px] border border-orange-100 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">{stat.label}</p>
            <p className="mt-3 text-3xl font-black text-slate-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-[26px] border border-orange-100 bg-white p-6 shadow-sm">
          <h3 className="text-xl font-black text-slate-900">Popular products</h3>
          <ul className="mt-4 space-y-3">
            {(admin?.popularProducts ?? []).map((item: string) => (
              <li key={item} className="rounded-2xl bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">{item}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-[26px] border border-orange-100 bg-white p-6 shadow-sm">
          <h3 className="text-xl font-black text-slate-900">Restaurant settings</h3>
          <div className="mt-4 space-y-3 text-sm text-slate-600">
            <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-3"><span>Business hours</span><span>Tue–Sun: 10 AM–11 PM</span></div>
            <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-3"><span>Contact</span><span>078456 71755</span></div>
            <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-3"><span>Delivery</span><span>₹35</span></div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem)

  return (
    <article className="overflow-hidden rounded-[28px] border border-orange-100 bg-white shadow-sm">
      <img src={product.image} alt={product.name} className="h-52 w-full object-cover" />
      <div className="p-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <p className="rounded-full bg-orange-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-orange-600">
            {product.category}
          </p>
          {product.veg ? <span className="text-green-600">Veg</span> : <span className="text-red-600">Non-veg</span>}
        </div>
        <h3 className="text-xl font-black text-slate-900">{product.name}</h3>
        <p className="mt-2 text-sm text-slate-600">{product.description}</p>
        <div className="mt-5 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Price</p>
            <p className="text-xl font-black text-slate-900">₹{product.price}</p>
          </div>
          <button onClick={() => addItem(product)} className="rounded-full bg-slate-900 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-slate-800">
            Add to cart
          </button>
        </div>
      </div>
    </article>
  )
}

function SectionTitle({ heading, subheading }: { heading: string; subheading: string }) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-500">Hungry Hut</p>
        <h2 className="mt-3 text-3xl font-black text-slate-900">{heading}</h2>
      </div>
      <p className="hidden text-sm text-slate-500 md:block">{subheading}</p>
    </div>
  )
}

function Footer() {
  return (
    <footer className="border-t border-orange-100 bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 text-sm text-slate-600 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div>
          <p className="text-xl font-black text-slate-900">Hungry Hut</p>
          <p className="mt-3 max-w-sm">Premium fast food experiences with modern ordering, digital menu experiences and customer delight.</p>
        </div>
        <div>
          <p className="font-bold text-slate-900">Visit</p>
          <p className="mt-3">Hudco Colony, Tatabad, Coimbatore</p>
          <p>078456 71755</p>
        </div>
        <div>
          <p className="font-bold text-slate-900">Hours</p>
          <p className="mt-3">Tue–Sun: 10 AM–11 PM</p>
          <p>Monday: 11 AM–11 PM</p>
        </div>
      </div>
    </footer>
  )
}

export default App
