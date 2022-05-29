const mongoose = require('mongoose')

const RequirementSchema = new mongoose.Schema({
  // requirement_name: {
  //   type: String,
  //   required: true,
  // },
  // requirement_numerical_order: {
  //   type: Number,
  //   required: true,
  // },
  status: {
    type: String,
    enum: ['cleared', 'awaiting', 'rejected'],
    default: 'awaiting'
  },
  cleared: {
    type: Boolean,
    default: false,
  },
  document_image: { 
    url: {
      type: String,
    },
    // public_name: {
    //   type: String,
    // },
    // clearance_document_name: {
    //   type: String,
    // },
   }
})

const ClearanceSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,
    ref: 'student'
  },
  cleared: {
    type: Boolean,
    default: false,
  },
  is_awaiting_confirmation: {
    type: Boolean,
    default: false,
  },
  current_office: String,
  // requirements: [ RequirementSchema ],
  department: RequirementSchema,
  security: RequirementSchema,
  sports: RequirementSchema,
  library: RequirementSchema,
  medical: RequirementSchema,
  student_affairs: RequirementSchema,
  eed: RequirementSchema,
  stores: RequirementSchema,
  financial: RequirementSchema,
  disciplinary: RequirementSchema,
  identity_card: RequirementSchema,
}, {timestamps: {updatedAt: 'updated_at'}})

module.exports = mongoose.model('clearance', ClearanceSchema)

module.exports.ClearanceRequirementSchema = RequirementSchema