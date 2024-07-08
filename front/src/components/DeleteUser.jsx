import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/updateUser.css'; // Importando o mesmo arquivo CSS do UpdateUser
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup"; 

const schema = yup.object({
  username: yup.string().required('Usuário obrigatório'),
  password: yup.string().required('Senha obrigatória'),
  passwordConf: yup.string().oneOf([yup.ref('password')], 'As senhas devem coincidir!').required('Confirme a senha'),
}).required();

export default function DeleteUser() {
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    async function autenticate(data){
        const response = await axios.post('http://localhost:8080/auth/login', data);
        if(response.status != 200){
            return false;
        }
        return true;
    }

    const onSubmit = async (data) => {
        let userExist = true; //autenticate(data);
        if(userExist){
            let boolConfirmation = confirm("Você deseja realmente excluir sua conta?");
            if(boolConfirmation){
                
                const token = localStorage.getItem('token');  // Obter o token do localStorage
                const idUser = localStorage.getItem('id');  // Obter o id do localStorage

                try {
                    const response = await axios.delete(`http://localhost:8080/usersroute/delete-user`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        },
                        data: {
                            idUser: idUser
                        }
                    });

                    if(response.status === 200){
                        alert("Conta deletada com sucesso!");
                        navigate('/');
                    } else {
                        alert("Ocorreu um erro ao deletar sua conta!");
                    }
                } catch (error) {
                    alert("Ocorreu um erro ao deletar sua conta!");
                    console.error('Erro ao deletar:', error);
                }
            }
        }
    };

    const navigateListAssets = () => {
        navigate('/list-assets');
    }

    return (
        <div className="update-asset-container">
            <h2>Deletar Usuário</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="input-group">
                    <label htmlFor="username">Usuário</label>
                    <input
                        type="text"
                        id="username"
                        placeholder='exemplo@exemplo.com'
                        {...register('username')}
                    />
                    <p className='erro'>{errors.username?.message}</p>
                </div>
                <div className="input-group">
                    <label htmlFor="password">Senha</label>
                    <input
                        type="password"
                        id="password"
                        placeholder='senha'
                        {...register('password')}
                    />
                    <p className='erro'>{errors.password?.message}</p>
                </div>
                <div className="input-group">
                    <label htmlFor="passwordConf">Confirmação</label>
                    <input
                        type="password"
                        id="passwordConf"
                        placeholder='confirme a senha'
                        {...register('passwordConf')}
                    />
                    <p className='erro'>{errors.passwordConf?.message}</p>
                </div>
                <button type="submit">Deletar</button>
            </form>
            <a href="/home" id="home">Voltar para Home</a>
        </div>
    );
};
