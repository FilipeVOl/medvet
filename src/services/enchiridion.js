import axios from "axios";

export async function createEnchiridion(allDataState) {
    try {
        const data  = await axios.post("http://localhost:3333/create/enchiridion", allDataState)
        return data;
    } catch(e) {
       throw new Error('Failed to create Enchiridion');
    }
}

export async function getEnchiridion(set) {
    try {
        const prontuarios = await axios.get("http://localhost:3333/get/enchiridion?numberOfItems=10&page=1");
        set(prontuarios.data);
    } catch(e) {
        throw new Error('Failed to get Enchiridion');
    }
}


export const getEnchiridionsAnimalId = async (id) => {
    try {
      const enchiridions = await axios.get(`http://localhost:3333/get/enchiridion/animal/${id}`)
      return enchiridions.data
    } catch (error) {
      console.error(error)
      throw new Error('Problema na requisição de animal id with prontuarios')
    }
  }

  export const getTeacherName = async (teacherId) => {
    try {
        const  response= await axios.get(`http://localhost:3333/get/teacher/id/${teacherId}`)
        const data = response.data; // Obtém os dados da resposta
        return data.user.name;
      } catch (error) {
        console.error(error)
        throw new Error('Problema na requisição de teacher id')
      }
  };



  export const getEnchiridionId = async (id) => {
    try {
      const enchiridion = await axios.get(`http://localhost:3333/get/enchiridion/${id}`)
      return enchiridion.data
    } catch (error) {
      console.error(error)
      throw new Error('Problema na requisição do prontuario')
    }
  }
  
