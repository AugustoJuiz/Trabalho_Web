import React from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
export default function Propriedade({id,nome,preco,avaliacao}) {

  const config = {
    headers: {
        Authorization: "Bearer " + sessionStorage.getItem('token')
    }
  }


  const handleDelete = async () =>{
    let c = confirm(`Deseja apagar o ativo ${nome}`);
    if(c === true){
      try {
        const resposta = await axios.delete(`http://localhost:3000/propriedades/delete-asset/${id}`,config);
        if(resposta.status === 200)
          location.reload();
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <tr>
        <td>{nome}</td>
        <td>{preco}</td>
        <td>{avaliacao}</td>
        <td>
            <Link to='/update-asset' state={{nome,preco,avaliacao,id}}>Atualizar ativo</Link>
            <button onClick={handleDelete}>Apagar</button>
        </td>
    </tr>
  )
}