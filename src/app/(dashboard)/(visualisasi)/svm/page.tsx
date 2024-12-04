"use client";
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

const Page = () => {
  const [svmConfusionMatrix, setSVMConfusionMatrix] =
    useState<ConfusionMatrix | null>(null);
  const [accuracy, setAccuracy] = useState<number>(0);

  useEffect(() => {
    const x = localStorage.getItem("SvmResult");
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

        //Ambil Prediksi dan groundThruth
        const predictions = parsedData.map((result) => result.prediksi);
        const groundTruths = parsedData.map((result) => result.hasil);

        // Hitung Matriks konfusi dan set ke set
        const hasil = generateConfusionMatrix(predictions, groundTruths);

        // Hitung Accuracy
        const accuracy = calculatedAccuracy(hasil);
        setAccuracy(accuracy * 100);
        setSVMConfusionMatrix(hasil);
      } catch (error) {
        console.log("Error parsing SVMResult from localStorage: ", error);
      }
    }
  }, []);

  const TP = svmConfusionMatrix?.TP;
  const TN = svmConfusionMatrix?.TN;

  return (
    <div className="p-4 flex gap-4 flex-col md:flex-row">
      <div className="w-full flex flex-col gap-8">
        {/* Table Mini  */}
        <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
          <h1 className="text-lg font-semibold">Matrix Klarifikasi SVM</h1>
          {!svmConfusionMatrix ? (
            <TableEmpty />
          ) : (
            <TableMatrix confusionMatrix={svmConfusionMatrix} />
          )}
        </div>

        <div className=" p-4 rounded-md flex-1">
          {/* Title */}
          <div className=" flex justify-between items-center">
            <h1 className="text-lg font-semibold">
              {" "}
              Visualisasi Sentiment SVM
            </h1>
          </div>
          <div className="flex gap-8 flex-col lg:flex-row">
            {/* Chart Visual Sentiment  */}
            <div className="w-full lg:w-1/3 h-[450px]">
              <ChartPie
                title={"SVM"}
                aktualPositif={svmConfusionMatrix?.TP ?? 0}
                aktualNegatif={svmConfusionMatrix?.TN ?? 0}
              />
            </div>
            {/*Chart Akurasi Sentiment  */}
            <div className="w-full lg:w-1/3 h-[450px]">
              <ChartAkurasi
                title={"SVM"}
                TP={svmConfusionMatrix?.TP ?? 0}
                TN={svmConfusionMatrix?.TN ?? 0}
                FP={svmConfusionMatrix?.FP ?? 0}
                FN={svmConfusionMatrix?.FN ?? 0}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
