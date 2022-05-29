const mongoose = require('mongoose')
let ClearanceDepartmentSchema = new mongoose.Schema({
  department_name: {
    type: String,
    required: true,
  },
  clearance_order: {
    type: Number,
    required: true,
    unique: true,
  }
})

module.exports = mongoose.model('clearance_department', ClearanceDepartmentSchema)