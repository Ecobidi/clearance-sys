const mongoose = require('mongoose')

const Requirements = new mongoose.Schema({
  name_of_requirement: {
    type: String,
    required: true,
  }
})

const DepartmentRequirementSchema = new mongoose.Schema({
  department_id: {
    
  },
  department_name: {
    type: String,
    required: true,
  },
  numerical_order: {
    type: Number,
    required: true,
  },
  requirements: [ Requirements ]
})

module.exports = mongoose.model('department_requirement', DepartmentRequirementSchema)