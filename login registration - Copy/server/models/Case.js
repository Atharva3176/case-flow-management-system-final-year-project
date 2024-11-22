const mongoose = require('mongoose');

const caseSchema = new mongoose.Schema({
  efilingNumber: String,      // Corresponds to 'Case: {caseItem.efilingNumber}'
  caseType: String,           // Corresponds to 'Case Type: {caseItem.caseType}'
  establishment: String,      // Corresponds to 'Establishment: {caseItem.establishment}'
  dateFiled: Date,            // Corresponds to 'Date Filed: {caseItem.dateFiled}'
  urgent: Boolean,            // Corresponds to 'Urgent: {caseItem.urgent ? 'Yes' : 'No'}'
  priorityLevel: Number,      // Corresponds to calculated priority level (1 or 2 for 'High Priority' or 'Low Priority')
  hearingDate: Date,          // Corresponds to the selected hearing date from DatePicker
});

const Case = mongoose.model('Case', caseSchema);

module.exports = Case;
