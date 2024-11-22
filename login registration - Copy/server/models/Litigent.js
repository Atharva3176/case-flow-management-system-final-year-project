// models/CaseFilingLitigent.js
const mongoose = require('mongoose');

// Create a schema for case filing with litigant details
const CaseFilingLitigentSchema1 = new mongoose.Schema({
  formType: {
    type: String, // Petitioner or Respondent
    required: true,
    enum: ['Petitioner', 'Respondent']
  },
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  relation: {
    type: String
  },
  dob: {
    type: Date,
    required: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true
  },
  caste: {
    type: String
  },
  extraPetitionerCount: {
    type: Number
  },
  address: {
    type: String,
    required: true
  },
  email: {
    type: String
  },
  occupation: {
    type: String
  },
  mobileNo: {
    type: String,
    required: true
  },
  pinCode: {
    type: String
  },
  state: {
    type: String,
    required: true
  },
  taluka: {
    type: String
  },
  district: {
    type: String,
    required: true
  },
  village: {
    type: String
  },
  otherInfo: {
    type: Boolean
  },
  complainantName: {
    type: String
  },
  legalHeirName: {
    type: String
  },
  complainantAddress: {
    type: String
  },
  complainantOccupation: {
    type: String
  },
  efilingNumber: {
    type: String
  },
  caseType: {
    type: String
  },
  establishment: {
    type: String
  },
  dateFiled: {
    type: Date,
    default: Date.now
  },
  priorityLevel: { type: Number, default: 5 },  // Priority level (1 = high, 5 = low)
  urgent: { type: Boolean, default: false },
  hearingdate: [{type: String, required: true}],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Create the model
const Litigent = mongoose.model('Litigent', CaseFilingLitigentSchema1);

module.exports = Litigent;
