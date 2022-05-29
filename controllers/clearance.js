const ClearanceService = require('../services/clearance')

const offices = [ 'department', 'security', 'sports', 'library', 'medical', 'student_affairs', 'eed', 'stores', 'financial', 'disciplinary', 'identity_card' ]

class ClearanceController {
  static async getAllClearances(req, res) {
    let clearances = await ClearanceService.findAll()
    // console.log(clearances)
    res.render('clearances', { clearances })
  }

  static async getEachClearance(req, res) {
    
    try {
      let clearance
      let stages
      if (req.query.student_id) clearance = await ClearanceService.findByStudentId(req.query.student_id)
      else clearance = await ClearanceService.findById(req.query.clearance_id)
      if (!clearance) throw new Error('Invalid Clearance ID')
      stages = offices.map(k => {
        let a = clearance[k]
        return {...(a.toObject()), level: k}
      } )
      res.render('clearance-page', { stages, clearance })
    } catch (error) {
      console.log(error)
      req.flash('error_msg', error_msg)
      res.redirect('/clearances')
    }
  }

  static async approveClearanceLevel(req, res) {
    let level = req.query.level
    try {
      if (offices.indexOf(level) < 0) throw new Error('Error Approving Document: Invalid Level')
      let clearance = await ClearanceService.findById(req.params.clearance_id)
      if (!clearance) throw new Error('Error Approving Document: Invalid Clearance ID')
      clearance[level].cleared = true
      clearance[level].status = 'cleared'
      await clearance.save()
      req.flash('success_msg', `Document for ${level} approved`)
      res.redirect('/clearances/view?clearance_id=' + req.params.clearance_id)
    } catch (error) {
      console.log(error)
      req.flash('error_msg', error.message)
      res.redirect('/clearances')
    }
  }

  static async finallyClearStudent(req, res) {
    try {
      let clearance = await ClearanceService.findById(req.params.clearance_id)
      if (!clearance) throw new Error('Error Approving Document: Invalid Clearance ID')
      clearance.cleared = true
      await clearance.save()
      req.flash('success_msg', `Successfully Cleared Student`)
      res.redirect('/clearances?clearance_id=' + req.params.clearance_id)
    } catch (error) {
      console.log(error)
      req.flash('error_msg', error.message)
      res.redirect('/clearances')
    }
  }

  static async removeClearance(req, res) {
    try {
      await ClearanceService.removeOne(req.params.clearance_id)
      res.redirect('/clearances')
    } catch (err) {
      console.log(err)
      req.flash('error_msg', 'Last Operation Failed')
      res.redirect('/clearances')
    }
  }
}

module.exports = ClearanceController