import { useState, useEffect } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import "../Component/nova consulta/consultPages.css";
import InputComponent from "../Component/nova consulta/InputComponent";
import { postAnimal } from "../services/animals";
import { getAnimalsAndTutorByTutorName } from "../services/tutores";
import { Alert, Snackbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function CreateAnimal() {
  const navigate = useNavigate();
  const [paciente, setPaciente] = useState("");
  const [tutor, setTutor] = useState("");
  const [especie, setEspecie] = useState("");
  const [raca, setRaca] = useState("");
  const [sexo, setSexo] = useState("");
  const [idade, setIdade] = useState("");
  const [peso, setPeso] = useState("");
  const [pelagem, setPelagem] = useState("");
  const [tutores, setTutores] = useState([]);
  const [required, setRequired] = useState({
    paciente: false,
    especie: false,
    raca: false,
    sexo: false,
    idade: false,
    peso: false,
    tutor: false,
  });
  const [snackFailed, setSnackFailed] = useState(false);
  //carrega os autoCompletes ao abrir a página.
  useEffect(() => {
    getAnimalsAndTutorByTutorName(setTutores, "");
    console.log(tutores);
  }, []);

  const fullfillValidate = {
    especie,
    raca,
    sexo,
    idade,
    peso,
    paciente,
    tutor,
  };

  const validateTrue = (chaves) => {
    let obj = { ...required };
    const keys = Object.keys(obj);
    keys.forEach((e) => {
      if (e == chaves) {
        obj[e] = false;
      }
    });
    setRequired(obj);
  };
  //botao de Proximo validando lógica se o animal colocado existe
  const validateInputs = () => {
    const keys = Object.keys(fullfillValidate);
    const values = Object.values(fullfillValidate);
    let validation = false;
    let obj = { ...required };
    values.map((e, index) => {
      if (e == "") {
        const chaves = keys[index];
        obj[chaves] = true;
        validation = true;
      }
    });
    setRequired(obj);
    return validation;
  };

  const handlePostAnimal = async () => {
    const validacaoCampos = validateInputs();

    if (validacaoCampos) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
      return;
    } else {
      const animal = {
        name: paciente,
        species: especie,
        race: raca,
        gender: sexo,
        age: idade,
        weight: peso,
        coat: pelagem,
        tutor_id: tutores[0].id,
      };
      const validyCreateAnimal = await postAnimal(animal, tutores[0].id);
      if (validyCreateAnimal) {
        Swal.fire({
          icon: "success",
          title: "Animal cadastrado com sucesso!",
          showConfirmButton: false,
          confirmButtonText: "OK",
          confirmButtonColor: "#144A36",
        }).then(() => {
          navigate("/");
        });
      } else {
        muiSnackAlert("info", "Animal já existente.");
      }
    }
  };

  const [openAlert, setOpenAlert] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [message, setMessage] = useState("");
  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };
  const muiSnackAlert = (severity, message) => {
    setSeverity(severity);
    setMessage(message);
    setOpenAlert(true);
  };

  return (
    <>
      <Snackbar
        open={openAlert}
        autoHideDuration={2000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity={severity}
          sx={{ width: "100%" }}
          onClose={handleCloseAlert}
        >
          {message}
        </Alert>
      </Snackbar>
      <div className="font-Montserrat p-14 w-full">
        <div className="font-bold font-Montserrat">
          <h1 className="text-2xl">Novo Animal</h1>
        </div>
        <div>
          <form className="text-[18px] ">
            <div className=" w-full">
              <div id="div-pac-tut" className="flex gap-8 my-4 justify-center">
                <label htmlFor="free-solo-2-demo" className="grow">
                  Tutor
                  <Autocomplete
                    freeSolo
                    disableClearable
                    sx={{
                      border: "none",
                    }}
                    id="free-solo-2-demo"
                    onChange={(_e, newValue) => {
                      setTutor(newValue);
                      getAnimalsAndTutorByTutorName(setTutores, newValue);
                      validateTrue("tutor");
                    }}
                    options={tutores.map((option) => option.name)}
                    value={tutor}
                    renderInput={(params) => (
                      <TextField
                        sx={{
                          border: required.tutor ? "2px solid red" : "none",
                          margin: 0,
                          borderRadius: 3,
                          fontFamily: "Montserrat",
                        }}
                        onChange={(e) => {
                          setTutor(e.target.value);
                          getAnimalsAndTutorByTutorName(
                            setTutores,
                            e.target.value
                          );
                          validateTrue("tutor");
                        }}
                        onClick={() => validateTrue("tutor")}
                        {...params}
                        InputProps={{
                          ...params.InputProps,
                          type: "search",
                        }}
                      />
                    )}
                  />
                </label>
                <InputComponent
                  nome="Paciente"
                  dataType="text"
                  type={paciente}
                  setDataCom={setPaciente}
                  requireVal={required.paciente}
                  handleButton={validateTrue}
                  descrHandle="paciente"
                />
              </div>
              <div className="flex gap-8 justify-center" id="div-esp-rac-sex">
                <InputComponent
                  nome="Espécie"
                  dataType="text"
                  type={especie}
                  setDataCom={setEspecie}
                  requireVal={required.especie}
                  handleButton={validateTrue}
                  descrHandle="especie"
                />
                <InputComponent
                  nome="Raça"
                  dataType="text"
                  type={raca}
                  setDataCom={setRaca}
                  requireVal={required.raca}
                  handleButton={validateTrue}
                  descrHandle="raca"
                />
                <label className="grid h-full grow">
                  Sexo
                  <select
                    value={sexo}
                    onChange={(e) => {
                      setSexo(e.target.value);
                      validateTrue("sexo");
                    }}
                    className={`${
                      required.sexo
                        ? "outline-red-600 border-red-500"
                        : "outline-gray-input"
                    } w-full grow p-1 py-2 rounded-lg bg-white border-solid border-2 border-gray`}
                  >
                    <option className="bg-white-500" value=""></option>
                    <option
                      className="bg-white-500"
                      value="Macho"
                      defaultValue={true}
                    >
                      Macho
                    </option>
                    <option value="Fêmea">Fêmea</option>
                    <option value="INDEFINIDO">Indefinido</option>
                  </select>
                </label>
              </div>
              <div id="ida-pes-pela" className="flex gap-8 my-4 justify-center">
                <InputComponent
                  nome="Idade"
                  dataType="text"
                  type={idade}
                  setDataCom={setIdade}
                  requireVal={required.idade}
                  handleButton={validateTrue}
                  descrHandle="idade"
                />
                <InputComponent
                  nome="Peso"
                  dataType="text"
                  type={peso}
                  setDataCom={setPeso}
                  requireVal={required.peso}
                  handleButton={validateTrue}
                  descrHandle="peso"
                />
                <InputComponent
                  nome="Pelagem"
                  dataType="text"
                  type={pelagem}
                  setDataCom={setPelagem}
                />
              </div>
            </div>
            <button
              type="button"
              className="hover:bg-blue-button bg-[#D5D0C7] py-2 px-16 my-32 rounded-lg text-white float-right"
              onClick={handlePostAnimal}
            >
              Cadastrar
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
