const express = require("express")
const router = express.Router()
const UserModel = require("../models/userModel")
const jwt = require('jsonwebtoken')
require('dotenv').config()

//Variable de entorno para login
const SECRET_KEY = process.env.SECRET_KEY

router.post("/login", async (req, res) => {
  const { usuario, contrasena } = req.body;

  //Buscar el usuario en la base de datos

  try {
    // Buscar el usuario en la base de datos
    const user = await UserModel.findOne({ usuario:usuario });

    if (!user) {
      return res.status(401).json({ message: 'Usuario y/o contrasena invalidos' });
    }

    // Verificar la contraseña
    if (user.contrasena !== contrasena) {
      return res.status(401).json({ message: 'Usuario y/o contrasena invalidos' });
    }

    // Autenticación exitosa
    const token = jwt.sign({ usuario:user.usuario, contrasena:user.contrasena }, SECRET_KEY,{expiresIn:"1h"});

    res.json({ token });
    
  } catch (error) {
    return res.status(500).json({ message: 'Error en el servidor' });
  }

});

module.exports= router