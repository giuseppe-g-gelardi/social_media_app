const Joi = require("joi");
const mongoose = require("mongoose");


const messageSchema = new mongoose.Schema({
    userID:{ type:String, required:true },
    text: { type: String, required: true },
});

function validateMessage(message) {
    const schema = Joi.object({
      userID: Joi.string().min(1).max(255).required(),
      text: Joi.string().min(1).max(255).required(),
      timestamp: { type: Date, default: Date.now()}
      
    });
    return schema.validate(message);
  }

const Message = mongoose.model("Message", messageSchema);

module.exports.Message = Message;
module.exports.validateMessage = validateMessage;