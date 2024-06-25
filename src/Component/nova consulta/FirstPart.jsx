import { useState, useContext, useEffect } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import InputComponent from "./InputComponent";
import { ConsultContext } from "../../pages/NovaConsulta";
import PropTypes from "prop-types";
import "./consultPages.css";
import { getProfessores, getTeacherByName } from "../../services/professores";
import { getAnimalsAndTutorByTutorName } from "../../services/tutores";
import mais from '../../images/mais.svg'
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import fundo from '../../images/fundo.svg'
import { postAnimal } from "../../services/animals";

export default function FirstPart(props) {
  const { pagOne, setPagOne } = useContext(ConsultContext);
  // melhorias
  // alterar para reducer, ou criar um só state que é um objetivo.
  // desabilitar campos do animal quando ele for selecionado.
  // adicionar receita
  // modal de adicionar receita
  // corrigir fontes dos autocompletes
  // ficar vermelho paciente, tutor e professor/médico quando não preenchido.
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
  const [viewTutor, setviewTutor] = useState(pagOne.viewTutor);
  const [vacina, setVacina] = useState(pagOne.vacina);
  const [desmer, setDesmer] = useState(pagOne.desmer);
  const [animalSelecionado, setAnimalSelecionado] = useState(true);
  const [viewAnimal, setViewAnimal] = useState(pagOne.viewAnimal);
  const [openModal, setOpenModal] = useState(!open);
  const [required, setRequired] = useState({ paciente: false, especie: false, raca: false, sexo: false, idade: false, peso: false, tutor: false, professor: false, data: false });

  //muda o state do modal
  const handleButtonClick = () => setOpenModal(!openModal);

  //seta os animais baseado no tutor.
  useEffect(() => {
    if (typeof tutores[0] === 'object' && 'animals' in tutores[0] && tutores[0].animals.length > 0) {
      setPacientes(tutores[0].animals)
    }
    else {
      setPacientes([])
    }
  }, [tutores]);

  //controla o disable do tutor baseado no state do input paciente
  useEffect(() => {
    paciente == "" || paciente == 'Preencha Tutor' ? setviewTutor(false) : setviewTutor(true)
  }, [paciente])

  //carrega os autoCompletes ao abrir a página.
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

  //usa o set para vacina que modifica o array de vacinas
  const handleVacina = (arr, index, valor, key) => {
    const array = [...arr]
    array[index] = { ...array[index], [key]: valor }
    setVacina(array)
  }

  //botão que adiciona vacinas
  const addVacina = () => {
    const array = [...vacina]
    const obj = { name: '', date: '' }
    array.push(obj)
    setVacina(array)
  }
  const removeVacina = (e) => {
    const arr = [...vacina]
    setVacina(arr.filter((_i, index) => index != e))
  }

  const pageOneData = {
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
    viewAnimal,
    viewTutor,
    teacher_id: professores.filter((e) => e.name == professor)[0],
  };

  const fullfillValidate = {
    paciente,
    especie,
    raca,
    sexo,
    idade,
    peso,
    tutor,
    professor,
    data,
  }

  const validateTrue = (chaves) => {
    let obj = { ...required }
    const keys = Object.keys(obj)
    console.log(keys)
    keys.forEach((e) => {
      if (e == chaves) {
        obj[e] = false;
      }
    })
    setRequired(obj)
  }
  //botao de Proximo validando lógica se o animal colocado existe
  const validateInputs = () => {
    const keys = Object.keys(fullfillValidate)
    const values = Object.values(fullfillValidate)
    let validation = false
    let obj = { ...required }
    console.log(obj[keys[0]])
    values.map((e, index) => {
      if (e == '' || e == 'Preencha Tutor') {
        const chaves = keys[index]
        obj[chaves] = true;
        validation = true;
      }
    })
    setRequired(obj)
    return validation
  }

  //botao de Proximo validando lógica se o animal colocado existe
  const handleProx = () => {
    const validacaoCampos = validateInputs()
    if (validacaoCampos) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
      return
    }
    if (pacientes.some((e) => e.name == paciente)) {
      props.setSteps(2);
      setPagOne(pageOneData);
    } else {
      handleButtonClick();
    }
  };

  const notification = () => {
    alert('Animal adicionado com sucesso!');
  }
  const erroNotification = () => {
    alert('Animal não pode ser criado.');
  }

  return (
    <div className="font-Montserrat p-28 w-full">
      <div className="font-semibold">
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
                  onChange={(_e, newValue) => {
                    setProfessor(newValue)
                    validateTrue('professor');
                  }}
                  value={professor}
                  renderInput={(params) => (
                    <TextField
                      sx={{
                        border: required.professor ? '1.5px solid red' : 'none',
                        margin: 0,
                        borderRadius: 2,
                        fontFamily: 'Montserrat'
                      }}
                      value={professor}
                      onChange={(e, value) => {
                        setProfessor(value)
                        e.target.value.length == 0 ? getProfessores(setProfs) : getTeacherByName(setProfs, e.target.value)
                        validateTrue('professor');
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
                requireVal={required.data}
                handleButton={validateTrue}
                descrHandle="data"
              />
            </div>
            <div id="div-pac-tut" className="flex gap-8 my-4 justify-center">
              <label htmlFor="free-solo-2-demo" className="grow">
                Tutor
                <Autocomplete
                  freeSolo
                  disableClearable
                  id="free-solo-2-demo"
                  disabled={viewTutor}
                  onChange={(_e, newValue) => {
                    setTutor(newValue)
                    getAnimalsAndTutorByTutorName(setTutores, newValue)
                    setViewAnimal(false)
                    setPaciente('')
                    validateTrue('tutor')
                  }}
                  options={tutores.map((option) => option.name)}
                  value={tutor}
                  renderInput={(params) => (
                    <TextField
                      sx={{
                        border: required.tutor ? '1.5px solid red' : 'none',
                        margin: 0,
                        borderRadius: 2,
                        fontFamily: 'Montserrat'
                      }}
                      onChange={(e) => {
                        setTutor(e.target.value)
                        getAnimalsAndTutorByTutorName(setTutores, e.target.value)
                        validateTrue('tutor')
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
              <label htmlFor="free-solo-2-demo" className={"grow"}>
                Paciente
                <Autocomplete
                  freeSolo
                  id="free-solo-2-demo"
                  value={paciente}
                  disabled={viewAnimal}
                  onChange={(_e, newValue) => {
                    setPaciente(newValue)
                    const filter = pacientes.filter((e) => e.name == newValue)
                    setEspecie(filter[0].species)
                    setRaca(filter[0].race)
                    setSexo(filter[0].gender)
                    setIdade(filter[0].age)
                    setPelagem(filter[0].coat)
                    setAnimalSelecionado(true)
                    validateTrue('paciente')
                  }}
                  disableClearable
                  options={pacientes.map((option) => option.name)} // Assuming you want to use the name property as the label
                  renderInput={(params) => (
                    <TextField
                      sx={{
                        border: required.paciente ? '1.5px solid red' : 'none',
                        margin: 0,
                        borderRadius: 2,
                        fontFamily: 'Montserrat'
                      }}
                      value={paciente}
                      onChange={(e) => {
                        validateTrue('paciente')
                        setPaciente(e.target.value); // Update the state with the new value
                        setAnimalSelecionado(false)
                        if (animalSelecionado) {
                          setEspecie('')
                          setRaca('')
                          setSexo('')
                          setIdade('')
                          setPelagem('')
                        }
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
                requireVal={required.especie}
                handleButton={validateTrue}
                descrHandle="especie"
              />
              <InputComponent
                nome="Raça"
                dataType="text"
                type={raca}
                setDataCom={setRaca}
                requireVal={required.raca}
                handleButton={validateTrue}
                descrHandle="raca"
              />
              <label className="grid h-full grow">

                Sexo
                <select
                  value={sexo}
                  onChange={(e) => {
                    setSexo(e.target.value);
                    validateTrue('sexo');
                  }}
                  className={`${required.sexo
                    ? "outline-red-600 border-red-500"
                    : "outline-gray-input"
                    } w-full grow p-1 py-2 rounded-lg bg-white border-solid border-2 border-gray`}
                >
                  <option className="bg-white-500" value="">
                  </option>
                  <option className="bg-white-500" value="Macho" defaultValue={true}>
                    Macho
                  </option>
                  <option value="Fêmea">Fêmea</option>
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
                requireVal={required.idade}
                handleButton={validateTrue}
                descrHandle="idade"
              />
              <InputComponent
                nome="Peso"
                dataType="text"
                type={peso}
                setDataCom={setPeso}
                requireVal={required.peso}
                handleButton={validateTrue}
                descrHandle="peso"
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
            <div id="div-vac" className="w-full my-4 flex flex-col gap-8">
              {vacina.map((e, index) => {
                return (
                  <div className="flex gap-8 justify-center items-center" key={index}>
                    <label className="grow">
                      Qual
                      <input
                        type="text"
                        className="w-full border-solid border-2 order-border-gray rounded-lg p-1"
                        value={e.name}
                        onChange={(e) => handleVacina(vacina, index, e.target.value, 'name')}
                      />
                    </label>
                    <label className="">
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
                    <div className="bg-remove p-[8px] rounded-lg self-end cursor-pointer" onClick={() => removeVacina(index)}>
                      <img srcSet={fundo}></img>
                    </div>
                  </div>
                )
              })}
              <div className="flex gap-12 justify-center bg-gray-input p-2 rounded-lg text-white-med shadow-xl cursor-pointer" onClick={() => addVacina()}>
                <div className="flex gap-4">
                  <img srcSet={mais} alt="mais" className="" />
                  <button className="grow font-semibold" type="button">Adicionar Vacina</button>
                </div>
              </div>

            </div>
            <div className="font-bold mt-16">
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
                  value={desmer.name}
                  onChange={(i) => handleInput(desmer, 'name', i.target.value, setDesmer)}
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
            onClick={handleProx}
          >
            Próximo
          </button>
        </form>
      </div>
      <div>
        <Modal
          open={openModal}
          aria-labelledby="modal-modal-deletetitle"
          aria-describedby="modal-modal-description2"
        >
          <Box id="box-modal-pag1">
            <Typography
              id="modal-modal-deletetitle"
              variant="h6"
              component="h1"
            >
              Cadastrar animal?
              <p id="descri-modal">O animal inserido ainda não possui cadastro, deseja cadastrá-lo?</p>
              <div className="flex justify-between my-12">
                <IconButton
                  id="voltar-animal"
                  onClick={handleButtonClick}
                >
                  Voltar
                </IconButton>
                <IconButton
                  id="cadastrar-animal"
                  onClick={async () => {
                    const animal = {
                      name: paciente,
                      species: especie,
                      race: raca,
                      gender: sexo,
                      age: idade,
                      weight: peso,
                      coat: pelagem,
                      tutor_id: tutores[0].id
                    }
                    const validyCreateAnimal = await postAnimal(animal, tutores[0].id)
                    if (validyCreateAnimal) {
                      const envioData = pageOneData;
                      envioData.idAnimal = [{ id: validyCreateAnimal.data }]
                      notification();
                      props.setSteps(2);
                      setPagOne(envioData);
                    } else {
                      erroNotification()
                    }
                  }}
                >
                  Cadastrar
                </IconButton>
              </div>
            </Typography>
          </Box>
        </Modal>
      </div>
    </div>
  );
}

FirstPart.propTypes = {
  setSteps: PropTypes.func.isRequired,
};
