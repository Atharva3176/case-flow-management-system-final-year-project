const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const Registration = require('./models/Employee');
const CaseFilingLitigent = require('./models/CaseFilingLitigent'); // CaseFiling schema
const Litigent = require('./models/Litigent');
const CaseManagement = require('./models/CaseManagement');
const Case = require('./models/Case')
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

// POST API route for Case Management
app.post('/api/case-management', async (req, res) => {
  try {
    const {
      causeOfAction,
      dateOfCause,
      importantInfo,
      prayer,
      valuation,
      localPlaint,
      state,
      district,
      taluka,
      village,
      acts,
      vadasKaran,
      mahatwachiMahiti,
      keleliMagni,
    } = req.body;

    //console.log('Incoming request body:', req.body); 

    const caseManagement = new CaseManagement({
      causeOfAction,
      dateOfCause,
      importantInfo,
      prayer,
      valuation,
      localPlaint,
      state,
      district,
      taluka,
      village,
      acts,
      vadasKaran,
      mahatwachiMahiti,
      keleliMagni,
    });

    await caseManagement.save();
    res.status(201).json({ message: 'Case management entry created successfully', caseManagement });
  } catch (error) {
    console.error('Failed to create case management entry:', error);
    res.status(500).json({ message: 'Failed to create case management entry', error });
  }
});

app.get('/case-management', async (req, res) => {
  try {
    // Fetch and sort case management entries by createdAt in descending order
    const caseManagements = await CaseManagement.find().sort({ createdAt: -1 }); // -1 for descending order
    res.status(200).json(caseManagements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/casefillingfetch', async (req, res) => {
  try {
    const casefilingfetch = await CaseFilingLitigent.find().sort({ createdAt: -1 });
    res.status(200).json(casefilingfetch);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/caselitigent', async (req, res) => {
  try {
    // Fetch the most recent litigant entry sorted by createdAt in descending order
    const recentLitigent = await Litigent.find().sort({ createdAt: -1 }).limit(10);  // Find the last entry

    

    // Return the most recent litigant entry in an array (if needed for consistency)
    res.status(200).json(recentLitigent);  // Wrap it in an array
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/caselitigent1', async (req, res) => {
  try {
    // Fetch the most recent litigant entry sorted by createdAt in descending order
    const recentLitigent = await Litigent.find();  // Find the last entry

    

    // Return the most recent litigant entry in an array (if needed for consistency)
    res.status(200).json(recentLitigent);  // Wrap it in an array
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// New API route to fetch case details by e-filing number
app.get('/api/caseDetails/:eFilingNumber', async (req, res) => {
  const { eFilingNumber } = req.params;

  try {
    // Search for the case using the e-filing number in the Litigent collection
    const caseDetail = await Litigent.findOne({ efilingNumber: eFilingNumber });

    if (!caseDetail) {
      return res.status(404).json({ message: 'Case not found' });
    }

    res.status(200).json(caseDetail); // Return the found case details
  } catch (error) {
    console.error('Error fetching case details:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.get('/api/caseDetails1', async (req, res) => {
  try {
    // Fetch all cases, sorted by priority level and date filed
    const caseDetails = await CaseFilingLitigent.find({})
      .sort({ urgent: -1, priorityLevel: 1, dateFiled: 1 }) // Urgent, then priority, then oldest first
      .lean();

    if (caseDetails.length === 0) {
      return res.status(404).json({ message: 'No case details found' });
    }

    res.status(200).json(caseDetails);
  } catch (error) {
    console.error('Error fetching case details:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



// GET API route to retrieve eFiling numbers from the Litigent schema
app.get('/api/case', async (req, res) => {
  try {
    // Fetch all case filings from the database
    const caseDetails = await Litigent.find({}, 'efilingNumber').lean();

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

app.get('/api/session', async (req, res) => {
  try {
    // Fetch all case filings from the database
    const caseDetails = await Registration.find({}, 'advocateName').lean();

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


app.put('/caselitigent/:efilingNumber', async (req, res) => {
  try {
    const efilingNumber = req.params.efilingNumber; // Get efilingNumber from the URL
    const { hearingDate, caseType, establishment, dateFiled, urgent, priorityLevel } = req.body; // Extract the relevant fields from the request body

    // Try to find the case by efilingNumber
    let caseItem = await Case.findOne({ efilingNumber });

    if (!caseItem) {
      // If the case doesn't exist, create a new case with the data
      caseItem = new Case({
        efilingNumber,
        hearingDate: hearingDate || null, // Save the hearing date if available
        caseType,
        establishment,
        dateFiled,
        urgent,
        priorityLevel,
      });
    } else {
      // If the case exists, update it with the provided data
      caseItem.hearingDate = hearingDate || caseItem.hearingDate;
      caseItem.caseType = caseType || caseItem.caseType;
      caseItem.establishment = establishment || caseItem.establishment;
      caseItem.dateFiled = dateFiled || caseItem.dateFiled;
      caseItem.urgent = urgent !== undefined ? urgent : caseItem.urgent;
      caseItem.priorityLevel = priorityLevel !== undefined ? priorityLevel : caseItem.priorityLevel;
    }

    // Save the case (new or updated) in the database
    await caseItem.save();

    res.status(200).json({ message: 'Case data saved successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error saving case data', error: err });
  }
});

// Endpoint to send case data to the entered email
app.post('/send-case-data', async (req, res) => {
  const { email } = req.body;

  try {
    // Fetch all case data from the MongoDB database
    const cases = await Case.find();

    if (cases.length === 0) {
      return res.status(404).send('No cases found');
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'xyz172838@gmail.com',
        pass: 'zvku roaw tggx hdhq',  // Store securely in production
      },
    });

    // Format the case data to send
    const caseDetails = cases
      .map(
        (caseItem) =>
          `Case: ${caseItem.efilingNumber}\nCase Type: ${caseItem.caseType}\nEstablishment: ${caseItem.establishment}\nDate Filed: ${caseItem.dateFiled.toLocaleDateString()}\nUrgent: ${caseItem.urgent ? 'Yes' : 'No'}\nPriority Level: ${caseItem.priorityLevel === 1 ? 'High' : 'Low'}\nHearing Date: ${caseItem.hearingDate ? caseItem.hearingDate.toLocaleDateString() : 'Not assigned'}`
      )
      .join('\n\n');

    // Send the email
    await transporter.sendMail({
      from: 'xyz172838@gmail.com',
      to: email,
      subject: 'Case Data with Hearing Date',
      text: `Here are the details of your case(s):\n\n${caseDetails}`,
    });

    res.status(200).send('Data sent successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error sending email');
  }
});




app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

