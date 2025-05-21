import React from "react";
import "bootstrap/dist/css/bootstrap.css";

interface PredictProps {
  files: File[];
  onBack: () => void;
}

const Predict: React.FC<PredictProps> = ({ files, onBack }) => {
  const getPredictionScore = () => {
    return Math.floor(Math.random() * 100) + 1;
  };

  const score = getPredictionScore();

  return (
    <div className="text-center">
      <h3 className="text-white">Prediction Result</h3>
      <div className="d-flex justify-content-center gap-4 my-4">
        {files.map((file, index) => (
          <div key={index}>
            <img
              src={URL.createObjectURL(file)}
              alt={`Uploaded ${index}`}
              className="img-thumbnail"
              style={{ maxWidth: "200px" }}
            />
          </div>
        ))}
      </div>
      <h4 className="text-white">Similarity Score: {score}%</h4>

      <button className="btn btn-secondary mt-4" onClick={onBack}>
        ← Back
      </button>
    </div>
  );
};

export default Predict;
