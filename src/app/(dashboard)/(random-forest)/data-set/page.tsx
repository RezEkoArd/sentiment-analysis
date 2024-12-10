"use client";

import TableEmpty from "@/components/AlertEmpty";
import Table from "@/components/Table";
import { dataProps } from "@/lib/utils";

import Image from "next/image";
import { useEffect, useState } from "react";

const columns = [

  {
    header: "Rating",
    accessor: "rating",
    className:
      "w-18 p-2 text-black bg-slate-200  items-center align-center text-center hidden md:table-cell",
  },
  {
    header: "Review text",
    accessor: "reviewtext",
    className:
      "w-18 p-2 text-black bg-slate-200  items-center align-center text-center hidden md:table-cell",
  },
  {
    header: "Username",
    accessor: "username",
    className:
      "w-18 p-2 text-black  bg-slate-200  items-center align-center text-center hidden md:table-cell",
  },

  {
    header: "Case_folding",
    accessor: "case_folding",
    className:
      "w-18 p-2 text-black bg-slate-200  items-center align-center text-center  hidden md:table-cell",
  },
  {
    header: "Cleaning",
    accessor: "cleaning",
    className:
      "w-18 p-2 text-black bg-slate-200  items-center align-center text-center  hidden md:table-cell",
  },
  {
    header: "Normalisasi",
    accessor: "normalisasi",
    className:
      "w-18 p-2 text-black bg-slate-200  items-center align-center text-center  hidden md:table-cell",
  },
  {
    header: "Sentimen",
    accessor: "sentimen",
    className:
      "w-18 p-2 text-black bg-slate-200  items-center align-center text-center  hidden md:table-cell",
  },
  {
    header: "Stemming_data",
    accessor: "Stemming Data",
    className:
      "w-18 p-2 text-black bg-slate-200  items-center align-center text-center  hidden md:table-cell",
  },
  {
    header: "Stopword_removal",
    accessor: "stopword removal",
    className:
      "w-18 p-2 text-black bg-slate-200  items-center align-center text-center  hidden md:table-cell",
  },
  {
    header: "Tokenize",
    accessor: "tokenize",
    className:
      "w-18 p-2 text-black bg-slate-200  items-center align-center text-center  hidden md:table-cell",
  },
];

const Page = () => {
  const [dataSet, setDataSet] = useState<dataProps[]>([]);

  useEffect(() => {
    const x = localStorage.getItem("dataMining");
    if (x) {
      try {
        const analyzeData = () => {
          const parsedData: dataProps[] = JSON.parse(x);
          setDataSet(parsedData);
        };
        analyzeData();
      } catch (error) {
        console.error("Error parsing dataUji from localStorage:", error);
      }
    }
  }, []);

  const renderRow = (item: dataProps, index: number) => (
    <tr
      key={index}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lightPurple"
    >
      <td className="text-center hidden md:table-cell">{item.Rating}</td>
      <td className="text-center hidden md:table-cell">
        {item["Review Text"]}
      </td>
      <td className="text-center hidden md:table-cell">{item.Username}</td>
      <td className="text-center hidden md:table-cell">{item.case_folding}</td>
      <td className="text-center hidden md:table-cell">{item.cleaning}</td>
      <td className="text-center hidden md:table-cell">{item.normalisasi}</td>
      <td className="text-center hidden md:table-cell">{item.sentimen}</td>
      <td className="text-center hidden md:table-cell">{item.stemming_data}</td>
      <td className="text-center hidden md:table-cell">
        {item["stopword removal"]}
      </td>
      <td className="text-center hidden md:table-cell">{item.tokenize}</td>
    </tr>
  );
  return (
    <div className="p-4 flex gap-4 flex-col md:flex-row ">
      {/* Table */}
      <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
        {/* top */}
        <div className="flex flex-row gap-4 items-cente justify-between">
          <div>
            <h1 className="hidden md:block text-lg font-semibold">
              Table Data Set
            </h1>
            <p className="text-xs mt-2">data ini adalah data mentah</p>
          </div>
          {/* <TableSearch /> */}

          <div className="flex items-center gap-4 ">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lightPurple">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
          </div>
        </div>

        {/* List */}
        {!dataSet ? (
          <TableEmpty />
        ) : (
          <Table columns={columns} renderRow={renderRow} data={dataSet} />
        )}
        {/* Pagination */}
        {/* <Pagination /> */}
      </div>
    </div>
  );
};

export default Page;
