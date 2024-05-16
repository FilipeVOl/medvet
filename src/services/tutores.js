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
        console.log(e, 'Problema na requisição de profesor.');
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

export const getTutoresByName = (set, params) => {
    try {
        axios.get(`http://localhost:3333/get/tutor/name${params}`)
            .then(response => {
                set(response.data);
            })
            .catch(error => {
                console.error('ERRO NO BUSCAR POR NOME DO PROFESSOR', error);
            });
    } catch (e) {
        console.log(e, 'ERRO NO BUSCAR POR NOME DO PROFESSOR');
    }
}