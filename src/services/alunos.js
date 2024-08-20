import axios from "axios";

const getAluno = async (setData, page) => {
  try {
    const { data } = await axios.get(
      `http://localhost:3333/get/student?numberOfItems=10&page=${page}`
    );
    setData(data);
    return data;
  } catch (e) {
    throw new Error("Failed to get All Students");
  }
};

const PutAluno = async (att) => {
  try {
    const response = await axios.put("http://localhost:3333/put/student", att);
    console.log(response);
  } catch (e) {
    return e;
  }
};

const getAlunoByReg = async (set, registration) => {
  try {
    const { data } = await axios.get(
      `http://localhost:3333/get/student/registration?q=${registration}&page=1`
    );
    set(data);
    return data;
  } catch (e) {
    throw new Error("Erro ao filtrar alunos");
  }
};

const patchAluno = async (set) => {
  axios
    .patch("http://localhost:3333/delete/aluno", {
      id: selectedUser.id,
    })
    .then((response) => {
      console.log(response);
      getAluno(setData);
    })
    .catch((error) => {
      console.log(error);
    });
};

export { getAluno, PutAluno, getAlunoByReg, patchAluno };
