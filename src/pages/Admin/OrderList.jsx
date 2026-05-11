import React, { useState, useMemo } from "react";
import {
  Filter,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Search,
  X,
  Package,
  Clock,
  CheckCircle2,
  XCircle,
  Eye,
  Loader2,
  AlertTriangle,
} from "lucide-react";
import { useOrderList } from "../../hooks/useOrderList";

const ORDER_STATUS = ["All", "Completed", "Processing", "Rejected"];
const PAGE_SIZE = 8;

// ── Helpers ───────────────────────────────────────────────────────────────────
const STATUS_CONFIG = {
  Completed: {
    bg: "bg-teal-50",
    text: "text-teal-600",
    dot: "bg-teal-500",
    icon: CheckCircle2,
  },
  Processing: {
    bg: "bg-violet-50",
    text: "text-violet-600",
    dot: "bg-violet-500",
    icon: Clock,
  },
  Rejected: {
    bg: "bg-red-50",
    text: "text-red-500",
    dot: "bg-red-500",
    icon: XCircle,
  },
};

const fmt = (dateStr) =>
  new Date(dateStr).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

// ── Summary Card ──────────────────────────────────────────────────────────────
const StatCard = ({ label, count, icon: Icon, color, bg }) => (
  <div className={`${bg} rounded-2xl p-5 flex items-center gap-4`}>
    <div
      className={`w-12 h-12 rounded-xl ${color} bg-white/70 flex items-center justify-center shadow-sm`}
    >
      <Icon size={22} />
    </div>
    <div>
      <p className="text-2xl font-bold text-gray-800">{count}</p>
      <p className="text-xs font-medium text-gray-500 mt-0.5">{label}</p>
    </div>
  </div>
);

