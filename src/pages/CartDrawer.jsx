import React, { useContext } from 'react'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import {
  ShoppingBag,
  X,
  Package,
  Minus,
  Plus,
  Trash2,
  ArrowRight,
} from 'lucide-react'
import { Cart } from '../Context/CartContext'

const CartDrawer = () => {
  const navigate = useNavigate()
  const {
    cartItems: items,
    isCartOpen,
    closeCart,
    increaseQty,
    decreaseQty,
    removeFromCart,
    clearCart,
  } = useContext(Cart)

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div
      className={`fixed inset-0 z-60 transition-opacity duration-300 ${
        isCartOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      {/* Blurred overlay: click to close */}
      <div
        onClick={closeCart}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      {/* Panel */}
      <aside
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-neutral-800 bg-[#121212] text-white shadow-2xl transition-transform duration-300 ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-700 px-5 py-5">
          <div className="flex items-center gap-3">
            <ShoppingBag className="h-5 w-5 text-[#c8f500]" />
            <h2 className="text-lg font-bold">Cart</h2>
            {items.length > 0 && (
              <span className="rounded-full bg-[#c8f500]/15 px-2.5 py-0.5 text-xs font-semibold text-[#c8f500]">
                {items.length} {items.length === 1 ? 'item' : 'items'}
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            className="text-neutral-400 transition hover:text-white"
            aria-label="Close cart"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {items.length === 0 ? (
          /* Empty state */
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-3xl border border-neutral-800 bg-[#1a1a1a]">
              <Package className="h-10 w-10 text-neutral-500" />
            </div>
            <h3 className="mt-6 text-lg font-semibold text-neutral-200">
              Cart is empty
            </h3>
            <p className="mt-1 text-sm text-neutral-500">
              Go shop something cool!
            </p>
            <button
              onClick={() => {
                closeCart()
                navigate('/main/shop')
              }}
              className="mt-6 rounded-full bg-[#c8f500] px-6 py-3 text-sm font-semibold text-[#0d0d0d] transition hover:brightness-110"
            >
              Browse Products
            </button>
          </div>
        ) : (
          <>
            {/* Items */}
            <div className="flex-1 space-y-3 overflow-y-auto px-5 py-5">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 rounded-2xl border border-neutral-600 p-4"
                >
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-white p-1.5">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-contain"
                    />
                  </div>

                  <div className="flex min-w-0 flex-1 flex-col">
                    <h3 className="line-clamp-2 text-sm font-medium text-neutral-100">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-base font-bold text-[#c8f500]">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <p className="text-xs text-neutral-500">
                      ${item.price.toFixed(2)} each
                    </p>

                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => decreaseQty(item.id)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-neutral-700 text-neutral-300 hover:border-neutral-500"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-4 text-center text-sm font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => increaseQty(item.id)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-neutral-700 text-neutral-300 hover:border-neutral-500"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500/80 transition hover:text-red-400"
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="border-t border-neutral-700 px-5 py-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-400">Total</span>
                <span className="text-2xl font-bold">${total.toFixed(2)}</span>
              </div>
              <button
              onClick={()=>{
                 clearCart()
                 closeCart()
                toast.success("order placed")
              }}
               className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#c8f500] py-4 font-semibold text-[#0d0d0d] transition hover:brightness-110">
                Checkout <ArrowRight className="h-4 w-4" />
                
              </button>
              <button
                onClick={clearCart}
                className="mt-4 w-full text-center text-sm text-neutral-500 transition hover:text-neutral-300"
              >
                Clear cart
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  )
}

export default CartDrawer