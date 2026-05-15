import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SideBarList = ({ lists, title }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const formatPath = (name) =>
    `/admin/${name.toLowerCase().replace(/\s+/g, "-")}`;

  import { db } from "../firebase/config";
  import { collection, addDoc } from "firebase/firestore";
  import { sampleProducts } from "../data/sampleProducts";

  export const seedDatabase = async () => {
    try {
      const productsCollection = collection(db, "products");

      // Loop through the sample products and add each to Firestore
      for (const product of sampleProducts) {
        await addDoc(productsCollection, product);
      }

      alert("Database seeded successfully with sample products!");
    } catch (error) {
      console.error("Error seeding database: ", error);
      alert("Failed to seed database. Check console for errors.");
    }
  };

  return (
    <>
      <div className="w-full flex flex-col justify-center items-center border-b h-fit border-gray-300">
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
                  formatPath(tabs) === location.pathname && isActive
                    ? "bg-indigo-500 text-white shadow"
                    : "text-gray-800 hover:bg-gray-200 hover:text-gray-800"
                }`}
                onClick={() => navigate(targetPath)}
              >
                {tabs}
              </li>
            );
          })}
        </ul>
        <button onClick={seedDatabase}>Seed Database</button>
      </div>
    </>
  );
};

export default SideBarList;
