import { useState, useContext } from "react";
import InputMask from "react-input-mask";
import { postTutor } from "../services/tutores";
import PropTypes from "prop-types";
import { PutTutor } from "../services/tutores";
import { UpdateEditContext } from "../contexts/updateEditContext";
import InputComponent from "../Component/nova consulta/InputComponent";
import { Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Tutor(props) {
  const navigate = useNavigate();
  const { selectedUser, setSelectedUser } = useContext(UpdateEditContext);
  const { openEdit, setOpenEdit } = useContext(UpdateEditContext);
  const { openNew, setOpenNew } = useContext(UpdateEditContext);
  const [nome, setNome] = useState(selectedUser ? selectedUser.name : "");
  const [cpf, setCpf] = useState(selectedUser ? selectedUser.cpf : "");
  const [phone, setPhone] = useState(selectedUser ? selectedUser.phone : "");
  const [email, setEmail] = useState(selectedUser ? selectedUser.email : "");
  const [id, setId] = useState(selectedUser ? selectedUser.id : "");
  const [required, setRequired] = useState({
    nome: false,
    cpf: false,
    phone: false,
    email: false,
  });
  const [query, setQuery] = useState("");

  const fullfillValidate = {
    nome,
    cpf,
    phone,
    email,
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
    Tutor.propTypes = {
      buttonName: PropTypes.string,
    };
  }

  const cpfSemPonto = cpf.replace(/[.-]/g, "");
  const phoneSemMask = phone.replace(/[()-]/g, "");
  const data = {
    email,
    cpf: cpfSemPonto,
    password: cpfSemPonto,
    phone: phoneSemMask,
    name: nome,
    id: id,
    adress: "",
  };

  const clickError = async () => {
    if (!selectedUser) {
      try {
        await postTutor(data);
        muiSnackAlert("success", "Tutor criado com sucesso");
        setTimeout(() => {
          navigate('/');
        }, 1000);
      } catch (error) {
        muiSnackAlert("error", "Erro ao criar tutor");
      }
    } else {
      try {
        await PutTutor(data);
        setOpenEdit(!openEdit);
        muiSnackAlert("success", "Tutor atualizado com sucesso");
        setTimeout(() => {
          navigate('/');
        }, 1000);
      } catch (error) {
        muiSnackAlert("error", "Erro ao atualizar tutor");
      }
    }
  };

  function ValidateInput() {
    return nome && cpf && phone && email;
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
      <div className="cadastro-container w-full">
        <h1 className="font-Montserrat p-14 h-10 text-2xl font-bold">
          Novo tutor
        </h1>

        <form>
          <div className="forms-container w-full px-12 grid grid-rows-4 md:grid-rows-2 gap-x-8 gap-y-4">
            <div className="box-1 grid grid-cols-[2fr_1fr] gap-[5%]">
              <InputComponent
                nome="Nome completo"
                dataType="text"
                type={nome}
                setDataCom={setNome}
                requireVal={required.nome}
                handleButton={validateTrue}
                descrHandle="nome"
              />

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
            </div>

            <div className="box-2 grid grid-cols-[1fr_2fr] gap-[5%]">
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
          </div>

          <div className="button-container flex justify-end px-28 h-auto">
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
              } font-Montserrat border-2 w-52 rounded-md h-10 mt-20 bg-[#D5D0C7] hover:bg-border-blue text-white`}
            >
              {props.buttonName}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
