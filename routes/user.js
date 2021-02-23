const { Router } = require('express')
const router = Router()
const controller = require('../controllers/user')

router.post('/join', controller.join)
router.post('/login', controller.login)
router.post('/auth', controller.auth)

module.exports = router
