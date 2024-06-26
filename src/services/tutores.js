import axios from 'axios'

export const getTutorPatientById = async (set, id) => {
  try {
    const { data } = await axios.get(`http://localhost:3333/get/animals/bytutor/${id}`)
    set(data)
    return data
  } catch (e) {
    console.log(e)
    throw new Error('Problema na requisição de tutor por ID.')
  }
}

export const getTutores = async (set) => {
  try {
    const { data } = await axios.get('http://localhost:3333/get/tutor?numberOfItems=5&page=1')
    set(data)
    return data
  } catch (e) {
    console.log(e)
    throw new Error('Problema na requisição de todos os tutores.')
  }
}

export const postTutor = async (consulta) => {
  try {
    await axios.post('http://localhost:3333/tutor', consulta)
  } catch (e) {
    console.log(e)
    throw new Error('Problema na criação de tutores')
  }
}

export const getTutoresByName = async (set, params) => {
  try {
    const { data } = await axios.get(`http://localhost:3333/get/tutor/name?q=${params}`)
    set(data.tutors)
    return data.tutors
  } catch (e) {
    console.log(e)
    throw new Error('Problema na requisição de tutores por nome.', e)
  }
}

export const getTutorByNumber = async (number, set) => {
  try {
    const { data } = await axios.get(`http://localhost:3333/get/tutor/searchphone?q=${number}&page=1`)
    set(data)
    return data
  } catch (e) {
    console.log(e)
    throw new Error('Problema na requisição de tutores por telefone.')
  }
}

export const getAnimalsAndTutorByTutorName = async (set, name) => {
  try {
    const { data } = await axios.get(`http://localhost:3333/get/animal/tutor/name/${name}`)
    set(data)
    return data
  } catch (e) {
    console.log(e)
    throw new Error('Problema na requisição de animais e tutores por nome.')
  }
}

export const getAnimalsByTutorName = async (name) => {
  try {
    const { data } = await axios.get(`http://localhost:3333/get/animal/tutor/name/${name}`)
    return data.map((item) => {
      return item.animals.map((animal) => ({
        tutor_name: item.name,
        animal_name: animal.name,
        animal_id: animal.id
      }))
    }).flat()
  } catch (error) {
    console.log(error)
    throw new Error('Problema na requisição de animais por tutor')
  }
}

export const getAnimalsReceipt = async (setOne, setTwo, name) => {
  try {
    const { data } = await axios.get(`http://localhost:3333/get/animal/tutor/name/${name}`)
    setOne(data)
    setTwo(data[0].animals)
  } catch (error) {
    console.error('Error fetching animals:', error)
  }
}

export const PutTutor = (att) => {
  axios
    .put('http://localhost:3333/put/tutor', att)
    .then((response) => {
      console.log(response.data)
    })
    .catch((error) => {
      console.error('Error updating data:', error)
    })
}
