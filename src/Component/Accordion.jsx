import React, { useState } from 'react';
import arrow from '../images/arrow.svg'
import novoCadastro from '../images/novo-cadastro.svg'
import { Link } from 'react-router-dom';

const Accordion = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };
  const question = props.options;
  const values = Object.values(question);
  const keys = Object.keys(question);
  return (
    <div className='transition ease-in-out w-full'>
      <div className='flex gap-4 align-middle justify-between items-center cursor-pointer' onClick={toggleAccordion}>
        <div className='flex items-center gap-4'>
          <img src={props.image} className='self-start my-4' />
          <span className='justify-self-start'>{props.text}</span>
        </div>
        <img src={arrow} className={`${isOpen ? 'rotate-180' : ''} transition ease-in-out duration-500`} />
      </div>
      <div className={` ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden flex gap-2 flex-col self-end ml-9`}
      >
        {values.map((option, index) => (
          <Link to={option} className='cursor-pointer'>{keys[index]}</Link>
        ))}
      </div>
    </div>
  );
};

export default Accordion;