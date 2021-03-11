const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const ROLES = require('../utils/roles')

const User = require('../models/User')
const Profile = require('../models/Profile')

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
      name: req.body.name,
      role: ROLES.teacher,
    })

    try {
      await user.save(async (err, usr) => {
        const profile = new Profile({
          email: req.body.email,
          name: req.body.name,
          registerDate: Date.now(),
          id: usr._id,
        })

        await profile.save()
      })
      res.status(201).json({ message: 'Пользователь создан' })
    } catch (e) {
      errorHandler(res, e)
    }
  }
}

module.exports.login = async function (req, res) {
  const candidate = await User.findOne({ email: req.body.email })

  if (candidate) {
    console.log(req.body.password)

    const password = bcrypt.compareSync(req.body.password, candidate.password)

    if (password) {
      const token = jwt.sign(
        {
          email: candidate.email,
          userId: candidate._id,
          role: candidate.role,
        },
        keys.jwt,
        {
          expiresIn: 60 * 60 * 2, // 2 hours
        }
      )

      res.status(200).json({
        token: `Bearer ${token}`,
        role: candidate.role,
      })
    } else {
      res.status(401).json({ message: 'Пароль не верный' })
    }
  } else {
    res.status(404).json({ message: 'Пользователь не найден' })
  }
}

module.exports.auth = function (req, res) {
  try {
    const token = req.headers.authorization.split(' ')
    const role = jwt.verify(token[1], keys.jwt).role
    const userRole = req.body.role

    if (role != userRole) res.status(401).json({ message: 'Access denied' })
    else res.status(200).json({ message: role })
  } catch (e) {
    errorHandler(e)
  }
}
