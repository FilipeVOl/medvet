import { useState, useCallback ,useEffect } from "react";
import { Input, InputLabel, Snackbar } from "@mui/material";
import PropTypes from "prop-types";
import Textarea from "@mui/joy/Textarea";
import z from "zod";
import { CreateConsult } from "../../services/agendamento";
import InputMask from "react-input-mask";
import { TextField } from "@mui/material";
import { useNavigate } from 'react-router-dom';

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

const formatInitialPhone = (phoneNumber) => {
  if (!phoneNumber) return "";
  let cleaned = phoneNumber.replace(/\D/g, '');
  
  if (phoneNumber.includes('(')) {
    cleaned = phoneNumber.replace(/[\(\)\s-]/g, '');
  }

  if (cleaned.length >= 11) {
    return `(${cleaned.slice(0,2)}) ${cleaned.slice(2,7)}-${cleaned.slice(7,11)}`;
  }
  return phoneNumber;
};

const TutorInvalido = ({ tel }) => {
  const navigate = useNavigate();
  const initialPhone = formatInitialPhone(tel?.phone);
     const [phone, setPhone] = useState(() => {
    const formatted = formatInitialPhone(tel?.phone);
    return formatted;
  });
     const [phoneWMask, setMask] = useState(() => {
    const formatted = formatInitialPhone(tel?.phone);
    return formatted;
  });
  const [nameAnimal, setName] = useState("");
  const [nameTutor, setTutor] = useState("");
  const [species, setEspecie] = useState("");
  const [stringDate, setDate] = useState("");
 // const [hora, setHora] = useState("");
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
    species: z.string().min(1, "Espécie é obrigatória"),
    stringDate: z.string()
    .regex(/^\d{2}\/\d{2}\/\d{4}$/, "Data deve estar no formato DD/MM/YYYY")
    .refine((date) => {
      const [day, month, year] = date.split('/').map(Number);
      return day >= 1 && day <= 31 && month >= 1 && month <= 12;
    }, "Data inválida"),
    phone: z.string()
    .regex(/^\(\d{2}\)\d{5}-\d{4}$/, "Telefone deve estar no formato (XX)XXXXX-XXXX"),
    description: z.string().nullable().default(''),
    nameAnimal: z.string().min(1, "Nome do animal é obrigatório"),
    nameTutor: z.string().min(1, "Nome do tutor é obrigatório"),
  });

 useEffect(() => {
    if (tel?.phone) {
      const formatted = formatInitialPhone(tel.phone);
      setPhone(formatted);
      setMask(formatted);
    }
  }, [tel?.phone]);

  const handleClose = () => {
    setOpen(!open);
  };
  const handleError = () => {
    setError(!openError);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const [year, month, day] = stringDate.split('-');
      const formattedDate = `${day}/${month}/${year}`;
  
      const formattedPhone = phoneWMask.replace(/\s/g, '');
  
      const consulta = ConsultaSchema.parse({
        nameAnimal,
        species,
        stringDate: formattedDate,
        description: description || '',
        phone: formattedPhone,
        nameTutor,
      });
  
      console.log('Sending data:', consulta);
      const response = await CreateConsult(consulta);
      console.log('Response:', response);
      
      handleClose();
      
      setTimeout(() => {
        navigate('/agenda'); 
      }, 1000);
      
    } catch (error) {
      console.error('Error details:', error);
      handleError();
    }
  };

  const handlePhone = (e) => {
    const value = e.target.value;
    let formattedValue = value;

    if (value.replace(/\D/g, '').length > 0) {
      const digits = value.replace(/\D/g, '');
      if (digits.length >= 11) {
        formattedValue = `(${digits.slice(0,2)}) ${digits.slice(2,7)}-${digits.slice(7,11)}`;
      }
    }

    setPhone(formattedValue);
    setMask(formattedValue);
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

              {/*     <div className="flex flex-col mb-4">
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
*/}
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
  tel: PropTypes.shape({
    phone: PropTypes.string
  }),
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
    })
  ),
};

export default TutorInvalido;
