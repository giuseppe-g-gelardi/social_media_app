const mongoose = require('mongoose')
const Joi = require('joi')

const userInfoSchema = new mongoose.Schema({
  firstName: { type: String, required: true, minlength: 2, maxlength: 20 },
  lastName: { type: String, required: true, minlength: 2, maxlength: 20 },
  userName: { type: String, required: true, minlength: 5, maxlength: 20 },
  relationshipStatus: { type: String, required: true },
  profilePicture: { type: String},
  coverPhoto: { type: String },

})

const UserInfo = mongoose.model('UserInfo', userInfoSchema)

const validateUserInfo = (userInfo) => {
  const schema = Joi.object({
    firstName: Joi.string().min(2).max(20).required(),
    lastName: Joi.string().min(2).max(20).required(),
    userName: Joi.string().min(5).max(20).required(),
    relationshipStatus: Joi.string().required(),
    profilePicture: Joi.string,
    coverPhoto: Joi.string
  })
  return schema.validate(userInfo)
}

// module.exports = UserInfo

exports.UserInfo = UserInfo
exports.validate = validateUserInfo
exports.userInfoSchema = userInfoSchema
