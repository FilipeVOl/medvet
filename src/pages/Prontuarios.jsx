import { useEffect, useState } from "react";
import FilterInput from "../Component/Prontuarios/FilterInput";
// import { getEnchiridion } from "../services/enchiridion";
import prontuariosMock from "../mocks/enchiridion.mock";
import { Link } from "react-router-dom";

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
    setProntuarios(prontuariosMock.enchiridions) // mock
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
        <h1 className="font-bold text-3xl">Prontuários</h1>
      </div>
      <div id="filtros" className="flex my-16 w-full justify-between ml-8">
        <FilterInput placeHolder="Nome do Paciente" valueInput={namePacient} handleFilter={setNamePacient} />
        <FilterInput placeHolder="Nome do Tutor" valueInput={nameTutor} handleFilter={setNameTutor} />
        <FilterInput placeHolder="Nº do Prontuário" valueInput={numberPront} handleFilter={setNumberPront} />
      </div>
      <div className="grid grid-cols-5 grid-rows-2 gap-8 rounded-lg ml-16 mr-16">
        {prontuarios.map((e) => {
          return (
          <Link to={`detalhes/${e.id}`} key={e.id} id={e.id} className="p-4 pt-[111.24%] rounded-lg bg-prontuario-box bg-no-repeat bg-contain flex flex-col justify-end
          hover:bg-hover-box hover:scale-110 cursor-pointer w-[105%] h-0">
            <div className="bg-other-white rounded-lg text-[1.7vh] flex flex-col p-2 m-2 w-fit">
              <p className="font-bold pr-6">{getTheFirstOne(e.name_animal)}</p>
              <p className="">{getTheFirstOne(e.name_tutor)}</p>
            </div>
          </Link>
          )
        })
        }
      </div>
    </div>
  )
}
