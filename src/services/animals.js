import axios from "axios";

export const postAnimal = async (animal, tutor_id) => {
    try {
        const id = axios.post(`http://localhost:3333/create/animals/${tutor_id}`, animal);
        return id;
    } catch(e) {
        return null
    }
  };