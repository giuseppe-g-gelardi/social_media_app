const express = require('express')
const cors = require('cors')
const connectDB = require('./connect/mongoConnect')

const products = require('./routes/products')
const comments = require('./routes/comment')
const users = require('./routes/users')
const auth = require('./routes/auth')
const friends = require('./routes/friends')
const privatemessages = require('./routes/privatemessages')
// const path = require('path')

const app = express()

connectDB()

app.use(cors())
app.use(express.json())

app.use('/api/comments', comments)
app.use('/api/users', users)
app.use('/api/products', products)
app.use('/api/auth', auth)
app.use('/api/addFriend', friends)
app.use('/api/messages', privatemessages)
app.use('/api/deleteFriendRequest', friends)
app.use('/api/sendFriendRequest', friends)

// app.use(express.static(path.join(__dirname, 'client/build')))

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Server started on port: ${port}`)
})
