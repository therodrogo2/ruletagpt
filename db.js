import mysql from 'mysql2/promise';
import fs from 'fs/promises';

const pool = mysql.createPool({
  host: 'turntable.proxy.rlwy.net',
  user: 'root',
  password: 'mFErFDypxqfdUdYJqSWvRJhjrZvrnnfU',
  database: 'railway',
  port: 13393,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  multipleStatements: true
});

// Crear tablas al iniciar
const initTables = async () => {
  try {
    const sql = await fs.readFile('./tablas.sql', 'utf8');
    const conn = await pool.getConnection();
    await conn.query(sql);
    conn.release();
    console.log('Tablas creadas o ya existen.');
  } catch (err) {
    console.error('Error creando tablas:', err);
  }
};
//initTables();

export default pool;
