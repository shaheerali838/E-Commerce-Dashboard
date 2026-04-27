import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SideBarList = ({ lists, title }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const formatPath = (name) => `/${name.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <>
      <div className="w-full flex flex-col justify-center items-center border-b h-screen border-gray-300">
        {title && (
          <h1 className="text-sm mt-8 font-bold text-gray-500 -ml-24">
            {title}
          </h1>
        )}
        <ul className="mt-5  pb-2 flex flex-col items-start">
          {lists.map((tabs, index) => {
            const targetPath = formatPath(tabs);
            const isActive = location.pathname === targetPath;

            return (
              <li
                key={index}
                className={`mb-3 cursor-pointer px-4 py-2 rounded-lg font-semibold transition-all uppercase ${
                  formatPath(tabs) === tabs
                    ? "bg-indigo-500 text-white shadow"
                    : "text-gray-800 hover:bg-gray-200 hover:text-gray-800"
                } `}
                onClick={() => navigate(targetPath)}
              >
                {tabs}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default SideBarList;
