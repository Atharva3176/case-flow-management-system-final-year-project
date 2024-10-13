const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const Registration = require('./models/Employee');
const CaseFilingLitigent = require('./models/CaseFilingLitigent'); // CaseFiling schema
const Litigent = require('./models/Litigent');
//const Captcha = require('captcha-generator');
const otpGenerator = require('otp-generator');
const nodemailer = require('nodemailer');
const crypto = require('crypto');


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

const otpSchema = new mongoose.Schema({
  email: String,
  otp: String,
  createdAt: { type: Date, expires: '5m', default: Date.now }
});

const OTP = mongoose.model('OTP', otpSchema);


// Generate OTP and send email
app.post('/generate-otp', async (req, res) => {
  const { email } = req.body;

  const otp = otpGenerator.generate(9);

  try {
    await OTP.create({ email, otp });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'xyz172838@gmail.com',
        pass: 'zvku roaw tggx hdhq'
      }
    });

    await transporter.sendMail({
      from: 'xyz172838@gmail.com',
      to: email,
      subject: 'OTP Verification',
      text: `Your OTP for verification is: ${otp}`
    });

    res.status(200).send('OTP sent successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error sending OTP');
  }
});

// Verify OTP
app.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;

  try {
    const otpRecord = await OTP.findOne({ email, otp }).exec();

    if (otpRecord) {
      res.status(200).send('OTP verified successfully');
    } else {
      res.status(400).send('Invalid OTP');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error verifying OTP');
  }
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

// POST API route to handle case filing data submission
app.post('/api/casefiling', async (req, res) => {
  try {
    const caseFiling = new CaseFilingLitigent({
      district: req.body.district,
      establishment: req.body.establishment,
      caseType: req.body.caseType,
      nature: req.body.nature,
      relief: req.body.relief,
      petitioner: req.body.petitioner,
      mobile: req.body.mobile
    });

    await caseFiling.save();
    res.status(201).json({ message: 'Case filed successfully', caseFiling });
  } catch (error) {
    console.error('Failed to file case:', error);
    res.status(500).json({ message: 'Failed to file case', error });
  }
});

app.post('/api/litigent/update', async (req, res) => {
  try {
    const {
      formType, name, age, relation, dob, gender, caste, extraPetitionerCount,
      address, email, occupation, mobileNo, pinCode, state, taluka, district, village,
      otherInfo, complainantName, legalHeirName, complainantAddress, complainantOccupation,
      efilingNumber, caseType, establishment
    } = req.body;

    const caseFiling = new Litigent({
      formType,
      name,
      age,
      relation,
      dob,
      gender,
      caste,
      extraPetitionerCount,
      address,
      email,
      occupation,
      mobileNo,
      pinCode,
      state,
      taluka,
      district,
      village,
      otherInfo,
      complainantName,
      legalHeirName,
      complainantAddress,
      complainantOccupation,
      efilingNumber,
      caseType,
      establishment
    });

    await caseFiling.save();
    res.status(201).json({ message: 'Case updated successfully', caseFiling });
  } catch (error) {
    console.error('Failed to file case:', error);
    res.status(500).json({ message: 'Failed to file case', error });
  }
});

// POST API route to handle case filing data submission
app.post('/api/litigent/submit', async (req, res) => {
  try {
    const {
      formType, name, age, relation, dob, gender, caste, extraPetitionerCount,
      address, email, occupation, mobileNo, pinCode, state, taluka, district, village,
      otherInfo, complainantName, legalHeirName, complainantAddress, complainantOccupation,
      efilingNumber, caseType, establishment
    } = req.body;

    const caseFiling = new Litigent({
      formType,
      name,
      age,
      relation,
      dob,
      gender,
      caste,
      extraPetitionerCount,
      address,
      email,
      occupation,
      mobileNo,
      pinCode,
      state,
      taluka,
      district,
      village,
      otherInfo,
      complainantName,
      legalHeirName,
      complainantAddress,
      complainantOccupation,
      efilingNumber,
      caseType,
      establishment
    });

    await caseFiling.save();
    res.status(201).json({ message: 'Case submitted successfully', caseFiling });
  } catch (error) {
    console.error('Failed to file case:', error);
    res.status(500).json({ message: 'Failed to file case', error });
  }
});


// app.post('/api/caseDetails', async (req, res) => {
//   const { caseType, establishment } = req.body; // Accept district and petitioner as input

//   try {
//     // Find the case filing based on district and petitioner
//     const caseFiling = await CaseFilingLitigent.findOne({ caseType, establishment });

//     if (!caseFiling) {
//       return res.status(404).json({ message: 'Case not found' });
//     }

//     const { caseType, establishment } = caseFiling;
//     res.status(200).json({ caseType, establishment });
//   } catch (error) {
//     console.error('Error fetching case details:', error);
//     res.status(500).json({ message: 'Failed to fetch case details', error });
//   }
// });


app.get('/api/caseDetails', async (req, res) => {
  try {
    // Fetch all case filings from the database
    const caseDetails = await CaseFilingLitigent.find({}, 'establishment caseType').lean();

    // Check if case details were found
    if (caseDetails.length === 0) {
      return res.status(404).json({ message: 'No case details found' });
    }

    // Send the establishment and caseType back as a response
    res.status(200).json(caseDetails);
  } catch (error) {
    console.error('Error fetching case details:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

