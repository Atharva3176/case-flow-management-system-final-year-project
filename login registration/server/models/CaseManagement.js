const mongoose = require('mongoose');

const caseManagementSchema = new mongoose.Schema({
  causeOfAction: { type: String, required: true },
  dateOfCause: { type: Date, required: true },
  importantInfo: { type: String },
  prayer: { type: String },
  valuation: { type: Number },
  localPlaint: { type: Boolean, default: false },
  
  state: { type: String, required: true },
  district: { type: String, required: true },
  taluka: { type: String, required: true },
  village: { type: String, required: true },

  acts: [{
    act: { type: String, required: true },
    section: { type: String, required: true }
  }],
  
  vadasKaran: { type: String, required: true },
  mahatwachiMahiti: { type: String, required: true },
  keleliMagni: { type: String, required: true },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Create the model using the schema
const CaseManagement = mongoose.model('CaseManagement', caseManagementSchema);

module.exports = CaseManagement;
