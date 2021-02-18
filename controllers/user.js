const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/User')
const keys = require('../config/keys')
const errorHandler = require('../utils/errorHandler')

module.exports.join = async function (req, res) {
  const candidate = await User.findOne({ email: req.body.email })

  if (candidate) res.status(409).json({ message: 'Email занят' })
  else {
    const salt = bcrypt.genSaltSync(10)
    const password = bcrypt.hashSync(req.body.password, salt)

    const user = new User({
      email: req.body.email,
      password,
    })

    try {
      await user.save()
      res.status(201).json({ message: 'Пользователь создан' })
    } catch (e) {
      errorHandler(res, e)
    }
  }
}

module.exports.login = async function (req, res) {
  const candidate = await User.findOne({ email: req.body.email })

  if (candidate) {
    const password = bcrypt.compareSync(req.body.password, candidate.password)

    if (password) {
      //token
      const token = jwt.sign(
        {
          email: candidate.email,
          userId: candidate._id,
        },
        keys.jwt,
        {
          expiresIn: 60 * 60 * 2, // 2 hours
        }
      )

      res.status(200).json({
        token: `Bearer ${token}`,
      })
    } else {
      res.status(401).json({ message: 'Пароль не верный' })
    }
  } else {
    res.status(404).json({ message: 'Пользователь не найден ' })
  }
}
