import React, { useState } from "react";
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
  
  const [registration, setRegistration] = useState('')
  const [nome, setNome] = useState('')
  const [cpf, setCpf] = useState('')
  const [email, setEmail] = useState('')
  const [course, setCourse] = useState('Medicina Veterinária')
  const [period, setPeriod] = useState('')
  const [shift, setShift] = useState('')
  const [phone, setPhone] = useState('')



  function clickError() {
    // setErro(formState.errors.erro)
    const cpfSemPonto = cpf.replace(/[.-]/g, '')

    const data = {
      email,
      cpf: cpfSemPonto,
      password: cpfSemPonto,
      registration,
      course,
      shift,
      period,
      phone,
      name: nome
    }

    console.log(data)

    axios.post("http://localhost:3333/users/student",
    JSON.stringify ({data})).then((res) => {
      console.log((res))
    }).catch((err) =>{ 
      console.log(err)
    })
  }
  

  function ValidateInput () {
    if (nome && registration && cpf  && phone) {
      return true;
  } else {
    return false
  }
  }

    return (
        <div className="cadastro-container w-full">
        <h1 className="font-Montserrat p-20 h-10 font-bold">Novo aluno</h1>

        <form>

        <div className="forms-container px-28 grid w-full justify-center">

          <div className="box-1 grid grid-cols-[2fr_1fr] gap-8">

           <div className="">
             <label htmlFor="nome" className="font-Montserrat indent-4">Nome completo *<br></br>
                <input id="name" value={nome} required onChange={(e) => {
                  setNome(e.target.value)
                }} name="name" type="text" 
                className={`w-full border-[1px] ${!nome ? "border-red-600 outline-red-600" : "border-border-gray"} rounded-md h-9 pl-2`}/> </label>
           </div>

            <div>
              <div className="flex gap-2 items-center">
               <label htmlFor="registration"  className="indent-4 w-32">Matricula *<br></br></label>
              </div>
                  <input id="registration" required value={registration} name="registration" type="text" onChange={(e) => {
                  setRegistration(e.target.value) }}
                  className={`border-[1px] w-[300px]  rounded-md h-9 pl-2 ${!registration ? 'outline-red-600 border-red-500' : 'border-border-gray' }`}/> 
              
            </div>

          </div>

          <div className="box-2 grid grid-cols-[196px_400px] gap-32">

            <label htmlFor="cpf" className="font-Montserrat indent-4">CPF *<br></br>
                <InputMask id="cpf" required value={cpf} name="cpf" mask="999.999.999-99"  
                onChange={(e) => {
                  setCpf(e.target.value) }}
                  className= {`${!cpf ? 'outline-red-600 border-red-500' : 'border-border-gray' } border-[1px] w-64 rounded-md h-9 pl-2`} />
            </label>

            <label htmlFor="phone" className="font-Montserrat indent-4">Contato *<br></br>
            <InputMask mask="(99)99999-9999" required value={phone}  name="phone" id="phone" 
            onChange={(e) => {
              setPhone(e.target.value) }}
              className={`${!phone ? 'outline-red-600 border-red-500' : 'border-border-gray'} border-[1px] w-72 rounded-md h-9 pl-`} />
            </label>

            </div>

            <div className="box-3 grid grid-cols-[200px_390px] gap-44">
         
            <label htmlFor="course" className="font-Montserrat indent-4">Curso *<br></br>
                <input type="text" required value={course}  disabled name="course" id="course"
                onChange={(e) => {
                  setCourse(e.target.value) }}
                className="w-[300px] border-[1px] rounded-md h-9 pl-2" /> </label>

                <label htmlFor="email" className="font-Montserrat indent-4">Email *<br></br>
                <input type="email" required value={email} onChange={(e) => {
                  setEmail(e.target.value)
                }} id="email" name="email"
                className={`${!email ? 'outline-red-600 border-red-500' : 'border-border-gray' } w-[520px] border-[1px] rounded-md h-9 pl-2`} /> </label>

          </div>

          <div className="box-4 grid grid-cols-[200px_200px] gap-8">
            <label htmlFor="period" value={period}  className="font-Montserrat indent-4">Período<br></br>
            <input type="number" required name="period" id="period" 
            onChange={(e) => {
              setPeriod(e.target.value) }}
              className={`${!period ? 'outline-red-600 border-red-500' : 'border-border-gray' } border-[1px] rounded-md h-9 pl-2`} maxLength={2} />
            </label>

            <label htmlFor="shift" className="font-Montserrat indent-4">Turno<br></br>
                <input type="text" required value={shift}  id="shift" name="shift"
                onChange={(e) => {
                  setShift(e.target.value) }}
                className={`${!shift ? 'outline-red-600 border-red-500' : 'border-border-gray' } border-[1px] rounded-md h-9 pl-2`}/> </label>
           </div>
          </div>

          <div className="button-container flex justify-end px-28 h-[28rem]">
            
              <button id="cadastrar" name="cadastrar" type="submit" 
              onClick={(e) => {
                e.preventDefault()
                clickError()
              }}
              className={`${!ValidateInput() ? 'cursor-not-allowed opacity-25 disabled' : '' } font-Montserrat border-border-blue border-2 w-52 rounded-md h-10 mt-36 bg-border-blue text-white`}>
                Cadastrar
            </button>

          </div>

        </form>
        </div>
    )
}