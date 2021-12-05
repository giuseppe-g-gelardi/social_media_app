const { Friends, validateFriends } = require("../models/friends");
const express = require("express");
const router = express.Router();
const User = require("../models/user");

// get all friends
router.get("/userID/Friends", async (req, res) => {
  try {
    const friend = await Friends.find();
    return res.send(friend);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

// get single friend
router.get("/:userID/Friends/:id", async (req, res) => {
  try {
    const friend = await Friends.findById(req.params.id);
    if (!friend)
      return res.status(400).send(`The friend with id "${req.params.id}" does not exist.`);
    return res.send(friend);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

module.exports = router
