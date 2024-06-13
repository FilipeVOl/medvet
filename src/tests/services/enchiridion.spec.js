import axios from "axios";
import { createEnchiridion, getEnchiridion } from "../../services/enchiridion";
import { afterEach, describe, expect, test, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

vi.mock("axios");

describe("Alunos Services", async () => {
  afterEach(() => {
    vi.restoreAllMocks();
    cleanup();
    axios.get.mockReset();
  });
  describe("Erros Fetchs Enchridion", () => {
    test("error get Enchiridion", async () => {
      vi.spyOn(axios, "get").mockRejectedValue("Failed to fetch");
      await expect(getEnchiridion()).rejects.toThrow('Failed to get Enchiridion')
    });
    test("error post Enchiridion", async () => {
      vi.spyOn(axios, "post").mockRejectedValue('Failed to fetch');
      await expect(createEnchiridion()).rejects.toThrow('Failed to create Enchiridion')
    });
  });
  describe("Sucesso Fetchs Enchridion", () => {
    test("get Enchiridion", async () => {
      const allEnchiridion = {
        "enchiridions": [
          {
            "id": "66689b1a771c5fe1262c04cf",
            "sequence": "2",
            "animal_id": "6661a7c4c7435dc531d43a11",
            "teacher_id": "6660ca1862579bf09966a98e",
            "date": "2024-06-11T03:00:00.000Z",
            "history": "best-of-breed",
            "reason_consult": "end-to-end",
            "deworming": "holistic",
            "date_deworming": "seamless",
            "temperature": "26",
            "frequency_cardiac": "124",
            "frequency_respiratory": "31",
            "dehydration": "seila",
            "lymph_node": "Succurro sunt absconditus soluta.",
            "type_mucous": "global",
            "whats_mucous": "holistic",
            "skin_annex": "revolutionary",
            "system_circulatory": "integrated",
            "system_respiratory": "out-of-the-box",
            "system_digestive": "ubiquitous",
            "system_locomotor": "sticky",
            "system_nervous": "sticky",
            "system_genitourinary": "distributed",
            "others": "bleeding-edge",
            "complementary_exams": "ubiquitous",
            "diagnosis": "holistic",
            "trataments": "virtual",
            "observations": "efficient",
            "status_delete": false,
            "created_at": "2024-06-11T18:44:42.234Z",
            "vaccinations": []
          },
          {
            "id": "6660cbf73ea73acdd263050f",
            "sequence": "1",
            "animal_id": "6660ca693ea73acdd263050e",
            "teacher_id": "6660ca1862579bf09966a98e",
            "date": "2024-06-19T03:00:00.000Z",
            "history": "",
            "reason_consult": "",
            "deworming": "",
            "date_deworming": "Invalid Date",
            "temperature": "",
            "frequency_cardiac": "",
            "frequency_respiratory": "",
            "dehydration": "",
            "lymph_node": "",
            "type_mucous": "sem",
            "whats_mucous": "",
            "skin_annex": "",
            "system_circulatory": "",
            "system_respiratory": "",
            "system_digestive": "",
            "system_locomotor": "",
            "system_nervous": "",
            "system_genitourinary": "",
            "others": "",
            "complementary_exams": "",
            "diagnosis": "",
            "trataments": "",
            "observations": "",
            "status_delete": false,
            "created_at": "2024-06-05T20:35:03.672Z",
            "vaccinations": [
              {
                "id": "6660cbf73ea73acdd2630510",
                "date": "",
                "name": "",
                "enchiridion_id": "6660cbf73ea73acdd263050f"
              }
            ]
          }
        ]
      }
      axios.get.mockResolvedValue({
        data: allEnchiridion,
      });
      const response = await getEnchiridion(() => '');
      expect(axios.get).toHaveBeenCalledWith(
        "http://localhost:3333/get/enchiridion?numberOfItems=10&page=1")
      expect(allEnchiridion.data).toStrictEqual(response);
    });
    test('Post Enchiridion', async () => {
        const ce = {
            "vaccination": [],
            "stringDate": "17/10/2025",
            "animal_id": "6660d254a8d4607e33e55d2a",
            "teacher_id": "6660ca1862579bf09966a98e",
            "weight": 20,
            "history": "",
            "reason_consult": "",
            "deworming": "",
            "date_deworming": "",
            "temperature": "",
            "frequency_cardiac": "",
            "frequency_respiratory": "",
            "dehydration": "",
            "lymph_node":"",
            "type_mucous": "",
            "whats_mucous":"",
            "skin_annex":"" ,
            "system_circulatory": "",
            "system_respiratory": "",
            "system_digestive": "",
            "system_locomotor": "",
            "system_nervous": "",
            "system_genitourinary":"",
            "others": "",
            "complementary_exams": "sExamesCompl",
            "diagnosis": "sDiagnostico",
            "trataments": "sTratamento",
            "observations": "sObs"
          }
          axios.post.mockResolvedValue({
            data: {status: 201}
          });
          await createEnchiridion(ce);
          expect(axios.post).toHaveBeenCalledWith(
            "http://localhost:3333/create/enchiridion", ce)
    });
  });
});
