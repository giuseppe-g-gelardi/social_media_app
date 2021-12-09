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
    if (user.friendsList.includes(req.body.friendId))
    return res.status(400).send(`These users are already friends!`);
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







//send friend request
router.post("/:userId/request/:friendId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user)
      return res.status(400).send(`The user with id "${req.params.userId}" does not exist.`);
    if (user.friendsList.includes(req.body.friendId))
       return res.status(400).send(`These users are already friends!`);
       const friend = req.body.friendId;
      friend.friendRequests.push(req.params.userId);
      await friend.save()
    return res.send(friend.friendRequests);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});




///delete friend request
router.delete("/:userId/remove/:friendId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user)
      return res
        .status(400)
        .send(`The user with id "${req.params.userId}" does not exist.`);
        const denied = (index) => index === req.params.friendId;
    if (!denied)
      return res
        .status(400)
        .send(`The friend with id "${req.params.friendId}" does not exist.`);
        const removeReq = user.friendRequests.findIndex(denied)
        user.friendRequests.splice(removeReq, 1)
    await user.save();
    return res.send(user.friendRequests);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});


module.exports = router