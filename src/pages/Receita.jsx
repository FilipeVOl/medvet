import { useContext, useState, useEffect } from "react";
import { Input, InputLabel, TextField, createTheme } from "@mui/material";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import AddIcon from "../assets/add.svg";
import IconButton from "@mui/material/IconButton";
import CancelIcon from "../images/trash.svg";
import {
  postPrescription,
  getPrescription,
  getAllPresc,
} from "../services/prescription";
import { PrescContext } from "../contexts/prescContext";
import {
  getAnimalsAndTutorByTutorName,
  getTutores,
  getAnimalsReceipt,
} from "../services/tutores";
import Autocomplete from "@mui/material/Autocomplete";
import "../Component/nova consulta/consultPages.css";
import { getEnchiridion } from "../services/enchiridion";
import {
  getAllTeachers,
  getTeacherByName,
  getProfById,
  getTeacherIdByName,
} from "../services/professores";
import { getAnimalBySequenceOrName } from "../services/animals";

export const InputReceita = ({
  label,
  setter,
  value,
  descrValue,
  requireVal,
  handleButton,
  isTutor,
  isProf,
  isPaciente,
  arrTutores,
  arrPacientes,
  arrProfs,
  setArrProf,
  setArrTutor,
  setArrPaci,
  setSpecies,
  setRaca,
  setSexo,
  setIdade,
  setPeso,
  setId,
}) => {
  const handleChanges = (e) => {
    setter(e.target.value);
  };

  if (isTutor) {
    return (
      <label htmlFor="free-solo-2-demo " className="grow text-mui">
        Tutor
        <Autocomplete
          freeSolo
          disableClearable
          id="free-solo-2-demo"
          onChange={(_e, newValue) => {
            setter(newValue);
            getAnimalsReceipt(setArrTutor, setArrPaci, newValue);
          }}
          options={arrTutores.map((option) => option.name)}
          renderInput={(params) => (
            <TextField
              onChange={(e) => {
                setter(e.target.value);
                getAnimalsAndTutorByTutorName(setArrTutor, e.target.value);
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
    );
  }

  if (isProf) {
    return (
      <label htmlFor="free-solo-2-demo" className="grow text-mui">
        Professor
        <Autocomplete
          freeSolo
          disableClearable
          id="free-solo-2-demo"
          onChange={(_e, newValue) => {
            setter(newValue);
            getAllTeachers(setArrProf);
          }}
          options={arrProfs.map((option) => option.name)}
          renderInput={(params) => (
            <TextField
              onChange={(e) => {
                setter(e.target.value);
                getTeacherByName(setArrProf, e.target.value);
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
    );
  }

  if (isPaciente) {
    return (
      <label htmlFor="free-solo-2-demo" className="grow text-mui">
        Paciente
        <Autocomplete
          freeSolo
          id="free-solo-2-demo"
          disableClearable
          onChange={(_e, newValue) => {
            setter(newValue);
            const filter = arrPacientes.filter((e) => e.name === newValue);
            setSpecies(filter[0].species);
            setRaca(filter[0].race);
            setSexo(filter[0].gender);
            setIdade(filter[0].age);
            // setPeso(filter[0].weigth);
            setId(filter[0].sequence);
          }}
          options={arrPacientes.map((option) => option.name)}
          renderInput={(params) => (
            <TextField
              id="textField"
              onChange={(e) => {
                setter(e.target.value);
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
    );
  }

  return (
    <div className="flex flex-col mb-4">
      <InputLabel className="ml-4">{label}</InputLabel>
      <Input
        type="text"
        variant="outlined"
        onChange={handleChanges}
        onClick={() => handleButton(descrValue)}
        value={value}
        className={`${
          requireVal ? "outline-red-600 border-red-500" : "outline-gray-input"
        } border rounded-md h-[46px] p-2 text-base border-border-gray`}
      />
    </div>
  );
};

export const Receita = () => {
  // FAZER REQUISIÇÃO DO TEACHER_ID DA TELA DE NOVACONSULTA
  const { medications, setMedications } = useContext(PrescContext);
  const [animal_id, setAnimal] = useState("");
  const [paciente, setPaciente] = useState("");
  const [tutor, setTutor] = useState("");
  const [species, setSpecies] = useState("");
  const [raca, setRaca] = useState("");
  const [sexo, setSexo] = useState("");
  const [idade, setIdade] = useState("");
  const [peso, setPeso] = useState("");
  const [id, setId] = useState("");
  const [professor, setProfessor] = useState("");
  const [teacher_id, setTeacherId] = useState("");
  const [openModal, setOpenModal] = useState(!open);
  const [tutores, setTutores] = useState([]);
  const [professores, setProfessores] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [required, setRequired] = useState({
    professor: false,
    paciente: false,
    tutor: false,
    species: false,
    raca: false,
    sexo: false,
    idade: false,
    peso: false,
    id: false,
    unit: false,
    measurement: false,
    description: false,
  });

  const handleButtonClick = () => {
    setOpenModal(!openModal);
  };

  useEffect(() => {
    getEnchiridion(setTeacherId);
    getAnimalsReceipt(setTutores, setPacientes, "");
    getAllTeachers(setProfessores);
  }, []);

  useEffect(() => {
    getAnimalBySequenceOrName(paciente).then((data) => {
      setAnimal(data);
    });
    getTeacherIdByName(professor).then((data) => {
      setTeacherId(data);
    });
  }, [paciente, professor]);

  useEffect(() => {}, [medications]);

  const fullfillValidate = {
    professor,
    paciente,
    tutor,
    species,
    raca,
    sexo,
    idade,
    peso,
    id,
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

  const validateInputs = () => {
    medications.forEach((e) => {
      Object.entries(e).forEach(([key, value]) => {
        fullfillValidate[key] = value;
      });
    });
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

  const array = [...medications];

  const addMedicamento = () => {
    const obj = {
      use_type: "",
      farmacia: "",
      unidade: "",
      medicacao: "",
      descricao: "",
    };
    array.push(obj);
    setMedications(array);
  };

  const deleteMedicamento = () => {
    array.splice(array.length - 1, 1);
    setMedications(array);
  };

  const handleMedicamento = (arr, index, valor, key) => {
    const array = [...arr];
    array[index] = { ...array[index], [key]: valor };
    setMedications(array);
  };

  const handleSubmit = async () => {
    try {
      const validacaoCampos = validateInputs();
      if (validacaoCampos) {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
      } else {
        handleButtonClick();
        const id = await postPrescription(data);

        console.log(id);
        if (id) {
          const prescriptionData = await getPrescription(id); // Faz a requisição com o ID
          console.log(prescriptionData); // Exibe os dados da prescrição

          // Inicia o download no navegador
          window.open(`http://localhost:3333/pdf/prescription/${id}`, "_blank");
        }
      }
    } catch (error) {
      console.error("Erro durante o processo:", error);
    }
  };

  const data = {
    teacher_id,
    animal_id,
    tutor,
    species,
    raca,
    sexo,
    idade,
    peso,
    id,
    medications,
  };

  return (
    <div className="font-Montserrat">
      <h1 className="p-14 h-10 text-2xl font-bold">Receita</h1>
      <p className="text-xl px-20 py-8">Identificação</p>
      <form className="px-24">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <InputReceita
            label="Tutor"
            setter={setTutor}
            arrTutores={tutores}
            setArrTutor={setTutores}
            setArrPaci={setPacientes}
            value={tutor}
            descrValue="tutor"
            requireVal={required.tutor}
            handleButton={validateTrue}
            isTutor
          />

          <InputReceita
            label="Professor"
            setter={setProfessor}
            arrProfs={professores}
            setArrProf={setProfessores}
            setArrPaci={setPacientes}
            value={professor}
            descrValue="professor"
            requireVal={required.professor}
            handleButton={validateTrue}
            isProf
          />

          <InputReceita
            label="Paciente"
            setter={setPaciente}
            arrTutores={tutores}
            arrPacientes={pacientes}
            setArrTutor={setTutores}
            setArrPaci={setPacientes}
            setSpecies={setSpecies}
            setRaca={setRaca}
            setSexo={setSexo}
            setPeso={setPeso}
            setIdade={setIdade}
            setId={setId}
            value={paciente}
            descrValue="paciente"
            requireVal={required.paciente}
            handleButton={validateTrue}
            isPaciente
          />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <InputReceita
            label="Espécie"
            setter={setSpecies}
            value={species}
            descrValue="species"
            requireVal={required.species}
            handleButton={validateTrue}
          />
          <InputReceita
            label="Raça"
            setter={setRaca}
            value={raca}
            descrValue="raca"
            requireVal={required.raca}
            handleButton={validateTrue}
          />
          <InputReceita
            label="Sexo"
            setter={setSexo}
            value={sexo}
            descrValue="sexo"
            requireVal={required.sexo}
            handleButton={validateTrue}
          />
        </div>
        <div className="grid grid-cols-3 gap-4 w-3/4">
          <InputReceita
            label="Idade"
            setter={setIdade}
            value={idade}
            descrValue="idade"
            requireVal={required.idade}
            handleButton={validateTrue}
          />
          <InputReceita
            label="Peso"
            setter={setPeso}
            value={peso}
            descrValue="peso"
            requireVal={required.peso}
            handleButton={validateTrue}
          />
          <InputReceita
            label="ID"
            setter={setId}
            value={id}
            descrValue="id"
            requireVal={required.id}
            handleButton={validateTrue}
          />
        </div>
      </form>

      <p className="text-xl px-20 py-8">Medicação</p>
      <div>
        {medications.map((e, index) => {
          return (
            <form
              key={index}
              className="px-24 w-auto mb-20 border-2 mx-8 py-8 flex flex-col gap-4"
            >
              <img
                src={CancelIcon}
                onClick={() => deleteMedicamento()}
                className="cursor-pointer w-6 h-6 fill-red-500 self-end"
              />
              <div className="grid grid-cols-3 gap-10">
                <label>
                  Uso
                  <select
                    value={e.use_type}
                    onChange={(e) =>
                      handleMedicamento(
                        medications,
                        index,
                        e.target.value,
                        "use_type"
                      )
                    }
                    className="border flex-col flex w-full rounded-md h-[46px] grow p-2 text-base border-border-gray"
                  >
                    <option value="oral">Oral</option>
                    <option value="retal">Retal</option>
                    <option value="sublingual">Sublingual</option>
                    <option value="injetavel">Injetável</option>
                    <option value="dermatologico">Dermatológico</option>
                    <option value="nasal">Nasal</option>
                    <option value="oftalmologico">Oftalmológico</option>
                  </select>
                </label>

                <label>
                  Farmácia
                  <select
                    value={e.pharmacy}
                    onChange={(e) =>
                      handleMedicamento(
                        medications,
                        index,
                        e.target.value,
                        "pharmacy"
                      )
                    }
                    className="border flex-col grow flex w-full rounded-md h-[46px] p-2 text-base border-border-gray"
                  >
                    <option value="farmacia1">Farmacia 1</option>
                    <option value="farmacia 2">Farmacia 2</option>
                  </select>
                </label>

                <label>
                  Unidade (qt.)
                  <input
                    value={e.unit}
                    onClick={() => validateTrue("unit")}
                    onChange={(e) =>
                      handleMedicamento(
                        medications,
                        index,
                        e.target.value,
                        "unit"
                      )
                    }
                    className={`${
                      required.unit
                        ? "outline-red-600 border-red-500"
                        : "outline-gray-input"
                    } border rounded-md h-[46px] w-full p-2 text-base border-border-gray`}
                  ></input>
                </label>
              </div>

              <div>
                <label>
                  Medicação
                  <input
                    label="Medicação"
                    value={e.measurement}
                    onClick={() => validateTrue("measurement")}
                    onChange={(e) =>
                      handleMedicamento(
                        medications,
                        index,
                        e.target.value,
                        "measurement"
                      )
                    }
                    className={`${
                      required.measurement
                        ? "outline-red-600 border-red-500"
                        : "outline-gray-input"
                    } border rounded-md h-[46px] w-full p-2 text-base border-border-gray`}
                  ></input>
                </label>
              </div>

              <div>
                <label>
                  Descrição (Posologia)
                  <input
                    value={e.description}
                    onClick={() => validateTrue("description")}
                    onChange={(e) =>
                      handleMedicamento(
                        medications,
                        index,
                        e.target.value,
                        "description"
                      )
                    }
                    className={`${
                      required.description
                        ? "outline-red-600 border-red-500"
                        : "outline-gray-input"
                    } border rounded-md h-[46px] w-full p-2 text-base border-border-gray`}
                  ></input>
                </label>
              </div>
            </form>
          );
        })}
      </div>

      <div className="mx-24">
        <button
          onClick={() => addMedicamento()}
          className="font-bold text-nowrap mt-12 w-full justify-center bg-[#D5D0C7] text-white flex items-center 
          rounded-md h-[46px] hover:bg-[#144A36] border-2
        p-2 text-base"
        >
          <img src={AddIcon} alt="adicionar medicamento" />
          Adicionar Medicamento
        </button>
      </div>

      <div className="flex justify-end w-auto mr-24 mb-8">
        <button
          onClick={() => {
            handleSubmit();
          }}
          className="rounded-md h-[46px] mt-8 w-1/4 border-2 text-center hover:bg-[#144A36] bg-[#D5D0C7] text-white font-bold"
        >
          Confirmar
        </button>
      </div>
      <div>
        <Modal
          open={openModal}
          aria-labelledby="modal-modal-deletetitle"
          aria-describedby="modal-modal-description2"
        >
          <Box id="box-modal-pag1">
            <Typography
              id="modal-modal-deletetitle"
              variant="h6"
              component="h1"
            >
              Consulta Criada
              <p id="descri-modal">Consulta Criada com Sucesso</p>
              <div className="flex justify-between my-12">
                <IconButton id="fechar-modal" onClick={handleButtonClick}>
                  OK
                </IconButton>
              </div>
            </Typography>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default Receita;
