import { useState } from "react";
import PropTypes from "prop-types";
import z from "zod";

const schema = z.object({
  paciente: z.string(),
  tutor: z.string(),
  data: z.string(),
  hora: z.string(),
  contato: z.string(),
  obs: z.string(),
});

const TelaConsulta = () => {
  const [pacientes, setPacientes] = useState([]);
  const [tutores, setTutores] = useState([]);
  const [data, setData] = useState("");
  const [hora, setHora] = useState("");
  const [contato, setContato] = useState("");
  const [obs, setObs] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const info = {
      paciente: pacientes,
      tutor: tutores,
      data,
      hora,
      contato,
      obs,
    };
    schema.parse(info);
    console.log(info);
  };

  const NormalInput = ({ label, type, onchange, value }) => {
    return (
      <div className="w-full flex flex-col mb-4">
        <label className="ml-4">{label}</label>
        <input
          onChange={(e) => {
            onchange(e.target.value);
          }}
          type={type}
          value={value}
          className={` h-[46px] rounded-[10px] p-2 border border-[#838383] `}
        />
      </div>
    );
  };

  const Dropdown = ({ label, options, onchange, value }) => {
    return (
      <div className="flex flex-col w-full mb-4">
        <label className="ml-4">{label}</label>
        <select
          onChange={(e) => {
            onchange(e.target.value);
          }}
          value={value}
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
            <Dropdown
              label="Paciente"
              options={dataPacientes}
              value={pacientes}
              onchange={(value) => {
                setPacientes(value);
              }}
            />
            <Dropdown
              label="Tutor"
              options={dataPacientes}
              value={tutores}
              onchange={(value) => {
                setTutores(value);
              }}
            />
          </div>
          <div className="flex w-full gap-8">
            <NormalInput
              label="Data"
              type="date"
              value={data}
              onchange={(value) => {
                setData(value);
              }}
            />
            <NormalInput
              label="Hora"
              type="time"
              value={hora}
              onchange={(value) => {
                setHora(value);
              }}
            />
            <NormalInput
              label="Contato"
              type="text"
              value={contato}
              onchange={(value) => {
                setContato(value);
              }}
            />
          </div>
          <label className="ml-4" htmlFor="obs">
            Observação
          </label>
          <textarea
            value={obs}
            onChange={(e) => {
              setObs(e.target.value);
            }}
            className="border border-[#848484] rounded-[10px] h-[92px] p-2 text-base w-full resize-none"
          />
        </form>
        <div className="justify-between flex ml-4 mt-10">
          <button className="bg-white border border-[#848484] text-black font-bold rounded-[10px] h-[46px] w-[220px]">
            Voltar
          </button>
          <button
            onClick={handleSubmit}
            className="bg-[#100F49] text-white font-bold rounded-[10px] h-[46px] w-[220px]"
          >
            Confirmar
          </button>
        </div>
      </div>
    </>
  );
};

TelaConsulta.propTypes = {
  label: PropTypes.string.isRequired,
  onchange: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default TelaConsulta;
