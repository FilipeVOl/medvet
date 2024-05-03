import axios from "axios";

const getTutor = (setData) => {
  axios
    .get("http://localhost:3333/get/tutor?numberOfItems=10&page=1")
    .then((response) => {
      setData(response.data);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
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

export { getTutor, postTutor };
