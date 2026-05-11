import React from "react";

const PublicProductCard = ({ product }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col">
      {/* Product Image Placeholder */}
      <div className="h-48 bg-slate-100 flex items-center justify-center overflow-hidden">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="object-cover w-full h-full"
          />
        ) : (
          <span className="text-slate-400">No Image</span>
        )}
      </div>

      {/* Product Details */}
      <div className="p-4 grow flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-slate-900 text-lg truncate pr-2">
            {product.name}
          </h3>
          <span className="font-bold text-blue-600">${product.price}</span>
        </div>
        <p className="text-sm text-slate-500 mb-4 line-clamp-2">
          {product.description}
        </p>

        {/* Add to Cart Section */}
        <div className="mt-auto pt-4 border-t border-slate-100 flex justify-between items-center">
          <span
            className={`text-xs font-medium ${product.stockQuantity > 0 ? "text-green-600" : "text-red-500"}`}
          >
            {product.stockQuantity > 0 ? "In Stock" : "Out of Stock"}
          </span>
          <button
            disabled={product.stockQuantity <= 0}
            className="px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-md hover:bg-blue-600 transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default PublicProductCard;
