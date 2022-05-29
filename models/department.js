const mongoose = require('mongoose')
let DepartmentSchema = new mongoose.Schema({
  department_name: {
    type: String,
    unique: true,
  },
  faculty:  {
    type: String,
  },
})

module.exports = mongoose.model('department', DepartmentSchema)