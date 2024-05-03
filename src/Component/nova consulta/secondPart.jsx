import { useContext, useState } from "react"
import InputComponent from "./InputComponent"
import "./consultPages.css"
import TextAreaComponent from "./TextAreaComponent"
import { ConsultContext } from "../../pages/NovaConsulta";
import PropTypes from "prop-types";

export default function SecondPart(props) {
  const { pagSec, setPagSec } = useContext(ConsultContext);
  const [temp, setTemp] = useState(pagSec.temp);
  const [freqCard, setFreq] = useState(pagSec.freqCard);
  const [resp, setResp] = useState(pagSec.resp);
  const [desidratacao, setDesidratacao] = useState(pagSec.desidratacao);
  const [linfonodos, setLinfonodos] = useState(pagSec.linfonodos);
  const [pele, setPele] = useState(pagSec.pele);
  const [circ, setCirc] = useState(pagSec.circ);
  const [sresp, setSresp] = useState(pagSec.sresp);
  const [sdiges, setSdiges] =useState(pagSec.sdiges);
  const [sloc, setSloc] = useState(pagSec.sloc);
  const [snervoso, setSnervoso] = useState(pagSec.snervoso);
  const [sgenit, setSgenit] = useState(pagSec.sgenit);
  const [outros, setOutros] = useState(pagSec.outros);
  const [mucosas, setMucosas] = useState(pagSec.mucosas)
  const [checkBox, setCheckBox] = useState({ 
    check1: pagSec.checkBox.check1, 
    check2: pagSec.checkBox.check2, 
    check3: pagSec.checkBox.check3, 
    check4: pagSec.checkBox.check4, 
    check5: pagSec.checkBox.check5
  });

  const renderTextArea = [
    { id: 'Pele e anexos', value: pele, setSomething: setPele },
    { id: 'Sist. Circulatório', value: circ, setSomething: setCirc },
    { id: 'Sist. Respiratório', value: sresp, setSomething: setSresp },
    { id: 'Sist. Digestivo', value: sdiges, setSomething: setSdiges },
    { id: 'Sist. Locomotor', value: sloc, setSomething: setSloc },
    { id: 'Sist. Nervoso', value: snervoso, setSomething: setSnervoso },
    { id: 'Sist. Genitourinário', value: sgenit, setSomething: setSgenit },
    { id: 'Outros', value: outros, setSomething: setOutros },
  ]

  const sendStateSec = {
    temp,
    freqCard,
    resp,
    desidratacao,
    linfonodos,
    pele,
    circ,
    sresp,
    sdiges,
    sloc,
    snervoso,
    sgenit,
    outros,
    checkBox,
    mucosas
  }

  const handleProx = (() => {
    setPagSec(sendStateSec)
    props.setSteps(3)
  })

  const handleAnt = (() => {
    setPagSec(sendStateSec)
    props.setSteps(1)
  })

  const handleCheckBox = ((e, inputCheck) => {
    let obj = { ...checkBox }
    obj[inputCheck] = e
    setCheckBox(obj);
  });

  return (
    <div className="font-Montserrat p-28 w-full">
      <div className="font-bold">
        <h1 className="text-[30px]">Exame Físico</h1>
      </div>
      <form className="text-[18px] py-16">
        <div className="flex gap-8 w-full">
          <InputComponent nome="Temperatura" dataType="number" type={temp} setDataCom={setTemp} place={'ºC'} id="temp" />
          <InputComponent nome="Freq. cardíaca" dataType="number" type={freqCard} setDataCom={setFreq} place={'bpm'} id="temp" />
          <InputComponent nome="Freq. respiratória" dataType="number" type={resp} setDataCom={setResp} place={'mpm'} id="temp" />
        </div>
        <div className="flex gap-8 my-4">
          <InputComponent nome="Grau de desidratacação estimado" dataType="text" type={desidratacao} setDataCom={setDesidratacao} place={'%'} id="temp" />
          <InputComponent nome="Linfonodos reativos" dataType="text" type={linfonodos} setDataCom={setLinfonodos} />
        </div>
        <div className="font-bold my-12">
          <h1 className="text-[30px]">Mucosas</h1>
        </div>
        <div>
          <label className="w-full grid grid-cols-[repeat(5,1fr)]" htmlFor="">
            <label htmlFor="" className="flex w-full items-center justify-center">
              <input 
              type='checkbox' 
              className={'w-1/5 border-solid border-2 border-gray rounded-lg h-12 p-1'}
              checked={checkBox.check1}
              onChange={((e) => handleCheckBox(e.target.checked, 'check1'))}
              />
              <p className="ml-4">Normocoradas</p>
            </label>
            <label htmlFor="" className="flex w-full  items-center pr-4 justify-center">
              <input 
              type='checkbox' 
              className={'w-1/5 border-solid border-2 border-gray rounded-lg h-12 p-1'}
              checked={checkBox.check2}
              onChange={((e) => handleCheckBox(e.target.checked, 'check2'))}
              />
              <p className="ml-4">Pálidas</p>
            </label>
            <label htmlFor="" className="flex w-full items-center pr-4 justify-center">
              <input
              type='checkbox'
              className={'w-1/5 border-solid border-2 border-gray rounded-lg h-12 p-1'}
              checked={checkBox.check3}
              onChange={((e) => handleCheckBox(e.target.checked, 'check3'))}
              />
              <p className="ml-4">Congestas</p>
            </label>
            <label htmlFor="" className="flex w-full items-center pr-4 justify-center">
              <input
              type='checkbox'
              className={'w-1/5 border-solid border-2 border-gray rounded-lg h-12 p-1'}
              checked={checkBox.check4}
              onChange={((e) => handleCheckBox(e.target.checked, 'check4'))}
              />
              <p className="ml-4">Cianóticas</p>
            </label>
            <label htmlFor="" className="flex w-full items-center justify-center">
              <input
              type='checkbox'
              className={'w-1/5 border-solid border-2 border-gray rounded-lg h-12 p-1'}
              checked={checkBox.check5}
              onChange={((e) => handleCheckBox(e.target.checked, 'check5'))}
              />
              <p className="ml-4">Icterícias</p>
            </label>
          </label>
          <div className="w-full my-16">
            <label className="grow m-12">Qual
              <input
                type="text"
                id="mucosas"
                className="w-full border-solid border-2 order-border-gray rounded-lg p-1"
                value={mucosas}
                onChange={(({ target }) => setMucosas(target.value))}
              />
            </label>
          </div>
        </div>
        <div>
          <div className="font-bold my-12">
            <h1 className="text-[30px]">Avaliação dos Sistemas</h1>
          </div>
          <div className="my-20">
            {renderTextArea.map((e) => {
              return (
                <TextAreaComponent key={e} value={e.value} id={e.id} setSomething={e.setSomething} />
              )
            })}
          </div>
        </div>
        <button
            type="button"
            className="bg-blue-button py-2 px-16 my-32 rounded-lg text-white float-left"
            onClick={(() => handleAnt())}>Anterior</button>
        <button
            type="button"
            className="bg-blue-button py-2 px-16 my-32 rounded-lg text-white float-right"
            onClick={(() => handleProx())}>Próximo</button>
      </form>
    </div>
  )
}

SecondPart.propTypes = {
  setSteps: PropTypes.func.isRequired,
}