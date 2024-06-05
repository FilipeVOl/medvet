import { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/userContext";
import { getTutorByNumber } from "../services/tutores";
import Modal from "@mui/material/Modal";
import { Input, InputLabel } from "@mui/material";
import PropTypes from "prop-types";
import TutorValidado from "../Component/Agendamento/TutorValidado";
import TutorInvalido from "../Component/Agendamento/TutorInvalido";
import Box from "@mui/material/Box";

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


  const { user, setUser } = useContext(UserContext);
  const [data, setData] = useState([1]);
  const [telefone, setTelefone] = useState("");
  const [open, setOpen] = useState(true);
  const [validate, setValidate] = useState(false);

  const phoneMask = (value) => {
    return value
      .replace(/\D/g, "")
      .replace(/^(\d{2})(9\d{4})/, "($1)$2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .replace(/(-\d{4})\d+?$/, "$1");
  };
  const phoneUnmask = (value) => {
    return value
      .replace(/\D/g, "")
      .replace(/^(\d{2})\((\d{2})\)(\d{4})-(\d{4})$/, "$1$2$3$4");
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    try {
      getTutorByNumber(telefone, setData);
    } catch(e) {
      console.log(e)
    }
  }, [telefone]);

  const handleConfirmButton = () => {
    try {
      getTutorByNumber(telefone, setData);
    } catch(e) {
      console.log(e)
    }
    handleClose();
    if (data.tutors[0].phone == phoneUnmask(telefone)) {
      setValidate(true);
    }
  };

  return (
    <div>
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
            <InputLabel className="ml-4 mt-6">
              Telefone
            </InputLabel>
            <Input
              onChange={(e) => {
                setTelefone(e.target.value);
                setUser({ ...user, phone: e.target.value });
              }}
              value={phoneMask(telefone)}
              className="border border-[#848484] rounded-[2px] h-[46px] p-2 text-base w-full"
            />
            <div className="flex justify-between mt-20">
              <button
                onClick={() => {
                  setOpen(!open);
                }}
                className="bg-white border border-[#848484] text-black font-bold rounded-[10px] h-[46px] w-[220px]"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmButton}
                className="bg-[#100F49] text-white font-bold rounded-[10px] h-[46px] w-[220px]"
              >
                Continuar
              </button>
            </div>
          </div>
        </Box>
      </Modal>
      {validate ? <TutorValidado tel={data.tutors[0]} /> : <TutorInvalido />}
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
