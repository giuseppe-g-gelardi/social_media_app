const mongoose = require("mongoose");
const Joi = require("joi");




const friendSchema = new mongooseSchema({
   userID: { type: String },

})

const Friends = mongoose.model("Friends", friendSchema)


module.exports.friends = Friends;