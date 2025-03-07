import { useEffect, useState } from "react";
import FilterInput from "../Component/Prontuarios/FilterInput";
import { Link } from "react-router-dom";
import { getAllAnimals, getAnimalBySequenceOrName } from "../services/animals";
import Pagination from "@mui/material/Pagination";
import { getAnimalsByTutorName } from "../services/tutores";
import { Select, MenuItem } from "@mui/material";

export default function Prontuarios() {
  const [searchValue, setSearchValue] = useState("");
  const [searchType, setSearchType] = useState("patient");
  const [prontuarios, setProntuarios] = useState([]);
  const [pageSelected, setPageSelected] = useState(1);

  useEffect(() => {
    getAllAnimals(setProntuarios);
  }, [setProntuarios]);

  const getTheFirstOne = (nome) => {
    const names = nome.split(" ");
    let firstName = names[0];
    let capitalizedFirstName =
      firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
    return capitalizedFirstName.substring(0, 10);
  };

  const handleSearch = async (value) => {
    setSearchValue(value);
    
    if (value === '') {
      getAllAnimals(setProntuarios);
      return;
    }
  
    try {
      switch (searchType) {
        case "patient":
        case "number":
          const animals = await getAnimalBySequenceOrName(value);
          setProntuarios(animals);
          break;
        case "tutor":
          const data = await getAnimalsByTutorName(value);
          setProntuarios(data);
          break;
        default:
          break;
      }
    } catch (error) {
      console.error('Error during search:', error);
      setProntuarios([]);
    }
};

  return (
    <div className="font-Montserrat w-full pl-24 py-12 pr-12 flex flex-col ">
      <div id="header">
        <h1 className="font-bold text-2xl md:text-3xl">Prontuários</h1>
      </div>

      <div
        id="filtros"
        className="flex flex-col sm:flex-row items-start gap-4 my-8 w-full"
      >
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <Select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            className="h-[42px] w-full sm:w-[200px]"
            sx={{
              fontFamily: "Montserrat",
              backgroundColor: "#F2F2ED",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#9F9F9F",
              },
            }}
          >
            <MenuItem value="patient">Nome do Paciente</MenuItem>
            <MenuItem value="tutor">Nome do Tutor</MenuItem>
          </Select>

          <FilterInput
            placeHolder={
              searchType === "patient"
                ? "Buscar por nome do paciente"
                : searchType === "tutor"
                ? "Buscar por nome do tutor"
                : "Buscar por número do paciente"
            }
            valueInput={searchValue}
            handleFilter={handleSearch}
            type={searchType === "number" ? "number" : "text"}
            inputMode={searchType === "number" ? "numeric" : "text"}
            onKeyPress={(e) => {
              if (searchType === "number" && !/[0-9]/.test(e.key)) {
                e.preventDefault();
              }
            }}
            className="w-full"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-8">
        {prontuarios.map((e) => (
          <Link
            to={`detalhes/${e.animal_id}`}
            key={e.animal_id}
            id={e.animal_id}
            className="p-4 pt-[111.24%] rounded-lg bg-prontuario-box bg-no-repeat bg-contain flex flex-col justify-end
      hover:bg-hover-box hover:scale-105 cursor-pointer w-full transition-all relative"
          >
            <div className="bg-other-white rounded-lg text-[1.7vh] flex flex-col p-2 m-2 w-fit">
              <p className="font-bold pr-6">{getTheFirstOne(e.animal_name)}</p>
              <p className="text-gray-600">{getTheFirstOne(e.tutor_name)}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="self-center p-4 md:p-8 mt-8">
        <Pagination
          count={10}
          shape="rounded"
          onChange={(e, page) => setPageSelected(page)}
          size="medium"
        />
      </div>
    </div>
  );
}
