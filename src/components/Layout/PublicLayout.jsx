import React from "react";
import { Outlet } from "react-router-dom";
// You will eventually create a PublicNavbar, but for now, we'll use a placeholder
// import PublicNavbar from "../PublicNavbar";

const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* <PublicNavbar /> */}
      <header className="p-4 border-b">
        <h1 className="text-xl font-bold">My E-Commerce Store</h1>
      </header>

      <main className="grow">
        {/* This is where the Home, Shop, and Cart pages will render */}
        <Outlet />
      </main>

      <footer className="p-4 bg-gray-100 text-center">
        <p>&copy; 2026 E-Commerce. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default PublicLayout;
