import axios from "axios";

export const postAnimal = async (animal, tutor_id) => {
    const animalCadastrado = await axios.post(`http://localhost:3333/create/animals/${tutor_id}`, animal);
    return animalCadastrado;
  };