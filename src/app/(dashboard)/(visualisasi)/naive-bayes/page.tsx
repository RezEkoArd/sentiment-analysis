"use client";

import Table from "@/components/Table";

import ChartPie from "@/components/ChartPie";
import ChartAkurasi from "@/components/ChartAkurasi";
import { useEffect, useState } from "react";
import {
  calculatedAccuracy,
  ClassifierResult,
  ConfusionMatrix,
} from "@/lib/utils";
import TableEmpty from "@/components/AlertEmpty";
import TableMatrix from "@/components/TabpeMatrix";

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
  const [naiveBayesConfusionMatrix, setNaiveBayesConfusionMatrix] =
    useState<ConfusionMatrix | null>(null);
  const [accuracy, setAccuracy] = useState<number>(0);

  useEffect(() => {
    const x = localStorage.getItem("NaiveBayesResult");
    if (x) {
      try {
        const parsedData: ClassifierResult[] = JSON.parse(x);

        const generateConfusionMatrix = (
          predictions: string[],
          groundTruths: string[]
        ): ConfusionMatrix => {
          let TP = 0,
            TN = 0,
            FP = 0,
            FN = 0;

          predictions.forEach((prediction, index) => {
            const actual = groundTruths[index];
            if (prediction === "positif" && actual === "positif") TP++;
            else if (prediction === "negatif" && actual === "negatif") TN++;
            else if (prediction === "positif" && actual === "negatif") FP++;
            else if (prediction === "negatif" && actual === "positif") FN++;
          });

          return { TP, TN, FP, FN };
        };

        //Ambil Prediksi dan ground thruth
        const predictions = parsedData.map((result) => result.prediksi);
        const groundTruths = parsedData.map((result) => result.hasil);

        // Hitung Matriks konfusi dan set ke set
        const hasil = generateConfusionMatrix(predictions, groundTruths);

        // Hitung Accuracy
        const accuracy = calculatedAccuracy(hasil);
        setAccuracy(accuracy * 100);
        setNaiveBayesConfusionMatrix(hasil);
      } catch (error) {
        console.log(
          "Error parsing NaiveBayesResult from localStorage: ",
          error
        );
      }
    }
  }, []);

  const TP = naiveBayesConfusionMatrix?.TP;
  const TN = naiveBayesConfusionMatrix?.TN;
  console.log(naiveBayesConfusionMatrix);

  return (
    <div className="p-4 flex gap-4 flex-col md:flex-row">
      <div className="w-full flex flex-col gap-8">
        {/* Table Mini  */}
        <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0 flex flex-col gap-4">
          <h1 className="text-lg font-semibold">
            Matrix Klarifikasi NaiveBayes
          </h1>
          {!naiveBayesConfusionMatrix ? (
            <TableEmpty />
          ) : (
            <TableMatrix confusionMatrix={naiveBayesConfusionMatrix} />
          )}
          <h2>{`Akurasi Naive Bayes : ${accuracy.toFixed(2)}%`}</h2>
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
              <ChartPie
                title="NaiveBayes"
                aktualPositif={TP ?? 0}
                aktualNegatif={TN ?? 0}
              />
            </div>
            {/*Chart Akurasi Sentiment  */}
            <div className="w-full lg:w-1/3 h-[450px]">
              <ChartAkurasi
                title="NaiveBayes"
                TP={46}
                TN={1088}
                FP={10}
                FN={269}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
