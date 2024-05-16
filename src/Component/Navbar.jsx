import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import arrow from '../images/arrow.svg'
import house from '../images/house.svg'

const Navbar = () => {
  return (
    <div className='shadow-md min-w-60 h-[100] min-h-screen bg-[#007448] p-10 w-96'>
      <div id="inicio" className='flex bg-[#007448]'>
        <img src={house} />
        <Accordion className='acordium'>
          <AccordionSummary
            expandIcon={<img src={arrow} />}
            aria-controls="panel2-content"
            id="panel2-header"
            sx={{ backgroundColor: '#007448', color: '#FFFFFF', boxShadow: 'none' }}
          >
            <Typography  className='acordium'>Início</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
              malesuada lacus ex, sit amet blandit leo lobortis eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
      <div id="agenda" className="flex">
        <img src={house} />
        <h1>Agendar</h1>
      </div>
      <div>
        
      </div>
    </div>
  )
}

export default Navbar