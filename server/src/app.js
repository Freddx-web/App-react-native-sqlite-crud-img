const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan')
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

const connectDB = require('./config/db');
const dbSQL = require('./config/sql')
const authRoutes = require('./routes/authRoutes');

dotenv.config();

connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));


// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = './uploads';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });


// Routes
// Create - Upload an image
app.post('/api/images', upload.single('image'), (req, res) => {
  const { title, description } = req.body;
  const filename = req.file.filename;

  dbSQL.run(
    'INSERT INTO images (title, description, filename) VALUES (?, ?, ?)',
    [title, description, filename],
    function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({
        id: this.lastID,
        title,
        description,
        filename,
        imageUrl: `http://localhost:${PORT}/uploads/${filename}`
      });
    }
  );
});

// Read - Get all images
app.get('/api/images', (req, res) => {
  dbSQL.all('SELECT *, filename as imageUrl FROM images', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    const images = rows.map(row => ({
      ...row,
      imageUrl: `http://localhost:${PORT}/uploads/${row.filename}`
    }));
    res.json(images);
  });
});

// Read - Get a single image
app.get('/api/images/:id', (req, res) => {
  const { id } = req.params;

  dbSQL.get('SELECT * FROM images WHERE id = ?', [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: 'Image not found' });
    }
    res.json({
      ...row,
      imageUrl: `http://localhost:${PORT}/uploads/${row.filename}`
    });
  });
});

// Update - Update image details
app.put('/api/images/:id', (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  dbSQL.run(
    'UPDATE images SET title = ?, description = ? WHERE id = ?',
    [title, description, id],
    function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (this.changes === 0) {
        return res.status(404).json({ error: 'Image not found' });
      }
      db.get('SELECT * FROM images WHERE id = ?', [id], (err, row) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.json({
          ...row,
          imageUrl: `http://localhost:${PORT}/uploads/${row.filename}`
        });
      });
    }
  );
});

// Delete - Remove an image
app.delete('/api/images/:id', (req, res) => {
  const { id } = req.params;

  // First get the filename to delete the file from uploads
  dbSQL.get('SELECT filename FROM images WHERE id = ?', [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: 'Image not found' });
    }

    // Delete the file
    fs.unlink(`./uploads/${row.filename}`, (err) => {
      if (err && err.code !== 'ENOENT') { // Ignore file not found error
        return res.status(500).json({ error: err.message });
      }

      // Delete the database record
      dbSQL.run('DELETE FROM images WHERE id = ?', [id], function(err) {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Image deleted successfully' });
      });
    });
  });
});

// Routes
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});