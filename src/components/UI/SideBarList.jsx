import React, { useState } from "react";

const SideBarList = ({ lists, title, activePage, setActivePage }) => {
  return (
    <>
      <div className="w-full flex flex-col justify-center items-center border-b h-screen border-gray-300">
        {title ? (
          <h1 className="text-sm mt-8 font-bold text-gray-500 -ml-24">
            {title}
          </h1>
        ) : null}
        <ul className="mt-5  pb-2 flex flex-col items-start">
          {lists.map((tabs, index) => (
            <li
              className={`mb-3 cursor-pointer px-4 py-2 rounded-lg font-semibold transition-all uppercase ${
                activePage === tabs
                  ? "bg-indigo-500 text-white shadow"
                  : "text-gray-800 hover:bg-gray-200 hover:text-gray-800"
              } `}
              key={index}
              onClick={() => setActivePage(tabs)}
            >
              {tabs}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default SideBarList;
