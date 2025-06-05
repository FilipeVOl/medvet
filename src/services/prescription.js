import axios from "axios";

const postPrescription = async (prescription) => {
  try {
    const res = await axios.post("http://localhost:3333/create/prescription", prescription);
    console.log(res);
    return res.data; // Retorna o id diretamente de res.data
  } catch (err) {
    console.log(err);
    throw err; // Lança o erro para tratamento em outro lugar, se necessário
  }
};

const getPrescription = async (id) => {
  try {
    console.log(`Buscando detalhes da prescrição com ID: ${id}`);
    const { data } = await axios.get(`http://localhost:3333/get/prescription/id/${id}`);
    console.log('Dados da prescrição recebidos:', data);
    return data;
  } catch (error) {
    console.error('Erro ao buscar prescrição:', error);
    throw error;
  }
} 

const getPrescByAnimalId = async (id) => {
  try {
    console.log(`Buscando prescrições para o animal ID: ${id}`);
    const { data } = await axios
      .get(`http://localhost:3333/get/prescription/animalId/${id}`);
    console.log('Dados retornados da API para animal+prescrições:', data);
    return data; // Retorna o objeto completo com animal e prescrições
  } catch (error) {
    console.error('Erro ao buscar prescrições do animal:', error);
    throw error;
  }
}

const getAllPresc = async () => {
  const { data } = await axios
    .get(`http://localhost:3333/get/prescriptions`)
    return data;
}

export { postPrescription, getPrescription, getAllPresc, getPrescByAnimalId };