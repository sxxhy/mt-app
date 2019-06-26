const Router = require('koa-router')
const axios = require('./utils/axios')
const Category = require('../dbs/models/category')

let router = new Router({prefix: '/category'})

router.get('/crumbs',async (ctx)=>{
  let result = await Category.findOne()
  if (result) {
    ctx.body = {
      areas: result.areas,
      types: result.types
    }
  } else {
    ctx.body = {
      areas: [],
      types: []
    }
  }
})

module.exports = router;
