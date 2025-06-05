import axios from "axios";

const API_URL = "http://localhost:3333";

/**
 * Recupera todos os termos de anestesia cadastrados
 * @param {function} setData - Função para atualizar o estado com os dados
 * @returns {Promise<Array>} Array de termos de anestesia
 */
export const getAllTermosAnestesia = async (setData) => {
  try {
    const { data } = await axios.get(`${API_URL}/get/termos-anestesia`);
    if (setData) setData(data);
    return data;
  } catch (error) {
    console.error("Erro ao buscar termos de anestesia:", error);
    throw error;
  }
};

/**
 * Busca um termo de anestesia pelo ID
 * @param {string} id - ID do termo
 * @returns {Promise<Object>} Dados do termo
 */
export const getTermoAnestesiaById = async (id) => {
  try {
    const { data } = await axios.get(`${API_URL}/get/termo-anestesia/${id}`);
    return data;
  } catch (error) {
    console.error(`Erro ao buscar termo de anestesia ${id}:`, error);
    throw error;
  }
};

/**
 * Cria um novo termo de autorização de anestesia
 * @param {Object} termoData - Dados do termo de anestesia
 * @param {File} pdfFile - Arquivo PDF para anexar (opcional)
 * @returns {Promise<Object>} Termo criado
 */
export const createTermoAnestesia = async (termoData, pdfFile = null) => {
  try {
    if (pdfFile) {
      // Se tiver arquivo, usamos FormData
      const formData = new FormData();
      
      // Adicionamos o arquivo PDF
      formData.append("pdf", pdfFile);
      
      // Adicionamos os outros campos
      Object.keys(termoData).forEach(key => {
        formData.append(key, termoData[key]);
      });
      
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      
      const { data } = await axios.post(`${API_URL}/create/termo-anestesia`, formData, config);
      return data;
    } else {
      const { data } = await axios.post(`${API_URL}/create/termo-anestesia`, termoData);
      return data;
    }
  } catch (error) {
    console.error("Erro ao criar termo de anestesia:", error);
    throw error;
  }
};

/**
 * Baixa o PDF de um termo de anestesia
 * @param {string} id - ID do termo
 */
export const downloadTermoAnestesiaPDF = async (id) => {
  try {
    // Configurando para receber blob (arquivo binário)
    const response = await axios.get(`${API_URL}/get/termo-anestesia/${id}/pdf`, {
      responseType: "blob",
    });
    
    // Criando URL para o arquivo
    const url = window.URL.createObjectURL(new Blob([response.data]));
    
    // Criando link para download e clicando automaticamente
    const link = document.createElement("a");
    link.href = url;
    
    // Nome do arquivo usando o Content-Disposition ou um padrão
    const contentDisposition = response.headers["content-disposition"];
    const fileName = contentDisposition
      ? contentDisposition.split("filename=")[1].replace(/"/g, "")
      : `termo-anestesia-${id}.pdf`;
      
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    
    // Removendo o link e liberando a URL
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error(`Erro ao baixar PDF do termo de anestesia ${id}:`, error);
    throw error;
  }
};

/**
 * Atualiza um termo de anestesia existente
 * @param {string} id - ID do termo
 * @param {Object} termoData - Dados atualizados
 * @param {File} pdfFile - Opcional: novo PDF
 * @returns {Promise<Object>} Termo atualizado
 */
export const updateTermoAnestesia = async (id, termoData, pdfFile = null) => {
  try {
    if (pdfFile) {
      // Se tiver arquivo, usamos FormData
      const formData = new FormData();
      
      // Adicionamos o arquivo PDF
      formData.append("pdf", pdfFile);
      
      // Adicionamos os outros campos
      Object.keys(termoData).forEach(key => {
        formData.append(key, termoData[key]);
      });
      
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      
      const { data } = await axios.put(`${API_URL}/update/termo-anestesia/${id}`, formData, config);
      return data;
    } else {
      const { data } = await axios.put(`${API_URL}/update/termo-anestesia/${id}`, termoData);
      return data;
    }
  } catch (error) {
    console.error(`Erro ao atualizar termo de anestesia ${id}:`, error);
    throw error;
  }
};

/**
 * Exclui um termo de anestesia
 * @param {string} id - ID do termo
 * @returns {Promise<void>}
 */
export const deleteTermoAnestesia = async (id) => {
  try {
    await axios.delete(`${API_URL}/delete/termo-anestesia/${id}`);
  } catch (error) {
    console.error(`Erro ao excluir termo de anestesia ${id}:`, error);
    throw error;
  }
};
