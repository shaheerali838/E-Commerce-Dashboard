import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import PublicNavbar from "./PublicNavbar";
import PublicSidebar from "./PublicSidebar";

const PublicLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <PublicNavbar onOpenSidebar={() => setIsSidebarOpen(true)} />
      <PublicSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <main className="grow">
        <Outlet />
      </main>

      <footer className="py-8 px-6 bg-white border-t border-slate-200 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
             <div className="w-6 h-6 bg-slate-900 rounded flex items-center justify-center text-white text-[10px] font-bold">EC</div>
             <span className="font-semibold text-slate-800">E-Commerce Store</span>
          </div>
          <p className="text-sm text-slate-500 font-medium">
            &copy; {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;
