import { useState } from 'react';
import PropTypes from 'prop-types';
import { createExame, createExameWithPDF } from '../../services/exames';
import Swal from 'sweetalert2';

export default function FormExame({ animalData }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingPDF, setIsLoadingPDF] = useState(false);
  const [pdfFile, setPdfFile] = useState(null);  const [formData, setFormData] = useState({
    // Informações do formulário
    animalId: animalData?.id || null,
    dataSolicitacao: new Date().toISOString(),
    situacao: 'PENDENTE',
    reason: '',
    observations: '',

    // Hematologia
    hemograma: false,
    pesquisaHemoparasitas: false,
    outroHemotologiaAtivo: false,
    outroHemotologia: '',
    
    // Bioquímica sérica
    altTGP: false,
    astTGO: false,
    fosfataseAlcalina: false,
    ureia: false,
    creatinina: false,
    outrosExamesBioquimicosAtivo: false,
    outrosExamesBioquimicos: '',

    // Citologia Geral
    citologiaMicroscopiaDireta: false,
    citologiaMicroscopiaCorada: false,
    pesquisaEctoparasitas: false,
    amostraCitologiaGeral: '',
    outroCitologiaGeral: '',
    
    // Urinálise
    metodoDeColeta: '',
    urinaliseEAS: false,
    urinaliseSedimento: false,
    urinaliseOutroMetodoAtivo: false,
    urinaliseOutroMetodo: '',
    
    // Coproparasitológico
    coproWilishowsky: false, // Changed from coproWillis to match API
    coproHoffmann: false,
    coproMcMaster: false,
    coproExameDireto: false,
    coproOutroAtivo: false,
    coproOutro: '',
    
    // Radiografia
    radiografiaSimples: false,
    radiografiaContrastada: false,
    outroRadiografiaAtivo: false,
    outroRadiografia: '',
    regiaoRadiografia: '',
    posicao1: '',
    posicao2: '',
    
    // Ultrassonografia
    ultrassonografia: false,
    ultrassonografiaDoppler: false,
    outroUltrassonografiaAtivo: false,
    outroUltrassonografia: '',

    // Outros exames (Serviço terceirizado)
    culturaBacteriana: false,
    culturaFungica: false,
    testeAntimicrobianos: false,
    outrosExamesAtivo: false,
    outrosExames: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setPdfFile(e.target.files[0]);
    }
  };

  // Função para fazer download do PDF
  const downloadExamePDF = async (exameId) => {
    try {
      const response = await fetch(`http://localhost:3333/get/exame/${exameId}/pdf`);
      if (!response.ok) {
        throw new Error('Erro ao baixar PDF');
      }
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `exame_${exameId}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Erro ao baixar PDF:', error);
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'Não foi possível baixar o PDF. Tente novamente.',
        confirmButtonColor: '#144A36',
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      console.log('Animal data:', animalData); // Log para debug
      
      // Garantir que temos o ID do animal
      if (!animalData || !animalData.id) {
        throw new Error('ID do animal não fornecido');
      }
      
      const requestData = {
        ...formData,
        animalId: animalData.id.toString(),
        dataSolicitacao: new Date().toISOString(),
        situacao: 'PENDENTE',
      };
      
      let result;
      
      // Decide se envia com ou sem PDF
      if (pdfFile) {
        result = await createExameWithPDF(requestData, pdfFile);
      } else {
        result = await createExame(requestData);
      }

      setIsSubmitting(false);

      // Mostra uma mensagem de sucesso
      Swal.fire({
        icon: 'success',
        title: 'Solicitação de exame registrada com sucesso!',
        text: 'Um PDF da solicitação foi gerado.',
        showConfirmButton: true,
        confirmButtonText: 'Visualizar PDF',
        showCancelButton: true,
        cancelButtonText: 'Fechar',
        confirmButtonColor: '#144A36',
        cancelButtonColor: '#6B7280',
      }).then((resultSwal) => {
        // Baixa o PDF gerado se o usuário clicou em "Visualizar PDF"
        if (resultSwal.isConfirmed && result && result.id) {
          setIsLoadingPDF(true);
          
          // Mostra um indicador de carregamento
          const loadingToast = Swal.fire({
            title: 'Carregando PDF...',
            text: 'Aguarde enquanto o PDF é preparado.',
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading();
            }
          });
          
          // Tenta obter o PDF com timeout para não ficar travado infinitamente
          const pdfTimeout = setTimeout(() => {
            loadingToast.close();
            setIsLoadingPDF(false);
            Swal.fire({
              icon: 'error',
              title: 'Tempo esgotado',
              text: 'O servidor demorou muito para responder. Tente novamente mais tarde.',
              confirmButtonColor: '#144A36',
            });
          }, 20000); // 20 segundos de timeout
          
          try {
            // Abre o PDF em uma nova aba usando a URL correta
            const pdfWindow = window.open(`http://localhost:3333/get/exame/${result.id}/pdf`, '_blank');
            
            // Verifica se o PDF foi bloqueado pelo navegador
            if (!pdfWindow || pdfWindow.closed || typeof pdfWindow.closed === 'undefined') {
              clearTimeout(pdfTimeout);
              loadingToast.close();
              setIsLoadingPDF(false);
              
              Swal.fire({
                icon: 'warning',
                title: 'Pop-up bloqueado',
                text: 'O navegador bloqueou a abertura do PDF. Verifique suas configurações e tente novamente.',
                confirmButtonColor: '#144A36',
                showConfirmButton: true,
                confirmButtonText: 'Baixar PDF',
              }).then((downloadResult) => {
                if (downloadResult.isConfirmed) {
                  downloadExamePDF(result.id);
                }
              });
            } else {
              // PDF abriu com sucesso, limpa o timeout
              clearTimeout(pdfTimeout);
              loadingToast.close();
              setIsLoadingPDF(false);
            }
          } catch (pdfError) {
            clearTimeout(pdfTimeout);
            loadingToast.close();
            setIsLoadingPDF(false);
            console.error('Erro ao abrir PDF:', pdfError);
            
            Swal.fire({
              icon: 'error',
              title: 'Erro',
              text: 'Não foi possível abrir o PDF. Deseja fazer o download?',
              confirmButtonColor: '#144A36',
              showConfirmButton: true,
              confirmButtonText: 'Baixar PDF',
              showCancelButton: true,
              cancelButtonText: 'Fechar',
            }).then((downloadResult) => {
              if (downloadResult.isConfirmed) {
                downloadExamePDF(result.id);
              }
            });
          }
        }
      });
      
    } catch (error) {
      console.error('Erro ao enviar solicitação de exame:', error);
      setIsSubmitting(false);
      Swal.fire({
        icon: 'error',
        title: 'Erro!',
        text: 'Erro ao registrar solicitação de exame. Por favor, tente novamente.',
        confirmButtonColor: '#144A36',
      });
    }
  };

  const renderCheckboxGroup = (title, checkboxes) => (
    <div className="mb-6 border p-4 rounded-lg">
      <h4 className="font-semibold mb-3">{title}</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {checkboxes.map((checkbox) => (
          <div key={checkbox.name} className="flex items-center">
            <input
              type="checkbox"
              id={checkbox.name}
              name={checkbox.name}
              checked={formData[checkbox.name]}
              onChange={handleChange}
              className="h-4 w-4 text-[#144A36] border-gray-300 rounded focus:ring-[#144A36]"
            />
            <label htmlFor={checkbox.name} className="ml-2 block text-sm text-gray-900">
              {checkbox.label}
            </label>
          </div>
        ))}
        {checkboxes.find(c => c.additionalField) && (
          <div className="col-span-2 mt-2">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              {checkboxes.find(c => c.additionalField).additionalFieldLabel || "Outros"}
            </label>            <textarea
              name={checkboxes.find(c => c.additionalField).additionalField}
              value={formData[checkboxes.find(c => c.additionalField).additionalField]}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rows="3"
              placeholder="Descreva detalhadamente"
            />
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="container mx-auto p-6">
      {/* Hematologia */}
      {renderCheckboxGroup('Hematologia', [
        { name: 'hemograma', label: 'Hemograma' },
        { name: 'pesquisaHemoparasitas', label: 'Pesquisa de hemoparasitas' },
        { name: 'outroHemotologiaAtivo', label: 'Outro', additionalField: 'outroHemotologia' }
      ])}

      {/* Bioquímica sérica */}
      {renderCheckboxGroup('Bioquímica sérica', [
        { name: 'altTGP', label: 'Alt/TGP' },
        { name: 'astTGO', label: 'Ast/TGO' },
        { name: 'fosfataseAlcalina', label: 'Fosfatase Alcalina' },
        { name: 'ureia', label: 'Uréia' },
        { name: 'creatinina', label: 'Creatinina' },
        { name: 'outrosExamesBioquimicosAtivo', label: 'Outro', additionalField: 'outrosExamesBioquimicos' }
      ])}

      {/* Citologia Geral */}
      {renderCheckboxGroup('Citologia Geral', [
        { name: 'citologiaMicroscopiaDireta', label: 'Microscopia direta' },
        { name: 'citologiaMicroscopiaCorada', label: 'Microscopia corada' },
        { name: 'pesquisaEctoparasitas', label: 'Pesquisa de ectoparasitas' },
        { name: 'outroCitologiaGeral', label: 'Outro', additionalField: 'outroCitologiaGeral' }
      ])}
      {(formData.citologiaMicroscopiaDireta || formData.citologiaMicroscopiaCorada || 
        formData.pesquisaEctoparasitas || formData.outroCitologiaGeralAtivo) && (
        <div className="mb-6 px-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Amostra
          </label>          <textarea
            name="amostraCitologiaGeral"
            value={formData.amostraCitologiaGeral}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows="3"
            placeholder="Descreva a amostra detalhadamente"
          />
        </div>
      )}

      {/* Urinálise */}
      {renderCheckboxGroup('Urinálise', [
        { name: 'urinaliseEAS', label: 'EAS (Tiras reagente)' },
        { name: 'urinaliseSedimento', label: 'Sedimentoscopia' },
        { name: 'urinaliseOutroMetodoAtivo', label: 'Outro', additionalField: 'urinaliseOutroMetodo' }
      ])}
      {(formData.urinaliseEAS || formData.urinaliseSedimento || formData.urinaliseOutroMetodoAtivo) && (
        <div className="mb-6 px-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Método de coleta
          </label>          <textarea
            name="metodoDeColeta"
            value={formData.metodoDeColeta}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows="3"
            placeholder="Descreva o método de coleta detalhadamente"
          />
        </div>
      )}

      {/* Coproparasitológico */}
      {renderCheckboxGroup('Coproparasitológico', [
        { name: 'coproWilishowsky', label: 'Método de Willis (Flutuação)' },
        { name: 'coproHoffmann', label: 'Método de Hoffman (Sedimentação)' },
        { name: 'coproMcMaster', label: 'Método de McMaster (Quantitativo)' },
        { name: 'coproExameDireto', label: 'Exame direto' },
        { name: 'coproOutroAtivo', label: 'Outro', additionalField: 'coproOutro' }
      ])}

      {/* Radiografia */}
      {renderCheckboxGroup('Radiografia', [
        { name: 'radiografiaSimples', label: 'Radiografia simples' },
        { name: 'radiografiaContrastada', label: 'Radiografia contrastada' },
        { name: 'outroRadiografiaAtivo', label: 'Outro', additionalField: 'outroRadiografia' }
      ])}
      {(formData.radiografiaSimples || formData.radiografiaContrastada || formData.outroRadiografiaAtivo) && (
        <div className="space-y-4 mb-6 px-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Região
            </label>
            <input
              type="text"
              name="regiaoRadiografia"
              value={formData.regiaoRadiografia}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Ex: Tórax, Abdômen, etc."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Posição 1
            </label>
            <input
              type="text"
              name="posicao1"
              value={formData.posicao1}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Ex: Ventrodorsal, Laterolateral, etc."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Posição 2
            </label>
            <input
              type="text"
              name="posicao2"
              value={formData.posicao2}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Ex: Ventrodorsal, Laterolateral, etc."
            />
          </div>
        </div>
      )}

      {/* Ultrassonografia */}
      {renderCheckboxGroup('Ultrassonografia', [
        { name: 'ultrassonografia', label: 'Ultrassonografia' },
        { name: 'ultrassonografiaDoppler', label: 'Ultrassonografia com Doppler' },
        { name: 'outroUltrassonografiaAtivo', label: 'Outro', additionalField: 'outroUltrassonografia' }
      ])}

      {/* Outros (Serviço terceirizado) */}
      {renderCheckboxGroup('Outros (Serviço terceirizado)', [
        { name: 'culturaBacteriana', label: 'Cultura bacteriana' },
        { name: 'culturaFungica', label: 'Cultura fúngica' },
        { name: 'testeAntimicrobianos', label: 'Teste de susceptibilidade aos antimicrobianos' },
        { name: 'outrosExamesAtivo', label: 'Outro', additionalField: 'outrosExames' }
      ])}

      {/* Justificativa e Observações */}
      <div className="mb-6 border p-4 rounded-lg">
        <h4 className="font-semibold mb-3">Justificativa e Observações</h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Justificativa do Pedido
            </label>
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rows="3"
              placeholder="Descreva a justificativa para a solicitação dos exames"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Observações Adicionais
            </label>
            <textarea
              name="observations"
              value={formData.observations}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rows="3"
              placeholder="Adicione observações relevantes"
            />
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className={`px-4 py-2 bg-[#144A36] text-white rounded-md hover:bg-[#0d3526] focus:outline-none focus:ring-2 focus:ring-[#144A36] focus:ring-opacity-50 ${
            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? 'Enviando...' : 'Solicitar Exames'}
        </button>
      </div>
    </div>
  );
}

FormExame.propTypes = {
  animalData: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};