import { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { Input, InputLabel } from "@mui/material";
import Textarea from "@mui/joy/Textarea";
import z from "zod";
import { postTutor } from "../services/tutores";

const InputTutor = ({ label, type, setter, value }) => {
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
        className={`${
          value === "" ? "border-[#FF0000]" : "border-[#848484]"
        }  border rounded-lg h-[46px] p-2 text-base`}
      />
    </div>
  );
};

const TelaNovoTutor = () => {
  const [name, setNome] = useState("");
  const [phone, setTelefone] = useState("");
  const [obs, setObs] = useState("");
  const [password, setPassword] = useState("");
  // OS STATES ABAIXO NÃO EXISTEM NA PÁGINA

  const phoneMask = (value) => {
    return value
      .replace(/\D/g, "")
      .replace(/^(\d{2})(9\d{4})/, "($1)$2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .replace(/(-\d{4})\d+?$/, "$1");
  };

  const ConsultaSchema = z.object({
    name: z.string().min(1),
    phone: z.string().min(1),
    obs: z.string().min(1),
    password: z.string().min(1),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const consulta = ConsultaSchema.parse({
        name,
        phone,
        obs,
        password: "jello",
      });
      postTutor(consulta);
      console.log(consulta);
    } catch (error) {
      console.error(error.errors);
    }
  };

  return (
    <div className="p-20 w-full h-auto">
      <h1 className="font-Montserrat text-3xl font-bold mt-2">Novo tutor</h1>
      <form>
        <div className="pt-12 ml-4 w-auto">
          <div className="gap-8 flex flex-col sm:grid sm:grid-cols-[2fr_1fr] md:gap-[10%]">
            <InputTutor
              label="Nome"
              type="text"
              isBig
              setter={setNome}
              value={name}
            />
            <InputTutor
              label="Telefone"
              type="text"
              isBig
              setter={setTelefone}
              value={phoneMask(phone)}
            />
          </div>
          <div className="mt-[5%]">
            <label htmlFor="observation" className="ml-4">
              Observação
            </label>
            <Textarea
              disabled={false}
              minRows={7}
              size="md"
              variant="outlined"
              onChange={(e) => {
                setObs(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="flex justify-end ml-4 mt-8">
          <button
            onClick={handleSubmit}
            className={`${
              !handleSubmit ? "cursor-not-allowed opacity-25 disabled" : ""
            } font-Montserrat border-border-blue border-2 w-52 rounded-md h-10 mt-36 bg-border-blue text-white`}
          >
            Confirmar
          </button>
        </div>
      </form>
    </div>
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
