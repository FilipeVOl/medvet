import axios from 'axios'

const API_URL = 'http://localhost:3333'

/**
 * Busca todos os exames solicitados para um animal específico
 * @param {string} animalId - ID do animal
 * @returns {Promise<Array>} Lista de exames do animal
 */
export const getExamesByAnimalId = async (animalId) => {
  try {
    const { data } = await axios.get(`${API_URL}/get/exames/animal/${animalId}`)
    return data
  } catch (error) {
    console.error(`Erro ao buscar exames do animal ${animalId}:`, error)
    throw error
  }
}

/**
 * Busca todas as internações de um animal específico
 * @param {string} animalId - ID do animal
 * @returns {Promise<Array>} Lista de internações do animal
 */
export const getInternacoesAnimalId = async (animalId) => {
  try {
    const { data } = await axios.get(`${API_URL}/get/termos-internacao/animal/${animalId}`)
    return data
  } catch (error) {
    console.error(`Erro ao buscar internações do animal ${animalId}:`, error)
    throw error
  }
}

/**
 * Lista todas as solicitações (exames, internação, termo consulta, receitas)
 * @param {function} setData - Função para atualizar o estado com os dados
 * @returns {Promise<Array>} Lista consolidada de solicitações
 */
export const listarTodasSolicitacoes = async (setData) => {
  try {
    console.log('Iniciando busca de solicitações...');
      // Buscar as diferentes tipos de solicitações em paralelo
    const [examesResponse, internacaoResponse, termoConsultaResponse, prescricoesResponse] = 
      await Promise.allSettled([
        axios.get(`${API_URL}/get/exames`),
        axios.get(`${API_URL}/get/termos-internacao`),
        axios.get(`${API_URL}/get/termos-consulta`),
        axios.get(`${API_URL}/get/prescriptions`)
      ]);
    
    // Processar exames - verificar se os dados existem antes de usar .map()
    const exames = (examesResponse.status === 'fulfilled' && examesResponse.value?.data) 
      ? examesResponse.value.data.map(exame => ({
          id: exame.id,
          type: 'exame',
          animalId: exame.animalId,
          animalName: '', // Precisamos buscar do animal
          tutorName: '', // Precisamos buscar do tutor
          dataSolicitacao: exame.dataSolicitacao,
          exames: listarExamesSolicitados(exame),
          originalData: exame
        })) 
      : [];
    
    // Processar termos de internação - verificar se os dados existem antes de usar .map()
    const internacoes = (internacaoResponse.status === 'fulfilled' && internacaoResponse.value?.data)
      ? internacaoResponse.value.data.map(termo => ({
          id: termo.id,
          type: 'internacao',
          animalId: termo.animalId,
          animalName: '', // Precisamos buscar do animal
          tutorName: termo.nomeResponsavel,
          dataSolicitacao: termo.createdAt,
          reason: termo.motivoInternacao,
          originalData: termo
        }))
      : [];
    
    // Processar prescrições - verificar se os dados existem antes de usar .map()
    const prescricoes = (prescricoesResponse.status === 'fulfilled' && prescricoesResponse.value?.data)
      ? prescricoesResponse.value.data.map(prescricao => ({
          id: prescricao.id,
          type: 'receita',
          animalId: prescricao.animal_id, // Campo corrigido para animal_id
          animalName: '', // Precisamos buscar do animal
          tutorName: '', // Precisamos buscar do tutor
          dataSolicitacao: prescricao.created_at, // Campo corrigido para created_at
          medicamentos: prescricao.medications?.map(med => med.name) || [],
          teacherId: prescricao.teacher_id, // Adicionado o campo do professor
          originalData: prescricao
        }))
      : [];
        // Processar termos de consulta - verificar se os dados existem antes de usar .map()
    const termosConsulta = (termoConsultaResponse.status === 'fulfilled' && termoConsultaResponse.value?.data)
      ? termoConsultaResponse.value.data.map(termo => ({
          id: termo.id,
          type: 'consulta',
          animalId: termo.animalId,
          animalName: '', // Precisamos buscar do animal
          tutorName: termo.nomeResponsavel,
          dataSolicitacao: termo.createdAt,
          diagnostico: termo.diagnostico,
          originalData: termo
        }))
      : [];
            const solicitacoes = [...exames, ...internacoes, ...termosConsulta, ...prescricoes]
      .sort((a, b) => {
        const dateA = a.dataSolicitacao ? new Date(a.dataSolicitacao) : new Date(0);
        const dateB = b.dataSolicitacao ? new Date(b.dataSolicitacao) : new Date(0);
        
        if (isNaN(dateA.getTime())) return 1;
        if (isNaN(dateB.getTime())) return -1;
        
        return dateB - dateA; 
      })
      .slice(0, 20); 
    
    try {
      await enriquecerSolicitacoesComInfosAnimais(solicitacoes);
    } catch (err) {
      console.warn('Erro ao enriquecer solicitações com dados de animais:', err);
    }
    
    if (setData) setData(solicitacoes);
    return solicitacoes;
  } catch (error) {
    console.error('Erro ao listar solicitações:', error);
    throw error;
  }
};

/**
 * Função auxiliar para extrair os exames solicitados
 * @param {Object} exame - Dados do exame
 * @returns {Array} Lista de exames solicitados
 */
