import React, { useState, useEffect } from 'react';
import { getConsults } from '../services/agendamento';
import iconAgendar from '../images/agendar.svg'

const Home = () => {
  const [todayConsults, setTodayConsults] = useState([]);
  useEffect(() => {
    getConsults(setTodayConsults, () => 'today')
  }, []);
  function transData(dateString) {
    const day = dateString.toString().substring(0, 2);
    const month = dateString.toString().substring(2, 4);
    const year = dateString.toString().substring(4);
    const maskDate = `${day}/${month}/${year}`
    return maskDate
  }
  return (
    <div className="p-8 pl-0 mt-12 font-Montserrat">
      {/* Title */}
      <div className="flex justify-between items-center mb-8 font-semibold">
        <div className="text-2xl font-bold text-[25px]">Início</div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 mb-8 text-[20px] font-semibold text-white">
        <div className='bg-[#100F49] rounded-lg flex'>
          <button className="text-white p-8 shadow-sm text-left">Nova <br></br>consulta</button>
          <img src={iconAgendar} className='pr-4'/>
        </div>
        <div className='bg-[#7CAB7F] rounded-lg flex shadow-sm'>
        <button className="p-8 text-left">Buscar <br></br>prontuário</button>
          <img src={iconAgendar} className='pr-4'/>
        </div>
        <div className='bg-[#A54182] rounded-lg flex shadow-sm'>
        <button className="p-8 text-left self-end">Nova <br></br>receita</button>
          <img src={iconAgendar} className='pr-4'/>
        </div>
      </div>

      {/* Today's Appointments */}
      <div className="text-xl text-[25px] mb-4 font-medium ml-20 mt-20">Hoje</div>
      <section>
        {Object.keys(todayConsults).map((dados) => {
          return (
            <div key={dados} className="m-12 mt-8 pr-40 max-w-4xl">
              <h2 className="text-2xl pr-0 text-text-gray font-semibold">{transData(dados)}</h2>
              {todayConsults[dados].map((e) => {
                return (
                  <div key={e} className='flex bg-side-gray my-4 rounded-lg ml-4' data-testid="agenda">
                    <div className='bg-card-green m-0 text-transparent  rounded-lg'>a</div>
                    <div className='flex flex-col p-4 w-screen'>
                      <div className='m-2'>
                        <span>Tutor:  <span className="font-bold pl-1">{e.nameTutor}</span></span>
                        <span>, {e.phone}</span>
                      </div>
                      <div className='m-2'>
                        <span className="ml-0 pr-1">Paciente:  <span className="font-bold pl-1">{e.nameAnimal}</span></span>
                        <span className="ml-0 pl-1">{`- ${e.species}`}</span>
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
    </div>
  );
}

export default Home;