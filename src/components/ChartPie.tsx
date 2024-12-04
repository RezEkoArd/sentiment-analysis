"use client";
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
} from "recharts";




interface ChartPieProps {
  title: String;
  aktualPositif: number;
  aktualNegatif: number;
}


const ChartPie = ({title , aktualPositif , aktualNegatif} : ChartPieProps) => {

  const total = aktualPositif + aktualNegatif;

  const data = [
    {
      name: "Total",
      count: total,
      fill: "white",
    },
    {
      name: "Aktual Positif",
      count: aktualPositif,
      fill: "#8884d8",
    },
    {
      name: "Aktual Negatif",
      count: aktualNegatif,
      fill: "#83a6ed",
    },
  ];

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
            <h2 className="text-xs text-gray-500">{aktualPositif}</h2>
          </div>
          <h1 className="font-bold">Aktual Positif</h1>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-center gap-2">
            <div className="w-5 h-5 bg-[#83a6ed] rounded-full" />
            <h2 className="text-xs text-gray-500"> {aktualNegatif}</h2>
          </div>
          <h1 className="font-bold">Aktual Negatif</h1>
        </div>
      </div>
    </div>
  );
};

export default ChartPie;
