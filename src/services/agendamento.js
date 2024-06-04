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

function getConsults(setOne, setTwo) {
  axios.get('http://localhost:3333/get/consults')
      .then(response => {
        setOne(response.data);
        setTwo(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
}

export { CreateConsult, ConsultTutorExist, getConsults }
