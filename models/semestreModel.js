import pool from '../db.js'; 


export async function obtenerSemestres() {
  const [rows] = await pool.query('SELECT * FROM Semestre');
  return rows;
}

export async function crearSemestre({periodo}) {
  const [result] = await pool.query(
    'INSERT INTO Semestre (periodo) VALUES (?)',
    [periodo]
  );
  return result.insertId;
}


export async function verificarExisteSemestre(periodo){

  const [rows] = await pool.query('SELECT idSemestre  FROM Semestre WHERE periodo = ?', [periodo]);
  if (rows.length === 0) {
    return false;
  }
  return true;


}