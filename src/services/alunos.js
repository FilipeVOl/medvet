import axios from 'axios'

const getAluno = async (setData) => {
  try {
    const { data } = await axios.get(
      'http://localhost:3333/get/student?numberOfItems=10&page=1'
    )
    setData(data)
    return data
  } catch (e) {
    throw new Error('Failed to get All Students')
  }
}

const PutAluno = async (att) => {
  try {
    const response = await axios.put('http://localhost:3333/put/student', att)
    console.log(response)
  } catch (e) {
    return e
  }
}

const getAlunoByReg = async (set, registration) => {
  try {
    const { data } = await axios.get(`http://localhost:3333/get/student/registration?q=${registration}&page=1`)
    set(data)
    return data
  } catch (e) {
    throw new Error('Erro ao filtrar alunos')
  }
}

export { getAluno, PutAluno, getAlunoByReg }
