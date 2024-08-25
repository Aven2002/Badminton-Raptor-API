const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const equipmentRoutes = require('./routes/equipmentRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const favoriteRoutes = require('./routes/favoriteRoutes');
const accountRoutes = require('./routes/accountRoutes');
const recommendationRoutes = require('./routes/recommendationRoutes');
const securityRoutes = require('./routes/securityRoutes');

const app = express();
const port = 3000;

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const category = req.body.equipCategory || 'default';
    const uploadPath = path.join(__dirname, 'assets', category);
    fs.mkdir(uploadPath, { recursive: true }, (err) => {
      if (err) {
        console.error('Error creating directory:', err);
        return cb(err, null);
      }
      console.log('Upload path:', uploadPath);
      cb(null, uploadPath);
    });
  },
  filename: (req, file, cb) => {
    let equipName = 'default_name';
    
    try {
      // If req.body.equipment is a JSON string, parse it
      equipName = req.body.equipment ? JSON.parse(req.body.equipment).equipName : 'default_name';
    } catch (error) {
      console.error('Error parsing req.body.equipment:', error);
    }
    
    const fileExtension = path.extname(file.originalname);
    const filename = `${equipName}${fileExtension}`;
    console.log('Generated filename:', filename); // Log the generated filename
    cb(null, filename);
  }
});

const upload = multer({ storage });

// Middleware setup
app.use(express.json()); 
app.use(cors());
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// API routes
app.use('/api/equipment', equipmentRoutes(upload));
app.use('/api/feedback', feedbackRoutes);
app.use('/api/favorite', favoriteRoutes);
app.use('/api/account', accountRoutes);
app.use('/api/recommendation', recommendationRoutes);
app.use('/api/security', securityRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = upload; // Export multer configuration if needed elsewhere
