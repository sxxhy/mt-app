const Router = require('koa-router')
const axios = require('./utils/axios')
const Poi = require('../dbs/models/poi')

let router = new Router({
  prefix: '/search'
})

router.get('/top',async ctx => {
  try {
    let top = await Poi.find({
      'name': new RegExp(ctx.query.input),
      city: ctx.query.city
    })
    ctx.body = {
      code: 0,
      top: top.map(item => {
        return {
          name: item.name,
          type: item.type
        }
      }),
      type: top.length ? top[0].type : ''
    }
  } catch (e) {
    ctx.body = {
      code: -1,
      top: []
    }
  }
})

router.get('/hotPlace',async ctx => {
  let city = ctx.store ? ctx.store.geo.position.city : ctx.query.city
  console.log(city, ctx.query.type);
  try {
    let result = await Poi.find({
      city,
      type: ctx.query.type || '景点'
    }).limit(10)

    ctx.body = {
      code: 0,
      result: result.map(item => {
        return {
          name: item.name,
          type: item.type
        }
      })
    }
  } catch (e) {
    ctx.body = {
      code: -1,
      result: []
    }
  }
})

router.get('/resultsByKeywords', async (ctx) => {
  const {keyword,theme,limit} = ctx.query;
  let {
    status,
    data
  } = await axios.get('https://xa.meituan.com/ptapi/getScenesList', {
    params: {
      theme,
      tab: keyword,
      ci: 42,
      limit
    }
  })
  ctx.body = {
    pois: status === 200
      ? data
      : []
  }
})

module.exports = router
