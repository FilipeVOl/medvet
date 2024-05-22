import { useState, useContext, useEffect } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import InputComponent from "./InputComponent";
import { ConsultContext } from "../../pages/NovaConsulta";
import PropTypes from "prop-types";
import "./consultPages.css";
import { getProfessores, getTeacherByName } from "../../services/professores";
import { getAnimalsAndTutorByTutorName } from "../../services/tutores";

//criar animal
//ajeitar desmer, vacinacao

export default function FirstPart(props) {
  const { pagOne, setPagOne } = useContext(ConsultContext);
  const [data, setData] = useState(pagOne.data);
  const [paciente, setPaciente] = useState(pagOne.paciente);
  const [tutor, setTutor] = useState(pagOne.tutor);
  const [especie, setEspecie] = useState(pagOne.especie);
  const [raca, setRaca] = useState(pagOne.raca);
  const [sexo, setSexo] = useState(pagOne.sexo);
  const [idade, setIdade] = useState(pagOne.idade);
  const [peso, setPeso] = useState(pagOne.peso);
  const [pelagem, setPelagem] = useState(pagOne.pelagem);
  const [historico, setHistorico] = useState(pagOne.historico);
  const [professor, setProfessor] = useState(pagOne.professor);
  const [professores, setProfs] = useState([]);
  const [tutores, setTutores] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [motivo, setMotivo] = useState(pagOne.motivo);

  //Ajeitar lógica da vacina e desmerninação
  const [vacina, setVacina] = useState([{ vacina: '', date: '' }]);
  const [desmer, setDesmer] = useState(pagOne.desmer);

  useEffect(() => {
    if (typeof tutores[0] === 'object' && 'animals' in tutores[0]) {
      setPacientes(tutores[0].animals)
    }
  }, [tutores]);
  useEffect(() => {
    getProfessores(setProfs);
    getAnimalsAndTutorByTutorName(setTutores, '');
  }, []);

  //tipo de obj, qual chave e setter
  const handleInput = (objReceived, chave, valor, set) => {
    let obj = { ...objReceived }
    obj[chave] = valor;
    set(obj);
  }

  const handleVacina = (arr, index, valor, key) => {
    const array = [...arr]
    array[index] = { ...array[index], [key]: valor }
    setVacina(array)
  }

  const PageOneData = {
    data,
    paciente,
    tutor,
    especie,
    raca,
    sexo,
    idade,
    peso,
    pelagem,
    historico,
    professor,
    vacina,
    desmer,
    motivo,
    idAnimal: pacientes.filter((e) => e.name == paciente),
  };
  const handleProx = () => {
    props.setSteps(2);
    setPagOne(PageOneData);
  };
  return (
    <div className="font-Montserrat p-28 w-full">
      <div className="font-bold">
        <h1 className="text-[30px]">Identificação</h1>
      </div>
      <div>
        <form className="text-[18px]">
          <div className="py-8 w-full">
            <div className="flex gap-8" id="div-prof-data">
              <label htmlFor="free-solo-2-demo" className="w-full">
                Professor
                <Autocomplete
                  freeSolo
                  id="free-solo-2-demo"
                  disableClearable
                  options={professores.map((option) => option.name)}
                  onChange={(_e, newValue) => setProfessor(newValue)}
                  value={professor}
                  renderInput={(params) => (
                    <TextField
                      value={professor}
                      onChange={(e, value) => {
                        setProfessor(value)
                        e.target.value.length == 0 ? getProfessores(setProfs) : getTeacherByName(setProfs, e.target.value)
                      }}
                      {...params}
                      InputProps={{
                        ...params.InputProps,
                        type: "search",
                      }}
                    />
                  )}
                />
              </label>
              <InputComponent
                nome="Data"
                dataType="date"
                type={data}
                setDataCom={setData}
              />
            </div>
            <div id="div-pac-tut" className="flex gap-8 my-4 justify-center">
              <label htmlFor="free-solo-2-demo" className="grow">
                Tutor
                <Autocomplete
                  freeSolo
                  id="free-solo-2-demo"
                  disableClearable
                  onChange={(_e, newValue) => {
                    setTutor(newValue)
                    getAnimalsAndTutorByTutorName(setTutores, newValue)
                  }}
                  options={tutores.map((option) => option.name)}
                  value={tutor}
                  renderInput={(params) => (
                    <TextField
                      onChange={(e) => {
                        setTutor(e.target.value)
                        getAnimalsAndTutorByTutorName(setTutores, e.target.value)
                      }}
                      {...params}
                      InputProps={{
                        ...params.InputProps,
                        type: "search",
                      }}
                    />
                  )}
                />
              </label>
              <label htmlFor="free-solo-2-demo" className="grow">
                Paciente
                <Autocomplete
                  freeSolo
                  id="free-solo-2-demo"
                  value={paciente}
                  onChange={(_e, newValue) => {
                    setPaciente(newValue)
                    const filter = pacientes.filter((e) => e.name == newValue)
                    console.log(filter[0])
                    setEspecie(filter[0].species)
                    setRaca(filter[0].race)
                    setSexo(filter[0].gender)
                    setIdade(filter[0].age)
                    // setPeso()
                    setPelagem(filter[0].coat)
                  }}
                  disableClearable
                  options={pacientes.map((option) => option.name)} // Assuming you want to use the name property as the label
                  renderInput={(params) => (
                    <TextField
                      value={paciente}
                      onChange={(_e, newValue) => {
                        setPaciente(newValue); // Update the state with the new value
                      }}
                      {...params}
                      InputProps={{
                        ...params.InputProps,
                        type: "search",
                      }}
                    />
                  )}
                />
              </label>
            </div>
            <div className="flex gap-8 justify-center" id="div-esp-rac-sex">
              <InputComponent
                nome="Espécie"
                dataType="text"
                type={especie}
                setDataCom={setEspecie}
              />
              <InputComponent
                nome="Raça"
                dataType="text"
                type={raca}
                setDataCom={setRaca}
              />
              <label className="grid h-full grow">
                Sexo
                <select
                  value={sexo}
                  onChange={(e) => setSexo(e.target.value)}
                  className="w-full grow p-1 py-2 rounded-lg bg-white border-solid border-2 border-gray"
                >
                  <option className="bg-white-500" value="M">
                    Masculino
                  </option>
                  <option value="F">Feminino</option>
                  <option value="INDEFINIDO">Indefinido</option>
                </select>
              </label>
            </div>
            <div id="ida-pes-pela" className="flex gap-8 my-4 justify-center">
              <InputComponent
                nome="Idade"
                dataType="text"
                type={idade}
                setDataCom={setIdade}
              />
              <InputComponent
                nome="Peso"
                dataType="text"
                type={peso}
                setDataCom={setPeso}
              />
              <InputComponent
                nome="Pelagem"
                dataType="text"
                type={pelagem}
                setDataCom={setPelagem}
              />
            </div>
          </div>
          <div>
            <div className="font-bold">
              <h1 className="text-[30px]">Anamnese</h1>
            </div>
            <div id="div-cons-hist" className="gap-8 my-8">
              <label htmlFor="motivo" className="grow my-2 mx-8">
                Motivo da Consulta
                <textarea
                  name="consult"
                  id="consult"
                  cols="25"
                  rows="3"
                  className="w-full border-solid border-2 order-border-gray rounded-lg p-1 resize-none"
                  value={motivo}
                  onChange={(e) => setMotivo(e.target.value)}
                ></textarea>
              </label>
              <label htmlFor="historico" className="grow mx-8">
                Histórico
                <textarea
                  id="historico"
                  name="historico"
                  rows="3"
                  cols="25"
                  className="w-full border-solid border-2 order-border-gray rounded-lg p-1 resize-none"
                  value={historico}
                  onChange={(e) => setHistorico(e.target.value)}
                ></textarea>
              </label>
            </div>
          </div>
          <div>
            <div className="font-bold">
              <h1 className="text-[30px]">Vacinação</h1>
            </div>
            <div id="div-vac" className="gap-8 flex justify-center my-4">
              {vacina.map((e, index) => {
                return (
                  <>
                    <label className="grow">
                      Qual
                      <input
                        type="text"
                        className="w-full border-solid border-2 order-border-gray rounded-lg p-1"
                        value={e.vacina}
                        onChange={(e) => handleVacina(vacina, index, e.target.value, 'vacina')}
                      />
                    </label>
                    <label >
                      Data da Última
                      <input
                        type="date"
                        name="data1"
                        id="data1"
                        className="w-full border-solid border-2 order-border-gray rounded-lg p-1"
                        value={e.date}
                        onChange={(e) => handleVacina(vacina, index, e.target.value, 'date')}
                      />
                    </label>
                  </>
                )
              })}
               <button className="w-100 bg-gray-500 p-4 border-solid border-2 order-border-gray rounded-lg" type="button">Adicionar Vacina</button>
            </div>
            <div className="font-bold">
              <h1 className="text-[30px]">Desverminação</h1>
            </div>
            <div id="div-vac" className="gap-8 flex justify-center my-8">
              <label className="grow">
                Qual
                <input
                  type="text"
                  name="vacina1"
                  id="vacina1"
                  className="w-full border-solid border-2 order-border-gray rounded-lg p-1"
                  value={desmer.desmer}
                  onChange={(i) => handleInput(desmer, 'desmer', i.target.value, setDesmer)}
                />
              </label>
              <label >
                Data da Última
                <input
                  type="date"
                  name="data1"
                  id="data1"
                  className="w-full border-solid border-2 order-border-gray rounded-lg p-1"
                  value={desmer.date}
                  onChange={(i) => handleInput(desmer, 'date', i.target.value, setDesmer)}
                />
              </label>
            </div>
          </div>
          <button
            type="button"
            className="bg-blue-button py-2 px-16 my-32 rounded-lg text-white float-right"
            onClick={() => {
              handleProx();
            }}
          >
            Próximo
          </button>
        </form>
      </div>
    </div>
  );
}

FirstPart.propTypes = {
  setSteps: PropTypes.func.isRequired,
};
