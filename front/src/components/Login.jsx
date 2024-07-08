import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LoginStyle.css";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object({
    username: yup.string().required("Usuário obrigatório"),
    password: yup.string().required("Senha obrigatória"),
  })
  .required();

export default function Login() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/auth/login",
        data
      );
      

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("id", response.data.id);
        console.log(response.data.acessToken);
        navigate("/home");
      } else if (response.status === 401) {
        alert(response.data);
      } else {
        alert("Erro de login:", response.data);
      }
    } catch (error) {
      alert(`Erro de login: ${error.response.data}`);
      // Lidar com erros de autenticação aqui
    }
  };

  const navigateNewUser = () => {
    navigate("/create-user");
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-group">
          <label htmlFor="username">Usuário</label>
          <input
            type="text"
            id="username"
            placeholder="exemplo@exemplo.com"
            {...register("username")}
          />
          <p className="erro">{errors.username?.message}</p>
        </div>
        <div className="input-group">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            placeholder="senha"
            {...register("password")}
          />
          <p className="erro">{errors.password?.message}</p>
        </div>
        <button type="submit">Login</button>
      </form>
      <a href="/create-user" id="new-user" onClick={navigateNewUser}>
        Não possui cadastro?
      </a>
    </div>
  );
}
