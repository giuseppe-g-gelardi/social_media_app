const { Friends } = require("../models/friends");
const express = require("express");
const router = express.Router();


// get all friends
router.get("/user/friends", async (req, res) => {
    try {
      const friend = await Friends.find();
      return res.send(friend);
    } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});



// get a single friend
router.get("/user/friends/:id", async (req, res) => {
    try {
      const friend = await Friends.findById(req.params.id);
      if (!friend)
        return res.status(400).send(`The reply with  "${req.params.id}" does not exist.`);
      return res.send(friend);
    } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});



// delete friend
router.delete("/user/friends/:id", async (req, res) => {
    try {
      const friend = await Friends.findByIdAndRemove(req.params.id);
      if (!friend)
        return res.status(400).send(` "${req.params.id}" does not exist.`);
      return res.send(friend);
    } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

