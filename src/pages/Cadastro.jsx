import { useState, useContext } from "react";
import InputMask from "react-input-mask";
import { postAluno } from "../utils/MostrarAluno.utils";
import PropTypes from "prop-types";
import { PutAluno } from "../services/alunos";
import { UpdateEditContext } from "../contexts/updateEditContext";


export default function Cadastro(props) {
  const {selectedUser, setSelectedUser} = useContext(UpdateEditContext);
  const {openEdit, setOpenEdit} = useContext(UpdateEditContext);
  const {openNew, setOpenNew} = useContext(UpdateEditContext);
  const [nome, setNome] = useState(selectedUser ? selectedUser.name : "");
  const [registration, setRegistration] = useState(selectedUser ? selectedUser.registration : "");
  const [cpf, setCpf] = useState(selectedUser ? selectedUser.cpf : "");
  const [phone, setPhone] = useState(selectedUser ? selectedUser.phone : "");
  const [email, setEmail] = useState(selectedUser ? selectedUser.email : ""  );
  const [course, setCourse] = useState("Medicina Veterinária");
  const [showToast, setShowToast] = useState(false);
  const [shift, setShift] = useState(selectedUser ? selectedUser.shift : "");
  const [period, setPeriod] = useState(selectedUser ? selectedUser.period : "" );
  const [id, setId] = useState(selectedUser ? selectedUser.id : ""); 
  
  {
    Cadastro.propTypes = {
      buttonName: PropTypes.string,
    };
  }

  const cpfSemPonto = cpf.replace(/[.-]/g, "");
  const data = {
    email,
    cpf: cpfSemPonto,
    password: cpfSemPonto,
    registration,
    course,
    shift,
    period,
    phone,
    name: nome,
    id: id
  };

  const clickError = async () => {
    if (!selectedUser) {
      try {
      await postAluno(data)
      console.log("Aluno criado com sucesso");
      setShowToast(!showToast);
      setOpenNew(!openNew);
      } catch (error) {
        console.log("Erro ao criar aluno");
      }
    } else {
      console.log(selectedUser);
      PutAluno(data);
      setOpenEdit(!openEdit);
      //window.location.reload();
    }
  }

  function ValidateInput() {
    return nome && registration && cpf && phone;
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
        Novo aluno
      </h1>

      <form>
        <div className="forms-container px-28 grid grid-rows-4 md:grid-rows-4 gap-x-8 gap-y-4">
          <div className="box-1 grid grid-cols-[2fr_1fr] gap-[5%]">
            <label htmlFor="nome" className="font-Montserrat">
              Nome completo *<br />
              <input
                id="name"
                value={nome}
                required
                onChange={(e) => {
                  setNome(e.target.value);
                }}
                name="name"
                type="text"
                className={`w-full border-[1px] ${
                  !nome
                    ? "border-red-600 outline-red-600"
                    : "border-border-gray"
                } rounded-md h-9 pl-2`}
              />
            </label>
            <label htmlFor="registration" className="font-Montserrat">
              Matricula *<br />
              <input
                id="registration"
                required
                value={registration}
                name="registration"
                type="text"
                onChange={(e) => {
                  // setUserData(
                  //   ...userData,
                  //   (userData.registration = e.target.value)
                  // );
                  setRegistration(e.target.value);
                }}
                className={`border-[1px] w-full rounded-md h-9 pl-2 ${
                  !registration
                    ? "outline-red-600 border-red-500"
                    : "border-border-gray"
                }`}
              />
            </label>
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
                  !cpf ? "outline-red-600 border-red-500" : "border-border-gray"
                } border-[1px] w-full rounded-md h-9 pl-2`}
              />
            </label>

            <label htmlFor="email" className="font-Montserrat">
              Email *<br />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                id="email"
                name="email"
                className={`${
                  !email
                    ? "outline-red-600 border-red-500"
                    : "border-border-gray"
                } w-full border-[1px] rounded-md h-9 pl-2`}
              />
            </label>
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
                  !phone
                    ? "outline-red-600 border-red-500"
                    : "border-border-gray"
                } border-[1px] w-full rounded-md h-9`}
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
                className="w-full border-[1px] rounded-md h-9 pl-2"
              />
            </label>
          </div>

          <div className="box-4 grid grid-cols-[1fr_2fr] gap-[2%] md:gap-[5%]">
            <label htmlFor="period" className="font-Montserrat">
              Período
              <br />
              <input
                type="number"
                required
                name="period"
                value={period}
                id="period"
                onChange={(e) => {
                  setPeriod(e.target.value);
                }}
                className={`${
                  !period
                    ? "outline-red-600 border-red-500"
                    : "border-border-gray"
                } border-[1px] rounded-md h-9 pl-2 max-w-63`}
                maxLength={2}
              />
            </label>

            <label htmlFor="shift" className="font-Montserrat">
              Turno
              <br />
              <input
                type="text"
                required
                value={shift}
                id="shift"
                name="shift"
                onChange={(e) => {
                  setShift(e.target.value);
                }}
                className={`${
                  !shift
                    ? "outline-red-600 border-red-500"
                    : "border-border-gray"
                } border-[1px] rounded-md h-9 pl-2 max-w-63`}
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
            } font-Montserrat border-border-blue border-2 w-52 rounded-md h-10 mt-20 bg-border-blue text-white`}
          >
            {props.buttonName}
          </button>
        </div>
      </form>
    </div>
  );
}
