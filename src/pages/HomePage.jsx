import React, { useContext, useEffect, useState } from "react";
import {
  Package,
  TrendingUp,
  Star,
  Tag,
  Zap,
  ShieldCheck,
  ArrowRight,
  ChevronRight,
  ShoppingBag,
  Laptop,
  Shirt,
  Armchair,
  House,
  Dumbbell,
  Watch,
  Sun,
} from "lucide-react";
import { useNavigate } from "react-router";
import { Auth } from "../Context/AuthContext";
import { Cart } from "../Context/CartContext";
import { axiosInstance } from "../config/axiosinstance";

const features = [
  {
    icon: Zap,
    title: "Fast Delivery",
    text: "Same-day on select items",
    color: "text-[#c8f500]",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payments",
    text: "100% encrypted checkout",
    color: "text-blue-400",
  },
  {
    icon: Tag,
    title: "Best Prices",
    text: "Price-match guarantee",
    color: "text-green-400",
  },
];

// Pick an icon from the category name (falls back to Package)
const getCategoryIcon = (name = "") => {
  const n = name.toLowerCase();
  if (n.includes("electronic")) return Laptop;
  if (
    n.includes("cloth") ||
    n.includes("shirt") ||
    n.includes("men") ||
    n.includes("women")
  )
    return Shirt;
  if (n.includes("furniture")) return Armchair;
  if (n.includes("home")) return House;
  if (n.includes("sport")) return Dumbbell;
  if (n.includes("accessor") || n.includes("jewel")) return Watch;
  return Package;
};

