import axios from "axios";

async function CreateConsult(consulta) {
    try {
      const data = await axios.post("http://localhost:3333/create/consults", consulta)
      return data;
  } catch (e) {
      console.log(e, 'FETCH ERRO: criar consulta');
  }
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

async function getConsults(setOne, setTwo) {
  try {
    const { data } = await axios.get('http://localhost:3333/get/consults')
    setOne(data);
    setTwo(data);
    return data
} catch (e) {
    console.log(e, 'Agendamento FETCH ERRO');
}
}

export { CreateConsult, ConsultTutorExist, getConsults }
