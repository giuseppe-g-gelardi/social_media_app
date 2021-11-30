const express = require('express')
const cors = require('cors')
const connectDB = require('./connect/mongoConnect')

const app = express()

connectDB()

app.use(cors())
app.use(express.json())

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Starting server on port: ${port}`)
})
