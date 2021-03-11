const mongoose = require('mongoose')
const Schema = mongoose.Schema

const profileSchema = new Schema({
  name: {
    type: String,
    default: '',
  },
  email: {
    type: String,
    default: '',
  },
  registerDate: {
    type: String,
    default: '',
  },
  profilePic: {
    type: String,
    default: '',
  },
  id: {
    type: String,
    unique: true,
  },
})

module.exports = mongoose.model('Profile', profileSchema)
