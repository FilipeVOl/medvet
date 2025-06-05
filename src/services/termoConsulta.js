import axios from 'axios';

const API_URL = 'http://localhost:3333';

/**
 * Recupera todos os termos de consulta cadastrados
 * 
 * @param {Function} setData - Função para atualizar o estado com os dados
 * @returns {Promise<Array>} Array de termos de consulta
 */
export const getAllTermosConsulta = async (setData) => {
  try {
    const { data } = await axios.get(`${API_URL}/termos-consulta`);
    if (setData) setData(data);
    return data;
  } catch (error) {
    console.error("Erro ao buscar termos de consulta:", error);
    throw error;
  }
};

/**
 * Busca um termo de consulta pelo ID
 * @param {string} id - ID do termo
 * @returns {Promise<Object>} Dados do termo
 */
export const getTermoConsultaById = async (id) => {
  try {
    const { data } = await axios.get(`${API_URL}/termos-consulta/${id}`);
    return data;
  } catch (error) {
    console.error(`Erro ao buscar termo de consulta ${id}:`, error);
    throw error;
  }
};

/**
 * Cria um novo termo de consulta
 * @param {Object} termoData - Dados do termo de consulta
 * @returns {Promise<Object>} Termo criado
 */
export const createTermoConsulta = async (termoData) => {
  try {
    const response = await axios.post(`${API_URL}/termos-consulta`, termoData);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar termo de consulta:", error);
    throw error;
  }
};

/**
 * Obtém o PDF de um termo de consulta pelo ID
 * @param {string} id - ID do termo
 * @returns {Promise<Blob>} Blob do PDF
 */
export const getTermoConsultaPdf = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/termos-consulta/${id}/pdf`, {
      responseType: 'blob'
    });
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar PDF do termo de consulta ${id}:`, error);
    throw error;
  }
};

/**
 * Exclui um termo de consulta pelo ID
 * @param {string} id - ID do termo
 * @returns {Promise<void>}
 */
export const deleteTermoConsulta = async (id) => {
  try {
    await axios.delete(`${API_URL}/termos-consulta/${id}`);
  } catch (error) {
    console.error(`Erro ao excluir termo de consulta ${id}:`, error);
    throw error;
  }
};
