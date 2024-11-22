const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const RegistrationSchema = new mongoose.Schema({
  state: { type: String, required: true },
  barRegistrationNumber: { type: String, required: true },
  advocateName: { type: String, required: true },
  gender: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  placeOfPractice: { type: String, required: true },
  district: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  otp: { type: String, required: true},
  createdAt: { type: Date, expires: '1m', default: Date.now }
});

// Pre-save hook to hash the password before saving it to the database
RegistrationSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const Registration = mongoose.model('Registration', RegistrationSchema);

module.exports = Registration;
