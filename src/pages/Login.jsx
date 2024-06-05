import logo from '../images/logo.svg'
import logoUni from '../images/logo-uni.svg'
import olho from '../images/olho.svg'
import olhoFechado from '../images/eye-close.svg'

import { useState } from 'react'
import { postSessions } from '../services/users'

export default function Login() {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [wrongUser, setWrongUser] = useState(!open)
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleLogin = async () => {
    const sendUser = {
      usuario,
      senha
    }
    const verifyUser = await postSessions(sendUser)
    if (verifyUser) {
      //guardar tokene redirecionar para tela inicial
      console.log(verifyUser)
    } else {
      setWrongUser(open)
    }
  }
  return (
    <div className="bg-card-green w-full h-screen flex justify-center items-center flex-col font-Montserrat font-bold">
      <div className="bg-[#FFFEF9] rounded-xl  flex justify-center items-center flex-col py-10">
        <div className='flex w-full'>
          <img src={logo} alt="checked" className='mr-40 ml-80' />
          <img src={logoUni} alt="checked" className='self-start mr-10' />
        </div>
        <div className='pt-4 w-full pb-12'>
          <form className='flex flex-col w-full justify-center items-center'>
            <div className='p-4 flex flex-col items-start'>
              <span className='mr-96 pr-20 ml-10'>Usuário</span>
              <input type="text" name="usuario" id="usuario" className='border-solid border-2 border-gray rounded-lg p-3 w-full bg-[#E7E5DB] shadow-lg font-normal'
                placeholder='Informe seu usuário'
                onChange={(e) => setUsuario(e.target.value)}
                value={usuario}
              />
            </div>
            <div className='p-4 flex flex-col items-start'>
              <span className='mr-96 pr-20 ml-10'>Senha</span>
              <div className='flex border-solid border-2 border-gray rounded-lg p-3 w-full bg-[#E7E5DB] shadow-lg'>
                <input type={showPassword ? 'password' : 'text'} name="senha" id="senha" className='font-normal w-full bg-[#E7E5DB]'
                  placeholder='Informe sua senha'
                  onChange={(e) => setSenha(e.target.value)}
                  value={senha}
                />
                <button type="button" onClick={toggleShowPassword}>
                  {showPassword ? <img src={olho} className='w-6 h-full' /> : <img src={olhoFechado} className='w-6 h-full' />}
                </button>
              </div>
            </div>
            <button className="mt-10 bg-[#007448] p-3 px-20 rounded-xl text-white font-semibold"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                handleLogin();
              }}
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

