const express = require('express');
const router = express.Router();

const TaskModel = require("../models/taskModel.js")

//Middleware para validar metodos POST

router.use((req, res, next) => {

  if ((req.method === 'POST') && Object.keys(req.body).length == 0) {
    // Cuerpo vacío en solicitudes POST
    return res.status(400).json({ error: 'Cuerpo de solicitud vacío' });
  }
  next();
})



// Ruta para agregar una nueva tarea en la base de datos
router.post('/tarea', async (req, res) => {
  const body = req.body;
  try {
    const resultado = new TaskModel(body)
    const tarea = await resultado.save()
    
    res.json(tarea);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
    
});

// Ruta para marcar una tarea como completa o incompleta en la base de datos
router.put('/tarea/:id', async (req, res) => {
  const tareaId = req.params.id;
  const estado = req.body.estado
  if (tareaId === undefined || tareaId === null || tareaId.trim() === '' || tareaId < 0) {
      return res.status(404).json('El ID de la tarea no es válido');
  }

  try {
    const tarea = await TaskModel.findByIdAndUpdate({ _id: tareaId }, { estado: estado }, {new: true} )
    if (!tarea) {
        return res.status(404).json({ error: 'Tarea no encontrada' });
    } 
    res.json(tarea)
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

// Ruta para eliminar una tarea de la base de datos
router.delete('/tarea/:id', async (req, res) => {
    const tareaId = req.params.id;
    
    if (tareaId === undefined || tareaId === null || tareaId < 0) {
      return res.status(404).json('El ID de la tarea no es válido');
    }
  
  
  try {
    const tarea = await TaskModel.findByIdAndDelete({ _id: tareaId})

    if (!tarea) {
        return res.status(404).json({ error: 'Tarea no encontrada' });
    } 
    res.json(tarea)
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

module.exports = router;