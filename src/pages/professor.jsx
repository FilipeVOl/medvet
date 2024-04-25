import React, { useState } from "react";
import InputMask from "react-input-mask";
import axios from "axios";

export default function Professor() {
  const [nome, setNome] = useState("");
  const [registration, setRegistration] = useState("");
  const [cpf, setCpf] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("Medicina Veterinária");

  function clickError() {
    const cpfSemPonto = cpf.replace(/[.-]/g, "");
    const data = {
      name: nome,
      registration,
      cpf,
      course,
      phone,
      email,
      password: cpfSemPonto,
    };

    axios
      .post("http://localhost:3333/users/teacher", data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function ValidateInput() {
    return nome && registration && cpf && phone && email && course;
  }

  return (
    <>
      <div
        style={{ height: "calc(100vh - 116px)" }}
        className="cadastro-container w-full flex flex-col "
      >
        <h1 className="font-Montserrat p-20 h-10 font-bold text-xl">
          Novo Professor
        </h1>
        <form>
          <div className="forms-container px-10 lg:px-28 gap-8">

            <div className="box-1 grid grid-cols-2 gap-8">
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
                    !nome ? "border-red-600 outline-red-600" : "border-border-gray"
                  } rounded-md h-9 pl-2`}
                />
              </label>

              <label htmlFor="registration" className="font-Montserrat">
                CRMV<br />
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
                    !registration ? "outline-red-600 border-red-500" : "border-border-gray"
                  }`}
                />
              </label>
            </div>

            <div className="box-2 grid grid-cols-2 gap-8">
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
                    !email ? "outline-red-600 border-red-500" : "border-border-gray"
                  } w-full border-[1px] rounded-md h-9 pl-2`}
                />
              </label>
            </div>

            <div className="box-3 grid grid-cols-2 gap-8">
              <label htmlFor="phone" className="font-Montserrat">
                N° de contato *<br />
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
                    !phone ? "outline-red-600 border-red-500" : "border-border-gray"
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
          <div className="button-container flex justify-end px-10 lg:px-28">
            <button
              id="cadastrar"
              name="cadastrar"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                clickError();
              }}
              className={`${
                !ValidateInput() ? "cursor-not-allowed opacity-25 disabled" : ""
              } font-Montserrat border-border-blue border-2 w-52 rounded-md h-10 mt-36 bg-border-blue text-white`}
            >
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
