import { useState, useCallback, useEffect } from "react";
import { Input, InputLabel, Snackbar, TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import PropTypes from "prop-types";
import Textarea from "@mui/joy/Textarea";
import z from "zod";
import { ConsultTutorExist } from "../../services/agendamento";
import { getAnimalByTutorId} from "../../services/animals";

const InputConsulta = ({
  label,
  IsPaciente,
  type,
  setter,
  value,
  ArrAnimais,
  setArrAnimais,
  setSpecies, 
  setRaca,
  setSexo,
  setIdade,
  setId,
  isDisabled,
  placeHolder,
  props,
}) => {
  const handleChange = useCallback(
    (e) => {
      setter(e.target.value);
    },
    [setter]
  );

  if (IsPaciente) {
    return (
      <div className="flex flex-col mb-4 font-Montserrat">
        <InputLabel
          sx={{ fontFamily: "Montserrat", fontWeight: "medium" }}
          className="ml-4"
          htmlFor={label}
        >
          {label}
        </InputLabel>
        <Autocomplete
          freeSolo
          disableClearable
          id="free-solo-2-demo"
          onChange={(_e, newValue) => {
            handleChange({ target: { value: newValue } });
            const filter = ArrAnimais.filter((e) => e.name === newValue);
            setSpecies(filter[0].species);
            setRaca(filter[0].race);
            setSexo(filter[0].gender);
            setIdade(filter[0].age);
            // setPeso(filter[0].weigth);
            setId(filter[0].sequence);
          }}
          {...console.log(ArrAnimais)}
          options={ArrAnimais.map((option) => option.name)}
          renderInput={(params) => (
            <TextField
              onChange={(e) => {
                handleChange(e);
              }}
              {...params}
              InputProps={{
                ...params.InputProps,
                type: "search",
              }}
            />
          )}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col mb-4 font-Montserrat">
      <InputLabel
        sx={{ fontFamily: "Montserrat", fontWeight: "medium" }}
        className="ml-4"
        htmlFor={label}
      >
        {label}
      </InputLabel>
      <Input
        sx={{ fontFamily: "Montserrat", fontWeight: "medium" }}
        onChange={handleChange}
        type={type}
        value={value}
        placeholder={placeHolder}
        disabled={isDisabled}
        className={` ${
          value === "" ? "border-border-blue" : "border-[#848484]"
        } border rounded-md h-[46px] p-2`}
      />
    </div>
  );
};

const TutorValidado = (props) => {
  const [phoneWMask, setMask] = useState(props.tel.phone);
  const [animais, setAnimais] = useState([]);
  const [nameAnimal, setName] = useState("");
  const [raca, setRaca] = useState("");
  const [sexo, setSexo] = useState("");
  const [idade, setIdade] = useState("");
  const [id, setId] = useState("");
  const [dadosTutor, setDadosTutor] = useState(props.tel.id);
  const [nameTutor, setTutor] = useState("");
  const [species, setEspecie] = useState("");
  const [stringDate, setDate] = useState("");
  const [hora, setHora] = useState("");
  const [description, setDesc] = useState("");
  const [open, setOpen] = useState(false);
  const [openError, setError] = useState(false);

console.log(species)

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
    nameTutor: z.string().min(0),
  });

  const handleClose = () => {
    setOpen(!open);
  };
  const handleError = () => {
    setError(!openError);
  };

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
      handleClose();
    } catch (error) {
      handleError();
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

  useEffect(() => {
    getAnimalByTutorId(props.tel.id, setAnimais);
  }, []);

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
                  IsPaciente
                  ArrAnimais={animais}
                  setArrAnimais={setAnimais}
                  setId={setId}
                  setSpecies={setEspecie}
                  setRaca={setRaca}
                  setSexo={setSexo}
                  setIdade={setIdade}
                />

                <InputConsulta
                  inputProps={{ "data-testid": "tel-input-valid" }}
                  label="Tutor"
                  type="text"
                  setter={setTutor}
                  value={props.tel.name}
                  isDisabled={true}
                  placeHolder="Digite o nome completo"
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

                <div className="flex flex-col mb-4 first-line:after: font-medium">
                  <label className="ml-4">
                    Telefone
                    <input
                      type="text"
                      onChange={handlePhone}
                      value={phoneMask(props.tel.phone)}
                      disabled={true}
                      className={
                        "border-[#848484] border rounded-md h-[46px] p-2 text-base text-[#848484]  font-normal"
                      }
                      data-testid="input-modal-agendamento"
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
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
          message="Consulta Criada com Sucesso!"
          sx={{ marginBottom: "10vh" }}
        />
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          open={openError}
          autoHideDuration={3000}
          onClose={handleError}
          message="Erro ao criar Consulta!"
          sx={{ marginBottom: "10vh" }}
        />
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
  placeHolder: PropTypes.string,
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
