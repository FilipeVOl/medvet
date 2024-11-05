import arrow from '../images/arrow.svg'
import house from '../images/house.svg'
import agendar from '../images/agendar.svg'
import novoCadastro from '../images/novo-cadastro.svg'
import agendamento from '../images/agendamento.svg'
import cadastrados from '../images/cadastrados.svg'
import prontuarios from '../images/prontuarios.svg'
import { Link } from "react-router-dom";
import Accordion from './Accordion'

const Navbar = () => {
  const arr = {Aluno: 'aluno', Tutor: 'tutor', Professor: 'professor', Animal: 'animal'};
  const arr2 = {Aluno: 'showAluno', Tutor: 'showTutor', Professor: 'showProfessor'};
  return (
    <div className='shadow-md min-h-screen bg-[#007448] p-10 text-white-med top-28 max-w-72 min-w-72'>
      <div id="inicio" className='flex py-4'>
        <img src={house} className='pr-4 '/>
        <Link to="home">Início</Link>
      </div>
      <div id="agendar" className='flex py-4'>
        <img src={agendar} className='pr-4 h-6'/>
        <Link to="agendamento">Agendar</Link>
      </div>
      <div id="novo-cadastro" className='flex bg-[#007448]'>
      </div>
      <div id="agendamento" className='flex py-4'>
        <img src={agendamento} className='pr-4'/>
        <Link to="agenda">Agendamento</Link>
      </div>
      <div>
        <Accordion text="Novo Cadastro" image={novoCadastro} options={arr}/>
      </div>
      <div id="criarConsulta" className='flex py-4 bg-[#007448]'>
        <img src={agendar} alt='criar consulta' className='pr-4 h-6'/>
        <Link to="criarconsulta">Criar Consulta</Link>
      </div>
      <div id='receita' className='flex py-4 bg-[#007448]'>
      <img src={novoCadastro} alt='receita' className='pr-4'/>
        <Link to="receita">Receitas</Link>
      </div>
      <div>
        <Accordion text="Cadastrados" image={cadastrados} options={arr2}/>
      </div>
      <div id='prontuarios' className='flex py-4 bg-[#007448]'>
      <img src={prontuarios} alt='prontuarios' className='pr-4'/>
        <Link to="prontuarios">Prontuários</Link>
      </div>
    </div>
  )
}

export default Navbar;