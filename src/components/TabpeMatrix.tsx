import { ConfusionMatrix } from "@/lib/utils";
import React from "react";

interface ConfusionMatrixProps {
    confusionMatrix : ConfusionMatrix | null;
}


const TableMatrix : React.FC<ConfusionMatrixProps> = ({ confusionMatrix }) => {
    if (!confusionMatrix) {
      return <p>Loading...</p>;
    }
  
    const { TP, TN, FP, FN } = confusionMatrix;
  
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300 text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2 text-left">Kondisi Aktual</th>
              <th className="border border-gray-300 p-2 text-left">Prediksi Positif</th>
              <th className="border border-gray-300 p-2 text-left">Prediksi Negatif</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 p-2">Aktual Positif</td>
              <td className="border border-gray-300 p-2">{TP}</td>
              <td className="border border-gray-300 p-2">{FN}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">Aktual Negatif</td>
              <td className="border border-gray-300 p-2">{FP}</td>
              <td className="border border-gray-300 p-2">{TN}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };
  
  export default TableMatrix;