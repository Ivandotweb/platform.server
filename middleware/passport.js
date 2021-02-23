const JwtStrategy = require('passport-jwt').Strategy
const ExtractJat = require('passport-jwt').ExtractJwt
const mongoose = require('mongoose')
const User = mongoose.model('user')
const keys = require('../config/keys')

const opts = {
  jwtFromRequest: ExtractJat.fromAuthHeaderAsBearerToken(),
  secretOrKey: keys.jwt,
}

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, async (payload, done) => {
      try {
        const user = await User.findById(payload.userId).select('email id')

        if (user) done(null, user)
        else done(null, false)
      } catch (e) {
        console.log(e)
      }
    })
  )
}
