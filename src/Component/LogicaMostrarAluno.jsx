import React, { useEffect, useState } from 'react'
import axios from 'axios';


// COLOCAR A LOGICA DENTRO DA PAGINA

const LogicaMostrarAluno = (props) => {


  useEffect(() => {
      axios.get("http://localhost:3333/get/student?numberOfItems=10&page=1")
        .then(response => {
          props.setData(response.data)
        })
        .catch(error => {
          console.error('Error fetching data:', error )
        })
  }, []);

  
  

  return (
    <>
    </>
  )
}

export default LogicaMostrarAluno