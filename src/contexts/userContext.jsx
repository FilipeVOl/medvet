import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const UserContext = createContext();

const defaultUser = {
  phone: "61992047777",
  paciente: "Moccha",
  tutor: "Thiago",
  data: "16042004",
  pet: {
    especie: "Cachorro",
    raca: "Vira-lata",
    sexo: "Macho",
    idade: "17",
    peso: "10",
  },
  obs: "Nenhuma observação",
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(defaultUser);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
