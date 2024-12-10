import { useState, useEffect } from "react";

const FileUpload = () => {
  const [jsonData, setJsonData] = useState<Record<string, any> | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const savedData = localStorage.getItem("uploadedJson");
    if (savedData) {
      setJsonData(JSON.parse(savedData)); // Parse data JSON yang disimpan di localStorage
 
    }
  }, []);

  // Split data menjadi Data Uji dan Data Latih
  const splitData = (data: any[], ratio: number) => {
    const trainSize = Math.floor(data.length * ratio);
    const trainData = data.slice(0, trainSize);
    const testData = data.slice(trainSize);
    return {trainData, testData};
  }

  // -------------------

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const result = JSON.parse(reader.result as string);;
        const {trainData, testData} = splitData(result, 0.7);
        localStorage.setItem("dataMining",JSON.stringify(result));
        localStorage.setItem("dataTraining", JSON.stringify(trainData));
        localStorage.setItem("dataTesting", JSON.stringify(testData));
        window.location.reload();
        
        setError(null);
      } catch (error) {
        setError("Invaid JSON format!");
        setJsonData(null);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex flex-col items-center space-x-2">
      <label
        htmlFor="file-upload"
        className="px-4 py-2 bg-purple-500  text-white rounded-lg cursor-pointer hover:bg-lightPurple"
      >
        Upload File
      </label>

      <input
        id="file-upload"
        type="file"
        accept=".json,application/json"
        className="hidden"
        onChange={handleFileUpload}
      />
    </div>
  );
};

export default FileUpload;
