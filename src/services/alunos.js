import axios from "axios";

const getAluno = (setData) => {
  axios
    .get("http://localhost:3333/get/student?numberOfItems=10&page=1")
    .then((response) => {
      setData(response.data);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
};

const filterReg = (registration, set) => {
  axios
    .get(
      `http://localhost:3333/get/student/registration/${Number(registration)}`
    )
    .then((response) => {
      set(response.data);
      console.log(response.data);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
};

const PutAluno = (att) => {
  axios
    .put("http://localhost:3333/put/student", att)
    .then((response) => {
      console.log(response.data)
    })
      .catch((error) => {
        console.error("Error fetching data:", error)
      })
}

const getAlunoByReg = (set, registration) => {
  axios
    .get(
      `http://localhost:3333/get/student/registration/${Number(registration)}`
    )
    .then((response) => {
      set(response.data);
      console.log(response.data);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

export { getAluno, filterReg, PutAluno, getAlunoByReg };
