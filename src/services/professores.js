import axios from "axios";

const getProfessor = (setData) => {
  axios
    .get("http://localhost:3333/get/teacher?numberOfItems=10&page=1")
    .then((response) => {
      setData(response.data);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
};

export default getProfessor;
