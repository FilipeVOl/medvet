import { useContext, useEffect, useRef, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import { getProntuario } from "../services/prontuario";
import CircularProgress from "@mui/material/CircularProgress";
import { getEnchiridionsAnimalId } from "../services/enchiridion";
import { getTeacherName } from "../services/enchiridion";
import TrashIcon from "../images/trashProntu.svg";
import PrinterIcon from "../images/printer.svg";
import EditIcon from "../images/editProntu.svg";
import { useParams } from "react-router-dom";
import CircularIndeterminate from "../Component/Prontuarios/Loading";
import { useNavigate } from "react-router-dom";
import { PrescContext } from "../contexts/prescContext";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";

export default function Prontuario() {
  const { id } = useParams();
  const [prontuario, setProntuario] = useState({
    name: "joaquim",
    gender: "homem",
    race: "dinossauro",
    species: "t-rex",
    coat: "verde",
  });
  const [enchiridions, setEnchiridions] = useState([
    {
      id: 1,
      reason_consult: "tomou laxante",
      measurement: "nao sei",
      weight: 50,
      teacher_id: 2,
      date: new Date().toISOString().split("T")[0],
      medications: [
        {
          id: 1,
          use_type: "oral",
          pharmacy: "farmacia1",
          unit: "",
          measurement: "",
          description: "durateston",
        },
      ],
    },
    {
      id: 2,
      reason_consult: "tremendo",
      measurement: "nao sei man",
      weight: 20,
      teacher_id: 2,
      date: new Date().toISOString().split("T")[0],
      medications: [
        {
          id: 2,
          use_type: "oral",
          pharmacy: "farmacia2",
          unit: "",
          measurement: "",
          description: "doidoi",
        },
      ],
    },
  ]);
  // const { medications, setMedications } = useContext(PrescContext);
  const [isLoading, setIsLoading] = useState(false);
  const [teacherNames, setTeacherNames] = useState("Jorge");
  const [isClicked, setIsClicked] = useState("consultas");
  const fileInputRef = useRef();
  const [selectedFile, setSelectedFile] = useState("");
  const [deletedMedications, setDeletedMedications] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await getProntuario(id);
  //   };
  //  console.log(id)
  //   fetchData();
  // }, []);

  // useEffect(() => {
  //   const fetchDatas = async () => {
  //     console.log("useEffect executada");
  //     try {
  //       setIsLoading(true);
  //       const responses = await getEnchiridionsAnimalId(id);
  //       console.log(responses);
  //       setEnchiridions(responses.enchiridions); // Update to set the array of objects

  //     // Buscar os nomes dos professores
  //     const uniqueTeacherIds = [...new Set(responses.enchiridions.map(e => e.teacher_id))];
  //     const names = {};
  //     for (const teacherId of uniqueTeacherIds) {
  //       const name = await getTeacherName(teacherId);
  //       names[teacherId] = name;
  //     }
  //     setTeacherNames(names);

  //     } catch (error) {
  //       console.error('Erro ao buscar os dados:', error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  //   fetchDatas();
  // }, [id]);

  const firstCapitalLetter = (string) => {
    if (string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  };

  const formatPhoneBRL = (phone) => {
    if (phone) {
      return phone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    }
  };

  const handlePrint = () => {
    const doc = new jsPDF();
    const content = medications
      .map((medication, index) => `${index + 1}. ${medication.description}`)
      .join("\n");
    doc.text(content, 10, 10);
    doc.save("prescription.pdf");
  };

  const handleDelete = (medicationId) => {
    if (isClicked === 'prescricoes') {
      console.log(medicationId);
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
      console.log(updatedEnchiridions);
    }
  }
  

  const Wrapper = () => {
    const ConsultWrapper = ({
      date,
      reasonConsult,
      weight,
      id,
      enchiridionid,
      medications,
    }) => {
      const navigate = useNavigate();

      const handleClick = () => {
        navigate(`/prontuarios/view/1`);
      };

      return (
        <>

        {isClicked === "prescricoes" && 
          medications.map((medication) => (

             <div
             className="flex flex-col bg-[#FFFEF9] px-11 py-6 rounded-xl gap-6 mt-8 hover:shadow-xl cursor-pointer"
           >
             <span className="font-Montserrat text-2xl text-[#2C2C2C] flex items-center justify-between gap-2">
               <div className="flex flex-row">
                 <MedicalInformationIcon
                   className="text-[#100F49]"
                   fontSize="24"
                 />
                 {date} - {teacherNames || teacherNames[id] || id}
               </div>

               {isClicked === "prescricoes" && (
                 <div className="flex gap-4">
                   <img
                     onClick={handlePrint}
                     src={PrinterIcon}
                     alt="printer icon"
                     className="h-10 hover:scale-110 duration-75"
                   />
                   <img
                     onClick={handleClick}
                     src={EditIcon}
                     alt="printer icon"
                     className="h-10"
                   />
                   <img
                     onClick={() => handleDelete(medications[0].id)}
                     src={TrashIcon}
                     alt="trash icon"
                     className="h-10"
                   />
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
             ) : isClicked === "prescricoes" ? (
                 <span
                   key={medication.id}
                   className="font-Montserrat text-lg text-[#595959]"
                 >
                   <strong>Prescrição: </strong>
                   {medication.description}
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
          ))
        }

{/*  */}
{/*  */}
{/*  */}
            {isClicked === "consultas" || isClicked === "anexos" ? (
              <div
              onClick={() => {
                if (isClicked === "anexos") {
                  window.location.href = "/path/to/your/pdf/file.pdf";
                }
              }}
              className="flex flex-col bg-[#FFFEF9] px-11 py-6 rounded-xl gap-6 mt-8 hover:shadow-xl cursor-pointer"
            >
              <span className="font-Montserrat text-2xl text-[#2C2C2C] flex items-center justify-between gap-2">
                <div className="flex flex-row">
                  <MedicalInformationIcon
                    className="text-[#100F49]"
                    fontSize="24"
                  />
                  {date} - {teacherNames || teacherNames[id] || id}
                </div>

                {isClicked === "prescricoes" && (
                  <div className="flex gap-4">
                    <img
                      onClick={handlePrint}
                      src={PrinterIcon}
                      alt="printer icon"
                      className="h-10 hover:scale-110 duration-75"
                    />
                    <img
                      onClick={handleClick}
                      src={EditIcon}
                      alt="printer icon"
                      className="h-10"
                    />
                    <img
                      onClick={() => handleDelete(medications[0].id)}
                      src={TrashIcon}
                      alt="trash icon"
                      className="h-10"
                    />
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
              ) : isClicked === "anexos" ? (
                <span className="font-Montserrat text-lg text-[#595959]">
                  <strong>Arquivo: </strong>
                  <a href="/path/to/your/pdf/file.pdf" download>
                    Baixar PDF
                  </a>
                </span>
              ) : null}
            </div>
            ) : null }
            
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
                  type="text"
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
                onClick={() => fileInputRef.current.click()}
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
                    console.log(file);
                  }
                }}
              />
              {selectedFile && (
                <div className="mt-2 text-[#007448]">
                  Arquivo selecionado: {selectedFile}
                </div>
              )}
            </div>
          )}
          {enchiridions.map((enchiridion) => (
            <ConsultWrapper
              key={enchiridion.id}
              enchiridionid={enchiridion.id}
              date={new Date(enchiridion.date).toLocaleDateString()}
              reasonConsult={enchiridion.reason_consult}
              weight={enchiridion.weight}
              id={enchiridion.teacher_id}
              medications={enchiridion.medications}
            />
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
              {firstCapitalLetter(prontuario.name)}, ID {prontuario.id}
            </span>
            <span className="font-Montserrat font-semibold text-2xl text-[#595959]">
              {firstCapitalLetter(prontuario.gender)} -{" "}
              {firstCapitalLetter(prontuario.race)} -{" "}
              {firstCapitalLetter(prontuario.species)} -{" "}
              {firstCapitalLetter(prontuario.coat)}
            </span>
            <span className="font-Montserrat font-semibold text-xl  text-[#595959]">
              {prontuario &&
                prontuario.tutor &&
                `${prontuario.tutor.name} - ${formatPhoneBRL(
                  prontuario.tutor.phone
                )}`}
            </span>
          </div>
          <Wrapper />
        </div>
      )}
    </>
  );
}
