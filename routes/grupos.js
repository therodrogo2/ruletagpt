import express from "express";
import { obtenerGrupos, crearGrupo } from "../models/grupoModel.js";


const router = express.Router();


router.get("/", async (req, res) => {
  const { semestre } = req.query;
  console.log("Semestre: ", semestre);

  if (!semestre) {
    return res.status(400).json({ error: "Semestre requerido" });
  }

  try {
    const grupos = await obtenerGrupos({ semestre });
    res.json(grupos);
  } catch (error) {
    console.error("Error al consultar grupos:", error);
    res.status(500).json({ error: "Error al consultar grupos" });
  }
});


router.post('/', async (req, res) => {
  const { nombre, proyecto1, proyecto2, refSemestre } = req.body;

  if (!nombre || !refSemestre) {
    return res.status(400).json({ message: "Faltan campos obligatorios" });
  }

  try {
    const grupoId = await crearGrupo({ nombre, proyecto1, proyecto2, refSemestre });
    res.status(201).json({ message: "Grupo creado correctamente", grupoId });
  } catch (error) {
    console.error("Error al crear grupo:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});


export default router;