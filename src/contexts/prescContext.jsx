import { createContext, useState } from "react";
import PropTypes from "prop-types";
import InputReceita from "../pages/Receita";
import Receita from "../pages/Receita";
import Prontuario from "../pages/Prontuario";

export const PrescContext = createContext();

const pageData = {
  teacher_id: "",
  animal_id: "",
  tutor: "",
  especie: "",
  raca: "",
  sexo: "",
  idade: "",
  peso: "",
  id: "",
};

export const PrescProvider = ({children}) => {
  const [page, setPage] = useState(pageData);
  const [medications, setMedications] = useState([
    { use_type: "oral", pharmacy: "farmacia1", unit: "", measurement: "", description: "durateston" },
  ]);
  return (
    <PrescContext.Provider value={{ page, setPage, medications, setMedications }}>
      {children}
    </PrescContext.Provider>
  );
};
