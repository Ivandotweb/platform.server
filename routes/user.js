const { Router } = require('express')
const router = Router()
const passport = require('passport')
const controller = require('../controllers/user')

router.post('/join', controller.join)
router.post('/login', controller.login)
router.post(
  '/auth',
  passport.authenticate('jwt', { session: false }),
  controller.auth
)

module.exports = router
