import React, { useEffect, useState } from "react";
import DataCard from "../../components/DataCard";
import { CgProfile } from "react-icons/cg";
import { FaBoxOpen } from "react-icons/fa";
import { FaChartLine } from "react-icons/fa6";
import { TfiReload } from "react-icons/tfi";
import IndexLineChart from "../../components/Chart";
import DealsDetails from "../../components/DealsDetails";
import { useOrderList } from "../../hooks/useOrderList";
import { useProductStock } from "../../hooks/useProductStock";
import { collection, getCountFromServer } from "firebase/firestore";
import { db } from "../../firebase/config";
import { Loader2 } from "lucide-react";

const Dashboard = () => {
  const { orders, loading: ordersLoading } = useOrderList();
  const { products, loading: productsLoading } = useProductStock();
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    getCountFromServer(collection(db, "users"))
      .then((snap) => setUserCount(snap.data().count))
      .catch(console.error);
  }, []);

  if (ordersLoading || productsLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[500px] text-gray-400">
        <Loader2 size={36} className="animate-spin mb-3 text-blue-500" />
        <p className="text-sm">Loading dashboard data…</p>
      </div>
    );
  }

  // Calculate metrics
  const totalRevenue = orders.reduce((sum, o) => sum + (Number(o.totalAmount) || 0), 0);
  const pendingCount = orders.filter((o) => o.status === "Pending" || o.status === "Processing").length;

  return (
    <div className="pl-15 pt-5 pr-15 pb-10 w-full flex flex-col justify-center gap-8 bg-gray-50 min-h-screen">
      <div className="text-2xl font-bold text-gray-900">
        <h1>Dashboard Overview</h1>
      </div>
      
      <div className="flex w-full justify-around gap-5 flex-wrap">
        <DataCard
          title="Total Users"
          value={userCount.toLocaleString()}
          icons={<CgProfile className="text-blue-500" />}
          description="Registered accounts"
        />
        <DataCard
          title="Total Orders"
          value={orders.length.toLocaleString()}
          icons={<FaBoxOpen className="text-emerald-500" />}
          description="All time orders"
        />
        <DataCard
          title="Total Revenue"
          value={`$${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          icons={<FaChartLine className="text-purple-500" />}
          description="All time sales"
        />
        <DataCard
          title="Pending Orders"
          value={pendingCount.toLocaleString()}
          icons={<TfiReload className="text-orange-500" />}
          description="Needs processing"
        />
      </div>

      <div className="w-full bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="font-bold text-lg text-gray-800 mb-4 ml-2">Revenue Overview</h3>
        <IndexLineChart orders={orders} />
      </div>

      <div className="w-full">
        <DealsDetails orders={orders} />
      </div>
    </div>
  );
};

export default Dashboard;
