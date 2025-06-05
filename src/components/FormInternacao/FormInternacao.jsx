import { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

export default function FormInternacao({ animalData }) {  const [formData, setFormData] = useState({
    nomeResponsavel: animalData.tutorName || '',
    cpf: animalData?.tutorData?.cpf || localStorage.getItem('tutorCpf') || '',
    telefone: animalData?.tutorData?.phone || localStorage.getItem('tutorPhone') || '',
    motivoInternacao: '',
    dataEntrada: new Date().toISOString().split('T')[0], 
    dataPrevistaSaida: '',
    observacoes: '',
    permissaoMedica: false, 
    data: new Date().toLocaleDateString('pt-BR')
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const formPayload = {
        ...formData,
        animalId: animalData.id,
        animalName: animalData.name
      };

      const response = await axios.post(
        'http://localhost:3333/generate/termo-internacao-pdf',
        formPayload,
        { 
          responseType: 'blob',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.status === 200) {
        const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
        const pdfUrl = window.URL.createObjectURL(pdfBlob);
        window.open(pdfUrl);
        window.URL.revokeObjectURL(pdfUrl);
        alert('Termo de internação gerado com sucesso!');
      } else {
        throw new Error('Erro ao gerar PDF');
      }
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      setError('Erro ao gerar o PDF. Por favor, verifique os dados e tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Termo de Responsabilidade - Internação</h3>
        <p className="text-gray-600 mb-4">Animal: {animalData.name}</p>
        {error && (
          <p className="text-red-500 mb-4">{error}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Nome do Responsável
          </label>
          <input
            type="text"
            name="nomeResponsavel"
            value={formData.nomeResponsavel}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            CPF do Responsável
          </label>
          <input
            type="text"
            name="cpf"
            value={formData.cpf}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Data de Entrada
          </label>
          <input
            type="date"
            name="dataEntrada"
            value={formData.dataEntrada}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Previsão de Alta
          </label>
          <input
            type="date"
            name="dataPrevistaSaida"
            value={formData.dataPrevistaSaida}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Motivo da Internação
        </label>
        <textarea
          name="motivoInternacao"
          value={formData.motivoInternacao}
          onChange={handleChange}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
        />
      </div>      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Observações
        </label>
        <textarea
          name="observacoes"
          value={formData.observacoes}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
        />
      </div>

      <div className="mb-4">
        <label className="flex items-center text-gray-700 text-sm font-bold mb-2">
          <input
            type="checkbox"
            name="permissaoMedica"
            checked={formData.permissaoMedica}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              permissaoMedica: e.target.checked
            }))}
            className="mr-2 h-4 w-4"
          />
          Incluir informações médicas detalhadas no documento
        </label>
        <p className="text-sm text-gray-500 mt-1">
          Quando marcado, detalhes sobre o motivo da internação e observações clínicas serão visíveis no documento.
        </p>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="bg-[#144A36] text-white py-2 px-4 rounded hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Gerando PDF...' : 'Gerar PDF'}
        </button>
      </div>
    </form>
  );
}

FormInternacao.propTypes = {
  animalData: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    tutorName: PropTypes.string,
    tutorCpf: PropTypes.string,
  }).isRequired,
};
