import axios from "axios"

export const getProntuario = async (id) => {
  try {
    const response = await axios.get(`http://localhost:3333/get/animal/id/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Problema na requisição de prontúario');
  }
}