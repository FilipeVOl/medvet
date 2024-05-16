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

function ConsultTutorExist(id, consult) {
  axios
    .post(`http://localhost:3333/create/consults/${id}`, consult)
    .then((response) => {
      console.log(response)
    })
    .catch((error) => {
      console.error("Error fetching number:", error);
    })
}

export { CreateConsult, ConsultTutorExist }
