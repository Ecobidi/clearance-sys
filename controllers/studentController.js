const path = require('path')
let sharp = require('sharp')

const ClearanceService = require('../services/clearance')
const StudentService = require('../services/student')

const { streamUpload } = require('../config/cloudinary')

const { UPLOADS_PATH } = require('../config')
const offices = [ 'department', 'security', 'sports', 'library', 'medical', 'student_affairs', 'eed', 'stores', 'financial', 'disciplinary', 'identity_card' ]

async function uploadImageAndUpdateClearance(req, res) {
  let office = req.params.office
  try {
    let editedImage = await sharp(req.file.buffer).resize(520, 480).toBuffer()
    // console.log(editedImage)

    let uploadInfo = await streamUpload(editedImage, process.env.PROJECT_CLOUDINARY_IMAGE_FOLDER)
    
    let image_name = uploadInfo.url

    let cr = {}
    cr.date_started = new Date()
    cr.document_image = {}
    cr.document_image.url = image_name
    cr.document_image.clearance_document_name = office

    // console.log(uploadInfo)

    let update_dao = {}
    update_dao[office] = cr
    // update_dao['current_office'] = office
    // let update_dao = getByOfficeName(office, cr)
    await ClearanceService.updateClearance(req.session.student._id, update_dao)
    req.flash('success_msg', 'Document uploaded')
    res.redirect('/student/home')
  } catch (error) {
    console.log('Error While Uploading Clearance Document. ', error)
    req.flash('error_msg', 'Error Uploading Clearance Document')
    res.redirect('/student/home')
  }
}

class StudentController {
  static async getHomePage(req, res) {
    let myClearance = await ClearanceService.findByStudentId(req.session.student._id)
    // console.log(myClearance)
    let keys = Object.keys(myClearance.toObject())
    let clearanceStatusObj = {}

    offices.forEach(k => {
      clearanceStatusObj[k] = { ...(myClearance[k].toObject()), level: k }
    } )

    let clearanceArray = offices.map(k => ({ ...(myClearance[k].toObject()), level: k }))
    // console.log(clearanceArray)
    res.render('student/home', { clearance: myClearance, clearanceArray, clearanceStatusObj, student: req.session.student })
  }

  static async handleClearanceSubmit(req, res) {
    uploadImageAndUpdateClearance(req, res)
  }

  static async getLoginPage(req, res) {
    res.render('student/login')
  }

  static async handleLogin(req, res) {
    let dao = req.body
    try {
      let student = await StudentService.findByRegNo(dao.matric_no)
      if (!student) {
        req.flash('error_msg', 'No such student found')
        return res.redirect('/student/login')
      }
      if (dao.password != student.password) {
        req.flash('error_msg', 'Incorrect password')
        return res.redirect('/student/login')
      }
      req.session.student = student
      res.redirect('/student/home')
    } catch (error) {
      console.log(error)
      req.flash('error_msg', 'An Error Occurred!')
      res.redirect('/student/login')
    }
  }

  static async handleLogout(req, res) {
    req.session.student = null
    res.redirect('/student/login')
  }
}

module.exports = StudentController