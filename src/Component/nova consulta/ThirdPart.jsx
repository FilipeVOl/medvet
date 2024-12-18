import { useContext, useState } from "react";
import "./consultPages.css";
import TextAreaComponent from "./TextAreaComponent";
import { ConsultContext } from "../../pages/NovaConsulta";
import PropTypes from "prop-types";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

export default function ThirdPart(props) {
  const { pagTh, setPagTh, allPagesData } = useContext(ConsultContext);
  const [sExamesCompl, setExComp] = useState(pagTh.sExamesCompl);
  const [sDiagnostico, setDiag] = useState(pagTh.sDiagnostico);
  const [sTratamento, setTrata] = useState(pagTh.sTratamento);
  const [sObs, setObs] = useState(pagTh.sObs);
  const [openModal, setOpenModal] = useState(!open);
  const [continueReceita, setContinueReceita] = useState(false);

  const handleButtonClick = () => setOpenModal(!openModal);
  const handleContinueReceita = () => setContinueReceita(!continueReceita);

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
    const replaceDateToBrl = (date) => {
      const dateSplit = date.replace(/-/g, "/");
      const dateBrl = new Date(dateSplit).toLocaleDateString("pt-BR");
      return dateBrl;
    };

    const allDataState = {
      vaccination: allPagesData.pagOne.vacina,
      stringDate: replaceDateToBrl(allPagesData.pagOne.data),
      animal_id: allPagesData.pagOne.idAnimal[0].id,
      teacher_id: allPagesData.pagOne.teacher_id.id,
      weight: parseInt(allPagesData.pagOne.peso),
      history: allPagesData.pagOne.historico,
      reason_consult: allPagesData.pagOne.motivo,
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
    };
    
    //tirar axios daqui e passar para services
    await axios
      .post("http://localhost:3333/create/enchiridion", allDataState)
      .then((response) => {
        console.log(response);
        if (response) {
          handleButtonClick()
          } else {
            toast.error("Erro ao criar consulta")
          }
      })
      .catch((error) => {
        console.error(error);
      });
      
  };

  const handleAnt = () => {
    setPagTh(PageThirdData);
    props.setSteps(2);
  };

  return (
    <div className="font-Montserrat w-full p-28">
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
          className="bg-[#144A36] py-2 px-16 my-32 rounded-lg text-white float-left"
          onClick={() => handleAnt()}
        >
          Anterior
        </button>
        <button
          type="button"
          className="bg-[#D5D0C7] hover:bg-[#144A36] py-2 px-16 my-32 rounded-lg text-white float-right"
          onClick={() => handleFinish()}
        >
          Finalizar
        </button>
      </form>
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
              Consulta Criada
              <p id="descri-modal">Consulta Criada com Sucesso</p>
              <div className="flex justify-between my-12">
                <IconButton
                  id="fechar-modal"
                onClick={() => {handleButtonClick(), handleContinueReceita()}}
                >
                  OK
                </IconButton>
              </div>
            </Typography>
          </Box>
        </Modal>

        <Modal
          open={continueReceita}
          aria-labelledby="modal-modal-deletetitle"
          aria-describedby="modal-modal-description2"
          >
            <Box id="box-modal-pag1">
              <Typography
                id="modal-modal-deletetitle"
                variant="h6"
                component="h1"
              >
                Deseja Continuar para Receita?
                <div className="flex justify-between my-12">
                  <Link to="/receita" smooth={true} duration={1000}>
                  <IconButton
                    id="fechar-modal"
                  >
                    Sim
                  </IconButton>
                  </Link>
                  <IconButton
                    id="fechar-modal"
                  onClick={() => {handleContinueReceita()}}
                  >
                    Não
                  </IconButton>
                </div>
              </Typography>
              </Box>
          </Modal>
    </div>
  );
}

ThirdPart.propTypes = {
  setSteps: PropTypes.func.isRequired,
};
