import axios from "axios";

const postPrescription = async (prescription) => {
  try {
    const res = await axios.post("http://localhost:3333/create/prescription", prescription);
    console.log(res);
    return res.data; 
  } catch (err) {
    console.log(err);
    throw err; 
  }
}
const getPrescription = async (id) => {
  try {
    const { data } = await axios.get(`http://localhost:3333/get/prescription/id/${id}`);
    return data;
  } catch (error) {
    console.error('Erro ao buscar prescrição:', error);
    throw error;
  }
} 

const getPrescByAnimalId = async (id) => {
  try {
    const { data } = await axios
      .get(`http://localhost:3333/get/prescription/animalId/${id}`);
    return data; 
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