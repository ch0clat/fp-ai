import { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import DropFileInput from "./DropFileInput";
import Predict from "./Predict";

function Home() {
  const [files, setFiles] = useState<File[]>([]);
  const [showPredict, setShowPredict] = useState(false);

  const handleFileChange = (selectedFiles: File[]) => {
    setFiles(selectedFiles);
    setShowPredict(false); // reset when changing files
  };

  const handlePredict = () => {
    if (files.length === 2) {
      setShowPredict(true);
    } else {
      alert("Please upload exactly 2 images.");
    }
  };

  const handleBack = () => {
    setFiles([]);
    setShowPredict(false);
  };

  return (
    <>
      <div className="navbar navbar-light bg-light">
        <a className="navbar-brand px-5" href="#">
          Face Prediction
        </a>
      </div>

      <div className="container mt-4">
        <h1 className="text-center">Face Prediction</h1>

        {!showPredict ? (
          <DropFileInput
            onFileChange={handleFileChange}
            onPredict={handlePredict}
          />
        ) : (
          <Predict files={files} onBack={handleBack} />
        )}
      </div>
    </>
  );
}

export default Home;
