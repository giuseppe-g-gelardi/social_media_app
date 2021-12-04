const mongoose = require("mongoose");
const Joi = require("joi");




const friendSchema = new mongooseSchema({
   userID: { type: String },

})

const Friends = mongoose.model("Friends", friendSchema)


function validateFriends(Friends) {
   const schema = Joi.object({
     userID: Joi.string().required(),
    
   })
   return schema.validate(Friends)
 }




module.exports.friends = Friends;
module.exports.validateFriends = validateFriends;