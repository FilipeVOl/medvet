import axios from "axios";

const API_URL = "http://localhost:3333";

/**
 * Recupera todos os termos de internação cadastrados
 * @param {function} setData - Função para atualizar o estado com os dados
 * @returns {Promise<Array>} Array de termos de internação
 */
export const getAllTermosInternacao = async (setData) => {
  try {
    const { data } = await axios.get(`${API_URL}/get/termos-internacao`);
    if (setData) setData(data);
    return data;
  } catch (error) {
    console.error("Erro ao buscar termos de internação:", error);
    throw error;
  }
};

/**
 * Busca um termo de internação pelo ID
 * @param {string} id - ID do termo
 * @returns {Promise<Object>} Dados do termo
 */
export const getTermoInternacaoById = async (id) => {
  try {
    const { data } = await axios.get(`${API_URL}/get/termo-internacao/${id}`);
    return data;
  } catch (error) {
    console.error(`Erro ao buscar termo de internação ${id}:`, error);
    throw error;
  }
};

/**
 * Cria um novo termo de internação
 * @param {Object} termoData - Dados do termo de internação
 * @param {File} pdfFile - Arquivo PDF para anexar (opcional)
 * @returns {Promise<Object>} Termo criado
 */
export const createTermoInternacao = async (termoData, pdfFile = null) => {
  try {
    if (pdfFile) {
      // Se tiver arquivo, usamos FormData
      const formData = new FormData();
      
      // Adicionamos o arquivo PDF
      formData.append("pdf", pdfFile);
      
      // Adicionamos os outros campos 
      Object.keys(termoData).forEach(key => {
        // Precisamos tratar datas especialmente
        if (key === 'dataPrevistaSaida' && termoData[key] instanceof Date) {
          formData.append(key, termoData[key].toISOString());
        } else {
          formData.append(key, termoData[key]);
        }
      });
      
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      
      const { data } = await axios.post(`${API_URL}/create/termo-internacao`, formData, config);
      return data;
    } else {
      // Adaptação das datas para formato ISO
      const formattedData = { ...termoData };
      if (formattedData.dataPrevistaSaida instanceof Date) {
        formattedData.dataPrevistaSaida = formattedData.dataPrevistaSaida.toISOString();
      }
      
      const { data } = await axios.post(`${API_URL}/create/termo-internacao`, formattedData);
      return data;
    }
  } catch (error) {
    console.error("Erro ao criar termo de internação:", error);
    throw error;
  }
};

/**
 * Baixa o PDF de um termo de internação
 * @param {string} id - ID do termo
 */
export const downloadTermoInternacaoPDF = async (id) => {
  try {
    // Configurando para receber blob (arquivo binário)
    const response = await axios.get(`${API_URL}/get/termo-internacao/${id}/pdf`, {
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
      : `termo-internacao-${id}.pdf`;
      
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    
    // Removendo o link e liberando a URL
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error(`Erro ao baixar PDF do termo de internação ${id}:`, error);
    throw error;
  }
};

/**
 * Atualiza um termo de internação existente
 * @param {string} id - ID do termo
 * @param {Object} termoData - Dados atualizados
 * @param {File} pdfFile - Opcional: novo PDF
 * @returns {Promise<Object>} Termo atualizado
 */
export const updateTermoInternacao = async (id, termoData, pdfFile = null) => {
  try {
    if (pdfFile) {
      // Se tiver arquivo, usamos FormData
      const formData = new FormData();
      
      // Adicionamos o arquivo PDF
      formData.append("pdf", pdfFile);
      
      // Adicionamos os outros campos como JSON
      Object.keys(termoData).forEach(key => {
        // Precisamos tratar datas especialmente
        if (key === 'dataPrevistaSaida' && termoData[key] instanceof Date) {
          formData.append(key, termoData[key].toISOString());
        } else {
          formData.append(key, termoData[key]);
        }
      });
      
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      
      const { data } = await axios.put(`${API_URL}/update/termo-internacao/${id}`, formData, config);
      return data;
    } else {
      // Adaptação das datas para formato ISO
      const formattedData = { ...termoData };
      if (formattedData.dataPrevistaSaida instanceof Date) {
        formattedData.dataPrevistaSaida = formattedData.dataPrevistaSaida.toISOString();
      }
      
      const { data } = await axios.put(`${API_URL}/update/termo-internacao/${id}`, formattedData);
      return data;
    }
  } catch (error) {
    console.error(`Erro ao atualizar termo de internação ${id}:`, error);
    throw error;
  }
};

/**
 * Exclui um termo de internação
 * @param {string} id - ID do termo
 * @returns {Promise<void>}
 */
export const deleteTermoInternacao = async (id) => {
  try {
    await axios.delete(`${API_URL}/delete/termo-internacao/${id}`);
  } catch (error) {
    console.error(`Erro ao excluir termo de internação ${id}:`, error);
    throw error;
  }
};
