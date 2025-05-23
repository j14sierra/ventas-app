const sqlite3 = require('sqlite3').verbose();

// Crea o abre el archivo de base de datos
const db = new sqlite3.Database('./ventas.db', (err) => {
  if (err) {
    console.error('Error al conectar con SQLite:', err.message);
  } else {
    console.log('Conectado a la base de datos SQLite');
  }
});

// Crea la tabla de ventas si no existe
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS ventas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      producto TEXT NOT NULL,
      cantidad INTEGER NOT NULL,
      precio REAL NOT NULL
    )
  `);
});

module.exports = db;
