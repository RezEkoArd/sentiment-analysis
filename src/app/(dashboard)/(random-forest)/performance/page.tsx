"use client";
import TableEmpty from "@/components/AlertEmpty";
import Loading from "@/components/Loading";
import TableMatrix from "@/components/TabpeMatrix";
import { ConfusionMatrix } from "@/lib/utils";
import {
  evaluateModel,
  FeaturesProps,
  splitData,
  trainModelFromLocalStorage,
} from "@/util/random-forest";
import { useState, useEffect } from "react";

const Page = () => {
  const [evaluation, setEvaluation] = useState<any>(null);
  const [trainSize, setTrainSize] = useState(70);

  useEffect(() => {
    const dataString = localStorage.getItem("dataProcessData");
    if (!dataString) {
      console.error("Training data not found in localStroge.");
      return;
    }

    const processData = JSON.parse(dataString);

    const { train, test } = splitData(processData, trainSize / 100);

    const classifier = trainModelFromLocalStorage();
    if (!classifier) {
      console.error("Failed to train model.");
      return;
    }

    const evalResult: any = evaluateModel(classifier, test);
    setEvaluation(evalResult);
  }, [trainSize]);

  if (!evaluation) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  // Mengakses confusionMatrix
const confusionMatrix: ConfusionMatrix = evaluation.confusionMatrix;

// Membuat variabel a dengan properti yang diambil dari confusionMatrix
const a = {
    TP: confusionMatrix.TP,
    TN: confusionMatrix.TN,
    FP: confusionMatrix.FP,
    FN: confusionMatrix.FN
};
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Random Forest Performance</h1>
      <div className="mt-4">
        <h2 className="text-lg font-semibold">Confusion Matrix Random Forest:</h2>
        {/* table */}
        <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0 flex flex-col gap-4">
          {!evaluation ? (
            <TableEmpty />
          ) : (
            <TableMatrix confusionMatrix={a} />
          )}
        </div>

        <h2 className="text-lg font-semibold mt-4">Result Metrics:</h2>
        <p>Accuracy: {(evaluation.accuracy * 100).toFixed(2)}%</p>
        <p>Precision: {(evaluation.precision * 100).toFixed(2)}%</p>
        <p>Recall: {(evaluation.recall * 100).toFixed(2)}%</p>

        <div className="mt-4">
          <label className="block">Train Size (%):</label>
          <input
            type="text"
            value={trainSize}
            onChange={(e) => setTrainSize(Number(e.target.value))}
            className="border p-2 rounded-md w-16"
            min={10}
            max={90}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