// ── Order Detail Drawer ───────────────────────────────────────────────────────
const OrderDetail = ({ order, onClose, onUpdateStatus }) => {
  const cfg = STATUS_CONFIG[order.status] || {};
  const handleStatus = async (status) => {
    await onUpdateStatus(order.id, status);
    onClose();
  };
  return (
    <div className="fixed inset-0 z-50 flex justify-end" onClick={onClose}>
      <div
        className="w-full max-w-md bg-white h-full shadow-2xl p-8 overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: "slideIn .22s ease" }}
      >
        <style>{`@keyframes slideIn{from{transform:translateX(100%)}to{transform:translateX(0)}}`}</style>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-lg font-bold text-gray-900">Order Details</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="space-y-6">
          <div
            className={`${cfg.bg} ${cfg.text} rounded-xl p-4 flex items-center gap-3`}
          >
            <cfg.icon size={20} />
            <span className="font-semibold">{order.status}</span>
          </div>

          {[
            ["Order ID", `#${order.id}`],
            ["Customer", order.name],
            ["Address", order.address],
            ["Date", fmt(order.date)],
            ["Type", order.type],
            [
              "Amount",
              typeof order.amount === "number"
                ? `$${order.amount.toFixed(2)}`
                : order.amount,
            ],
          ].map(([label, value]) => (
            <div
              key={label}
              className="flex justify-between py-3 border-b border-gray-100 last:border-0"
            >
              <span className="text-sm text-gray-400 font-medium">{label}</span>
              <span className="text-sm text-gray-800 font-semibold text-right max-w-[60%]">
                {value}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-8 flex gap-3">
          {order.status === "Processing" && (
            <button
              onClick={() => handleStatus("Completed")}
              className="flex-1 bg-teal-500 hover:bg-teal-600 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors"
            >
              Mark Completed
            </button>
          )}
          {order.status !== "Rejected" && (
            <button
              onClick={() => handleStatus("Rejected")}
              className="flex-1 bg-red-50 hover:bg-red-100 text-red-500 text-sm font-semibold py-2.5 rounded-xl transition-colors"
            >
              Reject Order
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// ── Dropdown ──────────────────────────────────────────────────────────────────
const Dropdown = ({ label, value, options, onChange }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen((p) => !p)}
        className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-xl border transition-colors ${
          value !== "All"
            ? "border-blue-300 bg-blue-50 text-blue-600"
            : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
        }`}
      >
        {value === "All" ? label : value}
        {open ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
      </button>
      {open && (
        <div className="absolute top-full mt-1.5 left-0 bg-white border border-gray-100 rounded-xl shadow-lg z-20 min-w-35 overflow-hidden">
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                value === opt
                  ? "bg-blue-50 text-blue-600 font-semibold"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// ── Sortable Header ───────────────────────────────────────────────────────────
const SortTh = ({ children, field, sortField, sortDir, onSort }) => {
  const active = sortField === field;
  return (
    <th
      className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider cursor-pointer select-none hover:text-gray-800 transition-colors whitespace-nowrap"
      onClick={() => onSort(field)}
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

// ── Main Page ─────────────────────────────────────────────────────────────────
const OrderLists = () => {
  const { orders, loading, error, updateOrderStatus } = useOrderList();
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("All");
  const [sortField, setSortField] = useState("name");
  const [sortDir, setSortDir] = useState("asc");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);

  // Derive filters dynamically from Firestore data
  const ORDER_TYPES = useMemo(
    () => ["All", ...[...new Set(orders.map((o) => o.type))].sort()],
    [orders],
  );
  const UNIQUE_DATES = useMemo(
    () => ["All", ...[...new Set(orders.map((o) => o.date))].sort().reverse()],
    [orders],
  );

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
    setTypeFilter("All");
    setStatusFilter("All");
    setDateFilter("All");
    setSortField("id");
    setSortDir("asc");
    setPage(1);
  };

  const filtered = useMemo(() => {
    let data = [...orders];
    if (search)
      data = data.filter(
        (o) =>
          o.name?.toLowerCase().includes(search.toLowerCase()) ||
          o.id?.includes(search),
      );
    if (typeFilter !== "All") data = data.filter((o) => o.type === typeFilter);
    if (statusFilter !== "All")
      data = data.filter((o) => o.status === statusFilter);
    if (dateFilter !== "All") data = data.filter((o) => o.date === dateFilter);
    data.sort((a, b) => {
      const av = a[sortField] ?? "";
      const bv = b[sortField] ?? "";
      return (av < bv ? -1 : av > bv ? 1 : 0) * (sortDir === "asc" ? 1 : -1);
    });
    return data;
  }, [
    orders,
    search,
    typeFilter,
    statusFilter,
    dateFilter,
    sortField,
    sortDir,
  ]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageData = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const stats = useMemo(
    () => ({
      total: orders.length,
      completed: orders.filter((o) => o.status === "Completed").length,
      processing: orders.filter((o) => o.status === "Processing").length,
      rejected: orders.filter((o) => o.status === "Rejected").length,
    }),
    [orders],
  );

  const hasFilters =
    search ||
    typeFilter !== "All" ||
    statusFilter !== "All" ||
    dateFilter !== "All";

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-8 font-sans">
      {selected && (
        <OrderDetail
          order={selected}
          onClose={() => setSelected(null)}
          onUpdateStatus={updateOrderStatus}
        />
      )}

      {loading && (
        <div className="flex flex-col items-center justify-center h-96 text-gray-400">
          <Loader2 size={36} className="animate-spin mb-3" />
          <p className="text-sm">Loading orders…</p>
        </div>
      )}
      {error && (
        <div className="flex flex-col items-center justify-center h-96 text-red-400">
          <AlertTriangle size={36} className="mb-3" />
          <p className="text-sm font-medium">Failed to load orders</p>
          <p className="text-xs mt-1 text-gray-400">{error}</p>
        </div>
      )}
      {!loading && !error && (
        <>
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Order Lists</h1>
              <p className="text-sm text-gray-400 mt-1">
                {orders.length} total orders
              </p>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <StatCard
              label="Total Orders"
              count={stats.total}
              icon={Package}
              color="text-blue-500"
              bg="bg-blue-50"
            />
            <StatCard
              label="Completed"
              count={stats.completed}
              icon={CheckCircle2}
              color="text-teal-500"
              bg="bg-teal-50"
            />
            <StatCard
              label="Processing"
              count={stats.processing}
              icon={Clock}
              color="text-violet-500"
              bg="bg-violet-50"
            />
            <StatCard
              label="Rejected"
              count={stats.rejected}
              icon={XCircle}
              color="text-red-400"
              bg="bg-red-50"
            />
          </div>

          {/* Controls Row */}
          <div className="flex flex-wrap items-center gap-3 mb-5">
            {/* Search */}
            <div className="relative flex-1 min-w-50 max-w-xs">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={16}
              />
              <input
                type="text"
                placeholder="Search by name or ID…"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="w-full bg-white border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 text-sm outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-50 transition-all"
              />
            </div>

            {/* Filter icon label */}
            <div className="flex items-center gap-1.5 text-sm font-semibold text-gray-500 px-1">
              <Filter size={15} /> Filter By
            </div>

            <Dropdown
              label="Date"
              value={dateFilter}
              options={UNIQUE_DATES}
              onChange={(v) => {
                setDateFilter(v);
                setPage(1);
              }}
            />
            <Dropdown
              label="Order Type"
              value={typeFilter}
              options={ORDER_TYPES}
              onChange={(v) => {
                setTypeFilter(v);
                setPage(1);
              }}
            />
            <Dropdown
              label="Order Status"
              value={statusFilter}
              options={ORDER_STATUS}
              onChange={(v) => {
                setStatusFilter(v);
                setPage(1);
              }}
            />

            {hasFilters && (
              <button
                onClick={reset}
                className="flex items-center gap-1.5 px-3 py-2.5 text-sm font-semibold text-red-500 bg-red-50 hover:bg-red-100 rounded-xl transition-colors"
              >
                <RotateCcw size={13} /> Reset
              </button>
            )}
          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-x-auto mb-5">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/60">
                  <SortTh
                    field="id"
                    sortField={sortField}
                    sortDir={sortDir}
                    onSort={handleSort}
                  >
                    ID
                  </SortTh>
                  <SortTh
                    field="name"
                    sortField={sortField}
                    sortDir={sortDir}
                    onSort={handleSort}
                  >
                    Name
                  </SortTh>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Address
                  </th>
                  <SortTh
                    field="date"
                    sortField={sortField}
                    sortDir={sortDir}
                    onSort={handleSort}
                  >
                    Date
                  </SortTh>
                  <SortTh
                    field="type"
                    sortField={sortField}
                    sortDir={sortDir}
                    onSort={handleSort}
                  >
                    Type
                  </SortTh>
                  <SortTh
                    field="amount"
                    sortField={sortField}
                    sortDir={sortDir}
                    onSort={handleSort}
                  >
                    Amount
                  </SortTh>
                  <SortTh
                    field="status"
                    sortField={sortField}
                    sortDir={sortDir}
                    onSort={handleSort}
                  >
                    Status
                  </SortTh>
                  <th className="px-6 py-4" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {pageData.length === 0 ? (
                  <tr>
                    <td
                      colSpan={8}
                      className="px-6 py-16 text-center text-gray-400"
                    >
                      <Package size={36} className="mx-auto mb-3 opacity-40" />
                      <p className="text-sm font-medium">
                        No orders match your filters
                      </p>
                    </td>
                  </tr>
                ) : (
                  pageData.map((order) => {
                    const cfg = STATUS_CONFIG[order.status] || {};
                    return (
                      <tr
                        key={order.id}
                        className="hover:bg-gray-50/80 transition-colors group"
                      >
                        <td className="px-6 py-4 text-sm font-mono text-gray-400">
                          #{order.id}
                        </td>
                        <td className="px-6 py-4 text-sm font-semibold text-gray-800">
                          {order.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-400 max-w-45 truncate">
                          {order.address}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                          {fmt(order.date)}
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm bg-gray-100 text-gray-600 px-2.5 py-1 rounded-lg font-medium">
                            {order.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm font-semibold text-gray-700">
                          {order.amount}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${cfg.bg} ${cfg.text}`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`}
                            />
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => setSelected(order)}
                            className="opacity-0 group-hover:opacity-100 p-1.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all"
                            title="View details"
                          >
                            <Eye size={16} />
                          </button>
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
                : `Showing ${(page - 1) * PAGE_SIZE + 1}–${Math.min(page * PAGE_SIZE, filtered.length)} of ${filtered.length} orders`}
            </span>
            <div className="flex items-center gap-1.5">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className="flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-sm"
              >
                <ChevronLeft size={15} /> Prev
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-8 h-8 rounded-xl text-sm font-semibold transition-colors ${
                    p === page
                      ? "bg-blue-500 text-white shadow-sm"
                      : "bg-white border border-gray-200 text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  {p}
                </button>
              ))}
              <button
                disabled={page === totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-sm"
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

export default OrderLists;
