const Joi = require("joi");
const mongoose = require("mongoose");

const messageSchema = mongoose.Schema( {
    message: { type : String, required: true },
    name: { type : String, required: true },
    timestamp: { type: Date, default: Date.now() },
    
})

const PrivateMessages = mongoose.model("PrivateMessages", messageSchema )

function validatePrivateMessages(messages) {
  const schema = joi.object({
    message: Joi.string().required(),
    name: Joi.string().required(),
  })
  return schema.validate(PrivateMessages)
}


module.exports.PrivateMessages = PrivateMessages;
module.exports.validatePrivateMessages = validatePrivateMessages