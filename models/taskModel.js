const mongoose = require('mongoose')
const {model, Schema} = mongoose

//Esquema para los documentos de tareas

const taskSchema = new Schema({
    descripcion: {type: String, required: [true, 'La descripcion es necesaria']},
    estado: { type: Boolean, default: false },
    fechaCreacion: { type: Date, default: Date.now }
},{versionKey:false});


//Modelo para la coleccion tasks
const TaskModel = model('tasks',taskSchema);

module.exports = TaskModel;