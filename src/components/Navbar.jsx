import React, { useState } from "react";
import { IoIosNotifications } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { CiSearch } from "react-icons/ci";
import { useAuth } from "../context/AuthContext";
import { LogOut } from "lucide-react";

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  return (
    <nav className="sticky top-0 h-16 z-50 w-full px-6 py-2.5 bg-white border-b border-slate-200 flex items-center justify-between">
      {/* Brand Section */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-slate-900 flex items-center justify-center text-white text-sm font-bold shadow-sm rounded">
          EC
        </div>
        <h1 className="text-lg font-semibold text-slate-900 tracking-tight">
          E-Commerce{" "}
          <span className="font-normal text-slate-500">Workspace</span>
        </h1>
      </div>

      {/* Search Bar Section */}
      <div className="hidden md:flex flex-1 max-w-2xl mx-12">
        <div className="relative w-full shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <CiSearch className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="text"
            id="global-search"
            placeholder="Search products, orders, or customers..."
            className="block w-full pl-10 pr-3 py-1.5 border border-slate-300 rounded-md leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-blue-600 sm:text-sm transition-colors duration-200"
          />
        </div>
      </div>

      {/* Actions Section */}
      <div className="flex items-center gap-4">
        {/* Language Selector */}
        <div className="hidden lg:flex items-center">
          <select className="block w-full py-1 text-sm font-medium text-slate-600 bg-transparent outline-none cursor-pointer hover:text-slate-900 transition-colors">
            <option value="en">EN</option>
            <option value="es">ES</option>
            <option value="fr">FR</option>
          </select>
        </div>

        {/* Divider */}
        <div className="h-5 w-px bg-slate-200 hidden lg:block"></div>

        {/* Notifications */}
        <button
          aria-label="View notifications"
          className="relative p-1.5 text-slate-500 hover:text-slate-900 transition-colors rounded-md hover:bg-slate-100"
        >
          <IoIosNotifications className="h-6 w-6" />
          {/* Static, professional indicator dot instead of a pulsing animation */}
          <span className="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full bg-red-600 ring-2 ring-white"></span>
        </button>

        {/* Divider */}
        <div className="h-5 w-px bg-slate-200"></div>

        {/* User Profile & Role */}
        <div className="relative">
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          >
            <div className="flex flex-col text-right sm:block">
              <span className="text-sm font-medium text-slate-900 leading-none mb-1">
                {currentUser?.name || currentUser?.email?.split('@')[0] || "Admin"}
              </span>
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                {currentUser?.role || "Administrator"}
              </span>
            </div>

            <div className="h-9 w-9 rounded-md bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 overflow-hidden group-hover:border-slate-300 transition-colors">
              {currentUser?.photoURL ? (
                <img src={currentUser.photoURL} alt="Profile" className="h-full w-full object-cover" />
              ) : (
                <span className="font-bold text-sm">
                  {(currentUser?.name || currentUser?.email || "A").charAt(0).toUpperCase()}
                </span>
              )}
            </div>
          </div>

          {/* Profile Dropdown Menu */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-slate-200 py-1 z-50">
              <button
                onClick={() => {
                  setShowProfileMenu(false);
                  logout();
                }}
                className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-slate-50 transition-colors"
              >
                <LogOut size={16} /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
