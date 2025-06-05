import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = "http://localhost:3333";

/**
 * Hook para buscar dados de entidades (animal, tutor, etc) com cache e tratamento de erro
 */
export function useEntityData() {
  // Cache de entidades já buscadas
  const [animalCache, setAnimalCache] = useState({});
  const [tutorCache, setTutorCache] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  /**
   * Busca dados de um animal pelo ID
   * @param {string} id - ID do animal
   * @returns {Promise<Object>} - Dados do animal
   */
  const getAnimal = async (id) => {
    if (!id) return null;
    
    // Se já está em cache, retornar
    if (animalCache[id]) {
      return animalCache[id];
    }
    
    try {
      setLoading(true);
      const { data } = await axios.get(`${API_URL}/get/animal/id/${id}`);
      
      // Adicionar ao cache
      if (data) {
        setAnimalCache(prev => ({
          ...prev,
          [id]: data
        }));
      }
      
      setLoading(false);
      return data;
    } catch (err) {
      setError(`Erro ao buscar animal: ${err.message}`);
      setLoading(false);
      return null;
    }
  };
  
  /**
   * Busca dados de um tutor pelo ID
   * @param {string} id - ID do tutor
   * @returns {Promise<Object>} - Dados do tutor
   */
  const getTutor = async (id) => {
    if (!id) return null;
    
    // Se já está em cache, retornar
    if (tutorCache[id]) {
      return tutorCache[id];
    }
    
    try {
      setLoading(true);
      const { data } = await axios.get(`${API_URL}/get/tutor/${id}`);
      
      // Adicionar ao cache
      if (data) {
        setTutorCache(prev => ({
          ...prev,
          [id]: data
        }));
      }
      
      setLoading(false);
      return data;
    } catch (err) {
      setError(`Erro ao buscar tutor: ${err.message}`);
      setLoading(false);
      return null;
    }
  };
  
  /**
   * Busca ambos animal e tutor para uma solicitação
   * @param {Object} solicitacao - Objeto da solicitação
   * @returns {Promise<Object>} - Solicitação enriquecida com dados de animal e tutor
   */
  const enrichSolicitacao = async (solicitacao) => {
    if (!solicitacao) return null;
    
    // Clone da solicitação para não modificar o original
    const enriched = { ...solicitacao };
    
    // Buscar animal se tiver ID
    if (solicitacao.animalId || solicitacao.animal_id) {
      const animalId = solicitacao.animalId || solicitacao.animal_id;
      const animal = await getAnimal(animalId);
      
      if (animal) {
        enriched.animalName = animal.name || animal.nome || 'Nome não disponível';
        enriched.animal = animal;
        
        // Se animal tem relação com tutor
        if (animal.tutor_id && !enriched.tutorName) {
          const tutor = await getTutor(animal.tutor_id);
          if (tutor) {
            enriched.tutorName = tutor.name || tutor.nome || 'Nome não disponível';
            enriched.tutor = tutor;
          }
        }
      }
    }
    
    return enriched;
  };
  
  return {
    getAnimal,
    getTutor,
    enrichSolicitacao,
    loading,
    error,
    animalCache,
    tutorCache
  };
}
