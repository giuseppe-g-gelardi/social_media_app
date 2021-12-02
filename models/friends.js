const mongoose = require("mongoose");
const Joi = require("joi");




const friendSchema = new mongooseSchema({
   userI: { type: String },

})

const Friends = mongoose.model("Friends", friendSchema)


module.exports.friends = Friends;