function listarExamesSolicitados(exame) {
  if (!exame) return [];
  
  const examesSolicitados = [];
  
  if (exame.hemograma) examesSolicitados.push('Hemograma');
  if (exame.pesquisaHemoparasitas) examesSolicitados.push('Pesquisa de Hemoparasitas');
  if (exame.altTGP) examesSolicitados.push('ALT/TGP');
  if (exame.astTGO) examesSolicitados.push('AST/TGO');
  if (exame.fosfataseAlcalina) examesSolicitados.push('Fosfatase Alcalina');
  if (exame.ureia) examesSolicitados.push('Ureia');
  if (exame.creatinina) examesSolicitados.push('Creatinina');
  if (exame.citologiaMicroscopiaDireta) examesSolicitados.push('Citologia - Microscopia Direta');
  if (exame.citologiaMicroscopiaCorada) examesSolicitados.push('Citologia - Microscopia Corada');
  if (exame.pesquisaEctoparasitas) examesSolicitados.push('Pesquisa de Ectoparasitas');
  if (exame.urinaliseEAS) examesSolicitados.push('Urinálise (EAS)');
  if (exame.urinaliseSedimento) examesSolicitados.push('Sedimento Urinário');
  if (exame.radiografiaSimples) examesSolicitados.push('Radiografia Simples');
  if (exame.radiografiaContrastada) examesSolicitados.push('Radiografia Contrastada');
  if (exame.ultrassonografia) examesSolicitados.push('Ultrassonografia');
  if (exame.ultrassonografiaDoppler) examesSolicitados.push('Ultrassonografia Doppler');
  if (exame.culturaBacteriana) examesSolicitados.push('Cultura Bacteriana');
  if (exame.culturaFungica) examesSolicitados.push('Cultura Fúngica');
  if (exame.testeAntimicrobianos) examesSolicitados.push('Teste de Antimicrobianos');
  
  return examesSolicitados;
}

/**
 * Busca informações adicionais dos animais para enriquecer as solicitações
 * @param {Array} solicitacoes - Lista de solicitações
 */
async function enriquecerSolicitacoesComInfosAnimais(solicitacoes) {
  if (!solicitacoes || !Array.isArray(solicitacoes) || solicitacoes.length === 0) {
    return;
  }

  // Extrair IDs únicos dos animais
  const animalIds = [...new Set(solicitacoes.map(s => s?.animalId).filter(Boolean))];
  
  if (animalIds.length === 0) {
    console.warn('Nenhum ID de animal válido encontrado nas solicitações');
    return;
  }
  
  // Buscar informações dos animais em lote
  for (const animalId of animalIds) {
    try {
      console.log(`Buscando informações do animal ${animalId}`);
      const { data: animal } = await axios.get(`${API_URL}/get/animal/id/${animalId}`);
      
      if (animal) {
        console.log('Animal encontrado:', animal);
        // Atualizar todas as solicitações deste animal
        solicitacoes.forEach(solicitacao => {
          if (solicitacao && solicitacao.animalId === animalId) {
            solicitacao.animalName = animal.name || animal.nome || 'Nome não disponível';
            
            // Buscar informações do tutor
            if (animal.tutor_id) {
              solicitacao.tutorId = animal.tutor_id;
              
              // Tentar buscar dados do tutor
              axios.get(`${API_URL}/get/tutor/${animal.tutor_id}`)
                .then(({ data: tutor }) => {
                  if (tutor) {
                    solicitacao.tutorName = tutor.name || tutor.nome || 'Nome não disponível';
                  }
                })
                .catch(err => {
                  console.warn(`Erro ao buscar tutor ${animal.tutor_id}:`, err);
                });
            } else if (animal.tutorName) {
              solicitacao.tutorName = animal.tutorName;
            } else if (animal.tutor && animal.tutor.name) {
              solicitacao.tutorName = animal.tutor.name;
            }
          }
        });
      }
    } catch (err) {
      console.warn(`Não foi possível obter informações do animal ${animalId}:`, err);
    }
  }
}



/**
 * Cria uma nova solicitação de exame
 * @param {Object} exameData - Dados do exame
 * @returns {Promise<Object>} Exame criado
 */
export const createExame = async (exameData) => {
  try {
    const { data } = await axios.post(`${API_URL}/create/exame`, exameData);
    return data;
  } catch (error) {
    console.error('Erro ao criar solicitação de exame:', error);
    throw error;
  }
};

/**
 * Atualiza uma solicitação de exame existente
 * @param {string} id - ID do exame
 * @param {Object} exameData - Dados atualizados do exame
 * @returns {Promise<Object>} Exame atualizado
 */
export const updateExame = async (id, exameData) => {
  try {
    const { data } = await axios.put(`${API_URL}/update/exame/${id}`, exameData);
    return data;
  } catch (error) {
    console.error(`Erro ao atualizar exame ${id}:`, error);
    throw error;
  }
};

/**
 * Exclui uma solicitação de exame
 * @param {string} id - ID do exame
 * @returns {Promise<void>}
 */
export const deleteExame = async (id) => {
  try {
    await axios.delete(`${API_URL}/delete/exame/${id}`);
  } catch (error) {
    console.error(`Erro ao excluir exame ${id}:`, error);
    throw error;
  }
};
