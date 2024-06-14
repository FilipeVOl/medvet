export const getAllTutors = {
  numberOfPages: 4,
  tutor: [
    {
      id: "6663114177a7d3646c6c472a",
      sequence: "1",
      name: "Fernando",
      cpf: null,
      email: null,
      phone: "62981936341",
      adress: null,
      status_delete: false,
      created_at: "2024-06-07T13:55:13.103Z",
    },
    {
      id: "6668928240d40c5948257ab4",
      sequence: "5",
      name: "amaral gideão",
      cpf: "",
      email: "fernando@gideao.com",
      phone: "12945444323",
      adress: "",
      status_delete: false,
      created_at: "2024-06-11T18:08:02.921Z",
    },
  ],
};

export const tutoresByNameMock = {
  "tutors": [
    {
      "id": "6663114177a7d3646c6c472a",
      "sequence": "1",
      "name": "Fernando",
      "cpf": null,
      "email": null,
      "phone": "62981936341",
      "adress": null,
      "status_delete": false,
      "created_at": "2024-06-07T13:55:13.103Z"
    }
  ]
}

export const tutoresByNumberMock = {
  "tutors": [
    {
      "id": "6663114177a7d3646c6c472a",
      "sequence": "1",
      "name": "Fernando",
      "cpf": null,
      "email": null,
      "phone": "62981936341",
      "adress": null,
      "status_delete": false,
      "created_at": "2024-06-07T13:55:13.103Z"
    }
  ]
}

export const tutorPatientByIdMock = [
  {
    "id": "6669bc4176c26303ee449058",
    "sequence": "8",
    "name": "golden",
    "created_at": "2024-06-12T15:18:25.645Z",
    "species": "cachorro",
    "race": "golden",
    "gender": "masculino",
    "age": "21",
    "coat": "pelagem",
    "status_delete": false,
    "tutor_id": "6663114177a7d3646c6c472a"
  }
]

export const getAnimalByTutorNameMock = [
  {
    "id": "6663114177a7d3646c6c472a",
    "name": "Fernando",
    "sequence": "1",
    "cpf": null,
    "email": null,
    "phone": "62981936341",
    "created_at": "2024-06-07T13:55:13.103Z",
    "animals": [
      {
        "id": "6669bc4176c26303ee449058",
        "sequence": "8",
        "name": "golden",
        "created_at": "2024-06-12T15:18:25.645Z",
        "species": "cachorro",
        "race": "golden",
        "gender": "masculino",
        "age": "21",
        "coat": "pelagem",
        "status_delete": false,
        "tutor_id": "6663114177a7d3646c6c472a"
      }
    ]
  }
]


export const getAnimalsAndTutorByTutorNameMock = [
  {
    "id": "6663114177a7d3646c6c472a",
    "name": "Fernando",
    "sequence": "1",
    "cpf": null,
    "email": null,
    "phone": "62981936341",
    "created_at": "2024-06-07T13:55:13.103Z",
    "animals": [
      {
        "id": "6669bc4176c26303ee449058",
        "sequence": "8",
        "name": "golden",
        "created_at": "2024-06-12T15:18:25.645Z",
        "species": "cachorro",
        "race": "golden",
        "gender": "masculino",
        "age": "21",
        "coat": "pelagem",
        "status_delete": false,
        "tutor_id": "6663114177a7d3646c6c472a"
      }
    ]
  }
]