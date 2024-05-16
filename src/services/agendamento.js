import axios from "axios";

function CreateConsult(consulta) {
  axios
    .post("http://localhost:3333/create/consults", consulta)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
}

export default CreateConsult;
