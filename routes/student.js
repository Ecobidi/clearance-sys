const router = require('express').Router()
const StudentController = require('../controllers/student')

router.get('/', StudentController.getStudentsPage)

// router.get('/goto-get-result', StudentController.gotoGetResult)

// router.get('/get-result', StudentController.handleGetResult)

// router.get('/compute-result', StudentController.getComputeResult)

// router.post('/compute-result', StudentController.computeResult)

router.get('/new', StudentController.createStudentPage)

router.post('/new', StudentController.createStudent)

router.get('/remove/:student_id', StudentController.removeStudent)

module.exports = router