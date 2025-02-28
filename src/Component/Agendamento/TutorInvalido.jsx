import { useState, useCallback } from "react";
import { Input, InputLabel, Snackbar } from "@mui/material";
import PropTypes from "prop-types";
import Textarea from "@mui/joy/Textarea";
import z from "zod";
import { CreateConsult } from "../../services/agendamento";
import InputMask from "react-input-mask";
import { TextField } from "@mui/material";

const InputConsulta = ({ label, type, setter, value }) => {
  const handleChange = useCallback(
    (e) => {
      setter(e.target.value);
    },
    [setter]
  );

  return (
    <div className="flex flex-col mb-4">
      <InputLabel
        sx={{
          fontFamily: "Montserrat",
          fontSize: "1rem",
          color: "black",
          marginBottom: "0.5rem",
        }}
        htmlFor={label}
      >
        {label}
      </InputLabel>
      <Input
        sx={{ fontFamily: "Montserrat" }}
        onChange={handleChange}
        type={type}
        value={value}
        className={` ${
          value === "" ? "border-[#9F9F9F]" : "border-[#9F9F9F]"
        } border rounded-md h-[46px] p-2 text-base`}
        disableUnderline={true}
      />
    </div>
  );
};

const TutorInvalido = () => {
  const [phone, setPhone] = useState("");
  const [phoneWMask, setMask] = useState("");
  const [nameAnimal, setName] = useState("");
  const [nameTutor, setTutor] = useState("");
  const [species, setEspecie] = useState("");
  const [stringDate, setDate] = useState("");
  const [hora, setHora] = useState("");
  const [description, setDesc] = useState("");
  const [open, setOpen] = useState(false);
  const [openError, setError] = useState(false);
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
  const textAreaStyles = {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#9F9F9F",
      },
      "&:hover fieldset": {
        borderColor: "#9F9F9F",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#9F9F9F",
      },
    },
    "& .MuiInputBase-root": {
      fontFamily: "Montserrat",
    },
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
        phone: phoneUnmask(phoneWMask),
        nameTutor: nameTutor,
      });
      await CreateConsult(consulta);
      handleClose();
      console.log();
    } catch (error) {
      console.error(error.errors);
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

  const phoneUnmask = (value) => {
    return value
      .replace(/\D/g, "")
      .replace(/^(\d{2})\((\d{2})\)(\d{4})-(\d{4})$/, "$1$2$3$4");
  };

  const handlePhone = (e) => {
    setPhone(e.target.value);
    setMask(e.target.value);
  };

  return (
    <>
      <div className=" md:p-16 w-full min-h-screen font-Montserrat">
        <h1 className="text-2xl font-bold  ml-6  ">Agendar Consulta</h1>
        <form>
          <div className="pt-12 ml-4 w-auto">
            <div className="w-auto">
              <div className="gap-8 flex flex-col sm:grid sm:grid-cols-[40%_1fr]">
                <InputConsulta
                  label="Paciente"
                  type="text"
                  value={nameAnimal}
                  setter={setName}
                />

                <InputConsulta
                  label="Tutor"
                  type="text"
                  setter={setTutor}
                  value={nameTutor}
                />
              </div>

              <div className="flex flex-col sm:grid sm:grid-cols-[25%_1fr_2fr_1fr] gap-8 ">
                <InputConsulta
                  label="Espécie"
                  type="text"
                  setter={setEspecie}
                  value={species}
                />

                <div className="flex flex-col mb-4">
                  <InputLabel
                    sx={{
                      fontFamily: "Montserrat",
                      color: "#000000",
                      fontSize: "1rem",
                      marginLeft: "1rem",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Hora
                  </InputLabel>{" "}
                  <InputMask
                    mask="99:99"
                    value={hora}
                    onChange={(e) => setHora(e.target.value)}
                    maskChar={null}
                  >
                    {(inputProps) => (
                      <Input
                        {...inputProps}
                        type="text"
                        className={`${
                          hora === "" ? "border-[#9F9F9F]" : "border-[#9F9F9F]"
                        } border rounded-md h-[46px] p-2 text-base font-Montserrat`}
                        disableUnderline={true}
                        sx={{
                          fontFamily: "Montserrat",
                          "& .MuiInputBase-root::before": {
                            borderBottom: "none",
                          },
                          "&:hover:before": {
                            borderBottom: "none !important",
                          },
                          "&::after": {
                            borderBottom: "none",
                          },
                        }}
                      />
                    )}
                  </InputMask>
                </div>

                <div className="flex flex-col mb-4">
                  <InputLabel
                    sx={{
                      fontFamily: "Montserrat",
                      color: "#000000",
                      fontSize: "1rem",
                      marginLeft: "1rem",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Telefone
                  </InputLabel>
                  <InputMask
                    mask="(99) 99999-9999"
                    value={phone}
                    onChange={handlePhone}
                  >
                    {(inputProps) => (
                      <Input
                        {...inputProps}
                        type="text"
                        className={`${
                          phone === "" ? "border-[#144A36]" : "border-[#9F9F9F]"
                        } border rounded-md h-[46px] p-2 text-base font-Montserrat`}
                        disableUnderline={true}
                        sx={{
                          fontFamily: "Montserrat",
                          "& .MuiInputBase-root::before": {
                            borderBottom: "none",
                          },
                          "&:hover:before": {
                            borderBottom: "none !important",
                          },
                          "&::after": {
                            borderBottom: "none",
                          },
                        }}
                      />
                    )}
                  </InputMask>
                </div>

                <div className="flex flex-col mb-4">
                  <InputLabel
                    sx={{
                      fontFamily: "Montserrat",
                      color: "#000000",
                      fontSize: "1rem",
                      marginLeft: "1rem",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Data
                  </InputLabel>
                  <TextField
                    type="date"
                    value={stringDate}
                    onChange={(e) => setDate(e.target.value)}
                    className="border rounded-md h-[46px] font-Montserrat"
                    sx={{
                      "& .MuiInputBase-root": {
                        height: "46px",
                        fontFamily: "Montserrat",
                        border: "none",
                      },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor:
                            stringDate === "" ? "#144A36" : "#9F9F9F",
                        },
                        "&:hover fieldset": {
                          borderColor: "#9F9F9F",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#9F9F9F",
                        },
                      },
                    }}
                  />
                </div>
              </div>

              <div className="mt-[5%]">
                <label htmlFor="observation">Observação</label>
                <Textarea
                  disabled={false}
                  minRows={7}
                  size="md"
                  variant="outlined"
                  onChange={(e) => {
                    setDesc(e.target.value);
                  }}
                  disableUnderline={true}
                  sx={textAreaStyles}
                />
              </div>

              <div className="flex justify-end ml-4 mt-8">
                <button
                  onClick={handleSubmit}
                  className={`${
                    !handleSubmit
                      ? "cursor-not-allowed opacity-25"
                      : "hover:bg-[#144A36]"
                  } font-Montserrat border-2 w-full md:w-52 rounded-md h-10 bg-[#D5D0C7] text-white transition-colors`}
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
          message="Error ao criar Consulta!"
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
};

TutorInvalido.propTypes = {
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

export default TutorInvalido;
