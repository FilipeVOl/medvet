import axios from "axios";

const getProfessores = async (set, page) => {
    try {
       await axios.get(`http://localhost:3333/get/teacher?numberOfItems=5&page=${page}`)
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

const getAllTeachers = async (set) => {
  try {
    const { data } = await axios.get('http://localhost:3333/get/teacher?numberOfItems=5&page=1')
    set(data.teacher)
    return data
    } catch (e) {
      console.error('Erro ao buscar todos os professores', e)
    }
}

const getProfById = (set, id) => {
  try {
      axios.get(`http://localhost:3333/get/teacher/id/${id}`)
      .then(response => {
      })
      .catch(error => {
        console.error('Não acessou os profesores no banco', error);
      });
  } catch(e) {
      console.log(e, 'Problema na requisição de professores pelo id.');
  }
}


const getTeacherByName = async (name) => {
  try {
    const { data } = await axios.get(`http://localhost:3333/get/teacher/name?q=${name}`)
    return data.teacher
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
};

const getProfByReg = async (registration) => {
  try {
    const { data } = await axios.get(
      `http://localhost:3333/get/teacher/registration?q=${registration}&page=1`
    );
    return data;
  } catch (error) {
    console.error("Erro ao filtrar professores");
  }
};

const patchProf = async (set, id, toast) => {
  try {
  const response = await axios
    .patch("http://localhost:3333/delete/teacher", {
        id,
    })
    set(response.data)
    toast(true)
    console.log(response.data)
  } catch (error) {
      console.log(error);
    };
};




export const getTeacherid = async (teacherId) => {
  try {
      const  response= await axios.get(`http://localhost:3333/get/teacher/id/${teacherId}`)
      const data = response.data; 
      return data;
    } catch (error) {
      console.error(error)
      throw new Error('Problema na requisição de teacher id')
    }
};


export { getProfessores, getAllTeachers, getTeacherByName, postProf, PutProf, getProfByReg, patchProf }
