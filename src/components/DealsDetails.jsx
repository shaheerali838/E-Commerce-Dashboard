import React from "react";

const DealsDetails = () => {
  // Mock data to demonstrate dynamic rendering
  const deals = [
    {
      id: 1,
      product: "Apple Watch",
      location: "New York",
      dateTime: "10:30 AM - 12 May 2026",
      pieces: 1,
      amount: "$450",
      status: "Delivered",
    },
    {
      id: 2,
      product: "iPhone 15 Pro",
      location: "London",
      dateTime: "02:15 PM - 12 May 2026",
      pieces: 2,
      amount: "$2,400",
      status: "Pending",
    },
    {
      id: 3,
      product: "MacBook Air",
      location: "Tokyo",
      dateTime: "09:00 AM - 11 May 2026",
      pieces: 1,
      amount: "$1,200",
      status: "Cancelled",
    },
  ];

  // Helper to style the status badge
  const getStatusStyles = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-orange-100 text-orange-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="w-full bg-white p-6 rounded-xl shadow-sm">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h4 className="text-2xl font-bold text-gray-900">Deals Details</h4>
        <select
          name="month"
          id="month"
          className="text-sm font-medium py-2 px-4 outline-none rounded-lg bg-gray-50 border border-gray-200 hover:bg-gray-100 transition-colors cursor-pointer"
        >
          <option value="this-month">This Month</option>
          <option value="last-month">Last Month</option>
          <option value="this-year">This Year</option>
        </select>
      </div>

      {/* Table Container for Horizontal Scrolling on Mobile */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-separate border-spacing-y-2">
          <thead>
            <tr className="bg-gray-50 text-gray-500 uppercase text-xs font-semibold tracking-wider">
              <th className="px-6 py-4 rounded-l-lg">Product Name</th>
              <th className="px-6 py-4">Location</th>
              <th className="px-6 py-4">Date - Time</th>
              <th className="px-6 py-4">Piece</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4 rounded-r-lg">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {deals.map((deal) => (
              <tr
                key={deal.id}
                className="hover:bg-gray-50 transition-colors group"
              >
                <td className="px-6 py-4 font-medium text-gray-900">
                  {deal.product}
                </td>
                <td className="px-6 py-4 text-gray-600">{deal.location}</td>
                <td className="px-6 py-4 text-gray-600 text-sm">
                  {deal.dateTime}
                </td>
                <td className="px-6 py-4 text-gray-600">{deal.pieces}</td>
                <td className="px-6 py-4 font-semibold text-gray-900">
                  {deal.amount}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusStyles(deal.status)}`}
                  >
                    {deal.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DealsDetails;
