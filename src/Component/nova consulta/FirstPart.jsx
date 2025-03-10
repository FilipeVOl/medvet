import { useState, useContext, useEffect, useMemo, useCallback } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import InputComponent from "./InputComponent";
import { ConsultContext } from "../../pages/NovaConsulta";
import PropTypes from "prop-types";
import "./consultPages.css";
import {
  getAllTeachers,
  getProfessores,
  getTeacherByName,
} from "../../services/professores";
import { getAnimalsAndTutorByTutorName } from "../../services/tutores";
import mais from "../../images/mais.svg";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import fundo from "../../images/fundo.svg";
import { postAnimal } from "../../services/animals";
import { Alert, Snackbar } from "@mui/material";
import Swal from "sweetalert2";

export default function FirstPart(props) {
  const { pagOne, setPagOne } = useContext(ConsultContext);
  const [data, setData] = useState(pagOne.data);
  const [paciente, setPaciente] = useState(pagOne.paciente);
  const [tutor, setTutor] = useState(pagOne.tutor);
  const [especie, setEspecie] = useState(pagOne.especie);
  const [raca, setRaca] = useState(pagOne.raca);
  const [sexo, setSexo] = useState(pagOne.sexo);
  const [idade, setIdade] = useState(pagOne.idade);
  const [peso, setPeso] = useState(pagOne.peso);
  const [pelagem, setPelagem] = useState(pagOne.pelagem);
  const [historico, setHistorico] = useState(pagOne.historico);
  const [professor, setProfessor] = useState(pagOne.professor);
  const [professores, setProfs] = useState([]);
  const [tutores, setTutores] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [motivo, setMotivo] = useState(pagOne.motivo);
  const [viewTutor, setviewTutor] = useState(pagOne.viewTutor);
  const [vacina, setVacina] = useState(pagOne.vacina);
  const [desmer, setDesmer] = useState(pagOne.desmer);
  const [animalSelecionado, setAnimalSelecionado] = useState(true);
  const [viewAnimal, setViewAnimal] = useState(pagOne.viewAnimal);
  const [openModal, setOpenModal] = useState(false);
  const [required, setRequired] = useState({
    paciente: false,
    especie: false,
    raca: false,
    sexo: false,
    idade: false,
    peso: false,
    tutor: false,
    professor: false,
    data: false,
  });

  //muda o state do modal
  const handleButtonClick = () => {
    Swal.fire({
      title: "Cadastrar animal?",
      text: "O animal inserido ainda não possui cadastro, deseja cadastrá-lo?",
      showCancelButton: true,
      confirmButtonText: "Cadastrar",
      cancelButtonText: "Voltar",
      confirmButtonColor: "#144A36",
      cancelButtonColor: "#000",
    }).then((result) => {
      if (result.isConfirmed) {
        registerNewAnimal();
      }
    });
  };

  //seta os animais baseado no tutor.
  useEffect(() => {
    if (
      typeof tutores[0] === "object" &&
      "animals" in tutores[0] &&
      tutores[0].animals.length > 0
    ) {
      setPacientes(tutores[0].animals);
    } else {
      setPacientes([]);
    }

    if (paciente === "" || paciente === "Preencha Tutor") {
      setviewTutor(false);
    } else {
      setviewTutor(true);
    }
  }, [tutores, paciente]);

  // Initialization useEffect
  useEffect(() => {
    getAllTeachers(setProfs);
    getAnimalsAndTutorByTutorName(setTutores, "");
  }, []);

  //carrega os autoCompletes ao abrir a página.
  useEffect(() => {
    getAllTeachers(setProfs);
    getAnimalsAndTutorByTutorName(setTutores, "");
  }, []);

  // verifica se o novo valor é diferente do valor atual antes de chamar o set
  const handleInput = useCallback((objReceived, chave, valor, set) => {
    if (objReceived[chave] !== valor) {
      let obj = { ...objReceived };
      obj[chave] = valor;
      set(obj);
    }
  }, []);

  //usa o set para vacina que modifica o array de vacinas
  const handleVacina = (arr, index, valor, key) => {
    const array = [...arr];
    array[index] = { ...array[index], [key]: valor };
    setVacina(array);
  };

  //botão que adiciona vacinas
  const addVacina = () => {
    const array = [...vacina];
    const obj = { name: "", date: "" };
    array.push(obj);
    setVacina(array);
  };
  const removeVacina = (e) => {
    const arr = [...vacina];
    setVacina(arr.filter((_i, index) => index != e));
  };

  // sim, surpreendentemente isso é mais eficiente
  const pageOneData = useMemo(
    () => ({
      data,
      paciente,
      tutor,
      especie,
      raca,
      sexo,
      idade,
      peso,
      pelagem,
      historico,
      professor,
      vacina,
      desmer,
      motivo,
      idAnimal: pacientes.filter((e) => e.name === paciente),
      viewAnimal,
      viewTutor,
      teacher_id: professores.find((e) => e.name === professor),
    }),
    [
      data,
      paciente,
      tutor,
      especie,
      raca,
      sexo,
      idade,
      peso,
      pelagem,
      historico,
      professor,
      vacina,
      desmer,
      motivo,
      pacientes,
      viewAnimal,
      viewTutor,
      professores,
    ]
  );

  const fullfillValidate = {
    paciente,
    especie,
    raca,
    sexo,
    idade,
    peso,
    tutor,
    professor,
    data,
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
      if (e == "" || e == "Preencha Tutor") {
        const chaves = keys[index];
        obj[chaves] = true;
        validation = true;
      }
    });
    setRequired(obj);
    return validation;
  };

  // useCallback previne a recriação da função a cada renderização
  const handleProx = useCallback(() => {
    const validacaoCampos = validateInputs();
    if (validacaoCampos) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
      return;
    }
    if (pacientes.some((e) => e.name === paciente)) {
      props.setSteps(2);
      setPagOne(pageOneData);
    } else {
      handleButtonClick();
    }
  }, [
    validateInputs,
    pacientes,
    paciente,
    props.setSteps,
    pageOneData,
    handleButtonClick,
  ]);

  // Snackbar Alert
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

  const registerNewAnimal = async () => {
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
      const envioData = pageOneData;
      envioData.idAnimal = [{ id: validyCreateAnimal.data }];
      muiSnackAlert("success", "Animal cadastrado com sucesso!");
      props.setSteps(2);
      setPagOne(envioData);
    } else {
      muiSnackAlert("error", "Erro ao cadastrar animal!");
    }
  };

  return (
    <>
      <Snackbar
        open={openAlert}
        autoHideDuration={2000}
        onClose={handleCloseAlert}
      >
        <Alert
          severity={severity}
          sx={{ width: "100%" }}
          onClose={handleCloseAlert}
        >
          {message}
        </Alert>
      </Snackbar>
      <div className="font-Montserrat p-28 w-full">
        <div className="font-semibold">
          <span className="text-xl md:text-2xl font-bold">Identificação</span>
        </div>
        <div>
          <form className="text-[18px]">
            <div className="py-8 w-full">
              <div className="flex gap-8" id="div-prof-data">
                <label
                  htmlFor="free-solo-2-demo"
                  className="w-full items-center"
                >
                  Professor
                  <Autocomplete
                    freeSolo
                    id="free-solo-2-demo"
                    disableClearable
                    options={professores.map((option) => option.name)}
                    onChange={(_e, newValue) => {
                      setProfessor(newValue);
                      validateTrue("professor");
                    }}
                    value={professor}
                    renderInput={(params) => (
                      <TextField
                        sx={{
                          border: required.professor
                            ? "1.5px solid red"
                            : "none",
                          margin: 0,
                          borderRadius: 2,
                          fontFamily: "Montserrat",
                        }}
                        value={professor}
                        onChange={(e, value) => {
                          setProfessor(value);
                          e.target.value.length == 0
                            ? getAllTeachers(setProfs)
                            : getTeacherByName(e.target.value);
                          validateTrue("professor");
                        }}
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
                  nome="Data"
                  dataType="date"
                  type={data}
                  setDataCom={setData}
                  requireVal={required.data}
                  handleButton={validateTrue}
                  descrHandle="data"
                  locale="pt-BR"
                />
              </div>
              <div id="div-pac-tut" className="flex gap-8 my-4 justify-center">
                <label htmlFor="free-solo-2-demo" className="grow">
                  Tutor
                  <Autocomplete
                    freeSolo
                    disableClearable
                    id="free-solo-2-demo"
                    disabled={viewTutor}
                    onChange={(_e, newValue) => {
                      setTutor(newValue);
                      getAnimalsAndTutorByTutorName(setTutores, newValue);
                      setViewAnimal(false);
                      setPaciente("");
                      validateTrue("tutor");
                    }}
                    options={tutores.map((option) => option.name)}
                    value={tutor}
                    renderInput={(params) => (
                      <TextField
                        sx={{
                          border: required.tutor ? "1.5px solid red" : "none",
                          margin: 0,
                          borderRadius: 2,
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
                        {...params}
                        InputProps={{
                          ...params.InputProps,
                          type: "search",
                        }}
                      />
                    )}
                  />
                </label>
                <label htmlFor="free-solo-2-demo" className={"grow"}>
                  Paciente
                  <Autocomplete
                    freeSolo
                    id="free-solo-2-demo"
                    value={paciente}
                    disabled={viewAnimal}
                    onChange={(_e, newValue) => {
                      setPaciente(newValue);
                      const filter = pacientes.filter(
                        (e) => e.name == newValue
                      );
                      setEspecie(filter[0].species);
                      setRaca(filter[0].race);
                      setSexo(filter[0].gender);
                      setIdade(filter[0].age);
                      setPelagem(filter[0].coat);
                      setAnimalSelecionado(true);
                      validateTrue("paciente");
                    }}
                    disableClearable
                    options={pacientes.map((option) => option.name)} // Assuming you want to use the name property as the label
                    renderInput={(params) => (
                      <TextField
                        sx={{
                          border: required.paciente
                            ? "1.5px solid red"
                            : "none",
                          margin: 0,
                          borderRadius: 2,
                          fontFamily: "Montserrat",
                        }}
                        value={paciente}
                        onChange={(e) => {
                          validateTrue("paciente");
                          setPaciente(e.target.value); // Update the state with the new value
                          setAnimalSelecionado(false);
                          if (animalSelecionado) {
                            setEspecie("");
                            setRaca("");
                            setSexo("");
                            setIdade("");
                            setPelagem("");
                          }
                        }}
                        {...params}
                        InputProps={{
                          ...params.InputProps,
                          type: "search",
                        }}
                      />
                    )}
                  />
                </label>
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
                  disable={viewTutor}
                />
                <InputComponent
                  nome="Raça"
                  dataType="text"
                  type={raca}
                  setDataCom={setRaca}
                  requireVal={required.raca}
                  handleButton={validateTrue}
                  descrHandle="raca"
                  disable={viewTutor}
                />
                <label className="grid h-full grow">
                  Sexo
                  <select
                    value={sexo}
                    // disabled={viewTutor}
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
                  dataType="number"
                  type={idade}
                  setDataCom={setIdade}
                  requireVal={required.idade}
                  handleButton={validateTrue}
                  descrHandle="idade"
                />
                <InputComponent
                  nome="Peso"
                  dataType="number"
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
                  disable={viewTutor}
                />
              </div>
            </div>
            <div>
              <div className="font-bold">
                <span className="text-xl md:text-2xl font-bold">Anamnese</span>
              </div>
              <div id="div-cons-hist" className="gap-8 my-8">
                <label htmlFor="motivo">
                  Motivo da Consulta
                  <textarea
                    name="consult"
                    id="consult"
                    cols="25"
                    rows="3"
                    className="w-full border-solid border-2 order-border-gray rounded-lg p-1 resize-none"
                    value={motivo}
                    onChange={(e) => setMotivo(e.target.value)}
                  ></textarea>
                </label>
                <label htmlFor="historico">
                  Histórico
                  <textarea
                    id="historico"
                    name="historico"
                    rows="3"
                    cols="25"
                    className="w-full border-solid border-2 order-border-gray rounded-lg p-1 resize-none"
                    value={historico}
                    onChange={(e) => setHistorico(e.target.value)}
                  ></textarea>
                </label>
              </div>
            </div>
            <div>
              <div className="font-bold">
                <span className="text-xl md:text-2xl font-bold">Vacinação</span>
              </div>
              <div id="div-vac" className="w-full my-4 flex flex-col gap-8">
                {vacina.map((e, index) => {
                  return (
                    <div
                      className="flex gap-8 justify-center items-center"
                      key={index}
                    >
                      <label className="grow">
                        Qual
                        <input
                          type="text"
                          className="w-full border-solid border-2 order-border-gray rounded-lg p-1"
                          value={e.name}
                          onChange={(e) =>
                            handleVacina(vacina, index, e.target.value, "name")
                          }
                        />
                      </label>
                      <label className="">
                        Data da Última
                        <input
                          type="date"
                          name="data1"
                          id="data1"
                          className="w-full border-solid border-2 order-border-gray rounded-lg p-1"
                          value={e.date}
                          onChange={(e) =>
                            handleVacina(vacina, index, e.target.value, "date")
                          }
                        />
                      </label>
                      <div
                        className="bg-remove p-[8px] rounded-lg self-end cursor-pointer"
                        onClick={() => removeVacina(index)}
                      >
                        <img srcSet={fundo}></img>
                      </div>
                    </div>
                  );
                })}
                <div
                  className="flex gap-12 justify-center bg-gray-input p-2 rounded-lg text-white-med shadow-xl cursor-pointer"
                  onClick={() => addVacina()}
                >
                  <div className="flex gap-4">
                    <img srcSet={mais} alt="mais" className="" />
                    <button
                      className="grow font-semibold text-nowrap"
                      type="button"
                    >
                      Adicionar Vacina
                    </button>
                  </div>
                </div>
              </div>
              <div className="font-bold mt-16">
                <span className="text-xl md:text-2xl font-bold">
                  Desverminação
                </span>
              </div>
              <div id="div-vac" className="gap-8 flex justify-center my-8">
                <label className="grow">
                  Qual
                  <input
                    type="text"
                    name="vacina1"
                    id="vacina1"
                    className="w-full border-solid border-2 order-border-gray rounded-lg p-1"
                    value={desmer.name}
                    onChange={(i) =>
                      handleInput(desmer, "name", i.target.value, setDesmer)
                    }
                  />
                </label>
                <label>
                  Data da Última
                  <input
                    type="date"
                    name="data1"
                    id="data1"
                    className="w-full border-solid border-2 order-border-gray rounded-lg p-1"
                    value={desmer.date}
                    onChange={(i) =>
                      handleInput(desmer, "date", i.target.value, setDesmer)
                    }
                  />
                </label>
              </div>
            </div>
            <button
              type="button"
              className="bg-[#D5D0C7] hover:bg-[#144A36] py-2 px-16 my-32 rounded-lg text-white float-right"
              onClick={handleProx}
            >
              Próximo
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

FirstPart.propTypes = {
  setSteps: PropTypes.func.isRequired,
};
