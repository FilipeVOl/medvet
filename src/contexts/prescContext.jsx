import { createContext, useState } from "react";
import PropTypes from "prop-types";
import InputReceita from "../pages/Receita";
import Receita from "../pages/Receita";

export const PrescContext = createContext();

const pageData = {
  animal_id: "",
  tutor: "",
  especie: "",
  raca: "",
  sexo: "",
  idade: "",
  peso: "",
  id: "",
};

export const PrescProvider = () => {
  const [page, setPage] = useState(pageData);
  const [medications, setMedications] = useState([
    { use_type: "oral", pharmacy: "farmacia1", unit: "", measurement: "", description: "" },
  ]);
  return (
    <PrescContext.Provider value={{ page, setPage, medications, setMedications }}>
      <Receita />
    </PrescContext.Provider>
  );
};
