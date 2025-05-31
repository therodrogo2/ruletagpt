import express from 'express';
import pool from "../db.js"; 
import { crearIncidencia } from '../models/incidenciaModel.js';
import { obtenerIncidenciasPorSemestre, actualizarObservacion } from '../models/incidenciaModel.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { semana, refGrupo, refCategoria, refSubcategoria, observaciones , fechaCreacion} = req.body;

  if (!refGrupo || !refCategoria || !refSubcategoria || !semana || !fechaCreacion) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }

  
  try {
    const id = await crearIncidencia({ semana, refGrupo, refCategoria, refSubcategoria, observaciones, fechaCreacion });
    res.status(201).json({ id, mensaje: 'Incidencia creada correctamente' });
  } catch (error) {
    console.error('Error al crear incidencia:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params; 
  console.log(id, "hola");
  try {
    const incidencias = await obtenerIncidenciasPorSemestre(id);
    res.json(incidencias);
    console.log(incidencias, "hola incidencia");
  } catch (error) {
    console.error("Error al obtener incidencias por semestre:", error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { observacion } = req.body;

  if (!observacion) {
    return res.status(400).json({ error: 'La observación es requerida' });
  }

  try {
    const result = await actualizarObservacion(id, observacion);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Incidencia no encontrada' });
    }

    res.json({ mensaje: 'Observación actualizada correctamente' });
  } catch (error) {
    console.error('Error al actualizar observación:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

export default router;
