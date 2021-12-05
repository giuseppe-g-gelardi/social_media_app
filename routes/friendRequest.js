const {FriendRequest, validateFriendRequest} = require("../models/friendRequests");
const express = require("express");
const router = express.Router();

router.post("/api/:userID/sendReq", auth, async (req, res) => {
    try {
      const temp = await Friends.findById({
        requestedTo: req.params.userID,
        requestedBy: req.params.userID,
      });
  
      if (!temp) {
        const friend = new friend({
          requestedTo: req.params.userID,
          requestedBy: req.params.userID,
          status: 0,
        });
        await friend.save();
      } else {
        await Friends.deleteOne({
          requestedTo: req.params.userID,
          requestedBy: req.params.userID,
        });
        const user1 = await user1.findById({ userID: req.params.userID });
        user1.follower = user1.follower - 1;
        await user1.save();
        const user2 = await user1.findById({ userID: req.params.userID });
        user2.following = user2.following - 1;
        await user2.save();
      }
  
      res.send();
    } catch (e) {
      res.status(500).send(e);
    }
  });



  
router.get("/api/req", auth, async (req, res) => {
    try {
      const requests = await Friends.find({
        requestedTo: req.body.userID,
        status: 0,
      });
      res.send(requests);
    } catch (e) {
      res.status(500).send(e);
    }
  });
  
  // router.post("/api/req/:userID", auth, async (req, res) => {
  //   try {
  //     const request = await Friends.findById({
  //       requestedBy: req.params.userID,
  //       requestedTo: req.user.userID,
  //     });
  //     request.status = 1;
  //     await request.save();
  //     if (request) {
  //       const user1 = await user1.findById(req.user._id);
  //       user1.follower = user1.follower + 1;
  //       await user1.save();
  //       const user2 = await user1.findById({ userID: req.params.userID });
  //       user2.following = user2.following + 1;
  //       await user2.save();
  //     }
  
  //     const requests = await Friends.find({
  //       requestedTo: req.user.userID,
  //       status: 0,
  //     });
  //     res.send(requests);
  //   } catch (e) {
  //     res.status(500).send(e);
  //   }
  // });
  
  // router.get("/api/req/:userID/status", auth, async (req, res) => {
  //   try {
  //     const request = await Friends.findById({
  //       requestedTo: req.params.userID,
  //       requestedBy: req.user.userID,
  //     });
  //     if (!request) {
  //       res.send("Follow");
  //     } else if (request.status == 0) {
  //       res.send("Requested");
  //     } else {
  //       res.send("Following");
  //     }
  //   } catch (e) {
  //     res.status(500).send(e);
  //   }
  // });
  
  // router.get("/api/:userID/followers", auth, async (req, res) => {
  //   try {
  //     const followers = await Friends.find({
  //       requestedTo: req.params.userID,
  //       status: 1,
  //     });
  //     const userID = await followers.map((follower) => {
  //       return follower.requestedBy;
  //     });
  //     res.send(userID);
  //   } catch (e) {
  //     res.status(500).send(e);
  //   }
  // });
  
  // router.get("/api/:userID/following", auth, async (req, res) => {
  //   try {
  //     const following = await Friends.find({
  //       requestedBy: req.params.userID,
  //       status: 1,
  //     });
  //     const userID = await following.map((follow) => {
  //       return follow.requestedTo;
  //     });
  //     res.send(userID);
  //   } catch (e) {
  //     res.status(500).send(e);
  //   }
  // });
  module.exports = router
