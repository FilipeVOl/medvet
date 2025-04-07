import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { getProntuario } from "../services/prontuario";
import CircularProgress from "@mui/material/CircularProgress";
import { Close as CloseIcon } from '@mui/icons-material';

import {
  getEnchiridion,
  getEnchiridionsAnimalId,
} from "../services/enchiridion";
import { Stepper, StepButton, Step, StepLabel, Button,IconButton } from "@mui/material";
import { useParams } from "react-router-dom";
import CircularIndeterminate from "../Component/Prontuarios/Loading";
import { useNavigate } from "react-router-dom";
import { PrescContext } from "../contexts/prescContext";
import { Link } from "react-router-dom";
import {
  Modal,
  Box,
  Typography,
  DialogContent,
  DialogContentText,
  Dialog,
} from "@mui/material";
import jsPDF from "jspdf";
import { BorderAllRounded } from "@mui/icons-material";
import ModalAnexo from "../Component/Prontuarios/ModalAnexo";
import ModalViewAnexo from "../Component/Prontuarios/ModalViewAnexo";
import ModalDelete from "../Component/Prontuarios/ModalDelete";
import ModalEdit from "../Component/Prontuarios/ModalEdit";
import { getPrescByAnimalId, getPrescription } from "../services/prescription";
import { getAnexos } from "../services/anexos";
import { getAnimalById } from "../services/animals";
import { getAllTeachers, getTeacherByName } from "../services/professores";
import axios from "axios";
import {
  Search as SearchIcon,
  Print as PrintIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  LocalHospital as MedicineIcon,
  AttachFile as AnexoIcon,
  AddPhotoAlternate as AddPhotoAlternateOutlinedIcon,
  MedicalInformation as MedicalInformationIcon,
} from "@mui/icons-material";
import { set } from "zod";

