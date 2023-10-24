const express = require('express');
const router = express.Router();

const listaTareas = require('./script')
const tareas = listaTareas.tareas

//Middleware para validar metodos PUT y POST

router.use((req, res, next) => {
  const keys = Object.keys(req.body)
  if ((req.method === 'POST' || req.method === 'PUT') && Object.keys(req.body).length == 0) {
    // Cuerpo vacío en solicitudes POST y PUT
    return res.status(400).json({ error: 'Cuerpo de solicitud vacío' });
  }
  // if (!Object.keys(req.body).includes('id') || !Object.keys(req.body).includes('descripcion')) {
  //   return res.status(400).json({ error: 'Atributos faltantes' });
  // }
  next();
})



// Ruta para agregar una nueva tarea
router.post('/tarea', async (req, res) => {
  const body = req.body;
  console.log(body)
  try {
    const tarea = await listaTareas.agregarTarea(body)
    
    res.json(tarea);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
    
});

// Ruta para marcar una tarea como completada
router.put('/tarea/:id', async (req, res) => {
  const tareaId = req.params.id;
  const estado = req.body.estado
  if (tareaId === undefined || tareaId === null || tareaId.trim() === '' || tareaId < 0) {
      return res.status(404).json('El ID de la tarea no es válido');
  }

  try {
    const tarea = await listaTareas.completarTarea(tareaId,estado)
    if (!tarea) {
        return res.status(404).json({ error: 'Tarea no encontrada' });
    } 
    res.json(tarea)
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

// Ruta para eliminar una tarea
router.delete('/tarea/:id', async (req, res) => {
    const tareaId = req.params.id;
    
    if (tareaId === undefined || tareaId === null || tareaId < 0) {
      return res.status(404).json('El ID de la tarea no es válido');
    }
  
  
  try {
    const tarea = await listaTareas.eliminarTarea(tareaId)

    if (!tarea) {
        return res.status(404).json({ error: 'Tarea no encontrada' });
    } 
    res.json(tarea)
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

module.exports = router;