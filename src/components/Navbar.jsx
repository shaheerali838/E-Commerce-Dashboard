import React from "react";
import { IoIosNotifications } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { CiSearch } from "react-icons/ci";

const Navbar = () => {
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
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="flex flex-col text-right sm:block">
            <span className="text-sm font-medium text-slate-900 leading-none mb-1">
              Shaheer Ali
            </span>
            <select className="text-[11px] font-semibold text-slate-500 bg-transparent outline-none cursor-pointer group-hover:text-blue-600 transition-colors uppercase tracking-wider">
              <option value="admin">Administrator</option>
              <option value="user">Standard User</option>
            </select>
          </div>

          {/* Square avatar container looks more corporate than a full circle */}
          <div className="h-9 w-9 rounded-md bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 overflow-hidden group-hover:border-slate-300 transition-colors">
            <CgProfile className="h-6 w-6 mt-1" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
