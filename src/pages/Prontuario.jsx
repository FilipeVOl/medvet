import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import { getProntuario } from "../services/prontuario";
import CircularProgress from '@mui/material/CircularProgress';
import { getEnchiridionsAnimalId } from "../services/enchiridion";
import { getTeacherName } from "../services/enchiridion";
import { useParams } from "react-router-dom";
import CircularIndeterminate from "../Component/Prontuarios/Loading";
import { useNavigate } from "react-router-dom";


export default function Prontuario() {
  const { id } = useParams();
  const [prontuario, setProntuario] = useState({});
  const [enchiridions, setEnchiridions] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [teacherNames, setTeacherNames] = useState({});
  const [isClicked, setIsClicked] = useState("consultas");
  useEffect(() => {
    const fetchData = async () => {
      const response = await getProntuario(id);
      setProntuario(response);
    };
   console.log(id)
    fetchData();
  }, []);

  useEffect(() => {
    const fetchDatas = async () => {
      console.log("useEffect executada");
      try {
        setIsLoading(true);
        const responses = await getEnchiridionsAnimalId(id);
        console.log(responses);
        setEnchiridions(responses);

      // Buscar os nomes dos professores
      const uniqueTeacherIds = [...new Set(responses.enchiridions.map(e => e.teacher_id))];
      const names = {};
      for (const teacherId of uniqueTeacherIds) {
        const name = await getTeacherName(teacherId);
        names[teacherId] = name;
      }
      setTeacherNames(names);


      } catch (error) {
        console.error('Erro ao buscar os dados:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDatas();
  }, [id]);

  

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

  const Wrapper = () => {
    const ConsultWrapper = ({ date, reasonConsult, weight, id , enchiridionid }) => {
      
      const navigate = useNavigate();


      const handleClick = () => {
        navigate(`/prontuarios/view/${enchiridionid}`);
      };


      return (
      <div onClick={handleClick} className="flex flex-col bg-[#FFFEF9] px-11 py-6 rounded-xl gap-6 mt-8 hover:shadow-xl cursor-pointer">
        <span className="font-Montserrat text-2xl text-[#2C2C2C] flex items-center justify-start gap-2">
          <MedicalInformationIcon className="text-[#100F49]" fontSize="24" />
          {date} - {teacherNames[id] || id}
        </span>
        {isClicked === "consultas" ? (
          <span className="font-Montserrat text-lg text-[#595959]">
            <strong>Motivo da consulta: </strong>
            {reasonConsult}
          </span>
        ) : isClicked === "prescricoes" ? (
          <span className="font-Montserrat text-lg text-[#595959]">
            <strong>Prescrição: </strong>
            {}
          </span>
        ) : null}
        <span className="font-Montserrat text-lg text-[#595959]">
          <strong>Peso: </strong>
          {weight}kg
        </span>
      </div>
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
              <button className="bg-[#100F49] h-12 w-1/3 text-white rounded-xl flex items-center justify-center gap-3">
                <AddPhotoAlternateOutlinedIcon />
                Nova Prescrição
              </button>
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
              <button className="bg-[#100F49] h-12 w-1/3 text-white rounded-xl flex items-center justify-center gap-3">
                <AddPhotoAlternateOutlinedIcon />
                Novo Anexo
              </button>
            </div>
          )}
           {enchiridions.enchiridions.map((enchiridion) => (
          <ConsultWrapper
            key={enchiridion.id}
            enchiridionid ={enchiridion.id}
            date={new Date(enchiridion.date).toLocaleDateString()}
            reasonConsult={enchiridion.reason_consult}
            weight={enchiridion.weights[0]}
            id={enchiridion.teacher_id}
          />
        ))}
        </div>
      </div>
    );
  };

  return (
    <>
     {isLoading ? <CircularIndeterminate/> :  
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
}
    </>
  );
}
