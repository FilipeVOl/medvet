import axios from "axios";

 const postPrescription = (prescription) => {
  axios
    .post("http://localhost:3333/create/prescription", prescription)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

const getPrescription = async (prescription, id) => {
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