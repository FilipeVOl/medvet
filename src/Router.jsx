import { Routes, Route } from "react-router-dom";
import Cadastro from "./Component/Cadastro";
import { DefaultLayout } from "./layouts/DefaultLayout";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="cadastro" element={<Cadastro />} />
      </Route>
    </Routes>
  );
}
