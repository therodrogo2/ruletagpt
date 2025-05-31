import express from "express";
import pool from "../db.js"; 
import { obtenerGruposConEstudiantes, eliminarGrupo } from "../models/grupoEstudianteModel.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const { refSemestre } = req.query;

  if (!refSemestre) {
    return res.status(400).json({ error: "refSemestre requerido" });
  }

  try {
    const [rows] = await pool.query(
      "SELECT idSemestre FROM Semestre WHERE periodo = ?",
      [refSemestre]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Semestre no encontrado" });
    }

    const idSemestre = rows[0].idSemestre;

    const grupos = await obtenerGruposConEstudiantes({ semestre: idSemestre });

    res.json(grupos);
  } catch (error) {
    console.error("Error al obtener grupos con estudiantes:", error);
    res.status(500).json({ error: "Error al obtener grupos con estudiantes" });
  }
});


router.delete("/", async (req, res) => {
    const { refSemestre } = req.query;

    if (!refSemestre) {
        return res.status(400).json({ error: "refSemestre requerido" });
    }

    try {
        const [rows] = await pool.query(
            "SELECT idSemestre FROM Semestre WHERE periodo = ?",
            [refSemestre]
        );

        if (rows.length === 0) {
            return res.status(404).json({ error: "Semestre no encontrado" });
        }

        const idSemestre = rows[0].idSemestre;

        await eliminarGrupo(idSemestre);

        res.status(200).json({ message: "Grupos y estudiantes eliminados correctamente" });
    } catch (error) {
        console.error("Error al eliminar grupos y estudiantes:", error);
        res.status(500).json({ error: "Error al eliminar los datos del semestre" });
    }
});

export default router;
