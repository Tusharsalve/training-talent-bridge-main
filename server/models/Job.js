
const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  location: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['Full-time', 'Part-time', 'Internship', 'Contract'],
    required: true
  },
  description: {
    type: String,
    required: true
  },
  requirements: [String],
  skills: [String],
  salary: String,
  postedDate: {
    type: Date,
    default: Date.now
  },
  deadline: Date,
  status: {
    type: String,
    enum: ['Open', 'Closed'],
    default: 'Open'
  }
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
