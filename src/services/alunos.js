import axios from "axios";

const getAluno = async (setData) => {
  try {
    const { data } = await axios.get(
      "http://localhost:3333/get/student?numberOfItems=10&page=1"
    );
    setData(data);
    return data;
  } catch (e) {
    throw new Error('Failed to get All Students');
  }
};

const PutAluno = async (att) => {
  try {
    const response = await axios.put("http://localhost:3333/put/student", att);
    console.log(response)
  } catch (e) {
    return e
  }
};

export { getAluno, PutAluno };
