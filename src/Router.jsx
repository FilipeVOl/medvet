import { Routes, Route } from "react-router-dom";
import Cadastro from "./pages/Cadastro";
import Agendamento from "./pages/Agendamento";
import Professor from "./pages/professor";
import { DefaultLayout } from "./layouts/DefaultLayout";
import { UserProvider } from "./contexts/userContext";
import { Calendar } from "./Component/Calendar/Calendar";
import Agenda from "./pages/Agenda";
import MostrarAluno from "./pages/MostrarAluno";

export function Router() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route path="aluno" element={<Cadastro />} />
          <Route path="calendario" element={<Calendar />} />
          <Route path="agendamento" element={<Agendamento />} />
          <Route path="agenda" element={<Agenda/>} />
          <Route path="professor" element={ <Professor/>}/>
          <Route path="showAluno" element={ <MostrarAluno />} />
        </Route>
      </Routes>
    </UserProvider>
  );
}
