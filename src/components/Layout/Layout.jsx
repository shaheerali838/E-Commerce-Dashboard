import React, { useState } from "react";
import DataCard from "../DataCard";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import Dashboard from "../../pages/Dashboard";

const Layout = ({ children }) => {
  const [activePage, setActivePage] = useState("Dashboard");
  return (
    <>
      <div className="grid grid-cols-12 grid-rows-12 gap-0">
        <div className="col-span-9 col-start-4 row-start-1">
          <Sidebar activePage={activePage} setActivePage={setActivePage} />
        </div>
        <div className="col-span-3 row-span-12 col-start-1 row-start-1">
          <Navbar />
        </div>
        <div className="col-span-9 row-span-11 col-start-4 row-start-2">
          {/* <Dashboard activePage={activePage} /> */}
          <children />
        </div>
      </div>
    </>
  );
};

export default Layout;
