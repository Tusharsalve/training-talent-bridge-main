
const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['Applied', 'Under Review', 'Shortlisted', 'Rejected', 'Offered', 'Accepted', 'Withdrawn'],
    default: 'Applied'
  },
  appliedDate: {
    type: Date,
    default: Date.now
  },
  coverLetter: String
});

// Ensure one student can apply to a job only once
applicationSchema.index({ job: 1, student: 1 }, { unique: true });

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;
