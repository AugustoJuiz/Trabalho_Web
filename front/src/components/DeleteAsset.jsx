import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/deleteAsset.css';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup"; 

const schema = yup.object({
  sigla: yup.string().required('Sigla obrigatória'),
}).required();

export default function DeleteAsset() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (formData) => {
        let boolConfirmation = confirm("Você deseja deletar essa asset?");
        if(boolConfirmation){
            const token = localStorage.getItem('token');
            const idUser = localStorage.getItem('id');

            if (!token || !idUser) {
                alert("Erro: token ou ID de usuário não encontrado.");
                return;
            }

            try {
                const response = await axios.delete('http://localhost:8080/usersroute/delete-asset', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    data: {
                        idUser: idUser,
                        sigla: formData.sigla
                    }
                });

                if(response.status === 200){
                    alert("Asset deletada com sucesso!");
                    navigate('/home');
                } else {
                    alert("Ocorreu um erro ao deletar a asset!");
                }
            } catch (error) {
                alert("Ocorreu um erro ao deletar a asset!");
                console.error('Erro na deleção:', error);
            }
        }
    };

    return (
        <div className="delete-asset-container">
          <h2>Deletar Asset</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="input-group">
              <label htmlFor="sigla">Sigla</label>
              <input type="text" id="sigla" placeholder='Sigla' {...register('sigla')} />
              <p className='erro'>{errors.sigla?.message}</p>
            </div>
            <button type="submit">Deletar Asset</button>
          </form>
          <a href="/home" id="home">Voltar para Home</a>
        </div>
    );
}
