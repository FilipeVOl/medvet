import { useState, createContext, useEffect } from "react";
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
  // Limpar dados específicos de consulta anterior ao iniciar uma nova
  useEffect(() => {
    // Se estiver iniciando uma nova consulta (step 1), limpar dados anteriores
    if (window.location.pathname === '/criarconsulta') {
      // Verifica se há consulta em andamento (não limpar se estiver apenas recarregando a página)
      const inProgress = localStorage.getItem('consultaInProgress');
      
      if (!inProgress) {
        localStorage.setItem('consultaInProgress', 'true');
        localStorage.removeItem('diagnostico');
        localStorage.removeItem('tratamento');
        localStorage.removeItem('observacoes');
        localStorage.removeItem('examesComplementares');
        localStorage.removeItem('selectedForm');
        localStorage.removeItem('motivoConsulta');
      }
    }
    
    // Limpar flag ao desmontar o componente
    return () => {
      localStorage.removeItem('consultaInProgress');
    };
  }, []);
  
  // Try to load saved data from localStorage
  const loadFromStorage = () => {
    try {
      const savedPagOne = localStorage.getItem('consultaPagOne');
      const savedPagSec = localStorage.getItem('consultaPagSec');
      const savedPagTh = localStorage.getItem('consultaPagTh');
      
      return {
        pagOne: savedPagOne ? JSON.parse(savedPagOne) : pagOneData,
        pagSec: savedPagSec ? JSON.parse(savedPagSec) : pagSecData,
        pagTh: savedPagTh ? JSON.parse(savedPagTh) : pagThirdData
      };
    } catch (error) {
      console.error('Error loading data from localStorage:', error);
      return { pagOne: pagOneData, pagSec: pagSecData, pagTh: pagThirdData };
    }
  };
  
  const savedData = loadFromStorage();
  
  const [steps, setSteps] = useState(1);
  const [pagOne, setPagOne] = useState(savedData.pagOne);
  const [pagSec, setPagSec] = useState(savedData.pagSec);
  const [pagTh, setPagTh] = useState(savedData.pagTh);
  
  // Save to localStorage whenever data changes
  useEffect(() => {
    try {
      localStorage.setItem('consultaPagOne', JSON.stringify(pagOne));
    } catch (error) {
      console.error('Error saving pagOne to localStorage:', error);
    }
  }, [pagOne]);
  
  useEffect(() => {
    try {
      localStorage.setItem('consultaPagSec', JSON.stringify(pagSec));
    } catch (error) {
      console.error('Error saving pagSec to localStorage:', error);
    }
  }, [pagSec]);
  
  useEffect(() => {
    try {
      localStorage.setItem('consultaPagTh', JSON.stringify(pagTh));
    } catch (error) {
      console.error('Error saving pagTh to localStorage:', error);
    }
  }, [pagTh]);
  
  const allPagesData = {
    pagOne,
    pagSec,
    pagTh,
  };
  return (
    <div className="flex flex-col mt-6 w-full">
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
