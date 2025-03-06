import { useState } from "react";
import { getTutorByNumber } from "../services/tutores";
import Modal from "@mui/material/Modal";
import { Input, InputLabel } from "@mui/material";
import PropTypes from "prop-types";
import TutorValidado from "../Component/Agendamento/TutorValidado";
import TutorInvalido from "../Component/Agendamento/TutorInvalido";
import Box from "@mui/material/Box";
import InputMask from "react-input-mask";
import { Snackbar, Alert } from "@mui/material";
import TutorSelector from "../Component/Agendamento/TutorSelector";

const Agendamento = () => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "auto",
    height: "50%",
    bgcolor: "background.paper",
    borderRadius: "10px",
    boxShadow: 24,
    p: 6,
  };

  const [telefone, setTelefone] = useState("");
  const [open, setOpen] = useState(true);
  const [validate, setValidate] = useState(false);
  const [data, setData] = useState("");
  const [selectedTutor, setSelectedTutor] = useState(null);
  const [openSelector, setOpenSelector] = useState(false);

  const phoneUnmask = (value) => {
    return value
      .replace(/\D/g, "")
      .replace(/^(\d{2})\((\d{2})\)(\d{4})-(\d{4})$/, "$1$2$3$4");
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSelectorClose = () => {
    setOpenSelector(false);
  };

  const handleConfirmButton = async () => {
    try {
      const response = await getTutorByNumber(phoneUnmask(telefone));

      if (!response?.tutors || response.tutors.length === 0) {
        setValidate(false);
        setData(null);
        setSelectedTutor({ phone: telefone }); 
        handleClose();
        return;
      }

      const tutors = response.tutors;

      if (tutors.length > 1) {
        setData(tutors);
        setValidate(false);
        setSelectedTutor(null);
      } else if (tutors.length === 1) {
        setValidate(true);
        setData(tutors);
        setSelectedTutor(tutors[0]);
        handleClose();
      }
    } catch (error) {
      setValidate(false);
      setData(null);
      setSelectedTutor({ phone: telefone }); 
      handleClose();
    }
  };

  const [openAlert, setOpenAlert] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [message, setMessage] = useState("");
  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };
  const muiSnackAlert = (severity, message) => {
    setSeverity(severity);
    setMessage(message);
    setOpenAlert(true);
  };

  return (
    <>
      <div className="w-full font-Montserrat" id="main-agendamento">
        <Snackbar
          open={openAlert}
          autoHideDuration={2000}
          onClose={handleCloseAlert}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            severity={severity}
            sx={{ width: "100%" }}
            onClose={handleCloseAlert}
          >
            {message}
          </Alert>
        </Snackbar>
        <Modal
          disableEscapeKeyDown
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              ...style,
              height: "auto",
              maxHeight: "90vh",
              width: Array.isArray(data) && data.length > 1 ? "600px" : "auto",
              overflow: "auto",
            }}
          >
            <h1 className="text-2xl font-bold mb-6">Conferir Telefone</h1>
            <div>
              <div className="flex flex-col space-y-6">
                <div className="w-full">
                  <InputLabel sx={{ fontFamily: "Montserrat" }}>
                    Telefone
                  </InputLabel>
                  <InputMask
                    mask="(99) 99999-9999"
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                    maskChar={null}
                  >
                    {() => (
                      <Input
                        sx={{
                          fontFamily: "Montserrat",
                          borderRadius: "0.75rem",
                          padding: "8px 12px",
                          width: "100%",
                          "& .MuiInput-input": { padding: 0 },
                          "&:before": { display: "none" },
                          "&:after": { display: "none" },
                        }}
                        placeholder="(00) 00000-0000"
                        className="border border-[#848484] rounded-xl h-[46px] text-base w-full"
                        data-testid="input-modal-agendamento"
                      />
                    )}
                  </InputMask>
                </div>

                {Array.isArray(data) && data.length > 1 && !validate && (
                  <div className="w-full">
                    <h1 className="text-xl font-bold mb-6 font-Montserrat">
                      Selecione o Tutor
                    </h1>
                    <TutorSelector
                      tutores={data}
                      selectedTutor={selectedTutor}
                      onTutorSelect={(tutor) => {
                        console.log("Selected tutor:", tutor);
                        if (tutor) {
                          setSelectedTutor(tutor);
                          setValidate(true);
                          handleClose();
                        }
                      }}
                    />
                  </div>
                )}

            
                <div className="flex justify-between gap-7 mt-4">
                  <button
                    data-testid="button-modal-agendamento"
                    onClick={() => setOpen(false)}
                    className="bg-[#FFFEF9] hover:bg-[#144A36] hover:text-white text-[#144A36] border-[#B4B0A8] border-[1px] border-solid font-bold rounded-[10px] h-[46px] w-[220px]"
                  >
                    Voltar
                  </button>
                  {(!Array.isArray(data) || data.length === 0) && (
                    <button
                      onClick={handleConfirmButton}
                      className="bg-[#D5D0C7] hover:bg-[#144A36] text-white font-bold rounded-[10px] h-[46px] w-[220px]"
                    >
                      Continuar
                    </button>
                  )}
                </div>
              </div>
            </div>
          </Box>
        </Modal>
        {validate ? (
          <TutorValidado tel={selectedTutor} />
        ) : (
          <TutorInvalido tel={{ phone: telefone }} />
        )}
      </div>
    </>
  );
};

Agendamento.propTypes = {
  label: PropTypes.string,
  onchange: PropTypes.func,
  type: PropTypes.string,
  value: PropTypes.string,
  width: PropTypes.number,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
    })
  ),
};

export default Agendamento;
