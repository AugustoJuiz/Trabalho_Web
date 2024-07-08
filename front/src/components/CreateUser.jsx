import React, { useState, useEffect } from 'react';
import '../styles/CreateUserStyle.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup"; 

const schema = yup.object({
  username: yup.string().required('Usuário obrigatório'),
  email: yup.string().email('Email inválido').required('Email obrigatório'),
  password: yup.string().min(2,'Senha com no mínimo 2 caracteres').required('Senha obrigatória'),
  passwordConf: yup.string().oneOf([yup.ref('password')], 'As senhas devem coincidir!').required('Confirme a senha'),
}).required();

export default function CreateUser() {
  const [birthdate, setBirthdate] = useState('');
  const [cep, setCep] = useState('');
  const [street, setStreet] = useState('');
  const [quarter, setQuarter] = useState('');

  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: yupResolver(schema)
  });

  useEffect(() => {
  }, [birthdate, street, quarter]);

  const onSubmit = async (data) => {
    try {
      const newUser = {
        nome: data.username,
        dataNascimento: birthdate,
        rua: street,
        bairro: quarter,
        email: data.email,
        senha: data.password,
      };

      let res = await axios.post('http://localhost:8080/usersroute/add-user', newUser);
      if(res.status == 200){
          alert("Conta criada com sucesso!");
          navigate('/');
      } else {
          alert("Usuario ja existe");
          navigate('/');
      }
    
      
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAddress = async (cep) => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      if (!data.erro) {
        setStreet(data.logradouro);
        setQuarter(data.bairro);
      } else {
        setStreet('');
        setQuarter('');
      }
    } catch (error) {
      console.error('Error fetching address:', error);
      setStreet('');
      setQuarter('');
    }
  };

  const handleCepChange = (e) => {
    const cepValue = e.target.value;
    setCep(cepValue);
    if (cepValue.length === 8) {
      fetchAddress(cepValue);
    } else {
      setStreet('');
      setQuarter('');
    }
  };

  return (
    <div className="create-user-container">
      <h2>Insira os dados para se cadastrar</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-group">
          <label htmlFor="username">Nome</label>
          <input
            type="text"
            id="username"
            placeholder='fulano de tal'
            {...register('username')}
          />
          <p className='erro'>{errors.username?.message}</p>
        </div>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder='exemplo@exemplo'
            {...register('email')}
          />
          <p className='erro'>{errors.email?.message}</p>
        </div>
        <div className="input-group">
          <label htmlFor="birthdate">Data de Nascimento</label>
          <input
            type="date"
            id="birthdate"
            value={birthdate}
            placeholder='01/01/2000'
            onChange={(e) => setBirthdate(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="cep">CEP</label>
          <input
            type="text"
            id="cep"
            value={cep}
            placeholder='00.000-000'
            onChange={handleCepChange}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="street">Rua</label>
          <input
            type="text"
            id="street"
            value={street}
            placeholder='rua dos bobos'
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="quarter">Bairro</label>
          <input
            type="text"
            id="quarter"
            value={quarter}
            placeholder='bairro'
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password-one">Senha</label>
          <input
            type="password"
            id="password-one"
            placeholder='senha'
            {...register('password')}
          />
          <p className='erro'>{errors.password?.message}</p>
        </div>
        <div className="input-group">
          <label htmlFor="password-two">Confirmar Senha</label>
          <input
            type="password"
            id="password-two"
            placeholder='confirme a senha'
            {...register('passwordConf')}
          />
          <p className='erro'>{errors.passwordConf?.message}</p>
        </div>
        <button type="submit">Create User</button>
      </form>
      <a href="/" id="login">Fazer Login</a>
    </div>
  );
}
