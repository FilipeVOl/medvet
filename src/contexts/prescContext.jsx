import { createContext, useState } from "react";


export const PrescContext = createContext();

const pageData = {
  teacher_id: "",
  animal_id: "",
  tutor: "",
  especie: "",
  raca: "",
  sexo: "",
  idade: "",
  peso: "",
  id: "",
};
const initialMedication = {
  use_type: "oral",
  pharmacy: "farmacia1",
  unit: "",
  measurement: "",
  description: ""
};


export const PrescProvider = ({children}) => {
  const [page, setPage] = useState(pageData);
  const [medications, setMedications] = useState([initialMedication]);
  const [selectedMedicationId, setSelectedMedicationId] = useState(null); 

  return (
    <PrescContext.Provider value={{ page, setPage, medications, setMedications, selectedMedicationId, setSelectedMedicationId }}>
      {children}
    </PrescContext.Provider>
  );
};
