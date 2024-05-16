import { useState, useCallback } from "react";
import { Input, InputLabel } from "@mui/material";
import PropTypes from "prop-types";
import Textarea from "@mui/joy/Textarea";
import z from "zod";
import CreateConsult from "../../services/agendamento";

const InputConsulta = ({ label, type, setter, value, isDisabled, setter2 }) => {
  const phoneUnmask = (value) => {
    return value
      .replace(/\D/g, "")
      .replace(/^(\d{2})\((\d{2})\)(\d{4})-(\d{4})$/, "$1$2$3$4");
  };

  const handleChange = useCallback(
    (e) => {
      setter2(phoneUnmask(e.target.value));
      setter(e.target.value);
    },
    [setter, setter2]
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
        disabled={isDisabled}
        className={` ${
          value === "" ? "border-[#FF0000]" : "border-[#848484]"
        } border rounded-md h-[46px] p-2 text-base`}
      />
    </div>
  );
};

const Agendamento = () => {
  const [phone, setPhone] = useState("");
  const [paciente, setPaciente] = useState("");
  const [tutor, setTutor] = useState("");
  const [especie, setEspecie] = useState("");
  const [data, setData] = useState("");
  const [hora, setHora] = useState("");
  const [obs, setObs] = useState("");
  const [Disabled, setDisabled] = useState(true);
  const [phoneWMask, setMask] = useState("");

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

  const ConsultaSchema = z.object({
    especie: z.string().min(1),
    stringDate: z.string().min(1),
    hora: z.string().min(1),
    phone: z.string().min(1),
    obs: z.string().min(1),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const consulta = ConsultaSchema.parse({
        paciente: paciente,
        tutor: tutor,
        especie: especie,
        stringDate: data,
        hora: hora,
        phone: phoneWMask,
        obs: obs,
      });
      CreateConsult(consulta);
      console.log(consulta);
    } catch (error) {
      console.error(error.errors);
    }
  };

  const phoneMask = (e) => {
    return e
      .replace(/\D/g, "")
      .replace(/^(\d{2})(9\d{4})/, "($1)$2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .replace(/(-\d{4})\d+?$/, "$1");
  };

  return (
    <>
      <div className="p-16 w-full h-screen">
        <h1 className=" text-2xl font-bold">Agendar Consulta</h1>
        <form>
          <div className="pt-12 ml-4 w-auto">
            <div className="w-auto">
              <div className="gap-8 flex flex-col sm:grid sm:grid-cols-[40%_1fr]">
                <InputConsulta
                  label="Paciente"
                  type="text"
                  setter={setPaciente}
                  value={paciente}
                />

                <InputConsulta
                  label="Tutor"
                  type="text"
                  setter={setTutor}
                  value={tutor}
                  isDisabled={Disabled}
                />
              </div>

              <div className="flex flex-col sm:grid sm:grid-cols-[25%_2fr_1fr_1fr] gap-8 ">
                <InputConsulta
                  label="Espécie"
                  type="text"
                  setter={setEspecie}
                  value={especie}
                />

                <InputConsulta
                  label="Hora"
                  type="text"
                  setter={setHora}
                  value={hourMask(hora)}
                />

                <InputConsulta
                  label="N° de telefone"
                  type="text"
                  isBig
                  setter={setPhone}
                  setter2={setMask}
                  value={phoneMask(phone)}
                />

                <InputConsulta
                  label="Data"
                  type="text"
                  setter={setData}
                  value={dateMask(data)}
                >
                  <img src="" alt="" />
                </InputConsulta>
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

              <div className="flex justify-end ml-4 mt-8">
                <button
                  onClick={handleSubmit}
                  className={`${
                    !handleSubmit
                      ? "cursor-not-allowed opacity-25 disabled"
                      : ""
                  } font-Montserrat border-border-blue border-2 w-52 rounded-md h-10 mt-36 bg-border-blue text-white`}
                  //set the button to disabled if any of the fields are empty
                >
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

InputConsulta.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  setter: PropTypes.func,
  setter2: PropTypes.func,
  isDisabled: PropTypes.bool,
};

Agendamento.propTypes = {
  label: PropTypes.string,
  onchange: PropTypes.func,
  type: PropTypes.string,
  value: PropTypes.string,
  width: PropTypes.number,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
    })
  ),
};

export default Agendamento;
