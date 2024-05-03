import { useState, createContext } from "react";
import FirstPart from "../Component/nova consulta/FirstPart"
import SecondPart from "../Component/nova consulta/secondPart";
import ThirdPart from "../Component/nova consulta/ThirdPart";

export const ConsultContext = createContext();

const pagOneData = {
  paciente: { id: '', name: '' },
  data: '12022024',
  tutor: { id: '', name: '' },
  especie: '',
  raca: '',
  sexo: '',
  idade: '',
  peso: '',
  pelagem: '',
  historico: '',
  professor: '',
  vacina1: { vacina1: '', date: '' },
  desmer: { desmer: '', date: '' },
  motivo: '',
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
  checkBox : { check1: false, check2: false, check3: false, check4: false, check5: false },
  mucosas: '',
}

const pagThirdData = {
  sExamesCompl: '',
  sDiagnostico: '',
  sTratamento: '',
  sObs: '',
  sResp: '',
}

const handleSteps = (steps, setSteps) => {
  if (steps === 1) {
    return <FirstPart setSteps={setSteps} />
  } else if (steps === 2) {
    return <SecondPart setSteps={setSteps} />
  } else if (steps === 3) {
    return <ThirdPart setSteps={setSteps}/>
  } else {
    <div>OOOi 4</div>
  }
}
export default function NovaConsulta() {
  const [steps, setSteps] = useState(1)
  const [pagOne, setPagOne] = useState(pagOneData);
  const [pagSec, setPagSec] = useState(pagSecData);
  const [pagTh, setPagTh] = useState(pagThirdData)
  return (

    <ConsultContext.Provider value={{ pagOne, setPagOne, pagSec, setPagSec, pagTh, setPagTh }}>
      {handleSteps(steps, setSteps)}
    </ConsultContext.Provider>
  )
}