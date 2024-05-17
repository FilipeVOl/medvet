import { useState, createContext } from "react";
import FirstPart from "../Component/nova consulta/FirstPart";
import SecondPart from "../Component/nova consulta/secondPart";
import ThirdPart from "../Component/nova consulta/ThirdPart";

export const ConsultContext = createContext();
const pagOneData = {
  paciente: "",
  data: "2024-05-17",
  tutor: "",
  especie: "",
  raca: "",
  sexo: "",
  idade: "",
  peso: "",
  pelagem: "",
  historico: "",
  professor: "",
  vacina1: { vacina1: "", date: "2024-05-17" },
  desmer: { desmer: "", date: "2024-05-17" },
  motivo: "",
};

const pagSecData = {
  temp: 0,
  freqCard: 0,
  resp: 0,
  desidratacao: "",
  linfonodos: "",
  pele: "",
  circ: "",
  sresp: "",
  sdiges: "",
  sloc: "",
  snervoso: "",
  sgenit: "",
  outros: "",
  checkboxValues: ['sem'],
  mucosas: "",
};

const pagThirdData = {
  sExamesCompl: "",
  sDiagnostico: "",
  sTratamento: "",
  sObs: "",
  sResp: "",
};

const handleSteps = (steps, setSteps) => {
  if (steps === 1) {
    return <FirstPart setSteps={setSteps} />;
  } else if (steps === 2) {
    return <SecondPart setSteps={setSteps} />;
  } else if (steps === 3) {
    return <ThirdPart setSteps={setSteps} />;
  } else {
    <div></div>;
  }
};
export default function NovaConsulta() {
  const [steps, setSteps] = useState(1);
  const [pagOne, setPagOne] = useState(pagOneData);
  const [pagSec, setPagSec] = useState(pagSecData);
  const [pagTh, setPagTh] = useState(pagThirdData);
  const allPagesData = {
    pagOne,
    pagSec,
    pagTh,
  };
  return (
    <ConsultContext.Provider
      value={{
        pagOne,
        setPagOne,
        pagSec,
        setPagSec,
        pagTh,
        setPagTh,
        allPagesData,
      }}
    >
      {handleSteps(steps, setSteps)}
    </ConsultContext.Provider>
  );
}
