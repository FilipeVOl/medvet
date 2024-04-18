import { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { Input, InputLabel, TextareaAutosize } from "@mui/material";
import z from "zod";

const InputConsulta = ({ label, type, isBig, setter, value }) => {
  const handleChange = useCallback(
    (e) => {
      setter(e.target.value);
    },
    [setter]
  );
  return (
    <div className="flex flex-col mb-4">
      <InputLabel className="ml-4" htmlFor={label}>
        {label}
      </InputLabel>
      <Input
        onChange={handleChange}
        type={type}
        value={value}
        className={`${isBig ? "w-[320px]" : "w-[220px]"} ${
          value === "" ? "border-[#FF0000]" : "border-[#848484]"
        } border rounded-[2px] h-[46px] p-2 text-base`}
      />
    </div>
  );
};

const InputTutor = ({ label, type, isBig, setter, value }) => {
  const handleChange = useCallback(
    (e) => {
      setter(e.target.value);
    },
    [setter]
  );

  return (
    <div className="flex flex-col mb-4">
      <InputLabel className="ml-4" htmlFor={label}>
        {label}
      </InputLabel>
      <Input
        type={type}
        value={value}
        onChange={handleChange}
        className={`${isBig ? "w-[490px]" : "w-[290px]"} ${
          value === "" ? "border-[#FF0000]" : "border-[#848484]"
        }  border rounded-[2px] h-[46px] p-2 text-base`}
      />
    </div>
  );
};

const TelaNovoTutor = () => {
  const [Paciente, setPaciente] = useState("");
  const [raca, setRaca] = useState("");
  const [sexo, setSexo] = useState("");
  const [data, setData] = useState("");
  const [hora, setHora] = useState("");
  const [contato, setContato] = useState("");
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [obs, setObs] = useState("");

  const phoneMask = (value) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .replace(/(-\d{4})\d+?$/, "$1");
  };

  const dateMask = (value) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "$1/$2")
      .replace(/(\d{2})(\d)/, "$1/$2")
      .replace(/(\/\d{4})\d+?$/, "$1");
  };

  const hourMask = (value) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "$1:$2")
      .replace(/(:\d{2})\d+?$/, "$1");
  };

  const cpfMask = (value) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})/, "$1-$2")
      .replace(/(-\d{2})\d+?$/, "$1");
  };

  const ConsultaSchema = z.object({
    Paciente: z.string().min(1),
    raca: z.string().min(1),
    sexo: z.string().min(1),
    data: z.string().min(1),
    hora: z.string().min(1),
    contato: z.string().min(1),
    nome: z.string().min(1),
    cpf: z.string().min(1),
    email: z.string().min(1),
    telefone: z.string().min(1),
    obs: z.string().min(1),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const consulta = ConsultaSchema.parse({
        Paciente,
        raca,
        sexo,
        data,
        hora,
        contato,
        nome,
        cpf,
        email,
        telefone,
        obs,
      });
      console.log(consulta);
    } catch (error) {
      console.error(error.errors);
    }
  };

  return (
    <>
      <div className="flex flex-col p-16">
        <h1 className=" text-2xl font-bold">Agendar Consulta</h1>
        <form>
          <div className="pt-12 ml-4">
            <div className="flex gap-8">
              <InputConsulta
                label="Paciente"
                type="text"
                isBig
                setter={setPaciente}
                value={Paciente}
              />
              <InputConsulta
                label="Raça"
                type="text"
                setter={setRaca}
                value={raca}
              />
              <InputConsulta
                label="Sexo"
                type="text"
                setter={setSexo}
                value={sexo}
              />
            </div>
            <div className="flex gap-8">
              <InputConsulta
                label="Data"
                type="text"
                setter={setData}
                value={dateMask(data)}
              />
              <InputConsulta
                label="Hora"
                type="text"
                setter={setHora}
                value={hourMask(hora)}
              />
              <InputConsulta
                label="Contato"
                type="text"
                isBig
                setter={setContato}
                value={phoneMask(contato)}
              />
            </div>
          </div>
        </form>
        <h1 className=" text-2xl font-bold mt-2">Novo tutor</h1>
        <form>
          <div className="pt-12 ml-4">
            <div className="flex gap-11">
              <InputTutor
                label="Nome"
                type="text"
                isBig
                setter={setNome}
                value={nome}
              />
              <InputTutor
                label="CPF"
                type="text"
                setter={setCpf}
                value={cpfMask(cpf)}
              />
            </div>
            <div className="flex gap-11">
              <InputTutor
                label="Email"
                type="text"
                setter={setEmail}
                value={email}
              />
              <InputTutor
                label="Telefone"
                type="text"
                isBig
                setter={setTelefone}
                value={phoneMask(telefone)}
              />
            </div>
            <div>
              <label className="ml-4" htmlFor="obs">
                Observação
              </label>
              <TextareaAutosize
                onChange={(e) => {
                  setObs(e.target.value);
                }}
                value={obs}
                className={`border ${
                  obs === "" ? "border-red-600" : "border-[#848484]"
                }  rounded-[2px] h-[92px] p-2 text-base w-full resize-none`}
              />
            </div>
          </div>
        </form>
        <div className="justify-between flex ml-4 mt-8">
          <button className="bg-white border border-[#848484] text-black font-bold rounded-[10px] h-[46px] w-[220px]">
            Voltar
          </button>
          <button
            onClick={handleSubmit}
            className="bg-[#100F49] text-white font-bold rounded-[10px] h-[46px] w-[220px]"
            //set the button to disabled if any of the fields are empty
          >
            Confirmar
          </button>
        </div>
      </div>
    </>
  );
};

InputConsulta.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  isBig: PropTypes.bool,
  setter: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

InputTutor.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  isBig: PropTypes.bool,
  setter: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default TelaNovoTutor;
