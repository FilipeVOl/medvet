import axios from "axios";

const API_URL = "http://localhost:3333";

/**
 * Recupera todos os exames cadastrados
 * @param {function} setData - Função para atualizar o estado com os dados
 * @returns {Promise<Array>} Array de exames
 */
export const getAllExames = async (setData) => {
  try {
    const { data } = await axios.get(`${API_URL}/get/exames`);
    if (setData) setData(data);
    return data;
  } catch (error) {
    console.error("Erro ao buscar exames:", error);
    throw error;
  }
};

/**
 * Busca um exame pelo ID
 * @param {string} id - ID do exame
 * @returns {Promise<Object>} Dados do exame
 */
export const getExameById = async (id) => {
  try {
    const { data } = await axios.get(`${API_URL}/get/exame/${id}`);
    return data;
  } catch (error) {
    console.error(`Erro ao buscar exame ${id}:`, error);
    throw error;
  }
};

/**
 * Cria um novo exame sem arquivos PDF
 * @param {Object} exameData - Dados do exame
 * @returns {Promise<Object>} Exame criado
 */
export const createExame = async (exameData) => {
  try {
    const { data } = await axios.post(`${API_URL}/create/exame`, exameData);
    return data;
  } catch (error) {
    console.error("Erro ao criar exame:", error);
    throw error;
  }
};

/**
 * Cria um exame com arquivo PDF anexado
 * @param {Object} exameData - Dados do formulário de exame
 * @param {File} pdfFile - Arquivo PDF para anexar
 * @returns {Promise<Object>} Exame criado com PDF
 */
export const createExameWithPDF = async (exameData, pdfFile) => {
  try {
    // Criamos um FormData para enviar o arquivo
    const formData = new FormData();
    
    // Adicionamos o arquivo PDF
    formData.append("pdf", pdfFile);
    
    // Adicionamos os outros campos como JSON
    Object.keys(exameData).forEach(key => {
      formData.append(key, exameData[key]);
    });
    
    // Configuramos o axios para enviar formData com o tipo correto
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    
    const { data } = await axios.post(`${API_URL}/create/exame`, formData, config);
    return data;
  } catch (error) {
    console.error("Erro ao criar exame com PDF:", error);
    throw error;
  }
};

/**
 * Baixa o PDF de um exame
 * @param {string} id - ID do exame
 */
export const downloadExamePDF = async (id) => {
  try {
    // Configurando para receber blob (arquivo binário)
    const response = await axios.get(`${API_URL}/get/exame/${id}/pdf`, {
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
      : `exame-${id}.pdf`;
      
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    
    // Removendo o link e liberando a URL
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error(`Erro ao baixar PDF do exame ${id}:`, error);
    throw error;
  }
};

/**
 * Atualiza um exame existente
 * @param {string} id - ID do exame
 * @param {Object} exameData - Dados atualizados
 * @param {File} pdfFile - Opcional: Arquivo PDF para anexar/atualizar
 * @returns {Promise<Object>} Exame atualizado
 */
export const updateExame = async (id, exameData, pdfFile = null) => {
  try {
    if (pdfFile) {
      // Se tiver arquivo, usamos FormData
      const formData = new FormData();
      
      // Adicionamos o arquivo PDF
      formData.append("pdf", pdfFile);
      
      // Adicionamos os outros campos como JSON
      Object.keys(exameData).forEach(key => {
        formData.append(key, exameData[key]);
      });
      
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      
      const { data } = await axios.put(`${API_URL}/update/exame/${id}`, formData, config);
      return data;
    } else {
      // Se não tiver arquivo, enviamos apenas JSON
      const { data } = await axios.put(`${API_URL}/update/exame/${id}`, exameData);
      return data;
    }
  } catch (error) {
    console.error(`Erro ao atualizar exame ${id}:`, error);
    throw error;
  }
};

/**
 * Exclui um exame
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
