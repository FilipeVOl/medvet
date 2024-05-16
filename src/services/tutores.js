import axios from "axios";

const getTutor = (set) => {
  axios
    .get("http://localhost:3333/get/tutor?numberOfItems=10&page=1")
    .then((response) => {
      set(response.data);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
};

const getTutorByNumber = (number, set) => {
  axios
    .get(`http://localhost:3333/get/tutor/searchphone?q=${number}&page=1`)
    .then((response) => {
      set(response.data);
    })
    .catch((error) => {
      console.error("Error fetching number:", error);
    });
};

const postTutor = (consulta) => {
  axios
    .post("http://localhost:3333/tutor", consulta)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

export { getTutor, postTutor, getTutorByNumber };