const StatCard = ({ icon: Icon, value, label, sub, iconBg, iconColor }) => (
  <div className="flex items-center gap-3 rounded-2xl border border-neutral-700 bg-[#121212] p-4 sm:p-5">
    <div
      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl sm:h-12 sm:w-12 ${iconBg}`}
    >
      <Icon className={`h-5 w-5 ${iconColor}`} />
    </div>
    <div className="min-w-0">
      <p className="truncate text-lg font-bold sm:text-xl">{value}</p>
      <p className="truncate text-xs font-medium text-neutral-300">{label}</p>
      <p className="truncate text-[11px] text-neutral-500">{sub}</p>
    </div>
  </div>
);

const ProductPanel = ({
  icon: Icon,
  title,
  products,
  onSeeAll,
  onItemClick,
  onAdd,
}) => (
  <div className="rounded-3xl bg-white p-4 text-neutral-900 sm:p-6">
    <div className="mb-4 flex items-center justify-between">
      <h3 className="flex items-center gap-2 text-sm font-bold sm:text-base">
        <Icon className="h-4 w-4 text-[#c8f500]" fill="currentColor" />
        {title}
      </h3>
      <button
        onClick={onSeeAll}
        className="flex items-center gap-1 text-xs font-semibold text-[#7a9a00] hover:underline"
      >
        See all <ChevronRight className="h-3 w-3" />
      </button>
    </div>

    <div className="space-y-3">
      {products.map((p) => (
        <div
          key={p.id}
          onClick={() => onItemClick(p.id)}
          className="flex cursor-pointer items-center gap-3 rounded-xl border border-neutral-200 p-3 transition hover:bg-neutral-50"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-neutral-100 p-0.5">
            <img
              src={p.image}
              alt={p.title}
              className="h-full w-full object-contain"
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">{p.title}</p>
            <p className="text-sm font-bold text-[#7a9a00]">
              ${p.price.toFixed(2)}
            </p>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation(); 
              onAdd(p);
            }}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#c8f500]/20 text-[#7a9a00] transition hover:bg-[#c8f500]/40"
            aria-label="Add to cart"
          >
            <ShoppingBag className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  </div>
);

const HomePage = () => {
  const navigate = useNavigate();
  const { loggedInUser } = useContext(Auth);
  

  const [products, setProducts] = useState([]);

  const firstName = loggedInUser?.fullName?.trim().split(" ")[0] || "there";
const { addToCart, cartItems } = useContext(Cart)
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axiosInstance.get("/products");
        setProducts(res.data);
      } catch (error) {
        console.log("Product error", error);
      }
    };
    getProducts();
  }, []);

  
  const categoryNames = [...new Set(products.map((p) => p.category))];
  const categories = categoryNames.map((name) => ({
    name,
    count: products.filter((p) => p.category === name).length,
    icon: getCategoryIcon(name),
  }));


  const topRated = [...products]
    .sort((a, b) => (b.rating?.rate ?? 0) - (a.rating?.rate ?? 0))
    .slice(0, 5);

  
  const newArrivals = [...products].sort((a, b) => b.id - a.id).slice(0, 5);

const cartCount = cartItems.length
const cartValue = cartItems.reduce(
  (sum, item) => sum + item.price * item.quantity,
  0
)

  return (
    <div>
      <div className="mx-auto w-full max-w-6xl space-y-6 px-4 py-6 text-white sm:space-y-8 sm:py-8">
        {/* Hero */}
        <section className="flex flex-col gap-6 rounded-3xl border border-neutral-700 bg-[#121212] p-6 sm:p-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#c8f500]">
              Good morning <Sun className="h-4 w-4" />
            </p>
            <h1 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">
              Welcome back,
              <br />
              <span className="text-[#c8f500]">{firstName}</span>
            </h1>
            <p className="mt-3 max-w-md text-sm text-neutral-500">
              Discover today's picks — hand-curated products across electronics,
              fashion, and more.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => navigate("/main/shop")}
                className="flex items-center gap-2 rounded-xl bg-[#c8f500] px-5 py-2.5 text-sm font-semibold text-[#0d0d0d] transition hover:brightness-110"
              >
                Shop Now <ArrowRight className="h-4 w-4" />
              </button>
              <button
                onClick={() => navigate("/main/shop")}
                className="rounded-xl border border-neutral-700 bg-[#1a1a1a] px-5 py-2.5 text-sm font-medium transition hover:border-neutral-500"
              >
                View All Products
              </button>
            </div>
          </div>

          {/* Hero badges */}
          <div className="grid grid-cols-2 gap-3 md:w-44 md:grid-cols-1">
            <div className="rounded-xl border border-[#c8f500]/40 bg-[#c8f500]/10 px-4 py-3 text-center">
              <p className="text-xl font-bold text-[#c8f500]">
                {products.length}+
              </p>
              <p className="text-[11px] text-neutral-400">Products Available</p>
            </div>
            <div className="rounded-xl border border-neutral-600 px-4 py-3 text-center">
              <p className="text-xl font-bold">Free</p>
              <p className="text-[11px] text-neutral-400">Delivery on $500+</p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          
          <StatCard
            icon={Package}
            value={cartCount}
            label="Cart Items"
            sub="In your bag"
            iconBg="bg-[#c8f500]/15"
            iconColor="text-[#c8f500]"
          />
          <StatCard
            icon={TrendingUp}
            value={`$${cartValue.toFixed(2)}`}
            label="Cart Value"
            sub="Ready to checkout"
            iconBg="bg-blue-500/15"
            iconColor="text-blue-400"
          />
          <StatCard
            icon={Star}
            value={topRated.length}
            label="Top Products"
            sub="Highly rated"
            iconBg="bg-yellow-500/15"
            iconColor="text-yellow-400"
          />
          <StatCard
            icon={Tag}
            value={categories.length}
            label="Categories"
            sub="To explore"
            iconBg="bg-purple-500/15"
            iconColor="text-purple-400"
          />
        </section>

        {/* Shop by category */}
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-base font-bold sm:text-lg">Shop by Category</h2>
            <button
              onClick={() => navigate("/main/shop")}
              className="flex items-center gap-1 text-xs font-semibold text-[#c8f500] hover:underline"
            >
              View All <ArrowRight className="h-3 w-3" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
            {categories.map(({ name, count, icon: Icon }) => (
              <button
                key={name}
                onClick={() =>
                  navigate("/main/shop", { state: { category: name } })
                }
                className="flex flex-col items-center gap-2 rounded-2xl bg-white px-3 py-5 text-neutral-900 transition hover:scale-[1.02] hover:shadow-lg"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#c8f500]/25">
                  <Icon className="h-5 w-5 text-[#5f7a00]" />
                </span>
                <span className="text-sm font-semibold capitalize">{name}</span>
                <span className="text-xs text-neutral-500">{count} items</span>
              </button>
            ))}
          </div>
        </section>

        {/* Top rated + New arrivals */}
        <section className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6">

          <ProductPanel
            icon={Star}
            title="Top Rated"
            products={topRated}
            onSeeAll={() => navigate("/main/shop")}
            onItemClick={(id) => navigate(`/main/shop/${id}`)}
            onAdd={addToCart}
          />
          <ProductPanel
            icon={Zap}
            title="New Arrivals"
            products={newArrivals}
            onSeeAll={() => navigate("/main/shop")}
            onItemClick={(id) => navigate(`/main/shop/${id}`)}
            onAdd={addToCart}
          />
        </section>

        {/* Feature strips */}
        <section className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
          {features.map(({ icon: Icon, title, text, color }) => (
            <div
              key={title}
              className="flex items-center gap-3 rounded-xl border border-neutral-700 bg-[#121212] px-4 py-3"
            >
              <Icon className={`h-5 w-5 shrink-0 ${color}`} />
              <div>
                <p className="text-sm font-semibold">{title}</p>
                <p className="text-xs text-neutral-500">{text}</p>
              </div>
            </div>
          ))}
        </section>
      </div>

      {/* Footer */}
      <footer className="mt-16 border-t border-neutral-700 px-4 py-8 text-center">
        <p className="text-lg font-semibold text-[#c8f500]">SkyMart</p>
        <p className="mt-2 text-xs text-neutral-500 sm:text-sm">
          © 2025 SkyMart • Built with React + Redux + TanStack Query
        </p>
      </footer>
    </div>
  );
};

export default HomePage;
