import express from 'express';
import pool from '../db.js'; // solo si necesitas hacer queries adicionales
import { crearSubcategoria } from '../models/subcategoriaModel.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { idSemestre, subcategorias } = req.body;

  if (!idSemestre || !subcategorias) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }

  try {
    // Obtener categorías existentes para el semestre
    const [categorias] = await pool.query(
      'SELECT idCategoria, nombre FROM Categoria WHERE refSemestre = ?',
      [idSemestre]
    );

    const nombreToId = {};
    categorias.forEach(cat => {
      nombreToId[cat.nombre] = cat.idCategoria;
    });

    // Insertar subcategorías
    for (const [nombreCategoria, listaSubcategorias] of Object.entries(subcategorias)) {
      const idCategoria = nombreToId[nombreCategoria];
      if (!idCategoria) continue;

      for (const sub of listaSubcategorias) {
        await crearSubcategoria({ nombre: sub, refCategoria: idCategoria });
      }
    }

    res.status(201).json({ mensaje: 'Subcategorías creadas correctamente' });
  } catch (error) {
    console.error('Error al crear subcategorías:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});


router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT idSubcategoria, nombre, refCategoria FROM Subcategoria');
    res.status(200).json(rows); // Devuelve las subcategorías con el id de categoría (refCategoria)
  } catch (error) {
    console.error('Error al obtener subcategorías:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});





export default router;
