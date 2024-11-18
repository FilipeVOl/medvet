import React, { useState, useEffect } from "react";
import { getConsults } from "../services/agendamento";
import iconAgendar from "../images/agendar.svg";
import iconCadastro from "../images/novo-cadastro.svg";
import iconProntuario from "../images/prontuario.svg";
import { Link } from "react-router-dom";

const Home = () => {
  const [todayConsults, setTodayConsults] = useState([]);

  useEffect(() => {
    getConsults((data) => {
      const today = new Date();
      const todayString = `${String(today.getDate()).padStart(2, "0")}${String(
        today.getMonth() + 1
      ).padStart(2, "0")}${today.getFullYear()}`;
      setTodayConsults(data[todayString] || []);
    }, () => "today");
  }, []);

  function transData(dateString) {
    const day = dateString.toString().substring(0, 2);
    const month = dateString.toString().substring(2, 4);
    const year = dateString.toString().substring(4);
    const maskDate = `${day}/${month}/${year}`;
    return maskDate;
  }

  const today = new Date();
  const todayString = `${String(today.getDate()).padStart(2, "0")}${String(
    today.getMonth() + 1
  ).padStart(2, "0")}${today.getFullYear()}`;
  const todayFormatted = transData(todayString);

  return (
    <div className="p-8 pl-0 mt-12 font-Montserrat w-full ">
      {/* Title */}
      <div className=" ml-32 flex justify-start items-center mb-8 font-semibold">
        <div className="text-2xl font-bold text-[25px]">Início</div>
      </div>

      {/* Buttons */}
      <div className="flex ml-32 gap-4 mb-8 text-[20px] font-semibold text-white justify-start">
        <Link to="/criarconsulta">
          <button className="bg-[#D5D0C7] shadow-lg flex flex-col hover:bg-[#100F49] rounded-lg items-center justify-center p-8  text-center">
            <img src={iconAgendar} className="pr-4 h-20 self-center pl-6" />
            Nova consulta
          </button>
        </Link>
        <Link to="/receita">
          <button className="bg-[#D5D0C7] flex flex-col hover:bg-[#100F49] rounded-lg items-center justify-center p-8 shadow-lg text-center">
            <img src={iconCadastro} className="pr-4 h-20 self-center pl-6" />
            Receita
          </button>
        </Link>

        <Link to="/prontuarios">
          <button className="bg-[#D5D0C7] flex flex-col hover:bg-[#100F49] rounded-lg items-center justify-center p-8 shadow-lg text-center">
            <img src={iconProntuario} className="pr-4 h-20 self-center pl-6" />
            Prontuários
          </button>
        </Link>
      </div>

      {/* Today's Appointments */}
      <div className="ml-32 text-xl text-[25px] mb-4 font-medium mt-20">
        <strong className="text-3xl">Hoje</strong>
      </div>
      <section>
        {todayConsults.length > 0 && (
          <div className="m-12 mt-8 pr-40 max-w-4xl">
            <h2 className="text-2xl pr-0 text-text-gray font-semibold">
              {todayFormatted}
            </h2>
            {todayConsults.map((dados) => (
              <div
                key={dados.data}
                className="flex bg-side-gray my-4 rounded-lg ml-4"
                data-testid="agenda"
              >
                <div className="bg-card-green m-0 text-transparent rounded-lg">
                  a
                </div>
                <div className="flex flex-col p-4 w-screen">
                  <div className="m-2">
                    <span>
                      Tutor:{" "}
                      <span className="font-bold pl-1">
                        {dados.nameTutor}
                      </span>
                    </span>
                    <span>, {dados.phone}</span>
                  </div>
                  <div className="m-2">
                    <span className="ml-0 pr-1">
                      Paciente:{" "}
                      <span className="font-bold pl-1">
                        {dados.nameAnimal}
                      </span>
                    </span>
                    <span className="ml-0 pl-1">{`- ${dados.species}`}</span>
                  </div>
                  <span className="m-2">{`Observações: ${dados.description}`}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
