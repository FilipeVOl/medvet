import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import BiotechIcon from '@mui/icons-material/Biotech';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import MedicationIcon from '@mui/icons-material/Medication';
import ReceiptIcon from '@mui/icons-material/Receipt';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const API_URL = "http://localhost:3333";

export default function DetalhesSolicitacao({ tipo: propTipo }) {
  const params = useParams();
  const { tipo = propTipo, id, animalId } = params;
  const [dados, setDados] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchDetalhes = async () => {
      try {
        setLoading(true);
        let endpoint = '';
        
        if (animalId) {
          try {
            const { data } = await axios.get(`${API_URL}/get/prescription/animalId/${animalId}`);
            
            const dadosProcessados = { ...data };
            
            if (data.prescriptions && data.prescriptions.length > 0) {
              dadosProcessados.prescriptions = data.prescriptions.map(presc => ({
                ...presc,
                medications: presc.medications?.map(med => ({
                  ...med,
                  use_type: med.useType || med.use_type || 'oral',
                  pharmacy: med.pharmacy || 'comum',
                  unit: med.unit || '0', 
                  measurement: med.measurement || 'Não informado',
                  description: med.description || 'Sem instruções',
                  // Mapear todas as variantes do campo de observação
                  observations: med.observations || med.observacao_medica || med.medical_observation,
                })) || []
              }));
            }
            
            setDados(dadosProcessados);
            setLoading(false);
            return;
          } catch (error) {
            console.error(`Erro ao buscar prescrições do animal ${animalId}:`, error);
          }
        }
        
        if (tipo === 'receita') {
          // Tentamos buscar usando id da prescrição
          try {
            if (id) {
              const { data } = await axios.get(`${API_URL}/get/prescription/id/${id}`);
              
              // Normaliza as medicações
              const dadosProcessados = { ...data };
              if (data.medications) {
                dadosProcessados.medications = data.medications.map(med => ({
                  ...med,
                  use_type: med.useType || med.use_type || 'oral',
                  pharmacy: med.pharmacy || 'comum',
                  unit: med.unit || '0',
                  measurement: med.measurement || 'Não informado',
                  description: med.description || 'Sem instruções',
                  observations: med.observations || med.observacao_medica || med.medical_observation,
                }));
              }
              
              if (data.animal_id) {
                try {
                  const { data: animalData } = await axios.get(`${API_URL}/get/animal/id/${data.animal_id}`);
                  if (animalData) {
                    dadosProcessados.animal = animalData;
                    dadosProcessados.animalName = animalData.name || animalData.nome;
                    
                    if (animalData.tutor_id) {
                      try {
                        const { data: tutorData } = await axios.get(`${API_URL}/get/tutor/${animalData.tutor_id}`);
                        if (tutorData) {
                          dadosProcessados.tutor = tutorData;
                          dadosProcessados.tutorName = tutorData.name || tutorData.nome;
                        }
                      } catch (err) {
                        console.warn('Erro ao buscar dados do tutor:', err);
                      }
                    }
                  }
                } catch (err) {
                  console.warn('Erro ao buscar dados do animal:', err);
                }
              }
              
              setDados(dadosProcessados);
              setLoading(false);
              return;
            }
          } catch (error) {
            console.warn('Erro ao buscar prescrição por ID, tentando outro método:', error);
            // Continuamos com o endpoint padrão
          }
          
          endpoint = `/get/prescription/id/${id}`;
        } else {
          // Para outros tipos, usamos o endpoint padrão
          switch (tipo) {
            case 'exames':
            case 'exame':
              endpoint = `/get/exame/${id}`;
              break;
            case 'internacao':
              endpoint = `/get/termo-internacao/${id}`;
              break;
            case 'anestesia':
              endpoint = `/get/termo-anestesia/${id}`;
              break;
            default:
              console.error('Tipo de solicitação inválido:', tipo);
              throw new Error('Tipo de solicitação inválido');
          }
        }
        
        
        // Add token for authorization if needed
        const token = localStorage.getItem('token');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        
        const { data } = await axios.get(`${API_URL}${endpoint}`, { headers });
        
        let dadosProcessados = { ...data };
        
        if (tipo === 'receita') {
          
          if (data.medications) {
            dadosProcessados.medications = data.medications.map(med => ({
              ...med,
              use_type: med.useType || med.use_type || 'oral',
              pharmacy: med.pharmacy || 'comum',
              unit: med.unit || '0',
              measurement: med.measurement || 'Não informado',
              description: med.description || 'Sem instruções',
              // Mapear todas as variantes do campo de observação
              observations: med.observations || med.observacao_medica || med.medical_observation,
            }));
          } else if (!dadosProcessados.medications) {
            dadosProcessados.medications = [];
          }
          
          if (!dadosProcessados.animalName && data.animal_id) {
            try {
              const { data: animalData } = await axios.get(`${API_URL}/get/animal/id/${data.animal_id}`, { headers });
              if (animalData) {
                dadosProcessados.animal = animalData;
                dadosProcessados.animalName = animalData.name || animalData.nome;
                
                if (animalData.tutor_id) {
                  try {
                    const { data: tutorData } = await axios.get(`${API_URL}/get/tutor/${animalData.tutor_id}`, { headers });
                    if (tutorData) {
                      dadosProcessados.tutor = tutorData;
                      dadosProcessados.tutorName = tutorData.name || tutorData.nome;
                    }
                  } catch (err) {
                    console.warn('Erro ao buscar dados do tutor:', err);
                  }
                }
              }
            } catch (err) {
              console.warn('Erro ao buscar dados do animal:', err);
            }
          }
        }
        
        setDados(dadosProcessados);
        setLoading(false);
      } catch (err) {
        console.error('Erro ao buscar detalhes:', err);
        setError(`Não foi possível carregar os dados: ${err.message}`);
        setLoading(false);
      }
    };
    
    fetchDetalhes();
  }, [tipo, id, animalId]);
  
  const getIcon = (type) => {
    switch (type) {
      case 'exames': return <BiotechIcon />;
      case 'internacao': return <LocalHospitalIcon />;
      case 'anestesia': return <MedicationIcon />;
      case 'receita': return <ReceiptIcon />;
      default: return null;
    }
  };
  
  const formatDate = (dateString) => {
    if (!dateString) return 'Data indisponível';
    
    try {
      const date = new Date(dateString);
      
      if (isNaN(date.getTime())) {
        return 'Data inválida';
      }
      
      const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
      return date.toLocaleDateString('pt-BR', options);
    } catch (err) {
      console.error('Erro ao formatar data:', dateString, err);
      return 'Data inválida';
    }
  };

  const downloadPDF = async (prescriptionId = null) => {
    try {
      let url = '';
      
      const pdfId = prescriptionId || id;
      
      if (!pdfId) {
        throw new Error('ID não disponível para download do PDF');
      }
      
      switch (tipo) {
        case 'exames':
        case 'exame':
          url = `/get/exame/${pdfId}/pdf`;
          break;
        case 'internacao':
          url = `/get/termo-internacao/${pdfId}/pdf`;
          break;
        case 'anestesia':
          url = `/get/termo-anestesia/${pdfId}/pdf`;
          break;
        case 'receita':
          url = `/pdf/prescription/${pdfId}`;
          break;
        default:
          console.error('Tipo de solicitação inválido para PDF:', tipo);
          throw new Error('Tipo de solicitação inválido');
      }
      
      const token = localStorage.getItem('token');
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      
      const response = await axios.get(`${API_URL}${url}`, { 
        responseType: 'blob',
        headers
      });
      
      const contentType = response.headers['content-type'];
      
      if (contentType && contentType.includes('application/pdf')) {
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        
        const fileName = `${tipo}_${pdfId}.pdf`;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
        link.remove();
        
        window.URL.revokeObjectURL(downloadUrl);
        
      } else {
        console.error('Conteúdo não é um PDF válido. Tipo:', contentType);
        alert('O documento retornado não é um PDF válido.');
      }
    } catch (error) {
      console.error('Erro ao baixar PDF:', error);
      console.error('Detalhes do erro:', error.response || error.message);
      alert(`Não foi possível baixar o PDF: ${error.message}. Verifique o console para mais detalhes.`);
    }
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl">Carregando detalhes...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="font-Montserrat p-6">
        <button 
          onClick={() => navigate('/solicitacoes')}
          className="flex items-center mb-4 text-blue-600 hover:text-blue-800"
        >
          <ArrowBackIcon className="mr-1" /> Voltar para a lista
        </button>
        
        <div className="bg-red-50 border border-red-200 rounded-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Erro</h2>
          <p className="text-red-700">{error}</p>
        </div>
      </div>
    );
  }
  
  const getTipoDisplay = () => {
    switch (tipo) {
      case 'exames': return 'Exame';
      case 'internacao': return 'Internação';
      case 'anestesia': return 'Anestesia';
      case 'receita': return 'Receita';
      default: return 'Solicitação';
    }
  };
  
  return (
    <div className="font-Montserrat p-8  pl-20">
      <button 
        onClick={() => navigate('/solicitacoes')}
        className="flex items-center mb-4 text-blue-600 hover:text-blue-800"
      >
        <ArrowBackIcon className="mr-1" /> Voltar para a lista
      </button>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center mb-4">
          {getIcon(tipo)}
          <h1 className="text-2xl font-semibold ml-2">Detalhes da {getTipoDisplay()}</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h2 className="text-lg font-medium text-gray-700 mb-2">Informações Gerais</h2>
            <div className="bg-gray-50 rounded p-4">
              <p className="mb-2"><strong>ID:</strong> {id}</p>
              <p className="mb-2"><strong>Tipo:</strong> {getTipoDisplay()}</p>
              <p className="mb-2">
                <strong>Data:</strong> {dados?.createdAt ? formatDate(dados.createdAt) : 
                                       dados?.created_at ? formatDate(dados.created_at) :
                                       dados?.dataSolicitacao ? formatDate(dados.dataSolicitacao) : 
                                       'Data não disponível'}
              </p>
              {dados?.status && (
                <p className="mb-2"><strong>Status:</strong> {dados.status}</p>
              )}
            </div>
          </div>
          
          <div>
            <h2 className="text-lg font-medium text-gray-700 mb-2">Animal e Responsável</h2>
            <div className="bg-gray-50 rounded p-4">
              <p className="mb-2">
                <strong>Animal:</strong> {dados?.animalName || dados?.animal?.name || 'Não informado'}
              </p>
              <p>
                <strong>Responsável:</strong> {dados?.tutorName || dados?.nomeResponsavel || 'Não informado'}
              </p>
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <h2 className="text-lg font-medium text-gray-700 mb-2">Detalhes Específicos</h2>
          <div className="bg-gray-50 rounded p-4">
            {tipo === 'exames' && (
              <>
                <h3 className="font-medium mb-2">Exames Solicitados:</h3>
                <ul className="list-disc pl-5">
                  {dados?.hemograma && <li>Hemograma</li>}
                  {dados?.pesquisaHemoparasitas && <li>Pesquisa de Hemoparasitas</li>}
                  {dados?.altTGP && <li>ALT/TGP</li>}
                  {dados?.astTGO && <li>AST/TGO</li>}
                  {dados?.fosfataseAlcalina && <li>Fosfatase Alcalina</li>}
                  {dados?.ureia && <li>Ureia</li>}
                  {dados?.creatinina && <li>Creatinina</li>}
                </ul>
              </>
            )}
            
            {tipo === 'internacao' && (
              <>
                <p className="mb-2"><strong>Motivo da Internação:</strong> {dados?.motivoInternacao || 'Não informado'}</p>
                <p className="mb-2"><strong>Diagnóstico:</strong> {dados?.diagnostico || 'Não informado'}</p>
                {dados?.observacoes && (
                  <p><strong>Observações:</strong> {dados.observacoes}</p>
                )}
              </>
            )}
            
            {tipo === 'anestesia' && (
              <>
                <p className="mb-2"><strong>Procedimento:</strong> {dados?.procedimento || 'Não informado'}</p>
                {dados?.observacoes && (
                  <p><strong>Observações:</strong> {dados.observacoes}</p>
                )}
              </>
            )}
            
            {tipo === 'receita' && (
              <>
                <h3 className="font-medium mb-2">Medicamentos:</h3>
                
                {dados?.prescriptions && dados.prescriptions.length > 0 ? (
                  <>
                    <div className="mb-4 bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <h3 className="text-blue-800 font-medium">Prescrições do Animal</h3>
                      <p className="text-sm text-blue-600 mb-2">
                        Exibindo {dados.prescriptions.length} prescrição(ões) para {dados.animal?.name || 'este animal'}
                      </p>
                    </div>
                    
                    {dados.prescriptions.map((prescription, prescIndex) => (
                      <div key={prescription.id} className="mb-6 border-b border-gray-300 pb-4">
                        <h4 className="font-medium text-gray-800 mb-2">
                          Prescrição #{prescIndex + 1} - {formatDate(prescription.createdAt)}
                        </h4>
                        
                        <ul className="list-none pl-0">
                          {prescription.medications && prescription.medications.length > 0 ? (
                            prescription.medications.map((med, index) => (
                              <li key={index} className="mb-4 bg-white p-3 rounded-md shadow-sm border border-gray-100">
                                <div className="font-semibold text-lg text-gray-800">
                                  {med.measurement || med.name || 'Medicamento sem nome'}
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                                  <div className="text-sm">
                                    <span className="text-gray-700 font-medium">Quantidade: </span> 
                                    <span className="text-gray-600">{med.unit || 'Não informada'} unidades</span>
                                  </div>
                                  <div className="text-sm">
                                    <span className="text-gray-700 font-medium">Tipo de uso: </span> 
                                    <span className="text-gray-600">{(med.use_type || med.useType || 'ORAL').toUpperCase()}</span>
                                  </div>
                                  <div className="text-sm">
                                    <span className="text-gray-700 font-medium">Farmácia: </span> 
                                    <span className="text-gray-600">{med.pharmacy || 'Farmácia comum'}</span>
                                  </div>
                                  {(med.type || med.useType) && (
                                    <div className="text-sm">
                                      <span className="text-gray-700 font-medium">Tipo de receita: </span> 
                                      <span className={`${(med.type === '2via' || med.useType === '2via') ? 'text-red-600 font-medium' : 'text-gray-600'}`}>
                                        {(med.type === '2via' || med.useType === '2via') ? 'CONTROLADO (2 VIAS)' : 'COMUM (1 VIA)'}
                                      </span>
                                    </div>
                                  )}
                                </div>
                                <div className="text-sm mt-3 bg-gray-50 p-2 rounded border border-gray-100">
                                  <div className="text-gray-700 font-medium mb-1">Posologia:</div>
                                  <div className="text-gray-600 whitespace-pre-wrap">{med.description || 'Não informada'}</div>
                                </div>
                                
                                {/* Exibição da observação médica */}
                                {(med.observations || med.observacao_medica || med.medical_observation) && (
                                  <div className="text-sm mt-3 bg-yellow-50 p-3 rounded border-l-4 border-yellow-300">
                                    <div className="text-yellow-800 font-medium mb-1">Observação Médica:</div>
                                    <div className="text-yellow-700 italic whitespace-pre-wrap">{med.observations || med.observacao_medica || med.medical_observation}</div>
                                  </div>
                                )}
                              </li>
                            ))
                          ) : (
                            <li className="text-gray-600 italic">Nenhum medicamento disponível nesta prescrição</li>
                          )}
                        </ul>
                        
                        <div className="mt-2 flex justify-end space-x-2">
                          <button 
                            onClick={() => {
                              navigate(`/receita/detalhes/${prescription.id}`);
                            }}
                            className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                          >
                            Ver detalhes
                          </button>
                          <button
                            onClick={() => downloadPDF(prescription.id)}
                            className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 flex items-center"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd" />
                            </svg>
                            PDF
                          </button>
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <ul className="list-none pl-0">
                    {dados?.medications && dados.medications.length > 0 ? (
                      dados.medications.map((med, index) => (
                        <li key={index} className="mb-4 bg-white p-3 rounded-md shadow-sm border border-gray-100">
                          <div className="font-semibold text-lg text-gray-800">
                            {med.measurement || med.name || 'Medicamento sem nome'}
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                            <div className="text-sm">
                              <span className="text-gray-700 font-medium">Quantidade: </span> 
                              <span className="text-gray-600">{med.unit || 'Não informada'} unidades</span>
                            </div>
                            <div className="text-sm">
                              <span className="text-gray-700 font-medium">Tipo de uso: </span> 
                              <span className="text-gray-600">{(med.use_type || med.useType || 'ORAL').toUpperCase()}</span>
                            </div>
                            <div className="text-sm">
                              <span className="text-gray-700 font-medium">Farmácia: </span> 
                              <span className="text-gray-600">{med.pharmacy || 'Farmácia comum'}</span>
                            </div>
                            {(med.type || med.useType) && (
                              <div className="text-sm">
                                <span className="text-gray-700 font-medium">Tipo de receita: </span> 
                                <span className={`${(med.type === '2via' || med.useType === '2via') ? 'text-red-600 font-medium' : 'text-gray-600'}`}>
                                  {(med.type === '2via' || med.useType === '2via') ? 'CONTROLADO (2 VIAS)' : 'COMUM (1 VIA)'}
                                </span>
                              </div>
                            )}
                          </div>
                          <div className="text-sm mt-3 bg-gray-50 p-2 rounded border border-gray-100">
                            <div className="text-gray-700 font-medium mb-1">Posologia:</div>
                            <div className="text-gray-600 whitespace-pre-wrap">{med.description || 'Não informada'}</div>
                          </div>
                          
                          {/* Exibição da observação médica */}
                          {(med.observations || med.observacao_medica || med.medical_observation) && (
                            <div className="text-sm mt-3 bg-yellow-50 p-3 rounded border-l-4 border-yellow-300">
                              <div className="text-yellow-800 font-medium mb-1">Observação Médica:</div>
                              <div className="text-yellow-700 italic whitespace-pre-wrap">{med.observations || med.observacao_medica || med.medical_observation}</div>
                            </div>
                          )}
                        </li>
                      ))
                    ) : dados?.medicamentos && dados.medicamentos.length > 0 ? (
                      dados.medicamentos.map((med, index) => (
                        <li key={index} className="mb-2">
                          <div className="bg-white p-2 rounded border border-gray-100">
                            {med}
                          </div>
                        </li>
                      ))
                    ) : (
                      <div className="bg-yellow-50 p-4 rounded-md border border-yellow-100">
                        <p className="text-yellow-700">Informações de medicamentos não disponíveis</p>
                        <div className="mt-2 text-sm text-gray-600">
                          <p>ID da Prescrição: {dados?.prescription_id || dados?.id || id}</p>
                          {(dados?.createdAt || dados?.created_at) && (
                            <p>Data de Criação: {formatDate(dados.createdAt || dados.created_at)}</p>
                          )}
                          {(dados?.teacher_id || dados?.teacherId) && (
                            <p>ID do Professor: {dados.teacher_id || dados.teacherId}</p>
                          )}
                        </div>
                      </div>
                    )}
                  </ul>
                )}
                
                {(!dados?.prescriptions || dados.prescriptions.length === 0) && (
                  <div className="flex justify-center mt-6">
                    <button
                      onClick={() => downloadPDF()}
                      className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd" />
                      </svg>
                      Baixar PDF da Receita
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        
        {tipo !== 'receita' && (
          <div className="flex justify-center mt-6">
            <button
              onClick={() => downloadPDF()}
              className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Imprimir PDF
            </button>
          </div>
        )}
      </div>
      
    
    </div>
  );
}