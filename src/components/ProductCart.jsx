import React, { useContext } from 'react'
import { useNavigate } from 'react-router'
import { ShoppingCart, Star } from 'lucide-react'
import { Cart } from '../Context/CartContext'

const ProductCart = ({ product }) => {
  const { image, title, category, price, rating } = product
  const { addToCart } = useContext(Cart)
  const navigate = useNavigate()

  const rate = rating?.rate ?? 0
  const count = rating?.count ?? 0

  return (
    <div
      onClick={() => navigate(`/main/shop/${product.id}`)}
      className="flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-neutral-800 bg-[#121212] transition hover:border-neutral-600"
    >
      {/* Image area */}
      <div className="relative flex h-40 items-center justify-center bg-white p-4 sm:h-48">
        <span className="absolute left-2 top-2 rounded-full bg-neutral-600/90 px-2.5 py-0.5 text-[10px] font-medium capitalize text-white">
          {category}
        </span>
        <img src={image} alt={title} className="h-full w-full object-contain" />
      </div>

      {/* Info area */}
      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <p className="text-[10px] font-medium capitalize text-neutral-500">
          {category}
        </p>
        <h3 className="mt-1 line-clamp-2 min-h-10 text-sm font-semibold leading-5 text-neutral-200">
          {title}
        </h3>

        {/* Rating */}
        <div className="mt-2 flex items-center gap-1">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((n) => (
              <Star
                key={n}
                className={`h-3 w-3 ${
                  n <= Math.round(rate)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-neutral-600'
                }`}
              />
            ))}
          </div>
          <span className="text-[10px] text-neutral-500">({count})</span>
        </div>

        {/* Price + add */}
        <div className="mt-auto flex items-center justify-between border-t border-neutral-700 pt-3">
          <p className="text-base font-bold text-[#c8f500]">
            ${price.toFixed(2)}
          </p>
          <button
            onClick={(e) => {
              e.stopPropagation() // don't open the detail page
              addToCart(product)
            }}
            className="flex items-center gap-1 rounded-full bg-[#c8f500] px-3 py-1.5 text-xs font-semibold text-[#0d0d0d] transition hover:brightness-110"
          >
            <ShoppingCart className="h-3 w-3" /> Add
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCart