import React, { useState, useEffect } from "react";
import { getConsults } from "../services/agendamento";
import iconAgendar from "../images/agendar.svg";
import iconCadastro from "../images/novo-cadastro.svg";
import iconProntuario from "../images/prontuario.svg";
import { Link } from "react-router-dom";

const Home = () => {
  const [todayConsults, setTodayConsults] = useState([]);

  useEffect(() => {
    getConsults(
      (data) => {
        const today = new Date();
        const todayString = `${String(today.getDate()).padStart(2, "0")}${String(
          today.getMonth() + 1
        ).padStart(2, "0")}${today.getFullYear()}`;
        setTodayConsults(data[todayString] || []);
      },
      () => "today"
    );
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
    <div className=" pl-0 mt-6 md:mt-12 font-Montserrat w-full">
      <div className="mx-4 md:mx-32 flex justify-start items-center mb-6 md:mb-8 font-semibold">
        <div className="text-xl md:text-2xl font-bold">Início</div>
      </div>

      <div className="flex flex-col md:flex-row mx-4 md:mx-32 gap-3 mb-8 text-base md:text-lg font-semibold text-white justify-start">
        <Link to="/criarconsulta" className="w-full md:w-1/3">
          <button className="w-full bg-[#D5D0C7] shadow-lg flex flex-col hover:bg-[#100F49] rounded-lg items-center justify-center p-4 text-center transition-colors min-h-[140px] md:min-h-[160px]">
            <img
              src={iconAgendar}
              className="h-10 md:h-14 mb-3"
              alt="Agendar"
            />
            <span className="whitespace-nowrap">Nova consulta</span>
          </button>
        </Link>
        <Link to="/receita" className="w-full md:w-1/3">
          <button className="w-full bg-[#D5D0C7] shadow-lg flex flex-col hover:bg-[#100F49] rounded-lg items-center justify-center p-4 text-center transition-colors min-h-[140px] md:min-h-[160px]">
            <img
              src={iconCadastro}
              className="h-10 md:h-14 mb-3"
              alt="Cadastro"
            />
            <span className="whitespace-nowrap">Receita</span>
          </button>
        </Link>
        <Link to="/prontuarios" className="w-full md:w-1/3">
          <button className="w-full bg-[#D5D0C7] shadow-lg flex flex-col hover:bg-[#100F49] rounded-lg items-center justify-center p-4 text-center transition-colors min-h-[140px] md:min-h-[160px]">
            <img
              src={iconProntuario}
              className="h-10 md:h-14 mb-3"
              alt="Prontuário"
            />
            <span className="whitespace-nowrap">Prontuários</span>
          </button>
        </Link>
      </div>

      <div className="mx-4 md:mx-32 mt-6 md:mt-10">
        <div className="text-lg md:text-2xl font-medium mb-4">
          <strong>Hoje</strong>
        </div>
        <section>
          {todayConsults.length > 0 && (
            <div className="mt-4 pr-4 md:pr-8 max-w-4xl">
              <h2 className="text-xl md:text-2xl text-text-gray font-semibold mb-4">
                {todayFormatted}
              </h2>
              {todayConsults.map((dados) => (
                <div
                  key={dados.data}
                  className="flex bg-side-gray my-3 rounded-lg"
                  data-testid="agenda"
                >
                  <div className="bg-card-green m-0 text-transparent rounded-lg">
                    a
                  </div>
                  <div className="flex flex-col p-3 md:p-4 w-full">
                    <div className="m-2">
                      <span>
                        Tutor:{" "}
                        <span className="font-bold pl-1">{dados.nameTutor}</span>
                      </span>
                      <span>, {dados.phone}</span>
                    </div>
                    <div className="m-2">
                      <span className="ml-0 pr-1">
                        Paciente:{" "}
                        <span className="font-bold pl-1">{dados.nameAnimal}</span>
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
    </div>
  );
};

export default Home;