// const express = require('express')
// const router = express.Router()
// const auth = require('../middleware/auth')

// const PrivateMessage = require('../models/privatemessages')

// router.get('/getmessages/:id', auth, async (req, res) => {
//   const friendID = req.params.id;
//   const userID = req.tokenUser.userID;
//   const privateMessagesArray = await PrivateMessage.find({
//     $and: [
//       { participants: { $in: [friendID] }},
//       { participants: { $in: [userID] }},
//     ],
//   }).sort({ createdAt: 1 })
//   res.status(201).send(privateMessagesArray)
// })

// module.exports = router
