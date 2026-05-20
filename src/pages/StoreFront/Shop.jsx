import React, { useEffect, useState, useMemo } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import PublicProductCard from "../../components/PublicProductCard";
import { Search, SlidersHorizontal, X, ShoppingBag } from "lucide-react";
import { useSearchParams } from "react-router-dom";

// ── Skeleton ──────────────────────────────────────────────────────────────────
const SkeletonCard = () => (
  <div className="bg-white rounded-2xl overflow-hidden border border-slate-100 animate-pulse">
    <div className="h-52 bg-slate-200" />
    <div className="p-4 space-y-3">
      <div className="h-4 bg-slate-200 rounded-full w-3/4" />
      <div className="h-3 bg-slate-200 rounded-full w-1/2" />
      <div className="flex justify-between items-center pt-2">
        <div className="h-5 bg-slate-200 rounded-full w-16" />
        <div className="h-9 bg-slate-200 rounded-xl w-24" />
      </div>
    </div>
  </div>
);

// ── Main Component ────────────────────────────────────────────────────────────
const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [stockFilter, setStockFilter] = useState("All"); // All | In Stock | Out of Stock
  const [searchParams] = useSearchParams();

  // Pick up ?category= and ?search= from URL
  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) setActiveCategory(cat);

    const q = searchParams.get("search");
    if (q) setSearch(q);
  }, [searchParams]);

  useEffect(() => {
    getDocs(collection(db, "products"))
      .then((snap) => {
        const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        // Sort client-side — avoids requiring a Firestore composite index
        data.sort((a, b) => (b.createdAt?.seconds ?? 0) - (a.createdAt?.seconds ?? 0));
        setProducts(data);
      })
      .catch((err) => console.error("Error fetching products:", err))
      .finally(() => setLoading(false));
  }, []);

  // Derive unique categories
  const categories = useMemo(() => {
    const cats = [...new Set(products.map((p) => p.category).filter(Boolean))].sort();
    return ["All", ...cats];
  }, [products]);

  // Filtered products
  const filtered = useMemo(() => {
    let data = [...products];

    if (search.trim()) {
      const q = search.toLowerCase();
      data = data.filter(
        (p) =>
          p.name?.toLowerCase().includes(q) ||
          p.category?.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q)
      );
    }

    if (activeCategory !== "All") {
      data = data.filter((p) => p.category === activeCategory);
    }

    if (stockFilter === "In Stock") {
      data = data.filter((p) => (p.piece ?? p.stockQuantity ?? 0) > 0);
    } else if (stockFilter === "Out of Stock") {
      data = data.filter((p) => (p.piece ?? p.stockQuantity ?? 0) <= 0);
    }

    return data;
  }, [products, search, activeCategory, stockFilter]);

  const hasFilters = search || activeCategory !== "All" || stockFilter !== "All";

  const resetFilters = () => {
    setSearch("");
    setActiveCategory("All");
    setStockFilter("All");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">All Products</h1>
        <p className="text-slate-500 mt-1">
          {loading ? "Loading..." : `${filtered.length} product${filtered.length !== 1 ? "s" : ""} found`}
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
          />
          <input
            type="text"
            id="shop-search"
            placeholder="Search products…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all shadow-sm"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Stock filter */}
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={15} className="text-slate-400 shrink-0" />
          {["All", "In Stock", "Out of Stock"].map((f) => (
            <button
              key={f}
              onClick={() => setStockFilter(f)}
              className={`px-3 py-2 text-xs font-semibold rounded-xl border transition-all ${
                stockFilter === f
                  ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                  : "bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:text-blue-600"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {hasFilters && (
          <button
            onClick={resetFilters}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-red-500 bg-red-50 hover:bg-red-100 rounded-xl transition-colors border border-red-100"
          >
            <X size={12} /> Reset
          </button>
        )}
      </div>

      {/* Category pills */}
      {!loading && categories.length > 1 && (
        <div className="flex flex-wrap gap-2 mb-7">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 text-sm font-medium rounded-full border transition-all ${
                activeCategory === cat
                  ? "bg-slate-900 text-white border-slate-900 shadow-md"
                  : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Product Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {[...Array(8)].map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center py-24 text-slate-400">
          <ShoppingBag size={52} className="mb-4 opacity-20" />
          <p className="text-xl font-semibold text-slate-600">No products found</p>
          <p className="text-sm mt-1">
            {hasFilters ? "Try adjusting your filters." : "No products have been added yet."}
          </p>
          {hasFilters && (
            <button
              onClick={resetFilters}
              className="mt-5 px-5 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors"
            >
              Clear filters
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((product) => (
            <PublicProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Shop;
