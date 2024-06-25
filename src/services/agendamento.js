import axios from 'axios'

async function CreateConsult (consulta) {
  try {
    const data = await axios.post(
      'http://localhost:3333/create/consults',
      consulta
    )
    return data
  } catch (e) {
    // console.log(e.response.data.issues)
    throw new Error('FETCH ERRO: criar consulta when Tutor Doenst Exist')
  }
}

async function ConsultTutorExist (id, consult) {
  try {
    const data = await axios.post(
      `http://localhost:3333/create/consults/${id}`,
      consult
    )
    return data
  } catch (e) {
    throw new Error('FETCH ERRO: criar consulta when Tutor Exist')
  }
}

async function getConsults (setOne, setTwo) {
  try {
    const { data } = await axios.get('http://localhost:3333/get/consults')
    setOne(data)
    setTwo(data)
    return data
  } catch (e) {
    throw new Error('Failed to fetch agendamento')
  }
}

export { CreateConsult, ConsultTutorExist, getConsults }
