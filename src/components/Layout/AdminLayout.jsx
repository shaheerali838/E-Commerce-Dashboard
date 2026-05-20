import React from "react";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <>
      <div className="grid grid-cols-12 grid-rows-12 gap-0 bg-[#F5F6FA] h-screen!">
        <div className="col-span-12 bg-white ">
          <Navbar />
        </div>
        <div className="col-span-2 row-span-11 row-start-2  bg-white overflow-y-auto">
          <Sidebar />
        </div>
        <div className="col-span-10 row-span-11 col-start-3 row-start-2  overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
