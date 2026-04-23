import { React, useState } from "react";
import SideBarList from "./UI/SideBarList";

let main = [
  "Dashboard",
  "Products",
  "Favorites",
  "Inbox",
  "Order Lists",
  "Product Stock",
];
let pages = [
  "Pricing",
  "Calendar",
  "To-Do",
  "Contact",
  "Invoice",
  "UI Elements",
  "Team",
  "Table",
];
let settings = ["Settings", "Login"];
const Sidebar = () => {
  const [isActive, setIsActive] = useState("Dashboard");

  return (
    <>
      <aside className="flex flex-col  w-full align-center items-center h-screen column">
        <div className="logo  mt-2 mb-2  text-xs  md:text-3xl">
          <h1>E-Commerce</h1>
        </div>

        <SideBarList
          lists={main}
          isActive={isActive}
          setIsActive={setIsActive}
        />
        <SideBarList
          title={"Pages"}
          lists={pages}
          isActive={isActive}
          setIsActive={setIsActive}
        />
        <SideBarList
          lists={settings}
          isActive={isActive}
          setIsActive={setIsActive}
        />
      </aside>
    </>
  );
};

export default Sidebar;
