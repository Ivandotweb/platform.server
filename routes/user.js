const { Router } = require('express')
const cookieParser = require('cookie-parser')
const router = Router()
const controller = require('../controllers/user')

router.post('/join', controller.join)

router.post('login', controller.login)

module.exports = router
