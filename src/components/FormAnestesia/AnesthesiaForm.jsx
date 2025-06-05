import { useState } from 'react';
import { createTermoAnestesia } from '../../services/termoAnestesia';

/**
 * Componente de formulário para termo de autorização para anestesia
 * @param {Object} props - Propriedades do componente
 * @param {Object} props.animal - Dados do animal selecionado
 * @param {Function} props.onSuccess - Função a ser chamada após envio com sucesso
 * @returns {JSX.Element} Formulário de autorização para anestesia
 */
const AnesthesiaForm = ({ animal, onSuccess }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    nomeResponsavel: '',
    cpf: '',
    endereco: '',
    animalId: animal?.id || '',
    procedimento: '',
    riscos: '',
    autorizaTransfusao: false,
    autorizaReanimacao: true,
  });

  const [pdfFile, setPdfFile] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setPdfFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Enviar dados para API com ou sem PDF
      const result = await createTermoAnestesia(formData, pdfFile);
      
      setIsSubmitting(false);
      
      // Notifica sucesso e limpa o formulário
      if (onSuccess) {
        onSuccess(result);
      }
      
      // Reset form
      setFormData({
        nomeResponsavel: '',
        cpf: '',
        endereco: '',
        animalId: animal?.id || '',
        procedimento: '',
        riscos: '',
        autorizaTransfusao: false,
        autorizaReanimacao: true,
      });
      setPdfFile(null);
      
    } catch (error) {
      console.error('Erro ao enviar termo de anestesia:', error);
      setIsSubmitting(false);
      // Tratamento de erro
    }
  };

  // Função para formatar CPF automaticamente
  const formatCPF = (value) => {
    value = value.replace(/\D/g, ''); // Remove caracteres não numéricos
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    return value;
  };

  // Handler especial para CPF formatado
  const handleCPFChange = (e) => {
    const formatted = formatCPF(e.target.value);
    setFormData({
      ...formData,
      cpf: formatted,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Autorização para Procedimento Anestésico</h2>
      
      {/* Informações do animal */}
      <div className="mb-4">
        <p className="font-medium text-gray-700">Paciente: <span className="font-normal">{animal?.nome || 'Não selecionado'}</span></p>
        {animal?.especie && (
          <p className="font-medium text-gray-700">Espécie: <span className="font-normal">{animal.especie}</span></p>
        )}
      </div>
      
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Nome do Responsável</label>
        <input
          type="text"
          name="nomeResponsavel"
          value={formData.nomeResponsavel}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">CPF</label>
        <input
          type="text"
          name="cpf"
          value={formData.cpf}
          onChange={handleCPFChange}
          placeholder="000.000.000-00"
          maxLength="14"
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Endereço</label>
        <input
          type="text"
          name="endereco"
          value={formData.endereco}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Procedimento</label>
        <input
          type="text"
          name="procedimento"
          value={formData.procedimento}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          placeholder="Ex: Cirurgia para remoção de tumor"
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Riscos e Complicações</label>
        <textarea
          name="riscos"
          value={formData.riscos}
          onChange={handleChange}
          rows="3"
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Descreva os riscos e possíveis complicações do procedimento..."
          required
        ></textarea>
      </div>
      
      {/* Opções de autorização */}
      <div className="mb-6 border-t border-b py-4">
        <h3 className="font-medium mb-3 text-gray-800">Autorizações</h3>
        
        <div className="flex items-center mb-3">
          <input
            type="checkbox"
            id="autorizaTransfusao"
            name="autorizaTransfusao"
            checked={formData.autorizaTransfusao}
            onChange={handleChange}
            className="mr-2"
          />
          <label htmlFor="autorizaTransfusao" className="text-gray-700">
            Autorizo transfusão de sangue caso necessário
          </label>
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="autorizaReanimacao"
            name="autorizaReanimacao"
            checked={formData.autorizaReanimacao}
            onChange={handleChange}
            className="mr-2"
          />
          <label htmlFor="autorizaReanimacao" className="text-gray-700">
            Autorizo tentativas de reanimação em caso de parada cardiorrespiratória
          </label>
        </div>
      </div>
      
      {/* Upload de PDF opcional */}
      <div className="mb-6">
        <label className="block text-gray-700 mb-2">Anexar PDF (opcional)</label>
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="text-xs text-gray-500 mt-1">Anexe um documento PDF com detalhes adicionais, se necessário.</p>
      </div>
      
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {isSubmitting ? 'Enviando...' : 'Gerar Autorização de Anestesia'}
        </button>
      </div>
    </form>
  );
};

export default AnesthesiaForm;
