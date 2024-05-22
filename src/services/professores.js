import axios from "axios";

export const getProfessores = (set) => {
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


export const getTeacherByName = (set, name) => {
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