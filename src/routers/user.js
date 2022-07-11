const express = require('express')
const User = require('../models/user')
const router = new express.Router()
const cors = require('cors')
const auth = require('../middleware/auth')

router.post('/signup', cors(),async (req, res) => {
  const user = new User(req.body)
  try {
    await user.save()
    res.send(user)
  } catch (e) {
    console.log(e)
    res.status(400).send(e)
  }
})

router.post('/login', cors(), async (req, res) => {
  try{   
    console.log('Insider Login')
    const user = await User.findByCredentials(req.body.email, req.body.password)
    const token = await user.generateAuthToken()
    res.send({user, token})
  } catch(e) {
    console.log(e)
    res.status(400).send(e)
  }
})

router.get('/logout', cors(), auth, async (req, res) => {
  try{
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token
    })
    await req.user.save()

    res.send()
  } catch (e) {
    res.status(500).send()
  }
})

module.exports = router