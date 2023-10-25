const express = require('express');
const router = express.Router();

const TaskModel = require("./models/taskModel.js")

//Ruta get para poder listar objetos por id

router.get('/listar/:id', async (req, res) => {
  const tareaId = req.params.id; 
    if (tareaId === undefined || tareaId === null || tareaId.trim() === '' || tareaId < 0) {
        res.status(404).json('El ID de la tarea no es válido');
        return;
  }
  try {
    const tarea = await TaskModel.findById(id)
      if (!tarea) {
          res.status(404).json({ error: 'Tarea no encontrada' });
      } 
      res.json(tarea);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
})

//Ruta para listar todos los elementos

router.get('/listar', async (req, res) => {
  try {
    const tarea = await TaskModel.find([])

    if (!tarea) {
      return res.status(401).json({ message: 'Tareas no encontradas' });
    }

    res.json(tarea)
  } catch (error) {
    return res.status(500).json({ message: error });
  }
})


//Ruta para listar incompletas o completas
// Ruta para obtener todas las tareas completas
router.get('/listar/a/completas', async (req, res) => {
  try {
    const tareasCompletas = await TaskModel.find({ estado: true })
    
    
    if (!tareasCompletas) {
      return res.status(401).json({ message: 'Tareas no encontradas' });
    }
    
    res.json(tareasCompletas);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

// Ruta para obtener todas las tareas incompletas
router.get('/listar/a/incompletas', async (req, res) => {
  
  try {
    const tareasIncompletas = await TaskModel.find({estado:false})
    
    
    
    if (!tareasIncompletas) {
      return res.status(401).json({ message: 'Tareas no encontradas' });
    }
    
    res.json(tareasIncompletas);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

module.exports = router;