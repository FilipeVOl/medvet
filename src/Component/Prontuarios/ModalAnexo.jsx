import React, { useState } from "react";
import imagePlaceholder from "../../images/imagePlaceh.svg";
import { Input, InputLabel } from "@mui/material";

const ModalAnexo = (
    { label, type }
) => {
    const [documentName, setDocumentName] = useState("");

    const handleChange = (e) => {
        setDocumentName(e.target.value);
    }

  return (
    <div className="">
      <div className="p-8">
        <h1>Novo anexo</h1>
        <div className="w-full h-[25%]">
          <img
            src={imagePlaceholder}
            alt="image placeholder"
            className="h-12"
          />
        </div>
        <div className="input">
          <InputLabel
            sx={{ fontFamily: "Montserrat" }}
            className="ml-4"
            htmlFor={label}
          >
            {label}
          </InputLabel>
          <Input
            sx={{ fontFamily: "Montserrat" }}
            onChange={handleChange}
            type={type}
            value={documentName}
            className={`border-[#848484]
             border rounded-md h-[46px] p-2 text-base`}
          />
        </div>
      </div>
    </div>
  );
};

export default ModalAnexo;
