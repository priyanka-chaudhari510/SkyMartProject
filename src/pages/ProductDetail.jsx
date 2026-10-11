import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import {
  ArrowLeft,
  ChevronRight,
  Heart,
  RotateCcw,
  ShieldCheck,
  ShoppingCart,
  Star,
  Truck,
} from 'lucide-react'
import { axiosInstance } from '../config/axiosinstance'
import { Cart } from '../Context/CartContext'
import ProductCart from '../components/ProductCart'

const perks = [
  { icon: Truck, title: 'Free Delivery', text: 'On orders $50+' },
  { icon: ShieldCheck, title: 'Secure Pay', text: '256-bit SSL' },
  { icon: RotateCcw, title: 'Easy Returns', text: '30-day policy' },
]

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useContext(Cart)

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [liked, setLiked] = useState(false)

  
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axiosInstance.get('/products')
        setProducts(res.data)
      } catch (error) {
        console.log('Product error', error)
      } finally {
        setLoading(false)
      }
    }
    getProducts()
  }, [])

  
  useEffect(() => {
    window.scrollTo(0, 0)
    setLiked(false)
  }, [id])

  const index = products.findIndex((p) => p.id === Number(id))
  const product = products[index]

  const footer = (
    <footer className="mt-16 border-t border-neutral-700 px-4 py-8 text-center">
      <p className="text-lg font-semibold text-[#c8f500]">SkyMart</p>
      <p className="mt-2 text-xs text-neutral-500 sm:text-sm">
        © 2025 SkyMart • Built with React + Redux + TanStack Query
      </p>
    </footer>
  )

  if (loading) {
    return (
      <div>
        <p className="py-32 text-center text-sm text-neutral-500">Loading...</p>
        {footer}
      </div>
    )
  }

  if (!product) {
    return (
      <div>
        <div className="py-32 text-center text-white">
          <p className="text-lg font-semibold">Product not found</p>
          <button
            onClick={() => navigate('/main/shop')}
            className="mt-5 rounded-xl bg-[#c8f500] px-6 py-2.5 text-sm font-semibold text-[#0d0d0d] transition hover:brightness-110"
          >
            Back to Shop
          </button>
        </div>
        {footer}
      </div>
    )
  }

  const { title, category, price, description, image, rating } = product
  const rate = rating?.rate ?? 0
  const count = rating?.count ?? 0

  
  const related = products
    .filter((p) => p.category === category && p.id !== product.id)
    .slice(0, 5)

  
  const nextProduct = products[(index + 1) % products.length]

  return (
    <div>
      <div className="mx-auto w-full max-w-6xl px-4 py-6 text-white sm:py-8">
        {/* Breadcrumb */}
        <nav className="flex flex-wrap items-center gap-2 text-xs text-neutral-500">
          <button
            onClick={() => navigate('/main/shop')}
            className="flex items-center gap-1.5 transition hover:text-white"
          >
            <ArrowLeft className="h-3 w-3" /> Products
          </button>
          <span>/</span>
          <span className="capitalize">{category}</span>
          <span>/</span>
          <span className="max-w-40 truncate font-medium text-neutral-300 sm:max-w-xs">
            {title}
          </span>
        </nav>

        {/* Main section */}
        <section className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
          {/* Image */}
          <div className="flex aspect-square items-center justify-center rounded-3xl bg-white p-8">
            <img
              src={image}
              alt={title}
              className="h-full w-full object-contain"
            />
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <span className="w-fit rounded-full border border-[#c8f500]/40 bg-[#c8f500]/10 px-3 py-1 text-[11px] font-medium capitalize text-[#c8f500]">
              {category}
            </span>

            <h1 className="mt-4 text-2xl font-bold leading-tight sm:text-3xl">
              {title}
            </h1>

            {/* Rating */}
            <div className="mt-3 flex items-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((n) => (
                  <Star
                    key={n}
                    className={`h-4 w-4 ${
                      n <= Math.round(rate)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-neutral-600'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-semibold">{rate}</span>
              <span className="text-xs text-neutral-500">
                ({count} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="my-5 border-y border-neutral-700 py-4">
              <p className="text-3xl font-bold text-[#c8f500]">
                ${price.toFixed(2)}
              </p>
            </div>

            <p className="text-sm leading-relaxed text-neutral-400">
              {description}
            </p>

            {/* Add to cart + heart */}
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => addToCart(product)}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#c8f500] py-3.5 text-sm font-semibold text-[#0d0d0d] transition hover:brightness-110"
              >
                <ShoppingCart className="h-4 w-4" /> Add to Cart
              </button>
              <button
                onClick={() => setLiked((l) => !l)}
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-neutral-700 bg-[#1a1a1a] transition hover:border-neutral-500"
                aria-label="Add to wishlist"
              >
                <Heart
                  className={`h-4 w-4 ${
                    liked ? 'fill-red-500 text-red-500' : 'text-neutral-300'
                  }`}
                />
              </button>
            </div>

            {/* Perks */}
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {perks.map(({ icon: Icon, title: perkTitle, text }) => (
                <div
                  key={perkTitle}
                  className="flex flex-col items-center rounded-xl border border-neutral-600 px-3 py-4 text-center"
                >
                  <Icon className="h-4 w-4 text-[#c8f500]" />
                  <p className="mt-2 text-xs font-semibold">{perkTitle}</p>
                  <p className="mt-0.5 text-[10px] text-neutral-500">{text}</p>
                </div>
              ))}
            </div>

            {/* Next */}
            <button
              onClick={() => navigate(`/main/shop/${nextProduct.id}`)}
              className="mt-8 flex w-full items-center justify-center gap-1.5 rounded-xl bg-[#c8f500] py-3 text-sm font-semibold text-[#0d0d0d] transition hover:brightness-110"
            >
              Next <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </section>

        {/* Related products */}
        {related.length > 0 && (
          <section className="mt-14">
            <h2 className="mb-5 text-xl font-bold">Related Products</h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
              {related.map((p) => (
                <ProductCart key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>

      {footer}
    </div>
  )
}

export default ProductDetail