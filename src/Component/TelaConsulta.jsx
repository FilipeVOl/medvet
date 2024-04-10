import { useState } from "react";

const TelaConsulta = () => {
  const [pacientes, setPacientes] = useState([]);
  const [tutores, setTutores] = useState([]);

  const NormalInput = ({ label, type, onchange }) => {
    return (
      <div className="w-full flex flex-col mb-4">
        <label className="ml-4">{label}</label>
        <input
          onChange={onchange}
          type={type}
          className={` h-[46px] rounded-[10px] p-2 border border-[#838383] `}
        />
      </div>
    );
  };

  const Dropdown = ({ label, options, onchange }) => {
    return (
      <div className="flex flex-col w-full mb-4">
        <label className="ml-4">{label}</label>
        <select
          onChange={(e) => {
            onchange(e.target.value);
          }}
          className="w-full h-[46px] rounded-[10px] p-2 border border-[#838383] bg-white"
        >
          {options.map((option) => (
            <option key={option} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  };

  const dataPacientes = [
    { label: "Paciente 1", value: "paciente1" },
    { label: "Paciente 2", value: "paciente2" },
    { label: "Paciente 3", value: "paciente3" },
  ];

  return (
    <>
      <div className="flex flex-col p-16 w-full">
        <h1 className="text-2xl font-bold">Agendar Consulta</h1>
        <form onSubmit={(e) => e.preventDefault()} className="pt-12 ml-4">
          <div className="flex gap-8">
            <Dropdown label="Paciente" options={dataPacientes} />
            <Dropdown label="Tutor" options={dataPacientes} />
          </div>
          <div className="flex w-full gap-8">
            <NormalInput label="Data" type="date" />
            <NormalInput label="Hora" type="time" />
            <NormalInput label="Contato" type="text" />
          </div>
          <label className="ml-4" htmlFor="obs">
            Observação
          </label>
          <textarea className="border border-[#848484] rounded-[10px] h-[92px] p-2 text-base w-full resize-none" />
        </form>
        <div className="justify-between flex ml-4 mt-36">
          <button className="bg-white border border-[#848484] text-black font-bold rounded-[10px] h-[46px] w-[220px]">
            Voltar
          </button>
          <button className="bg-[#100F49] text-white font-bold rounded-[10px] h-[46px] w-[220px]">
            Confirmar
          </button>
        </div>
      </div>
    </>
  );
};

export default TelaConsulta;
