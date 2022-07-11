const mongoose = require('mongoose')
const validator = require('validator')

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  url: {
    type: String,
    required: true,
    validator(value) {
      if(!validator.isUrl(value)){
        throw new Error('URL is invalid');
      }
    }
  }, 
  currentPrice: {
    type: Number,
    required: true
  }, 
  requiredPrice: {
    type: Number,
    required: true
  },
  gmail: {
    type: String,
    required: true,
    lowercase: true,
    validator(value){
      if(!validator.isEmail(value)){
        throw new Error('Email is invalid')
      }
    }
  }, 
  owner: {
    // to create relationship between user and item
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: 'User'   
  }

})

const Item = mongoose.model('Item', itemSchema)

module.exports = Item