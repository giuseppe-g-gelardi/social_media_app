const express = require('express')
const cors = require('cors')
const connectDB = require('./connect/mongoConnect')

const products = require('./routes/products')
const comments = require('./routes/comment')
const users = require('./routes/users')

const app = express()

connectDB()

app.use(cors())
app.use(express.json())

app.use('/api/comments', comments)
app.use('/api/users', users)
app.use('/api/products', products)

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Server started on port: ${port}`)
})
