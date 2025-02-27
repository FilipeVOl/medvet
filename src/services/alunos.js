import axios from "axios";

const getAluno = async (setData, page) => {
  try {
    const { data } = await axios.get(
      `http://localhost:3333/get/student?numberOfItems=5&page=${page}`
    );
    setData(data);
    return data;
  } catch (e) {
    throw new Error("Failed to get All Students");
  }
};

const getAllStudents = async (setData) => {
  try {
    const { data } = await axios.get(
      `http://localhost:3333/get/student?numberOfItems=5&page=1`
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

const getAlunoByReg = async (registration) => {
  try {
    const { data } = await axios.get(
      `http://localhost:3333/get/student/registration?q=${registration}&page=1`
    );
    return data;
  } catch (e) {
    throw new Error("Erro ao filtrar alunos");
  }
};

const patchAluno = async (set, id, muiSnackAlert) => {
  try {
    const response = await axios.patch("http://localhost:3333/delete/student", {
      id,
    });
    set(response.data);
    muiSnackAlert("success", "");
    // console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};

export { getAluno, PutAluno, getAlunoByReg, patchAluno };
