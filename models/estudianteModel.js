import pool from '../db.js';

export async function obtenerEstudiantes() {
  const [rows] = await pool.query('SELECT * FROM Estudiante');
  return rows;
}

export async function crearEstudiante({ nombre, refGrupo }) {
  const [result] = await pool.query(
    'INSERT INTO Estudiante (nombre, refGrupo) VALUES (?, ?)',
    [nombre, refGrupo]
  );
  return result.insertId;
}

export async function eliminarEstudiante({ nombre, refGrupo }) {
  const [result] = await pool.query(
    'DELETE FROM Estudiante WHERE nombre = ? AND refGrupo = ?',
    [nombre, refGrupo]
  );
  return result.affectedRows;
}

export async function estudiantesdeUnGrupo(idGrupo) {
  const [rows] = await pool.query(
    'SELECT * FROM Estudiante WHERE refGrupo = ?',
    [idGrupo]
  );
  return rows;
}
