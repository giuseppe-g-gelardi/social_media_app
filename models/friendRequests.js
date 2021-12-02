const Joi = require("joi");
const mongoose = require("mongoose");

const friendRequestSchema = new mongoose.Schema({
  sender: { type: String, required: true },
  recipient: { type: String, required: true },
  status: { type: String, required: true }, // ! default false?
  timestamp: { type: Date, default: Date.now() }
})

const FriendRequest = mongoose.model("FriendRequest", friendRequestSchema)

function validateFriendRequest(friendRequest) {
  const schema = Joi.object({
    sender: Joi.string().required(),
    recipient: Joi.string().required(),
    status: Joi.string().required(),
  })
  return schema.validate(friendRequest)
}

module.exports.FriendRequest = FriendRequest;
module.exports.validateFriendRequest = validateFriendRequest
