const router = express.Router();
const { check, validationResult } = require("express-validator");

//Private Message Model//

const Privatemessages = require("../models/privatemessages");

//User Model//

const User = require("../models/user");

Router.post(
    "/:username/message",
    [check("text", "Please Provide Message").not().isEmpty()],
    async(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
    }

    const { text } = req.body;

    try {
      const user = await User.findOne({ username: req.params.username }).select(
        "-password"
      );

      if (!user) {
        res.json({ error: [{ msg: "User not found" }] });
      }

      let message = new Message({
        user: user.id,
        text,
      });

      message = await message.save();

      res.status(200).json(message);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: [{ msg: "Server Error" }] });
    }
  }
);

module.exports = Router;














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


