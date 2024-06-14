import { useState, useCallback } from "react";
import { Input, InputLabel } from "@mui/material";
import PropTypes from "prop-types";
import Textarea from "@mui/joy/Textarea";
import z from "zod";
import { ConsultTutorExist } from "../../services/agendamento";

const InputConsulta = ({ label, type, setter, value, isDisabled }) => {
  const handleChange = useCallback(
    (e) => {
      setter(e.target.value);
    },
    [setter]
  );

  return (
    <div className="flex flex-col mb-4 font-Montserrat">
      <InputLabel className="ml-4" htmlFor={label}>
        {label}
      </InputLabel>
      <Input
        onChange={handleChange}
        type={type}
        value={value}
        disabled={isDisabled}
        className={` ${value === "" ? "border-[#FF0000]" : "border-[#848484]"
          } border rounded-md h-[46px] p-2`}
      />
    </div>
  );
};

const TutorValidado = (props) => {
  const [phoneWMask, setMask] = useState(props.tel.phone);
  const [nameAnimal, setName] = useState("");
  const [nameTutor, setTutor] = useState("");
  const [species, setEspecie] = useState("");
  const [stringDate, setDate] = useState("");
  const [hora, setHora] = useState("");
  const [description, setDesc] = useState("");

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
    species: z.string().min(1),
    stringDate: z.string().min(1),
    hora: z.string().min(1),
    phone: z.string().min(1),
    description: z.string().min(1),
    nameAnimal: z.string().min(1),
    nameTutor: z.string().min(0)
  });



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const consulta = ConsultaSchema.parse({
        nameAnimal: nameAnimal,
        species: species,
        stringDate: stringDate,
        hora: hora,
        description: description,
        phone: phoneWMask,
        nameTutor: nameTutor,
      });
      ConsultTutorExist(props.tel.id, consulta);

      console.log();
    } catch (error) {
      console.error(error.errors);
    }
  };

  const phoneMask = (value) => {
    return value
      .replace(/\D/g, "")
      .replace(/^(\d{2})(9\d{4})/, "($1)$2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .replace(/(-\d{4})\d+?$/, "$1");
  };

  const handlePhone = (e) => {
    setMask(e.target.value);
  };

  return (
    <>
      <div className="p-16 w-full h-screen font-Montserrat">
        <h1 className=" text-2xl font-bold">Agendar Consulta</h1>
        <form>
          <div className="pt-12 ml-4 w-auto">
            <div className="w-auto">
              <div className="gap-8 flex flex-col sm:grid sm:grid-cols-[40%_1fr]">
                <InputConsulta
                  label="Paciente"
                  type="text"
                  value={nameAnimal}
                  setter={setName}
                  className="font-Montserrat"
                />

                <InputConsulta
                  label="Tutor"
                  type="text"
                  setter={setTutor}
                  value={props.tel.name}
                  isDisabled={true}
                />
              </div>

              <div className="flex flex-col sm:grid sm:grid-cols-[25%_2fr_1fr_1fr] gap-8 ">
                <InputConsulta
                  label="Espécie"
                  type="text"
                  setter={setEspecie}
                  value={species}
                />

                <InputConsulta
                  label="Hora"
                  type="text"
                  setter={setHora}
                  value={hourMask(hora)}
                />

                <div className="flex flex-col mb-4">
                  <label className="ml-4" >
                    Telefone
                    <input
                      type="text"
                      onChange={handlePhone}
                      value={phoneMask(props.tel.phone)}
                      disabled={true}
                      className={"border-[#848484] border rounded-md h-[46px] p-2 text-base text-[#848484]"}
                    />
                  </label>
                </div>

                <InputConsulta
                  label="Data"
                  type="text"
                  setter={setDate}
                  value={dateMask(stringDate)}
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
                    setDesc(e.target.value);
                  }}
                />
              </div>

              <div className="flex justify-end ml-4 mt-8">
                <button
                  onClick={handleSubmit}
                  className={`${!handleSubmit
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

TutorValidado.propTypes = {
  label: PropTypes.string,
  onchange: PropTypes.func,
  type: PropTypes.string,
  value: PropTypes.string,
  width: PropTypes.number,
  tel: PropTypes.object,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
    })
  ),
};

export default TutorValidado;
