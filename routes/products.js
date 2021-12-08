const { UserInfo, validate } = require('../models/userInfo')
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const express = require('express')
const router = express.Router()

// all endpoints and route handlers go here

 
// get ALL reqest
router.get('/', async (req, res) => {
  try {
    const products = await Product.find()
    return res.send(products)
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`)
  }
})

// get single item request
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)

    if (!product) {
    return res.status(400).send(`The product with id "${req.params.id}" does not exist.`)
    }
  
    return res.send(product)
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`)
  }
})

// post request ADD new product?
router.post('/', [auth, admin], async (req, res) => {
  try {
    const { error } = validate(req.body)
    if (error) {
      return res.status(400).send(error)
    }
    const product = new Product({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
    })

    await product.save()

    return res.send(product)
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`)
  }
})

// Update 
router.put('/:id', async (req, res) => {
  try {
    const { error } = validate(req.body)
    if (error) {
      return res.status(400).send(error)
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        price: req.body.price,
      },
      { new: true }
    )

    if (!product) {
      return res.status(400).send(`
      The product with id: "${req.params.id}" does not exist.
      `)
    }
      await product.save()

      return res.send(product)
  } catch (ex) {
    return res.send(500).send(`Internal Server Error: ${ex}`)
  }
})

// delete
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndRemove(req.params.id)

    if (!product) {
      return res.status(400).send(`
      The product with the id: "${req.params.id}" does not exist.
      `)
    }

    return res.send(product)
  } catch (ex) {
    return res.status(500).send(`Internal Server Error ${ex}`)
  }
})

module.exports = router
