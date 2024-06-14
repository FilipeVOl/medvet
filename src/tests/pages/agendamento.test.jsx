import "@testing-library/jest-dom/vitest";
import { fireEvent, getByText, render, waitFor } from "@testing-library/react";
import { describe, test, expect, vi, afterEach } from "vitest";
import axios from "axios";
import { tutoresByNumberMock } from "../mocks/agendamento.mock";
import Agendamento from "../../pages/Agendamento";

vi.mock("axios");


describe("test Agendar Consulta", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });
  test('render Agenda with mock', async () => {
    await axios.get.mockResolvedValueOnce({
      data: tutoresByNumberMock,
    });
    const { getByText } = render(<Agendamento />)
    expect(getByText('Agendar Consulta')).toBeInTheDocument();
})
})