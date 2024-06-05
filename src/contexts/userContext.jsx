import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

export const UserContext = createContext();

const defaultUser = {
  phone: "",
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
  const [token, setToken] = useState("");
  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    if(userToken) {
      setToken(userToken)
    }
  },[token]);
  return (
    <UserContext.Provider value={{ user, setUser, token, setToken }}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
