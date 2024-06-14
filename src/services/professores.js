import axios from "axios";

const getProfessores = (set) => {
    try {
        axios.get('http://localhost:3333/get/teacher?numberOfItems=5&page=1')
        .then(response => {
          set(response.data);
        })
        .catch(error => {
          console.error('Não acessou os profesores no banco', error);
        });
    } catch(e) {
        console.log(e, 'Problema na requisição de all professores.');
    }
}


const getTeacherByName = (set, name) => {
  try {
      axios.get(`http://localhost:3333/get/teacher/name?q=${name}`)
      .then(response => {
        set(response.data.teachers);
      })
      .catch(error => {
        console.error('Não acessou os profesores no banco', error);
      });
  } catch(e) {
      console.log(e, 'Problema na requisição de professores pelo nome.');
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
