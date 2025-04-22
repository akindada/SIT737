const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const User = require('./models/User');
const Feedback = require('./models/Feedback');

const app = express();
const port = process.env.PORT || 3001;

// MongoDB URI
const mongoURI = process.env.MONGO_URI || 'mongodb://mongo:27017/admin';

// Connect to MongoDB
mongoose.connect(mongoURI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

// Serve HTML page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// CREATE - Signup user
app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const newUser = new User({ name, email, password });
    await newUser.save();
    console.log(`✅ User saved: ${name}`);
    res.status(201).send({ message: `User ${name} signed up successfully.` });
  } catch (err) {
    console.error('❌ Error saving user:', err);
    res.status(500).send({ error: 'Error saving user.' });
  }
});

// CREATE - Feedback
app.post('/feedback', async (req, res) => {
  const { feedback } = req.body;
  try {
    const newFeedback = new Feedback({ feedback });
    await newFeedback.save();
    res.status(201).send({ message: 'Feedback submitted successfully.' });
  } catch (err) {
    res.status(500).send({ error: 'Error saving feedback.' });
  }
});

// READ - Get all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    res.status(500).send({ error: 'Failed to fetch users.' });
  }
});

// UPDATE - Update a user by ID
app.put('/users/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(updatedUser);
  } catch (err) {
    res.status(500).send({ error: 'Failed to update user.' });
  }
});

// DELETE - Delete a user by ID
app.delete('/users/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.send({ message: 'User deleted successfully.' });
  } catch (err) {
    res.status(500).send({ error: 'Failed to delete user.' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
