const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3300;

// Create a connection pool
const pool = mysql.createPool({
  host: 'localhost',  
  user: 'user',       
  password: 'your_password', 
  database: 'project'   
});

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public'))
const validateSignupData = (req, res, next) => {
  
  if (!req.body.first_name || !req.body.last_name || !req.body.date_of_birth || !req.body.gender || !req.body.email || !req.body.phone || !req.body.password || !req.body.confirm_password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  next();
};

app.post('/signup', validateSignupData, (req, res) => {
  const { first_name, last_name, date_of_birth, gender, email, phone, password } = req.body;

  pool.query('SELECT * FROM users WHERE email = ?', [email], (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (results.length > 0) {
      return res.status(409).json({ error: 'Email already exists' });
    }

    pool.query('INSERT INTO users (first_name, last_name, date_of_birth, gender, email, phone, password) VALUES (?, ?, ?, ?, ?, ?, ?)', [first_name, last_name, date_of_birth, gender, email, phone, password], (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
      }

      return res.status(200).json({ message: 'Signup successful' });
    });
  });
});




// Handle login form submission
app.get('/home.html', (req, res) => {
  const username = req.query.username;
  const password = req.query.password;

  // Construct SQL query
  const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
  const values = [username, password];

  // Execute the query
  connection.query(sql, values, (error, results) => {
    if (error) {
      console.error('Error occurred during login:', error);
      res.status(500).json({ error: 'An error occurred during login.' });
    } else {
      if (results.length > 0) {
        console.log('Login successful!');
        res.sendFile(__dirname + '/home.html');
      } else {
        console.log('Invalid username or password');
        res.sendFile(__dirname + '/login.html');
      }
    }
  });
});




// Register route
app.post('/register', (req, res) => {
  const { fullName, email, phone, attendees, options, comments } = req.body;

  // Construct SQL query
  const sql = 'INSERT INTO registrations (fullName, email, phone, attendees, options, comments) VALUES (?, ?, ?, ?, ?, ?)';
  const values = [fullName, email, phone, attendees, options.join(','), comments];

  // Execute the query
  connection.query(sql, values, (error, results) => {
    if (error) {
      console.error('Error occurred during registration:', error);
      res.status(500).json({ error: 'An error occurred during registration.' });
    } else {
      console.log('Registration successful!');
      res.status(200).json({ message: 'Registration successful!' });
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
