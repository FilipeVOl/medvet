import checked from '../../images/checked.svg'
import lineOne from '../../images/line-one.svg'
import lineTwo from '../../images/line-two.svg'
import PropTypes from "prop-types";

export default function Stepper(props) {
  const steps = [
    { title: 'Passo 1', icon: '1' },
    { title: 'Passo 2', icon: '2' },
    { title: 'Passo 3', icon: '3' },
    { title: 'Concluído', icon: checked }, // Adicionando o ícone de check no último passo
  ];

  return (
    <div className='w-full flex justify-center items-center flex-col font-Montserrat font-bold pt-10'>
      <div className='self-start ml-20 mb-28'>
        <h1 className="text-[30px]">Nova Consulta</h1>
      </div>
      <div className="flex items-center justify-center">
        {steps.map((step, index) => (
          <div key={index} className='flex items-center justify-center'>
            {index == 0 ? '' : <img src={`${index === props.stepsPage ? lineOne : lineTwo}`} alt="checked" />}
            <div
              className={`p-0 m-0 w-14 h-14 rounded-full flex justify-center items-center ${index + 1 === props.stepsPage ? 'bg-blue-button text-white' : 'bg-blue-button text-white opacity-30'}`}
            >
              {step.icon.length >= 3 ? <img src={checked} alt="checked" /> : step.icon}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


Stepper.propTypes = {
  stepsPage: PropTypes.number.isRequired,
};
