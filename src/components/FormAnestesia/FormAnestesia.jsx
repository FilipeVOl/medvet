import { useState } from 'react';
import PropTypes from 'prop-types';

export default function FormAnestesia({ animalData }) {
  const [formData, setFormData] = useState({
    ownerName: animalData.tutorName || '',
    ownerDocument: animalData.tutorCpf || '',
    procedure: '',
    anesthesiaType: '',
    risks: '',
    observations: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        ...formData,
        animalName: animalData.name,
        animalId: animalData.id,
        dataSolicitacao: new Date().toISOString(),
        situacao: 'pendente',
        tipo: 'anestesia'
      };
      
    
      
      alert('Autorização para anestesia registrada com sucesso!');
     
    } catch (error) {
      console.error('Erro ao enviar autorização para anestesia:', error);
      alert('Erro ao registrar autorização para anestesia. Por favor, tente novamente.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Autorização para Procedimento Anestésico</h3>
        <p className="text-gray-600 mb-4">Animal: {animalData.name}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Nome do Responsável
          </label>
          <input
            type="text"
            name="ownerName"
            value={formData.ownerName}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            CPF do Responsável
          </label>
          <input
            type="text"
            name="ownerDocument"
            value={formData.ownerDocument}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Procedimento a ser Realizado
        </label>
        <input
          type="text"
          name="procedure"
          value={formData.procedure}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Tipo de Anestesia
        </label>
        <select
          name="anesthesiaType"
          value={formData.anesthesiaType}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="">Selecione o tipo de anestesia</option>
          <option value="local">Local</option>
          <option value="geral">Geral</option>
          <option value="regional">Regional</option>
          <option value="sedacao">Sedação</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Riscos e Complicações
        </label>
        <textarea
          name="risks"
          value={formData.risks}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Observações Adicionais
        </label>
        <textarea
          name="observations"
          value={formData.observations}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-[#144A36] text-white py-2 px-4 rounded hover:bg-opacity-90"
        >
          Gerar PDF
        </button>
      </div>
    </form>
  );
}

FormAnestesia.propTypes = {
  animalData: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    tutorName: PropTypes.string,
    tutorCpf: PropTypes.string,
  }).isRequired,
};
