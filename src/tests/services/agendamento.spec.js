import { describe, expect, test, vi } from 'vitest'
import { getConsults } from "../../services/agendamento";
import axios from 'axios'

vi.mock('axios')

describe('Agendamento Services', async () => {
  describe('fetch Agendamento', () => {
    test('makes a GET request to fetch agendamento', async () => {
      const usersMock = {
        "01062024": [
          {
            "id": "6659b20e56de7b4ad96547e4",
            "sequence": "2",
            "nameTutor": "Isabella",
            "nameAnimal": "bolt",
            "phone": "62981936341",
            "species": "cachorro",
            "description": "dor na perna"
          }
        ]
      }
      axios.get.mockResolvedValue({
        data: usersMock,
      })
      const data = await getConsults((e) => console.log(e), (e) => console.log(e))
      expect(axios.get).toHaveBeenCalledWith('http://localhost:3333/get/consults')
      expect(data).toStrictEqual(usersMock)
    })
  })
})