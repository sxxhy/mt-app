<template>
  <div class="related-box">
    <div class="title">猜你喜欢</div>
    <el-card class="item" 
      shadow="never"
      v-for="(item,index) of related" :key="index">
      <img :src="getImg(item.imgUrl)" class="img">
      <div class="info">
        <h4 class="item-title">{{item.title}}</h4>
        <div class="rate">
          <el-rate 
          :value="Number(item.score)" 
          disabled 
          text-color="#ff9900" 
          score-template="{value}"
          class="rate-star"></el-rate>
          <span class="text">{{item.commentNum}}个评价</span>
        </div>
        <div class="addr">{{item.areaName}}</div>
        <dir class="price">
          <span class="yuan">￥</span>
          <span class="price-num">{{item.lowPrice}}</span>
          <span class="qi">起</span>
        </dir>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  props: {
    related: {
      type: Array,
      default: []
    }
  },
  computed: {
    getImg () {
      return function (imgUrl) {
        if (imgUrl.indexOf('img') === -1 && imgUrl.indexOf('w.h') === -1 && imgUrl.indexOf('deal') === -1) {
          return imgUrl
        } else {
          if (imgUrl.indexOf('deal') === -1) return `${imgUrl.replace('img', 'p1').replace('w.h', '')}@368w_208h_1e_1c`
          else return `${imgUrl.replace('img', 'p1').replace('w.h', '').split('@')[0]}@0_6_676_409a%7C388h_640w_2e_90Q%7C213w_120h_1e_1c`
        }
      }
    }
  }
};
</script>

<style lang="sass" scoped>
@import '@/assets/css/products/related.sass'
</style>

