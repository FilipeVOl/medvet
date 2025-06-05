// Updated medication form component with type selector
import React from 'react';

export const MedicationForm = ({ medication, index, medications, handleMedicamento, validateTrue, required, deleteMedicamento, showDeleteButton }) => {
  return (
    <form className="px-14 w-auto mb-20 border-2 rounded-xl mx-12 py-8 flex flex-col gap-4">
      {showDeleteButton && (
        <button
          type="button"
          onClick={() => deleteMedicamento(index)}
          className="self-end text-red-700 cursor-pointer"
        >
          <DeleteIcon className="w-6 h-6 fill-red-500" />
        </button>
      )}
      <div className="grid grid-cols-3 gap-10">
        <label>
          Uso
          <select
            value={medication.use_type}
            onChange={(e) =>
              handleMedicamento(
                medications,
                index,
                e.target.value,
                "use_type"
              )
            }
            className="border flex-col flex w-full rounded-md grow p-3 text-base border-border-gray"
          >
            <option value="oral">Oral</option>
            <option value="retal">Retal</option>
            <option value="sublingual">Sublingual</option>
            <option value="injetavel">Injetável</option>
            <option value="dermatologico">Dermatológico</option>
            <option value="nasal">Nasal</option>
            <option value="oftalmologico">Oftalmológico</option>
          </select>
        </label>

        <label>
          Tipo de Farmácia
          <select
            value={medication.pharmacy}
            onChange={(e) =>
              handleMedicamento(
                medications,
                index,
                e.target.value,
                "pharmacy"
              )
            }
            className="border flex-col grow flex w-full rounded-md p-3 text-base border-border-gray"
          >
            <option value="comum">Farmácia Comum</option>
            <option value="manipulada">Farmácia Manipulada</option>
          </select>
        </label>

        <label>
          Tipo de Receita
          <select
            value={medication.type || "1via"}
            onChange={(e) =>
              handleMedicamento(
                medications,
                index,
                e.target.value,
                "type"
              )
            }
            className="border flex-col grow flex w-full rounded-md p-3 text-base border-border-gray"
          >
            <option value="1via">1 Via</option>
            <option value="2via">2 Vias</option>
          </select>
        </label>
      </div>

      <div className="grid grid-cols-2 gap-10">
        <label>
          Unidade (qt.)
          <input
            value={medication.unit}
            onClick={() => validateTrue("unit")}
            onChange={(e) =>
              handleMedicamento(
                medications,
                index,
                e.target.value,
                "unit"
              )
            }
            className={`${
              required.unit
                ? "outline-red-600 border-red-500"
                : "outline-gray-input"
            } border rounded-md h-[46px] w-full p-3 text-base border-border-gray`}
          ></input>
        </label>
    
        <label>
          Medicação
          <input
            label="Medicação"
            value={medication.measurement}
            onClick={() => validateTrue("measurement")}
            onChange={(e) =>
              handleMedicamento(
                medications,
                index,
                e.target.value,
                "measurement"
              )
            }
            className={`${
              required.measurement
                ? "outline-red-600 border-red-500"
                : "outline-gray-input"
            } border rounded-md h-[46px] w-full p-2 text-base border-border-gray`}
          ></input>
        </label>
      </div>

      <div>
        <label>
          Descrição (Posologia)
          <textarea
            value={medication.description}
            onClick={() => validateTrue("description")}
            onChange={(e) =>
              handleMedicamento(
                medications,
                index,
                e.target.value,
                "description"
              )
            }
            className={`${
              required.description
                ? "outline-red-600 border-red-500"
                : "outline-gray-input"
            } border rounded-lg w-full p-2 text-base border-border-gray resize-y min-h-[100px]`}
          />
        </label>
      </div>
    </form>
  );
};
