const router = require('express').Router()
const ClearanceController = require('../controllers/clearance')

router.get('/', ClearanceController.getAllClearances)

router.get('/view', ClearanceController.getEachClearance)

router.get('/approve/:clearance_id', ClearanceController.approveClearanceLevel)

router.get('/remove/:clearance_id', ClearanceController.removeClearance)

module.exports = router