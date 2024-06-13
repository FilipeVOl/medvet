import axios from "axios";

export const getProfessores = async (set) => {
    try {
      const { data } = await axios.get('http://localhost:3333/get/teacher?numberOfItems=5&page=1')
      set(data)
      return data
    } catch(e) {
      return 'Problema na requisição de pegar todos os professores.'
    }
}


export const getTeacherByName = async (set, name) => {
  try {
    const { data } = await axios.get(`http://localhost:3333/get/teacher/name?q=${name}`)
    set(data.teachers)
    return data.teachers
  } catch(e) {
    return 'Problema na requisição de professores pelo nome.'
  }
}