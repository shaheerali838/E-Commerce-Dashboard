import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { ShoppingCart, Menu, Search, User } from "lucide-react";

const PublicNavbar = ({ onOpenSidebar }) => {
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchValue.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchValue.trim())}`);
      setSearchValue("");
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full px-4 sm:px-6 py-3 bg-white/70 backdrop-blur-lg border-b border-white/20 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Left: Mobile Menu & Brand */}
        <div className="flex items-center gap-4">
          <button
            onClick={onOpenSidebar}
            className="p-2 -ml-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100/50 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
          
          <div 
            onClick={() => navigate("/")}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-9 h-9 bg-gradient-to-tr from-indigo-600 to-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:shadow-indigo-500/50 transition-shadow">
              <span className="text-white font-bold text-sm tracking-wide">EC</span>
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent hidden sm:block">
              Storefront
            </h1>
          </div>
        </div>

        {/* Center: Search Bar (Desktop only for a cleaner look) */}
        <div className="hidden md:flex flex-1 max-w-md relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-full leading-5 bg-gray-50/50 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all sm:text-sm"
            placeholder="Search for products... (Press Enter)"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={handleSearch}
          />
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Quick Nav (Desktop) */}
          <div className="hidden lg:flex items-center gap-1 mr-4">
            <NavLink
              to="/shop"
              className={({ isActive }) =>
                `px-4 py-2 text-sm font-semibold rounded-full transition-all ${
                  isActive
                    ? "bg-gray-900 text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`
              }
            >
              Shop
            </NavLink>
          </div>

          <button
            onClick={() => navigate("/admin/login")}
            className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100/50 rounded-full transition-all hidden sm:block"
            aria-label="Account"
          >
            <User size={22} />
          </button>

          {/* Cart Button with Micro-Animation on hover */}
          <button
            onClick={() => navigate("/cart")}
            aria-label="View cart"
            className="relative p-2.5 text-gray-600 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 border border-gray-200/50 rounded-full transition-all group"
          >
            <ShoppingCart size={20} className="group-hover:scale-110 transition-transform" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white shadow-sm ring-2 ring-white transform group-hover:-translate-y-0.5 transition-transform">
                {cartCount > 9 ? "9+" : cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default PublicNavbar;
