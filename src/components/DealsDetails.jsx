import React from "react";

const DealsDetails = ({ orders = [] }) => {
  // Take the 5 most recent orders for the dashboard preview
  const recentOrders = orders.slice(0, 5);

  // Helper to style the status badge
  const getStatusStyles = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700";
      case "Processing":
      case "Shipped":
        return "bg-blue-100 text-blue-700";
      case "Pending":
        return "bg-orange-100 text-orange-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const formatDateTime = (timestamp) => {
    if (!timestamp) return "Unknown Date";
    const date = timestamp?.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  };

  return (
    <div className="w-full bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h4 className="text-xl font-bold text-gray-900">Recent Orders</h4>
        <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
          Last 5 transactions
        </span>
      </div>

      {/* Table Container for Horizontal Scrolling on Mobile */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-separate border-spacing-y-2">
          <thead>
            <tr className="bg-gray-50 text-gray-500 uppercase text-xs font-semibold tracking-wider">
              <th className="px-6 py-4 rounded-l-lg">Items</th>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Date - Time</th>
              <th className="px-6 py-4">Qty</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4 rounded-r-lg">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {recentOrders.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-8 text-gray-400">
                  No recent orders found.
                </td>
              </tr>
            ) : (
              recentOrders.map((order) => {
                const totalPieces = order.items?.reduce((s, i) => s + (i.quantity || 1), 0) || 0;
                const firstItem = order.items?.[0]?.name || "Unknown Item";
                const itemDesc = order.items?.length > 1 ? `${firstItem} + ${order.items.length - 1} more` : firstItem;
                
                return (
                  <tr
                    key={order.id}
                    className="hover:bg-gray-50 transition-colors group"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900 max-w-[200px] truncate" title={itemDesc}>
                      {itemDesc}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {order.customerInfo?.name || "Guest"}
                      <div className="text-xs text-gray-400">{order.customerInfo?.city || order.customerInfo?.address}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-600 text-sm whitespace-nowrap">
                      {formatDateTime(order.createdAt)}
                    </td>
                    <td className="px-6 py-4 text-gray-600">{totalPieces}</td>
                    <td className="px-6 py-4 font-semibold text-gray-900">
                      ${Number(order.totalAmount || 0).toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-[11px] uppercase tracking-wider font-bold whitespace-nowrap ${getStatusStyles(order.status)}`}
                      >
                        {order.status || "Pending"}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DealsDetails;
