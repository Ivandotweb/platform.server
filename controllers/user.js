module.exports.join = function (req, res) {
  console.log('Cookies: ', req.cookies)
  console.log(req.body)
  res.status(200).json({ message: req.body })
}

module.exports.login = function (req, res) {
  res.status(200).json({ message: 'login' })
}
