const mongoose = require('mongoose')
let FacultySchema = new mongoose.Schema({
  faculty_name: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('faculty', FacultySchema)