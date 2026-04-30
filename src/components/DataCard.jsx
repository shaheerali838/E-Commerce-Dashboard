import React from "react";

const DataCard = ({ title, value, icons, description }) => {
  return (
    <>
      <div className="w-[22%] p-4 h-37.5 rounded-2xl bg-white">
        <div className="grid grid-cols-4 grid-rows-4 gap-0 h-full">
          <div className="col-span-3 row-span-3">
            <div className="flex flex-col justify-between items-start h-16">
              <h2 className="text-sm text-gray-500 font-bold">{title}</h2>
              <h2 className="text-2xl font-bold">{value}</h2>
            </div>
          </div>
          <div className="row-span-3 col-start-4 flex justify-center items-start">
            <i className="text-4xl">{icons}</i>
          </div>
          <div className="col-span-4 row-start-4">
            <h1 className="text-sm font-bold">{description}</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default DataCard;
