import React from "react";
import DataCard from "../DataCard";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import Dashboard from "../../pages/Dashboard";
import { Outlet } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <>
      <div className="grid grid-cols-12 grid-rows-12 gap-0 bg-[#F5F6FA]">
        <div className="col-span-12 bg-white ">
          <Navbar />
        </div>
        <div className="col-span-2 row-span-11 row-start-2 bg-white ">
          <Sidebar />
        </div>
        <div className="col-span-10 row-span-11 col-start-3 row-start-2">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;
