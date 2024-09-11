import React, { useState, useEffect } from 'react';
import { getConsults } from '../services/agendamento';

const Home = () => {
  const [todayConsults, setTodayConsults] = useState([]);
  useEffect(() => {
    getConsults(setTodayConsults, () => 'today')
  }, []);
  function getTodayDate() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = today.getFullYear();
    return `${day}${month}${year}`;
  }

  // Filter consultations for today
  const todayDate = getTodayDate();
  const todayConsultsFiltered = todayConsults[todayDate] || [];

  function transData(dateString) {
    const day = dateString.toString().substring(0, 2);
    const month = dateString.toString().substring(2, 4);
    const year = dateString.toString().substring(4);
    return `${day}/${month}/${year}`;
  }


  return (
    <div className="p-8 ml-10 mt-12 font-Montserrat">
      {/* Title */}
      <div className="flex justify-between items-center mb-5">
        <div className="text-2xl font-semibold text-[25px]">Início</div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 mb-20 text-[16px] font-bold ">
        <div className='bg-[#D5D0C7] rounded-lg flex w-[100px] h-[100px] items-center justify-center hover:bg-[#144A36]' >
          <button className="text-white text-center flex justify-center">Nova <br></br>consulta</button>
        </div>
        <div className='bg-[#D5D0C7] rounded-lg flex w-[100px] h-[100px] items-center justify-center hover:bg-[#144A36] cursor-pointer'>
        <button className="text-white text-center flex justify-center">Buscar <br></br>prontuário</button>
        </div>
      </div>

      <div className="text-2xl font-semibold text-[25px]">Hoje</div>
      <section>
        {todayConsultsFiltered.length > 0 ? (
          <div className="mt-8 pr-40 max-w-4xl">
            {todayConsultsFiltered.map((e) => (
              <div key={e.id} className="flex bg-[#FAF9F3] shadow-xl my-4 rounded-lg ml-4" data-testid="agenda">
                <div className="bg-[#B4B0A8] m-0 text-transparent rounded-lg">a</div>
                <div className="flex flex-col p-4 w-screen">
                  <div className="m-2">
                    <span>
                      Tutor: <span className="font-bold pl-1">{e.nameTutor}</span>
                    </span>
                    <span>, {e.phone}</span>
                  </div>
                  <div className="m-2">
                    <span className="ml-0 pr-1">
                      Paciente: <span className="font-bold pl-1">{e.nameAnimal}</span>
                    </span>
                    <span className="ml-0 pl-1">{`- ${e.species}`}</span>
                  </div>
                  <span className="m-2">{`Observações: ${e.description}`}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-8 pr-40 max-w-4xl text-lg text-text-gray font-semibold">
            Nenhuma consulta para hoje.
          </div>
        )}
      </section>
    </div>
  );
}

export default Home;