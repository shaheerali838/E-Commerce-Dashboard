import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useCart } from "../../context/CartContext";
import {
  ShoppingBag,
  ShieldCheck,
  Truck,
  ArrowRight,
  ShoppingCart,
  CheckCircle,
  RotateCcw,
} from "lucide-react";

// ── Skeleton Card ─────────────────────────────────────────────────────────────
const SkeletonCard = () => (
  <div className="bg-white rounded-lg overflow-hidden border border-slate-200 animate-pulse">
    <div className="h-48 bg-slate-100" />
    <div className="p-4 space-y-3">
      <div className="h-4 bg-slate-200 rounded w-3/4" />
      <div className="h-3 bg-slate-200 rounded w-1/2" />
      <div className="flex justify-between items-center pt-2">
        <div className="h-5 bg-slate-200 rounded w-16" />
        <div className="h-8 bg-slate-200 rounded w-24" />
      </div>
    </div>
  </div>
);

// ── Featured Product Card ─────────────────────────────────────────────────────
const FeaturedCard = ({ product }) => {
  const { addToCart, cartItems } = useCart();
  const inCart = cartItems.some((i) => i.id === product.id);
  const stock = product.piece ?? product.stockQuantity ?? 0;
  const outOfStock = stock <= 0;

  return (
    <div className="bg-white border border-slate-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col">
      {/* Image */}
      <div className="relative h-48 bg-slate-100 flex items-center justify-center overflow-hidden">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-5xl select-none">{product.emoji || "📦"}</span>
        )}
        {product.category && (
          <span className="absolute top-2 left-2 bg-white text-slate-600 text-[10px] font-semibold px-2 py-0.5 rounded border border-slate-200 uppercase tracking-wide">
            {product.category}
          </span>
        )}
        {outOfStock && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
            <span className="bg-red-100 text-red-600 text-xs font-semibold px-3 py-1 rounded border border-red-200">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Details */}
      <div className="p-4 grow flex flex-col">
        <h3 className="font-semibold text-slate-900 truncate">{product.name}</h3>
        <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
          {product.description || ""}
        </p>

        <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
          <span className="text-base font-bold text-blue-600">
            ${Number(product.price).toFixed(2)}
          </span>
          <button
            onClick={() => !outOfStock && addToCart({ ...product, piece: stock })}
            disabled={outOfStock}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              outOfStock
                ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                : inCart
                ? "bg-green-600 text-white hover:bg-green-700"
                : "bg-slate-900 text-white hover:bg-blue-600"
            }`}
          >
            {inCart ? (
              <><CheckCircle size={14} /> Added</>
            ) : (
              <><ShoppingCart size={14} /> Add to Cart</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

// ── Static category list ──────────────────────────────────────────────────────
const CATEGORIES = [
  { label: "Electronics", emoji: "💻" },
  { label: "Fashion",     emoji: "👗" },
  { label: "Watches",     emoji: "⌚" },
  { label: "Accessories", emoji: "👜" },
  { label: "Sports",      emoji: "⚽" },
  { label: "Beauty",      emoji: "💄" },
];

// ── Feature strip ─────────────────────────────────────────────────────────────
const FEATURES = [
  { icon: Truck,       title: "Free Shipping",   desc: "On orders over $50" },
  { icon: ShieldCheck, title: "Secure Payment",  desc: "100% protected checkout" },
  { icon: RotateCcw,   title: "Easy Returns",    desc: "30-day return policy" },
  { icon: ShoppingBag, title: "Wide Selection",  desc: "Thousands of products" },
];

// ── Main Component ─────────────────────────────────────────────────────────────
const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simple getDocs — no orderBy to avoid requiring a Firestore composite index
    getDocs(collection(db, "products"))
      .then((snap) => {
        const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        // Sort client-side by createdAt descending, take first 8
        data.sort((a, b) => {
          const ta = a.createdAt?.seconds ?? 0;
          const tb = b.createdAt?.seconds ?? 0;
          return tb - ta;
        });
        setProducts(data.slice(0, 8));
      })
      .catch((err) => console.error("Error fetching products:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-white">

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-2xl">
            <span className="inline-block bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded mb-5 uppercase tracking-wider">
              New Collection
            </span>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Shop Smarter,{" "}
              <span className="text-blue-400">Live Better</span>
            </h1>
            <p className="mt-4 text-slate-300 text-lg leading-relaxed">
              Discover thousands of curated products — from cutting-edge electronics
              to everyday essentials — all at prices that make sense.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                to="/shop"
                className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-md transition-colors"
              >
                Shop Now <ArrowRight size={16} />
              </Link>
              <Link
                to="/shop"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-md border border-white/20 transition-colors"
              >
                Browse All
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURE STRIP ────────────────────────────────────────────────────── */}
      <section className="border-y border-slate-200 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-md bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                  <Icon size={18} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{title}</p>
                  <p className="text-xs text-slate-500">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATEGORY PILLS ───────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h2 className="text-xl font-bold text-slate-900 mb-4">Shop by Category</h2>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map(({ label, emoji }) => (
            <Link
              key={label}
              to={`/shop?category=${label}`}
              className="flex items-center gap-2 bg-white border border-slate-200 hover:border-slate-400 hover:bg-slate-50 text-slate-700 font-medium text-sm px-4 py-2 rounded-md transition-colors shadow-sm"
            >
              <span>{emoji}</span> {label}
            </Link>
          ))}
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Featured Products</h2>
            <p className="text-slate-500 text-sm mt-1">Hand-picked just for you</p>
          </div>
          <Link
            to="/shop"
            className="hidden sm:flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors"
          >
            View all <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {loading
            ? [...Array(8)].map((_, i) => <SkeletonCard key={i} />)
            : products.length > 0
            ? products.map((p) => <FeaturedCard key={p.id} product={p} />)
            : (
              <div className="col-span-full text-center py-20 bg-slate-50 rounded-lg border border-slate-200">
                <ShoppingBag size={40} className="mx-auto mb-3 text-slate-300" />
                <p className="text-slate-500 font-medium">No products yet</p>
                <p className="text-sm text-slate-400 mt-1">Add products from the Admin dashboard.</p>
              </div>
            )}
        </div>

        <div className="sm:hidden mt-8 text-center">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-slate-900 text-white font-semibold px-6 py-3 rounded-md hover:bg-blue-600 transition-colors"
          >
            View All Products <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────────────────────────── */}
      <section className="bg-slate-900 text-white py-14">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-3">Ready to start shopping?</h2>
          <p className="text-slate-400 mb-7 text-lg">
            Thousands of products. Free shipping. Zero hassle.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-md transition-colors"
          >
            <ShoppingBag size={18} /> Shop the Collection
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
