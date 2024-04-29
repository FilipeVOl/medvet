import axios from "axios";

const getAlunos = (setData) => {
  axios
    .get("http://localhost:3333/get/student?numberOfItems=10&page=1")
    .then((response) => {
      setData(response.data);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
};

export default getAlunos;
