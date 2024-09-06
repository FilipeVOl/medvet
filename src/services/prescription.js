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
  const { data } = await axios
    .get(`http://localhost:3333/pdf/prescription/${id}`)
    return data;
} 

const getAllPresc = async () => {
  const { data } = await axios
    .get(`http://localhost:3333/get/prescriptions`)
    return data;
}

export { postPrescription, getPrescription, getAllPresc };