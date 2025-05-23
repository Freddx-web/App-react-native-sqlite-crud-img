const sqlite3 = require('sqlite3').verbose();
// Database setup
const dbSQL = new sqlite3.Database('./gallery.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the gallery database.');
});

// Initialize database table
dbSQL.serialize(() => {
  dbSQL.run(`CREATE TABLE IF NOT EXISTS images (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    filename TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`);
});

module.exports = dbSQL