import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

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
      <div className='flex gap-4 align-middle justify-between items-center cursor-pointer py-4 px-2 hover:bg-[#008854] rounded-md transition-all duration-300' 
           onClick={toggleAccordion}>
        <div className='flex items-center gap-4'>
          {props.icon}
          <span className='justify-self-start'>{props.text}</span>
        </div>
        {isOpen ? (
          <KeyboardArrowUpIcon className='transition ease-in-out duration-500' />
        ) : (
          <KeyboardArrowDownIcon className='transition ease-in-out duration-500' />
        )}
      </div>
      <div 
        className={`${
          isOpen ? 'max-h-96 opacity-100 py-2' : 'max-h-0 opacity-0'
        } overflow-hidden flex gap-3 flex-col self-end ml-9 transition-all duration-300`}
      >
        {values.map((option, index) => (
          <Link 
            key={index} 
            to={option} 
            className='cursor-pointer hover:bg-[#008854] py-2 px-2 rounded-md transition-all duration-300'
          >
            {keys[index]}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Accordion;