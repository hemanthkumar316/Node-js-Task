const express = require('express')
const dotnev = require('dotenv')
const mongoose = require('mongoose')
const cors = require('cors')
// const bodyParser = require("body-parser")

const employeerouter = require('./Routes/routes')
const app = express()
dotnev.config({ path: './Config/.env' })
const port = process.env.PORT
const mongo = process.env.Mongo_URL
app.use(cors())
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json())
mongoose.connect(mongo, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(console.log('mongo Db connection successfully'))
  .catch((err) => console.log(err))
app.use('/task', employeerouter)
app.listen(port, (err) => {
  if (err) throw err
  console.log(`server running on port number ${port}`)
})