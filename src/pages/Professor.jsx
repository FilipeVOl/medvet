import React, { useState, useContext } from "react";
import InputMask from "react-input-mask";
import axios from "axios";
import PropTypes from "prop-types";
import { UpdateEditContext } from "../contexts/updateEditContext";
import { postProf, PutProf } from "../services/professores";
import InputComponent from "../Component/nova consulta/InputComponent";
import { Snackbar, Alert } from "@mui/material";

export default function Professor(props) {
  const { selectedUser, setSelectedUser } = useContext(UpdateEditContext);
  const { openEdit, setOpenEdit } = useContext(UpdateEditContext);
  const { openNew, setOpenNew } = useContext(UpdateEditContext);
  const [nome, setNome] = useState(selectedUser ? selectedUser.name : "");
  const [registration, setRegistration] = useState(
    selectedUser ? selectedUser.registration : ""
  );
  const [cpf, setCpf] = useState(selectedUser ? selectedUser.cpf : "");
  const [phone, setPhone] = useState(selectedUser ? selectedUser.phone : "");
  const [email, setEmail] = useState(selectedUser ? selectedUser.email : "");
  const [course, setCourse] = useState("Medicina Veterinária");
  const [shift, setShift] = useState(selectedUser ? selectedUser.shift : "");
  const [id, setId] = useState(selectedUser ? selectedUser.id : "");
  const [required, setRequired] = useState({
    nome: false,
    registration: false,
    cpf: false,
    phone: false,
    email: false,
    shift: false,
  });

  const fullfillValidate = {
    nome,
    registration,
    cpf,
    phone,
    email,
    shift,
  };

  const validateTrue = (chaves) => {
    let obj = { ...required };
    const keys = Object.keys(obj);
    keys.forEach((e) => {
      if (e == chaves) {
        obj[e] = false;
      }
    });
    setRequired(obj);
  };
  //botao de Proximo validando lógica se o animal colocado existe
  const validateInputs = () => {
    const keys = Object.keys(fullfillValidate);
    const values = Object.values(fullfillValidate);
    let validation = false;
    let obj = { ...required };
    values.map((e, index) => {
      if (e == "") {
        const chaves = keys[index];
        obj[chaves] = true;
        validation = true;
      }
    });
    setRequired(obj);
    return validation;
  };

  {
    Professor.propTypes = {
      buttonName: PropTypes.string,
    };
  }

  const cpfSemPonto = cpf.replace(/[.-]/g, "");
  const data = {
    name: nome,
    registration,
    cpf: cpfSemPonto,
    course,
    phone,
    email,
    password: cpfSemPonto,
    shift,
    id: id,
  };

  const clickError = async () => {
    if (!selectedUser) {
      await postProf(data);
      setOpenNew(!openNew);
      muiSnackAlert("success", "Professor cadastrado com sucesso!");
      window.location.reload();
    } else {
      PutProf(data);
      setOpenEdit(!openEdit);
      window.location.reload();
    }
  };

  function ValidateInput() {
    return nome && registration && cpf && phone && email && course;
  }

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

      <div className="cadastro-container w-full ">
        <h1 className="font-Montserrat p-14 h-10 font-bold text-2xl">
          Novo Professor
        </h1>
        <form>
          <div className="forms-container font-Montserrat px-14 h-auto grid grid-rows-4 md:grid-rows-4 gap-x-8 gap-y-4">
            <div className="box-1 grid grid-cols-[2fr_1fr] gap-[5%]">
              <InputComponent
                nome="Nome"
                dataType="text"
                type={nome}
                setDataCom={setNome}
                requireVal={required.nome}
                handleButton={validateTrue}
                descrHandle="nome"
              />

                <InputComponent
                  nome="CRMV"
                  dataType="text"
                  type={registration}
                  setDataCom={setRegistration}
                  requireVal={required.registration}
                  handleButton={validateTrue}
                  descrHandle="registration"
                />
            </div>

            <div className="box-2 grid grid-cols-[1fr_2fr] gap-[5%]">
              <label htmlFor="cpf" className="font-Montserrat">
                CPF *<br />
                <InputMask
                  id="cpf"
                  required
                  value={cpf}
                  name="cpf"
                  mask="999.999.999-99"
                  onChange={(e) => {
                    setCpf(e.target.value);
                  }}
                  className={`${
                    required.cpf
                      ? "outline-red-600 border-red-500"
                      : "border-gray"
                  } border-2 border-solid w-full rounded-md h-11 pl-2`}
                />
              </label>

              <InputComponent
                nome="Email"
                dataType="email"
                type={email}
                setDataCom={setEmail}
                requireVal={required.email}
                handleButton={validateTrue}
                descrHandle="email"
              />
            </div>

            <div className="box-3 grid grid-cols-[1fr_2fr] gap-[5%]">
              <label htmlFor="phone" className="font-Montserrat">
                Contato *<br />
                <InputMask
                  mask="(99)99999-9999"
                  required
                  value={phone}
                  name="phone"
                  id="phone"
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                  className={`${
                    required.phone
                      ? "outline-red-600 border-red-500"
                      : "border-gray"
                  } border-2 border-solid w-full rounded-md h-11 pl-2`}
                />
              </label>
              <label htmlFor="course" className="font-Montserrat">
                Curso *<br />
                <input
                  type="text"
                  required
                  value={course}
                  disabled
                  name="course"
                  id="course"
                  onChange={(e) => {
                    setCourse(e.target.value);
                  }}
                  className="border-2 border-solid w-full rounded-md h-11 pl-2"
                />
              </label>
            </div>
          </div>
          <div className="button-container flex justify-end px-28 h-[28rem]">
            <button
              id="cadastrar"
              name={props.buttonName}
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                clickError();
              }}
              className={`${
                !ValidateInput() ? "cursor-not-allowed opacity-25 disabled" : ""
              } font-Montserrat hover:bg-border-blue border-2 w-52 rounded-md h-10 mt-10 bg-[#D5D0C7] text-white`}
            >
              {props.buttonName}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
