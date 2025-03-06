import { Link } from "react-router-dom";
import Accordion from "./Accordion";
import HomeIcon from "@mui/icons-material/Home";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import ReceiptIcon from "@mui/icons-material/Receipt";
import PeopleIcon from "@mui/icons-material/People";
import FolderSharedIcon from "@mui/icons-material/FolderShared";

const Navbar = () => {
  const arr = {
    Aluno: "aluno",
    Tutor: "tutor",
    Professor: "professor",
    Animal: "animal",
  };
  const arr2 = {
    Aluno: "showAluno",
    Tutor: "showTutor",
    Professor: "showProfessor",
  };
  return (
    <div className="shadow-md min-h-screen bg-[#007448] p-10 text-white-med top-28 max-w-72 min-w-72">
      <div
        id="inicio"
        className="flex py-4 hover:bg-[#008854] rounded-md px-2 transition-all duration-300"
      >
        <HomeIcon className="mr-4" />
        <Link to="/" className="w-full">
          Início
        </Link>
      </div>
      <div
        id="agendar"
        className="flex py-4 hover:bg-[#008854] rounded-md px-2 transition-all duration-300"
      >
        <CalendarMonthIcon className="mr-4" />
        <Link to="agendamento" className="w-full">
          Agendar
        </Link>
      </div>
      <div
        id="agendamento"
        className="flex py-4 hover:bg-[#008854] rounded-md px-2 transition-all duration-300"
      >
        <EventAvailableIcon className="mr-4" />
        <Link to="agenda" className="w-full">
          Agendamento
        </Link>
      </div>
      <div className="my-2">
        <Accordion
          text="Novo Cadastro"
          icon={<PersonAddIcon />}
          options={arr}
        />
      </div>
      <div
        id="criarConsulta"
        className="flex py-4 hover:bg-[#008854] rounded-md px-2 transition-all duration-300"
      >
        <MedicalServicesIcon className="mr-4" />
        <Link to="criarconsulta" className="w-full">
          Criar Consulta
        </Link>
      </div>
      <div
        id="receita"
        className="flex py-4 hover:bg-[#008854] rounded-md px-2 transition-all duration-300"
      >
        <ReceiptIcon className="mr-4" />
        <Link to="receita" className="w-full">
          Receitas
        </Link>
      </div>
      <div className="my-2">
        <Accordion text="Cadastrados" icon={<PeopleIcon />} options={arr2} />
      </div>
      <div
        id="prontuarios"
        className="flex py-4 hover:bg-[#008854] rounded-md px-2 transition-all duration-300"
      >
        <FolderSharedIcon className="mr-4" />
        <Link to="prontuarios" className="w-full">
          Prontuários
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
