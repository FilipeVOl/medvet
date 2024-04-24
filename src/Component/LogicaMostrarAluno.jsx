import React, { useEffect, useState } from 'react'
import axios from 'axios';


// COLOCAR A LOGICA DENTRO DA PAGINA

const LogicaMostrarAluno = () => {

  const [data, setData] = useState([])

  const getAluno = () => {
    axios.get("http://localhost:3333/get/student?numberOfItems=10&page=1")
      .then(response => {
        setData(response.data)
      })
      .catch(error => {
        console.error('Error fetching data:', error )
      })

    setData(data);
    console.log(data)
  };

  useEffect(() => {
    getAluno()
  }, []);

  return (
    <>
    {JSON.stringify(data)}
    </>
  )
}

export default LogicaMostrarAluno