import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/CreateUserStyle.css';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object({
  data: yup.string().required('Data obrigatória'),
  sigla: yup.string().required('Sigla obrigatória'),
  setor: yup.string().required('Setor obrigatório'),
  preco: yup.number().required('Preço obrigatório'),
  cotas: yup.number().required('Cotas obrigatórias'),
}).required();

export default function CreateAsset() {
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    let boolConfirmation = confirm("Você deseja adicionar esta asset?");
    if (boolConfirmation) {
      const token = localStorage.getItem('token');  // Obter o token do localStorage
      const id = localStorage.getItem('id');  // Obter o ID do usuário do localStorage

      const newAssetData = {
        idUser: id,
        data: data.data,
        sigla: data.sigla,
        setor: data.setor,
        preco: data.preco,
        cotas: data.cotas,
      };

      try {
        const response = await axios.post('http://localhost:8080/usersroute/add-asset', newAssetData, {
          headers: {
            'Authorization': `Bearer ${token}`  // Adicionar o token no cabeçalho da requisição
          }
        });

        if (response.status === 200) {
          alert("Asset adicionada com sucesso!");
          navigate('/home');
        } else {
          alert("Ocorreu um erro ao adicionar a asset!");
        }
      } catch (error) {
        alert("Ocorreu um erro ao adicionar a asset!");
        console.error('Erro ao adicionar a asset:', error);
      }
    }
  };

  return (
    <div className="create-user-container">
      <h2>Insira os dados para adicionar uma nova asset</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-group">
          <label htmlFor="data">Data</label>
          <input
            type="date"
            id="data"
            placeholder='Data'
            {...register('data')}
          />
          <p className='erro'>{errors.data?.message}</p>
        </div>
        <div className="input-group">
          <label htmlFor="sigla">Sigla</label>
          <input
            type="text"
            id="sigla"
            placeholder='Sigla'
            {...register('sigla')}
          />
          <p className='erro'>{errors.sigla?.message}</p>
        </div>
        <div className="input-group">
          <label htmlFor="setor">Setor</label>
          <input
            type="text"
            id="setor"
            placeholder='Setor'
            {...register('setor')}
          />
          <p className='erro'>{errors.setor?.message}</p>
        </div>
        <div className="input-group">
          <label htmlFor="preco">Preço</label>
          <input
            type="number"
            id="preco"
            placeholder='Preço'
            {...register('preco')}
          />
          <p className='erro'>{errors.preco?.message}</p>
        </div>
        <div className="input-group">
          <label htmlFor="cotas">Cotas</label>
          <input
            type="number"
            id="cotas"
            placeholder='Cotas'
            {...register('cotas')}
          />
          <p className='erro'>{errors.cotas?.message}</p>
        </div>
        <button type="submit">Adicionar Asset</button>
      </form>
      <a href="/home" id="home">Voltar para Home</a>
    </div>
  );
}
