const express = require('express')
const Item = require('../models/item')
const User = require('../models/user')
const router = new express.Router()
const cors = require('cors')
const auth = require('../middleware/auth')
const checkPrice = require('../webScraper/cheerio')

router.get('/',auth , async (req, res) => { 
  try { 
    User.findOne({_id: req.user._id}).populate('items').
      exec((err, user) => {
        if(err) throw new Error('No user found');
    
        res.send(user.items)
      })
  } catch (error) {
    console.log(error)
    res.status(400).send()
  } 
})

router.post('/addItem', cors(), auth, async(req, res) => {
  try {
    // console.log('Inside /addItem')
    console.log(req.body);
    const currentPrice = await checkPrice(req.body.url);
    console.log(currentPrice);
    const item = new Item({
      name: req.body.name, 
      currentPrice,
      requiredPrice: req.body.requiredPrice,
      url: req.body.url,
      gmail: req.body.gmail,
      owner: req.user._id 
    })
    await item.save();
    res.status(200).send(item)
  } catch (error) {
    res.status(500).send()
  }
})

router.put('/editItem', cors(), auth, async(req, res) => {
  try {
    console.log(req.body);
    const {itemId, ...other} = req.body;
    const item = await Item.findByIdAndUpdate(req.body.itemId, {
      $set: other,
    });
    res.status(200).send(item);
  } catch (err) {
    res.status(500).send(err);
  }
})

router.delete('/deleteItem', cors(), auth, async(req, res) => {
  try {
    // console.log('Inside deleteItem')
    // console.log(req.body.id)
    const item = await Item.findByIdAndDelete(req.body.id)
    if(!item){
      res.send(404).send()
    }
    res.send(item)
  } catch (error) {
    res.status(500).send()
  }
})

module.exports = router