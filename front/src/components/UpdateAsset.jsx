import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/updateAsset.css';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup"; 

const schema = yup.object({
  data: yup.string().required('Data obrigatória'),
  sigla: yup.string().required('Sigla obrigatória'),
  setor: yup.string().required('Setor obrigatório'),
  preco: yup.number().required('Preço obrigatório').positive('Preço deve ser positivo'),
  cotas: yup.number().required('Cotas obrigatórias').positive('Cotas devem ser positivas'),
}).required();

export default function UpdateAsset() {
    const navigate = useNavigate();
    const location = useLocation();
    const { asset } = location.state || {};

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: asset,
        resolver: yupResolver(schema)
    });

    const onSubmit = async (formData) => {
        const idUser = localStorage.getItem('id');
        const token = localStorage.getItem('token');

        if (!token || !idUser) {
            alert("Erro: token ou ID de usuário não encontrado.");
            return;
        }

        const updatedAssetData = {
            ...formData,
            idUser: idUser,
            idAsset: asset.idAsset, // Use the asset ID from the state
        };

        try {
            const response = await axios.put('http://localhost:8080/usersroute/update-asset', updatedAssetData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if(response.status === 200){
                alert("Asset atualizada com sucesso!");
                navigate('/home');
            } else {
                alert("Ocorreu um erro ao atualizar sua asset!");
            }
        } catch (error) {
            alert("Ocorreu um erro ao atualizar sua asset!");
            console.error('Erro na atualização:', error);
        }
    };

    return (
        <div className="update-asset-container">
          <h2>Atualizar Asset</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="input-group">
              <label htmlFor="data">Data</label>
              <input type="text" id="data" placeholder='Data' {...register('data')} />
              <p className='erro'>{errors.data?.message}</p>
            </div>
            <div className="input-group">
              <label htmlFor="sigla">Sigla</label>
              <input type="text" id="sigla" placeholder='Sigla' {...register('sigla')} />
              <p className='erro'>{errors.sigla?.message}</p>
            </div>
            <div className="input-group">
              <label htmlFor="setor">Setor</label>
              <input type="text" id="setor" placeholder='Setor' {...register('setor')} />
              <p className='erro'>{errors.setor?.message}</p>
            </div>
            <div className="input-group">
              <label htmlFor="preco">Preço</label>
              <input type="number" id="preco" placeholder='Preço' {...register('preco')} />
              <p className='erro'>{errors.preco?.message}</p>
            </div>
            <div className="input-group">
              <label htmlFor="cotas">Cotas</label>
              <input type="number" id="cotas" placeholder='Cotas' {...register('cotas')} />
              <p className='erro'>{errors.cotas?.message}</p>
            </div>
            <button type="submit">Atualizar Asset</button>
          </form>
          <a href="/home" id="home">Voltar para Home</a>
        </div>
    );
}
