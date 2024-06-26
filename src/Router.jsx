import { Routes, Route } from "react-router-dom";
import Cadastro from "./pages/Cadastro";
import Agendamento from "./pages/Agendamento";
import Professor from "./pages/Professor";
import NovaConsulta from "./pages/NovaConsulta";
import { DefaultLayout } from "./layouts/DefaultLayout";
import { UserProvider } from "./contexts/userContext";
import { Calendar } from "./Component/Calendar/Calendar";
import Agenda from "./pages/Agenda";
import MostrarAluno from "./pages/MostrarAluno";
import MostrarProfessor from "./pages/MostrarProfessor";
import MostrarTutor from "./pages/MostrarTutor";
import TelaNovoTutor from "./pages/TelaNovoTutor";
import Prontuarios from "./pages/Prontuarios";
// import DetalhesProntuario from "./pages/DetalhesProntuario";
import Prontuario from "./pages/Prontuario";
import InfoProntuario from "./pages/InfoProntuario";
import { UpdateEditProvider } from "./contexts/updateEditContext";
import { PrescProvider } from "./contexts/prescContext";
import CreateAnimal from "./pages/CreateAnimal";
import Home from "./pages/Home";

export function Router() {
  return (
    <UserProvider>
      <UpdateEditProvider>
        <Routes>
          <Route path="/" element={<DefaultLayout />}>
            <Route path="home" element={<Home />} />
            <Route path="aluno" element={<Cadastro buttonName="Cadastrar" />} />
            <Route path="calendario" element={<Calendar />} />
            <Route path="agendamento" element={<Agendamento />} />
            <Route path="criarconsulta" element={<NovaConsulta />} />
            <Route
              path="tutor"
              element={<TelaNovoTutor buttonName="Confirmar" />}
            />
            <Route path="agenda" element={<Agenda />} />
            <Route
              path="professor"
              element={<Professor buttonName="Cadastrar" />}
            />
            <Route path="showAluno" element={<MostrarAluno />} />
            <Route path="showProfessor" element={<MostrarProfessor />} />
            <Route path="criarconsulta" element={<NovaConsulta />} />
            <Route path="showTutor" element={<MostrarTutor />} />
            <Route path="prontuarios" element={<Prontuarios />} />
            <Route path="prontuarios/detalhes/:id" element={<Prontuario />} />
            <Route path="prontuarios/detalhes" element={<InfoProntuario />} />
            <Route path="receita" element={<PrescProvider />} />
            <Route path="criaranimal" element={<CreateAnimal />} />
          </Route>
        </Routes>
      </UpdateEditProvider>
    </UserProvider>
  );
}
