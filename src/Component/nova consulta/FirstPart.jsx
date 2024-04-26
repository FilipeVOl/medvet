import professores from "../../mocks/professores.mock"
import { useState, useContext } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import InputComponent from "./InputComponent";
import { ConsultContext } from "../../pages/NovaConsulta";
import PropTypes from "prop-types";
import "./consultPages.css"

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

  //Ajeitar lógica da vacina e desmerninação
  const [vacina1, setVacina1] = useState({ vacina1: '', date: '' });
  const [desmer, setDesmer] = useState({ desmer: '', date: '' });

  const sendDataContext = {
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
    vacina1,
    desmer
  }

  const handleProx = (() => {
    setPagOne(sendDataContext)
    props.setSteps(2)
  })
  const handleVacina = ((e) => {
    let obj = { ...vacina1 }
    obj.vacina1 = e;
    setVacina1(obj);
  });
  const handleDataVacina = ((e) => {
    let obj = { ...vacina1 }
    obj.date = e;
    setVacina1(obj)
  });
  const handleDesmer = ((e) => {
    let obj = { ...desmer }
    obj.desmer = e;
    setDesmer(obj);
  });
  const handleDataDesmer = ((e) => {
    let obj = { ...desmer }
    obj.date = e;
    setDesmer(obj)
  });
  return (
    <div className="font-Montserrat p-28 w-full">
      <div className="font-bold">
        <h1 className="text-[30px]">Identificação</h1>
      </div>
      <div>
        <form action="" className="text-[18px]">
          <div className="py-8 w-full">
            <div className="flex gap-8" id="div-prof-data">
              <label htmlFor="free-solo-2-demo" className="w-full">Professor
                <Autocomplete
                  freeSolo
                  id="free-solo-2-demo"
                  disableClearable
                  options={professores.map((option) => option.name)}
                  value={professor}
                  onChange={((_e, value) => setProfessor(value))}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      InputProps={{
                        ...params.InputProps,
                        type: 'search',
                      }}
                    />
                  )}
                />
              </label>
              <InputComponent nome="Data" dataType="date" type={data} setDataCom={setData} />
            </div>
            <div id="div-pac-tut" className="flex gap-8 my-4 justify-center">
              <label htmlFor="free-solo-2-demo" className="grow">Tutor
                <Autocomplete
                  freeSolo
                  id="free-solo-2-demo"
                  disableClearable
                  options={professores.map((option) => option.name)}
                  value={tutor}
                  onChange={((_e, value) => setTutor(value))}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      InputProps={{
                        ...params.InputProps,
                        type: 'search',
                      }}
                    />
                  )}
                />
              </label>
              <InputComponent nome="Paciente" dataType="text" type={paciente} setDataCom={setPaciente} />
            </div>
            <div className="flex gap-8 justify-center" id="div-esp-rac-sex">
              <InputComponent nome="Espécie" dataType="text" type={especie} setDataCom={setEspecie} />
              <InputComponent nome="Raça" dataType="text" type={raca} setDataCom={setRaca} />
              <label className="grid h-full grow">
                Sexo
                <select value={sexo} onChange={((e) => setSexo(e.target.value))} className="w-full grow p-1 py-2 rounded-lg bg-white border-solid border-2 border-gray">
                  <option className="bg-white-500" value="M">Masculino</option>
                  <option value="F">Feminino</option>
                  <option value="INDEFINIDO">Indefinido</option>
                </select>
              </label>
            </div>
            <div id="ida-pes-pela" className="flex gap-8 my-4 justify-center">
              <InputComponent nome="Idade" dataType="text" type={idade} setDataCom={setIdade} />
              <InputComponent nome="Peso" dataType="text" type={peso} setDataCom={setPeso} />
              <InputComponent nome="Pelagem" dataType="text" type={pelagem} setDataCom={setPelagem} />
            </div>
          </div>
          <div>
            <div className="font-bold">
              <h1 className="text-[30px]">Anamnese</h1>
            </div>
            <div id="div-cons-hist" className="gap-8 my-8">
              <label htmlFor="motivo" className="grow my-2 mx-8">
                Motivo da Consulta
                <textarea name="" id="" cols="25" rows="3" 
                className="w-full border-solid border-2 order-border-gray rounded-lg p-1 resize-none"
                ></textarea>
              </label>
              <label htmlFor="historico" className="grow mx-8">
                Histórico
                <textarea
                  id="historico" name="historico" rows="3" cols="25" className="w-full border-solid border-2 order-border-gray rounded-lg p-1 resize-none"
                  value={historico}
                  onChange={((e) => setHistorico(e.target.value))}></textarea>
              </label>
            </div>
          </div>
          <div>
            <div className="font-bold">
              <h1 className="text-[30px]">Vacinação</h1>
            </div>
            <div id="div-vac" className="gap-8 flex justify-center my-8">
              <label htmlFor="" className="grow">Qual
                <input
                  type="text"
                  name="vacina1"
                  id="vacina1"
                  className="w-full border-solid border-2 order-border-gray rounded-lg p-1"
                  value={vacina1.vacina1}
                  onChange={((e) => handleVacina(e.target.value))} />
              </label>
              <label htmlFor="">Data da Última
                <input
                  type="date"
                  name="data1"
                  id="data1"
                  className="w-full border-solid border-2 order-border-gray rounded-lg p-1"
                  value={vacina1.date}
                  onChange={((e) => handleDataVacina(e.target.value))}
                />
              </label>
            </div>
            <div className="font-bold">
              <h1 className="text-[30px]">Desverminação</h1>
            </div>
            <div id="div-vac" className="gap-8 flex justify-center my-8">
              <label htmlFor="" className="grow">Qual
                <input
                  type="text"
                  name="vacina1"
                  id="vacina1"
                  className="w-full border-solid border-2 order-border-gray rounded-lg p-1"
                  value={desmer.desmer}
                  onChange={((i) => handleDesmer(i.target.value))} />
              </label>
              <label htmlFor="">Data da Última
                <input
                  type="date"
                  name="data1"
                  id="data1"
                  className="w-full border-solid border-2 order-border-gray rounded-lg p-1"
                  value={desmer.date}
                  onChange={((i) => handleDataDesmer(i.target.value))} />
              </label>
            </div>
          </div>
          <button
            type="button"
            className="bg-blue-button py-2 px-16 my-32 rounded-lg text-white float-right"
            onClick={(() => handleProx())}>Próximo</button>
        </form>
      </div>
    </div>
  )
}

FirstPart.PropTypes = {
  setSteps: PropTypes.func.isRequired,
}