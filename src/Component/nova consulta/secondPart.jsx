import { useState } from "react"
import InputComponent from "./InputComponent"
import "./consultPages.css"
import textAreaComponent from "./textAreaComponent"

export default function SecondPart() {
  const [temp, setTemp] = useState(0)
  const [freqCard, setFreq] = useState(0)
  const [resp, setResp] = useState(0)
  const [desidratacao, setDesidratacao] = useState('')
  const [linfonodos, setLinfonodos] = useState('')
  const [pele, setPele] = useState('')
  const renderTextArea = [
    {id: 'pele', value: pele, set: setPele },
  ]
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
          <label className="flex" htmlFor="">
            <div className="flex justify-start w-full">
              <input type='checkbox' className={'w-3/4 border-solid border-2 border-gray rounded-lg h-10 p-1'} />
              <div className="flex items-center">
                Pálidas
              </div>
            </div>
            <span className="flex w-full">
              <input type='checkbox' className={'w-full border-solid border-2 border-gray rounded-lg h-10 p-1'} />
              <span className="flex items-center">
                Pálidas
              </span>
            </span>
            <span className="flex w-full">
              <input type='checkbox' className={'w-full border-solid border-2 border-gray rounded-lg h-10 p-1'} />
              <span className="flex items-center">
                Pálidas
              </span>
            </span>
            <span className="flex w-full">
              <input type='checkbox' className={'w-full border-solid border-2 border-gray rounded-lg h-10 p-1'} />
              <span className="flex items-center">
                Pálidas
              </span>
            </span>
            <span className="flex w-full">
              <input type='checkbox' className={'w-full border-solid border-2 border-gray rounded-lg h-10 p-1'} />
              <span className="flex items-center">
                Pálidas
              </span>
            </span>
          </label>
        </div>
        <div>
          <div className="font-bold my-12">
            <h1 className="text-[30px]">Avaliação dos Sistemas</h1>
          </div>
          {renderTextArea.map((e) => {
            return (
              <textAreaComponent key={e} value={e.value} setState={e.set}/>
            )
          })}
        </div>
      </form>
    </div>
  )
}