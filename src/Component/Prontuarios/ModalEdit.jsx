import React, { useState } from "react";
import { Input, InputLabel } from "@mui/material";

const ModalEdit = ({ label, type, handleClose }) => {
  return (
    <div className="font-Montserrat">
      <div className="p-8 flex flex-col gap-4">
        <h1 className="text-3xl font-bold pb-12">Editar prescrição</h1>
        <div className="w-full h-auto flex flex-col gap-8">
          <form>
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <InputLabel>Uso</InputLabel>
                  <select className="border-2 rounded-lg p-2 w-full">
                    <option value="oral">Oral</option>
                    <option value="retal">Retal</option>
                    <option value="sublingual">Sublingual</option>
                    <option value="injetavel">Injetável</option>
                    <option value="dermatologico">Dermatológico</option>
                    <option value="nasal">Nasal</option>
                    <option value="oftalmologico">Oftalmológico</option>
                  </select>
                </div>
                <div>
                  <InputLabel>Farmácia</InputLabel>
                  <select className="border-2 rounded-lg p-2 w-full">
                    <option value="farmacia1">Farmacia 1</option>
                    <option value="farmacia 2">Farmacia 2</option>
                  </select>
                </div>
                <div>
                  <InputLabel>Unidade (qt.)</InputLabel>
                  <input
                    type="text"
                    className="border-2 rounded-md w-full p-2 "
                  />
                </div>
              </div>
              <div className="col-span-3">
                <InputLabel>Medicação</InputLabel>
                <input
                  type="text"
                  className="border-2 rounded-md w-full p-2 "
                />
              </div>
              <div className="col-span-3">
                <InputLabel>Descrição (Posologia)</InputLabel>
                <input
                  type="text"
                  className="border-2 rounded-md w-full p-2 "
                />
              </div>
            </div>
          </form>
          <div className="flex flex-row justify-end h-12 gap-8">
            <button
              onClick={() => handleClose()}
              className="border-[1px] hover:scale-105 duration-75 border-solid bg-[#D5D0C7] text-[#FFFEF9] px-14 rounded-lg text-xl font-bold"
            >
              Salvar
            </button>
            <button
              // onClick={handleDelete}
              className="border-[1px] hover:scale-105 duration-75 border-solid bg-[#D5D0C7] text-[#FFFEF9] px-14 rounded-lg text-xl font-bold"
            >
              Imprimir e Salvar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalEdit;
