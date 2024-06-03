// import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

export default function DetalhesProntuario() {
    const { id } = useParams();
  return (
    <div>
        {id}
    </div>
  )
}
