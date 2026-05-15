import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import { db } from "../../firebase/config";
import {
  collection,
  addDoc,
  doc,
  writeBatch,
  serverTimestamp,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return alert("Your cart is empty!");

    setIsProcessing(true);

    try {
      const batch = writeBatch(db);

      // 1. Create the new Order Document
      const orderRef = await addDoc(collection(db, "orders"), {
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

      // 2. Loop through cart items and decrement stock in the Products collection
      cartItems.forEach((item) => {
        const productRef = doc(db, "products", item.id);
        batch.update(productRef, {
          stockQuantity: item.stockQuantity - item.quantity,
        });
      });

      // 3. Commit the batch
      await batch.commit();

      clearCart();
      alert(`Order placed successfully! Order ID: ${orderRef.id}`);
      navigate("/shop");
    } catch (error) {
      console.error("Error processing checkout: ", error);
      alert("There was an error processing your order.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-20 text-xl font-bold">
        Your cart is empty.
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-slate-900 mb-8">Checkout</h1>

      <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
        <div className="mb-8 border-b border-slate-200 pb-4">
          <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
          <p className="text-slate-600">Total Items: {cartItems.length}</p>
          <p className="text-2xl font-bold text-blue-600 mt-2">
            Total: ${cartTotal.toFixed(2)}
          </p>
        </div>

        <form onSubmit={handleCheckout} className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">Shipping Details</h2>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Full Name
            </label>
            <input
              required
              type="text"
              name="name"
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Email
            </label>
            <input
              required
              type="email"
              name="email"
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Address
            </label>
            <input
              required
              type="text"
              name="address"
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              City
            </label>
            <input
              required
              type="text"
              name="city"
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={isProcessing}
            className="w-full mt-6 bg-slate-900 text-white py-3 rounded-md font-bold hover:bg-blue-600 transition-colors disabled:bg-slate-400"
          >
            {isProcessing ? "Processing Order..." : "Confirm & Pay"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
