import { useEffect, useState } from "react";
import FilterInput from "../Component/Prontuarios/FilterInput";
// import { getEnchiridion } from "../services/enchiridion";
import prontuariosMock from "../mocks/enchiridion.mock";
import tentativa1 from '../images/tentativa1.png'

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
  //pegar so o primeiro nome do animal e do tutor
  const getTheFirstOne = (nome) => {
    const names = nome.split(' ');
    let firstName = names[0];
    let capitalizedFirstName = firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase()
    return capitalizedFirstName;
  }
  return (
    <div className="font-Montserrat w-full p-28">
      <div id="header">
        <h1 className="font-bold text-2xl">Prontuários</h1>
      </div>
      <div id="filtros" className="flex my-16 w-full justify-between">
        <FilterInput placeHolder="Nome do Paciente" valueInput={namePacient} handleFilter={setNamePacient} />
        <FilterInput placeHolder="Nome do Tutor" valueInput={nameTutor} handleFilter={setNameTutor} />
        <FilterInput placeHolder="Nº do Prontuário" valueInput={numberPront} handleFilter={setNumberPront} />
      </div>
      <div className="grid grid-cols-5 grid-rows-2 gap-8 rounded-lg">
        {prontuarios.map((e) => {
          return (
          <div key={e.id} id={e.id} className="p-5 pt-[113.33%] rounded-lg bg-gray-pront flex flex-col justify-end
          hover:bg-blue-button hover:scale-110 cursor-pointer w-[105%] h-0">
            <div className="bg-other-white rounded-lg text-[2vh] flex flex-col p-2 w-fit">
              <p className="font-bold pr-6">{getTheFirstOne(e.name_animal)}</p>
              <p className="">{getTheFirstOne(e.name_tutor)}</p>
            </div>
          </div>
          )
        })
        }
      </div>
    </div>
  )
}
