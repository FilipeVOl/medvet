import axios from "axios";

export const getTutorPatientById = async (set, id) => {
  try {
    const { data } = await axios.get(
      `http://localhost:3333/get/animals/bytutor/${id}`
    );
    set(data);
    return data;
  } catch (e) {
    console.log(e);
    throw new Error("Problema na requisição de tutor por ID.");
  }
};

export const getTutores = async (set, page) => {
  try {
    const { data } = await axios.get(
      `http://localhost:3333/get/tutor?numberOfItems=5&page=${page}`
    );
    set(data);
    return data;
  } catch (e) {
    console.log(e);
    throw new Error("Problema na requisição de todos os tutores.");
  }
};

export const getAllTutores = async (res) => {
  try {
    const { data } = await axios.get(
      "http://localhost:3333/get/tutor?numberOfItems=10000&page=1"
    );
    res(data.tutor);
    return data;
  } catch (e) {
    console.log(e);
    throw new Error("Problema na requisição de todos os tutores.");
  }
};

export const postTutor = async (consulta) => {
  try {
    const response = await axios.post("http://localhost:3333/tutor", consulta);
    if (response.status === 200) {
      return response.data;
    }
  } catch (e) {
    console.log(e);
    throw new Error("Problema na criação de tutores");
  }
};

// export const getTutoresByName = async (set, params) => {
//   try {
//     const { data } = await axios.get(
//       `http://localhost:3333/get/tutor/name?q=${params}`
//     );
//     set(data.tutors);
//     return data.tutors;
//   } catch (e) {
//     console.log(e);
//     throw new Error("Problema na requisição de tutores por nome.", e);
//   }
// };

export const getTutoresByName = async (set, params = "") => {
  try {
    const { data } = await axios.get(
      `http://localhost:3333/get/tutor/name?q=${params}`
    );
    console.log("tutores data:", data);
    set(data.tutors);
    return data.tutors;
  } catch (e) {
    console.log(e);
    throw new Error("Problema na requisição de tutores por nome.", e);
  }
};

// export const getTutorByNumber = async (tel) => {
//   try {
//     const { data } = await axios.get(
//       `http://localhost:3333/get/tutor/searchphone?q=${tel}`
//     );
//     console.log("data tutoprs aqui:", data.tutors);
//     return data.tutors;
//   } catch (e) {
//     console.log(e);
//     throw new Error("Problema na requisição de tutores por telefone.");
//   }
// };

export const getTutorByNumber = async (tel, page = 1, limit = 10) => {
  try {
    const { data } = await axios.get(
      `http://localhost:3333/get/tutor/searchphone?q=${tel}&page=${page}&limit=${limit}`
    );
    console.log("data tutores aqui:", data.tutors);
    return data; // Return the entire response, not just data.tutors
  } catch (e) {
    console.log(e);
    throw new Error("Problema na requisição de tutores por telefone.");
  }
};

export const getAnimalsAndTutorByTutorName = async (set, name) => {
  try {
    const { data } = await axios.get(
      `http://localhost:3333/get/animal/tutor/name/${name}`
    );
    console.log("data tutor e animal:", data);
    set(data);
    return data;
  } catch (e) {
    console.log(e);
    throw new Error("Problema na requisição de animais e tutores por nome.");
  }
};

export const getAnimalsByTutorName = async (name) => {
  try {
    const { data } = await axios.get(
      `http://localhost:3333/get/animal/tutor/name/${name}`
    );
    return data
      .map((item) => {
        return item.animals.map((animal) => ({
          tutor_name: item.name,
          animal_name: animal.name,
          animal_id: animal.id,
        }));
      })
      .flat();
  } catch (error) {
    console.log(error);
    throw new Error("Problema na requisição de animais por tutor");
  }
};

export const getAnimalsReceipt = async (setOne, setTwo, name) => {
  try {
    const { data } = await axios.get(
      `http://localhost:3333/get/animal/tutor/name/${name}`
    );
    setOne(data);
    setTwo(data[0].animals);
  } catch (error) {
    console.error("Error fetching animals:", error);
  }
};

export const PutTutor = (att) => {
  axios
    .put("http://localhost:3333/put/tutor", att)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error("Error updating data:", error);
    });
};

export const patchTutor = async (set, id, muiSnackAlert, message) => {
  try {
    const response = await axios.patch("http://localhost:3333/delete/tutor", {
      id,
    });
    set(response.data);
    muiSnackAlert("success", message);
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};

export const getTutorID = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:3333/get/tutor/id/${id}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Problema na requisição de tutor id");
  }
};
