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
},{
  collection: 'category' // 指定数据表  可能会在后面自动+s 而读不到数据
})

module.exports = mongoose.model('Category', Category)
