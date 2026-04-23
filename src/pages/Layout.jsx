import React, { useState } from "react";
import DataCard from "../components/DataCard";

const Layout = () => {
  const [Heading, setHeading] = useState("Dasboard");

  return (
    <>
      <div className="relative">
        <div className="absolute top-10 left-15">
          <h2 className="text-2xl font-bold text-gray-800">{Heading}</h2>
        </div>
      </div>
    </>
  );
};

export default Layout;
