"use client";

import Loading from "@/components/Loading";
import {
  getTrees,
  predict,
  trainModelFromLocalStorage,
} from "@/util/random-forest";
import { useEffect, useState } from "react";

const Page = () => {
  const [rating, setRating] = useState<number>(0);
  const [reviewLength, setReviewLength] = useState<number>(0);
  const [uniqueWords, setUniqueWords] = useState<number>(0);
  const [prediction, setPrediction] = useState<number | null>(null);
  const [trees, setTrees] = useState<any[]>([]);
  const [visibleTrees, setVisibleTrees] = useState<number>(5);
  const [classifier, SetClassifier] = useState<any>(null);


  useEffect(() => {
    const model = trainModelFromLocalStorage();
    if (model) {
      SetClassifier(model);
    }
  }, []);

  const handlePredict = () => {
    if (!classifier) {
      alert("Model not loaded.");
      return;
    }

    const result = predict(classifier, [rating, reviewLength, uniqueWords]);
    setPrediction(result);

    const allTrees = getTrees(classifier) || [];
    setTrees(allTrees.slice(0, visibleTrees));
  };

  if (!classifier) {
    return (
        <div className="w-full h-full flex items-center justify-center">
            <Loading />
        </div>
    )
  }

  const renderTreeSummary = (tree: any, index: number) => {
    return (
      <div key={index} className="border p-4 rounded mt-4">
        <h3 className="font-semibold">Tree {index + 1}</h3>
        <p>Nodes: {tree.nodes?.length || 0}</p>
        <p>Max Depth: {tree.maxDepth || "N/A"}</p>
        <p>Leaf Nodes: {tree.leafCount || "N/A"}</p>
        <button
          className="mt-2 bg-gray-200 p-2 rounded text-sm"
          onClick={() => console.log(tree)}
        >
          View Raw Tree Data
        </button>
      </div>
    );
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Random Forest Predict</h1>
      <div className="mt-4">
        <div className="flex gap-2 ">
          <label className="block mt-2 ">Rating:</label>
          <input
            type="number"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="border p-2 rounded-md"
            max={5}
            maxLength={1}
          />
        </div>

        <div className="flex gap-2 mt-2">
          <label className="block ">Review Length:</label>
          <input
            type="number"
            value={reviewLength}
            onChange={(e) => setReviewLength(Number(e.target.value))}
            className="border p-2 rounded-md"
          />
        </div>

        <div className="flex gap-2 mt-2">
          <label className="block mt-2 ">Unique Words:</label>
          <input
            type="number"
            value={uniqueWords}
            onChange={(e) => setUniqueWords(Number(e.target.value))}
            className="border p-2 rounded-md"
          />
        </div>

        <div className="flex gap-2 mt-2">
          <label className="block mt-2">Visible Trees:</label>
          <input
            type="number"
            value={visibleTrees}
            onChange={(e) => setVisibleTrees(Number(e.target.value))}
            className="border p-2 rounded-md"
            min={1}
            max={100}
          />
        </div>

        <button
          onClick={handlePredict}
          className="mt-4 bg-blue-500 text-white p-2 rounded"
        >
          Predict
        </button>
      </div>

      {prediction !== null && (
        <div className="mt-6 w-1/5 bg-green-300 p-2">
          <h2 className="text-lg font-semibold">Prediction Result:</h2>
          <p>{prediction === 1 ? "Positive" : "Negative"}</p>
        </div>
      )}

      {trees.length > 0 && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold">Tree Summaries:</h2>
          {trees.map((tree, index) => renderTreeSummary(tree, index))}
        </div>
      )}
    </div>
  );
};

export default Page;
