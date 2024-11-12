import React, { useState, useRef, useEffect } from "react";
import imagePlaceholder from "../../images/imagePlaceh.svg";
import pdfIcon from "../../images/pdfIcon.svg"; // Add an icon for PDF files
import { Input, InputLabel } from "@mui/material";

const ModalViewAnexo = ({ label, type, handleClose, handleFileUpload, selectedFile }) => {
  const [filePreview, setFilePreview] = useState(null);
  const fileInputRef = useRef();

  useEffect(() => {
    if (selectedFile && selectedFile instanceof File) {
      if (selectedFile.type === "application/pdf") {
        setFilePreview(pdfIcon); // Use the PDF icon for PDF files
      } else {
        setFilePreview(URL.createObjectURL(selectedFile)); // Generate a preview URL for image files
      }
    }
  }, [selectedFile]); // Watch for changes to the selectedFile state

  return (
    <div className="font-Montserrat">
      <div className="p-8 flex flex-col gap-4">
        <h1 className="text-3xl font-bold">*nome do documento*</h1>
        <div
          className="w-full h-[25%] border-2 items-center justify-center flex p-24 rounded-lg border-[#B4B0A8]"
        >
          {filePreview ? (
            <img src={filePreview} alt="file preview" className="h-12" /> // Display the file preview
          ) : (
            <img src={imagePlaceholder} alt="image placeholder" className="h-12" /> // Display the placeholder image
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalViewAnexo;
