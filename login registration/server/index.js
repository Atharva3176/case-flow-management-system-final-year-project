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

const accountSid = 'ACb3673ca9c0095dd9d70f4f3ad46ab259';
const authToken = '006814dee2488137216f99d31a8e44d2';
const client = new twilio(accountSid, authToken);

app.post('/send-otp', (req, res) => {
  const { mobileNumber } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000);

  client.messages.create({
    body: `Your OTP code is ${otp}`,
    from: '+918208912077',
    to: mobileNumber
  })
    .then(message => {
      res.status(200).json({ success: true, message: 'OTP sent successfully', otp });
    })
    .catch(error => {
      console.error('Twilio error:', error);
      res.status(500).json({ success: false, message: error.message });
    });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
