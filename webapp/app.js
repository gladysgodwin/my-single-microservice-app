
const express = require('express');
const app = express();
const port = 3000;
const mysql = require('mysql');
const bodyParser = require('body-parser');

// MySQL database configuration
const connection = mysql.createConnection({
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});

// Connect to the MySQL database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database!');
});

// Set up EJS as the view engine
app.set('view engine', 'ejs');

// Use body-parser middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Route to display the form
app.get('/', (req, res) => {
  res.render('form');
});

// Route to handle form submission
app.post('/submit', (req, res) => {
  const name = req.body.name;
  const age = req.body.age;

  // Insert data into the MySQL database
  const insertQuery = 'INSERT INTO users (name, age) VALUES (?, ?)';
  connection.query(insertQuery, [name, age], (err, result) => {
    if (err) {
      console.error('Error inserting data into the database:', err);
      res.status(500).send('Error inserting data into the database.');
    } else {
      res.send('Data inserted successfully!');
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Microservice is running on http://localhost:${port}`);
});
