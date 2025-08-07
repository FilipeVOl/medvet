import { useContext, useState, useEffect } from "react";
import "./consultPages.css";
import TextAreaComponent from "./TextAreaComponent";
import { ConsultContext } from "../../pages/NovaConsulta";
import PropTypes from "prop-types";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Link, useNavigate } from "react-router-dom";
import { Snackbar, Alert } from "@mui/material";
import { Description as DescriptionIcon, AddCircle as AddCircleIcon } from "@mui/icons-material";
import Swal from "sweetalert2";
import FormExame from "../../components/FormExame/FormExame";
import FormInternacao from "../../components/FormInternacao/FormInternacao";
import FormConsulta from "../../components/FormConsulta/FormConsulta";

export default function ThirdPart(props) {
  const { pagTh, setPagTh, allPagesData } = useContext(ConsultContext);
  const [sExamesCompl, setExComp] = useState(pagTh.sExamesCompl);
  const [sDiagnostico, setDiag] = useState(pagTh.sDiagnostico);
  const [sTratamento, setTrata] = useState(pagTh.sTratamento);
  const [sObs, setObs] = useState(pagTh.sObs);
  const [openModal, setOpenModal] = useState(false);
  const [continueReceita, setContinueReceita] = useState(false);
  const [selectedForm, setSelectedForm] = useState(pagTh?.selectedForm || null);
  const [showForms, setShowForms] = useState(false);

  const navigate = useNavigate();

  const handleButtonClick = () => setOpenModal(!openModal);
  const handleContinueReceita = () => setContinueReceita(!continueReceita);
  
  const handleFormSelection = (formType) => {
    setSelectedForm(formType);
    setShowForms(false);
  };

  const toggleFormsSection = () => {
    setShowForms(!showForms);
  };
  const renderSelectedForm = () => {
    if (!selectedForm) return null;
    
    const animalData = {
      id: allPagesData?.pagOne?.idAnimal?.[0]?.id || 0,
      name: allPagesData?.pagOne?.paciente || 'Paciente',
      tutorName: allPagesData?.pagOne?.tutor || '',
      age: allPagesData?.pagOne?.idade || '',
      species: allPagesData?.pagOne?.especie || '',
      race: allPagesData?.pagOne?.raca || '',
      sex: allPagesData?.pagOne?.sexo || '',
      weight: allPagesData?.pagOne?.peso || '',
      reason: allPagesData?.pagOne?.motivo || '',
      // Additional data from localStorage that can be useful for forms
      tutorData: {
        address: localStorage.getItem('tutorAddress') || '',
        phone: localStorage.getItem('tutorPhone') || '',
        cpf: localStorage.getItem('tutorCpf') || ''
      }
    };
    
    switch(selectedForm) {
      case 'internacao':
        return <FormInternacao animalData={animalData} />;
      case 'exames':
        return <FormExame animalData={animalData} />;
      case 'consulta':
        return <FormConsulta animalData={animalData} />;
      default:
        return null;
    }
  };

 
  const PageThirdData = {
    sExamesCompl,
    sDiagnostico,
    sTratamento,
    sObs,
    selectedForm
  };

  // Save diagnostic and treatment data to localStorage
  useEffect(() => {
    if (sDiagnostico) localStorage.setItem('diagnostico', sDiagnostico);
    if (sTratamento) localStorage.setItem('tratamento', sTratamento);
    if (sObs) localStorage.setItem('observacoes', sObs);
    if (sExamesCompl) localStorage.setItem('examesComplementares', sExamesCompl);
  }, [sDiagnostico, sTratamento, sObs, sExamesCompl]);
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
    
    // Save the entire consultation data to localStorage for reference
    const tutorName = allPagesData?.pagOne?.tutor || '';
    localStorage.setItem('tutorName', tutorName);
    localStorage.setItem('animalName', allPagesData?.pagOne?.paciente || '');
    localStorage.setItem('consultDate', allPagesData?.pagOne?.data || '');

    const allDataState = {
      vaccination: allPagesData.pagOne.vacina,
      stringDate: replaceDateToBrl(allPagesData.pagOne.data),
      animal_id: allPagesData.pagOne.idAnimal[0].id,
      teacher_id: allPagesData.pagOne.teacher_id.id, // mudar para id do professor
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
        if (response) {
          // muiSnackAlert("success", "Consulta criada com sucesso");
          handleGoToDash();
        } else {
          muiSnackAlert("error", "Erro ao criar consulta");
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

  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [message, setMessage] = useState("");

  const muiSnackAlert = (severity, message) => {
    setSeverity(severity);
    setMessage(message);
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const handleGoToDash = () => {
    // Limpar dados da consulta do localStorage
    localStorage.removeItem('consultaPagOne');
    localStorage.removeItem('consultaPagSec');
    localStorage.removeItem('consultaPagTh');
    localStorage.removeItem('diagnostico');
    localStorage.removeItem('tratamento');
    localStorage.removeItem('observacoes');
    localStorage.removeItem('examesComplementares');
    
    // Outros dados específicos da consulta
    localStorage.removeItem('selectedForm');
    
    // Manter apenas dados do tutor que podem ser reutilizados em outras seções
    // localStorage.removeItem('tutorName');
    // localStorage.removeItem('tutorCpf');
    // localStorage.removeItem('tutorAddress');
    // localStorage.removeItem('tutorPhone');

    Swal.fire({
      title: "Consulta Criada",
      text: "Consulta criada com sucesso",
      icon: "success",
      confirmButtonText: "OK",
      confirmButtonColor: "#144A36",
    }).then(() => {
      navigate("/");
    });
  };

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={severity} sx={{ width: "100%" }} onClose={handleClose}>
          {message}
        </Alert>
      </Snackbar>
      <div className="font-Montserrat p-28 w-full">
        <div className="font-bold mb-8">
          <span className="text-xl md:text-2xl font-bold">Conclusão da Consulta</span>
        </div>
      

        <div className="mt-6 mb-6">          <button
            type="button"
            onClick={toggleFormsSection}
            className="bg-[#144A36] text-white py-2 px-4 rounded hover:bg-opacity-90 flex items-center"
          >
            <AddCircleIcon className="mr-2" fontSize="small" />
            Adicionar Solicitação
          </button>
          
          {showForms && (
            <div className="mt-4 bg-gray-100 p-4 rounded-lg">
              <h4 className="font-medium mb-3">Selecione o tipo de solicitação:</h4>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => handleFormSelection('exames')}
                  className={`py-2 px-4 rounded ${selectedForm === 'exames' ? 'bg-[#144A36] text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                >
                  Exames
                </button>
                <button
                  onClick={() => handleFormSelection('internacao')}
                  className={`py-2 px-4 rounded ${selectedForm === 'internacao' ? 'bg-[#144A36] text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                >
                  Internação
                </button>
                <button
                  onClick={() => handleFormSelection('consulta')}
                   className="bg-[#100F49] text-white rounded-lg py-2 px-6 hover:bg-opacity-90 flex items-center gap-2"
            >
              <DescriptionIcon fontSize="small" />
              Termo de Consulta
                </button>
              </div>
            </div>
          )}
          
          {selectedForm && (
            <div className="mt-4">
              {renderSelectedForm()}
            </div>          )}
        </div>
        
        <div className="flex justify-between mt-12">
          <button
            type="button"
            className="bg-[#144A36] py-2 px-16 rounded-lg text-white"
            onClick={() => {
              setPagTh(PageThirdData);
              props.setSteps(2);
            }}
          >
            Anterior
          </button>
          <div className="flex gap-3">            
            <button
              type="button"
              className="bg-[#D5D0C7] hover:bg-[#144A36] py-2 px-16 rounded-lg text-white"
              onClick={handleFinish}
            >
              Concluir
            </button>
          </div>
        </div>

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
                  onClick={() => {
                    handleButtonClick(), handleContinueReceita();
                  }}
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
                  <IconButton id="fechar-modal">Sim</IconButton>
                </Link>
                <IconButton
                  id="fechar-modal"
                  onClick={() => {
                    handleContinueReceita();
                  }}
                >
                  Não
                </IconButton>
              </div>
            </Typography>
          </Box>
        </Modal>
      </div>
    </>
  );
}

ThirdPart.propTypes = {
  setSteps: PropTypes.func.isRequired,
};
