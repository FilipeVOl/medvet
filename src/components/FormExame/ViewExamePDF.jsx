import { useState } from 'react';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import { downloadExamePDF } from '../../services/exames';

/**
 * Componente de botão para visualizar o PDF de um exame
 * @param {Object} props - Propriedades do componente
 * @param {string} props.exameId - ID do exame
 * @param {string} props.buttonText - Texto do botão
 * @param {string} props.buttonClass - Classes CSS adicionais para o botão
 * @returns {JSX.Element} Botão de visualização de PDF
 */
export default function ViewExamePDF({ exameId, buttonText = 'Visualizar PDF', buttonClass = '' }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleViewPDF = async () => {
    if (!exameId) {
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'ID do exame não fornecido.',
        confirmButtonColor: '#144A36',
      });
      return;
    }

    setIsLoading(true);

    // Mostra um indicador de carregamento
    const loadingToast = Swal.fire({
      title: 'Carregando PDF...',
      text: 'Aguarde enquanto o PDF é preparado.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
    
    // Timeout para caso o servidor demore muito para responder
    const pdfTimeout = setTimeout(() => {
      loadingToast.close();
      setIsLoading(false);
      Swal.fire({
        icon: 'error',
        title: 'Tempo esgotado',
        text: 'O servidor demorou muito para responder. Tente novamente mais tarde.',
        confirmButtonColor: '#144A36',
      });
    }, 20000); // 20 segundos de timeout
    
    try {
      // Abre o PDF em uma nova aba
      const pdfWindow = window.open(`http://localhost:3333/get/exame/${exameId}/pdf`, '_blank');
      
      // Verifica se o PDF foi bloqueado pelo navegador
      if (!pdfWindow || pdfWindow.closed || typeof pdfWindow.closed === 'undefined') {
        clearTimeout(pdfTimeout);
        loadingToast.close();
        setIsLoading(false);
        
        Swal.fire({
          icon: 'warning',
          title: 'Pop-up bloqueado',
          text: 'O navegador bloqueou a abertura do PDF. Verifique suas configurações ou faça o download.',
          confirmButtonColor: '#144A36',
          showConfirmButton: true,
          confirmButtonText: 'Baixar PDF',
          showCancelButton: true,
          cancelButtonText: 'Fechar',
        }).then((downloadResult) => {
          if (downloadResult.isConfirmed) {
            downloadExamePDF(exameId);
          }
        });
      } else {
        // PDF abriu com sucesso, limpa o timeout
        clearTimeout(pdfTimeout);
        loadingToast.close();
        setIsLoading(false);
      }
    } catch (error) {
      clearTimeout(pdfTimeout);
      loadingToast.close();
      setIsLoading(false);
      console.error('Erro ao abrir PDF:', error);
      
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
          downloadExamePDF(exameId);
        }
      });
    }
  };

  return (
    <button
      type="button"
      className={`flex items-center px-4 py-2 bg-[#144A36] text-white rounded hover:bg-opacity-90 ${buttonClass}`}
      onClick={handleViewPDF}
      disabled={isLoading}
    >
      {isLoading ? (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      )}
      {buttonText}
    </button>
  );
}

ViewExamePDF.propTypes = {
  exameId: PropTypes.string.isRequired,
  buttonText: PropTypes.string,
  buttonClass: PropTypes.string,
};
