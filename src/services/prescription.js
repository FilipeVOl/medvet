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

export default postPrescription;