export default function Prontuario() {
  const { id } = useParams();
  const [animal, setAnimal] = useState({});
  const [activeStep, setActiveStep] = useState(0);
  const steps = [
    "Informações Gerais",
    "Status dos Sistemas",
    "Sinais Vitais",
    "Vacinação e Vermifugação",
  ];
  const [enchiridions, setEnchiridions] = useState([]);
  const [medications, setMedications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [teacherNames, setTeacherNames] = useState([]);
  const [isClicked, setIsClicked] = useState("consultas");
  const fileInputRef = useRef();
  const [selectedFile, setSelectedFile] = useState("");
  const [deletedMedications, setDeletedMedications] = useState([]);
  const [modal, setModal] = useState(false);
  const [openModal, setOpenModal] = useState(null);
  const [selectedAnexoId, setSelectedAnexoId] = useState(null); // Add this line
  const [anexos, setAnexos] = useState([]);
  const [search, setSearch] = useState("");
  const [consultationDetails, setConsultationDetails] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [filteredEnchiridions, setFilteredEnchiridions] = useState([]);
  const { selectedMedicationId, setSelectedMedicationId } =
    useContext(PrescContext); // Add this line

  const [selectedAttachment, setSelectedAttachment] = useState();
  const [openAttachment, setOpenAttachment] = useState(false);
  const handleOpenAttachment = (id) => {
    console.log("ID do anexo:", id); // Log the ID of the selected anexo
    const selectedAnexo = anexos.find((anexo) => anexo.id === id);
    setSelectedAttachment(selectedAnexo);
    console.log(selectedAnexo);
    setOpenAttachment(true);
    setSelectedAnexoId(id);
  };
  const handleCloseAttachment = () => {
    setOpenAttachment(false);
    setSelectedAnexoId(null);
    setSelectedAttachment(null);
    setSelectedFile(null);
  };

  const handleOpenModal = (modalName, id = null, name = "") => {
    setOpenModal(modalName);
    if (modalName === "delete" || modalName === "editPresc") {
      setSelectedMedicationId(id); // Set the selected medication ID in the context
    } else if (modalName === "deleteAnexo" || modalName === "editAnexo") {
      setSelectedAnexoId(id); // Set the selected anexo ID in the state
    }
    setSelectedFile(name);
  };

  const handleCloseModal = () => {
    setOpenModal(null);
    setSelectedMedicationId(null);
    setSelectedAnexoId(null);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "auto",
    height: "auto",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    borderRadius: "0.5rem",
  };

  const consultationModalStyle = {
    ...style,
    width: "80%",
    maxHeight: "80vh",
    overflow: "auto",
  };

  const handleFileUpload = (file) => {
    if (file) {
      setSelectedFile(file); // Set the selected file in the state
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await getEnchiridionsAnimalId(id);
      const medication = await getPrescByAnimalId(id);
      const anexos = await getAnexos(id);
      const animal = await getAnimalById(id);
      setAnimal(animal.data);
      setEnchiridions(response.enchiridions);
      setMedications(medication);
      setAnexos(anexos);
      await getTeacherNames();
    };

    fetchData().then(() => setIsLoading(false));
  }, [setEnchiridions, setMedications, setAnexos]);

  const getTeacherNames = async () => {
    const response = await getAllTeachers();
    console.log("Professores: ", response);
    setTeacherNames(response);
  };

  const firstCapitalLetter = (string) => {
    if (string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  };
  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const formatPhoneBRL = (phone) => {
    if (phone) {
      return phone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    }
  };

  const handlePrint = async (selectedEnchiridionId) => {
    try {
      console.log(selectedEnchiridionId);
      const pdfData = await getPrescription(selectedEnchiridionId);

      // Check if response indicates an error
      if (pdfData.message) {
        alert("Prescrição não encontrada"); // Or use your preferred notification system
        return;
      }

      const blob = new Blob([pdfData], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);

      // Open PDF in new window
      window.open(url);

      // Cleanup
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error fetching prescription PDF:", error);
      alert("Erro ao buscar a prescrição"); // Or use your preferred notification system
    }
  };

  const handleDelete = (medicationId) => {
    if (isClicked === "prescricoes") {
      const updatedEnchiridions = enchiridions.map((enchiridion) => {
        const updatedMedications = enchiridion.medications.filter(
          (medication) => medication.id !== medicationId
        );
        return {
          ...enchiridion,
          medications: updatedMedications,
        };
      });
      setEnchiridions(updatedEnchiridions);
    }
  };
  const handleSearchChange = useCallback(
    (e) => {
      const value = e.target.value.toLowerCase();
      setSearch(value);

      const filteredEnchiridions = enchiridions.filter((enchiridion) => {
        const date = new Date(enchiridion.date)
          .toLocaleDateString()
          .toLowerCase();

        const teacher =
          teacherNames
            .find((teacher) => teacher.id === enchiridion.teacher_id)
            ?.name?.toLowerCase() || "";

        return date.includes(value) || teacher.includes(value);
      });

      setFilteredEnchiridions(filteredEnchiridions);
    },
    [enchiridions, teacherNames]
  );

  const handleDeleteConfirm = () => {
    handleDelete(selectedMedicationId);
    handleCloseModal();
  };

  const handleDeleteAnexo = (anexoId) => {
    const updatedAnexos = anexos.filter((anexo) => anexo.id !== anexoId);
    setAnexos(updatedAnexos);
  };

  const handleDeleteAnexoConfirm = () => {
    handleDeleteAnexo(selectedAnexoId);
    handleCloseModal();
  };

  const Wrapper = () => {
    const ConsultWrapper = ({
      date,
      reasonConsult,
      weight,
      id,
      enchiridionid,
    }) => {
      const handleConsultClick = async () => {
        if (isClicked === "consultas") {
          try {
            const response = await getProntuario(animal.id);
            console.log("Response from getProntuario:", response);

            // Find the matching consultation in enchiridions state
            const consultation = enchiridions.find(
              (e) => e.id === enchiridionid
            );

            if (consultation) {
              setConsultationDetails(consultation);
              setShowDetailsModal(true);
            } else {
              console.error("Consultation not found");
            }
          } catch (error) {
            console.error("Error fetching consultation history:", error);
          }
        }
      };
      return (
        <>
          {isClicked === "prescricoes" &&
            medications.map((medication) => (
              <div
                className="flex flex-col bg-[#FFFEF9] px-11 py-6 zrounded-xl gap-6 mt-8 hover:shadow-xl cursor-pointer"
                key={medication.id}
              >
                <span className="font-Montserrat text-2xl text-[#2C2C2C] flex items-center justify-between gap-2">
                  <div className="flex flex-row gap-4">
                    <MedicineIcon
                      className="text-[#100F49]"
                      sx={{ fontSize: 32 }}
                    />
                  </div>

                  {isClicked === "prescricoes" && (
                    <div className="flex gap-4">
                      <PrintIcon
                        onClick={() => handlePrint(enchiridionid)}
                        className="h-10 hover:scale-110 duration-75 cursor-pointer text-[#100F49]"
                        sx={{ fontSize: 40 }}
                      />
                      <EditIcon
                        onClick={() => handleOpenModal("editPresc")}
                        className="h-10 cursor-pointer text-[#100F49]"
                        sx={{ fontSize: 40 }}
                      />
                      {/**<DeleteIcon
      onClick={() => handleOpenModal("delete", medication.id)}
      className="h-10 cursor-pointer text-[#100F49]"
      sx={{ fontSize: 40 }}
    /> */}
                    </div>
                  )}
                </span>

                {isClicked === "consultas" ? (
                  <span className="font-Montserrat text-lg text-[#595959]">
                    <strong>Motivo da consulta: </strong>
                    {reasonConsult}
                    <br />
                    <strong>Peso: </strong>
                    {weight}
                  </span>
                ) : null}
                {isClicked === "prescricoes" ? (
                  <span className="font-Montserrat text-lg text-[#595959]">
                    <strong>
                      {medication.measurement || medication[0]?.measurement}
                    </strong>
                    ,{" "}
                    <strong>({medication.unit || medication[0]?.unit})</strong>{" "}
                    <br />
                    <strong>
                      {medication.description || medication[0]?.description}
                    </strong>{" "}
                    <br />
                    <strong>
                      {medication.useType || medication[0]?.useType}
                    </strong>
                    {" - "}
                    <strong>
                      {medication.pharmacy || medication[0]?.pharmacy}
                    </strong>
                  </span>
                ) : null}
                {isClicked === "anexos" ? (
                  <span className="font-Montserrat text-lg text-[#595959]">
                    <strong>Arquivo: </strong>
                    <a href="/path/to/your/pdf/file.pdf" download>
                      Baixar PDF
                    </a>
                  </span>
                ) : null}
              </div>
            ))}

          {isClicked === "consultas" ? (
            <div
              onClick={handleConsultClick}
              className="flex flex-col bg-[#FFFEF9] px-11 py-6 rounded-xl gap-6 mt-8 hover:shadow-xl"
            >
              <span className="font-Montserrat text-2xl text-[#2C2C2C] flex items-center justify-between gap-2">
                <div className="flex flex-row gap-4">
                  {isClicked === "consultas" && (
                    <MedicalInformationIcon
                      className="text-[#100F49]"
                      fontSize="24"
                    />
                  )}
                  {date} -{" "}
                  {teacherNames &&
                    teacherNames.find((teacher) => teacher.id === id)?.name}
                </div>
              </span>

              {isClicked === "consultas" ? (
                <span className="font-Montserrat text-lg text-[#595959]">
                  <strong>Motivo da consulta: </strong>
                  {reasonConsult}
                  <br />
                  <strong>Peso: </strong>
                  {weight}
                </span>
              ) : isClicked === "anexos" ? (
                <span className="font-Montserrat text-lg text-[#595959]">
                  <strong>Arquivo: </strong>
                  <a href="/path/to/your/pdf/file.pdf" download>
                    Baixar PDF
                  </a>
                </span>
              ) : null}
            </div>
          ) : null}
        </>
      );
    };

    return (
      <div className="container bg-transparent flex mt-14 flex-col font-Montserrat">
        <div className="bg-transparent flex">
          <button
            onClick={() => setIsClicked("consultas")}
            className={`${
              isClicked === "consultas" ? "bg-[#007448]" : "bg-[#BDD9BF]"
            } p-2 text-white font-Montserrat font-semibold text-lg h-16 w-40 rounded-t-xl transition-colors duration-300 ease-in-out`}
          >
            Consultas
          </button>
          <button
            onClick={() => setIsClicked("prescricoes")}
            className={`${
              isClicked === "prescricoes" ? "bg-[#007448]" : "bg-[#BDD9BF]"
            } p-2 text-white font-Montserrat font-semibold text-lg h-16 w-40 rounded-t-xl  transition-colors duration-300 ease-in-out`}
          >
            Prescrições
          </button>
          <button
            onClick={() => setIsClicked("anexos")}
            className={`${
              isClicked === "anexos" ? "bg-[#007448]" : "bg-[#BDD9BF]"
            } p-2 text-white font-Montserrat font-semibold text-lg h-16 w-40 rounded-t-xl  transition-colors duration-300 ease-in-out`}
          >
            Anexos
          </button>
        </div>
        <div className="bg-[#F4F1EC] p-2 rounded-b-xl px-11 py-16">
          {isClicked === "consultas" && (
            <div className="flex justify-between gap-8">
              <div className="relative w-2/3">
                <input
                  onChange={handleSearchChange}
                  type="text"
                  value={search}
                  className=" h-12  rounded-xl w-full px-10 focus:outline-none focus:ring-2 focus:ring-[#007448]"
                  placeholder="Buscar Consulta"
                />
                <button className="absolute left-2 top-1/2 transform -translate-y-1/2">
                  <SearchIcon />
                </button>
              </div>
            </div>
          )}
          {isClicked === "prescricoes" && (
            <div className="flex justify-between gap-8">
              <div className="relative w-full">
                <input
                  type="text"
                  className=" h-12  rounded-xl w-full px-10 focus:outline-none focus:ring-2 focus:ring-[#007448]"
                  placeholder="Medicamento"
                />
                <button className="absolute left-2 top-1/2 transform -translate-y-1/2">
                  <SearchIcon />
                </button>
              </div>
              <Link
                to="/receita"
                className="bg-[#100F49] h-12 w-1/3 text-white rounded-xl flex items-center justify-center gap-3"
              >
                <AddPhotoAlternateOutlinedIcon />
                Nova Prescrição
              </Link>
            </div>
          )}
          {isClicked === "anexos" && (
            <div className="flex justify-between gap-8">
              <div className="relative w-full">
                <input
                  type="text"
                  className=" h-12  rounded-xl w-full px-10 focus:outline-none focus:ring-2 focus:ring-[#007448]"
                  placeholder="Nome do exame"
                />
                <button className="absolute left-2 top-1/2 transform -translate-y-1/2">
                  <SearchIcon />
                </button>
              </div>
              <button
                className="bg-[#100F49] h-12 w-1/3 text-white rounded-xl flex items-center justify-center gap-3"
                onClick={() => handleOpenModal("newAnexo")}
              >
                <AddPhotoAlternateOutlinedIcon />
                Novo Anexo
              </button>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                accept="application/pdf"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setSelectedFile(file.name);
                  }
                }}
              />
            </div>
          )}
          {search
            ? filteredEnchiridions.map((enchiridion) => (
                <ConsultWrapper
                  key={enchiridion.id}
                  enchiridionid={enchiridion.id}
                  date={new Date(enchiridion.date).toLocaleDateString()}
                  reasonConsult={enchiridion.reason_consult}
                  weight={enchiridion.weights}
                  id={enchiridion.teacher_id}
                />
              ))
            : enchiridions.map((enchiridion) => (
                <ConsultWrapper
                  key={enchiridion.id}
                  enchiridionid={enchiridion.id}
                  date={new Date(enchiridion.date).toLocaleDateString()}
                  reasonConsult={enchiridion.reason_consult}
                  weight={enchiridion.weights}
                  id={enchiridion.teacher_id}
                />
              ))}
          {isClicked === "anexos" &&
            anexos.map((anexo) => (
              <div
                onClick={() => handleOpenAttachment(anexo.id)}
                className="flex flex-col bg-[#FFFEF9] px-11 py-6 rounded-xl gap-6 mt-8 hover:shadow-xl cursor-pointer relative"
                key={anexo.id}
              >
                <span className="font-Montserrat text-2xl text-[#2C2C2C] flex items-center justify-between gap-2">
                  <div className="date and image flex flex-row gap-4">
                    <AnexoIcon
                      className="text-[#100F49]"
                      sx={{ fontSize: 32 }}
                    />
                    {anexo.date} - {anexo.name}
                  </div>
                  <div className="flex gap-4 ml-auto z-10">
                    <EditIcon
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenModal("editAnexo", anexo.id, anexo.name);
                      }}
                      className="cursor-pointer text-[#100F49]"
                      sx={{ fontSize: 40 }}
                    />
                    <DeleteIcon
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenModal("deleteAnexo", anexo.id);
                      }}
                      className="cursor-pointer text-[#100F49]"
                      sx={{ fontSize: 40 }}
                    />
                  </div>
                </span>
                <span className="font-Montserrat text-lg text-[#595959]">
                  <strong>Arquivo: </strong>
                  <a href="/path/to/your/pdf/file.pdf" download>
                    Baixar PDF
                  </a>
                </span>
              </div>
            ))}
        </div>
      </div>
    );
  };

  return (
    <>
      {isLoading ? (
        <CircularIndeterminate />
      ) : (
        <div className="container flex p-20 flex-col font-Montserrat">
          <h1 className="font-Montserrat mb-14  h-10 font-bold text-2xl">
            Prontuário
          </h1>
          <div className="flex flex-col gap-2">
            <span className="font-Montserrat font-semibold text-2xl text-[#2C2C2C">
              {firstCapitalLetter(animal.name)}, ID {animal.id}
            </span>
            <span className="font-Montserrat font-semibold text-2xl text-[#595959]">
              {firstCapitalLetter(animal.gender)} -{" "}
              {firstCapitalLetter(animal.race)} -{" "}
              {firstCapitalLetter(animal.species)} -{" "}
              {firstCapitalLetter(animal.coat)}
            </span>
            <span className="font-Montserrat font-semibold text-xl  text-[#595959]">
              {animal &&
                animal.tutor &&
                `${animal.tutor.name} - ${formatPhoneBRL(animal.tutor.phone)}`}
            </span>
          </div>
          <Wrapper />
        </div>
      )}

      {/* RENDERIZAÇÃO DOS MODAIS */}
      <Modal
        open={openModal === "newAnexo"}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style, width: "900px" }}>
          <ModalAnexo
            animal_id={id}
            label={`Nome do documento (exame): ${selectedFile}`}
            type="text"
            setOpen={setOpenModal}
            handleClose={handleCloseModal}
            handleFileUpload={handleFileUpload}
            selectedFile={selectedFile} // Pass the selected file to the ModalAnexo component
          />
        </Box>
      </Modal>

      <Modal
        open={openModal === "delete"}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ModalDelete
            title="Excluir Prescrição?"
            body="Tem certeza de que quer excluir?"
            handleClose={handleCloseModal}
            handleDelete={handleDeleteConfirm}
          />
        </Box>
      </Modal>

      <Modal
        open={openModal === "delete2"}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ModalDelete
            title="Excluir Anexo?"
            body="Tem certeza de que quer excluir?"
            handleClose={handleCloseModal}
            handleDelete={handleDeleteAnexoConfirm}
          />
        </Box>
      </Modal>

      <Modal
        open={openModal === "editAnexo"}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style, width: "auto", height: "auto" }}>
          <ModalViewAnexo
            label={`Nome do documento (exame): ${selectedFile}`}
            type="text"
            setOpen={setOpenModal}
            handleClose={handleCloseModal}
            selectedFile={selectedFile} // Pass the selected file to the ModalAnexo component
            anexoName={selectedFile} // Pass the anexo name to the ModalViewAnexo component
          />
        </Box>
      </Modal>

      <Modal
        open={openModal === "editPresc"}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style, width: "900px", height: "auto" }}>
          <ModalEdit setOpen={setOpenModal} handleClose={handleCloseModal} />
        </Box>
      </Modal>

      <Modal
        open={openModal === "deleteAnexo"}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ModalDelete
            title="Excluir Anexo?"
            body="Tem certeza de que quer excluir?"
            handleClose={handleCloseModal}
            handleDelete={handleDeleteAnexoConfirm}
          />
        </Box>
      </Modal>
      <Modal
        open={showDetailsModal}
        onClose={() => {
          setShowDetailsModal(false);
          setActiveStep(0);
        }}
        aria-labelledby="consultation-details-modal"
      >
        <Box sx={consultationModalStyle}>
          {consultationDetails && (
            <div className="p-6">
              <IconButton
          onClick={() => {
            setShowDetailsModal(false);
            setActiveStep(0);
          }}
          sx={{
            position: 'absolute',
            right: '1rem',
            top: '1rem',
            color: 'rgb(107, 114, 128)',
            '&:hover': {
              color: 'rgb(75, 85, 99)',
            }
          }}
        >
          <CloseIcon />
        </IconButton>
              <h2 className="text-2xl font-bold mb-4">Detalhes da Consulta</h2>

              <Stepper
                nonLinear
                activeStep={activeStep}
                className="mb-8"
                sx={{
                  "& .MuiStepIcon-root": {
                    color: "#BDD9BF",
                    "&.Mui-active": {
                      color: "#007448",
                    },
                    "&.Mui-completed": {
                      color: "#007448",
                    },
                  },
                  "& .MuiStepLabel-label": {
                    color: "#595959",
                    "&.Mui-active": {
                      color: "#007448",
                    },
                  },
                  "& .MuiStepButton-root:hover": {
                    backgroundColor: "transparent",
                  },
                  "& .MuiStepConnector-line": {
                    borderColor: "#BDD9BF",
                  },
                }}
              >
                {steps.map((label, index) => (
                  <Step key={label}>
                    <StepButton
                      onClick={() => setActiveStep(index)}
                      className="cursor-pointer"
                    >
                      {label}
                    </StepButton>
                  </Step>
                ))}
              </Stepper>

              <div className="min-h-[400px]">
                {activeStep === 0 && (
                  <div className="space-y-4">
                    <h3 className="font-bold text-xl mb-4">
                      Informações Gerais
                    </h3>
                    <p>
                      <strong>Data:</strong>{" "}
                      {new Date(consultationDetails.date).toLocaleDateString()}
                    </p>
                    <p>
                      <strong>Motivo:</strong>{" "}
                      {consultationDetails.reason_consult}
                    </p>
                    <p>
                      <strong>Histórico:</strong> {consultationDetails.history}
                    </p>
                    <p>
                      <strong>Diagnóstico:</strong>{" "}
                      {consultationDetails.diagnosis || "Não informado"}
                    </p>
                    <p>
                      <strong>Tratamentos:</strong>{" "}
                      {consultationDetails.trataments || "Não informado"}
                    </p>
                    <p>
                      <strong>Observações:</strong>{" "}
                      {consultationDetails.observations || "Não informado"}
                    </p>
                    <p>
                      <strong>Exames Complementares:</strong>{" "}
                      {consultationDetails.complementary_exams ||
                        "Não informado"}
                    </p>
                  </div>
                )}

                {activeStep === 1 && (
                  <div className="space-y-4">
                    <h3 className="font-bold text-xl mb-4">
                      Status dos Sistemas
                    </h3>
                    <p>
                      <strong>Sistema Circulatório:</strong>{" "}
                      {consultationDetails.system_circulatory}
                    </p>
                    <p>
                      <strong>Sistema Digestivo:</strong>{" "}
                      {consultationDetails.system_digestive}
                    </p>
                    <p>
                      <strong>Sistema Geniturinário:</strong>{" "}
                      {consultationDetails.system_genitourinary}
                    </p>
                    <p>
                      <strong>Sistema Locomotor:</strong>{" "}
                      {consultationDetails.system_locomotor}
                    </p>
                    <p>
                      <strong>Sistema Nervoso:</strong>{" "}
                      {consultationDetails.system_nervous}
                    </p>
                    <p>
                      <strong>Sistema Respiratório:</strong>{" "}
                      {consultationDetails.system_respiratory}
                    </p>
                  </div>
                )}

                {activeStep === 2 && (
                  <div className="space-y-4">
                    <h3 className="font-bold text-xl mb-4">Sinais Vitais</h3>
                    <p>
                      <strong>Temperatura:</strong>{" "}
                      {consultationDetails.temperature}°C
                    </p>
                    <p>
                      <strong>Freq. Cardíaca:</strong>{" "}
                      {consultationDetails.frequency_cardiac} bpm
                    </p>
                    <p>
                      <strong>Freq. Respiratória:</strong>{" "}
                      {consultationDetails.frequency_respiratory}
                    </p>
                    <p>
                      <strong>Desidratação:</strong>{" "}
                      {consultationDetails.dehydration}
                    </p>
                    <p>
                      <strong>Mucosas:</strong>{" "}
                      {consultationDetails.type_mucous}
                    </p>
                    <p>
                      <strong>Estado das Mucosas:</strong>{" "}
                      {consultationDetails.whats_mucous}
                    </p>
                    <p>
                      <strong>Linfonodos:</strong>{" "}
                      {consultationDetails.lymph_node}
                    </p>
                    <p>
                      <strong>Anexos da Pele:</strong>{" "}
                      {consultationDetails.skin_annex}
                    </p>
                  </div>
                )}

                {activeStep === 3 && (
                  <div className="space-y-6">
                    {consultationDetails.vaccinations?.length > 0 && (
                      <div>
                        <h3 className="font-bold text-xl mb-4">Vacinas</h3>
                        <div className="grid grid-cols-2 gap-4">
                          {consultationDetails.vaccinations.map(
                            (vaccine, index) => (
                              <div
                                key={index}
                                className="p-4 bg-gray-50 rounded-lg"
                              >
                                <p>
                                  <strong>Nome:</strong> {vaccine.name}
                                </p>
                                <p>
                                  <strong>Data:</strong> {vaccine.date}
                                </p>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    )}

                    <div className="mt-6">
                      <h3 className="font-bold text-xl mb-4">Vermifugação</h3>
                      <p>
                        <strong>Data da Vermifugação:</strong>{" "}
                        {consultationDetails.date_deworming || "Não informado"}
                      </p>
                      <p>
                        <strong>Vermífugo:</strong>{" "}
                        {consultationDetails.deworming || "Não informado"}
                      </p>
                    </div>

                    <div className="mt-6">
                      <h3 className="font-bold text-xl mb-4">Peso</h3>
                      <p>
                        <strong>Peso Atual:</strong>{" "}
                        {consultationDetails.weights?.[0] || "Não informado"} g
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-between mt-8">
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  variant="contained"
                  sx={{
                    bgcolor: "rgb(107, 114, 128)",
                    "&:hover": {
                      bgcolor: "rgb(75, 85, 99)",
                    },
                  }}
                >
                  Voltar
                </Button>

                <div className="flex gap-2">
                 

                  {activeStep < steps.length - 1 && (
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{
                        bgcolor: "rgb(0, 116, 72)",
                        "&:hover": {
                          bgcolor: "rgb(0, 92, 57)",
                        },
                      }}
                    >
                      Próximo
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}
        </Box>
      </Modal>
      {/* FIM DA RENDERIZAÇÃO DOS MODAIS */}

      <Dialog
        fullWidth={true}
        maxWidth={"lg"}
        open={openAttachment}
        onClose={handleCloseAttachment}
      >
        <DialogContent>
          <DialogContentText>
            {selectedAttachment ? (
              <>
                <object
                  data={selectedAttachment.url_archive}
                  type="application/pdf"
                  width="100%"
                  height="600px"
                >
                  <p>
                    Não foi possível carregar o PDF.&nbsp;
                    <a
                      href={selectedAttachment.url_archive}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Download
                    </a>
                  </p>
                </object>
              </>
            ) : (
              <div className="flex justify-center items-center p-10">
                <CircularProgress />
              </div>
            )}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
}
