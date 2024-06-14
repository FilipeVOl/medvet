import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import arrow from '../images/arrow.svg'
import house from '../images/house.svg'
import agendar from '../images/agendar.svg'
import novoCadastro from '../images/novo-cadastro.svg'
import agendamento from '../images/agendamento.svg'
import cadastrados from '../images/cadastrados.svg'
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className='shadow-md h-[100] min-h-screen bg-[#007448] p-10 text-white-med fixed top-28 max-w-72 min-w-72'>
      <div id="inicio" className='flex py-4'>
        <img src={house} className='pr-4 '/>
        <Link to="">Início</Link>
      </div>
      <div id="agendar" className='flex py-4'>
        <img src={agendar} className='pr-4'/>
        <Link to="agendamento">Agendar</Link>
      </div>
      <div id="novo-cadastro" className='flex bg-[#007448]'>
        <img src={novoCadastro} className='self-start my-4'/>
        <Accordion sx={{ backgroundColor: '#007448', color: '#FFFFFF', boxShadow: "none" }}>
          <AccordionSummary
            expandIcon={<img src={arrow} className='pl-5'/>}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography>Novo Cadastro</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography sx={{ display:'flex', flexDirection:"column", justifyContent:"flex-start", alignItems:"flex-start" }}>
                <Link to="tutor">Tutor</Link>
                <Link to="professor">Professor</Link>
                <Link to="aluno">Aluno</Link>
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
      <div id="agendamento" className='flex py-4'>
        <img src={agendamento} className='pr-4'/>
        <Link to="agenda">Agendamento</Link>
      </div>
      <div id="cadastrados" className='flex bg-[#007448]'>
        <img src={cadastrados} className='self-start my-4' />
        <Accordion sx={{ backgroundColor: '#007448', color: '#FFFFFF', boxShadow: "none", paddingRight:"20px" }}>
          <AccordionSummary
            expandIcon={<img src={arrow} className='pl-8'/>}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography>Cadastrados</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography sx={{ display:'flex', flexDirection:"column", justifyContent:"flex-start", alignItems:"flex-start" }}>
                <Link to="showTutor">Tutor</Link>
                <Link to="showProfessor">Professor</Link>
                <Link to="showAluno">Aluno</Link>
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
      <div id="criarConsulta" className='flex py-4 bg-[#007448]'>
        <img src={agendar} alt='criar consulta' className='pr-4'/>
        <Link to="criarconsulta">Criar Consulta</Link>
      </div>
      <div id='receita' className='flex py-4 bg-[#007448]'>
      <img src={novoCadastro} alt='receita' className='pr-4'/>
        <Link to="receita">Receitas</Link>
      </div>
    </div>
  )
}

export default Navbar;