const FacultyService = require('../services/faculty')

class FlightController {

  static async getFacultiesPage(req, res) {
    let faculties
    if (req.query.search) {
      faculties = await FacultyService.findByName(req.query.search)
    } else {
      faculties = await FacultyService.findAll()
    }
    res.render('faculties', { faculties })
  }

  static async createFaculty(req, res) {
    let dao = req.body
    try {
      await FacultyService.create(dao)
      res.redirect('/faculties')
    } catch (err) {
      console.log(err)
      res.redirect('/faculties')
    }
  }

  static async removeFaculty(req, res) {
    try {
      await FacultyService.removeOne(req.params.faculty_id)
      res.redirect('/faculties')
    } catch (err) {
      console.log(err)
      req.flash('error_msg', 'Last Operation Failed')
      res.redirect('/faculties')
    }
  }

}

module.exports = FlightController