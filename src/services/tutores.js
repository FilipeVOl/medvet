import axios from "axios";

export const getTutorPatientById = (set, id) => {
    try {
        axios.get(`http://localhost:3333/get/animals/bytutor/${id}`)
            .then(response => {
                set(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    } catch (e) {
        console.log(e, 'Problema na requisição de profesor por ID.');
    }
}


export const getTutores = (set) => {
    try {
        axios.get('http://localhost:3333/get/tutor?numberOfItems=5&page=1')
            .then(response => {
                set(response.data);
            })
            .catch(error => {
                console.error('Não acessou os profesores no banco', error);
            });
    } catch (e) {
        console.log(e, 'Problema na requisição de professores.');
    }
}

export const postTutor = (consulta) => {
  axios
    .post("http://localhost:3333/tutor", consulta)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getTutoresByName = (set, params) => {
    try {
        axios.get(`http://localhost:3333/get/tutor/name?q=${params}`)
            .then(response => {
                set(response.data.tutors);
            })
            .catch(error => {
                console.error('ERRO NO BUSCAR POR NOME DO PROFESSOR', error);
            });
    } catch (e) {
        console.log(e, 'ERRO NO BUSCAR POR NOME DO PROFESSOR');
    }
}

export const getTutorByNumber = (number, set) => {
  axios
    .get(`http://localhost:3333/get/tutor/searchphone?q=${number}&page=1`)
    .then((response) => {
      set(response.data);
    })
    .catch((error) => {
      console.error("Error fetching number:", error);
    });
};

export const getAnimalsAndTutorByTutorName = (set, name) => {
    axios
    .get(`http://localhost:3333/get/animal/tutor/name/${name}`)
    .then((response) => {
      set(response.data);
    })
    .catch((error) => {
      console.error("Error fetching number:", error);
    });
}