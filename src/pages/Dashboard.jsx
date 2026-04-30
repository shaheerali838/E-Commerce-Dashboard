import React, { useState } from "react";
import DataCard from "../components/DataCard";
import { CgProfile } from "react-icons/cg";
import { FaBoxOpen } from "react-icons/fa";
import { FaChartLine } from "react-icons/fa6";
import { TfiReload } from "react-icons/tfi";
import IndexLineChart from "../components/Chart";

const reloadIcon = <TfiReload />;
const chartIcon = <FaChartLine />;
const boxIcon = <FaBoxOpen />;
const profileIcon = <CgProfile />;

const Dashboard = () => {
  return (
    <>
      <div className="pl-15 pt-5 w-full flex flex-col justify-center gap-8">
        <div className="text-2xl font-bold">
          <h1>Dashboard</h1>
        </div>
        <div className="flex w-full justify-start gap-5  flex-wrap">
          <DataCard
            title={"Total Users"}
            value={"1000"}
            icons={profileIcon}
            description={"this is description"}
          />
          <DataCard
            title={"Total Orders"}
            value={"888"}
            icons={boxIcon}
            description={"this is description"}
          />
          <DataCard
            title={"Total Sales"}
            value={"$5000"}
            icons={chartIcon}
            description={"this is description"}
          />
          <DataCard
            title={"total Pending"}
            value={"500"}
            icons={reloadIcon}
            description={"this is description"}
          />
        </div>

        <div className="w-full h-full outline-none pr-15">
          <IndexLineChart />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
