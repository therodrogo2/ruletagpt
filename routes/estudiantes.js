import express from "express";
import { crearEstudiante, eliminarEstudiante, estudiantesdeUnGrupo } from "../models/estudianteModel.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { nombre, refGrupo } = req.body;

  if (!nombre || !refGrupo) {
    return res.status(400).json({ message: "Faltan campos" });
  }

  try {
    await crearEstudiante({ nombre, refGrupo });
    res.status(201).json({ message: "Estudiante creado" });
  } catch (error) {
    console.error("Error al crear estudiante:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

router.delete("/", async (req, res) => {
  const { nombre, refGrupo } = req.body;

  if (!nombre || !refGrupo) {
    return res.status(400).json({ message: "Faltan campos para eliminar" });
  }

  try {
    const rowsAffected = await eliminarEstudiante({ nombre, refGrupo });

    if (rowsAffected === 0) {
      return res.status(404).json({ message: "Estudiante no encontrado" });
    }

    res.status(200).json({ message: "Estudiante eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar estudiante:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});


router.get("/:idGrupo", async (req, res) => {
  const { idGrupo } = req.params;

  if (!idGrupo) {
    return res.status(400).json({ message: "Falta el id del grupo" });
  }

  console.log("Grupo: ", idGrupo);
  

  try {
    const estudiantes = await estudiantesdeUnGrupo(idGrupo);
    res.json(estudiantes);
  } catch (error) {
    console.error("Error al obtener estudiantes del grupo:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

export default router;
