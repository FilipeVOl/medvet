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
        console.log(animalDetails)
        set(animalDetails.data)
    } catch(e) {
        return null
    }
}