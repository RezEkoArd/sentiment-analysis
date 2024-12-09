"use client";
import TableEmpty from "@/components/AlertEmpty";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import { ClassifierResult, classifyNaiveBayes, dataProps } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";

const columns = [
  {
    header: "No",
    accessor: "no",
    className: "w-16 p-2",
  },
  {
    header: "Ulasan",
    accessor: "ulasan",
    className: "w-2/3 p-2  hidden md:table-cell",
  },
  {
    header: "Prediksi",
    accessor: "prediksi",
    className: "w-18 p-2 hidden md:table-cell",
  },
  {
    header: "Hasil",
    accessor: "hasil",
    className: "w-18 p-2  hidden md:table-cell",
  },
];

const Page = () => {
  const [naiveBayesResults, setNaiveBayesResults] = useState<
    ClassifierResult[]
  >([]);
  const [akurasiNB, setAkurasiNB] = useState<number>(0);

  useEffect(() => {
    const x = localStorage.getItem("dataTraining");
    console.log(x)
    if (x) {
      try {
        const parsedData: dataProps[] = JSON.parse(x);
        // Jalankan analisis data setelah dataTable di-set
        const analyzeData = () => {
          const nbResults = parsedData.map((review) => ({
            ulasan: review["Review Text"],
            prediksi: classifyNaiveBayes(parsedData, review["Review Text"]),
            hasil: review.sentimen,
          }));

          setNaiveBayesResults(nbResults);
          localStorage.setItem("NaiveBayesResult", JSON.stringify(nbResults));

          // Akurasi
          const correctPredictions = nbResults.filter(
            (result) => result.prediksi === result.hasil
          ).length;

          const accuracy =
            nbResults.length > 0
              ? (correctPredictions / nbResults.length) * 100
              : 0;

          setAkurasiNB(accuracy);
        };
      
        analyzeData();
      } catch (error) {
        console.error("Error parsing dataUji from localStorage:", error);
      }
    }
  }, []);

  const renderRow = (item: ClassifierResult, index: number) => (
    <tr
      key={index}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lightPurple"
    >
      <td className="flex items-center gap-4 p-4">
        <h3 className="font-semibold">{index + 1}</h3>
      </td>
      <td className="hidden md:table-cell">{item.ulasan}</td>
      <td className="hidden md:table-cell">{item.prediksi}</td>
      <td className="hidden md:table-cell">{item.hasil}</td>
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
            <h2>{`Akurasi Naive Bayes: ${akurasiNB.toFixed(2)}%`}</h2>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lightPurple">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
          </div>
        </div>

        {/* List */}
        {!naiveBayesResults ? (
          <TableEmpty />
        ) : (
          <Table
            columns={columns}
            renderRow={renderRow}
            data={naiveBayesResults}
          />
        )}
        {/* Pagination */}
        {/* <Pagination /> */}
      </div>
    </div>
  );
};

export default Page;
