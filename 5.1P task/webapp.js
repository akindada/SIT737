const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware for parsing form data
app.use(bodyParser.urlencoded({ extended: true }));

// Global CSS styles
const styles = `
  <style>
    body {
      font-family: Arial, sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      margin: 0;
      background-color: #f4f4f4;
    }
    .container {
      text-align: center;
      background: white;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      width: 50%;
    }
    input, textarea {
      width: 90%;
      padding: 8px;
      margin: 10px 0;
      border: 1px solid #ccc;
      border-radius: 5px;
    }
    button, input[type="submit"] {
      background-color: #007bff;
      color: white;
      border: none;
      padding: 10px 20px;
      cursor: pointer;
      border-radius: 5px;
      margin-top: 10px;
    }
    button:hover, input[type="submit"]:hover {
      background-color: #0056b3;
    }
  </style>
`;

// Homepage Route
app.get('/', (req, res) => {
  res.send(`
    ${styles}
    <div class="container">
      <h1>Welcome! Please Sign Up</h1>
      <form action="/signup" method="post">
        <label>Name:</label><br>
        <input type="text" name="name" required><br>
        <label>Email:</label><br>
        <input type="email" name="email" required><br>
        <label>Password:</label><br>
        <input type="password" name="password" required><br>
        <input type="submit" value="Sign Up">
      </form>
    </div>
  `);
});

// Signup Route (POST)
app.post('/signup', (req, res) => {
  const { name, email, password } = req.body;
  console.log(`New user signed up: Name - ${name}, Email - ${email}`);

  // Redirect to feedback page after signup
  res.send(`
    ${styles}
    <div class="container">
      <h1>Thank you for signing up, ${name}!</h1>
      <form action="/feedback" method="post">
        <label>How was your signup experience?</label><br>
        <textarea name="feedback" rows="4" required></textarea><br>
        <input type="submit" value="Submit Feedback">
      </form>
    </div>
  `);
});

// Feedback Route (POST)
app.post('/feedback', (req, res) => {
  console.log("Feedback received");

  // Display only the thank-you message with a "Home" button
  res.send(`
    ${styles}
    <div class="container">
      <h1>Thank you for your feedback!</h1>
      <button onclick="window.location.href='/'">Home</button>
    </div>
  `);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
