import { useState, createContext, useEffect } from "react";
import FirstPart from "../Component/nova consulta/FirstPart"
import SecondPart from "../Component/nova consulta/secondPart";
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
export default function NovaConsulta() {
  const [steps, setSteps] = useState(1)
  const [pagOne, setPagOne] = useState(pagOneData);
  return (
    <ConsultContext.Provider value={{ pagOne, setPagOne }}>
      {steps === 1 ? <FirstPart setSteps={setSteps}/> : <SecondPart/>}
    </ConsultContext.Provider>
  )
}