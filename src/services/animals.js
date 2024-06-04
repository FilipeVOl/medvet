import axios from "axios";

export const postAnimal = async (animal, tutor_id) => {
    try {
        const id = axios.post(`http://localhost:3333/create/animals/${tutor_id}`, animal);
        return id;
    } catch(e) {
        return null
    }
  };

export const getAnimalById = async (id) => {
    try {
        const animalDetails = await axios.get(`http://localhost:3333/get/animal/id/${id}`);
        return animalDetails;
    } catch(e) {
        return null
    }
}

export const getAllAnimals = async (set, page) => {
    try {
        const animalDetails = await axios.get(`http://localhost:3333/get/animals?numberOfItems=10&page=${page}`);
        set(animalDetails.data)
    } catch(e) {
        return null
    }
}
//essa
export const getAnimalByName = async (set, name) => {
    try {
        const animalByName = await axios.get(`http://localhost:3333/get/animals?numberOfItems=10&page=${page}`);
        set(animalByName.data)
    } catch(e) {
        return null
    }
}

export const getAnimalBySequence = async (set, sequence) => {
    try {
        const { data } = await axios.get(`http://localhost:3333/get/animal/sequence/${sequence}`);
        //mudar pra deixar igual a lógica 
        set([data])
    } catch(e) {
        return null
    }
}