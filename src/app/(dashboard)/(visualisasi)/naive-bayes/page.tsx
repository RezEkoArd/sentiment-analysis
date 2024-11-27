import Table from "@/components/Table";
import { NaiveBayesData } from "@/lib/data";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";
import ChartPie from "@/components/ChartPie";
import ChartAkurasi from "@/components/ChartAkurasi";
import { title } from "process";


type Matrix = {
  id: number;
  klasifikasi: string;
  aktualPositif: number;
  aktualNegatif: number;
};

const columns = [
  {
    header: "No",
    accessor: "no",
  },
  {
    header: "Klasifikasi",
    accessor: "klasifikasi",
    className: "hidden md:table-cell",
  },
  {
    header: "Aktual Positif",
    accessor: "aktualPosifit",
    className: "hidden md:table-cell",
  },
  {
    header: "Aktual Negatif",
    accessor: "aktualNegatif",
    className: "hidden md:table-cell",
  },
];


const Page = () => {
  const renderRow = (item: Matrix, index: any) => (
    <tr
      key={index}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lightPurple"
    >
      <td className="flex items-center gap-4 p-4">
        <h3 className="font-semibold">{index + 1}</h3>
      </td>
      <td className="hidden md:table-cell">{item.klasifikasi}</td>
      <td className="hidden md:table-cell">{item.aktualPositif}</td>
      <td className="hidden md:table-cell">{item.aktualNegatif}</td>
    </tr>
  );

  return (
    <div className="p-4 flex gap-4 flex-col md:flex-row">
      <div className="w-full flex flex-col gap-8">
        {/* Table Mini  */}
        <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
          <h1 className="text-lg font-semibold">Matrix Klarifikasi NaiveBayes</h1>
          <Table columns={columns} renderRow={renderRow} data={NaiveBayesData} />
        </div>

        <div className=" p-4 rounded-md flex-1">
          {/* Title */}
          <div className=" flex justify-between items-center">
            <h1 className="text-lg font-semibold">
              {" "}
              Visualisasi Sentiment NaiveBayes
            </h1>
          </div>
          <div className="flex gap-8 flex-col lg:flex-row">
            {/* Chart Visual Sentiment  */}
            <div className="w-full lg:w-1/3 h-[450px]">
            <ChartPie title = "NaiveBayes"/>
            </div>
            {/*Chart Akurasi Sentiment  */}
            <div className="w-full lg:w-1/3 h-[450px]">
              <ChartAkurasi title = "NaiveBayes" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
