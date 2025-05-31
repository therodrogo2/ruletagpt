import pool from "../db.js";

export async function obtenerGruposConEstudiantes({ semestre }) {
  const [rows] = await pool.query(
    `SELECT g.idGrupo, g.nombre, g.proyecto1, g.proyecto2, e.nombre AS estudiante
   FROM Grupo g
   LEFT JOIN Estudiante e ON e.refGrupo = g.idGrupo
   WHERE g.refSemestre = ?`,
  [semestre]
  );

  const gruposMap = {};
  rows.forEach(row => {
    if (!gruposMap[row.idGrupo]) {
      gruposMap[row.idGrupo] = { id: row.idGrupo, nombre: row.nombre, proyecto1: row.proyecto1, proyecto2: row.proyecto2, estudiantes: [] };
    }
    if (row.estudiante) {
      gruposMap[row.idGrupo].estudiantes.push(row.estudiante);
    }
  });

  return Object.values(gruposMap);
}

export async function eliminarGrupo(refSemestre) {
  try {
    await pool.query(`
    DELETE FROM Estudiante 
    WHERE refGrupo IN (
    SELECT idGrupo FROM Grupo WHERE refSemestre = ?
    )
  `, [refSemestre]);

    await pool.query("DELETE FROM Grupo WHERE refSemestre = ?", [refSemestre]);

  } catch (error) {
    console.error("Error en modelo al eliminar grupo:", error);

  }
}