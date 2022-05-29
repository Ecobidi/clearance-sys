const StudentModel = require('../models/student')

class StudentService {
  
  static async findByName(name) {
    let pattern = new RegExp(name, 'ig')
    return StudentModel.find({$or: [{surname: pattern}, {first_name: pattern}]})
  }

  static async findByRegNo(matric_no) {
    return StudentModel.findOne({matric_no})
  }

  static async findById(id) {
    return StudentModel.findById(id)
  }
  
  static async findAll() {
    return StudentModel.find()
  }

  static async create(dao) {
    return StudentModel.create(dao)
  }

  static async removeOne(id) {
    return StudentModel.findByIdAndRemove(id)
  }

}

module.exports = StudentService