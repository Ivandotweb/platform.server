const Profile = require('../models/Profile')

module.exports.get = async function (req, res) {
  const profile = await Profile.findOne({ id: req.user._id })

  res.status(200).send(profile)
}

module.exports.update = async function () {}
