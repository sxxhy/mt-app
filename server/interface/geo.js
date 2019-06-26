const Router = require('koa-router')
const axios = require('./utils/axios')
const Menu = require('../dbs/models/menu')
const City =require('../dbs/models/city')
const Province = require('../dbs/models/province')

let router = new Router({
  prefix: '/geo'
})


router.get('/getPosition', async (ctx)=> {
  let ip = ctx.query.ip
  let { status, data: { showapi_res_body: { region, city } } } = await axios.get(`http://saip.market.alicloudapi.com/ip?ip=${ip}`)
  if (status === 200) {
    ctx.body = {
      code: 0,
      region,
      city
    }
  } else {
    ctx.body = {
      code: -1,
      province: '',
      city: ''
    }
  }
})

router.get('/menu',async (ctx) => {
  let result = await Menu.findOne()
  ctx.body = {
    menu: result.menu
  }
})

router.get('/province',async ctx => {
  let province = await Province.find()
  ctx.body = {
    province: province.map(item => {
      return {
        id: item.id,
        name: item.value[0]
      }
    })
  }
})

router.get('/province/:id', async (ctx) => {
  let city = await City.findOne({id: ctx.params.id})
  ctx.body = {
    code: 0,
    city: city.value.map(item => {
      return {province: item.province, id: item.id, name: item.name}
    })
  }
})

router.get('/city', async (ctx) => {
  let city = []
  let result = await City.find()
  result.forEach(item => {
    city = city.concat(item.value)
  })
  ctx.body = {
    code: 0,
    city: city.map(item => {
      return {
        province: item.province,
        id: item.id,
        name: item.name === '市辖区' || item.name === '省直辖县级行政区划'
          ? item.province
          : item.name
      }
    })
  }
})

router.get('/hotCity', async (ctx) => {
  let list = [
    '北京市',
    '上海市',
    '广州市',
    '深圳市',
    '天津市',
    '西安市',
    '杭州市',
    '南京市',
    '武汉市',
    '成都市'
  ]
  let result = await City.find()
  let nList = []
  result.forEach(item => {
    nList = nList.concat(item.value.filter(k => list.includes(k.name) || list.includes(k.province)))
  })
  ctx.body = {
    hots: nList
  }
})

module.exports = router
