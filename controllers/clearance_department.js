const OfficeService = require('../services/clearance_office')

class OfficeController {

  static async getOfficesPage(req, res) {
    let offices
    if (req.query.search) {
      offices = await OfficeService.findByName(req.query.search)
    } else {
      offices = await OfficeService.findAll()
    }
    res.render('clearance_offices', { offices })
  }

  static async createOffice(req, res) {
    let dao = req.body
    try {
      await OfficeService.create(dao)
      res.redirect('/offices')
    } catch (err) {
      console.log(err)
      res.redirect('/offices')
    }
  }

  static async removeOffice(req, res) {
    try {
      await OfficeService.removeOne(req.params.office_id)
      res.redirect('/offices')
    } catch (err) {
      console.log(err)
      req.flash('error_msg', 'Last Operation Failed')
      res.redirect('/offices')
    }
  }

}

module.exports = OfficeController