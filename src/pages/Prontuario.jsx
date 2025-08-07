import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { getProntuario } from "../services/prontuario";
import CircularProgress from "@mui/material/CircularProgress";
import { Close as CloseIcon } from "@mui/icons-material";

import {
  getEnchiridion,
  getEnchiridionsAnimalId,
} from "../services/enchiridion";
import {
  Stepper,
  StepButton,
  Step,
  StepLabel,
  Button,
  IconButton,
} from "@mui/material";
import { useParams } from "react-router-dom";
import CircularIndeterminate from "../Component/Prontuarios/Loading";
import { useNavigate } from "react-router-dom";
import { PrescContext } from "../contexts/prescContext";
import { Link } from "react-router-dom";
import {
  Modal,
  Box,
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
import TermosConsultaView from "../components/FormConsulta/TermosConsultaView";
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
  LocalHospital as LocalHospitalIcon,
  Biotech as BiotechIcon,
  LocalHospital as MedicineIcon,
  AttachFile as AnexoIcon,
  AddPhotoAlternate as AddPhotoAlternateOutlinedIcon,
  MedicalInformation as MedicalInformationIcon,
  Description as DescriptionIcon,
} from "@mui/icons-material";
import { set } from "zod";
import SolicitacoesExameView from "../components/solicitacoes/SolicitacoesExameView";
import SolicitacoesInternacaoView from "../components/solicitacoes/SolicitacoesInternacaoView";

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
  const [solicitacoes, setSolicitacoes] = useState([]);
  const fileInputRef = useRef();
  const [selectedFile, setSelectedFile] = useState("");
  const [deletedMedications, setDeletedMedications] = useState([]);
  const [modal, setModal] = useState(false);
  const [openModal, setOpenModal] = useState(null);
  const [selectedAnexoId, setSelectedAnexoId] = useState(null);
  const [anexos, setAnexos] = useState([]);
  const [search, setSearch] = useState("");
  const [consultationDetails, setConsultationDetails] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [filteredEnchiridions, setFilteredEnchiridions] = useState([]);
  const { selectedMedication, setSelectedMedication } =
    useContext(PrescContext);

  const [selectedPrescription, setSelectedPrescription] = useState([]);
  const [selectedMedicationDetails, setSelectedMedicationDetails] = useState(null);
  const [showMedicationModal, setShowMedicationModal] = useState(false);

  const [selectedAttachment, setSelectedAttachment] = useState();
  const [openAttachment, setOpenAttachment] = useState(false);
  const handleOpenAttachment = (id) => {
    const selectedAnexo = anexos.find((anexo) => anexo.id === id);
    setSelectedAttachment(selectedAnexo);
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
      setSelectedMedication(id);
    } else if (modalName === "deleteAnexo" || modalName === "editAnexo") {
      setSelectedAnexoId(id);
    }
    setSelectedFile(name);
  };

  const handleCloseModal = () => {
    setOpenModal(null);
    setSelectedMedication(null);
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
      setSelectedFile(file);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const response = await getEnchiridionsAnimalId(id);
      const prescriptionData = await getPrescByAnimalId(id);
      const anexos = await getAnexos(id);
      const animal = await getAnimalById(id);
      setAnimal(animal.data);
      setEnchiridions(response.enchiridions);
      // Extract the prescriptions array from the data
      setMedications(prescriptionData.prescriptions || []);
      setAnexos(anexos);
      await getTeacherNames();
    };

    fetchData().then(() => setIsLoading(false));
  }, [setEnchiridions, setMedications, setAnexos]);

  const getTeacherNames = async () => {
    const response = await getAllTeachers();
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

  const handlePrint = async (animalId) => {

    const prescrition = await axios.get(
      `http://localhost:3333/get/prescription/animalId/${animalId}`
    );

    const { id } = prescrition.data.prescriptions[0];

    try {
      window.open(`http://localhost:3333/pdf/prescription/${id}`);

      if (pdfData.message) {
        alert("Prescrição não encontrada");
        return;
      }

      const blob = new Blob([pdfData], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);

      window.open(url);

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error fetching prescription PDF:", error);
    }
  };

  const handleDelete = (m) => {
    if (isClicked === "prescricoes") {
      const updatedEnchiridions = enchiridions.map((enchiridion) => {
        const updatedMedications = enchiridion.medications.filter(
          (medication) => medication.id !== m
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
    handleDelete(selectedMedication);
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
        <div
          onClick={handleConsultClick}
          className="flex flex-col bg-[#FFFEF9] px-11 py-6 rounded-xl gap-6 mt-8 hover:shadow-xl"
        >
          <span className="font-Montserrat text-2xl text-[#2C2C2C] flex items-center justify-between gap-2">
            <div className="flex flex-row gap-4">
              <MedicalInformationIcon
                className="text-[#100F49]"
                fontSize="24"
              />
              {date} - {teacherNames.find((teacher) => teacher.id === id)?.name}
            </div>
          </span>

          <span className="font-Montserrat text-lg text-[#595959]">
            <strong>Motivo da consulta: </strong>
            {reasonConsult}
            <br />
            <strong>Peso: </strong>
            {weight}
          </span>
        </div>
      );

      // return (
      //   <>
      //     {isClicked === "prescricoes" &&
      //       medications.map((medication, index) => (
      //         <div
      //           className="flex flex-col bg-[#FFFEF9] px-11 py-6 zrounded-xl gap-6 mt-8 hover:shadow-xl cursor-pointer"
      //           key={`${medication.id}-${index}`}
      //         >
      //           <span className="font-Montserrat text-2xl text-[#2C2C2C] flex items-center justify-between gap-2">
      //             <div className="flex flex-row gap-4">
      //               <MedicineIcon
      //                 onClick={() => console.log(medications)}
      //                 className="text-[#100F49]"
      //                 sx={{ fontSize: 32 }}
      //               />
      //             </div>

      //             {isClicked === "prescricoes" && (
      //               <div className="flex gap-4">
      //                 <PrintIcon
      //                   onClick={() => handlePrint(animal.id)}
      //                   className="h-10 hover:scale-110 duration-75 cursor-pointer text-[#100F49]"
      //                   sx={{ fontSize: 40 }}
      //                 />
      //                 <EditIcon
      //                   onClick={() => handleOpenEditModal(medication)}
      //                   className="h-10 cursor-pointer text-[#100F49]"
      //                   sx={{ fontSize: 40 }}
      //                 />
      //                 {/**<DeleteIcon
      //                   onClick={() => handleOpenModal("delete", medication.id)}
      //                   className="h-10 cursor-pointer text-[#100F49]"
      //                   sx={{ fontSize: 40 }}
      //                 /> */}
      //               </div>
      //             )}
      //           </span>

      //           {isClicked === "consultas" ? (
      //             <span className="font-Montserrat text-lg text-[#595959]">
      //               <strong>Motivo da consulta: </strong>
      //               {reasonConsult}
      //               <br />
      //               <strong>Peso: </strong>
      //               {weight}
      //             </span>
      //           ) : null}
      //           {isClicked === "prescricoes" ? (
      //             <span className="font-Montserrat text-lg text-[#595959]">
      //               <strong>
      //                 {medication.measurement || medication[0]?.measurement}
      //               </strong>
      //               ,{" "}
      //               <strong>({medication.unit || medication[0]?.unit})</strong>{" "}
      //               <br />
      //               <strong>
      //                 {medication.description || medication[0]?.description}
      //               </strong>{" "}
      //               <br />
      //               <strong>
      //                 {medication.useType || medication[0]?.useType}
      //               </strong>
      //               {" - "}
      //               <strong>
      //                 {medication.pharmacy || medication[0]?.pharmacy}
      //               </strong>
      //             </span>
      //           ) : null}
      //           {isClicked === "anexos" ? (
      //             <span className="font-Montserrat text-lg text-[#595959]">
      //               <strong>Arquivo: </strong>
      //               <a href="/path/to/your/pdf/file.pdf" download>
      //                 Baixar PDF
      //               </a>
      //             </span>
      //           ) : null}
      //         </div>
      //       ))}

      //     {isClicked === "consultas" ? (
      //       <div
      //         onClick={handleConsultClick}
      //         className="flex flex-col bg-[#FFFEF9] px-11 py-6 rounded-xl gap-6 mt-8 hover:shadow-xl"
      //       >
      //         <span className="font-Montserrat text-2xl text-[#2C2C2C] flex items-center justify-between gap-2">
      //           <div className="flex flex-row gap-4">
      //             {isClicked === "consultas" && (
      //               <MedicalInformationIcon
      //                 className="text-[#100F49]"
      //                 fontSize="24"
      //               />
      //             )}
      //             {date} -{" "}
      //             {teacherNames &&
      //               teacherNames.find((teacher) => teacher.id === id)?.name}
      //           </div>
      //         </span>

      //         {isClicked === "consultas" ? (
      //           <span className="font-Montserrat text-lg text-[#595959]">
      //             <strong>Motivo da consulta: </strong>
      //             {reasonConsult}
      //             <br />
      //             <strong>Peso: </strong>
      //             {weight}
      //           </span>
      //         ) : isClicked === "anexos" ? (
      //           <span className="font-Montserrat text-lg text-[#595959]">
      //             <strong>Arquivo: </strong>
      //             <a href="/path/to/your/pdf/file.pdf" download>
      //               Baixar PDF
      //             </a>
      //           </span>
      //         ) : null}
      //       </div>
      //     ) : null}
      //   </>
      // );
    };

    return (
      <div className="container bg-transparent flex mt-14 flex-col font-Montserrat">
        {" "}
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
            onClick={() => setIsClicked("termos")}
            className={`${
              isClicked === "termos" ? "bg-[#007448]" : "bg-[#BDD9BF]"
            } p-2 text-white font-Montserrat font-semibold text-lg h-16 w-40 rounded-t-xl  transition-colors duration-300 ease-in-out`}
          >
            Termos
          </button>
          <button
            onClick={() => setIsClicked("exames")}
            className={`${
              isClicked === "exames" ? "bg-[#007448]" : "bg-[#BDD9BF]"
            } p-2 text-white font-Montserrat font-semibold text-lg h-16 w-40 rounded-t-xl  transition-colors duration-300 ease-in-out`}
          >
            Exames
          </button>
          <button
            onClick={() => setIsClicked("internacao")}
            className={`${
              isClicked === "internacao" ? "bg-[#007448]" : "bg-[#BDD9BF]"
            } p-2 text-white font-Montserrat font-semibold text-lg h-16 w-40 rounded-t-xl  transition-colors duration-300 ease-in-out`}
          >
            Internação
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
          {/* {isClicked === "consultas" && (
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
          )} */}
          {isClicked === "consultas" &&
            (search
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
                )))}{" "}
          {/* Render medications separately from consultations */}          {isClicked === "prescricoes" &&
            (Array.isArray(medications) ? medications : [])
              .flatMap((prescription) =>
                (prescription.medications || []).map((medication) => ({
                  ...medication,
                  prescriptionId: prescription.id,
                  prescriptionDate: prescription.createdAt,
                  // Mapear observacao_medica para observations para compatibilidade
                  observations: medication.observations || medication.observacao_medica || medication.medical_observation,
                }))
              )
              .map((medication, index) => (
                <div
                  className="flex flex-col bg-[#FFFEF9] px-11 py-6 rounded-xl gap-6 mt-8 hover:shadow-xl cursor-pointer transition-all duration-200 hover:bg-blue-50 border-2 border-transparent hover:border-blue-200"
                  key={`${medication.prescriptionId}-${index}`}
                  onClick={() => handleOpenMedicationModal(medication)}
                >
                  <span className="font-Montserrat text-2xl text-[#2C2C2C] flex items-center justify-between gap-2">
                    <div className="flex flex-row gap-4">
                      <MedicineIcon
                        onClick={() => {
                        }}
                        className="text-[#100F49]"
                        sx={{ fontSize: 32 }}
                      />
                    </div>

                    <div className="flex gap-4">
                      <PrintIcon
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePrint(animal.id, medication.prescriptionId);
                        }}
                        className="h-10 hover:scale-110 duration-75 cursor-pointer text-[#100F49]"
                        sx={{ fontSize: 40 }}
                      />
                    </div>
                  </span>

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
                    
                    {/* Exibição da observação médica */}
                    {(medication.observations || medication[0]?.observations || medication.observacao_medica || medication[0]?.observacao_medica || medication.medical_observation || medication[0]?.medical_observation) && (
                      <div className="mt-3 p-3 bg-yellow-50 border-l-4 border-yellow-300 rounded">
                        <strong className="text-yellow-800">Observação Médica:</strong>
                        <br />
                        <span className="text-yellow-700 italic">
                          {medication.observations || medication[0]?.observations || medication.observacao_medica || medication[0]?.observacao_medica || medication.medical_observation || medication[0]?.medical_observation}
                        </span>
                      </div>
                    )}
                    
                    {/* Indicação de que o card é clicável */}
                    <div className="mt-3 text-sm text-blue-600 italic">
                      💡 Clique para ver todos os detalhes
                    </div>
                  </span>
                </div>
              ))}
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
          {/* {search
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
              ))} */}{" "}
          {isClicked === "termos" && (
            <>
              <div className="flex justify-between gap-8">
                <div className="relative w-full">
                  <input
                    type="text"
                    className="h-12 rounded-xl w-full px-10 focus:outline-none focus:ring-2 focus:ring-[#007448]"
                    placeholder="Buscar termo de consulta"
                  />
                  <button className="absolute left-2 top-1/2 transform -translate-y-1/2">
                    <SearchIcon />
                  </button>
                </div>
                <button
                  className="bg-[#100F49] h-12 w-1/3 text-white rounded-xl flex items-center justify-center gap-3"
                  onClick={() =>
                    setSelectedForm ? setSelectedForm("consulta") : null
                  }
                >
                  <DescriptionIcon />
                  Novo Termo de Consulta
                </button>
              </div>
              <div className="mt-8">
                <TermosConsultaView animalId={id} />
              </div>
            </>
          )}
          {isClicked === "exames" && (
            <>
              <div className="flex justify-between gap-8">
                <div className="relative w-full">
                  <input
                    type="text"
                    className="h-12 rounded-xl w-full px-10 focus:outline-none focus:ring-2 focus:ring-[#007448]"
                    placeholder="Buscar exame"
                  />
                  <button className="absolute left-2 top-1/2 transform -translate-y-1/2">
                    <SearchIcon />
                  </button>
                </div>
              </div>
              <div className="mt-8">
                <SolicitacoesExameView animalId={id} />
              </div>
            </>
          )}
          {isClicked === "internacao" && (
            <>
              <div className="flex justify-between gap-8">
                <div className="relative w-full">
                  <input
                    type="text"
                    className="h-12 rounded-xl w-full px-10 focus:outline-none focus:ring-2 focus:ring-[#007448]"
                    placeholder="Buscar internação"
                  />
                  <button className="absolute left-2 top-1/2 transform -translate-y-1/2">
                    <SearchIcon />
                  </button>
                </div>
              </div>
              <div className="mt-8">
                <SolicitacoesInternacaoView animalId={id} />
              </div>
            </>
          )}
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

  const [openEditModal, setOpenEditModal] = useState(false);
  const handleOpenEditModal = (medication) => {
    setOpenEditModal(true);
    if (medication && medication.medications) {
      setSelectedPrescription(medication.medications);
    } else if (Array.isArray(medication)) {
      setSelectedPrescription(medication);
    } else {
      setSelectedPrescription([medication]);
    }
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setSelectedPrescription([]);
  };

  const handleOpenMedicationModal = (medication) => {
    setSelectedMedicationDetails(medication);
    setShowMedicationModal(true);
  };

  const handleCloseMedicationModal = () => {
    setShowMedicationModal(false);
    setSelectedMedicationDetails(null);
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
      
      {/* Modal de Detalhes da Medicação */}
      <Modal
        open={showMedicationModal}
        onClose={handleCloseMedicationModal}
        aria-labelledby="medication-details-modal"
      >
        <Box sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "80%",
          maxWidth: "600px",
          bgcolor: "background.paper",
          borderRadius: "8px",
          boxShadow: 24,
          p: 4,
          maxHeight: "80vh",
          overflow: "auto"
        }}>
          {selectedMedicationDetails && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Detalhes da Medicação</h2>
                <IconButton
                  onClick={handleCloseMedicationModal}
                  sx={{ color: "rgb(107, 114, 128)" }}
                >
                  <CloseIcon />
                </IconButton>
              </div>
              
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-lg text-gray-700 mb-2">Medicamento</h3>
                  <p className="text-xl font-bold text-blue-600">
                    {selectedMedicationDetails.measurement}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600">Quantidade</p>
                    <p className="font-semibold">{selectedMedicationDetails.unit} unidades</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600">Tipo de Uso</p>
                    <p className="font-semibold">{(selectedMedicationDetails.use_type || selectedMedicationDetails.useType || 'Oral').toUpperCase()}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600">Farmácia</p>
                    <p className="font-semibold">{selectedMedicationDetails.pharmacy || 'Comum'}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600">Tipo de Receita</p>
                    <p className="font-semibold">{selectedMedicationDetails.type === '2via' ? '2 Vias (Controlado)' : '1 Via (Comum)'}</p>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-700 mb-2">Posologia</h3>
                  <p className="text-gray-600 whitespace-pre-wrap">
                    {selectedMedicationDetails.description || 'Não informada'}
                  </p>
                </div>

                {(selectedMedicationDetails.observations || selectedMedicationDetails.observacao_medica || selectedMedicationDetails.medical_observation) && (
                  <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-300">
                    <h3 className="font-semibold text-yellow-800 mb-2">Observação Médica</h3>
                    <p className="text-yellow-700 italic whitespace-pre-wrap">
                      {selectedMedicationDetails.observations || selectedMedicationDetails.observacao_medica || selectedMedicationDetails.medical_observation}
                    </p>
                    <p className="text-xs text-yellow-600 mt-2">
                      * Esta observação é para uso interno e não aparece na receita impressa
                    </p>
                  </div>
                )}

                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm text-blue-600">
                    <strong>Data da Prescrição:</strong> {selectedMedicationDetails.prescriptionDate ? 
                      new Date(selectedMedicationDetails.prescriptionDate).toLocaleDateString() : 
                      'Não informada'}
                  </p>
                  <p className="text-sm text-blue-600">
                    <strong>ID da Prescrição:</strong> {selectedMedicationDetails.prescriptionId}
                  </p>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <button
                    onClick={() => handlePrint(animal.id, selectedMedicationDetails.prescriptionId)}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center gap-2"
                  >
                    <PrintIcon fontSize="small" />
                    Imprimir Receita
                  </button>
                  <button
                    onClick={handleCloseMedicationModal}
                    className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                  >
                    Fechar
                  </button>
                </div>
              </div>
            </div>
          )}
        </Box>
      </Modal>

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
      </Modal>{" "}
      <Dialog
        open={openEditModal}
        fullWidth={true}
        maxWidth={"lg"}
        onClose={handleCloseEditModal}
      >
        <DialogContent>
          {/* Removed DialogContentText to fix DOM nesting warning */}
          <ModalEdit
            setOpen={setOpenModal}
            selectedPrescription={selectedPrescription}
            handleClose={handleCloseEditModal}
          />
        </DialogContent>
      </Dialog>
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
                  position: "absolute",
                  right: "1rem",
                  top: "1rem",
                  color: "rgb(107, 114, 128)",
                  "&:hover": {
                    color: "rgb(75, 85, 99)",
                  },
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
