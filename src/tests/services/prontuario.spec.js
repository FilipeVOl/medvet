import { getProntuario } from "../../services/prontuario";

import { afterEach, describe, expect, test, vi } from "vitest";
import axios from "axios";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

vi.mock("axios");

describe("test get Prontuario", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    cleanup();
    axios.get.mockReset();
  });
  test("error get Prontuario", async () => {
    vi.spyOn(axios, "get").mockRejectedValue("Failed to fetch");
    await expect(getProntuario()).rejects.toThrow(
      "Problema na requisição de prontúario"
    );
  });
  test("test Get Prontuario", async () => {
    const prontuarioMock = {
      id: "6660d254a8d4607e33e55d2a",
      sequence: "2",
      name: "101jonas",
      created_at: "2024-06-05T21:02:12.243Z",
      species: "egipcio",
      race: "gato",
      gender: "feminino",
      age: "2",
      coat: "preto",
      tutor: {
        id: "6663114177a7d3646c6c472a",
        name: "Fernando",
        sequence: "1",
        cpf: null,
        email: null,
        phone: "62981936341",
        created_at: "2024-06-07T13:55:13.103Z"
      },
    };
    axios.get.mockResolvedValue({
      data: prontuarioMock,
    });
    const data = await getProntuario("6660d254a8d4607e33e55d2a");
    expect(axios.get).toHaveBeenCalledWith(
      "http://localhost:3333/get/animal/id/6660d254a8d4607e33e55d2a"
    );
    expect(data).toStrictEqual(prontuarioMock);
  });
});
