import axios from "axios";

// Variável para armazenar a última sequência gerada
let lastSequence = 50; // Começando a partir de 50 como solicitado

// Função para gerar uma nova sequência
const generateSequence = () => {
    const newSequence = lastSequence.toString();
    lastSequence += 1;
    return newSequence;
};

export const postAnimal = async (animal, tutor_id) => {
    try {
        // Garantir que não há campos undefined ou null
        const cleanAnimal = {};
        Object.keys(animal).forEach(key => {
            if (animal[key] !== undefined && animal[key] !== null) {
                cleanAnimal[key] = animal[key];
            }
        });
        
        // Gerar uma sequência no frontend em vez de deixar o backend gerar
        cleanAnimal.sequence = generateSequence();
        console.log('Gerando sequence no frontend:', cleanAnimal.sequence);
        
        console.log('Enviando animal para cadastro:', cleanAnimal);
        const response = await axios.post(`http://localhost:3333/create/animals/${tutor_id}`, cleanAnimal); 
        console.log('Resposta do cadastro do animal:', response.data);
        return response;
    } catch(e) {
        console.error('Erro ao cadastrar animal:', e.response?.data || e.message);
        
        // Se o erro for relacionado a sequence, tente novamente sem esse campo
        if (e.response?.data?.errors && 
            e.response.data.errors.some(err => err.field === 'sequence' && err.message.includes('undefined'))) {
            console.warn('Erro na sequência do animal. O backend deveria gerar sequence automaticamente.');
            
            // Tente uma segunda vez - essa abordagem pode ajudar em caso de condições de corrida
            try {
                console.log('Tentando cadastrar novamente sem o campo sequence...');
                const retryResponse = await axios.post(`http://localhost:3333/create/animals/${tutor_id}`, cleanAnimal);
                console.log('Resposta do segundo cadastro do animal:', retryResponse.data);
                return retryResponse;
            } catch (retryError) {
                console.error('Erro na segunda tentativa de cadastro:', retryError.response?.data || retryError.message);
                throw retryError;
            }
        }
        
        throw e; // Propagar o erro para tratamento no componente
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

export const getAllAnimals = async (res) => {
    try {
        const { data } = await axios.get(`http://localhost:3333/get/animals?numberOfItems=100000&page=1`)
        // The data from the API includes sequence, animal_id, animal_name, species, race, gender, age, coat, tutor_name
        console.log('Returning first animal:', data[0].animal_name)
        res(data)
        return data
    } catch (e) {
        return null
    }
}

export const getAnimalByTutorId = async (id, res) => {
    try {
        const { data } = await axios.get(`http://localhost:3333/get/animals/bytutor/${id}`);
        res(data)
        return data;
    } catch(e) {
        return null
    }
}

export const getAnimalBySequenceOrName = async (q) => {
    try {
        const { data } = await axios.get(`http://localhost:3333/search/animal?q=${q}`);
        return data; 
    } catch(e) {
        console.error('Error searching animals:', e);
        return [];
    }
}