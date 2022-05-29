const ClearanceModel = require('../models/clearance')

class ClearanceService {

  static async findById(id) {
    return ClearanceModel.findById(id).sort('-updated_at').populate('student', '-password').exec()
  }

  static async findByStudentId(student_id) {
    return ClearanceModel.findOne({student: student_id}).sort('-updated_at').populate('student', '-password').exec()
  }
  
  static async findAll() {
    return ClearanceModel.find({}).sort('-updated_at').populate('student', '-password').exec()
  }

  static async create(dao) {
    return ClearanceModel.create(dao)
  }

  static async updateClearance(student_id, newUpdate) {
    return ClearanceModel.findOneAndUpdate({student: student_id}, {$set: newUpdate})
  }

  static async removeOne(id) {
    return ClearanceModel.findByIdAndRemove(id)
  }

}

module.exports = ClearanceService