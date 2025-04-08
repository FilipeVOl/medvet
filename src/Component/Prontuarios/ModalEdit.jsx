import React, { useEffect, useState } from "react";
import { Pagination } from "@mui/material";
import { Input, InputLabel } from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";

const ModalEdit = ({ label, type, handleClose, selectedPrescription }) => {
  const [medications, setMedications] = useState(selectedPrescription || []);
  const [currentPage, setCurrentPage] = useState(1);
  const [medicationsPerPage] = useState(1);

  const totalMedications = selectedPrescription
    ? selectedPrescription.length
    : 0;
  console.log("Total medications:", totalMedications);

  const currentMedication = medications[currentPage - 1] || {};

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleInputChange = (field, value) => {
    const updatedMedications = [...medications];
    updatedMedications[currentPage - 1] = {
      ...updatedMedications[currentPage - 1],
      [field]: value,
    };
    setMedications(updatedMedications);
  };

  useEffect(() => {
    if (selectedPrescription && selectedPrescription.length > 0) {
      setMedications(selectedPrescription);
      setCurrentPage(1);
    }
  }, [selectedPrescription]);

  const handleUpdate = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:3333/api/prescriptions/${id}`
      );
    } catch (error) {
      console.error("Error updating medications:", error);
    }
  };

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
                  <select
                    className="border-2 rounded-lg p-2 w-full"
                    value={currentMedication.useType || ""}
                    onChange={(e) =>
                      handleInputChange("useType", e.target.value)
                    }
                  >
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
                  <select
                    className="border-2 rounded-lg p-2 w-full"
                    value={currentMedication.pharmacy || ""}
                    onChange={(e) =>
                      handleInputChange("pharmacy", e.target.value)
                    }
                  >
                    <option value="farmacia1">Farmacia 1</option>
                    <option value="farmacia 2">Farmacia 2</option>
                  </select>
                </div>
                <div>
                  <InputLabel>Unidade (qt.)</InputLabel>
                  <input
                    type="text"
                    className="border-2 rounded-md w-full p-2"
                    value={currentMedication.unit || ""}
                    onChange={(e) => handleInputChange("unit", e.target.value)}
                  />
                </div>
              </div>
              <div className="col-span-3">
                <InputLabel>Medicação</InputLabel>
                <input
                  type="text"
                  className="border-2 rounded-md w-full p-2"
                  value={currentMedication.measurement || ""}
                  onChange={(e) =>
                    handleInputChange("measurement", e.target.value)
                  }
                />
              </div>
              <div className="col-span-3">
                <InputLabel>Descrição (Posologia)</InputLabel>
                <input
                  type="text"
                  className="border-2 rounded-md w-full p-2"
                  value={currentMedication.description || ""}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                />
              </div>
            </div>
          </form>
          <div className="flex flex-row justify-between items-center h-12 gap-8">
            <button
              onClick={() => handleClose()}
              className="border-[1px] hover:scale-105 duration-75 border-solid bg-[#D5D0C7] text-[#FFFEF9] px-14 py-2 rounded-lg text-xl font-bold"
            >
              Cancelar
            </button>
            {totalMedications > 1 && (
              <div className="flex">
                <Pagination
                  count={totalMedications}
                  page={currentPage}
                  onChange={handlePageChange}
                />
              </div>
            )}
            <button
              onClick={() => {
                Swal.fire({
                  title: "Você tem certeza?",
                  text: "Você não poderá reverter essa ação!",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonText: "Sim",
                  cancelButtonText: "Cancelar",
                  confirmButtonColor: "#144A36",
                  cancelButtonColor: "#000",
                }).then((result) => {
                  if (result.isConfirmed) {
                    handleUpdate(currentMedication.id);
                    Swal.fire({
                      title: "Sucesso!",
                      text: "Prescrição editada com sucesso.",
                      icon: "success",
                      confirmButtonColor: "#144A36",
                    }).then(() => {
                      handleClose();
                    });
                  }
                });
              }}
              className="border-[1px] hover:scale-105 duration-75 border-solid bg-[#144A36] text-[#FFFEF9] px-14 py-2 rounded-lg text-xl font-bold"
            >
              Salvar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalEdit;
