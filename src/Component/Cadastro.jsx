import React, { useState } from "react";
import Header from "./Header";
import InputMask from 'react-input-mask'
import { useForm } from "react-hook-form";
import axios from 'axios'

export default function Cadastro() {
  // const {register,formState, handleSubmit, watch} = useForm({
  //   // defaultValues:{
  //   //   matricula: undefined,
  //   //   nome: undefined,
  //   //   cpf: undefined,
  //   //   email: undefined,
  //   //   curso: 'Medicina Veterinária',
  //   //   periodo: undefined,
  //   //   turno: undefined,

  //   // }
  // })
  
  const [matricula, setMatricula] = useState('')
  const [nome, setNome] = useState('')
  const [cpf, setCpf] = useState('')
  const [email, setEmail] = useState('')
  const [curso, setCurso] = useState('Medicina Veterinária')
  const [periodo, setPeriodo] = useState('')
  const [turno, setTurno] = useState('')
  const [erro, setErro] = useState('')
  const [telefone, setTelefone] = useState('')

  function validateButton(){
    
    console.log(nome)
    return hasMatricula, hasName, hasCPF, hasEmail, hasCurso
  }

  function clickError() {
    // setErro(formState.errors.erro)
    const data = {
      matricula,
      nome,
      cpf,
      email,
      curso,
      periodo,
      turno,
    }
    axios.post("http://localhost:3333/users/student", data).then((res) => {
      console.log(res)
    }).catch((err) =>{ 
      console.log(err)
    })
  }

    return (
        <>
        <div className="cadastro-container w-full">
        <h1 className="font-Montserrat p-20 h-10 font-bold">Novo aluno</h1>

        <form>

        <div className="forms-container px-28 grid w-full justify-center">
          <div className="box-1 grid grid-cols-[2fr_1fr] gap-8">

           <div className="">
             <label htmlFor="nome" className="font-Montserrat indent-4">Nome completo *<br></br>
                <input id="nome" value={nome} required onChange={(e) => {
                  setNome(e.target.value)
                }} name="nome" type="text" 
                className={`w-full border-[1px] ${!nome ? "border-red-600 outline-red-600" : "border-border-gray"} rounded-md h-9 pl-2`}/> </label>
           </div>

            <div>
              <div className="flex gap-2 items-center">
               <label htmlFor="matricula"  className="indent-4 w-32">Matricula *<br></br></label>
              </div>
                  <input id="matricula" required value={matricula} name="matricula" type="text" onChange={(e) => {
                  setMatricula(e.target.value) }}
                  className={`border-[1px] w-[300px]  rounded-md h-9 pl-2 ${!matricula ? 'outline-red-600 border-red-500' : 'border-border-gray' }`}/> 
              
            </div>

          </div>

          <div className="box-2 grid grid-cols-[196px_400px] gap-32">
            <label htmlFor="cpf" className="font-Montserrat indent-4">CPF *<br></br>
                <InputMask id="cpf" required value={cpf} name="cpf" mask="999.999.999-99"  
                onChange={(e) => {
                  setCpf(e.target.value) }}
                  className= {`${!cpf ? 'outline-red-600 border-red-500' : 'border-border-gray' } border-[1px] w-64 rounded-md h-9 pl-2`} />
            </label>

            <label htmlFor="email" className="font-Montserrat indent-4">Email *<br></br>
                <input type="email" required value={email} onChange={(e) => {
                  setEmail(e.target.value)
                }} id="email" name="email"
                className={`${!email ? 'outline-red-600 border-red-500' : 'border-border-gray' } w-[590px] border-[1px] rounded-md h-9 pl-2`} /> </label>

          </div>

          <div className="box-3 grid grid-cols-[200px_390px] gap-44">
            <label htmlFor="telefone" className="font-Montserrat indent-4">N° de telefone *<br></br>
            <InputMask mask="(99)9999-99999" required value={telefone}  name="telefone" id="telefone" 
            onChange={(e) => {
              setTelefone(e.target.value) }}
              className={`${!telefone ? 'outline-red-600 border-red-500' : 'border-border-gray'} border-[1px] w-72 rounded-md h-9 pl-`} />
            </label>

            <label htmlFor="curso" className="font-Montserrat indent-4">Curso *<br></br>
                <input type="text" required value={curso}  disabled name="curso" id="curso"
                onChange={(e) => {
                  setCurso(e.target.value) }}
                className="w-[539px] border-[1px] rounded-md h-9 pl-2" /> </label>
          </div>

          <div className="box-4 grid grid-cols-[200px_200px] gap-8">
            <label htmlFor="periodo" value={periodo}  className="font-Montserrat indent-4">Período<br></br>
            <input type="number" required name="periodo" id="periodo" 
            onChange={(e) => {
              setPeriodo(e.target.value) }}
              className={`${!periodo ? 'outline-red-600 border-red-500' : 'border-border-gray' } border-[1px] rounded-md h-9 pl-2`} maxLength={2} />
            </label>

            <label htmlFor="turno" className="font-Montserrat indent-4">Turno<br></br>
                <input type="text" required value={turno}  id="turno" name="turno"
                onChange={(e) => {
                  setTurno(e.target.value) }}
                className={`${!turno ? 'outline-red-600 border-red-500' : 'border-border-gray' } border-[1px] rounded-md h-9 pl-2`}/> </label>
          </div>
          </div>

          <div className="buttons grid grid-cols-2 px-28 gap-[375px]">
            <button onClick={(e) => {
              e.preventDefault()
              clickError()
            }} className="font-Montserrat border-[1px] w-52 rounded-md border-border-gray h-10 mt-36">
                Voltar
            </button>
            
              <button id="cadastrar" name="cadastrar" type="submit" 
              className={`${validateButton ? '' : 'opacity-25' } font-Montserrat border-border-blue border-2 w-52 rounded-md h-10 mt-36 bg-border-blue text-white`}>
                Cadastrar
            </button>

          </div>

        </form>
        </div>
        </>
    )
}