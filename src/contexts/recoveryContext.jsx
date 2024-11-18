import { useState, createContext } from "react";
import Login from "../pages/Login";
import OTPInput from "../Component/Login/Otp";
import Recovered from "../Component/Login/Recovered";
import Reset from "../Component/Login/Reset";

const RecoveryContext = createContext();

function RecoveryProvider({ children }) {
  const [page, setPage] = useState("login");
  const [cpf, setCPF] = useState();
  const [otp, setOTP] = useState();

  const NavigateComponents = () => {
    if (page === "login") return <Login />;
    if (page === "otp") return <OTPInput />;
    if (page === "reset") return <Reset />;
    if (page === "recovered") return <Recovered />
  }

  return (
    <RecoveryContext.Provider
      value={{ page, setPage, otp, setOTP, setCPF, cpf }}
    >
      <NavigateComponents />
    </RecoveryContext.Provider>
  );
}

export { RecoveryProvider, RecoveryContext };