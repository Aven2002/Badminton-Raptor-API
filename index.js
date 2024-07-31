// index.js
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const equipmentRoutes = require('./routes/equipmentRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const favoriteRoutes = require('./routes/favoriteRoutes');
const accountRoutes = require('./routes/accountRoutes');

const app = express();
const port = 3000;

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const category = req.body.equipCategory;
    if (!category) {
      return cb(new Error('Category is not specified'), null);
    }
    const uploadPath = path.join(__dirname, 'assets', category);
    fs.mkdir(uploadPath, { recursive: true }, (err) => {
      if (err) {
        return cb(err, null);
      }
      cb(null, uploadPath);
    });
  },
  filename: (req, file, cb) => {
    // Make sure equipName is defined
    const equipName = JSON.parse(req.body.equipment).equipName || 'default_name';
    const fileExtension = path.extname(file.originalname);
    cb(null, `${equipName}${fileExtension}`);
  }
});


const upload = multer({ storage });

// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// API routes
app.use('/api/equipment', equipmentRoutes(upload));
app.use('/api/feedback', feedbackRoutes);
app.use('/api/favorite', favoriteRoutes);
app.use('/api/account', accountRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = upload; // Export multer configuration if needed elsewhere
