const Router = require('koa-router')
const axios = require('./utils/axios')
const Category = require('../dbs/models/category')

let router = new Router({prefix: '/category'})

router.get('/crumbs',async (ctx)=>{
  let result = await Category.findOne({
    city: ctx.query.city
  })
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

router.get('/recommend',async ctx => {
  let {status, data} = await axios.get('https://xa.meituan.com/ptapi/recommends?limit=10')
  if (status===200) {
    ctx.body = {
      data
    }
  } else {
    ctx.body = {
      data: {}
    }
  }
})

module.exports = router;
