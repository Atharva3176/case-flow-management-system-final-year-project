const mongoose = require('mongoose');

// Define the schema for the case filing and litigant information
const caseFilingLitigentSchema = new mongoose.Schema({
  district: { type: String, required: true },
  establishment: { type: String, required: true },
  caseType: { type: String, required: true },
  nature: { type: String, enum: ['Civil', 'Criminal'], required: true },
  relief: { type: String, required: true },
  petitioner: { type: String, required: true }, // New field for petitioner's name
  mobile: { type: String, required: true }, // New field for mobile number
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  priorityLevel: { type: Number, default: 1 },  // Priority level (1 = high, 5 = low)
  urgent: { type: Boolean, default: false },
  //hearingdate: [{type: String, required: true}]   
});

// Create the model using the schema
const CaseFilingLitigent = mongoose.model('CaseFilingLitigent', caseFilingLitigentSchema);

module.exports = CaseFilingLitigent;
