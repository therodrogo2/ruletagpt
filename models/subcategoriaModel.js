import pool from '../db.js';

export async function obtenerSubcategorias() {
  const [rows] = await pool.query('SELECT * FROM Subcategoria');
  return rows;
}

export async function crearSubcategoria({ nombre, refCategoria }) {
  const [result] = await pool.query(
    'INSERT INTO Subcategoria (nombre, refCategoria) VALUES (?, ?)',
    [nombre, refCategoria]
  );
  return result.insertId;
}
