import { describe, expect, test, vi } from 'vitest'
import { ConsultTutorExist, CreateConsult, getConsults } from "../../services/agendamento";
import axios from 'axios'

vi.mock('axios')

describe('Agendamento Services', async () => {
  describe('get Agendamento', () => {
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
      const data = await getConsults(() => '', () => '')
      expect(axios.get).toHaveBeenCalledWith('http://localhost:3333/get/consults')
      expect(data).toStrictEqual(usersMock)
    })
  })
  describe('create Agendamento', () => {
    test('makes a POST request to create agendamento when Tutor doesnt Exist', async () => {
      const consultMock = {
        "description": "dor na perna",
        "id": "6659b20e56de7b4ad96547e4",
        "nameAnimal": "bolt",
        "nameTutor": "Felipe",
        "phone": "62981936341",
        "sequence": "2",
        "species": "cachorro",
        "stringDate": "17/10/2025"
     }
     const dataResponse = {
      "id": "6663114177a7d3646c6c472b",
      "sequence": "1",
      "date": "2025-10-17T03:00:00.000Z",
      "nameAnimal": "bolt",
      "phone": "62981936341",
      "species": "cachorro",
      "description": "dor na perna",
      "done": false,
      "tutor_id": "6663114177a7d3646c6c472a",
      "created_at": "2024-06-07T13:55:13.189Z"
    }
      axios.post.mockResolvedValue({
        data: dataResponse,
      })
      const { data } = await CreateConsult(consultMock)
      expect(axios.post).toHaveBeenCalledWith('http://localhost:3333/create/consults', consultMock)
      expect(data).toStrictEqual(dataResponse)
    })
    test('makes a POST request to create agendamento when Tutor Exist', async () => {
      const consultMock = {
        "description": "dor na perna",
        "id": "6663114177a7d3646c6c472a",
        "nameAnimal": "bolt",
        "nameTutor": "Isabella",
        "phone": "62981936341",
        "sequence": "2",
        "species": "cachorro",
        "stringDate": "17/10/2025"
     }
     const dataResponse = {
        data: {
          id: '6663114177a7d3646c6c472b',
          sequence: '1',
          date: '2025-10-17T03:00:00.000Z',
          nameAnimal: 'bolt',
          phone: '62981936341',
          species: 'cachorro',
          description: 'dor na perna',
          done: false,
          tutor_id: '6663114177a7d3646c6c472a',
          created_at: '2024-06-07T13:55:13.189Z'
        }
     }
      const data = await ConsultTutorExist('6663114177a7d3646c6c472a', consultMock)
      expect(axios.post).toHaveBeenCalledWith('http://localhost:3333/create/consults/6663114177a7d3646c6c472a', consultMock)
      expect(dataResponse).toStrictEqual(data)
    })
  })
})