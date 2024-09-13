import { useState, useContext } from "react";
import InputMask from "react-input-mask";
import { postTutor } from "../services/tutores";
import PropTypes from "prop-types";
import { PutTutor } from "../services/tutores";
import { UpdateEditContext } from "../contexts/updateEditContext";
import InputComponent from "../Component/nova consulta/InputComponent";

export default function Tutor(props) {
  const { selectedUser, setSelectedUser } = useContext(UpdateEditContext);
  const { openEdit, setOpenEdit } = useContext(UpdateEditContext);
  const { openNew, setOpenNew } = useContext(UpdateEditContext);
  const [nome, setNome] = useState(selectedUser ? selectedUser.name : "");
  const [cpf, setCpf] = useState(selectedUser ? selectedUser.cpf : "");
  const [phone, setPhone] = useState(selectedUser ? selectedUser.phone : "");
  const [email, setEmail] = useState(selectedUser ? selectedUser.email : "");
  const [showToast, setShowToast] = useState(false);
  const [id, setId] = useState(selectedUser ? selectedUser.id : "");
  const [required, setRequired] = useState({ nome: false, cpf: false, phone: false, email: false });
  const [query, setQuery] = useState("");

  const fullfillValidate = {
    nome,
    cpf,
    phone,
    email,
  }

  const validateTrue = (chaves) => {
    let obj = { ...required }
    const keys = Object.keys(obj)
    keys.forEach((e) => {
      if (e == chaves) {
        obj[e] = false;
      }
    })
    setRequired(obj)
  }
  //botao de Proximo validando lógica se o animal colocado existe
  const validateInputs = () => {
    const keys = Object.keys(fullfillValidate)
    const values = Object.values(fullfillValidate)
    let validation = false
    let obj = { ...required }
    values.map((e, index) => {
      if (e == '') {
        const chaves = keys[index]
        obj[chaves] = true;
        validation = true
      }
    })
    setRequired(obj)
    return validation
  }

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
      await postTutor(data)
      console.log("Tutor criado com sucesso");
      setShowToast(!showToast);
      setOpenNew(!openNew);
    } else {
      console.log(selectedUser);
      PutTutor(data);
      setOpenEdit(!openEdit);
      //window.location.reload();
    }
  }

  function ValidateInput() {
    return nome && cpf && phone && email;
  }

  return (
    <div className="cadastro-container w-full">
      {showToast && (
        <div className="animate-fadeIn opacity-0 absolute top-32 right-0 m-4">
          <div
            class="max-w-xs bg-white border border-gray-200 rounded-xl shadow-lg dark:bg-neutral-800 dark:border-neutral-700"
            role="alert"
            tabindex="-1"
            aria-labelledby="hs-toast-success-example-label"
          >
            <div class="flex p-4">
              <div class="shrink-0">
                <svg
                  class="shrink-0 size-4 text-teal-500 mt-0.5"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"></path>
                </svg>
              </div>
              <div class="ms-3">
                <p
                  id="hs-toast-success-example-label"
                  class="text-sm text-gray-700 dark:text-neutral-400"
                >
                  Tutor criado com sucesso
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      <h1 className="font-Montserrat p-14 h-10 text-2xl font-bold">
        Novo tutor
      </h1>

      <form>
        <div className="forms-container w-full px-28 grid grid-rows-4 md:grid-rows-2 gap-x-8 gap-y-4">
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
                  required.cpf ? "outline-red-600 border-red-500" : "border-gray"
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
            } font-Montserrat border-border-blue border-2 w-52 rounded-md h-10 mt-20 bg-border-blue text-white`}
          >
            {props.buttonName}
          </button>
        </div>
      </form>
    </div>
  );
}
