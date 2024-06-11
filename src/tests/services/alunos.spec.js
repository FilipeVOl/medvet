import { describe, expect, test, vi } from 'vitest'
import axios from 'axios'
import { getAluno, filterReg, PutAluno } from '../../services/alunos'

vi.mock('axios')

describe('Alunos Services', async () => {
  describe('get Alunos', () => {
    test('test url and data', async () => {
      const alunosMock = [
        {
          "id": "66685faacde4828768de1987",
          "name": "Fernando",
          "cpf": "05488632107",
          "password_hash": "",
          "email": "example@gmail.com",
          "registration": "231063",
          "course": "Medicina Veterinária",
          "shift": "noturno",
          "period": "Quarto",
          "phone": "61994256545",
          "status_delete": false,
          "role": "STUDENT",
          "created_at": "2024-06-11T14:31:06.809Z"
        }
      ]
      axios.get.mockResolvedValue({
        data: alunosMock,
      })
      const data = await getAluno(() => '')
      expect(axios.get).toHaveBeenCalledWith('http://localhost:3333/get/student?numberOfItems=10&page=1')
      expect(data).toStrictEqual(alunosMock)
    })
  })
  describe('get filter Students by Registration', () => {
    test('test url and data', async () => {
      const alunosMock = [
        {
          "id": "66685faacde4828768de1987",
          "name": "Fernando",
          "cpf": "05488632107",
          "password_hash": "",
          "email": "example@gmail.com",
          "registration": "231063",
          "course": "Medicina Veterinária",
          "shift": "noturno",
          "period": "Quarto",
          "phone": "61994256545",
          "status_delete": false,
          "role": "STUDENT",
          "created_at": "2024-06-11T14:31:06.809Z"
        }
      ]
      axios.get.mockResolvedValue({
        data: alunosMock,
      })
      const data = await filterReg('231063', () => '')
      expect(axios.get).toHaveBeenCalledWith('http://localhost:3333/get/student/registration/231063')
      expect(data).toStrictEqual(alunosMock)
    })
  })
})