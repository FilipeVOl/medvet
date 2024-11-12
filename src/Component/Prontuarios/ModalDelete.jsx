import React, { useState, useRef, useEffect } from "react";
import imagePlaceholder from "../../images/imagePlaceh.svg";
import pdfIcon from "../../images/pdfIcon.svg"; // Add an icon for PDF files
import { Input, InputLabel } from "@mui/material";

const ModalDelete = ({ handleClose, title, body, handleDelete }) => {

  return (
    <div className="font-Montserrat">
      <div className="p-8 flex flex-col gap-4">
        <h1 className="text-3xl font-bold">{title}</h1>
        <div className="w-full h-auto items-center flex rounded-lg py-8 border-[#B4B0A8]">
            <h1 className="font-semibold text-xl">{body}</h1>
        </div>
        <div className="flex flex-row justify-between h-12 gap-8">
            <button
              onClick={() => handleClose()}
              className="border-[1px] hover:scale-105 duration-75 border-solid border-[#B4B0A8] px-14 rounded-lg text-xl font-bold"
            >
              Voltar
            </button>
            <button
              onClick={handleDelete}
              className="border-[1px] hover:scale-105 duration-75 border-solid bg-[#D5D0C7] text-[#FFFEF9] px-14 rounded-lg text-xl font-bold"
            >
              Excluir
            </button>
          </div>
      </div>
    </div>
  );
};

export default ModalDelete;
