import React, { useState, useMemo } from "react";
import {
  Search,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Plus,
  X,
  Package,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  Filter,
  Loader2,
} from "lucide-react";
import { useProductStock } from "../../hooks/useProductStock";

const STOCK_FILTERS = ["All", "In Stock", "Low Stock", "Out of Stock"];
const PAGE_SIZE = 8;

const getStockLevel = (piece) => {
  if (piece === 0)
    return {
      label: "Out of Stock",
      bg: "bg-red-50",
      text: "text-red-500",
      dot: "bg-red-400",
      icon: AlertTriangle,
    };
  if (piece <= 15)
    return {
      label: "Low Stock",
      bg: "bg-amber-50",
      text: "text-amber-600",
      dot: "bg-amber-400",
      icon: TrendingDown,
    };
  return {
    label: "In Stock",
    bg: "bg-teal-50",
    text: "text-teal-600",
    dot: "bg-teal-400",
    icon: CheckCircle2,
  };
};

const fmt = (n) =>
  `$${(Number(n) || 0).toLocaleString("en-US", { minimumFractionDigits: 2 })}`;

// ── Stat Card ─────────────────────────────────────────────────────────────────
const StatCard = ({ label, value, icon: Icon, color, bg, sub }) => (
  <div className={`${bg} rounded-2xl p-5 flex items-center gap-4`}>
    <div
      className={`w-12 h-12 rounded-xl bg-white/70 flex items-center justify-center shadow-sm ${color}`}
    >
      <Icon size={22} />
    </div>
    <div>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
      <p className="text-xs font-medium text-gray-500 mt-0.5">{label}</p>
      {sub && <p className={`text-xs font-semibold mt-0.5 ${color}`}>{sub}</p>}
    </div>
  </div>
);

