import { useState } from 'react';
import ExameRequestForm from '../FormExame/ExameRequestForm';
import HospitalizationForm from '../FormInternacao/HospitalizationForm';
import AnesthesiaForm from '../FormAnestesia/AnesthesiaForm';
import { downloadExamePDF } from '../../services/exames';
import { downloadTermoInternacaoPDF } from '../../services/termoInternacao';
import { downloadTermoAnestesiaPDF } from '../../services/termoAnestesia';

/**
 * Componente para gerenciar formulários no prontuário
 * @param {Object} props - Propriedades do componente
 * @param {Object} props.animal - Dados do animal
 * @returns {JSX.Element} Seção de formulários no prontuário
 */
const ProntuarioForms = ({ animal }) => {
  const [activeTab, setActiveTab] = useState('none'); // none, exame, internacao, anestesia
  const [sucessMessage, setSuccessMessage] = useState('');
  const [recentForms, setRecentForms] = useState({
    exames: [],
    internacoes: [],
    anestesias: []
  });

  const handleTabChange = (tab) => {
    setActiveTab(tab === activeTab ? 'none' : tab);
    setSuccessMessage('');
  };

  const handleFormSuccess = (formType, result) => {
    // Atualizar lista de formulários recentes
    setRecentForms(prev => ({
      ...prev,
      [formType]: [result, ...prev[formType]].slice(0, 5) // Manter apenas os 5 mais recentes
    }));
    
    // Mostrar mensagem de sucesso
    setSuccessMessage(`${getFormTypeName(formType)} criado com sucesso!`);
    
    // Fechar o formulário
    setActiveTab('none');
  };

  const getFormTypeName = (formType) => {
    const types = {
      exames: 'Solicitação de exame',
      internacoes: 'Termo de internação',
      anestesias: 'Autorização para anestesia'
    };
    return types[formType] || 'Formulário';
  };

  const handleDownload = async (type, id) => {
    try {
      switch (type) {
        case 'exames':
          await downloadExamePDF(id);
          break;
        case 'internacoes':
          await downloadTermoInternacaoPDF(id);
          break;
        case 'anestesias':
          await downloadTermoAnestesiaPDF(id);
          break;
      }
    } catch (error) {
      console.error('Erro ao baixar PDF:', error);
      alert('Erro ao baixar o arquivo. Tente novamente.');
    }
  };

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Formulários e Documentos</h2>
      
      {/* Mensagem de sucesso */}
      {sucessMessage && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4" role="alert">
          <p>{sucessMessage}</p>
        </div>
      )}
      
      {/* Seleção de formulários */}
      <div className="flex mb-4 space-x-2">
        <button
          className={`px-4 py-2 rounded ${activeTab === 'exame' ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
          onClick={() => handleTabChange('exame')}
        >
          Solicitar Exame
        </button>
        
        <button
          className={`px-4 py-2 rounded ${activeTab === 'internacao' ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
          onClick={() => handleTabChange('internacao')}
        >
          Termo de Internação
        </button>
        
        <button
          className={`px-4 py-2 rounded ${activeTab === 'anestesia' ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
          onClick={() => handleTabChange('anestesia')}
        >
          Autorização Anestésica
        </button>
      </div>
      
      {/* Formulários */}
      {activeTab !== 'none' && (
        <div className="border rounded p-4 mb-6">
          {activeTab === 'exame' && (
            <ExameRequestForm 
              animal={animal} 
              onSuccess={(result) => handleFormSuccess('exames', result)} 
            />
          )}
          
          {activeTab === 'internacao' && (
            <HospitalizationForm 
              animal={animal} 
              onSuccess={(result) => handleFormSuccess('internacoes', result)} 
            />
          )}
          
          {activeTab === 'anestesia' && (
            <AnesthesiaForm 
              animal={animal} 
              onSuccess={(result) => handleFormSuccess('anestesias', result)} 
            />
          )}
        </div>
      )}
      
      {/* Lista de formulários recentes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Exames recentes */}
        <div className="border rounded p-4">
          <h3 className="font-semibold mb-2">Solicitações de Exames Recentes</h3>
          {recentForms.exames.length > 0 ? (
            <ul>
              {recentForms.exames.map((exame) => (
                <li key={exame.id} className="mb-2 p-2 bg-gray-50 rounded">
                  <div className="flex justify-between items-center">
                    <span>
                      {new Date(exame.dataSolicitacao).toLocaleDateString()}
                    </span>
                    <div>
                      <button
                        onClick={() => handleDownload('exames', exame.id)}
                        className="text-blue-600 hover:underline text-sm"
                      >
                        Baixar PDF
                      </button>
                    </div>
                  </div>
                  <div className="text-sm text-gray-700">
                    {Object.entries(exame)
                      .filter(([key, value]) => value === true && !['id', 'animalId', 'createdAt', 'updatedAt'].includes(key))
                      .map(([key]) => key)
                      .join(', ')}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-sm">Nenhum exame solicitado recentemente.</p>
          )}
        </div>
        
        {/* Internações recentes */}
        <div className="border rounded p-4">
          <h3 className="font-semibold mb-2">Termos de Internação Recentes</h3>
          {recentForms.internacoes.length > 0 ? (
            <ul>
              {recentForms.internacoes.map((internacao) => (
                <li key={internacao.id} className="mb-2 p-2 bg-gray-50 rounded">
                  <div className="flex justify-between items-center">
                    <span>
                      {new Date(internacao.createdAt).toLocaleDateString()}
                    </span>
                    <div>
                      <button
                        onClick={() => handleDownload('internacoes', internacao.id)}
                        className="text-blue-600 hover:underline text-sm"
                      >
                        Baixar PDF
                      </button>
                    </div>
                  </div>
                  <div className="text-sm text-gray-700">
                    {internacao.motivoInternacao.substring(0, 50)}
                    {internacao.motivoInternacao.length > 50 ? '...' : ''}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-sm">Nenhum termo de internação recente.</p>
          )}
        </div>
        
        {/* Anestesias recentes */}
        <div className="border rounded p-4">
          <h3 className="font-semibold mb-2">Autorizações de Anestesia Recentes</h3>
          {recentForms.anestesias.length > 0 ? (
            <ul>
              {recentForms.anestesias.map((anestesia) => (
                <li key={anestesia.id} className="mb-2 p-2 bg-gray-50 rounded">
                  <div className="flex justify-between items-center">
                    <span>
                      {new Date(anestesia.createdAt).toLocaleDateString()}
                    </span>
                    <div>
                      <button
                        onClick={() => handleDownload('anestesias', anestesia.id)}
                        className="text-blue-600 hover:underline text-sm"
                      >
                        Baixar PDF
                      </button>
                    </div>
                  </div>
                  <div className="text-sm text-gray-700">
                    {anestesia.procedimento}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-sm">Nenhuma autorização de anestesia recente.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProntuarioForms;
