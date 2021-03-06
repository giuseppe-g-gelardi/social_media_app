const { User, validateUser } = require('../models/user')
const { UserInfo, validate } = require('../models/userInfo')
const bcrypt = require('bcrypt')
const express = require('express')
const router = express.Router()
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');


dotenv.config()


// add item to cart
router.post('./:userId/shoppingcart/:productId', auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
    if (!user) return res.status(400).send(
      `The user with id: "${req.params.userId}" does not exist`
      )
    
    const product = await Product.findById(req.params.productId)
    if (!product) return res.status(400).send(
      `The product with id: "${req.params.productId}" does not exist.`
      )

    user.shoppingCart.push(product)

    await user.save()
    return res.send(user.shoppingCart)

  } catch (ex) {
    return res.status(500).send(
      `Internal Server Error: ${ex}`
      )
  }
})

// put/update item in cart
router.put('./:userId/shoppingcart/:productId',  auth, async (req, res) => {
  try {
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error)

    const user = await User.findById(req.params.userId)
    if (!user) return res.status(400).send(
      `The user with id: "${req.params.userId}" does not exist.`
      )

    const product = user.shoppingCart.id(req.params.productId)
    if (!product) return res.status(400).send(
      `The product with id: "${req.params.productId}" does not exist in the users shopping cart.`
      )

    product.name = req.body.name
    product.description = req.body.description
    product.category = req.body.category
    product.price = req.body.price
    product.dateModified = Date.now()

    await user.save()
    return res.send(product)
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`)
  }
})

// delete item from cart
router.delete('./:userId/shoppingcart/:productId',  auth, async (req, res) => {
  try{

  const user = await User.findById(req.params.userId)
  if (!user) return res.status(400). send(
    `The user with id: "${req.params.userId}" does not exist.` 
    )
  
  let product = user.shoppingCart.id(req.params.productId)
  if (!product) return res.status(400).send(
    `The product with id: "${req.params.productId}" is not in the users shopping cart.`
    )
  
  product = await product.remove()

  await user.save()
  return res.send(product)
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`)
  }
})

//
//
//
//
// !
// ?
// *
// start jwt tutorial

// ! add new user
router.post('/register', async (req, res) => {
  try {
    const { error } = validateUser(req.body)

    if (error) return res.status(400).send(error.details[0].message)

    let user = await User.findOne({ email: req.body.email })
    if (user) return res.status(400).send('User already registered.')

    const salt = await bcrypt.genSalt(10)
    user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
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

// // ! Update user // still working on!
// router.put('/:id', async (req, res) => {
//   try {
//     const { error } = validate(req.body)
//     if (error) {
//       return res.status(400).send(error)
//     }

//     const user = await User.findByIdAndUpdate(
//       req.params.id,
//       {
//       name: req.body.name,
//       email: req.body.email,
//       password: await bcrypt.hash(req.body.password, salt),
//       },
//       { new: true }
//     )

//     if (!user) {
//       return res.status(400).send(`
//       The user with id: "${req.params.id}" does not exist.
//       `)
//     }
//       await user.save()

//       return res.send(user)
//   } catch (ex) {
//     return res.send(500).send(`Internal Server Error: ${ex}`)
//   }
// })

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

// todo :|
// router.put('/:id/update', auth, async (req, res) => {
//   try {
//     const { error } = validateUser(req.body)
//     if (error) return res.status(400).send(error)

//     const user = await User.findByIdAndUpdate(req.params.id)
//     if (!user) return res.status(400).send(
//       `The user with id: "${req.params.id}" does not exist.`
//       )

//     user.firstName = req.body.firstName;
//     user.lastName = req.body.lastName;
//     user.email = req.body.email;

//     await user.save()
//     return res.send(user)
//   } catch (ex) {
//     return res.status(500).send(`Internal Server Error: ${ex}`)
// }
// })

module.exports = router
