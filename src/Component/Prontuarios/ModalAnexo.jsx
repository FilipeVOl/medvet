import React, { useState, useRef, useEffect } from "react";
import imagePlaceholder from "../../images/imagePlaceh.svg";
import pdfIcon from "../../images/pdfIcon.svg"; // Add an icon for PDF files
import { Input, InputLabel } from "@mui/material";

const ModalAnexo = ({ label, type, handleClose, handleFileUpload, selectedFile }) => {
  const [documentName, setDocumentName] = useState("");
  const [filePreview, setFilePreview] = useState(null);
  const fileInputRef = useRef();

  const handleChange = (e) => {
    setDocumentName(e.target.value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    handleFileUpload(file); // Pass the selected file to the parent component
  };

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
        <h1 className="text-3xl font-bold">Novo anexo</h1>
        <div
          onClick={() => fileInputRef.current.click()} // Trigger the file input click
          className="w-full h-[25%] border-2 items-center justify-center flex p-24 cursor-pointer rounded-lg border-[#B4B0A8]"
        >
          {filePreview ? (
            <img src={filePreview} alt="file preview" className="h-12" /> // Display the file preview
          ) : (
            <img src={imagePlaceholder} alt="image placeholder" className="h-12" /> // Display the placeholder image
          )}
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            accept="application/pdf,image/*" // Accept both PDF and image files
            onChange={handleFileChange} // Handle file selection
          />
        </div>
        {selectedFile && (
          <div className="mt-2 text-[#007448]">
            Arquivo selecionado: {selectedFile.name} // Display the selected file name
          </div>
        )}
        <div className="input w-full flex flex-col gap-8">
          <div>
            <InputLabel
              sx={{ fontFamily: "Montserrat", borderColor: "#B4B0A8", fontWeight: 'bold' }} // Set font weight to bold
              className="ml-4 indent-4"
              htmlFor={label}
            >
              {label}
            </InputLabel>
            <Input
              sx={{ fontFamily: "Montserrat", width: "100%" }}
              onChange={handleChange}
              type={type}
              value={documentName}
              className={`border-[#848484] border rounded-md h-[46px] p-2 text-base`}
            />
          </div>
          <div className="flex flex-row justify-between h-12">
            <button
              onClick={() => handleClose()}
              className="border-[1px] hover:scale-105 duration-75 border-solid border-[#B4B0A8] px-14 rounded-lg text-xl font-bold"
            >
              Voltar
            </button>
            <button
              className="border-[1px] hover:scale-105 duration-75 border-solid bg-[#D5D0C7] text-[#FFFEF9] px-14 rounded-lg text-xl font-bold"
            >
              Adicionar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalAnexo;
