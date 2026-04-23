import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar.jsx";
import DataCard from "../components/DataCard.jsx";
import Layout from "./Layout.jsx";

const Dashboard = () => {
  return (
    <>
      <div className="grid grid-cols-12 grid-rows-12">
        <div className="col-span-2 row-span-12 col-start-1">
          <Sidebar />
        </div>
        <div className="col-span-10 col-start-3">
          <Navbar />
        </div>
        <div className="col-span-10 row-span-11 h-screen col-start-3 row-start-2 bg-[#F5F6FA]">
          <Layout />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
