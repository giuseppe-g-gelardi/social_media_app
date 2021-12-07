const mongoose = require('mongoose')
const Joi = require('joi')
const { productSchema } = require('./products')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 5, maxlength: 50 },
  email: { type: String, unique: true, required: true, minlength: 5, maxlength: 255 },
  password: { type: String, required: true, minlength: 5, maxlength: 1024 },
  isGoldMember: { type: String, default: false },
  shoppingCart: { type: [productSchema], default: [] },
  isAdmin: { type: Boolean, default: false },
  friendsList: [{ type: mongoose.Types.ObjectId, default: []}],
  privateMessages: { type: Array, default: [] },
  friendRequests: {  type: Array, default: [] },
  posts: { type: Array, default: [] }    
})

userSchema.methods.generateAuthToken = function() {
  return jwt.sign({ _id: this._id, name: this.name,  isAdmin: this.isAdmin }, process.env.JWT) 
}

const User = mongoose.model('User', userSchema)

const validateUser = (user) => {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(1024).required()
  })
  return schema.validate(user)
}

exports.User = User
exports.validateUser = validateUser
