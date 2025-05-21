import React, { useRef, useState, ChangeEvent } from "react";
import "./drop-file-input.css";

interface DropFileInputProps {
  onFileChange: (files: File[]) => void;
}

const DropFileInput: React.FC<DropFileInputProps> = ({ onFileChange }) => {
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
          <img
            src="https://media.geeksforgeeks.org/wp-content/uploads/20240308113922/Drag-.png"
            alt="Drag & Drop"
          />
          <p>Drag & Drop your files here</p>
        </div>
        <input type="file" accept="image/*" onChange={onFileDrop} />
      </div>

      {fileList.length > 0 && (
        <div className="image-preview-grid">
          {fileList.map((file, index) => (
            <div key={index} className="image-preview-item">
              <img src={URL.createObjectURL(file)} alt={file.name} />
              <p>{file.name}</p>
              <button onClick={() => fileRemove(file)}>Remove</button>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default DropFileInput;