// ── Dropdown ──────────────────────────────────────────────────────────────────
const Dropdown = ({ label, value, options, onChange }) => {
  const [open, setOpen] = useState(false);
  const active = value !== "All";
  return (
    <div className="relative">
      <button
        onClick={() => setOpen((p) => !p)}
        className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-xl border transition-all ${
          active
            ? "border-blue-300 bg-blue-50 text-blue-600"
            : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
        }`}
      >
        {active ? value : label}
        {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>
      {open && (
        <div className="absolute top-full mt-1.5 left-0 bg-white border border-gray-100 rounded-xl shadow-lg z-20 min-w-40 overflow-hidden">
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${value === opt ? "bg-blue-50 text-blue-600 font-semibold" : "text-gray-600 hover:bg-gray-50"}`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// ── Sort Header ───────────────────────────────────────────────────────────────
const SortTh = ({
  children,
  field,
  sortField,
  sortDir,
  onSort,
  className = "",
}) => {
  const active = sortField === field;
  return (
    <th
      onClick={() => onSort(field)}
      className={`px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider cursor-pointer select-none hover:text-gray-800 transition-colors whitespace-nowrap ${className}`}
    >
      <span className="flex items-center gap-1">
        {children}
        {active ? (
          sortDir === "asc" ? (
            <ChevronUp size={13} className="text-blue-500" />
          ) : (
            <ChevronDown size={13} className="text-blue-500" />
          )
        ) : (
          <ChevronDown size={13} className="text-gray-300" />
        )}
      </span>
    </th>
  );
};

// ── Edit Modal ────────────────────────────────────────────────────────────────
const EditModal = ({ product, categories, onClose, onSave }) => {
  const [form, setForm] = useState({
    name: product.name,
    category: product.category,
    price: product.price,
    piece: product.piece,
  });
  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{product.emoji}</span>
            <h2 className="text-base font-bold text-gray-800">Edit Product</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 transition-colors"
          >
            <X size={18} />
          </button>
        </div>
        <div className="p-6 space-y-4">
          {[
            ["Product Name", "name", "text"],
            ["Price ($)", "price", "number"],
            ["Stock (pieces)", "piece", "number"],
          ].map(([lbl, key, type]) => (
            <div key={key}>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5">
                {lbl}
              </label>
              <input
                type={type}
                value={form[key]}
                onChange={(e) =>
                  set(
                    key,
                    type === "number" ? Number(e.target.value) : e.target.value,
                  )
                }
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all"
              />
            </div>
          ))}
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">
              Category
            </label>
            <select
              value={form.category}
              onChange={(e) => set("category", e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-400 transition-all bg-white"
            >
              {categories
                .filter((c) => c !== "All")
                .map((c) => (
                  <option key={c}>{c}</option>
                ))}
            </select>
          </div>
        </div>
        <div className="flex gap-3 px-6 py-4 border-t border-gray-100">
          <button
            onClick={onClose}
            className="flex-1 border border-gray-200 rounded-xl py-2.5 text-sm font-semibold text-gray-500 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(form)}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white rounded-xl py-2.5 text-sm font-semibold transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

// ── Delete Confirm ────────────────────────────────────────────────────────────
const DeleteConfirm = ({ product, onClose, onConfirm }) => (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
    onClick={onClose}
  >
    <div
      className="bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 p-6"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="text-center mb-6">
        <span className="text-4xl">{product.emoji}</span>
        <h2 className="text-base font-bold text-gray-800 mt-3">
          Remove Product?
        </h2>
        <p className="text-sm text-gray-400 mt-1">
          "{product.name}" will be permanently removed from stock.
        </p>
      </div>
      <div className="flex gap-3">
        <button
          onClick={onClose}
          className="flex-1 border border-gray-200 rounded-xl py-2.5 text-sm font-semibold text-gray-500 hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="flex-1 bg-red-500 hover:bg-red-600 text-white rounded-xl py-2.5 text-sm font-semibold transition-colors"
        >
          Remove
        </button>
      </div>
    </div>
  </div>
);

// ── Main Page ─────────────────────────────────────────────────────────────────
const ProductStock = () => {
  const { products, loading, error, addProduct, updateProduct, deleteProduct } =
    useProductStock();
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("All");
  const [stockFilter, setStockFilter] = useState("All");
  const [sortField, setSortField] = useState("name");
  const [sortDir, setSortDir] = useState("asc");
  const [page, setPage] = useState(1);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);

  // Derive categories dynamically from Firestore data
  const CATEGORIES = useMemo(() => {
    const cats = [...new Set(products.map((p) => p.category || "Uncategorized"))].sort();
    return ["All", ...cats];
  }, [products]);

  const handleSort = (field) => {
    if (sortField === field) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortField(field);
      setSortDir("asc");
    }
    setPage(1);
  };

  const reset = () => {
    setSearch("");
    setCatFilter("All");
    setStockFilter("All");
    setPage(1);
  };
  const hasFilters = search || catFilter !== "All" || stockFilter !== "All";

  const filtered = useMemo(() => {
    let data = [...products];
    if (search)
      data = data.filter(
        (p) =>
          (p.name || "").toLowerCase().includes(search.toLowerCase()) ||
          (p.category || "Uncategorized").toLowerCase().includes(search.toLowerCase()),
      );
    if (catFilter !== "All")
      data = data.filter((p) => (p.category || "Uncategorized") === catFilter);
    if (stockFilter !== "All") {
      data = data.filter((p) => {
        const s = getStockLevel(p.piece).label;
        return stockFilter === s;
      });
    }
    data.sort((a, b) => {
      const av = a[sortField] ?? "";
      const bv = b[sortField] ?? "";
      return (av < bv ? -1 : av > bv ? 1 : 0) * (sortDir === "asc" ? 1 : -1);
    });
    return data;
  }, [products, search, catFilter, stockFilter, sortField, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageData = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const stats = useMemo(
    () => ({
      total: products.length,
      inStock: products.filter((p) => p.piece > 15).length,
      low: products.filter((p) => p.piece > 0 && p.piece <= 15).length,
      out: products.filter((p) => p.piece === 0).length,
      value: products.reduce((s, p) => s + p.price * p.piece, 0),
    }),
    [products],
  );

  const handleSave = async (form) => {
    await updateProduct(editing.id, form);
    setEditing(null);
  };

  const handleDelete = async () => {
    await deleteProduct(deleting.id);
    setDeleting(null);
    if (pageData.length === 1 && page > 1) setPage((p) => p - 1);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-8 font-sans">
      {editing && (
        <EditModal
          product={editing}
          categories={CATEGORIES}
          onClose={() => setEditing(null)}
          onSave={handleSave}
        />
      )}
      {deleting && (
        <DeleteConfirm
          product={deleting}
          onClose={() => setDeleting(null)}
          onConfirm={handleDelete}
        />
      )}

      {/* Loading / Error full-page states */}
      {loading && (
        <div className="flex flex-col items-center justify-center h-96 text-gray-400">
          <Loader2 size={36} className="animate-spin mb-3" />
          <p className="text-sm">Loading products…</p>
        </div>
      )}
      {error && (
        <div className="flex flex-col items-center justify-center h-96 text-red-400">
          <AlertTriangle size={36} className="mb-3" />
          <p className="text-sm font-medium">Failed to load products</p>
          <p className="text-xs mt-1 text-gray-400">{error}</p>
        </div>
      )}
      {!loading && !error && (
        <>
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Product Stock
              </h1>
              <p className="text-sm text-gray-400 mt-1">
                {products.length} products tracked
              </p>
            </div>
            <button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors shadow-sm">
              <Plus size={16} /> Add Product
            </button>
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard
              label="Total Products"
              value={stats.total}
              icon={Package}
              color="text-blue-500"
              bg="bg-blue-50"
              sub={`Value: $${(stats.value / 1000).toFixed(1)}k`}
            />
            <StatCard
              label="In Stock"
              value={stats.inStock}
              icon={CheckCircle2}
              color="text-teal-500"
              bg="bg-teal-50"
            />
            <StatCard
              label="Low Stock"
              value={stats.low}
              icon={TrendingDown}
              color="text-amber-500"
              bg="bg-amber-50"
            />
            <StatCard
              label="Out of Stock"
              value={stats.out}
              icon={AlertTriangle}
              color="text-red-500"
              bg="bg-red-50"
            />
          </div>

          {/* Controls */}
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <div className="relative flex-1 min-w-50 max-w-xs">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={16}
              />
              <input
                type="text"
                placeholder="Search product or category…"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="w-full bg-white border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 text-sm outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-50 transition-all"
              />
            </div>
            <div className="flex items-center gap-1.5 text-sm font-semibold text-gray-500 px-1">
              <Filter size={15} /> Filter By
            </div>
            <Dropdown
              label="Category"
              value={catFilter}
              options={CATEGORIES}
              onChange={(v) => {
                setCatFilter(v);
                setPage(1);
              }}
            />
            <Dropdown
              label="Stock Level"
              value={stockFilter}
              options={STOCK_FILTERS}
              onChange={(v) => {
                setStockFilter(v);
                setPage(1);
              }}
            />
            {hasFilters && (
              <button
                onClick={reset}
                className="flex items-center gap-1.5 px-3 py-2.5 text-sm font-semibold text-red-500 bg-red-50 hover:bg-red-100 rounded-xl transition-colors"
              >
                <X size={13} /> Reset
              </button>
            )}
          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-x-auto mb-5">
            <table className="w-full text-left min-w-175">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/60">
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider w-20">
                    Image
                  </th>
                  <SortTh
                    field="name"
                    sortField={sortField}
                    sortDir={sortDir}
                    onSort={handleSort}
                  >
                    Product Name
                  </SortTh>
                  <SortTh
                    field="category"
                    sortField={sortField}
                    sortDir={sortDir}
                    onSort={handleSort}
                  >
                    Category
                  </SortTh>
                  <SortTh
                    field="price"
                    sortField={sortField}
                    sortDir={sortDir}
                    onSort={handleSort}
                  >
                    Price
                  </SortTh>
                  <SortTh
                    field="piece"
                    sortField={sortField}
                    sortDir={sortDir}
                    onSort={handleSort}
                  >
                    Stock
                  </SortTh>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Colors
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {pageData.length === 0 ? (
                  <tr>
                    <td
                      colSpan={8}
                      className="px-6 py-16 text-center text-gray-300"
                    >
                      <Package size={40} className="mx-auto mb-3 opacity-50" />
                      <p className="text-sm font-medium text-gray-400">
                        No products match your filters
                      </p>
                    </td>
                  </tr>
                ) : (
                  pageData.map((product) => {
                    const stock = getStockLevel(product.piece);
                    return (
                      <tr
                        key={product.id}
                        className="hover:bg-gray-50/70 transition-colors group"
                      >
                        {/* Emoji thumbnail */}
                        <td className="px-6 py-4">
                          <div className="w-12 h-12 rounded-xl bg-linear-to-br from-gray-100 to-gray-200 flex items-center justify-center text-2xl shadow-sm border border-gray-100">
                            {product.emoji}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm font-semibold text-gray-800">
                          {product.name}
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm bg-gray-100 text-gray-600 px-2.5 py-1 rounded-lg font-medium">
                            {product.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm font-bold text-gray-700">
                          {fmt(product.price)}
                        </td>
                        <td className="px-6 py-4 text-sm font-semibold text-gray-700">
                          {(product.piece || 0).toLocaleString()}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1.5">
                            {(product.colors || []).map((color, i) => (
                              <span
                                key={i}
                                className="w-4 h-4 rounded-full border border-black/10 shadow-sm shrink-0"
                                style={{ backgroundColor: color }}
                                title={color}
                              />
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${stock.bg} ${stock.text}`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${stock.dot}`}
                            />
                            {stock.label}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center gap-1">
                            <button
                              onClick={() => setEditing(product)}
                              className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all"
                              title="Edit"
                            >
                              <Edit size={15} strokeWidth={2} />
                            </button>
                            <button
                              onClick={() => setDeleting(product)}
                              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                              title="Delete"
                            >
                              <Trash2 size={15} strokeWidth={2} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">
              {filtered.length === 0
                ? "No results"
                : `Showing ${(page - 1) * PAGE_SIZE + 1}–${Math.min(page * PAGE_SIZE, filtered.length)} of ${filtered.length} products`}
            </span>
            <div className="flex items-center gap-1.5">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className="flex items-center gap-1 px-3 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-sm"
              >
                <ChevronLeft size={15} /> Prev
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-8 h-8 rounded-xl text-sm font-semibold transition-colors ${p === page ? "bg-blue-500 text-white shadow-sm" : "bg-white border border-gray-200 text-gray-500 hover:bg-gray-50"}`}
                >
                  {p}
                </button>
              ))}
              <button
                disabled={page === totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="flex items-center gap-1 px-3 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-sm"
              >
                Next <ChevronRight size={15} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductStock;
