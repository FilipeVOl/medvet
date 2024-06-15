import React, { useState, useContext } from "react";
import InputMask from "react-input-mask";
import axios from "axios";
import PropTypes from "prop-types";
import { UpdateEditContext } from "../contexts/updateEditContext";
import { postProf, PutProf } from "../services/professores";

export default function Professor(props) {
  const {selectedUser, setSelectedUser} = useContext(UpdateEditContext);
  const {openEdit, setOpenEdit} = useContext(UpdateEditContext);
  const {openNew, setOpenNew} = useContext(UpdateEditContext);
  const [nome, setNome] = useState(selectedUser ? selectedUser.name : "");
  const [registration, setRegistration] = useState(selectedUser ? selectedUser.registration : "");
  const [cpf, setCpf] = useState(selectedUser ? selectedUser.cpf : "");
  const [phone, setPhone] = useState(selectedUser ? selectedUser.phone : "");
  const [email, setEmail] = useState(selectedUser ? selectedUser.email : ""  );
  const [course, setCourse] = useState("Medicina Veterinária");
  const [shift, setShift] = useState(selectedUser ? selectedUser.shift : "");
  const [id, setId] = useState(selectedUser ? selectedUser.id : "");

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

  function clickError() {
    if (selectedUser == null) {
      postProf(data);
      setOpenNew(!openNew);
      window.location.reload();
    } else {
      PutProf(data);
      setOpenEdit(!openEdit);
      window.location.reload();
    }
  }

  function ValidateInput() {
    return nome && registration && cpf && phone && email && course;
  }

  return (
    <div className="cadastro-container w-full ">
    <h1 className="font-Montserrat p-14 h-10 font-bold text-2xl">
        Novo Professor
      </h1>
        <form>
          <div className="forms-container px-28 h-auto grid grid-rows-4 md:grid-rows-4 gap-x-8 gap-y-4">
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
                  name="nome"
                  type="text"
                  className={`w-full border-[1px] ${
                    !nome
                      ? "border-red-600 outline-red-600"
                      : "border-border-gray"
                  } rounded-md h-9 pl-2`}
                />
              </label>

              <label htmlFor="registration" className="font-Montserrat">
                CRMV
                <br />
                <input
                  id="registration"
                  required
                  value={registration}
                  name="registration"
                  type="number"
                  onChange={(e) => {
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
                    !cpf
                      ? "outline-red-600 border-red-500"
                      : "border-border-gray"
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
                  } border-[1px] w-full rounded-md h-9 pl-`}
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
              } font-Montserrat border-border-blue border-2 w-52 rounded-md h-10 mt-10 bg-border-blue text-white`}
            >
              {props.buttonName}
            </button>
          </div>
        </form>
      </div>
  );
}
