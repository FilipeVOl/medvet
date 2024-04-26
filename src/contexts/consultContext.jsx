import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const ConsultContext = createContext();

const pagOneData = {
  paciente: '',
  data: new Date(),
  tutor: '',
  especie: '',
  raca: '',
  sexo: '',
  idade: '',
  peso: '',
  pelagem: '',
  historico: '',
  professor: '',
  vacina1: '',
  desmer: '',
}

export const ConsultProvider = ({ children }) => {
  const [pag1, setPagOne] = useState(pagOneData);

  return (
    <ConsultContext.Provider value={{ pag1, setPagOne }}>
      {children}
    </ConsultContext.Provider>
  );
};

ConsultProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
