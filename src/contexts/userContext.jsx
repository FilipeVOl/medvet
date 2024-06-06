import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

export const UserContext = createContext();

const defaultUser = {
  name: "",
  data: "16042004",
  role: "",
  id: "",
};
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(defaultUser);
  const [token, setToken] = useState("");
  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    const user = localStorage.getItem("user")
    const userObj = JSON.parse(user);
    if(userToken) {
      setToken(userToken)
      setUser(userObj)
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
