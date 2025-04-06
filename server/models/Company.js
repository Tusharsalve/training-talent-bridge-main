
const mongoose = require('mongoose');
const User = require('./User');

const companySchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  industry: {
    type: String,
    required: true
  },
  website: String,
  logo: String
});

const Company = User.discriminator('company', companySchema);

module.exports = Company;
