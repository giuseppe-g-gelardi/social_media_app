const express = require('express')
const cors = require('cors')
const connectDB = require('./connect/mongoConnect')

const comments = require('./routes/comment')
const users = require('./routes/users')

const app = express()

connectDB()

app.use(cors())
app.use(express.json())
app.use('/api/comments', comments)
app.use('/api/users', users)

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Server started on port: ${port}`)
})
