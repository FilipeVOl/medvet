//import all animals functions

import {
  getAnimalById,
  getAllAnimals,
  getAnimalBySequenceOrName,
  postAnimal,
} from "../../services/animals";
import axios from "axios";
import { afterEach, describe, expect, test, vi } from "vitest";
import "@testing-library/jest-dom/vitest";

vi.mock("axios");

describe("Alunos Services", async () => {
  afterEach(() => {
    vi.restoreAllMocks();
    axios.get.mockReset();
  });
  describe("Erros Fetchs", () => {
    test("error get All Animals", async () => {
      vi.spyOn(axios, "get").mockRejectedValue("Failed to fetch");
      await expect(getAllAnimals()).resolves.toBe(null);
    });
    test("error get Animals By Id", async () => {
      vi.spyOn(axios, "get").mockRejectedValue("Failed to fetch");
      await expect(getAnimalById()).resolves.toBe(null);
    });
    test("error post Animal", async () => {
      vi.spyOn(axios, "post").mockRejectedValue('Failed to fetch');
      await expect(postAnimal()).resolves.toBe(null);
    });
    test("error get Animal By Name or Sequence", async () => {
      vi.spyOn(axios, "get").mockRejectedValue("Failed to fetch");
      await expect(getAnimalBySequenceOrName()).resolves.toBe(null);
    });
  });
  describe("Sucesso Fetchs", () => {
    afterEach(() => {
      vi.restoreAllMocks();
      axios.get.mockReset();
    });
    test("get All Animal", async () => {
      const allAnimals = [
        {
          "sequence": "2",
          "animal_id": "6660d254a8d4607e33e55d2a",
          "animal_name": "101jonas"
        }
      ];
      axios.get.mockResolvedValue({
        data: allAnimals,
      });
      const response = await getAllAnimals(() => '', 1);
      expect(axios.get).toHaveBeenCalledWith(
        "http://localhost:3333/get/animals?numberOfItems=10&page=1"
      );
      expect(allAnimals).toStrictEqual(response);
    });
    test("get Animal By Id", async () => {
      const animal = {
        "id": "6660d254a8d4607e33e55d2a",
        "sequence": "2",
        "name": "101jonas",
        "created_at": "2024-06-05T21:02:12.243Z",
        "species": "egipcio",
        "race": "gato",
        "gender": "feminino",
        "age": "2",
        "coat": "preto",
        "tutor": {}
      }
      axios.get.mockResolvedValue({
        data: animal,
      });
      const response = await getAnimalById("6660d254a8d4607e33e55d2a");
      expect(axios.get).toHaveBeenCalledWith(
        "http://localhost:3333/get/animal/id/6660d254a8d4607e33e55d2a"
      );
      expect(animal).toStrictEqual(response.data);
    });
    test("post Animal", async () => {
      const animal = {
        "name": "golden",
        "species": "cachorro",
        "race": "golden",
        "gender": "masculino",
        "age": "21",
        "weight": "25",
        "coat": "pelagem",
        "tutor_id": "6663114177a7d3646c6c472a"
       }
       const id = '6669bc4176c26303ee449058'
      axios.post.mockResolvedValue({
        data: id,
      });
      const response = await postAnimal(animal, '6660d254a8d4607e33e55d2a');
      expect(axios.post).toHaveBeenCalledWith(
        "http://localhost:3333/create/animals/6660d254a8d4607e33e55d2a",
        animal
      );
      expect(id).toStrictEqual(response.data);
    });
    test("get Animal By Name or Sequence", async () => {
      const animals = [
        {
          "sequence": "2",
          "animal_id": "6660d254a8d4607e33e55d2a",
          "animal_name": "101jonas"
        }
      ];
      axios.get.mockResolvedValue({
        data: animals,
      });
      const response = await getAnimalBySequenceOrName(() => '', "101jonas");
      expect(axios.get).toHaveBeenCalledWith(
        "http://localhost:3333/search/animal?q=101jonas"
      );
      expect(animals).toStrictEqual(response);
    });
  });
});
