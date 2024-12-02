"use client";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableEmpty from "@/components/AlertEmpty";
import TableSearch from "@/components/TableSearch";
import { DataLatih } from "@/lib/data";
import Image from "next/image";
import { useEffect, useState } from "react";

type dataProps = {
  Date: string;
  Username: string;
  Rating: number;
  "Review Text": string;
  cleaning: string;
  case_folding: string;
  normalisasi: string;
  tokenize: string;
  "stopword removal": string;
  stemming_data: string;
  sentimen: string;
};

const columns = [
  {
    header: "No",
    accessor: "no",
    className: "w-16 p-2",
  },
  {
    header: "Username",
    accessor: "username",
    className: "w-36 p-2 hidden sm:table-cell",
  },
  {
    header: "Komentar",
    accessor: "komentar",
    className: "w-18 p-2 hidden sm:table-cell",
  },
  {
    header: "Sentiment",
    accessor: "sentiment",
    className: "w-24 p-2 hidden sm:table-cell",
  },
];

const Page = () => {
  const renderRow = (item: dataProps, index: number) => (
    <tr
      key={index}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lightPurple"
    >
      <td className="flex items-center gap-4 p-4">
        <h3 className="font-semibold">{index + 1}</h3>
      </td>
      <td className="hidden md:table-cell">{item.Username}</td>
      <td className="hidden md:table-cell">{item["Review Text"]}</td>
      <td className="hidden md:table-cell">{item.sentimen}</td>
    </tr>
  );

  const [dataTable, setDataTable] = useState<dataProps[] | null>(null);

  useEffect(() => {
    const x = localStorage.getItem("dataUji");
    if(x) {
      try {
        const parsedData: dataProps[] = JSON.parse(x);
        setDataTable(parsedData);
      } catch (error) {
        console.error("Error parsing dataUji from localStorage:", error);
        setDataTable(null);
      }
    }
  },[]);


  return (
    <div className="p-4 flex gap-4 flex-col md:flex-row">
      {/* Table */}
      <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
        {/* top */}
        <div className="flex flex-row gap-4 items-center justify-between">
          <h1 className="hidden md:block text-lg font-semibold">Data Uji</h1>
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lightPurple">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
          </div>
        </div>

        {/* List */}
        {!dataTable ? (
          <TableEmpty />
        ) : (
        <Table columns={columns} renderRow={renderRow} data={dataTable} />
        )}
        {/* Pagination */}
        <Pagination />
      </div>
    </div>
  );
};

export default Page;
