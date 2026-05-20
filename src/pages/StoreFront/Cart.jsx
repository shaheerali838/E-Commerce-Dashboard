import React from "react";
import { useCart } from "../../context/CartContext";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, cartTotal } =
    useCart();
  const navigate = useNavigate();


  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">
          Your Cart is Empty
        </h2>
        <p className="text-slate-500 mb-8">
          Looks like you haven't added anything to your cart yet.
        </p>
        <Link
          to="/shop"
          className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-slate-900 mb-8">Shopping Cart</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items List */}
        <div className="flex-1">
          <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
            <ul className="divide-y divide-slate-200">
              {cartItems.map((item) => (
                <li
                  key={item.id}
                  className="p-6 flex flex-col sm:flex-row items-center gap-6"
                >
                  {/* Item Image */}
                  <div className="w-24 h-24 bg-slate-100 rounded-md overflow-hidden shrink-0">
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">
                        No Image
                      </div>
                    )}
                  </div>

                  {/* Item Details */}
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-lg font-semibold text-slate-900">
                      {item.name}
                    </h3>
                    <p className="text-blue-600 font-bold mt-1">
                      ${item.price}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-md p-1">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="w-8 h-8 flex items-center justify-center text-slate-600 hover:bg-slate-200 rounded transition-colors"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-medium text-slate-900">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      disabled={item.quantity >= (item.piece ?? item.stockQuantity ?? Infinity)}
                      className="w-8 h-8 flex items-center justify-center text-slate-600 hover:bg-slate-200 rounded transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      +
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 font-medium text-sm transition-colors"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>

            {/* Clear Cart Button */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 text-right">
              <button
                onClick={clearCart}
                className="text-slate-500 hover:text-slate-800 text-sm font-medium transition-colors"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="w-full lg:w-96">
          <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-6 sticky top-24">
            <h2 className="text-lg font-bold text-slate-900 mb-6">
              Order Summary
            </h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="border-t border-slate-200 pt-4 flex justify-between items-center">
                <span className="text-lg font-bold text-slate-900">Total</span>
                <span className="text-xl font-bold text-blue-600">
                  ${cartTotal.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Change this button inside Cart.jsx */}
            <button
              className="w-full bg-slate-900 text-white py-3 rounded-md font-medium hover:bg-blue-600 transition-colors"
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
