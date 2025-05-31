import express from "express";
import {
  crearCategorias,
  obtenerCategorias,
} from "../models/categoriaModel.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { idSemestre, categorias } = req.body;

  if (!categorias || !Array.isArray(categorias) || categorias.length === 0) {
    return res.status(400).json({ error: "Faltan categorías válidas" });
  }

  try {
    const result = await crearCategorias(idSemestre, categorias);
    res.status(201).json({ mensaje: "Categorías creadas correctamente", ids: result });
  } catch (error) {
    console.error("Error al crear categorías:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

router.get("/", async (req, res) => {
  const { semestre } = req.query;

  if (!semestre) {
    return res.status(400).json({ error: "Falta semestre" });
  }

  try {
    const result = await obtenerCategorias(semestre);
    res.status(200).json(result); // Devuelve las categorías
  } catch (error) {
    console.error("Error al obtener categorías:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

export default router;
