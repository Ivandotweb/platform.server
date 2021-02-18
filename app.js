const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')

const app = express()
const port = 3001
const keys = require('./config/keys')

mongoose
  .connect(keys.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('>>>>connected to DB')
  })
  .catch((err) => {})

app.use(morgan('dev'))
app.use(cookieParser())
app.use(cors())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use(bodyParser.json())

// routes
const userRoute = require('./routes/user.js')
app.use('/api/user/', userRoute)

app.listen(port, () => {
  console.log(`Server is running at port ${port}`)
})
