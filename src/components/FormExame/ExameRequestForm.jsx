import { useState } from 'react';
import { createExameWithPDF, createExame } from '../../services/exames';

/**
 * Componente de formulário para solicitação de exames
 * @param {Object} props - Propriedades do componente
 * @param {Object} props.animal - Dados do animal selecionado
 * @param {Function} props.onSuccess - Função a ser chamada após envio com sucesso
 * @returns {JSX.Element} Formulário de solicitação de exame
 */
const ExameRequestForm = ({ animal, onSuccess }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);  const [formData, setFormData] = useState({
    animalId: animal?.id || '',
    solicitanteId: '', // ID do médico/funcionário logado
    situacao: 'PENDENTE',
    dataSolicitacao: new Date().toISOString().split('T')[0],
    
    // Hematologia
    hemograma: false,
    pesquisaHemoparasitas: false,
    metodoHemoparasita: '',
    outroHemotologia: '',
    
    // Bioquímicos
    altTGP: false,
    astTGO: false,
    fosfataseAlcalina: false,
    ureia: false,
    creatinina: false,
    outrosExamesBioquimicos: '',
    
    // Citologia
    citologiaMicroscopiaDireta: false,
    citologiaMicroscopiaCorada: false,
    pesquisaEctoparasitas: false,
    outroCitologiaGeral: '',
    
    // Urinálise
    urinaliseEAS: false,
    urinaliseSedimento: false,
    urinaliseOutroMetodo: '',
    
    // Exame Coproparasitológico
    coproMetodo: '',
    coproWilishowsky: false,
    coproHoffmann: false,
    coproMcMaster: false,
    coproOutro: '',
    
    // Radiografia
    radiografiaSimples: false,
    radiografiaContrastada: false,
    outroRadiografia: '',
    regiaoRadiografia: '',
    posicao1: '',
    posicao2: '',
    
    // Ultrassonografia
    ultrassonografia: false,
    ultrassonografiaDoppler: false,
    outroUltrassonografia: '',
    
    // Outros exames
    culturaBacteriana: false,
    culturaFungica: false,
    testeAntimicrobianos: false,
    outrosExames: '',
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
      // Decide se envia com ou sem PDF
      let result;
      if (pdfFile) {
        result = await createExameWithPDF(formData, pdfFile);
      } else {
        result = await createExame(formData);
      }

      setIsSubmitting(false);
      
      // Notifica sucesso e limpa o formulário
      if (onSuccess) {
        onSuccess(result);
      }
        // Reset form
      setFormData({
        animalId: animal?.id || '',
        solicitanteId: '',
        situacao: 'PENDENTE',
        dataSolicitacao: new Date().toISOString().split('T')[0],
        
        // Hematologia
        hemograma: false,
        pesquisaHemoparasitas: false,
        metodoHemoparasita: '',
        outroHemotologia: '',
        
        // Bioquímicos
        altTGP: false,
        astTGO: false,
        fosfataseAlcalina: false,
        ureia: false,
        creatinina: false,
        outrosExamesBioquimicos: '',
        
        // Citologia
        citologiaMicroscopiaDireta: false,
        citologiaMicroscopiaCorada: false,
        pesquisaEctoparasitas: false,
        outroCitologiaGeral: '',
        
        // Urinálise
        urinaliseEAS: false,
        urinaliseSedimento: false,
        urinaliseOutroMetodo: '',
        
        // Exame Coproparasitológico
        coproMetodo: '',
        coproWilishowsky: false,
        coproHoffmann: false,
        coproMcMaster: false,
        coproOutro: '',
        
        // Radiografia
        radiografiaSimples: false,
        radiografiaContrastada: false,
        outroRadiografia: '',
        regiaoRadiografia: '',
        posicao1: '',
        posicao2: '',
        
        // Ultrassonografia
        ultrassonografia: false,
        ultrassonografiaDoppler: false,
        outroUltrassonografia: '',
        
        // Outros exames
        culturaBacteriana: false,
        culturaFungica: false,
        testeAntimicrobianos: false,
        outrosExames: '',
      });
      setPdfFile(null);
      
    } catch (error) {
      console.error('Erro ao enviar solicitação:', error);
      setIsSubmitting(false);
      // Tratamento de erro (poderia mostrar um toast ou mensagem)
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Solicitação de Exame</h2>
      
      {/* Informações do animal */}
      <div className="mb-4">
        <p className="font-medium text-gray-700">Paciente: <span className="font-normal">{animal?.nome || 'Não selecionado'}</span></p>
        {animal?.especie && (
          <p className="font-medium text-gray-700">Espécie: <span className="font-normal">{animal.especie}</span></p>
        )}
      </div>
      
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Data da Solicitação</label>
        <input
          type="date"
          name="dataSolicitacao"
          value={formData.dataSolicitacao}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>      {/* Opção para upload de PDF com solicitação pronta */}
      <div className="mb-6 border-t pt-4">
        <h3 className="font-medium mb-3 text-gray-800">Ou envie um PDF com solicitação já pronta</h3>
        <input
          type="file"
          onChange={handleFileChange}
          accept="application/pdf"
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-6 border-t pt-4">
        <h3 className="font-medium mb-3 text-gray-800 text-lg">Exames Solicitados</h3>
        
        {/* Hematologia */}
        <div className="mb-4">
          <h4 className="font-medium text-gray-700 mb-2 border-b pb-1">Hematologia</h4>
          <div className="grid grid-cols-2 gap-4">            <div className="flex items-center">
              <input
                type="checkbox"
                id="hemograma"
                name="hemograma"
                checked={formData.hemograma}
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor="hemograma" className="text-gray-700">Hemograma</label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="pesquisaHemoparasitas"
                name="pesquisaHemoparasitas"
                checked={formData.pesquisaHemoparasitas}
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor="pesquisaHemoparasitas" className="text-gray-700">Pesquisa de Hemoparasitas</label>
            </div>
          </div>
          
          {formData.pesquisaHemoparasitas && (
            <div className="mt-2 ml-4">
              <label className="block text-gray-700 mb-1">Método</label>
              <input
                type="text"
                name="metodoHemoparasita"
                value={formData.metodoHemoparasita}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}
          
          <div className="mt-2">
            <label className="block text-gray-700 mb-1">Outros exames hematológicos</label>
            <input
              type="text"
              name="outroHemotologia"
              value={formData.outroHemotologia}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        
        {/* Exames Bioquímicos */}
        <div className="mb-4">
          <h4 className="font-medium text-gray-700 mb-2 border-b pb-1">Bioquímicos</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="altTGP"
                name="altTGP"
                checked={formData.altTGP}
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor="altTGP" className="text-gray-700">ALT/TGP</label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="astTGO"
                name="astTGO"
                checked={formData.astTGO}
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor="astTGO" className="text-gray-700">AST/TGO</label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="fosfataseAlcalina"
                name="fosfataseAlcalina"
                checked={formData.fosfataseAlcalina}
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor="fosfataseAlcalina" className="text-gray-700">Fosfatase Alcalina</label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="ureia"
                name="ureia"
                checked={formData.ureia}
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor="ureia" className="text-gray-700">Ureia</label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="creatinina"
                name="creatinina"
                checked={formData.creatinina}
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor="creatinina" className="text-gray-700">Creatinina</label>
            </div>
          </div>
          
          <div className="mt-2">
            <label className="block text-gray-700 mb-1">Outros exames bioquímicos</label>
            <input
              type="text"
              name="outrosExamesBioquimicos"
              value={formData.outrosExamesBioquimicos}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        
        {/* Citologia */}
        <div className="mb-4">
          <h4 className="font-medium text-gray-700 mb-2 border-b pb-1">Citologia</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="citologiaMicroscopiaDireta"
              name="pesquisaHemoparasitas"
              checked={formData.pesquisaHemoparasitas}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="pesquisaHemoparasitas" className="text-gray-700">Pesquisa de Hemoparasitas</label>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="altTGP"
              name="altTGP"
              checked={formData.altTGP}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="altTGP" className="text-gray-700">ALT (TGP)</label>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="ureia"
              name="ureia"
              checked={formData.ureia}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="ureia" className="text-gray-700">Ureia</label>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="creatinina"
              name="creatinina"
              checked={formData.creatinina}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="creatinina" className="text-gray-700">Creatinina</label>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="citologiaMicroscopiaDireta"
              name="citologiaMicroscopiaDireta"
              checked={formData.citologiaMicroscopiaDireta}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="citologiaMicroscopiaDireta" className="text-gray-700">Citologia (Microscopia Direta)</label>
          </div>
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
          {isSubmitting ? 'Enviando...' : 'Solicitar Exame'}
        </button>
      </div>
    </form>
  );
};

export default ExameRequestForm;
