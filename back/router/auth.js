//requiring basic tools
const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const jwt = require("jsonwebtoken");

const pathUsers = path.join(__dirname, "..", "db", "users.json");
const users = JSON.parse(fs.readFileSync(pathUsers, { encoding: "utf-8" }));

require("dotenv").config();

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
  const user = users.find((u) => u.email === username && u.senha === password);
  if (user) {
    const accessToken = jwt.sign(user, process.env.TOKEN);

    let JSONRetorno = {
      token: accessToken,
      id: user.idUser

    }

    res.status(200).json(JSONRetorno);
  } else {
    res.status(401).send("Usuário ou senha inválidos");
  }
});

//http://localhost:8080/auth/login
module.exports = router;
