import React from "react";
import { useCart } from "../context/CartContext";
import { ShoppingCart, CheckCircle, Package } from "lucide-react";

const PublicProductCard = ({ product }) => {
  const { addToCart, cartItems } = useCart();

  // Use "piece" field (matches Firestore schema from ProductStock)
  const stock = product.piece ?? product.stockQuantity ?? 0;
  const outOfStock = stock <= 0;
  const inCart = cartItems.some((i) => i.id === product.id);
  const cartItem = cartItems.find((i) => i.id === product.id);
  const maxReached = inCart && cartItem?.quantity >= stock;

  const handleAddToCart = () => {
    if (outOfStock || maxReached) return;
    addToCart({ ...product, piece: stock });
  };

  return (
    <div className="group bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">

      {/* Image */}
      <div className="relative h-52 bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden flex items-center justify-center">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <span className="text-5xl select-none">{product.emoji || "📦"}</span>
        )}

        {/* Category badge */}
        {product.category && (
          <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-slate-600 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
            {product.category}
          </span>
        )}

        {/* Out of stock overlay */}
        {outOfStock && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="bg-white text-slate-700 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
              <Package size={12} /> Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Details */}
      <div className="p-4 grow flex flex-col">
        <div className="flex justify-between items-start gap-2 mb-1">
          <h3 className="font-semibold text-slate-900 text-sm leading-snug line-clamp-2 flex-1">
            {product.name}
          </h3>
          <span className="text-base font-bold text-blue-600 shrink-0">
            ${Number(product.price).toFixed(2)}
          </span>
        </div>

        {product.description && (
          <p className="text-xs text-slate-400 line-clamp-2 mb-2">
            {product.description}
          </p>
        )}

        {/* Color swatches */}
        {product.colors?.length > 0 && (
          <div className="flex items-center gap-1.5 mb-3">
            {product.colors.slice(0, 5).map((color, i) => (
              <span
                key={i}
                className="w-3.5 h-3.5 rounded-full border border-black/10 shadow-sm"
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
            {product.colors.length > 5 && (
              <span className="text-[10px] text-slate-400">+{product.colors.length - 5}</span>
            )}
          </div>
        )}

        {/* Stock indicator + Add to Cart */}
        <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <span
            className={`text-xs font-semibold ${
              outOfStock
                ? "text-red-500"
                : stock <= 15
                ? "text-amber-600"
                : "text-emerald-600"
            }`}
          >
            {outOfStock
              ? "Out of Stock"
              : stock <= 15
              ? `Only ${stock} left`
              : "In Stock"}
          </span>

          <button
            id={`add-to-cart-${product.id}`}
            onClick={handleAddToCart}
            disabled={outOfStock || maxReached}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
              outOfStock || maxReached
                ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                : inCart
                ? "bg-emerald-500 text-white hover:bg-emerald-600"
                : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md hover:shadow-blue-200"
            }`}
          >
            {inCart ? (
              <>
                <CheckCircle size={13} />
                {maxReached ? "Max qty" : "Added"}
              </>
            ) : (
              <>
                <ShoppingCart size={13} />
                Add to Cart
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PublicProductCard;
