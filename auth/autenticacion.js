const express = require("express")
const jwt = require('jsonwebtoken')
require('dotenv').config()

//variable de entorno para auth
const SECRET_KEY = process.env.SECRET_KEY

function validarCredenciales (req, res,next) {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ error: "Token no proporcionado" });
  }
    // Verifica y decodifica el token JWT
  jwt.verify(token, SECRET_KEY, (err, decoded) => { 
    if (err) {  
      return res.status(401).json({ error: "Token inválido" });
    } else {
      next()
    }
  });
};

//Funcion middleware de aplicacion para validar metodos HTTP

function validarMetodosHTTP(req, res, next) {
  const validarMetodos = ['GET', 'POST', 'PUT', 'DELETE'];
  
  if (!validarMetodos.includes(req.method)) {
    
    return res.status(400).json({ error: 'Método HTTP no válido' });
  }
  
  next();
}

module.exports = {
    validarCredenciales,
    validarMetodosHTTP
}