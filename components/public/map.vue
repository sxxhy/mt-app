<template>
  <div
    :id="id"
    :style="{width:width+'px',height:height+'px',margin:'0 auto'}"
    class="m-map"/>
</template>

<script>
export default {
  props: {
    width: {
      type:Number,
      default:300
    },
    height: {
      type:Number,
      default:300
    },
    point: {
      type:Array,
      default(){
        return [108,34]
      }
    }
  },
  data() {
    return {
      id: `map`,
      key: '0dbc0dfd7c775f2a927174493eab8220'
    }
  },
  watch: {
    point: function (val, old) {
      this.map.setCenter(val)
      this.marker.setPosition(val)
    }
  },
  mounted() {
    let self = this
    self.id = `map${Math.random().toString().slice(4, 6)}`

    window.onmaploaded = () => {
      let map = new window.AMap.Map(self.id, {
        resizeEnable: true,
        zoom: 11,
        center: self.point
      })
      self.map = map
      window.AMap.plugin('AMap.ToolBar', () => {
        let marker = new window.AMap.Marker({
          icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
          position: self.point
        })
        self.marker = marker
        marker.setMap(map)
      })
    }
    const url = `https://webapi.amap.com/maps?v=1.4.10&key=${self.key}&callback=onmaploaded`
    let jsapi = document.createElement('script')
    jsapi.charset = 'utf-8'
    jsapi.src = url
    document.head.appendChild(jsapi)
  },
}
</script>
