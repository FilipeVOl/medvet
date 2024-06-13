import "@testing-library/jest-dom/vitest";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import Agenda from "../../pages/agenda";
import { getConsults } from "../../services/agendamento";
import axios from "axios";

vi.mock("axios");

const mockAgenda = {
  "17102025": [
    {
      "id": "6663114177a7d3646c6c472b",
      "sequence": "1",
      "nameTutor": "Fernando",
      "nameAnimal": "bolt",
      "phone": "62981936345",
      "species": "cachorro",
      "description": "dor no braço"
    },
    {
      "id": "6663144577a7d3646c6c472c",
      "sequence": "2",
      "nameTutor": "Alisson",
      "nameAnimal": "mel",
      "phone": "62981936341",
      "species": "gato",
      "description": "dor no ombro"
    },
    {
      "id": "6663144f77a7d3646c6c472d",
      "sequence": "3",
      "nameTutor": "Josue",
      "nameAnimal": "mial",
      "phone": "62981936341",
      "species": "gato",
      "description": "dor no joelho"
    },
    {
      "id": "6663189b77a7d3646c6c472e",
      "sequence": "4",
      "nameTutor": "Roberto",
      "nameAnimal": "mialzinho",
      "phone": "62981936341",
      "species": "gato",
      "description": "dor na cabeça"
    }
  ]
}
describe("test Agenda", () => {
  afterEach(() => {
        vi.restoreAllMocks();
      });
  test('render Agenda with mock', async () => {
    await axios.get.mockResolvedValue({
      data: mockAgenda,
    });
    const { getByText, getAllByTestId } = render(<Agenda />)
    expect(getByText('Agendamentos')).toBeInTheDocument();
    await waitFor(() => {
      expect(getByText('Observações: dor no braço')).toBeInTheDocument();
      expect(getByText('Fernando')).toBeInTheDocument();
      expect(getByText(', 62981936345')).toBeInTheDocument();
      expect(getByText('- cachorro')).toBeInTheDocument();
      expect(getAllByTestId('agenda').length).toBe(4);
    })
  })
  test('test Agenda filter input', async () => {
    await axios.get.mockResolvedValue({
      data: mockAgenda,
    });
    const { getAllByTestId, getByPlaceholderText } = render(<Agenda />)
    fireEvent.change(getByPlaceholderText('Buscar por Nome'), { target: { value: 'Alisson' } });
    await waitFor(async () => {
      expect(getAllByTestId('agenda').length).toBe(4);
      expect(getByPlaceholderText('Buscar por Nome')).toBeInTheDocument();
    })
    await waitFor(() => {
      expect(getAllByTestId('agenda').length).toBe(1);
    })
  })
})