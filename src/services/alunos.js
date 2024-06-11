import axios from "axios";

const getAluno = async (setData) => {
  try {
    const { data } = await axios.get("http://localhost:3333/get/student?numberOfItems=10&page=1");
    setData(data);
    return data;
  } catch (e) {
    console.log(e);
  }
};

const filterReg = async (registration, set) => {
  try {
    const { data } = await axios.get(`http://localhost:3333/get/student/registration/${Number(registration)}`);
    set(data);
    return data;
  } catch (e) {
    console.log(e);
  }
};

const PutAluno = async (att) => { try {
  const response = await axios.put("http://localhost:3333/put/student", att);
  console.log(response);
} catch (e) {
  console.log(e);
}
}

export { getAluno, filterReg, PutAluno };
