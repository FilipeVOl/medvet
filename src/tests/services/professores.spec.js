import axios from "axios";

import { afterEach, describe, expect, test, vi } from "vitest";
import "@testing-library/jest-dom/vitest";
import { getProfessores, getTeacherByName } from '../../services/professores'

vi.mock("axios");

describe("Alunos Services", async () => {
  afterEach(() => {
    vi.restoreAllMocks();
    axios.get.mockReset();
  });
  describe("Erros Fetchs Teachers", () => {
    test("error get Enchiridion", async () => {
      vi.spyOn(axios, "get").mockRejectedValue("Failed to fetch");
      await expect(getProfessores()).resolves.toBe('Problema na requisição de pegar todos os professores.')
    });
    test("error post Enchiridion", async () => {
      vi.spyOn(axios, "post").mockRejectedValue('Failed to fetch');
      await expect(getTeacherByName()).resolves.toBe('Problema na requisição de professores pelo nome.')
    });
  });
  describe("Get Teachers", () => {
    test("get All Teachers", async () => {
        const allMockTeachers = [
            {
              "id": "6660ca1862579bf09966a98e",
              "name": "Felipe Damaceno",
              "cpf": "70196369185",
              "password_hash": "",
              "email": "felipe.silva@example.com",
              "registration": "123",
              "course": "Engenharia de Software",
              "shift": "noturno",
              "phone": "11987654731",
              "status_delete": false,
              "role": "TEACHER",
              "created_at": "2024-06-05T20:27:04.049Z"
            },
            {
              "id": "6661b965c7435dc531d43a14",
              "name": "Roberto Alves",
              "cpf": "09747895005",
              "password_hash": "",
              "email": "roberto.alves@unievangelica.edu.br",
              "registration": "8888",
              "course": "Medicina Veterenária",
              "shift": "Noturno",
              "phone": "61999997771",
              "status_delete": false,
              "role": "TEACHER",
              "created_at": "2024-06-06T13:28:05.079Z"
            }
          ]
      axios.get.mockResolvedValue({
        data: allMockTeachers,
      });
      const response = await getProfessores(() => '');
      expect(axios.get).toHaveBeenCalledWith(
        "http://localhost:3333/get/teacher?numberOfItems=5&page=1")
      expect(response).toStrictEqual(allMockTeachers);
    });
    test('Get Teacher By Name', async () => {
        const mockByName = {
            "teachers": [
              {
                "id": "6660ca1862579bf09966a98e",
                "name": "Felipe Damaceno",
                "cpf": "70196369185",
                "password_hash": "$2a$06$zgu4gFPCmnieEVPwJ5eOUuKZjQFgRVwaqN8Ntkaw26gYHrt7QIIW.",
                "email": "felipe.silva@example.com",
                "registration": "123",
                "course": "Engenharia de Software",
                "shift": "noturno",
                "phone": "11987654731",
                "status_delete": false,
                "role": "TEACHER",
                "created_at": "2024-06-05T20:27:04.049Z"
              }
            ]
          }
      axios.get.mockResolvedValue({
        data: mockByName,
      });
      const response = await getTeacherByName(() => '', 'Felipe Damaceno');
      expect(axios.get).toHaveBeenCalledWith(
        `http://localhost:3333/get/teacher/name?q=${'Felipe Damaceno'}`)
      expect(response).toStrictEqual(mockByName.teachers);
    });
  });
});

//0021 - Direito - Autoavaliação Docente por Turma