import iconSearch from '../images/icon-search.png'
import { useState, useEffect } from "react";
import { getConsults } from '../services/agendamento';

export default function Agenda() {
  const [agenda, setAgenda] = useState([]);
  const [alteredAgenda, setAlteredAgenda] = useState([]);
  const [nome, setNome] = useState('');
  useEffect(() => {
  getConsults(setAgenda, setAlteredAgenda)
  }, []);
  const consultasFiltradas = (() => {
    const dateAlt = Object.keys(agenda).reduce((acc, key) => {
      const consultasDoDia = agenda[key].filter(
        consulta =>
          consulta.nameTutor.toLowerCase().includes(nome.toLowerCase()) ||
          consulta.nameAnimal.toLowerCase().includes(nome.toLowerCase())
      );
      if (consultasDoDia.length > 0) {
        acc[key] = consultasDoDia;
      }
      return acc;
    }, {})
    return Object.keys(dateAlt).length == 0 ? agenda : dateAlt
  });
  function transData(dateString) {
    const day = dateString.toString().substring(0, 2);
    const month = dateString.toString().substring(2, 4);
    const year = dateString.toString().substring(4);
    const maskDate = `${day}/${month}/${year}`
    return maskDate
  }
  return (
    <main className="font-Montserrat !important">
      <section>
        <h1 className="text-2xl font-bold m-16">Agendamentos</h1>
      </section>
      <section>
      <section className="relative w-full mx-24">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <img src={iconSearch}/>
          </div>
          <input type="text" id="simple-search" className="bg-gray-50 border border-gray-300
        text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
          block ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
        dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-3/12" 
          placeholder="Buscar por Nome" required 
          onChange={(e) => {
            setNome(e.target.value);
          {e.target.value.length == 0 ? setAlteredAgenda(agenda) : setAlteredAgenda(consultasFiltradas)}
          }}/>
      </section>
      </section>
      <section className='mx-24'>
          {Object.keys(alteredAgenda).map((dados) => {
            return (
              <div key = {dados} className="m-12 pr-40 max-w-4xl">
                <h2 className="text-2xl pr-0 text-text-gray font-semibold">{transData(dados)}</h2>
                {alteredAgenda[dados].map((e) => {
                  return (
                    <div key={e}className='flex bg-side-gray my-4 rounded-lg ml-4'>
                      <div className='bg-card-green m-0 text-transparent  rounded-lg'>a</div>
                      <div className='flex flex-col p-4 w-screen'>
                        <div className='m-2'>
                          <span>Tutor:  <span className="font-bold pl-1">{e.nameAnimal}</span></span>
                          <span>, {e.species}</span>
                        </div>
                        <div className='m-2'>
                          <span className="ml-0 pr-1">Paciente:  <span className="font-bold pl-1">{e.nameTutor}</span></span>
                          <span className="ml-0 pl-1">{`- ${e.phone}`}</span>
                        </div>
                        <span className="m-2">{`Observações: ${e.description}`}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            )
          }
          )}
      </section>
    </main>
  )
  }