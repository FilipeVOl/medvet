import { useContext, useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { Input, InputLabel, TextField, createTheme } from "@mui/material";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
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
      <label htmlFor="free-solo-2-demo " className="grow ">
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
      <label htmlFor="free-solo-2-demo" className="grow  ">
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
      <label htmlFor="free-solo-2-demo" className="grow ">
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
      <label className="text-sm mb-1">{label}</label>
      <Input
        type="text"
        disableUnderline
        onChange={handleChanges}
        onClick={() => handleButton(descrValue)}
        value={value}
        sx={{
          "&:before": { borderBottom: "none" },
          "&:after": { borderBottom: "none" },
          "&:hover:not(.Mui-disabled):before": { borderBottom: "none" },
          "& .MuiInput-input": { padding: "8px" },
        }}
        className={`${
          requireVal ? "outline-red-600 border-red-500" : "outline-gray-input"
        } border rounded-md h-[46px] text-base border-gray-400`}
      />
    </div>
  );
};

export const Receita = () => {
  // FAZER REQUISIÇÃO DO TEACHER_ID DA TELA DE NOVACONSULTA
  const navigate = useNavigate();
  const [showRegisterModal, setShowRegisterModal] = useState(false);
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
    unit: false,
    measurement: false,
    description: false,
  });
  const handleRedirectToRegister = () => {
    setShowRegisterModal(false);
    navigate("/animal");
  };

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
    let hasErrors = false;
    let obj = { ...required };

    Object.keys(obj).forEach((key) => {
      obj[key] = false;
    });

    if (!paciente) {
      obj.paciente = true;
      hasErrors = true;
      return hasErrors;
    }

    if (!animal_id && !id) {
      setShowRegisterModal(true);
      return true;
    }

    const basicFields = {
      professor,
      tutor,
      species,
      raca,
      sexo,
      idade,
      peso,
    };

    Object.entries(basicFields).forEach(([key, value]) => {
      if (!value || value === "null" || value === "undefined") {
        obj[key] = true;
        hasErrors = true;
        console.log(`Field ${key} is invalid:`, value);
      }
    });

    medications.forEach((med, index) => {
      if (!med.unit || !med.measurement || !med.description) {
        if (!med.unit) obj.unit = true;
        if (!med.measurement) obj.measurement = true;
        if (!med.description) obj.description = true;
        hasErrors = true;
        console.log(`Validation failed for medication ${index + 1}:`, med);
      }
    });

    setRequired(obj);
    return hasErrors;
  };

  const addMedicamento = () => {
    const newMedication = {
      use_type: "oral",
      pharmacy: "farmacia1",
      unit: "",
      measurement: "",
      description: "",
    };
    setMedications((prev) => [...prev, newMedication]);
  };

  const deleteMedicamento = (index) => {
    const updatedMedications = medications.filter((_, i) => i !== index);
    setMedications(updatedMedications);
  };

  const handleMedicamento = (arr, index, valor, key) => {
    setMedications((prev) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        [key]: valor,
      };
      return updated;
    });
  };

  const handleSubmit = async () => {
    try {
      const hasErrors = validateInputs();

      if (hasErrors) {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
        return;
      }

      const formattedMedications = medications.map((med) => ({
        use_type: med.use_type || "oral",
        pharmacy: med.pharmacy || "farmacia1",
        unit: String(med.unit),
        measurement: med.measurement,
        description: med.description,
      }));

      const animalIdentifier = animal_id || id;
      if (!animalIdentifier) {
        throw new Error("No animal ID available");
      }

      const prescriptionData = {
        teacher_id: String(teacher_id),
        animal_id: String(animal_id),
        tutor: String(tutor),
        species: String(species),
        raca: String(raca),
        sexo: String(sexo),
        idade: String(idade),
        peso: String(peso),
        medications: formattedMedications,
      };

      const prescriptionId = await postPrescription(prescriptionData);

      if (prescriptionId) {
        handleButtonClick();

        try {
          const prescriptionResponse = await getPrescription(prescriptionId);
          console.log("Prescription created:", prescriptionResponse);

          setTimeout(() => {
            if (typeof window !== "undefined") {
              window.open(
                `http://localhost:3333/pdf/prescription/${prescriptionId}`,
                "_blank"
              );
            }
          }, 1000);
        } catch (error) {
          console.error("Error getting prescription details:", error);
          alert("Erro ao buscar detalhes da receita");
        }
      }
    } catch (error) {
      console.error("Error submitting prescription:", error);
      alert(
        "Erro ao criar receita. Verifique se um paciente foi selecionado e tente novamente."
      );
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
      <p className="text-xl px-14 py-8">Identificação</p>
      <form className="px-14">
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
        <div className="grid grid-cols-3 gap-4 w-full">
          <label>
            Idade
            <InputReceita
              setter={setIdade}
              value={idade}
              descrValue="idade"
              requireVal={required.idade}
              handleButton={validateTrue}
            />
          </label>
          <label>
            Peso
            <InputReceita
              setter={setPeso}
              value={peso}
              descrValue="peso"
              requireVal={required.peso}
              handleButton={validateTrue}
            />
          </label>
        </div>
      </form>

      <p className="text-xl px-14 py-8">Medicação</p>
      <div>
        {medications.map((e, index) => {
          return (
            <form
              key={index}
              className="px-14 w-auto mb-20 border-2 rounded-xl mx-12 py-8 flex flex-col gap-4"
            >
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => deleteMedicamento(index)}
                  className="self-end text-red-700 cursor-pointer"
                >
                  <DeleteIcon className="w-6 h-6 fill-red-500" />
                </button>
              )}
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
                    className="border flex-col flex w-full rounded-md grow p-3 text-base border-border-gray"
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
                    className="border flex-col grow flex w-full rounded-md p-3 text-base border-border-gray"
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
                    } border rounded-md h-[46px] w-full p-3 text-base border-border-gray`}
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
                    } border rounded-lg h-[46px] w-full p-2 text-base border-border-gray`}
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
          <AddIcon />
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
          onClose={handleButtonClick}
          aria-labelledby="success-modal-title"
          className="font-Montserrat"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              borderRadius: "8px",
            }}
          >
            <Typography id="success-modal-title" variant="h6" component="h2">
              Receita Criada
            </Typography>
            <Typography sx={{ mt: 2 }}>
              Receita criada com sucesso
            </Typography>
            <div className="flex justify-between mt-4 w-full">
              <button
                onClick={handleButtonClick}
                className="px-4 py-2 bg-[#144A36]  w-full text-white rounded-md hover:bg-[#0d3526]"
              >
                OK
              </button>
            </div>
          </Box>
        </Modal>
      </div>
      <Modal
        open={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
        aria-labelledby="register-modal-title"
        className="font-Montserrat"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: "8px",
          }}
        >
          <Typography id="register-modal-title" variant="h6" component="h2">
            Paciente não encontrado
          </Typography>
          <Typography sx={{ mt: 2 }}>
            Este paciente não está cadastrado no sistema. Deseja cadastrá-lo
            agora?
          </Typography>
          <div className="flex justify-between mt-4">
            <button
              onClick={() => setShowRegisterModal(false)}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
            >
              Cancelar
            </button>
            <button
              onClick={handleRedirectToRegister}
              className="px-4 py-2 bg-[#144A36] text-white rounded-md hover:bg-[#0d3526]"
            >
              Cadastrar
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default Receita;
