import { useContext, useState } from "react"
import "./consultPages.css"
import TextAreaComponent from "./TextAreaComponent"
import { ConsultContext } from "../../pages/NovaConsulta";
import PropTypes from "prop-types";

export default function ThirdPart(props) {
  const { pagTh, setPagTh } = useContext(ConsultContext);
  const [sExamesCompl, setExComp] = useState(pagTh.sExamesCompl);
  const [sDiagnostico, setDiag] =useState(pagTh.sDiagnostico);
  const [sTratamento, setTrata] = useState(pagTh.sTratamento);
  const [sObs, setObs] = useState(pagTh.sObs);
  const [sResp, setResp] = useState(pagTh.sResp);

  const renderTextArea = [
    { id: 'Exames Complementares', value: sExamesCompl, setSomething: setExComp },
    { id: 'Diagnóstico', value: sDiagnostico, setSomething: setDiag },
    { id: 'Tratamento', value: sTratamento, setSomething: setTrata },
    { id: 'Observações', value: sObs, setSomething: setObs },
  ]

  const sendStateThird = {
    sExamesCompl,
    sDiagnostico,
    sTratamento,
    sObs,
    sResp,
  }

  const handleFinish = (() => {
    //axios
  })

  const handleAnt = (() => {
    setPagTh(sendStateThird)
    props.setSteps(2)
  })

  return (
    <div className="font-Montserrat p-28 w-full">
      <div className="font-bold">
        <h1 className="text-[30px]">Exames</h1>
      </div>
      <form className="text-[18px]">
          <div className="my-20">
            {renderTextArea.map((e) => {
              return (
                <TextAreaComponent key={e} value={e.value} id={e.id} setSomething={e.setSomething} />
              )
            })}
            <div className="my-8">
      <label className="grow mx-8 my-8">
      Responsável (Nome completo)
        <textarea
          rows="2" cols="25" className="w-full border-solid border-2 order-border-gray rounded-lg p-1 resize-none"
          value={sResp}
          onChange={((e) => setResp(e.target.value))}></textarea>
      </label>
    </div>
          </div>
        <button
            type="button"
            className="bg-blue-button py-2 px-16 my-32 rounded-lg text-white float-left"
            onClick={(() => handleAnt())}>Anterior</button>
        <button
            type="button"
            className="bg-blue-button py-2 px-16 my-32 rounded-lg text-white float-right"
            onClick={(() => handleFinish())}>Finalizar</button>
      </form>
    </div>
  )
}

ThirdPart.propTypes = {
  setSteps: PropTypes.func.isRequired,
}