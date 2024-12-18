import { useState, createContext } from "react";
import FirstPart from "../Component/nova consulta/FirstPart";
import SecondPart from "../Component/nova consulta/secondPart";
import ThirdPart from "../Component/nova consulta/ThirdPart";
import Stepper from "../Component/nova consulta/Stepper";

export const ConsultContext = createContext();
const pagOneData = {
  paciente: "Preencha Tutor",
  data: "",
  tutor: "",
  especie: "",
  raca: "",
  sexo: "Macho",
  idade: "",
  peso: "",
  pelagem: "",
  historico: "",
  professor: "",
  vacina: [{ name: '', date: '' }],
  desmer: { name: "", date: " " },
  motivo: "",
  idAnimal: [],
  viewAnimal: true,
  viewTutor: false,
  teacher_id: [],
};

const pagSecData = {
  temp: "",
  freqCard: "",
  resp: "",
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
    <div className="flex flex-col mt-16 w-full">
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
        {<Stepper stepsPage={steps}/>}
        {handleSteps(steps, setSteps)}
      </ConsultContext.Provider>
    </div>
  );
}
