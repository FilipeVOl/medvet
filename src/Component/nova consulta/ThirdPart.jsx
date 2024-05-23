import { useContext, useState } from "react";
import "./consultPages.css";
import TextAreaComponent from "./TextAreaComponent";
import { ConsultContext } from "../../pages/NovaConsulta";
import PropTypes from "prop-types";
import axios from "axios";

export default function ThirdPart(props) {
  const { pagTh, setPagTh, allPagesData } = useContext(ConsultContext);
  const [sExamesCompl, setExComp] = useState(pagTh.sExamesCompl);
  const [sDiagnostico, setDiag] = useState(pagTh.sDiagnostico);
  const [sTratamento, setTrata] = useState(pagTh.sTratamento);
  const [sObs, setObs] = useState(pagTh.sObs);
  const [ative, setAtive] = useState(false);

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
  };

  const handleFinish = async () => {
    setPagTh(PageThirdData);
    const typeMucous = allPagesData.pagSec.checkboxValues.map((value) => {
      return value;
    });
    console.log(allPagesData);

    const replaceDateToBrl = (date) => {
      const dateSplit = date.replace(/-/g, "/");
      const dateBrl = new Date(dateSplit).toLocaleDateString("pt-BR");
      return dateBrl;
    };

    const allDataState = {
      stringDate: replaceDateToBrl(allPagesData.pagOne.data),
      //nameAnimal: allPagesData.pagOne.paciente,
      species: allPagesData.pagOne.especie,
      //nameTutor: allPagesData.pagOne.tutor,
      description: " ",
      animal_id: allPagesData.pagOne.idAnimal[0].id,
      teacher_id: "664b8a1208b0fd741bed4c50",
      history: allPagesData.pagOne.historico,
      reason_consult: allPagesData.pagOne.motivo,
      vaccination: allPagesData.pagOne.vacina,
      //vacina date - mudar lógica do back
      deworming: allPagesData.pagOne.desmer.name,
      date_deworming: replaceDateToBrl(allPagesData.pagOne.desmer.date),
      temperature: allPagesData.pagSec.temp.toString(),
      frequency_cardiac: allPagesData.pagSec.freqCard.toString(),
      frequency_respiratory: allPagesData.pagSec.resp.toString(),
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
      complementary_exams: sExamesCompl,
      diagnosis: sDiagnostico,
      trataments: sTratamento,
      observations: sObs,
      //tirar do back responsible
      responsible: allPagesData.pagOne.tutor,
    };
    //tirar axios daqui e passar para services
    await axios
      .post("http://localhost:3333/create/enchiridion", allDataState)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
      dispararNoti()
  };

  const handleAnt = () => {
    setPagTh(PageThirdData);
    props.setSteps(2);
  };
const dispararNoti = () => {
  setAtive(true)
  setTimeout(() => {
    setAtive(false)
  }, 3000); 
}
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
        {ative ? <p>Cadastrado realizado com Sucesso</p> : <></>}
      </form>
    </div>
  );
}

ThirdPart.propTypes = {
  setSteps: PropTypes.func.isRequired,
};
