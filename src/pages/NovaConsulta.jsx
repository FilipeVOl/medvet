import { useState, createContext } from "react";
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
  consult:'',
  historico: '',
  professor: '',
  vacina1: { vacina1: '', date: '' },
  desmer: { desmer: '', date: '' },
}

const pagSecData = {
  temp: 0,
  freqCard: 0,
  resp: 0,
  desidratacao: '',
  linfonodos: '',
  pele: '',
  circ: '',
  sresp: '',
  sdiges: '',
  sloc: '',
  snervoso: '',
  sgenit: '',
  outros: '',
}

const handleSteps = (steps, setSteps) => {
  if (steps === 1) {
    return <FirstPart setSteps={setSteps} />
  } else if (steps === 2) {
    return <SecondPart setSteps={setSteps} />
  } else if (steps === 3) {
    <div>Oi</div>
  } else {
    <div>OOOi 4</div>
  }
}
export default function NovaConsulta() {
  const [steps, setSteps] = useState(1)
  const [pagOne, setPagOne] = useState(pagOneData);
  const [pagSec, setPagSec] = useState(pagSecData);
  return (

    <ConsultContext.Provider value={{ pagOne, setPagOne, pagSec, setPagSec }}>
      {handleSteps(steps, setSteps)}
    </ConsultContext.Provider>
  )
}