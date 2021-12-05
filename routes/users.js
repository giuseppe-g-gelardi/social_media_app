const { User, validateUser } = require('../models/user')
const bcrypt = require('bcrypt')
const express = require('express')
const router = express.Router()
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

dotenv.config()

// ! add new user
router.post('/register', async (req, res) => {
  try {
    const { error } = validateUser(req.body)

    if (error) return res.status(400).send(error.details[0].message)

    let user = await User.findOne({ email: req.body.email })
    if (user) return res.status(400).send('User already registered.')

    const salt = await bcrypt.genSalt(10)
    user = new User({
      name: req.body.name,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, salt),
    })

    await user.save()

    const token = user.generateAuthToken()
    // const token = jwt.sign({ _id: user._id, name: user.name }, process.env.JWT);
       return res
       .header('x-auth-token', token)
       .header('access-control-expose-headers', 'x-auth-token')
       .send({ _id: user._id, name: user.name, email: user.email });

    // return res.send({ _id: user._id, name: user.name, email: user.email })
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`)
  }
}) 


// get ALL users reqest
router.get('/', async (req, res) => {
  try {
    const users = await User.find()
    return res.send(users)
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`)
  }
})

// get single user request
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)

    if (!user) {
    return res.status(400).send(`The user with id "${req.params.id}" does not exist.`)
    }
  
    return res.send(user)
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`)
  }
})

// ! Update user // still working on!
router.put('/:id', async (req, res) => {
  try {
    const { error } = validate(req.body)
    if (error) {
      return res.status(400).send(error)
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
      name: req.body.name,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, salt),
      },
      { new: true }
    )

    if (!user) {
      return res.status(400).send(`
      The user with id: "${req.params.id}" does not exist.
      `)
    }
      await user.save()

      return res.send(user)
  } catch (ex) {
    return res.send(500).send(`Internal Server Error: ${ex}`)
  }
})

// ! delete user // still working on!
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndRemove(req.params.id)

    if (!user) {
      return res.status(400).send(`
      The user with the id: "${req.params.id}" does not exist.
      `)
    }

    return res.send(user)
  } catch (ex) {
    return res.status(500).send(`Internal Server Error ${ex}`)
  }
})

module.exports = router
