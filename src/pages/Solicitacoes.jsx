import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import BiotechIcon from '@mui/icons-material/Biotech';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import ReceiptIcon from '@mui/icons-material/Receipt';
import DescriptionIcon from '@mui/icons-material/Description';

export default function Solicitacoes() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('exames'); 
  
  return (
    <div className="container mx-auto  pt-10 pr-6 pb-6 pl-20">      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Solicitações</h1>
        <Link 
          to="/solicitacoes/lista"
          className="bg-[#144A36] text-white py-2 px-4 rounded hover:bg-opacity-90"
        >
          Ver todas as solicitações
        </Link>
      </div>
        <div className="flex border-b mb-8 overflow-x-auto">
        <Link 
          to="/solicitacoes/exames"
          className={`flex items-center px-6 py-3 ${location.pathname.includes('exames') ? 'border-b-2 border-[#144A36] text-[#144A36]' : 'text-gray-500'}`}
          onClick={() => setActiveTab('exames')}
        >
          <BiotechIcon className="mr-2" /> 
          Exames
        </Link>      
        <Link 
          to="/solicitacoes/internacao"
          className={`flex items-center px-6 py-3 ${location.pathname.includes('internacao') ? 'border-b-2 border-[#144A36] text-[#144A36]' : 'text-gray-500'}`}
          onClick={() => setActiveTab('internacao')}
        >
          <LocalHospitalIcon className="mr-2" /> 
          Internação
        </Link>
   
        <Link 
          to="/solicitacoes/receituario"
          className={`flex items-center px-6 py-3 ${location.pathname.includes('receituario') ? 'border-b-2 border-[#144A36] text-[#144A36]' : 'text-gray-500'}`}
          onClick={() => setActiveTab('receituario')}
        >
          <ReceiptIcon className="mr-2" /> 
          Receituário
        </Link>
        <Link 
          to="/solicitacoes/termo-consulta"
          className={`flex items-center px-6 py-3 ${location.pathname.includes('termo-consulta') ? 'border-b-2 border-[#144A36] text-[#144A36]' : 'text-gray-500'}`}
          onClick={() => setActiveTab('termo-consulta')}
        >
          <DescriptionIcon className="mr-2" /> 
          Termo de Consulta
        </Link>
      </div>
      
      <Outlet />        {location.pathname === '/solicitacoes' && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Selecione o tipo de solicitação</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link 
              to="/solicitacoes/exames"
              className="border p-6 rounded-lg text-center hover:bg-gray-50 transition-colors"
            >
              <BiotechIcon sx={{ fontSize: 64 }} className="text-[#144A36] mb-4" />
              <h3 className="text-lg font-medium mb-2">Solicitação de Exames</h3>
              <p className="text-sm text-gray-600">
                Solicite exames laboratoriais, radiografias, ultrassonografias e outros exames complementares.
              </p>
            </Link>
            
   
            <Link 
              to="/solicitacoes/internacao"
              className="border p-6 rounded-lg text-center hover:bg-gray-50 transition-colors"
            >
              <LocalHospitalIcon sx={{ fontSize: 64 }} className="text-[#144A36] mb-4" />
              <h3 className="text-lg font-medium mb-2">Solicitação de Internação</h3>
              <p className="text-sm text-gray-600">
                Solicite internação de pacientes que necessitam de cuidados hospitalares.
              </p>
            </Link>
    

            <Link 
              to="/solicitacoes/receituario"
              className="border p-6 rounded-lg text-center hover:bg-gray-50 transition-colors"
            >
              <ReceiptIcon sx={{ fontSize: 64 }} className="text-[#144A36] mb-4" />
              <h3 className="text-lg font-medium mb-2">Receituário</h3>
              <p className="text-sm text-gray-600">
                Crie e gerencie receituários para medicamentos prescritos aos pacientes.
              </p>
            </Link>

            <Link 
              to="/solicitacoes/termo-consulta"
              className="border p-6 rounded-lg text-center hover:bg-gray-50 transition-colors"
            >
              <DescriptionIcon sx={{ fontSize: 64 }} className="text-[#144A36] mb-4" />
              <h3 className="text-lg font-medium mb-2">Termo de Consulta</h3>
              <p className="text-sm text-gray-600">
                Gere termos de responsabilidade para consultas e procedimentos clínicos.
              </p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
