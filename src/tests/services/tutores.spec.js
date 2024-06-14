import {
  getTutorPatientById,
  getTutores,
  postTutor,
  getTutoresByName,
  getTutorByNumber,
  getAnimalsAndTutorByTutorName,
  getAnimalsByTutorName,
} from "../../services/tutores";

import { afterEach, describe, expect, test, vi } from "vitest";
import axios from "axios";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { getAllTutors, getAnimalByTutorNameMock, getAnimalsAndTutorByTutorNameMock, tutorPatientByIdMock, tutoresByNameMock, tutoresByNumberMock } from "../mocks/agendamento.mock";

vi.mock("axios");

describe("Tutores Services", async () => {
  afterEach(() => {
    vi.restoreAllMocks();
    cleanup();
    axios.get.mockReset();
  });
  describe("test get Tutores", () => {
    test("error get Tutores", async () => {
      vi.spyOn(axios, "get").mockRejectedValue("Failed to fetch");
      await expect(getTutores()).rejects.toThrow(
        "Problema na requisição de todos os tutores."
      );
    });
    test("test Get Tutors", async () => {
      axios.get.mockResolvedValue({
        data: getAllTutors,
      });
      const data = await getTutores(() => '');
      expect(axios.get).toHaveBeenCalledWith(
        "http://localhost:3333/get/tutor?numberOfItems=5&page=1"
      );
      expect(data).toStrictEqual(getAllTutors);
    });
  });
  describe("test post Tutores", () => {
    test("error post Tutores", async () => {
      vi.spyOn(axios, "post").mockRejectedValue("Failed to fetch");
      await expect(postTutor({ name: "Fernando" })).rejects.toThrow("Problema na criação de tutores");
    });
    test("test post Tutores", async () => {
      axios.post.mockResolvedValue({
        status: 201,
      });
       await postTutor({ name: "Fernando" });
      expect(axios.post).toHaveBeenCalledWith("http://localhost:3333/tutor", { name: "Fernando" });
    });
  });
  describe("test get Tutores by name", () => {
    test("error get Tutores by name", async () => {
      vi.spyOn(axios, "get").mockRejectedValueOnce("Failed to fetch");
      await expect(getTutoresByName("Fernando")).rejects.toThrow("Problema na requisição de tutores por nome");
    })
    test("test get Tutores by name", async () => {
      axios.get.mockResolvedValueOnce({
        data: tutoresByNameMock
      })
     const data = await getTutoresByName((() => ''),"Fernando");
     expect(axios.get).toHaveBeenCalledWith("http://localhost:3333/get/tutor/name?q=Fernando");
     expect(data).toStrictEqual(tutoresByNameMock.tutors)
    })
  })
  describe("test get Tutores by number", () => {
    test("error get Tutores by number", async () => {
      vi.spyOn(axios, "get").mockRejectedValueOnce("Failed to fetch");
      await expect(getTutorByNumber("62981936341")).rejects.toThrow("Problema na requisição de tutores por telefone");
    })
    test("test get Tutores by number", async () => {
      axios.get.mockResolvedValueOnce({
        data: tutoresByNumberMock
      })
     const data = await getTutorByNumber("62981936341", (() => ''));
     expect(axios.get).toHaveBeenCalledWith("http://localhost:3333/get/tutor/searchphone?q=62981936341&page=1");
     expect(data).toStrictEqual(tutoresByNumberMock)
    })
  })
  describe("test get Tutor Patient By Id", () => {
    test("error get Tutor Patient By Id", async () => {
      vi.spyOn(axios, "get").mockRejectedValueOnce("Failed to fetch");
      await expect(getTutorPatientById("6663114177a7d3646c6c472a")).rejects.toThrow("Problema na requisição de tutor por ID");
    })
    test("test get Tutor Patient By Id", async () => {
      axios.get.mockResolvedValueOnce({
        data: tutorPatientByIdMock
      })
     const data = await getTutorPatientById( (() => ''), "6663114177a7d3646c6c472a");
     expect(axios.get).toHaveBeenCalledWith("http://localhost:3333/get/animals/bytutor/6663114177a7d3646c6c472a");
     expect(data).toStrictEqual(tutorPatientByIdMock)
    })
  })
  describe("test get AnimalsByTutorName", () => {
    test("error getAnimalByTutorName", async () => {
      vi.spyOn(axios, "get").mockRejectedValueOnce("Failed to fetch");
      await expect(getAnimalsByTutorName("Fernando")).rejects.toThrow("Problema na requisição de animais por tutor");
    })
    test("test getAnimalByTutorName", async () => {
      axios.get.mockResolvedValueOnce({
        data: getAnimalByTutorNameMock
      })
     const data = await getAnimalsByTutorName("Fernando");
     expect(axios.get).toHaveBeenCalledWith("http://localhost:3333/get/animal/tutor/name/Fernando");
     expect(data).toStrictEqual(getAnimalByTutorNameMock.map((item) => {
      return item.animals.map((animal) => ({
        tutor_name: item.name,
        animal_name: animal.name,
        animal_id: animal.id,
      }));
    }).flat())
    })
  })
  describe("getAnimalsAndTutorByTutorName", () => {
    test("error getAnimalsAndTutorByTutorName", async () => {
      vi.spyOn(axios, "get").mockRejectedValueOnce("Failed to fetch");
      await expect(getAnimalsAndTutorByTutorName("Fernando")).rejects.toThrow("Problema na requisição de animais e tutores por nome");
    })
    test("test getAnimalsAndTutorByTutorName", async () => {
      axios.get.mockResolvedValueOnce({
        data: getAnimalsAndTutorByTutorNameMock
      })
     const data = await getAnimalsAndTutorByTutorName(() => '', "Fernando");
     expect(axios.get).toHaveBeenCalledWith("http://localhost:3333/get/animal/tutor/name/Fernando");
     expect(data).toStrictEqual(getAnimalsAndTutorByTutorNameMock)
    })
  })
});
