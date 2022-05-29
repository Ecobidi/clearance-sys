const multer = require('multer')
const router = require('express').Router()
const StudentClientController = require('../controllers/studentController')

const upload = multer({})

router.get('/login', StudentClientController.getLoginPage)

router.post('/login', StudentClientController.handleLogin)

router.use('/', (req, res, next) => {
  // for authenticating login 
  if (req.session.student) {
    next()
  } else {
    res.redirect('/student/login')
  }
})  

router.get('/logout', StudentClientController.handleLogout)

router.post('/clearance/:office', upload.single('image'), StudentClientController.handleClearanceSubmit)

router.get('/home', StudentClientController.getHomePage)

module.exports = router