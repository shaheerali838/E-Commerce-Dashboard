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

// 1. Upgraded E-Commerce Data
const salesData = [
  { month: "Jan", sales: 4000, visitors: 2400 },
  { month: "Feb", sales: 3000, visitors: 1398 },
  { month: "Mar", sales: 5000, visitors: 9800 },
  { month: "Apr", sales: 4780, visitors: 3908 },
  { month: "May", sales: 5890, visitors: 4800 },
  { month: "Jun", sales: 4390, visitors: 3800 },
  { month: "Jul", sales: 6490, visitors: 4300 },
];

export default function IndexLineChart() {
  return (
    <div className="w-full h-100 !focus:outline-none">
      {/* ResponsiveContainer makes the chart scale perfectly to its parent div */}
      <ResponsiveContainer className={"h-full w-full "}>
        <LineChart
          data={salesData}
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
            stroke="#6b7280"
            tick={{ fill: "#6b7280" }}
            // Formats the Y-axis numbers to look like currency (e.g., $4000)
            tickFormatter={(value) => `$${value}`}
          />

          {/* 2. Tooltip shows the details on hover! */}
          <Tooltip
            contentStyle={{
              backgroundColor: "#ffffff",
              borderRadius: "8px",
              border: "none",
              boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
            }}
            formatter={(value, name) => [
              name === "Total Sales" ? `$${value}` : value,
              name,
            ]}
          />

          <Legend wrapperStyle={{ paddingTop: "20px" }} />

          {/* 3. Fixed Line Colors using exact Hex Codes */}
          <Line
            type="monotone"
            dataKey="sales"
            name="Total Sales"
            stroke="#4f46e5" // Tailwind Indigo-600
            strokeWidth={3}
            activeDot={{ r: 8 }}
          />

          <Line
            type="monotone"
            dataKey="visitors"
            name="Store Visitors"
            stroke="#10b981" // Tailwind Emerald-500
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
