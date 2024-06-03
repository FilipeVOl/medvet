import { useEffect, useState } from "react";
import FilterInput from "../Component/Prontuarios/FilterInput";
// import { getEnchiridion } from "../services/enchiridion";
import prontuariosMock from "../mocks/enchiridion.mock";
import { Link } from "react-router-dom";
import { getAllAnimals } from "../services/animals";
import Pagination from '@mui/material/Pagination';

export default function Prontuarios() {
  const [namePacient, setNamePacient] = useState('');
  const [nameTutor, setNameTutor] = useState('');
  const [numberPront, setNumberPront] = useState('');
  const [prontuarios, setProntuarios] = useState([]);
  const [pageSelected, setPageSelected] = useState(1);
  const [alteredPage, setAlteredPage] = useState([]);

  useEffect(() => {
    getAllAnimals(setProntuarios, pageSelected)
  }, [pageSelected])


  //pegar so o primeiro nome do animal e do tutor
  const getTheFirstOne = (nome) => {
    const names = nome.split(' ');
    let firstName = names[0];
    let capitalizedFirstName = firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
    return capitalizedFirstName.substring(0, 10);
  }
  const consultasFiltradas = (() => {
    const dateAlt = Object.keys(pageSelected).reduce((acc, key) => {
      const consultasDoDia = pageSelected[key].filter(
        consulta =>
          consulta.nameTutor.toLowerCase().includes(nome.toLowerCase()) ||
          consulta.namePacient.toLowerCase().includes(nome.toLowerCase())
      );
      if (consultasDoDia.length > 0) {
        acc[key] = consultasDoDia;
      }
      return acc;
    }, {})
    return Object.keys(dateAlt).length == 0 ? agenda : dateAlt
  });
  return (
    <div className="font-Montserrat w-full p-28 flex flex-col">
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
            <Link to={`detalhes/${e.animal_id}`} key={e.animal_id} id={e.animal_id} className="p-4 pt-[111.24%] rounded-lg bg-prontuario-box bg-no-repeat bg-contain flex flex-col justify-end
          hover:bg-hover-box hover:scale-110 cursor-pointer w-[105%] h-0">
              <div className="bg-other-white rounded-lg text-[1.7vh] flex flex-col p-2 m-2 w-fit">
                <p className="font-bold pr-6">{getTheFirstOne(e.animal_name)}</p>
                <p className="">{getTheFirstOne(e.tutor_name)}</p>
              </div>
            </Link>
          )
        })
        }
      </div>
      <div className="self-center p-8 flex-end items-end">
      <Pagination count={10} shape="rounded" onChange={(e, page) => setPageSelected(page)}/>
      </div>
    </div>
  )
}
