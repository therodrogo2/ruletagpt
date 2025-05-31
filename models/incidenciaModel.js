import pool from "../db.js";

export async function obtenerIncidenciasPorSemestre(idSemestre) {
  const [rows] = await pool.query(
    `
    SELECT 
      i.idIncidencia,
      g.nombre AS grupo,
      i.semana,
      c.nombre AS categoria,
      s.nombre AS subcategoria,
      i.observacion
    FROM Incidencia i
    JOIN Grupo g ON i.refGrupo = g.idGrupo
    JOIN Categoria c ON i.refCategoria = c.idCategoria
    JOIN Subcategoria s ON i.refSubcategoria = s.idSubcategoria
    WHERE g.refSemestre = ? AND c.refSemestre = ?
    ORDER BY ISNULL(i.semana), i.semana DESC;
    `,
    [idSemestre, idSemestre]
  );
  return rows;
}

export async function crearIncidencia({
  semana, 
  observaciones,
  refGrupo,
  refCategoria,
  refSubcategoria,
  fechaCreacion,
}) {
  const [result] = await pool.query(
    "INSERT INTO Incidencia ( semana ,observacion, refGrupo, refCategoria, refSubcategoria, fechaCreacion) VALUES (?, ?, ?, ?, ?, ?)",
    [semana, observaciones, refGrupo, refCategoria, refSubcategoria, fechaCreacion]
  );
  return result.insertId;
}

export async function actualizarObservacion(id, observacion) {
  const [result] = await pool.query(
    'UPDATE Incidencia SET observacion = ? WHERE idIncidencia = ?',
    [observacion, id]
  );
  return result;
}
