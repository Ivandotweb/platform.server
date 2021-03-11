const { Router } = require('express')
const router = Router()
const controller = require('../controllers/profile')
const passport = require('passport')

router.post(
  '/get',
  passport.authenticate('jwt', { session: false }),
  controller.get
)
router.post(
  '/update',
  passport.authenticate('jwt', { session: false }),
  controller.update
)

module.exports = router
