const router = require('express').Router()
const FacultyController = require('../controllers/faculty')

router.get('/', FacultyController.getFacultiesPage)

router.post('/new', FacultyController.createFaculty)

router.get('/remove/:faculty_id', FacultyController.removeFaculty)

module.exports = router