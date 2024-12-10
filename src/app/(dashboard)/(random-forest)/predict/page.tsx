"use client";

import { getTrees, predict, trainModelFromLocalStorage } from "@/util/random-forest";
import { useEffect, useState } from "react";

const Page = () => {
  const [rating, setRating] = useState<number>(0);
  const [reviewLength, setReviewLength] = useState<number>(0);
  const [uniqueWords, setUniqueWords] = useState<number>(0);
  const [prediction, setPrediction] = useState<number | null>(null);
  const [trees, setTrees] = useState<any[]>([]);
  const [classifier,SetClassifier] = useState<any>(null);

  useEffect(() => {
    const model = trainModelFromLocalStorage();
    if (model) {
      SetClassifier(model);
    }
  },[]);

  const handlePredict = () => {
    if(!classifier) {
      alert("Model not loaded.");
      return;
    }

    const result = predict(classifier,[rating, reviewLength, uniqueWords]);
    setPrediction(result);

    const allTrees= getTrees(classifier) || [];
    setTrees(allTrees);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Random Forest Predict</h1>
      <div className="mt-4">
        <label className="block mt-2">
          Rating:
          <input type="number" value={rating} onChange={(e) => setRating(Number(e.target.value))}
          className="border p-2 rounded-md" max={5} maxLength={1}/>
        </label>

        <label className="block mt-2">
          Review Length:
          <input type="number" value={reviewLength} onChange={(e) => setReviewLength(Number(e.target.value))}
          className="border p-2 rounded-md" />
        </label>
        
        <label className="block mt-2">
          Unique Words:
          <input type="number" value={uniqueWords} onChange={(e) => setUniqueWords(Number(e.target.value))}
          className="border p-2 rounded-md" />
        </label>

        <button onClick={handlePredict} className="mt-4 bg-blue-500 text-white p-2 rounded">
          Predict
        </button>
      </div>

      {prediction !== null && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold">Prediction Result:</h2>
          <p>{prediction === 1 ? 'Positive' : 'Negative'}</p>
        </div>
      )}

      {trees.length > 0 && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold">Tree Details:</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
            {JSON.stringify(trees, null, 2)}
          </pre>
        </div>
      )}
    </div>
  )
};

export default Page;
