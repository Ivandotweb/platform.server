const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const passport = require('passport')

const app = express()
const keys = require('./config/keys')

//Routes
const userRoute = require('./routes/user.js')
app.use('/api/user/', userRoute)

mongoose.connect(keys.MONGO_URI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

app.use(passport.initialize())
require('./middleware/passport')(passport)

app.use(morgan('dev'))
app.use(cookieParser())
app.use(cors())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use(bodyParser.json())

app.listen(3001, () => {
  console.log(`Server is running at port 3001`)
})
