import React, { useRef, useState, ChangeEvent } from "react";
import "./drop-file-input.css";
import "bootstrap-icons/font/bootstrap-icons.css";

interface DropFileInputProps {
  onFileChange: (files: File[]) => void;
  onPredict: () => void;
}

const DropFileInput: React.FC<DropFileInputProps> = ({
  onFileChange,
  onPredict,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [fileList, setFileList] = useState<File[]>([]);

  const onDragEnter = () => wrapperRef.current?.classList.add("dragover");
  const onDragLeave = () => wrapperRef.current?.classList.remove("dragover");

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    wrapperRef.current?.classList.remove("dragover");
    const file = e.dataTransfer.files[0];
    handleNewFile(file);
  };

  const onFileDrop = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    handleNewFile(file);
  };

  const handleNewFile = (file: File | undefined) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Only image files are allowed.");
      return;
    }

    if (fileList.length >= 2) {
      alert("Only 2 images allowed.");
      return;
    }

    const updatedList = [...fileList, file];
    setFileList(updatedList);
    onFileChange(updatedList);
  };

  const fileRemove = (file: File) => {
    const updatedList = fileList.filter((f) => f !== file);
    setFileList(updatedList);
    onFileChange(updatedList);
  };

  return (
    <>
      <div
        ref={wrapperRef}
        className="drop-file-input"
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDragOver={(e) => e.preventDefault()}
        onDrop={onDrop}
      >
        <div className="drop-file-input__label">
          <i className="bi bi-arrow-down-circle-fill"></i>
          <p className="">Drag & Drop your files here</p>
        </div>
        <input type="file" accept="image/*" onChange={onFileDrop} />
      </div>

      {fileList.length > 0 && (
        <>
          <div className="image-preview-grid d-flex justify-content-center gap-4 mt-4">
            {fileList.map((file, index) => (
              <div key={index} className="image-preview-item text-center">
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  className="img-thumbnail"
                  style={{ maxWidth: "200px", height: "auto" }}
                />
                <p className="mt-2">{file.name}</p>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => fileRemove(file)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          {fileList.length === 2 && (
            <div className="predict-button-wrapper text-center">
              <button
                className="btn btn-primary btn-lg active my-5"
                onClick={onPredict}
              >
                Predict
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default DropFileInput;
