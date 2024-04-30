import { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { Input, InputLabel, TextareaAutosize } from "@mui/material";
import z from "zod";

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
        className={`${isBig ? "lg:w-[490px]" : "w-[290px]"} ${
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
        <div className="flex justify-end ml-4 mt-8">
          <button
            onClick={handleSubmit}
            className={`${
              !handleSubmit ? "cursor-not-allowed opacity-25 disabled" : ""
            } font-Montserrat border-border-blue border-2 w-52 rounded-md h-10 mt-36 bg-border-blue text-white`}
            //set the button to disabled if any of the fields are empty
          >
            Confirmar
          </button>
        </div>
      </form>
    </>
  );
};

InputTutor.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  isBig: PropTypes.bool,
  setter: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default TelaNovoTutor;
