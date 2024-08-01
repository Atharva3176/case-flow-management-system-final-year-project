const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const Registration = require('./models/Employee');
const twilio = require('twilio');

const app = express();
const port = 3001;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/registration', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Routes
app.post('/api/register', async (req, res) => {
  try {
    const { password, confirmPassword, ...rest } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).send({ message: "Passwords do not match" });
    }
    const registration = new Registration({ ...rest, password });
    await registration.save();
    res.status(201).send(registration);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await Registration.findOne({
      $or: [{ email: username }, { mobileNumber: username }]
    });

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ message: "Invalid credentials" });
    }

    res.status(200).send({ message: "Login successful" });
  } catch (error) {
    console.error("There was an error logging in!", error);
    res.status(500).send(error);
  }
});

