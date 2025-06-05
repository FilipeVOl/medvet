import { Routes, Route } from "react-router-dom";
import Cadastro from "./pages/Cadastro";
import Agendamento from "./pages/Agendamento";
import Professor from "./pages/Professor";
import NovaConsulta from "./pages/NovaConsulta";
import { DefaultLayout } from "./layouts/DefaultLayout";
import { UserProvider, UserContext } from "./contexts/userContext";
import { Calendar } from "./Component/Calendar/Calendar";
import Agenda from "./pages/Agenda";
import MostrarAluno from "./pages/MostrarAluno";
import MostrarProfessor from "./pages/MostrarProfessor";
import MostrarTutor from "./pages/MostrarTutor";
import TelaNovoTutor from "./pages/TelaNovoTutor";
import Prontuarios from "./pages/Prontuarios";
import Prontuario from "./pages/Prontuario";
import InfoProntuario from "./pages/InfoProntuario";
import { UpdateEditProvider } from "./contexts/updateEditContext";
import { PrescProvider } from "./contexts/prescContext";
import CreateAnimal from "./pages/CreateAnimal";
import Home from "./pages/Home";
import EditProntuario from "./pages/EditProntuario";
import Login from "./pages/Login";
import Receita from "./pages/Receita";
import OTPInput from "./Component/Login/Otp";
import { RecoveryProvider } from "./contexts/recoveryContext";
import Recovered from "./Component/Login/Recovered";
import Reset from "./Component/Login/Reset";
import { useContext, useEffect } from "react";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Solicitacoes from "./pages/Solicitacoes";
import Exames from "./pages/Exames";
import Internacao from "./pages/Internacao";
import Anestesia from "./pages/Anestesia";
import ListaSolicitacoes from "./pages/ListaSolicitacoes";
import DetalhesSolicitacao from "./pages/DetalhesSolicitacao";
import FormConsulta from "./components/FormConsulta/FormConsulta";
import TermoConsulta from "./pages/TermoConsulta";

export function Router() {
  return (
    <UserProvider>
      <UpdateEditProvider>
        <PrescProvider>
          <AppRoutes />
        </PrescProvider>
      </UpdateEditProvider>
    </UserProvider>
  );
}

function AppRoutes() {
  const { token } = useContext(UserContext);

  return (
    <Routes>
      <Route
        path="/login"
        element={
          <RecoveryProvider>
            <Login />
          </RecoveryProvider>
        }
      >
        <Route path="otp" element={<OTPInput />} />
        <Route path="recovered" element={<Recovered />} />
        <Route path="reset" element={<Reset />} />
      </Route>
      <Route element={<ProtectedRoute token={token} />}>
        <Route path="/" element={<DefaultLayout />}>
          <Route path="/" element={<Home />} />
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
          <Route path="showTutor" element={<MostrarTutor />} />
          <Route path="prontuarios" element={<Prontuarios />} />
          <Route path="prontuarios/detalhes/:id" element={<Prontuario />} />
          <Route path="prontuarios/view/:id" element={<InfoProntuario />} />
          <Route path="prontuarios/edit/:id" element={<EditProntuario />} />
          <Route path="receita" element={<Receita />} />
          <Route path="animal" element={<CreateAnimal />} />          <Route path="solicitacoes" element={<Solicitacoes />} />          <Route path="solicitacoes/exames" element={<Exames />} />          {/* Internação temporariamente removida */}
         <Route path="solicitacoes/internacao" element={<Internacao />} /> 
          <Route path="solicitacoes/receituario" element={<Receita />} />
          <Route path="solicitacoes/termo-consulta" element={<TermoConsulta />} />
          <Route path="solicitacoes/lista" element={<ListaSolicitacoes />} />
          <Route path="exames" element={<Exames />} />
          <Route path="internacao" element={<Internacao />} />
          <Route path="anestesia" element={<Anestesia />} />
          <Route path="exames/detalhes/:id" element={<DetalhesSolicitacao tipo="exames" />} />
          <Route path="internacao/detalhes/:id" element={<DetalhesSolicitacao tipo="internacao" />} />
          <Route path="anestesia/detalhes/:id" element={<DetalhesSolicitacao tipo="anestesia" />} />
          <Route path="receita/detalhes/:id" element={<DetalhesSolicitacao tipo="receita" />} />
          
          <Route path="solicitacoes/:tipo/:animalId" element={<DetalhesSolicitacao />} />
        </Route>
      </Route>
      <Route
        path="*"
        element={
          <RecoveryProvider>
            <Login />
          </RecoveryProvider>
        }
      />
    </Routes>
  );
}
