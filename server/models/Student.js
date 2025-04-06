
const mongoose = require('mongoose');
const User = require('./User');

const educationSchema = new mongoose.Schema({
  institution: {
    type: String,
    required: true
  },
  degree: {
    type: String,
    required: true
  },
  field: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date || String
  },
  grade: String
});

const experienceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date || String
  },
  description: String
});

const studentSchema = new mongoose.Schema({
  education: [educationSchema],
  skills: [String],
  experience: [experienceSchema],
  resume: String,
  bio: String
});

const Student = User.discriminator('student', studentSchema);

module.exports = Student;
