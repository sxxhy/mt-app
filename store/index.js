
export const state = () => ({

})

export const mutations = {

}

export const actions = {
    async nuxtServerInit({commit},{req, app}) {
      let data = await app.$axios.get('http://pv.sohu.com/cityjson?ie=utf-8')
      let ip = JSON.parse(data.data.split('=')[1].slice(0,-1)).cip
      let res = await app.$axios.get(`/geo/getPosition?ip=${ip}`)
      let province,city
      if (res.data.code === 0) {
        province = res.data.region
        city = res.data.city
      } else {
        province = ''
        city = ''
      }
      commit('geo/setPosition', {city, province})
      let resultMenu = await app.$axios.get('/geo/menu')
      commit('home/setMenu',resultMenu.status===200?resultMenu.data.menu:[])
      let { status, data: {result} } = await app.$axios.get('/search/hotPlace', {
        params:{
          city:app.store.state.geo.position.city.replace('市',''),
          type: '丽人'
        }
      })
      commit('home/setHotPlace', status===200?result:[])
    }
  }
