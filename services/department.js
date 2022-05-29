const DepartmentModel = require('../models/department')

class DepartmentService {

  static async findById(id) {
    return DepartmentModel.findById(id)
  }

  static async findByName(name) {
    return DepartmentModel.find({department_name: new RegExp(name, 'ig')})
  }
  
  static async findAll() {
    return DepartmentModel.find({})
  }

  static async create(dao) {
    return DepartmentModel.create(dao)
  }

  static async removeOne(id) {
    return DepartmentModel.findByIdAndRemove(id)
  }

}

module.exports = DepartmentService