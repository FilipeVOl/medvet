import iconSearch from "../images/icon-search.png";
import { useState, useEffect } from "react";
import { getConsults } from "../services/agendamento";
import iconCalendar from "../images/calendarIcon.svg";
import { Link } from "react-router-dom";

export default function Agenda() {
  const [agenda, setAgenda] = useState({});

  const [alteredAgenda, setAlteredAgenda] = useState([]);
  const [nome, setNome] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  useEffect(() => {
    getConsults(setAgenda, setAlteredAgenda);
  }, []);
  
  useEffect(() => {
    const agendaArray = Object.keys(agenda).reduce((acc, dateKey) => {
      acc[dateKey] = agenda[dateKey].map((item) => ({
        date: dateKey,
        ...item,
      }));
      return acc;
    }, {});
  
    const filteredConsultas = consultasFiltradas(Object.values(agendaArray).flat());

    const result = nome.length === 0 && dateFilter.length === 0 ? agendaArray : groupByDate(filteredConsultas);

  
    setAlteredAgenda(
      nome.length === 0 && dateFilter.length === 0
        ? agendaArray
        : filteredConsultas
    );
  }, [nome, dateFilter, agenda]);

  const groupByDate = (consultas) => {
    return consultas.reduce((acc, consulta) => {
      const date = consulta.date;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(consulta);
      return acc;
    }, {});
  };


  const consultasFiltradas = (agendaArray) => {
    const dateAlt = agendaArray.reduce((acc, day) => {
      // Verifica se o objeto tem o campo 'consults' e se é um array
      const consultasDoDia = Array.isArray(day.consults)
        ? day.consults.filter(
            (consulta) =>
              consulta.nameTutor
                .toLowerCase()
                .includes(nome.toLowerCase()) ||
              consulta.nameAnimal
                .toLowerCase()
                .includes(nome.toLowerCase())
          )
        : [];
  
      // Se há consultas filtradas e a data coincide com o filtro
      if (
        consultasDoDia.length > 0 &&
        (dateFilter === "" || day.date.startsWith(dateFilter))
      ) {
        acc.push({ ...day, consults: consultasDoDia });
      }
      return acc;
    }, []);
  
    // Se nenhuma consulta for encontrada, retorna o array original
    return dateAlt.length === 0 ? agendaArray : dateAlt;
  };
  
  function transData(dateString) {
    const day = dateString.toString().substring(0, 2);
    const month = dateString.toString().substring(2, 4);
    const year = dateString.toString().substring(4);
    const maskDate = `${day}/${month}/${year}`;
    return maskDate;
  }

  window.localStorage.setItem("agenda", JSON.stringify(agenda));

  return (
    <main className="font-Montserrat !important w-full">
      <section>
        <h1 className="text-2xl font-bold m-16">Agendamentos</h1>
      </section>
      <section className="flex flex-row items-center mx-24">
        <div className="relative w-full">
          <div className="absolute top-3 start-0 flex items-center ps-3 pointer-events-none">
            <img src={iconSearch} />
          </div>
          <div className="flex flex-row justify-between">
            <div className="relative w-3/12">
              <div className="absolute top-3 start-0 flex items-center ps-3 pointer-events-none">
                <img src={iconSearch} />
              </div>
              <input
                data-testid="filter-agenda"
                type="text"
                id="simple-search"
                className="bg-gray-50 border border-gray-300
              text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
              block ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
              dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full"
                placeholder="Buscar por Nome"
                required
                value={nome}
                onChange={(e) => {
                  setNome(e.target.value);
                }}
              />
            </div>
            <div className="relative w-3/12 ml-4">
              <div className="absolute top-3 start-0 flex items-center ps-3 pointer-events-none">
                <img src={iconSearch} />
              </div>
              <input
                data-testid="filter-date"
                type="text"
                id="date-search"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block ps-10 p-2.5 w-full"
                placeholder="Buscar por Data"
                required
                value={dateFilter}
                onChange={(e) => {
                  setDateFilter(e.target.value);
                }}
              />
            </div>
          </div>
        </div>
        <Link
          to="/calendario"
          className="bg-[#D5D0C7] text-white rounded-lg ml-4 flex flex-row items-center justify-center text-nowrap px-8 py-2"
        >
          <img src={iconCalendar} className="h-8 mr-2" />
          Ver calendário
        </Link>
      </section>
      <section className="mx-24">
  {/* Itera sobre as chaves do alteredAgenda */}
  {Object.keys(alteredAgenda).map((day) => {
    const consultas = alteredAgenda[day];

    return (
      <div key={day} className="m-12 pr-40 max-w-4xl">
        {/* Renderiza a chave (data) como título */}
        <h2 className="text-2xl pr-0 text-text-gray font-semibold">
          {transData(day)} {/* Formata a chave da data para DD/MM/YYYY */}
        </h2>

        {/* Verifica se alteredAgenda[day] é um array e faz o map */}
        {Array.isArray(consultas) &&
          consultas.map((e, index) => (
            <div
              key={index}
              className="flex bg-side-gray my-4 rounded-lg ml-4"
              data-testid="agenda"
            >
              <div className="bg-card-green m-0 text-transparent rounded-lg">a</div>
              <div className="flex flex-col p-4 w-screen">
                <div className="m-2">
                  <span>
                    Tutor: <span className="font-bold pl-1">{e.nameTutor}</span>
                  </span>
                  <span>, {e.phone}</span>
                </div>
                <div className="m-2">
                  <span className="ml-0 pr-1">
                    Paciente:{" "}
                    <span className="font-bold pl-1">{e.nameAnimal}</span>
                  </span>
                  <span className="ml-0 pl-1">{`- ${e.species}`}</span>
                </div>
                <span className="m-2">{`Observações: ${e.description}`}</span>
              </div>
            </div>
          ))}
      </div>
    );
  })}
</section>

    </main>
  );
}
