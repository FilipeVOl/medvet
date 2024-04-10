import { Routes, Route } from "react-router-dom";
import Cadastro from "./pages/Cadastro";
import Agendamento from "./pages/Agendamento";
import { DefaultLayout } from "./layouts/DefaultLayout";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout/>}>
        <Route path="cadastro" element={<Cadastro />} />
        <Route path="agendamento" element={<Agendamento />} />
      </Route>
    </Routes>
  );
}
