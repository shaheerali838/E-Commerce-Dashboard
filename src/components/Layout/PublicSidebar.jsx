import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { X, Home, ShoppingBag, ShoppingCart, User, Info, Phone } from "lucide-react";
import { useCart } from "../../context/CartContext";

const PublicSidebar = ({ isOpen, onClose }) => {
  const { cartCount } = useCart();
  const navigate = useNavigate();

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // Prevent background scrolling when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sidebar Drawer */}
      <div
        className={`fixed top-0 left-0 bottom-0 w-72 bg-white/80 backdrop-blur-xl border-r border-white/20 shadow-2xl z-[70] transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-600/30 text-white font-bold text-sm">
              EC
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Menu
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 -mr-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
          <NavLink
            to="/"
            end
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                isActive
                  ? "bg-indigo-50 text-indigo-700 shadow-sm"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`
            }
          >
            <Home size={20} />
            Home
          </NavLink>
          
          <NavLink
            to="/shop"
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                isActive
                  ? "bg-indigo-50 text-indigo-700 shadow-sm"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`
            }
          >
            <ShoppingBag size={20} />
            Shop Collections
          </NavLink>

          <button
            onClick={() => {
              navigate("/cart");
              onClose();
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all"
          >
            <ShoppingCart size={20} />
            View Cart
            {cartCount > 0 && (
              <span className="ml-auto bg-indigo-600 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-sm">
                {cartCount}
              </span>
            )}
          </button>


        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 bg-gray-50/50">
          <p className="text-xs text-center text-gray-500 font-medium">
            &copy; {new Date().getFullYear()} E-Commerce Store
          </p>
        </div>
      </div>
    </>
  );
};

export default PublicSidebar;
