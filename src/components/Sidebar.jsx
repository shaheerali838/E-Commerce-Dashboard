import React from "react";
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
const Sidebar = ({ activePage, setActivePage }) => {
  return (
    <>
      <aside className="flex flex-col  w-full align-center items-center h-screen column">
        <div className="logo  mt-2 mb-2  text-xs  md:text-3xl">
          <h1>E-Commerce</h1>
        </div>

        <SideBarList
          lists={main}
          activePage={activePage}
          setActivePage={setActivePage}
        />
        <SideBarList
          title={"Pages"}
          lists={pages}
          activePage={activePage}
          setActivePage={setActivePage}
        />
        <SideBarList
          lists={settings}
          activePage={activePage}
          setActivePage={setActivePage}
        />
      </aside>
    </>
  );
};

export default Sidebar;
