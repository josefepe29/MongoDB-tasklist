const express = require('express');
const app = express();
const vista = require('./Routes/list-view-router');
const edicion = require('./Routes/list-edit-router');
require('dotenv').config()
const connectDB = require('./db.js')
const login = require("./auth/login")
const {validarCredenciales,validarMetodosHTTP} = require("./autenticacion")

//Conexion a la base de datos
connectDB()

//Variables de entorno

const PORT = process.env.PORT || 3000
app.use(express.json());

//Middleware para validar metodos HTTP
app.use(validarMetodosHTTP)

//Uso de login
app.use("/", login)

//Middleware para validar credenciales de los usuarios
app.use(validarCredenciales)

//Uso de vista y edicion
app.use('/edicion',edicion)
app.use('/vista',vista)

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

