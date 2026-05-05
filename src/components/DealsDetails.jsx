import React from "react";

const DealsDetails = () => {
  return (
    <>
      <div className="w-full bg-white p-4">
        <div className=" w-full bg-white rounded-lg flex justify-between items-center pl-3 pr-3">
          <h4 className="text-2xl font-bold text-gray-900 py-3 px-3">
            Deals Details
          </h4>
          <select
            name="month"
            id="month"
            className="text-lg py-2 px-4 outline-none rounded-xl bg-gray-100 "
          >
            <option value="">This Month</option>
            <option value="">Last Month</option>
            <option value="">This Year</option>
          </select>
        </div>

        <table className="w-[95%] mx-auto rounded-lg overflow-hidden">
          <thead className="bg-gray-200 rounded-2xl text-center mb-3 ">
            <tr className="rounded-lg [&_th]:py-2 ">
              <th className="">Product Name</th>
              <th className="">Location</th>
              <th className="">Date - Time</th>
              <th className="">Piece</th>
              <th className="">Amount</th>
              <th className="">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white rounded-lg text-center">
            <tr>
              <td className="px-2"></td>
              <td className="px-2">Location</td>
              <td className="px-2">Date - Time</td>
              <td className="px-2">Piece</td>
              <td className="px-2">Amount</td>
              <td className="px-2">Status</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DealsDetails;
