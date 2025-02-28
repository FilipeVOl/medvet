import iconSearch from "../images/icon-search.png";
import { useState, useEffect } from "react";
import { getConsults } from "../services/agendamento";
import iconCalendar from "../images/calendarIcon.svg";
import { Link } from "react-router-dom";
import { Select, MenuItem } from "@mui/material";

export default function Agenda() {
  const [agenda, setAgenda] = useState({});
  const [searchType, setSearchType] = useState("name");
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
    <div className="w-full min-h-screen m-6 md:p-8 font-Montserrat">
    <div className="max-w-7xl mx-auto space-y-6">

      <div>
        <h1 className="text-xl md:text-2xl font-bold">Agendamentos</h1>
      </div>


      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 flex flex-col sm:flex-row gap-4">
          <Select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            className="h-[42px] w-full sm:w-[120px]"
            sx={{
              fontFamily: 'Montserrat',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#9F9F9F',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#9F9F9F',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#9F9F9F',
              },
            }}
          >
            <MenuItem value="name">Nome</MenuItem>
            <MenuItem value="date">Data</MenuItem>
          </Select>

          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <img src={iconSearch} alt="Search" className="w-5 h-5" />
            </div>
            <input
              type="text"
              className="w-full h-[42px] pl-10 pr-4 border border-[#9F9F9F] rounded-md font-Montserrat text-sm focus:outline-none focus:border-[#9F9F9F]"
              placeholder={searchType === "name" ? "Buscar por Nome" : "Buscar por Data (DDMMYYYY)"}
              value={searchType === "name" ? nome : dateFilter}
              onChange={(e) => {
                if (searchType === "name") {
                  setNome(e.target.value);
                  setDateFilter("");
                } else {
                  setDateFilter(e.target.value);
                  setNome("");
                }
              }}
            />
          </div>
        </div>

        <Link
          to="/calendario"
          className="w-full sm:w-[42px] h-[42px] bg-[#D5D0C7] rounded-md flex items-center justify-center hover:bg-[#c2bdb4] transition-colors"
        >
          <img src={iconCalendar} alt="Calendar" className="w-6 h-6" />
        </Link>
      </div>


      <div className="space-y-6">
        {Object.keys(alteredAgenda).map((day) => {
          const consultas = alteredAgenda[day];

          return (
            <div key={day}>
              <h2 className="text-lg md:text-xl font-semibold text-gray-700 mb-4">
                {transData(day)}
              </h2>

              <div className="space-y-4">
                {Array.isArray(consultas) &&
                  consultas.map((e, index) => (
                    <div
                      key={index}
                      className="flex bg-gray-50 rounded-lg overflow-hidden shadow-sm"
                      data-testid="agenda"
                    >
                      <div className="w-2 bg-[#144A36]"></div>
                      <div className="flex flex-col p-4 flex-1">
                        <div className="mb-2 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                          <span className="text-gray-700">
                            Tutor: <span className="font-semibold">{e.nameTutor}</span>
                          </span>
                          <span className="text-gray-600 sm:before:content-[',_']">
                            {e.phone}
                          </span>
                        </div>
                        <div className="mb-2 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                          <span className="text-gray-700">
                            Paciente: <span className="font-semibold">{e.nameAnimal}</span>
                          </span>
                          <span className="text-gray-600">- {e.species}</span>
                        </div>
                        <div className="text-gray-700">
                          <span className="block sm:inline">Observações: </span>
                          <span className="text-gray-600 block sm:inline">{e.description}</span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </div>
);
}