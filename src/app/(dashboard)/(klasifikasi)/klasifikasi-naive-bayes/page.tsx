"use client";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import Image from "next/image";
import { useState } from "react";
import { getDataFromLocalStorage, trainNaiveBayes } from "@/lib/NaiveBayes";

type dataLatihProps = {
  Date: number;
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
  },
  {
    header: "Username",
    accessor: "username",
    classname: "hidden md:table-cell",
  },
  {
    header: "Komentar",
    accessor: "komentar",
    classname: "hidden md:table-cell",
  },
  {
    header: "Sentiment",
    accessor: "sentiment",
    classname: "hidden md:table-cell",
  },
];

const Page = () => {
  const [result, setResult] = useState<string>("");

  const analyzeText = (text: string) => {
    const data = getDataFromLocalStorage();
    const naiveBayesModel = trainNaiveBayes(data);
    const sentiment = naiveBayesModel.classify(text);
    setResult(sentiment);
  };

  const renderRow = (item: dataLatihProps, index: number) => (
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
  return (
    <div className="p-4 flex gap-4 flex-col md:flex-row">
      {/* Table */}
      <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
        {/* top */}
        <div className="flex flex-row gap-4 items-cente justify-between">
          <h1 className="hidden md:block text-lg font-semibold">
            Klasifikasi Naive Bayes
          </h1>
          {/* <TableSearch /> */}

          <div className="flex items-center gap-4 ">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lightPurple">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
          </div>
        </div>

        {/* List */}

        <div>
          <textarea
            id="reviewText"
            placeholder="Masukkan teks ulasan di sini..."
          />
          <button
            onClick={() => {
              const text = (
                document.getElementById("reviewText") as HTMLTextAreaElement
              ).value;
              analyzeText(text);
            }}
          >
            Analisis Sentimen
          </button>
          {result && <p>Hasil Sentimen: {result}</p>}
        </div>

        {/* <Table columns={columns} renderRow={renderRow} data={DataLatih} /> */}
        {/* Pagination */}
        <Pagination />
      </div>
    </div>
  );
};

export default Page;
