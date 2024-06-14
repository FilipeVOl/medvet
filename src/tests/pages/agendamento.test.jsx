import "@testing-library/jest-dom/vitest";
import { render } from "@testing-library/react";
import { describe, test, expect, vi, afterEach } from "vitest";
import axios from "axios";
import { tutoresByNumberMock } from "../mocks/agendamento.mock";
import Agendamento from "../../pages/Agendamento";
import userEvent from "@testing-library/user-event";

vi.mock("axios");


describe("test Agendar Consulta", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    axios.get.mockReset();
  });
  test('test if Render Agendamento with the right Title', async () => {
    const { getByText } = render(<Agendamento />)
    expect(getByText('Agendar Consulta')).toBeInTheDocument();
  });
  test('test if masks is working ', async () => {
    await axios.get.mockReturnValue({ data: tutoresByNumberMock });
    const { getByPlaceholderText } = render(<Agendamento />)
    const input = getByPlaceholderText(/Buscar tutor pelo número/i)
    expect(input).toBeInTheDocument();
    await userEvent.type(input, '62981936345')
    expect(input).toHaveValue('(62)98193-6345');
  });
  // test('test when the number is not found', async () => {
  //   await axios.get.mockRejectValue('');
  //   const { getByPlaceholderText, getByRole, getByTestId, findByTestId } = render(<Agendamento />)
  //   const input = getByPlaceholderText(/Buscar tutor pelo número/i)
  //   expect(input).toBeInTheDocument();
  //   await userEvent.type(input, '62981936345')
  //   expect(input).toHaveValue('(62)98193-6341')
  //   act(async () => {
  //     await userEvent.click(getByRole('button', { name: /Continuar/i }));
  //   });
  // });
})