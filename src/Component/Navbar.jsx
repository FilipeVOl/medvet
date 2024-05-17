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
    <div className='shadow-md min-w-60 h-[100] min-h-screen bg-[#007448] p-10 w-96 text-white-med'>
      <div id="inicio" className='flex py-4'>
        <img src={house} className='pr-4 '/>
        <Link to="">Início</Link>
      </div>
      <div id="agendar" className='flex py-4'>
        <img src={agendar} className='pr-4'/>
        <Link to="agendamento">Agendar</Link>
      </div>
      <div id="novo-cadastro" className='flex bg-[#007448]'>
        <img src={novoCadastro} />
        <Accordion sx={{ backgroundColor: '#007448', color: '#FFFFFF', boxShadow: "none", paddingRight:"20px" }}>
          <AccordionSummary
            expandIcon={<img src={arrow} />}
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
        <img src={cadastrados} className='sticky top-0' />
        <Accordion sx={{ backgroundColor: '#007448', color: '#FFFFFF', boxShadow: "none", paddingRight:"20px" }}>
          <AccordionSummary
            expandIcon={<img src={arrow} />}
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
      <div>

      </div>
    </div>
  )
}

export default Navbar