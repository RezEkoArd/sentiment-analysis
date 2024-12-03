"use client";
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Total",
    count: 100,
    fill: "white",
  },
  {
    name: "Girls",
    count: 44,
    fill: "#8884d8",
  },
  {
    name: "Boys",
    count: 56,
    fill: "#83a6ed",
  },
];


interface ChartPieProps {
  title: String;
}
const ChartPie = ({title} : ChartPieProps) => {
  return (
    <div className="bg-white rounded-xl w-full h-full p-4">
      {/* TITLE */}
      <div className="flex justify-between items-center">
        <h1 className="font-light text-slate-700 text-md">
          Visualisasi Distribusi Aktual {title}
        </h1>
      </div>
      {/* Chart */}
      <div className="w-full h-[75%]">
        <ResponsiveContainer>
          <RadialBarChart
            innerRadius="10%"
            outerRadius="80%"
            barSize={34}
            data={data}
          >
            <RadialBar
              // label={{ position: "insideStart", fill: "#fff" }}
              background
              dataKey="count"
            />
          </RadialBarChart>
        </ResponsiveContainer>
      </div>
      {/* Bottom */}
      <div className="flex justify-center gap-16">
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-center gap-2">
            <div className="w-5 h-5 bg-[#8884d8] rounded-full" />
            <h2 className="text-xs text-gray-500"> (45%)</h2>
          </div>
          <h1 className="font-bold">Positif</h1>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-center gap-2">
            <div className="w-5 h-5 bg-[#83a6ed] rounded-full" />
            <h2 className="text-xs text-gray-500"> (55%)</h2>
          </div>
          <h1 className="font-bold">Negatif</h1>
        </div>
      </div>
    </div>
  );
};

export default ChartPie;
