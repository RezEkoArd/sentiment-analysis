"use client";

import TableEmpty from "@/components/AlertEmpty";
import Table from "@/components/Table";
import { dataProps } from "@/lib/utils";
import {
  processData,
  ResultInitialProcess,
  splitData,
} from "@/util/random-forest";

import Image from "next/image";
import { useEffect, useState } from "react";

const columns = [
  {
    header: "Rating",
    accessor: "rating",
    className:
      "w-1/5 p-2 bg-yellow-200 items-center align-center text-center hidden md:table-cell",
  },
  {
    header: "ReviewLength",
    accessor: "reviewlength",
    className:
      "w-18 p-2  bg-yellow-200 items-center align-center text-center hidden md:table-cell",
  },
  {
    header: "UniqueWords",
    accessor: "uniquewords",
    className:
      "w-18 p-2 bg-yellow-200 items-center align-center text-center hidden md:table-cell",
  },
  {
    header: "label",
    accessor: "label",
    className:
      "w-18 p-2 bg-green-300 text-black items-center align-center text-center  hidden md:table-cell",
  },
];

const Page = () => {
  const [dataInitial, setDataInitial] = useState<ResultInitialProcess[]>([]);

  useEffect(() => {
    const x = localStorage.getItem("dataMining");
    if (x) {
      try {
        const analyzeData = () => {
          const parsedData: dataProps[] = JSON.parse(x);
          // Jalankan analisis data setelah dataTable di-set
          const initialProcess = processData(parsedData);

          const tableData = initialProcess.map((item) => ({
            rating: item.features.rating,
            reviewLength: item.features.reviewLength,
            uniqueWords: item.features.uniqueWords,
            label: item.label,
          }));
          localStorage.setItem("dataProcessData", JSON.stringify(initialProcess));
          setDataInitial(tableData);

          const { train, test } = splitData(tableData);

          // Simpan hasil split ke localStorage
          localStorage.setItem("trainData", JSON.stringify(train));
          localStorage.setItem("testData", JSON.stringify(test));
        };
        analyzeData();
        
      } catch (error) {
        console.error("Error parsing dataUji from localStorage:", error);
      }
    }
  }, []);

  const renderRow = (item: ResultInitialProcess, index: number) => (
    <tr
      key={index}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lightPurple"
    >
      {/* <td className="flex items-center gap-4 p-4">
        <h3 className="font-semibold">{index + 1}</h3>
      </td> */}
      <td className="text-center gap-4 p-4 hidden md:table-cell">
        {item.rating}
      </td>
      <td className="text-center hidden md:table-cell">{item.reviewLength}</td>
      <td className="text-center hidden md:table-cell">{item.uniqueWords}</td>
      <td className="text-center hidden md:table-cell">{item.label}</td>
    </tr>
  );
  return (
    <div className="p-4 flex gap-4 flex-col md:flex-row">
      {/* Table */}
      <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
        {/* top */}
        <div className="flex flex-row gap-4 items-cente justify-between">
          <div>
            <h1 className="hidden md:block text-lg font-semibold">
              Table Data Inisial Proses
            </h1>
            <p className="text-xs mt-2">
              data ini didaptkan dengan cara mengelompokkan data berdasarkan
              field yang diperlukan untuk random forest
            </p>
          </div>
          {/* <TableSearch /> */}

          <div className="flex items-center gap-4 ">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lightPurple">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
          </div>
        </div>

        {/* List */}
        {!dataInitial ? (
          <TableEmpty />
        ) : (
          <Table columns={columns} renderRow={renderRow} data={dataInitial} />
        )}
        {/* Pagination */}
        {/* <Pagination /> */}
      </div>
    </div>
  );
};

export default Page;
