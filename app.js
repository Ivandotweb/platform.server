const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const bodyParser = require('body-parser')

const helmet = require('helmet')

const userRoute = require('./routes/user')
const profileRoute = require('./routes/profile')

const keys = require('./config/keys')

const app = express()

mongoose.connect(keys.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})

app.use(helmet())

app.use(passport.initialize())
app.use(passport.session())
require('./middleware/passport')(passport)

app.use(require('morgan')('dev'))
app.use(require('cors')())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use(bodyParser.json())

app.use('/api/user/', userRoute)
app.use('/api/profile/', profileRoute)

app.listen(3001, () => console.log(`Server has been started on 3001`))
