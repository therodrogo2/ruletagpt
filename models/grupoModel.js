import pool from '../db.js';

export async function obtenerGrupos({ semestre }) {

  const [rows] = await pool.query(
    "SELECT idGrupo, nombre FROM Grupo WHERE refSemestre = ?",
    [semestre]
  );
  return rows;

}

export async function crearGrupo({ nombre, proyecto1, proyecto2, refSemestre }) {
  const [semestreRows] = await pool.query(
    "SELECT idSemestre FROM Semestre WHERE periodo = ?",
    [refSemestre]
  );

  if (semestreRows.length === 0) {
    throw new Error(`No se encontró el semestre con periodo: ${refSemestre}`);
  }

  const idSemestre = semestreRows[0].idSemestre;

  const [result] = await pool.query(
    "INSERT INTO Grupo (nombre, proyecto1, proyecto2, refSemestre) VALUES (?, ?, ?, ?)",
    [nombre, proyecto1, proyecto2, idSemestre]
  );

  return result.insertId;
}
