const express = require('express');
const vista = require('./list-view-router');
const app = express();
const edicion = require('./list-edit-router');
const jwt = require('jsonwebtoken')
const usuarios = require('./usuarios.json')
require('dotenv').config()
const connectDB = require('./db.js')
const UserModel = require('./models/userModel.js')

//Conexion a la base de datos
connectDB()

//Variables de entorno

const PORT = process.env.PORT || 3000
const SECRET_KEY = process.env.SECRET_KEY
app.use(express.json());

//Funcion middleware de aplicacion para validar credenciales de los usuarios

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

//Middleware para validar metodos HTTP
app.use(validarMetodosHTTP)


app.post("/login",  async (req, res) => {
  const { usuario, contrasena } = req.body;

  //Buscar el usuario en la base de datos

  try {
    // Buscar el usuario en la base de datos
    const user = await UserModel.findOne({ usuario:usuario });

    if (!user) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }

    // Verificar la contraseña
    if (user.contrasena !== contrasena) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    // Autenticación exitosa
    const token = jwt.sign({ usuario:user.usuario, contrasena:user.contrasena }, SECRET_KEY,{expiresIn:"1h"});

    res.json({ token });
  } catch (error) {
    return res.status(500).json({ message: 'Error en el servidor' });
  }

});

//Middleware para validar credenciales de los usuarios

app.use(validarCredenciales)

//Uso de vista y edicion

app.use('/edicion',edicion)
app.use('/vista',vista)

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

