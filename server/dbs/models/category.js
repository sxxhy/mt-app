const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Category = new Schema({
  city: {
    type: String,
    require: true
  },
  types: {
    type: Array,
    require: true
  },
  areas:{
    type:Array,
    require:true
  }
})

module.exports = mongoose.model('Category', Category)
