const StudentService = require('../services/student')
const ClearanceService = require('../services/clearance')
const DepartmentService = require('../services/department')

const offices = [ 'department', 'security', 'sports', 'library', 'medical', 'student_affairs', 'eed', 'stores', 'financial', 'disciplinary', 'identity_card' ]

class StudentController {

  static async getStudentsPage(req, res) {
    let students
    if (req.query.search && req.query.search.length > 1) {
      students = await StudentService.findByName(req.query.search) 
    } else {
      students = await StudentService.findAll()
    }
    res.render('students', {students})
  }
 
  static async createStudentPage(req, res) {
    let departments = await DepartmentService.findAll()
    res.render('students-new', {departments})
  }

  static async createStudent(req, res) {
    let dao = req.body
    dao.password = '1234'
    try {

      let student = await StudentService.create(dao)

      let obj = {}
      offices.forEach(o => obj[o] = {})

      await ClearanceService.create({student: student._id, ...obj })
      res.redirect('/students')
    } catch (err) {
      console.log(err)
      res.redirect('/students')
    }
  }

  // static async gotoGetResult(req, res) {
  //   res.render('goto-get-result')
  // }

  // static async handleGetResult(req, res) {
  //   try {
  //     let student = await StudentService.findByRegNo(req.query.student_reg_no)
  //     let result = await ResultService.findByStudentRegNo(req.query.student_reg_no)
  //     res.render('students-result', {student, result})
  //   } catch (error) {
  //     console.log(err)
  //     req.flash('error_msg', 'Last Operation Failed')
  //     res.redirect('/students')
  //   }
  // }

  // static async getComputeResult(req, res) {
  //   try {
  //     let student = await StudentService.findById(req.query.student_id)
  //     res.render('compute-result', {student})
  //   } catch (error) {
  //     console.log(err)
  //     req.flash('error_msg', 'Last Operation Failed')
  //     res.redirect('/students')
  //   }
  // }

  // static async computeResult(req, res) {
  //   let dao = req.body
  //   try {
  //     await ResultService.create(dao)
  //   } catch (error) {
  //     console.log(err)
  //     req.flash('error_msg', 'Last Operation Failed')
  //     res.redirect('/students')
  //   }
  // }

  static async removeStudent(req, res) {
    try {
      await StudentService.removeOne(req.params.student_id)
      res.redirect('/students')
    } catch (err) {
      console.log(err)
      req.flash('error_msg', 'Last Operation Failed')
      res.redirect('/students')
    }
  }

}

module.exports = StudentController