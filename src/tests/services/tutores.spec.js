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
      const tutoresMock = {
        numberOfPages: 4,
        tutor: [
          {
            id: "6663114177a7d3646c6c472a",
            sequence: "1",
            name: "Fernando",
            cpf: null,
            email: null,
            phone: "62981936341",
            adress: null,
            status_delete: false,
            created_at: "2024-06-07T13:55:13.103Z",
          },
          {
            id: "6668928240d40c5948257ab4",
            sequence: "5",
            name: "amaral gideão",
            cpf: "",
            email: "fernando@gideao.com",
            phone: "12945444323",
            adress: "",
            status_delete: false,
            created_at: "2024-06-11T18:08:02.921Z",
          },
        ],
      };

      axios.get.mockResolvedValue({
        data: tutoresMock,
      });
      const data = await getTutores(() => '');
      expect(axios.get).toHaveBeenCalledWith(
        "http://localhost:3333/get/tutor?numberOfItems=5&page=1"
      );
      expect(data).toStrictEqual(tutoresMock);
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
      const tutoresByNameMock = {
        "tutors": [
          {
            "id": "6663114177a7d3646c6c472a",
            "sequence": "1",
            "name": "Fernando",
            "cpf": null,
            "email": null,
            "phone": "62981936341",
            "adress": null,
            "status_delete": false,
            "created_at": "2024-06-07T13:55:13.103Z"
          }
        ]
      }
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
      const tutoresByNumberMock = {
        "tutors": [
          {
            "id": "6663114177a7d3646c6c472a",
            "sequence": "1",
            "name": "Fernando",
            "cpf": null,
            "email": null,
            "phone": "62981936341",
            "adress": null,
            "status_delete": false,
            "created_at": "2024-06-07T13:55:13.103Z"
          }
        ]
      }
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
      const tutorPatientByIdMock = [
        {
          "id": "6669bc4176c26303ee449058",
          "sequence": "8",
          "name": "golden",
          "created_at": "2024-06-12T15:18:25.645Z",
          "species": "cachorro",
          "race": "golden",
          "gender": "masculino",
          "age": "21",
          "coat": "pelagem",
          "status_delete": false,
          "tutor_id": "6663114177a7d3646c6c472a"
        }
      ]
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
      const getAnimalByTutorNameMock = [
        {
          "id": "6663114177a7d3646c6c472a",
          "name": "Fernando",
          "sequence": "1",
          "cpf": null,
          "email": null,
          "phone": "62981936341",
          "created_at": "2024-06-07T13:55:13.103Z",
          "animals": [
            {
              "id": "6669bc4176c26303ee449058",
              "sequence": "8",
              "name": "golden",
              "created_at": "2024-06-12T15:18:25.645Z",
              "species": "cachorro",
              "race": "golden",
              "gender": "masculino",
              "age": "21",
              "coat": "pelagem",
              "status_delete": false,
              "tutor_id": "6663114177a7d3646c6c472a"
            }
          ]
        }
      ]
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
      const getAnimalsAndTutorByTutorNameMock = [
        {
          "id": "6663114177a7d3646c6c472a",
          "name": "Fernando",
          "sequence": "1",
          "cpf": null,
          "email": null,
          "phone": "62981936341",
          "created_at": "2024-06-07T13:55:13.103Z",
          "animals": [
            {
              "id": "6669bc4176c26303ee449058",
              "sequence": "8",
              "name": "golden",
              "created_at": "2024-06-12T15:18:25.645Z",
              "species": "cachorro",
              "race": "golden",
              "gender": "masculino",
              "age": "21",
              "coat": "pelagem",
              "status_delete": false,
              "tutor_id": "6663114177a7d3646c6c472a"
            }
          ]
        }
      ]
      axios.get.mockResolvedValueOnce({
        data: getAnimalsAndTutorByTutorNameMock
      })
     const data = await getAnimalsAndTutorByTutorName(() => '', "Fernando");
     expect(axios.get).toHaveBeenCalledWith("http://localhost:3333/get/animal/tutor/name/Fernando");
     expect(data).toStrictEqual(getAnimalsAndTutorByTutorNameMock)
    })
  })
});
