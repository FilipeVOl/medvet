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
        console.log(e, 'Problema na requisição de tutor por ID.');
    }
}


export const getTutores = (set) => {
    try {
        axios.get('http://localhost:3333/get/tutor?numberOfItems=5&page=1')
            .then(response => {
                set(response.data);
            })
            .catch(error => {
                console.error('Não acessou os tutores no banco', error);
            });
    } catch (e) {
        console.log(e, 'Problema na requisição de tutores.');
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

export const getTutoresByName = async (set, params) => {
    try {
        const tutorByName = await axios.get(`http://localhost:3333/get/tutor/name?q=${params}`);
        console.log(tutorByName.data.tutors)
        set(tutorByName.data.tutors);
    } catch (e) {
        console.log(e, 'ERRO NO BUSCAR POR NOME DO TUTOR');
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
      return error
    });
}

export const getAnimalsByTutorName = async (name) => {
  try {
    const { data} = await axios.get(`http://localhost:3333/get/animal/tutor/name/${name}`);
    return data.map((item) => {
      return item.animals.map((animal) => ({
        tutor_name: item.name,
        animal_name: animal.name,
        animal_id: animal.id,
      }));
    }).flat();
  } catch (error) {
    console.error(error);
  }
}

export const getAnimalsReceipt = async (setOne, setTwo, name) => {
  try {
    const {data } = await axios.get(`http://localhost:3333/get/animal/tutor/name/${name}`);
    setOne(data);
    setTwo(data[0].animals);
  } catch (error) {
    console.error("Error fetching animals:", error);
  }
}

export const PutTutor = (att) => {
    axios
      .put("http://localhost:3333/put/tutor", att)
      .then((response) => {
        console.log(response.data)
      })
        .catch((error) => {
          console.error("Error updating data:", error)
        })
  }
