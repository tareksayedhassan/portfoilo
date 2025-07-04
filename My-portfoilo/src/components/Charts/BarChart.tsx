import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartTooltipContent } from "../ui/chart";
type ChartProps = {
  data: any[];
  children?: React.ReactNode;
};
const BarChartComponent: React.FC<ChartProps> = ({ data }) => {
  const ChartTooltipContent = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const { month, users } = payload[0].payload;
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg w-44">
          <h4 className="text-blue-500 text-lg font-semibold mb-2">{month}</h4>
          <p className="text-gray-700 text-sm">Users: {users}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <YAxis />
        <Tooltip content={<ChartTooltipContent />} />
        <Bar dataKey="users" fill="#2563eb" radius={4} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;
