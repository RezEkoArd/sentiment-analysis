"use client";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  LabelProps,
} from "recharts";

interface DataEntry {
  name: string;
  value: number;
}

interface CustomizedLabelProp extends LabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  index: number;
}

interface ChartAkurasi {
  title: String;
}

const data: DataEntry[] = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
];

const COLORS = ["#0088FE", "#00C49F"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}: CustomizedLabelProp) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
const ChartAkurasi = ({title} : ChartAkurasi) => {
  return (
    <div className="bg-white rounded-xl w-full h-full p-4">
      {/* Title */}
      <div className="flex justify-between items-center">
        <h1>Akurasi Sentiment {title}</h1>
      </div>
      {/* Chart */}
      <div className="w-full h-[75%]">
        <ResponsiveContainer>
          <PieChart width={600} height={600}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      {/* Bottom */}
      <div className="flex justify-center gap-16">
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-center gap-2">
            <div className="w-5 h-5 bg-[#0088FE] rounded-full" />
            <h2 className="text-xs text-gray-500"> (55%)</h2>
          </div>
          <h1 className="font-bold">Sesuai</h1>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-center gap-2">
            <div className="w-5 h-5 bg-[#00C49F] rounded-full" />
            <h2 className="text-xs text-gray-500"> (43%)</h2>
          </div>

          <h1 className="font-bold">Tidak Sesuai</h1>
        </div>
      </div>
    </div>
  );
};

export default ChartAkurasi;
