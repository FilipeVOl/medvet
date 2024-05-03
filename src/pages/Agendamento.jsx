import { useState, useEffect, useContext, useCallback } from "react";
import { UserContext } from "../contexts/userContext";
// import Box from "@mui/material/Box";
// import Modal from "@mui/material/Modal";
import { Input, InputLabel } from "@mui/material";
// import { style } from "../Component/Calendar/calendar_utils";
import PropTypes from "prop-types";
import Textarea from "@mui/joy/Textarea";
import z from "zod";
import CreateConsult from "../services/agendamento";

const InputConsulta = ({ label, type, setter, value, isDisabled }) => {
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
        disabled={isDisabled}
        className={` ${
          value === "" ? "border-[#FF0000]" : "border-[#848484]"
        } border rounded-md h-[46px] p-2 text-base`}
      />
    </div>
  );
};

const Agendamento = () => {
  // const [open, setOpen] = useState(false);
  // const { user, setUser } = useContext(UserContext);
  const [telefone, setTelefone] = useState("");
  const [paciente, setPaciente] = useState("");
  const [tutor, setTutor] = useState("");
  const [especie, setEspecie] = useState("");
  const [data, setData] = useState("");
  const [hora, setHora] = useState("");
  const [obs, setObs] = useState("");
  const [isTutorDisabled, setIsTutorDisabled] = useState(true);

  // const [pacientes, setPacientes] = useState("");
  // const [tutores, setTutores] = useState("");

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

  const ConsultaSchema = z.object({
    especie: z.string().min(1),
    stringDate: z.string().min(1),
    hora: z.string().min(1),
    telefone: z.string().min(1),
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
        telefone: telefone,
        obs: obs,
      });
      CreateConsult(consulta);

      console.log(consulta);
    } catch (error) {
      console.error(error.errors);
    }
  };

  // const Dropdown = ({ label, options, onchange, value, width }) => {
  //   return (
  //     <div className={`flex flex-col w-full mb-4 w-${width}`}>
  //       <InputLabel htmlFor={label} className="ml-4">
  //         {label}
  //       </InputLabel>
  //       <select
  //         onChange={(e) => {
  //           onchange(e.target.value);
  //         }}
  //         value={value}
  //         className="w-full h-[46px] rounded-[2px] p-2 border border-[#838383] bg-white"
  //       >
  //         {options.map((option, index) => (
  //           <option key={index} value={option.value}>
  //             {option.label}
  //           </option>
  //         ))}
  //       </select>
  //     </div>
  //   );
  // };

  const dataTutor = { value: "Joaquim Inácio" };

  const handleChange = useCallback((value, setter) => {
    setter(value);
  }, []);

  // useEffect(() => {
  //   setOpen(true);
  // }, []);

  // const handleClose = () => {
  //   setOpen(false);
  // };

  return (
    <>
      <div className="p-16 w-full h-screen">
        <h1 className=" text-2xl font-bold">Agendar Consulta</h1>
        <form>
          <div className="pt-12 ml-4 w-auto">
            <div className="w-auto">
              <div className="gap-8 flex flex-col sm:grid sm:grid-cols-[40%_1fr]">
                {/* <Dropdown
                  label="Paciente"
                  options={dataPacientes}
                  value={pacientes}
                  onchange={(value) => {
                    handleChange(value, setPacientes);
                  }}
                /> */}

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
                  value={dataTutor.value}
                  isDisabled={isTutorDisabled}
                />

                {/* <Dropdown
                  label="Tutor"
                  options={dataPacientes}
                  value={tutores}
                  onchange={(value) => {
                    handleChange(value, setTutores);
                  }}
                /> */}
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
                  setter={setTelefone}
                  value={phoneMask(telefone)}
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

        {/* <Modal
          disableEscapeKeyDown
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <h1 className="text-2xl font-bold">Conferir Telefone</h1>
            <div>
              <InputLabel className="ml-4" htmlFor="">
                Telefone
              </InputLabel>
              <Input
                onChange={(e) => {
                  setTelefone(e.target.value);
                  setUser({ ...user, phone: e.target.value });
                }}
                className="border border-[#848484] rounded-[2px] h-[46px] p-2 text-base w-full"
              />
              <div className="flex justify-between">
                <button
                  onClick={() => {
                    setOpen(!open);
                  }}
                  className="bg-white border border-[#848484] text-black font-bold rounded-[10px] h-[46px] w-[220px] mt-8"
                >
                  Cancelar
                </button>
                <button className="bg-[#100F49] text-white font-bold rounded-[10px] h-[46px] w-[220px] mt-8">
                  Continuar
                </button>
              </div>
            </div>
          </Box>
        </Modal>
        {telefone === "222" ? <TelaConsulta /> : <TelaNovoTutor />} */}
      </div>
    </>
  );
};

InputConsulta.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  setter: PropTypes.func,
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
