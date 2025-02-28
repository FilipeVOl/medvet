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
    <div className="font-Montserrat mt-6 w-full">
    <div className=" md:mx-32 flex justify-start items-center mb-6 md:mb-8 font-semibold">
      <span className="text-xl md:text-2xl font-bold">Nova Consulta</span>
    </div>
      <div className="flex items-center justify-center">
        {steps.map((step, index) => (
          <div key={index} className='flex items-center justify-center'>
            {index == 0 ? '' : <img src={`${index === props.stepsPage ? lineOne : lineTwo}`} alt="checked" />}
            <div
              className={`p-0 m-0 w-14 h-14 rounded-full flex justify-center items-center ${index + 1 === props.stepsPage ? 'bg-[#144A36] text-white' : 'bg-[#144A36] text-white opacity-30'}`}
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
