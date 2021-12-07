const { friends, validateFriends } = require("../models/friend");
const express = require("express");
const router = express.Router();
const {User, validateUser} = require("../models/user");





// when you add them 
router.post("/:userId/friends", async (req,res) => {
  try{
    const user = await User.findById(req.params.userId);
    if(!user)  return res.status(400).send(`The user with id "${req.params.userId}" does not exist.`);
    const friend = req.body.friendId;
    user.friendsList.push(friend)
    await user.save().then( async () => {
      const friend = await User.findById(req.body.friendId);
      friend.friendsList.push(req.params.userId)
      await friend.save()
    })
    return res.send(user)
  }
  catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`)
  }
})

router.get("/friends/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const friends = await Promise.all(
      user.followings.map((_id) => {
        return User.findById(_id);
      })
    );
    let friendList = [];
    friends.map((friend) => {
      const { _id, email } = friend;
      friendList.push({ _id, email});
    });
    res.status(200).json(friendList)
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.get("/friends/userID", async (req, res) => {
//   try {
//     const friend = await friends.find();
//     return res.send(friend);
//   } catch (ex) {
//     return res.status(500).send(`Internal Server Error: ${ex}`);
//   }
// });



// router.get("/friends/userID/:id", async (req, res) => {
//   try {
//     const friend = await friends.findById(req.params.id);
//     if (!friend)
//       return res.status(400).send(`The friend with id "${req.params.id}" does not exist.`);
//     return res.send(friend);
//   } catch (ex) {
//     return res.status(500).send(`Internal Server Error: ${ex}`);
//   }
// });



module.exports = router