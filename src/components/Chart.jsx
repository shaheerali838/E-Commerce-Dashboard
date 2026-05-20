import { useMemo } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function IndexLineChart({ orders = [] }) {
  // Aggregate revenue by month for the last 6 months
  const chartData = useMemo(() => {
    const dataMap = {};
    const now = new Date();
    
    // Initialize last 6 months with 0
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const month = d.toLocaleString("default", { month: "short" });
      dataMap[month] = { month, sales: 0, orders: 0 };
    }

    orders.forEach((order) => {
      if (!order.createdAt) return;
      // Convert firestore timestamp or iso string to Date
      const date = order.createdAt?.toDate ? order.createdAt.toDate() : new Date(order.createdAt);
      
      // If order is older than 6 months, skip
      if (now - date > 6 * 30 * 24 * 60 * 60 * 1000) return;

      const month = date.toLocaleString("default", { month: "short" });
      if (dataMap[month]) {
        dataMap[month].sales += Number(order.totalAmount) || 0;
        dataMap[month].orders += 1;
      }
    });

    return Object.values(dataMap);
  }, [orders]);

  return (
    <div className="w-full h-96 !focus:outline-none">
      <ResponsiveContainer className={"h-full w-full"}>
        <LineChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid
            stroke="#e5e7eb"
            strokeDasharray="5 5"
            vertical={false}
          />
          <XAxis
            dataKey="month"
            stroke="#6b7280"
            tick={{ fill: "#6b7280" }}
            tickMargin={10}
          />
          <YAxis
            yAxisId="left"
            stroke="#6b7280"
            tick={{ fill: "#6b7280" }}
            tickFormatter={(value) => `$${value}`}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            stroke="#6b7280"
            tick={{ fill: "#6b7280" }}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "#ffffff",
              borderRadius: "8px",
              border: "1px solid #f3f4f6",
              boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
            }}
            formatter={(value, name) => [
              name === "Total Revenue" ? `$${Number(value).toFixed(2)}` : value,
              name,
            ]}
          />
          <Legend wrapperStyle={{ paddingTop: "20px" }} />

          <Line
            yAxisId="left"
            type="monotone"
            dataKey="sales"
            name="Total Revenue"
            stroke="#8b5cf6" // Purple
            strokeWidth={3}
            activeDot={{ r: 8 }}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="orders"
            name="Orders Count"
            stroke="#10b981" // Emerald
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
