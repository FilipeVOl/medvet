import { useEffect, useState } from "react";
import FilterInput from "../Component/Prontuarios/FilterInput";
// import { getEnchiridion } from "../services/enchiridion";
import prontuariosMock from "../mocks/enchiridion.mock";

export default function Prontuarios() {
  const [namePacient, setNamePacient] = useState('');
  const [nameTutor, setNameTutor] = useState('');
  const [numberPront, setNumberPront] = useState('');
  const [prontuarios, setProntuarios] = useState([]);

  //precisa ajeitar o back, usarei mock
  // useEffect(() => {
  //   getEnchiridion(setProntuarios)
  // }, [])

  useEffect(() => {
    setProntuarios(prontuariosMock.enchiridions) // Removed space
  }, [])

  return (
    <div className="font-Montserrat text-xl p-28 w-full">
      <div id="header">
        <h1 className="font-bold text-2xl">Prontuários</h1>
      </div>
      <div id="filtros" className="flex my-16">
        <FilterInput placeHolder="Nome do Paciente" valueInput={namePacient} handleFilter={setNamePacient} />
        <FilterInput placeHolder="Nome do Tutor" valueInput={nameTutor} handleFilter={setNameTutor} />
        <FilterInput placeHolder="Nº do Prontuário" valueInput={numberPront} handleFilter={setNumberPront} />
      </div>
      <div>
        {prontuarios.map((e) => {
          return (
          <div key={e.id} id={e.id}>
            <p>{e.name_animal}</p>
            <p>{e.name_tutor}</p>
          </div>
          )
        })
        }
      </div>
    </div>
  )
}
