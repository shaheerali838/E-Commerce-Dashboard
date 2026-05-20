import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import { db } from "../../firebase/config";
import {
  collection,
  doc,
  writeBatch,
  serverTimestamp,
} from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { CheckCircle, ShoppingBag, Loader2, ArrowRight } from "lucide-react";

// ── Success Screen ────────────────────────────────────────────────────────────
const SuccessScreen = ({ orderId }) => (
  <div className="max-w-lg mx-auto px-4 py-24 text-center">
    <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
      <CheckCircle size={40} className="text-emerald-500" />
    </div>
    <h1 className="text-2xl font-bold text-slate-900 mb-2">Order Placed!</h1>
    <p className="text-slate-500 mb-2">Thank you for your purchase.</p>
    <p className="text-xs font-mono bg-slate-100 text-slate-600 px-4 py-2 rounded-lg inline-block mb-8">
      Order ID: {orderId}
    </p>
    <div className="flex flex-col sm:flex-row gap-3 justify-center">
      <Link
        to="/shop"
        className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
      >
        <ShoppingBag size={16} /> Continue Shopping
      </Link>
    </div>
  </div>
);

// ── Checkout Form ─────────────────────────────────────────────────────────────
const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [successOrderId, setSuccessOrderId] = useState(null);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    setIsProcessing(true);
    setError(null);

    try {
      const batch = writeBatch(db);

      // 1. Build order ref inside the batch (fully atomic)
      const orderRef = doc(collection(db, "orders"));
      batch.set(orderRef, {
        customerInfo: formData,
        items: cartItems.map((item) => ({
          productId: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        totalAmount: cartTotal,
        status: "Pending",
        createdAt: serverTimestamp(),
      });

      // 2. Decrement stock (field is "piece" in Firestore)
      cartItems.forEach((item) => {
        const productRef = doc(db, "products", item.id);
        batch.update(productRef, {
          piece: (item.piece ?? 0) - item.quantity,
        });
      });

      // 3. Commit — if this fails, nothing is written
      await batch.commit();

      clearCart();
      setSuccessOrderId(orderRef.id);
    } catch (err) {
      console.error("Checkout error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  // Show success screen after order is placed
  if (successOrderId) {
    return <SuccessScreen orderId={successOrderId} />;
  }

  if (cartItems.length === 0) {
    return (
      <div className="max-w-lg mx-auto px-4 py-24 text-center">
        <ShoppingBag size={52} className="mx-auto mb-4 text-slate-300" />
        <h2 className="text-xl font-bold text-slate-900 mb-2">Your cart is empty</h2>
        <p className="text-slate-500 mb-6">Add some products before checking out.</p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
        >
          Go to Shop <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  const fields = [
    { label: "Full Name", name: "name", type: "text" },
    { label: "Email Address", name: "email", type: "email" },
    { label: "Phone Number", name: "phone", type: "tel" },
    { label: "Street Address", name: "address", type: "text" },
    { label: "City", name: "city", type: "text" },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-slate-900 mb-8">Checkout</h1>

      <div className="grid md:grid-cols-5 gap-8">
        {/* Form */}
        <div className="md:col-span-3">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900 mb-5">Shipping Details</h2>

            <form onSubmit={handleCheckout} id="checkout-form" className="space-y-4">
              {fields.map(({ label, name, type }) => (
                <div key={name}>
                  <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">
                    {label}
                  </label>
                  <input
                    required
                    type={type}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all"
                  />
                </div>
              ))}

              {error && (
                <p className="text-sm text-red-500 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={isProcessing}
                id="confirm-order-btn"
                className="w-full mt-2 bg-slate-900 text-white py-3.5 rounded-xl font-bold hover:bg-blue-600 transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Processing…
                  </>
                ) : (
                  "Confirm & Place Order"
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="md:col-span-2">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm sticky top-24">
            <h2 className="text-base font-bold text-slate-900 mb-4">Order Summary</h2>

            <ul className="divide-y divide-slate-100 mb-4">
              {cartItems.map((item) => (
                <li key={item.id} className="py-3 flex justify-between items-center gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-xl shrink-0">{item.emoji || "📦"}</span>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-slate-800 truncate">{item.name}</p>
                      <p className="text-xs text-slate-400">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-slate-700 shrink-0">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>

            <div className="border-t border-slate-200 pt-4 space-y-2">
              <div className="flex justify-between text-sm text-slate-500">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-slate-500">
                <span>Shipping</span>
                <span className="text-emerald-600 font-medium">Free</span>
              </div>
              <div className="flex justify-between text-base font-bold text-slate-900 pt-2 border-t border-slate-100">
                <span>Total</span>
                <span className="text-blue-600">${cartTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
