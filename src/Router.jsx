import { Routes, Route } from "react-router-dom";
import Cadastro from "./pages/Cadastro";
import Agendamento from "./pages/Agendamento";
import Professor from "./pages/professor";
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
import DetalhesProntuario from "./pages/DetalhesProntuario";
import Login from "./pages/Login";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "./contexts/userContext";

export function Router() {
  const [token, setToken] = useState("");
  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    if(userToken) {
      setToken(userToken)
    }
  },[token]);
  const PrivateRoutes = () => {
    return (
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
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
        <Route
          path="prontuarios/detalhes/:id"
          element={<DetalhesProntuario />}
        />
        </Route>
      </Routes>
    );
  };

  const isAuth = () => {
    return token ? true : false;
  };

  return (
    <UserProvider>
      {isAuth ? (
        <PrivateRoutes/>
      ) : (
        null
      )}
      <Routes>
        <Route path="login" element={<Login />} />
      </Routes>
    </UserProvider>
  );
}
