import React from "react";
import SideBarList from "./UI/SideBarList";
import { useNavigate } from "react-router-dom";

const main = [
  "Dashboard",
  "Products",
  "Inbox",
  "Order Lists",
  "Product Stock",
];
const pages = [
  "Pricing",
  "Calendar",
  "To-Do",
  "Contact",
  "Invoice",
  "UI Elements",
  "Team",
  "Table",
];
const settings = ["Settings", "Login"];

const Sidebar = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
      <aside className="flex flex-col w-full align-center items-center h-full column border-r border-gray-200 bg-white shadow-sm">
        <SideBarList lists={main} onNavigate={handleNavigate} />
        <SideBarList
          title={"Pages"}
          lists={pages}
          onNavigate={handleNavigate}
        />
        <SideBarList lists={settings} onNavigate={handleNavigate} />
      </aside>
  );
};

export default Sidebar;
