import { afterEach, describe, expect, test, vi } from "vitest";
import axios from "axios";
import { getAluno, PutAluno } from "../../services/alunos";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

vi.mock("axios");

describe("Alunos Services", async () => {
  afterEach(() => {
    vi.restoreAllMocks();
    cleanup();
    axios.get.mockReset();
  });
  describe("error get Alunos", () => {
    test("error log", async () => {
      await expect(getAluno()).rejects.toThrow("Failed to fetch");
    });
  });
  describe("get Alunos", () => {
    test("test url and data", async () => {
      const alunosMock = [
        {
          id: "66685faacde4828768de1987",
          name: "Fernando",
          cpf: "05488632107",
          password_hash: "",
          email: "example@gmail.com",
          registration: "231063",
          course: "Medicina Veterinária",
          shift: "noturno",
          period: "Quarto",
          phone: "61994256545",
          status_delete: false,
          role: "STUDENT",
          created_at: "2024-06-11T14:31:06.809Z",
        },
      ];
      axios.get.mockResolvedValue({
        data: alunosMock,
      });
      const data = await getAluno(() => "");
      expect(axios.get).toHaveBeenCalledWith(
        "http://localhost:3333/get/student?numberOfItems=10&page=1"
      );
      expect(data).toStrictEqual(alunosMock);
    });
  });
  //later implementation
  // describe('CREATE LATER, FUNCTION DEPRECATION', () => {
  //   test('test url and data', async () => {
  //     const alunosMock = [
  //       {
  //         "id": "66685faacde4828768de1987",
  //         "name": "Fernando",
  //         "cpf": "05488632107",
  //         "password_hash": "",
  //         "email": "example@gmail.com",
  //         "registration": "231063",
  //         "course": "Medicina Veterinária",
  //         "shift": "noturno",
  //         "period": "Quarto",
  //         "phone": "61994256545",
  //         "status_delete": false,
  //         "role": "STUDENT",
  //         "created_at": "2024-06-11T14:31:06.809Z"
  //       }
  //     ]
  //     axios.get.mockResolvedValue({
  //       data: alunosMock,
  //     })
  //     const data = await filterReg('231063', () => '')
  //     expect(axios.get).toHaveBeenCalledWith('http://localhost:3333/get/student/registration/231063')
  //     expect(data).toStrictEqual(alunosMock)
  //   })
  // })
  describe("Put Students", () => {
    test("test url", async () => {
      const alunosMock = {
        id: "66685faacde4828768de1987",
        name: "Fernando",
        cpf: "05488632107",
        password: "fernando123",
        email: "fernando@gmail.com",
        registration: "231063",
        course: "Medicina Veterinária",
        shift: "noturno",
        period: "Quarto",
        phone: "61994256545",
        status_delete: false,
        role: "STUDENT",
      };
      await PutAluno(alunosMock);
      expect(axios.put).toHaveBeenCalledWith(
        "http://localhost:3333/put/student",
        alunosMock
      );
    });
    test("error fetch", async () => {
      vi.spyOn(axios, 'put').mockRejectedValue('Failed to fetch');
      await expect(PutAluno()).resolves.toStrictEqual("Failed to fetch");
      expect(axios.put).toHaveBeenCalledWith(
        "http://localhost:3333/put/student", undefined
      );
    });
  });
});
