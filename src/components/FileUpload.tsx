import { useState, useEffect } from "react";

const FileUpload = () => {
  const [jsonData, setJsonData] = useState<Record<string, any> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [fetching,setFetching] = useState(false)

  useEffect(() => {
    const savedData = localStorage.getItem("uploadedJson");
    if (savedData) {
      setJsonData(JSON.parse(savedData)); // Parse data JSON yang disimpan di localStorage
 
    }
  }, []);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const result = JSON.parse(reader.result as string);
        setJsonData(result);
        localStorage.setItem("dataSentiment", JSON.stringify(result));
        // setFileName(file ? file.name : "No file choosen"); //!
        window.location.reload()
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


      {/* <div className="flex items-center justify-center">
        {jsonData && (
          <div>
            <h2>Data Preview:</h2>
            {renderJsonData(jsonData)}
          </div>
        )}
      </div> */}
    </div>
  );
};

export default FileUpload;
