import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const ConsultContext = createContext();

const pagOneData = {
  paciente: '',
  data: '12022024',
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
  const [pagOne, setPagOne] = useState(pagOneData);

  return (
    <ConsultContext.Provider value={{ pagOne, setPagOne }}>
      {children}
    </ConsultContext.Provider>
  );
};

ConsultProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
