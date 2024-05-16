import { useContext, useState } from "react";
import "./consultPages.css";
import TextAreaComponent from "./TextAreaComponent";
import { ConsultContext } from "../../pages/NovaConsulta";
import PropTypes from "prop-types";
import axios, { all } from "axios";

export default function ThirdPart(props) {
  const { pagTh, setPagTh, allPagesData } = useContext(ConsultContext);
  const [sExamesCompl, setExComp] = useState(pagTh.sExamesCompl);
  const [sDiagnostico, setDiag] = useState(pagTh.sDiagnostico);
  const [sTratamento, setTrata] = useState(pagTh.sTratamento);
  const [sObs, setObs] = useState(pagTh.sObs);
  const [sResp, setResp] = useState(pagTh.sResp);

  const renderTextArea = [
    {
      id: "Exames Complementares",
      value: sExamesCompl,
      setSomething: setExComp,
    },
    { id: "Diagnóstico", value: sDiagnostico, setSomething: setDiag },
    { id: "Tratamento", value: sTratamento, setSomething: setTrata },
    { id: "Observações", value: sObs, setSomething: setObs },
  ];

  const PageThirdData = {
    sExamesCompl,
    sDiagnostico,
    sTratamento,
    sObs,
    sResp,
  };

  const handleFinish = () => {
    setPagTh(PageThirdData);

    const typeMucous = allPagesData.pagSec.checkboxValues.map((value) => {
      return value;
    });
    console.log(allPagesData);

    const replaceDate = (date) => {
      const dateSplit = date.replace(/-/g, "/");
      return dateSplit;
    };

    const allDataState = {
      stringDate: replaceDate(allPagesData.pagOne.data),
      nameAnimal: allPagesData.pagOne.paciente,
      species: allPagesData.pagOne.especie,
      nameTutor: allPagesData.pagOne.tutor,
      description: " ",
      animal_id: "",
      teacher_id: "",
      history: allPagesData.pagOne.historico,
      reason_consult: allPagesData.pagOne.motivo,
      vaccination: allPagesData.pagOne.vacina1.vacina1,
      date_vaccination: replaceDate(allPagesData.pagOne.vacina1.date),
      deworming: allPagesData.pagOne.desmer.desmer,
      date_deworming: replaceDate(allPagesData.pagOne.desmer.date),
      temperature: allPagesData.pagSec.temp,
      frequency_cardiac: allPagesData.pagSec.freqCard,
      frequency_respiratory: allPagesData.pagSec.resp,
      dehydration: allPagesData.pagSec.desidratacao,
      lymph_node: allPagesData.pagSec.linfonodos,
      type_mucous: typeMucous.toString(),
      whats_mucous: allPagesData.pagSec.mucosas,
      skin_annex: allPagesData.pagSec.pele,
      system_circulatory: allPagesData.pagSec.circ,
      system_respiratory: allPagesData.pagSec.sresp,
      system_digestive: allPagesData.pagSec.sdiges,
      system_locomotor: allPagesData.pagSec.sloc,
      system_nervous: allPagesData.pagSec.snervoso,
      system_genitourinary: allPagesData.pagSec.sgenit,
      others: allPagesData.pagSec.outros,
      complementary_exams: allPagesData.pagTh.sExamesCompl,
      diagnosis: allPagesData.pagTh.sDiagnostico,
      trataments: allPagesData.pagTh.sTratamento,
      observations: allPagesData.pagTh.sObs,
      responsible: allPagesData.pagTh.sResp,
    };
    console.log(allDataState);
    axios
      .post("http://localhost:3333/create/enchiridion", allDataState)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleAnt = () => {
    props.setSteps(2);
  };

  return (
    <div className="font-Montserrat p-28 w-full">
      <div className="font-bold">
        <h1 className="text-[30px]">Exames</h1>
      </div>
      <form className="text-[18px]">
        <div className="my-20">
          {renderTextArea.map((e) => {
            return (
              <TextAreaComponent
                key={e}
                value={e.value}
                id={e.id}
                setSomething={e.setSomething}
              />
            );
          })}
          <div className="my-8">
            <label className="grow mx-8 my-8">
              Responsável (Nome completo)
              <textarea
                rows="2"
                cols="25"
                className="w-full border-solid border-2 order-border-gray rounded-lg p-1 resize-none"
                value={sResp}
                onChange={(e) => setResp(e.target.value)}
              ></textarea>
            </label>
          </div>
        </div>
        <button
          type="button"
          className="bg-blue-button py-2 px-16 my-32 rounded-lg text-white float-left"
          onClick={() => handleAnt()}
        >
          Anterior
        </button>
        <button
          type="button"
          className="bg-blue-button py-2 px-16 my-32 rounded-lg text-white float-right"
          onClick={() => handleFinish()}
        >
          Finalizar
        </button>
      </form>
    </div>
  );
}

ThirdPart.propTypes = {
  setSteps: PropTypes.func.isRequired,
};
