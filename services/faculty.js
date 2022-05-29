const FacultyModel = require('../models/faculty')

class FacultyService {

  static async findById(id) {
    return FacultyModel.findById(id)
  }

  static async findByName(name) {
    return Faculty.find({faculty_name: new RegExp(name, 'ig')})
  }
  
  static async findAll() {
    return FacultyModel.find({})
  }

  static async create(dao) {
    return FacultyModel.create(dao)
  }

  static async removeOne(id) {
    return FacultyModel.findByIdAndRemove(id)
  }

}

module.exports = FacultyService