import axios from "axios";

const getProfessores = (set) => {
    try {
      const { data } = await axios.get('http://localhost:3333/get/teacher?numberOfItems=5&page=1')
      set(data)
      return data
    } catch(e) {
      return 'Problema na requisição de pegar todos os professores.'
    }
}

const getTeacherByName = (set, name) => {
  try {
    const { data } = await axios.get(`http://localhost:3333/get/teacher/name?q=${name}`)
    set(data.teachers)
    return data.teachers
  } catch(e) {
    return 'Problema na requisição de professores pelo nome.'
  }
}

function postProf(data) {
  axios
    .post("http://localhost:3333/users/teacher", data)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
}

const PutProf = (att) => {
  axios
    .put("http://localhost:3333/put/teacher", att)
    .then((response) => {
      console.log(response.data)
    })
      .catch((error) => {
        console.error("Error fetching data:", error)
      })
}

const getProfByReg = (set, registration) => {
  axios
    .get(
      `http://localhost:3333/get/teacher/registration?q=${registration}&page=1`
    )
    .then((response) => {
      set(response.data);
      console.log(response.data);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}


export { getProfessores, getTeacherByName, postProf, PutProf, getProfByReg }
