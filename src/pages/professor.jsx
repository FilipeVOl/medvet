import React, { useState } from "react";
//import Header from "./Header";
import InputMask from "react-input-mask";
import axios from "axios";
import { data } from "autoprefixer";


export default function Professor() {
  const [nome, setNome] = useState("")
  const [registration, setRegistration] = useState("")
  const [cpf, setCpf] = useState("")
  const [phone, setPhone] = useState("")
  const data = {
    name: nome,
    registration,
    cpf,
    phone,
  }
  axios.post("http://localhost:3333/users/teacher", data).then((res) => {
    console.log(res)
  }).catch((err) => {
    console.log(err)
  })
  return (
    <>
      <div style={{
        height: "calc(100vh - 116px)",
      }} className="cadastro-container w-full">
        <h1 className="font-Montserrat p-20 h-10 font-bold text-[25px]">Novo Professor</h1>
        <form>
          <div className="forms-container px-28 grid w-full justify-center">
            <div className="box-1 grid grid-cols-[2fr_1fr] gap-8">
              <label htmlFor="nome" className="font-Montserrat indent-4">
                Nome completo<br></br>
                <input
                  id="name" name="name" type="text"
                  className="w-full border-2 border-border-gray rounded-md h-9 mb-4 pl-2"
                />{" "}
              </label>

              <label htmlFor="identificação" className="flex flex-col indent-4 ">
                  N° de identificação<br></br>
                <input
                  id="registration" name="registration" type="text"
                  className="border-2 w-[300px] border-border-gray rounded-md h-9 indent-4"
                />{" "}
              </label>
            </div>

            <div className="box-2 grid grid-cols-[196px_400px] gap-32 indent-4">
              <label htmlFor="cpf"  className="font-Montserrat">
                CPF<br></br>
                <InputMask
                  mask="999.999.999-99"
                  id="cpf" name="cpf"
                  className="border-2 w-64 border-border-gray rounded-md h-9 pl-2"
                />
              </label>
              <label htmlFor="phone" id="phone" name="phone" className="font-Montserrat">
                N° de telefone<br></br>
                <input
                  type="phone"
                  className="w-[196px] border-2 border-border-gray rounded-md h-9 ident-4 pl-2"
                />{" "}
              </label>
            </div>
          </div>
          <div className="buttons grid grid-cols-2 px-28 gap-[375px]">
            <button className="font-Montserrat border-[1px] w-52 rounded-md border-border-gray h-10 mt-36">
              Voltar
            </button>

            <button
              type="submit"
              className="font-Montserrat border-border-blue border-2 w-52 rounded-md h-10 mt-36 bg-border-blue text-white">
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
