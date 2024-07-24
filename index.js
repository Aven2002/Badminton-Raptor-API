const express = require('express');
const cors = require('cors');
const path = require('path');

const equipmentRoutes = require('./routes/equipmentRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const favoriteRoutes = require('./routes/favoriteRoutes');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.use('/api/equipment', equipmentRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/favorite', favoriteRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
