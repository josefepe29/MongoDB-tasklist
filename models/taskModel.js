const mongoose = require('mongoose')
const {model, Schema} = mongoose

const taskSchema = new Schema({
    descripcion: String,
    estado: Boolean
});

taskSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject.__v
    }
})

const TaskModel = model('tasks',taskSchema);

module.exports = TaskModel;