import { useState } from "react";
import { getTutorByNumber } from "../services/tutores";
import Modal from "@mui/material/Modal";
import { Input, InputLabel } from "@mui/material";
import PropTypes from "prop-types";
import TutorValidado from "../Component/Agendamento/TutorValidado";
import TutorInvalido from "../Component/Agendamento/TutorInvalido";
import Box from "@mui/material/Box";
import iconFilter from "../images/filtro.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputMask from "react-input-mask";

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


  const phoneUnmask = (value) => {
    return value
      .replace(/\D/g, "")
      .replace(/^(\d{2})\((\d{2})\)(\d{4})-(\d{4})$/, "$1$2$3$4");
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [data, setData] = useState("");

  const handleConfirmButton = async () => {
    try {
      const response = await getTutorByNumber(phoneUnmask(telefone));
      setValidate(true);
      setData(response);
      if (
        response.phone &&
        (response.phone === phoneUnmask(telefone)) &
          console.log("Telefone encontrado")
      ) {
      }
      handleClose();
    } catch (error) {
      toast.error("Número não encontrado.");
    }
  };

  return (
    <div className="w-full font-Montserrat " id="main-agendamento">
      <ToastContainer />
      <Modal
        disableEscapeKeyDown
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h1 className="text-2xl font-bold">Conferir Telefone</h1>
          <div>
            <div className="flex flex-row items-end">
              <div className="w-full ">
                <InputLabel
                  sx={{
                    fontFamily: "Montserrat",
                  }}
                  className=" mt-6"
                >
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
                        "& .MuiInput-input": {
                          padding: 0,
                        },
                        "&:before": {
                          display: "none",
                        },
                        "&:after": {
                          display: "none",
                        },
                      }}
                      placeholder="(00) 00000-0000"
                      className="border border-[#848484] rounded-xl h-[46px] text-base w-full"
                      data-testid="input-modal-agendamento"
                    />
                  )}
                </InputMask>
              </div>
            </div>

            <div className="flex justify-between mt-20 gap-7">
              <button
                data-testid="button-modal-agendamento"
                onClick={() => {
                  setOpen(!open);
                }}
                className="bg-[#FFFEF9] hover:bg-[#144A36] hover:text-white text-[#144A36] border-[#B4B0A8] border-[1px] border-solid  font-bold rounded-[10px] h-[46px] w-[220px]"
              >
                Voltar
              </button>
              <button
                onClick={handleConfirmButton}
                className="bg-[#D5D0C7] hover:bg-[#144A36] text-white font-bold rounded-[10px] h-[46px] w-[220px]"
              >
                Continuar
              </button>
            </div>
          </div>
        </Box>
      </Modal>
      {validate ? <TutorValidado tel={data[0]} /> : <TutorInvalido />}
    </div>
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
