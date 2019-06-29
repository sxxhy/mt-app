const Router = require('koa-router')
const axios = require('./utils/axios')
const Poi = require('../dbs/models/poi')

let router = new Router({
  prefix: '/search'
})

router.get('/top',async ctx => {
  let {status, data:{data}} = await axios.get('https://www.meituan.com/ptapi/suggest', {
    params: {keyword: ctx.query.name}
  })
  if (status===200) {
    ctx.body = {
      data
    }
  } else {
    ctx.body = {
      data: []
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

router.get('/keywords',async ctx => {
  const {limit,cateId,q} = ctx.query
  let {status, data} = await axios.get('https://apimobile.meituan.com/group/v4/poi/pcsearch/42', {
    params: {
      uuid: '7424326d180a428f9d61.1561446567.1.0.0',
      userid: -1,
      limit,
      offset: 0,
      cateId,
      q,
      areaId: -1
    }
  })
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

module.exports = router
