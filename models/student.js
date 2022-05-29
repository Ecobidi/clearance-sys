const mongoose = require('mongoose')

let StudentSchema = new mongoose.Schema({
  matric_no: {
    type: String,
    required: true,
    unique: true,
  },
  surname: {
    type: String,
    required: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  middle_name: {
    type: String,
  },
  department: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
  },
  password: {
    type: String,
    default: '1234',
  }
})

module.exports = mongoose.model('student', StudentSchema)