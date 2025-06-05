import { useState, useEffect } from 'react';
import FormAnestesia from '../components/FormAnestesia/FormAnestesia';
import { useNavigate } from 'react-router-dom';
import { getAnimalBySequenceOrName, getAllAnimals } from '../services/animals';
import { Autocomplete, TextField } from '@mui/material';

export default function Anestesia() {
  const [animals, setAnimals] = useState([]);
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        await getAllAnimals(setAnimals);
        setLoading(false);
      } catch (err) {
        setError('Erro ao buscar animais');
        setLoading(false);
        console.error(err);
      }
    };

    fetchAnimals();
  }, []);
  const handleAnimalSelect = (animal) => {
    const normalizedAnimal = {
      id: animal.animal_id || animal.id,
      name: animal.animal_name || animal.name,
      species: animal.species || animal.especie,
      breed: animal.breed || animal.raca,
      tutorName: animal.tutor_name || animal.tutorName,
      tutorId: animal.tutor_id,
      sex: animal.sex || animal.sexo,
      age: animal.age || animal.idade,
      weight: animal.weight || animal.peso
    };
    
    setSelectedAnimal(normalizedAnimal);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl">Carregando...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-red-500">{error}</p>
      </div>
    );
  }
  return (
    <div className="font-Montserrat pl-14">
      <h1 className="p-14 h-10 text-2xl font-bold">Autorização de Anestesia</h1>
      <div className="flex justify-between items-center mb-6 px-14">
        <div>
          <button
            onClick={() => navigate('/solicitacoes/lista')}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded mr-2"
          >
            Ver Todas Solicitações
          </button>
        </div>
      </div>      {!selectedAnimal ? (
        <div className="bg-white p-6 rounded-lg shadow-md mx-14">
          <h2 className="text-xl font-semibold mb-4">Selecione um Animal</h2>
          
          <div className="mb-6">
            <Autocomplete
              freeSolo
              disableClearable
              id="search-animal"
              options={searchResults.map((animal) => animal.animal_name)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Buscar animal por nome ou ID"
                  onChange={async (e) => {
                    setSearchTerm(e.target.value);
                    if (e.target.value.length > 2) {
                      const results = await getAnimalBySequenceOrName(e.target.value);
                      setSearchResults(results);
                    }
                  }}
                  InputProps={{
                    ...params.InputProps,
                    type: "search",
                  }}
                />
              )}
              onChange={(_e, value) => {
                const animal = searchResults.find(a => a.animal_name === value);
                if (animal) handleAnimalSelect(animal);
              }}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {animals.map((animal) => (
              <div 
                key={animal.id || animal.animal_id}
                className="border p-4 rounded-lg cursor-pointer hover:bg-gray-100"
                onClick={() => handleAnimalSelect(animal)}
              >
                <h3 className="font-semibold">{animal.animal_name || animal.name}</h3>
                <p className="text-sm text-gray-600">Espécie: {animal.species || animal.especie}</p>
                <p className="text-sm text-gray-600">Raça: {animal.race || animal.race || 'N/A'}</p>
                <p className="text-sm text-gray-600">Tutor: {animal.tutor_name || animal.tutorName || 'Não informado'}</p>
              </div>
            ))}
          </div>
        </div>      ) : (
        <div className="px-14">
          <button
            onClick={() => setSelectedAnimal(null)}
            className="mb-4 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded flex items-center"
          >
            <span className="mr-2">←</span> Voltar para lista de animais
          </button>
          <FormAnestesia animalData={selectedAnimal} />
        </div>
      )}
    </div>
  );
}
