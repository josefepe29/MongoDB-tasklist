const TaskModel = require("./models/taskModel.js")
const tareas = [];

//Funcion para listar todas las tareas
async function listarTareas() {
  const tarea = await TaskModel.find([])
  return tarea
}
//Funcion para obtener una sola tarea

async function obtenerTarea(id) {
    const tarea = await TaskModel.findById(id)
    return tarea 
}

// Funcion para listar tareas completadas

async function listarTareasCompletas() {
    
  const filtradoCompleto = await TaskModel.find({ estado: true })
  
    return filtradoCompleto
}

//Funcion para lista tareas incompletas

async function listarTareasIncompletas() {
    const filtradoIncompleto = await TaskModel.find({estado:false})
    return filtradoIncompleto
}

//Funcion para agregar tareas

async function agregarTarea(body) {
  
  const tarea = new TaskModel(body)
  return await tarea.save()
    
}

//Funcion para eliminar tareas

async function eliminarTarea(indice) {
    
  const tarea = await TaskModel.findByIdAndDelete({ _id: indice })
  return tarea

}

//Funcion para completar tareas

async function completarTarea(indice,estado) {

  const tarea = await TaskModel.findByIdAndUpdate({ _id: indice }, { estado: estado }, {new: true} )
  return tarea
}
// //--------------------------------------------------------------------------------------------------------------------------


module.exports = {
  obtenerTarea,
  listarTareasCompletas,
  listarTareasIncompletas,
  agregarTarea,
  eliminarTarea,
  completarTarea,
  listarTareas,
  tareas
}