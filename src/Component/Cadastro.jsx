import React from "react";
import Header from "./Header";
import InputMask from 'react-input-mask'

export default function Cadastro() {
    return (
        <>
        <div className="cadastro-container w-full">
        <h1 className="font-Montserrat p-20 h-10 font-bold">Novo aluno</h1>

        <form>
        <div className="forms-container px-28 grid w-full justify-center">
          <div className="box-1 grid grid-cols-[2fr_1fr] gap-8">
            <label htmlFor="nome" className="font-Montserrat indent-4">Nome completo *<br></br>
                <input type="text" required
                className="w-full border-[1px] border-border-gray rounded-md h-9 pl-2"/> </label>

            <label htmlFor="matricula" className="flex flex-col indent-4">Matricula<br></br>
                <input type="text" required
                className="border-[1px] w-[300px] border-border-gray rounded-md h-9 pl-2"/> </label>
          </div>

          <div className="box-2 grid grid-cols-[196px_400px] gap-32">
            <label htmlFor="cpf" className="font-Montserrat indent-4">CPF<br></br>
                <InputMask mask="999.999.999-99" required className="border-[1px] w-64 border-border-gray rounded-md h-9 pl-2" />
            </label>

            <label htmlFor="email" className="font-Montserrat indent-4">Email<br></br>
                <input type="email" required
                className="w-[590px] border-[1px] border-border-gray rounded-md h-9 pl-2"/> </label>
          </div>

          <div className="box-3 grid grid-cols-[200px_390px] gap-44">
            <label htmlFor="telefone" className="font-Montserrat indent-4">N° de telefone<br></br>
            <InputMask mask="(99)9999-99999" required className="border-[1px] w-72 border-border-gray rounded-md h-9 pl-2" />
            </label>

            <label htmlFor="curso">Curso<br></br>
                <input type="text" required
                className="w-[539px] border-[1px] border-border-gray rounded-md h-9 indent-4 pl-2"/> </label>
          </div>

          <div className="box-4 grid grid-cols-[200px_200px] gap-8">
            <label htmlFor="periodo" className="font-Montserrat indent-4">Período<br></br>
            <input type="number" required className="border-[1px] border-border-gray rounded-md h-9 pl-2" maxLength={2} />
            </label>

            <label htmlFor="turno" className="font-Montserrat indent-4">Turno<br></br>
                <input type="text" required
                className="border-[1px] border-border-gray rounded-md h-9 pl-2"/> </label>
          </div>
          </div>

          <div className="buttons grid grid-cols-2 px-28 gap-[375px]">
            <button className="font-Montserrat border-[1px] w-52 rounded-md border-border-gray h-10 mt-36">
                Voltar
            </button>

            <button type="submit" className="font-Montserrat border-border-blue border-2 w-52 rounded-md h-10 mt-36 bg-border-blue text-white">
                Cadastrar
            </button>
          </div>

        </form>
        </div>
        </>
    )
}