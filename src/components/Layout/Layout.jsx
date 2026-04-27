import React from "react";
import DataCard from "../DataCard";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import Dashboard from "../../pages/Dashboard";
import { Outlet } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <>
      <div className="grid grid-cols-12 grid-rows-12 gap-0  bg-[#F5F6FA]">
        <div className="col-span-12 col-start-3 row-start-1 bg-white">
          <Navbar />
        </div>
        <div className="col-span-2 row-span-12 col-start-1 row-start-1 bg-white ">
          <Sidebar />
        </div>
        <div className="col-span-12 row-span-11 col-start-4 row-start-2 p-3 mt-2">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;
