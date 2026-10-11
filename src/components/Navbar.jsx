import React, { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router'
import { Zap, ShoppingCart, LogOut } from 'lucide-react'
import { Auth } from '../Context/AuthContext'
import { Cart } from '../Context/CartContext'
import CartDrawer from '../pages/CartDrawer'


const linkClass = ({ isActive }) =>
  `text-sm font-medium transition-colors ${
    isActive ? 'text-[#c8f500]' : 'text-neutral-400 hover:text-white'
  }`

const Navbar = () => {
  const navigate = useNavigate()
  const { setLoggedInUser, loggedInUser } = useContext(Auth)
  const { cartItems, openCart } = useContext(Cart)

  const handleLogout = () => {
    localStorage.removeItem('loginUser')
    setLoggedInUser(null)
    navigate('/')
  }

  const firstName = loggedInUser?.fullName?.trim().split(' ')[0] || 'Guest'
  const initial = firstName.charAt(0).toUpperCase()

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-neutral-800 bg-[#0d0d0d]/90 backdrop-blur">
        <nav className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-y-2 px-4 py-3 md:h-16 md:flex-nowrap md:py-0">
          {/* Logo */}
          <NavLink to="/main" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#c8f500]">
              <Zap className="h-4 w-4 text-[#0d0d0d]" fill="currentColor" />
            </span>
            <span className="text-lg font-bold text-white">
              Sky<span className="text-[#c8f500]">Mart</span>
            </span>
          </NavLink>

          {/* Links (second row on mobile, centered on desktop) */}
          <div className="order-3 flex w-full items-center justify-center gap-8 md:order-0 md:w-auto">
            <NavLink to="/main" end className={linkClass}>
              Home
            </NavLink>
            <NavLink to="/main/shop" className={linkClass}>
              Shop
            </NavLink>
            <NavLink to="/main/about" className={linkClass}>
              About
            </NavLink>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* User chip */}
            <div className="flex items-center gap-2 rounded-lg border border-neutral-700 bg-[#1a1a1a] px-2 py-1.5">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#c8f500] text-xs font-bold text-[#0d0d0d]">
                {initial}
              </span>
              <span className="hidden text-sm font-medium text-white sm:block">
                {firstName}
              </span>
            </div>

            {/* Cart */}
            <button
              onClick={openCart}
              className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-700 bg-[#1a1a1a] text-neutral-300 transition hover:border-neutral-500 hover:text-white"
              aria-label="Open cart"
            >
              <ShoppingCart className="h-4 w-4" />
              {cartItems.length > 0 && (
                <span className="absolute -right-1.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#c8f500] px-1 text-[10px] font-bold text-[#0d0d0d]">
                  {cartItems.length}
                </span>
              )}
            </button>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-700 bg-[#1a1a1a] text-neutral-300 transition hover:border-red-500/60 hover:text-red-400"
              aria-label="Logout"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </nav>
      </header>

      {/* Cart drawer (reads its open state from CartContext) */}
      <CartDrawer />
    
    </>
  )
}

export default Navbar