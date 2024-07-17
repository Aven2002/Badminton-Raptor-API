const express = require('express');
const mysql = require('mysql');
const app = express();
const cors = require('cors');
const port = 3000;

app.use(cors()); 

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'badminton_raptor_db'
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySQL connected...');
});

// Get all equipment
app.get('/api/equipment', (req, res) => {
  const sql = 'SELECT * FROM product';
  db.query(sql, (err, results) => {
    if (err) {
      throw err;
    }
    res.json(results);
  });
});

// Other API endpoints (POST, PUT, DELETE) will similarly interact with MySQL

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
