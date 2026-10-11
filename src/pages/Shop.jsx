import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import { Search, ChevronDown } from 'lucide-react'
import ProductCart from '../components/ProductCart'
import { axiosInstance } from '../config/axiosinstance'

const Shop = () => {
  const location = useLocation()

  const [getProducts, setGetProducts] = useState([])
  const [search, setSearch] = useState('')
  // starts with the category sent by the home page, or 'all' if none was sent
  const [category, setCategory] = useState(location.state?.category || 'all')
  const [sortBy, setSortBy] = useState('featured')

  let getProduct = async () => {
    try {
      let res = await axiosInstance.get('/products')
      console.log(res)
      setGetProducts(res.data)
    } catch (error) {
      console.log('Product error', error)
    }
  }

  useEffect(() => {
    getProduct()
  }, [])

  // Category options built from the real data, so they always match the API
  const categories = [...new Set(getProducts.map((p) => p.category))]

  // 1. filter by search + category
  const filteredProducts = getProducts.filter((p) => {
    const matchesSearch = p.title
      .toLowerCase()
      .includes(search.trim().toLowerCase())
    const matchesCategory = category === 'all' || p.category === category
    return matchesSearch && matchesCategory
  })

  // 2. sort a copy (never mutate the original array)
  const visibleProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price
    if (sortBy === 'price-desc') return b.price - a.price
    if (sortBy === 'rating-desc') return (b.rating?.rate ?? 0) - (a.rating?.rate ?? 0)
    if (sortBy === 'rating-asc') return (a.rating?.rate ?? 0) - (b.rating?.rate ?? 0)
    return 0 // featured: keep the API order
  })

  return (
    <>
      {/* Page content */}
      <div className="mx-auto w-full max-w-6xl px-4 py-8 text-white sm:py-10">
        {/* Top part: heading */}
        <h1 className="text-3xl font-bold capitalize sm:text-4xl">
          {category === 'all' ? 'All Products' : category}
        </h1>
        <p className="mt-1 text-xs text-neutral-500">
          {visibleProducts.length} products found
        </p>

        {/* Top part: search + dropdowns */}
        <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-neutral-600 p-2 sm:flex-row">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full rounded-xl border border-neutral-800 bg-[#1a1a1a] py-2.5 pl-10 pr-3 text-sm text-white placeholder-neutral-500 outline-none focus:border-[#c8f500]"
            />
          </div>

          <div className="relative">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full appearance-none rounded-xl border border-neutral-800 bg-[#1a1a1a] py-2.5 pl-3 pr-9 text-sm capitalize text-white outline-none focus:border-[#c8f500] sm:w-44"
            >
              <option value="all">All Categories</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
          </div>

          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full appearance-none rounded-xl border border-neutral-800 bg-[#1a1a1a] py-2.5 pl-3 pr-9 text-sm text-white outline-none focus:border-[#c8f500] sm:w-40"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low-high</option>
              <option value="price-desc">Price: High-low</option>
              <option value="rating-desc">Top Rated</option>
              <option value="rating-asc">Lowest Rated</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
          </div>
        </div>

        {/* Product grid */}
        {visibleProducts.length === 0 ? (
          <p className="mt-16 text-center text-sm text-neutral-500">
            No products match your search.
          </p>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:gap-5 xl:grid-cols-4">
            {visibleProducts.map((val) => (
              <ProductCart key={val.id} product={val} />
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-16 border-t border-neutral-700 px-4 py-8 text-center">
        <p className="text-lg font-semibold text-[#c8f500]">SkyMart</p>
        <p className="mt-2 text-xs text-neutral-500 sm:text-sm">
          © 2025 SkyMart • Built with React + Redux + TanStack Query
        </p>
      </footer>
    </>
  )
}

export default Shop