const User = require("../models/user");
const express = require("express");
const auth = require("../middlewares/auth");
const router = new express.Router();
const Friend = require("../models/friends");
const Message = require("../models/message");


Router.get("/api/message/:userName", auth, async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { to: req.user.userName, by: req.params.userName },
        { by: req.user.userName, to: req.params.userName },
      ],
    }).sort({ _id: -1 });
    res.send(messages);
  } catch (e) {
    res.status(500).send(e);
  }
});

Router.get("/api/messageList/friends", auth, async (req, res) => {
  try {
    const following = await Friend.find({
      requestedBy: req.user.userName,
      status: 1,
    });

    const userNames = await following.map((follow) => {
      return follow.requestedTo;
    });

    const messages = await Message.find({
      $or: [
        { by: req.user.userName, to: { $in: userNames } },
        { by: { $in: userNames }, to: req.user.userName },
      ],
    }).sort({ _id: -1 });

    const users = await messages.map((message) => {
      return message.to == req.user.userName ? message.by : message.to;
    });

    let unique = users.filter((v, i, a) => a.indexOf(v) === i);

    const extraUserNames = userNames.filter(
      (userName) => !unique.includes(userName)
    );
    const final = [...unique, ...extraUserNames];
    res.send(final);
  } catch (e) {
    res.status(500).send(e);
  }
});

Router.get("/api/messageList/requests", auth, async (req, res) => {
  try {
    const following = await Friend.find({
      requestedBy: req.user.userName,
      status: 1,
    });

    const userNames = await following.map((follow) => {
      return follow.requestedTo;
    });

    const messages = await Message.find({
      $or: [
        { by: req.user.userName, to: { $nin: userNames } },
        { by: { $nin: userNames }, to: req.user.userName },
      ],
    }).sort({ _id: -1 });

    const users = await messages.map((message) => {
      return message.to == req.user.userName ? message.by : message.to;
    });

    let unique = users.filter((v, i, a) => a.indexOf(v) === i);

    res.send(unique);
  } catch (e) {
    res.status(500).send(e);
  }
});

// Router.post("/api/message", [check("text", "Please Provide Message").not().isEmpty()],
//     async(req, res) => {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).json({ error: errors.array() });
//     }

//     const { text } = req.body;

//     try {
//       const user = await User.findOne({ username: req.params.username }).select(
//         "-password"
//       );

//       if (!user) {
//         res.json({ error: [{ msg: "User not found" }] });
//       }

//       let message = new Message({
//         user: user.id,
//         text,
//       });

//       message = await message.save();

//       res.status(200).json(message);
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).json({ error: [{ msg: "Server Error" }] });
//     });


module.exports = router;
