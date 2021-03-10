const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ROLES = require('../utils/roles')

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: ROLES.student,
  },
})

module.exports = mongoose.model('user', userSchema)
