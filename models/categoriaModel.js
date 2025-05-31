import pool from '../db.js';

export async function crearCategorias(idSemestre, categorias) {
  const insertIds = [];
  for (const nombre of categorias) {
    const [result] = await pool.query(
      'INSERT INTO Categoria (nombre, refSemestre) VALUES (?, ?)',
      [nombre, idSemestre]
    );
    insertIds.push(result.insertId);
  }

  return insertIds;
}

export async function obtenerCategorias(idSemestre) {
  const [rows] = await pool.query(
    'SELECT idCategoria, nombre FROM Categoria WHERE refSemestre = ?',
    [idSemestre]
  );
  return rows;
}
