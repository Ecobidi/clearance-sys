const DepartmentService = require('../services/department')
const FacultyService = require('../services/faculty')

class DepartmentController {

  static async getDepartmentsPage(req, res) {
    let departments
    let faculties = await FacultyService.findAll()
    if (req.query.search) {
      departments = await DepartmentService.findByName(req.query.search)
    } else {
      departments = await DepartmentService.findAll()
    }
    res.render('departments', {departments, faculties})
  }

  static async createDepartment(req, res) {
    let dao = req.body
    try {
      await DepartmentService.create(dao)
      res.redirect('/departments')
    } catch (err) {
      console.log(err)
      res.redirect('/departments')
    }
  }

  static async removeDepartment(req, res) {
    try {
      await DepartmentService.removeOne(req.params.department_id)
      res.redirect('/departments')
    } catch (err) {
      console.log(err)
      req.flash('error_msg', 'Last Operation Failed')
      res.redirect('/departments')
    }
  }

}

module.exports = DepartmentController