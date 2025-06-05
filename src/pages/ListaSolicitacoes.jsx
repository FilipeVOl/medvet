import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import BiotechIcon from '@mui/icons-material/Biotech';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import AssignmentIcon from '@mui/icons-material/Assignment';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import ReceiptIcon from '@mui/icons-material/Receipt';
import MedicationIcon from '@mui/icons-material/Medication';
import { listarTodasSolicitacoes } from '../services/solicitacoes';
import { getAnimalBySequenceOrName } from '../services/animals';
import { useEntityData } from '../hooks/useEntityData';

const API_URL = "http://localhost:3333";

export default function ListaSolicitacoes() {
  const [solicitacoes, setSolicitacoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const { enrichSolicitacao } = useEntityData();
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchSolicitacoes = async () => {
      try {
        setLoading(true);
        
        try {
          const data = await listarTodasSolicitacoes();
          
          if (data && data.length > 0) {
            
            const enrichedData = [];
            for (const solicitacao of data) {
              try {
                const enriched = await enrichSolicitacao(solicitacao);
                if (enriched) enrichedData.push(enriched);
              } catch (enrichErr) {
                console.warn(`Erro ao enriquecer solicitação ${solicitacao.id}:`, enrichErr);
                enrichedData.push(solicitacao);
              }
            }
            
            console.log('Dados enriquecidos:', enrichedData);
            setSolicitacoes(enrichedData);
            setLoading(false);
            return;
          } else {
            console.warn('API retornou dados vazios ou inválidos');
          }
        } catch (apiErr) {
          console.warn('Erro ao buscar solicitações da API:', apiErr);
          console.error('Erro detalhado da API:', apiErr);
          
          const mockData = [
            {
              id: '1',
              type: 'exame',
              animalName: 'Rex (Mock)',
              animalId: '101',
              tutorName: 'João Silva (Mock)',
              dataSolicitacao: '2023-06-01T14:00:00Z',
              exames: ['Hemograma', 'Urinalise']
            },
            {
              id: '2',
              type: 'internacao',
              animalName: 'Luna',
              animalId: '102',
              tutorName: 'Maria Oliveira',
              dataSolicitacao: '2023-06-02T10:30:00Z',
              status: 'aprovado',
              reason: 'Recuperação pós-cirúrgica'
            },
            {
              id: '3',
              type: 'exame',
              animalName: 'Bella',
              animalId: '103',
              tutorName: 'Pedro Santos',
              dataSolicitacao: '2023-06-01T09:15:00Z',
              status: 'concluido',
              exames: ['Radiografia', 'Ultrassonografia']
            },
            {
              id: '4',
              type: 'anestesia',
              animalName: 'Thor',
              animalId: '104',
              tutorName: 'Ana Ferreira',
              dataSolicitacao: '2023-06-03T11:45:00Z',
              status: 'pendente',
              procedure: 'Cirurgia ortopédica'
            },            {
              id: '5',
              type: 'receita',
              animalName: 'Max',
              animalId: '105',
              tutorName: 'Carla Mendes',
              dataSolicitacao: '2023-06-04T09:00:00Z',
              status: 'pendente',
              medicamentos: ['Amoxicilina 250mg', 'Dipirona 500mg']
            },
            {
              id: '6',
              type: 'receita',
              animalName: 'Nina',
              animalId: '106',
              tutorName: 'Roberto Alves',
              dataSolicitacao: '2023-06-03T15:30:00Z',
              status: 'concluido',
              medicamentos: ['Meloxican 0.5mg', 'Vitamina C 500mg']
            }
          ];
          
          setSolicitacoes(mockData);
          setLoading(false);
        }
      } catch (err) {
        setError('Erro ao carregar solicitações');
        setLoading(false);
        console.error(err);
      }
    };

    fetchSolicitacoes();
  }, []);
  
  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!searchTerm || searchTerm.length < 2) {
      return;
    }
    
    try {
      setLoading(true);
      
      const animaisEncontrados = await getAnimalBySequenceOrName(searchTerm);
      
      if (animaisEncontrados && animaisEncontrados.length > 0) {
        const animalIds = animaisEncontrados.map(animal => animal.animal_id || animal.id);
        
        const solicitacoesFiltradas = solicitacoes.filter(
          sol => animalIds.includes(sol.animalId)
        );
        
        if (solicitacoesFiltradas.length > 0) {
          setSolicitacoes(solicitacoesFiltradas);
        } else {
          alert(`Nenhuma solicitação encontrada para o(s) animal(is) com o termo "${searchTerm}"`);
        }
      } else {
        alert(`Nenhum animal encontrado com o termo "${searchTerm}"`);
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Erro ao buscar solicitações:', error);
      setLoading(false);
    }
  };
  
  const filteredSolicitacoes = solicitacoes.filter(item => {
    const matchesType = filterType === 'all' || item.type === filterType;
    const matchesSearch = searchTerm === '' || 
      (item.animalName && item.animalName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.tutorName && item.tutorName.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesType && matchesSearch;
  });
  
  const getIcon = (type) => {
    switch (type) {
      case 'exame': return <BiotechIcon />;
      case 'internacao': return <LocalHospitalIcon />;
      case 'anestesia': return <MedicationIcon />;
      case 'receita': return <ReceiptIcon />;
      default: return <AssignmentIcon />;
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
  const handleViewDetails = (item) => {
    try {
      setSelectedItem(item);
      
      let route = '';
      switch (item.type) {
        case 'exame':
          route = `/exames/detalhes/${item.id}`;
          break;
        case 'internacao':
          route = `/internacao/detalhes/${item.id}`;
          break;
        case 'anestesia':
          route = `/anestesia/detalhes/${item.id}`;
          break;
        case 'receita':
          if (item.animalId) {
            route = `/solicitacoes/${item.type}/${item.animalId}`;
          } else {
            route = `/receita/detalhes/${item.id}`;
          }
          break;
        default:
          console.warn('Tipo de solicitação desconhecido:', item.type);
          alert('Tipo de solicitação não suportado para visualização.');
          return;
      }
      
      
      if (route) {
        navigate(route);
      }
    } catch (error) {
      console.error('Erro ao navegar para detalhes:', error);
      alert('Ocorreu um erro ao tentar visualizar os detalhes.');
    }
  };
  
  const renderPdfButton = (item) => {
    const downloadPDF = async () => {
      try {
        
      
        let url = '';
        switch (item.type) {
          case 'exame':
            url = `/get/exame/${item.id}/pdf`;
            break;
          case 'internacao':
            url = `/get/termo-internacao/${item.id}/pdf`;
            break;
          case 'anestesia':
            url = `/get/termo-anestesia/${item.id}/pdf`;
            break;          case 'receita':
            url = `/pdf/prescription/${item.id}`;
            break;
          default:
            throw new Error('Tipo de solicitação inválido');
        }
        
        const token = localStorage.getItem('token');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        
        try {
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
          
          const fileName = `${item.type}_${item.id}.pdf`;          link.setAttribute('download', fileName);
          document.body.appendChild(link);
          link.click();
          link.remove();
        } else {
          console.error('A resposta não é um PDF válido:', contentType);
          alert('O documento retornado não é um PDF válido.');
        }
        } catch (innerError) {
          console.error('Erro ao processar PDF:', innerError);
          alert(`Erro ao processar o PDF: ${innerError.message}`);
        }
      } catch (error) {
        console.error('Erro ao baixar PDF:', error);
        console.error('Detalhes do erro:', error.response || error.message);
        alert(`Não foi possível baixar o PDF: ${error.message}. Verifique se o documento existe.`);
      }
    };
    
    return (
      <button 
        className="text-green-600 hover:text-green-800"
        onClick={downloadPDF}
      >
        Imprimir PDF
      </button>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl">Carregando solicitações...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-red-500">{error}</p>
      </div>
    );
  }
  
  return (
    <div className="font-Montserrat pl-14">
      <h1 className="p-14 h-10 text-2xl font-bold">Lista de Solicitações e Receitas</h1>
      <div className="flex justify-between items-center mb-8 px-14">
        <div className="flex space-x-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-md flex items-center"
          >
            <FilterListIcon className="mr-1" /> Filtros
          </button>
          <div className="relative inline-block">
            <button
              className="bg-[#144A36] text-white py-2 px-4 rounded-md hover:bg-opacity-90 flex items-center"
              onClick={() => {
                const dropdown = document.getElementById('newRequestDropdown');
                dropdown.classList.toggle('hidden');
              }}
            >
              Nova Solicitação <span className="ml-1">▼</span>
            </button>
            <div id="newRequestDropdown" className="hidden absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
              <div className="py-1">
                <button 
                  onClick={() => navigate('/exames')}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                >
                  <BiotechIcon fontSize="small" className="mr-2" /> Exames
                </button>
                <button 
                  onClick={() => navigate('/internacao')}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                >
                  <LocalHospitalIcon fontSize="small" className="mr-2" /> Internação
                </button>
                <button 
                  onClick={() => navigate('/anestesia')}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                >
                  <MedicationIcon fontSize="small" className="mr-2" /> Anestesia
                </button>
                <button 
                  onClick={() => navigate('/receita')}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                >
                  <ReceiptIcon fontSize="small" className="mr-2" /> Receita
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {showFilters && (
        <div className="bg-gray-100 p-4 rounded-md mb-6 mx-14">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2"
              >
                <option value="all">Todos</option>
                <option value="exame">Exames</option>
                <option value="internacao">Internação</option>
                <option value="anestesia">Anestesia</option>
                <option value="receita">Receitas</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Busca</label>
              <form onSubmit={handleSearch} className="flex">
                <input
                  type="text"
                  placeholder="Nome do animal ou ID"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full border border-gray-300 rounded-l-md p-2"
                />
                <button 
                  type="submit"
                  className="bg-[#144A36] text-white p-2 hover:bg-opacity-90"
                >
                  <SearchIcon />
                </button>
                {searchTerm && (
                  <button 
                    type="button"
                    onClick={async () => {
                      setSearchTerm('');
                      const data = await listarTodasSolicitacoes();
                      setSolicitacoes(data);
                    }}
                    className="bg-gray-200 text-gray-700 p-2 rounded-r-md hover:bg-gray-300"
                  >
                    ✕
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      )}
      
      {filteredSolicitacoes.length === 0 ? (
        <div className="text-center py-10 bg-white rounded-lg shadow mx-4 md:mx-14">
          <p className="text-gray-500">Nenhuma solicitação encontrada com os filtros selecionados.</p>
        </div>
      ) : (
        <div className="overflow-x-auto mx-4 md:mx-14">
          <div className="md:hidden mb-4">
            <p className="text-gray-500 text-sm italic">Deslize horizontalmente para ver todos os dados</p>
          </div>          <table className="min-w-full bg-white rounded-lg shadow">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-2 md:px-4 text-left">Tipo</th>
                <th className="py-3 px-2 md:px-4 text-left">Animal</th>
                <th className="py-3 px-2 md:px-4 text-left">Tutor</th>
                <th className="py-3 px-2 md:px-4 text-left">Data</th>
                <th className="py-3 px-2 md:px-4 text-left">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredSolicitacoes.map(item => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 flex items-center">
                    {getIcon(item.type)}                    <span className="ml-2">
                      {item.type === 'exame' ? 'Exames' : 
                       item.type === 'internacao' ? 'Internação' : 
                       item.type === 'anestesia' ? 'Anestesia' : 
                       item.type === 'receita' ? 'Receita' : 'Outro'}
                    </span>
                  </td>
                  <td className="py-3 px-4">{item.animalName || <span className="text-gray-400">Não disponível</span>}</td>
                  <td className="py-3 px-4">{item.tutorName || <span className="text-gray-400">Não disponível</span>}</td>
                  <td className="py-3 px-4">{formatDate(item.dataSolicitacao)}</td>
                  <td className="py-3 px-4">
                    <div className="flex flex-col md:flex-row md:space-x-2 space-y-2 md:space-y-0">
                      <button 
                        className="text-blue-600 hover:text-blue-800"
                        onClick={() => handleViewDetails(item)}
                      >
                        Visualizar
                      </button>
                      {renderPdfButton(item)}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
