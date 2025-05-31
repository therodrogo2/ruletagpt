import express from 'express';
import { crearSemestre,obtenerSemestres, verificarExisteSemestre  } from '../models/semestreModel.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { periodo } = req.body;

  if (!periodo ) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }

  try {
    const id = await crearSemestre({ periodo });
    res.status(201).json({ id, mensaje: 'Semestre creado correctamente' });
  } catch (error) {
    console.error('Error al crear semestre:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});
router.get('/', async (req, res) => {
  try {
    const semestres = await obtenerSemestres();
    res.json(semestres);
  } catch (error) {
    console.error('Error al obtener semestres:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});


router.get('/existe', async (req, res) => {
  const { periodo } = req.query;

  if (!periodo) {
    return res.status(400).json({ error: 'Falta periodo' });
  }

  try {
    const existe = await verificarExisteSemestre(periodo);
    res.json({ existe });
  } catch (error) {
    console.error('Error al verificar existencia de semestre:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
}); 

export default router;
