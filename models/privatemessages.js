const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    from: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model("Message", MessageSchema);

module.exports = Message;























// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;
// const dateAndTime = require("date-and-time");
// const date = new Date();

// const messageShema = Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "users",
//   },
//   text: {
//     type: String,
//     required: true,
//   },
//   date: {
//     type: String,
//     default: dateAndTime.format(date, "hh:mm:ss A, MM-DD-YYYY"),
//   },
// });

// module.exports = mongoose.model("message", messageShema);


////


// const Joi = require("joi");
// const mongoose = require("mongoose");


// const messageSchema = new mongoose.Schema({
//     userID:{ type:String, required:true },
//     text: { type: String, required: true },
// });

// function validateMessage(message) {
//     const schema = Joi.object({
//       userID: Joi.string().min(1).max(255).required(),
//       text: Joi.string().min(1).max(255).required(),
//       timestamp: { type: Date, default: Date.now()}
      
//     });
//     return schema.validate(message);
//   }

// const Message = mongoose.model("Message", messageSchema);

// module.exports.Message = Message;
// module.exports.validateMessage = validateMessage;