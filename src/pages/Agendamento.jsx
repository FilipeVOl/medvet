import { useState, useEffect, useContext } from "react";
import TelaConsulta from "../Component/TelaConsulta";
import { UserContext } from "../contexts/userContext";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Input, InputLabel } from "@mui/material";
import { style } from "../Component/Calendar/calendar_utils";

const Agendamento = () => {
  const [open, setOpen] = useState(false);
  const [telefone, setTelefone] = useState("");
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    setOpen(true);
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
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
            <InputLabel className="ml-4" htmlFor="">
              Telefone
            </InputLabel>
            <Input
              onChange={(e) => {
                setTelefone(e.target.value);
                setUser({ ...user, phone: e.target.value });
              }}
              className="border border-[#848484] rounded-[2px] h-[46px] p-2 text-base w-full"
            />
            <div className="flex justify-between">
              <button
                onClick={() => {
                  setOpen(!open);
                }}
                className="bg-white border border-[#848484] text-black font-bold rounded-[10px] h-[46px] w-[220px] mt-8"
              >
                Cancelar
              </button>
              <button className="bg-[#100F49] text-white font-bold rounded-[10px] h-[46px] w-[220px] mt-8">
                Continuar
              </button>
            </div>
          </div>
        </Box>
      </Modal>
      <TelaConsulta />
    </>
  );
};

export default Agendamento;
