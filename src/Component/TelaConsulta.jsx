import { useState, useCallback, useContext } from "react";
import { Input, InputLabel } from "@mui/material";
import PropTypes from "prop-types";
import z from "zod";
import { UserContext } from "../contexts/userContext";
// import axios from "axios";

const schema = z.object({
  paciente: z.string(),
  tutor: z.string(),
  data: z.string(),
  especie: z.string(),
  contato: z.string(),
  obs: z.string(),
});

const TelaConsulta = () => {
  const [pacientes, setPacientes] = useState("");
  const [tutores, setTutores] = useState("");
  const [data, setData] = useState("");
  const [especie, setEspecie] = useState("");
  const [contato, setContato] = useState("");
  const [obs, setObs] = useState("");

  const handleSubmit = () => {
    const info = {
      paciente: pacientes,
      tutor: tutores,
      data: data,
      especie: especie,
      contato: contato,
      obs: obs,
    };
    schema.parse(info);
    console.log(info);
  };

  const handleChange = useCallback((value, setter) => {
    setter(value);
  }, []);

  const Dropdown = ({ label, options, onchange, value }) => {
    return (
      <div className="flex flex-col w-full mb-4">
        <InputLabel htmlFor={label} className="ml-4">
          {label}
        </InputLabel>
        <select
          onChange={(e) => {
            onchange(e.target.value);
          }}
          value={value}
          className="w-full h-[46px] rounded-[2px] p-2 border border-[#838383] bg-white"
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
  const { user } = useContext(UserContext);

  const checkPhone = () => {
    return user.phone === "62920007153";
  };

  return (
    <>
      <div className="flex flex-col p-16 w-full">
        <h1 className="text-2xl font-bold">Agendar Consulta</h1>
        <form onSubmit={(e) => e.preventDefault()} className="pt-12 ml-4">
          <div className="flex gap-8">
            <Dropdown
              label="Paciente"
              options={dataPacientes}
              value={checkPhone ? user.paciente : pacientes}
              onchange={(value) => {
                handleChange(value, setPacientes);
              }}
            />
            <Dropdown
              label="Tutor"
              options={dataPacientes}
              value={checkPhone ? user.tutor : tutores}
              onchange={(value) => {
                handleChange(value, setTutores);
              }}
            />
          </div>
          <div className="flex w-full gap-8 justify-between mb-8">
            <div className="flex flex-col w-1/3">
              <InputLabel className="ml-4" htmlFor="especie">
                Especie
              </InputLabel>
              <Input
                label="Especie"
                type="text"
                value={
                  user.phone === "62920007153" ? user.pet.especie : especie
                }
                onChange={(e) => {
                  handleChange(e.target.value, setEspecie);
                }}
                className={`border ${
                  especie === "" ? "border-red-600" : " border-[#848484]"
                } rounded-[2px] h-[46px] p-2`}
              />
            </div>

            <div className="flex flex-col w-1/3">
              <InputLabel className="ml-4" htmlFor="contato">
                Contato
              </InputLabel>
              <Input
                label="Contato"
                type="text"
                value={user.phone === "62920007153" ? user.phone : contato}
                onChange={(e) => {
                  handleChange(e.target.value, setContato);
                }}
                className={`border ${
                  contato === "" ? "border-red-600" : " border-[#848484]"
                } rounded-[2px] h-[46px] p-2`}
              />
            </div>

            <div className="flex flex-col w-1/3">
              <InputLabel className="ml-4 text-black" htmlFor="data">
                Data
              </InputLabel>
              <Input
                label="Data"
                type="text"
                value={user.phone === "62920007153" ? user.data : data}
                onChange={(e) => {
                  handleChange(e.target.value, setData);
                }}
                className={`border ${
                  data === "" ? "border-red-600" : " border-[#848484]"
                } rounded-[2px] h-[46px] p-2`}
              />
            </div>
          </div>
          <label className="ml-4" htmlFor="obs">
            Observação*
          </label>
          <textarea
            value={user.phone === "62920007153" ? user.obs : obs}
            onChange={(e) => {
              handleChange(e.target.value, setObs);
            }}
            className={`border ${
              obs === "" ? "border-red-600" : "border-[#848484]"
            }  rounded-[2px] h-[92px] p-2 text-base w-full resize-none`}
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
