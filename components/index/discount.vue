<template>
  <section class="m-istyle">
    <dl @mouseover="over">
      <dt>狠优惠</dt>
      <dd
        :class="{active:kind===item.tab}"
        :kind="item.tab"
        v-for="(item,index) of tabs" 
        :key="index">{{item.text}}</dd>
    </dl>
    <ul class="ibody" v-if="list.length">
      <li
        v-for="(item,index) in list"
        :key="index">
        <el-card
          :body-style="{ padding: '0px' }"
          shadow="never">
          <img
            :src="getImg(item.imgUrl)"
            class="image">
          <ul class="cbody">
            <li class="title">{{ item.title }}</li>
            <li class="pos"
                v-if="item.subTitle"><span>{{ item.subTitle }}</span></li>
            <li class="pos">
              <template v-if="item.tags">
                <span
                  v-for="(tagItem,tagIndex) of item.tags"
                  :key="tagIndex" class="el-tabs--border-card">{{tagItem.tag}}</span>
              </template>
            </li>
            <li class="price" v-if="item.currentPrice">￥<em>{{ item.currentPrice }}</em>
              <span v-if="item.priceType">/{{item.priceType}}</span>
              <span v-if="item.oldPrice" class="old-price">{{item.oldPrice}}</span>
              <span class="addr"
                    v-if="item.bottomInfo">{{item.bottomInfo}}</span></li>
          </ul>
        </el-card>
      </li>
    </ul>
  </section>
</template>
<script>
  export default {
    data: () => {
      return {
        kind: 'all',
        list: [],
        tabs: [],
        reqList: [] // 已请求接口的列表
      }
    },
    computed: {
      getImg: function () {
        return function (imgUrl) {
          if (imgUrl.indexOf('img') === -1 && imgUrl.indexOf('w.h') === -1 && imgUrl.indexOf('deal') === -1) {
            return imgUrl
          } else {
            if (imgUrl.indexOf('deal') === -1) return `${imgUrl.replace('img', 'p1').replace('w.h', '')}@368w_208h_1e_1c`
            else return `${imgUrl.replace('img', 'p1').replace('w.h', '').split('@')[0]}@0_6_676_409a%7C388h_640w_2e_90Q%7C213w_120h_1e_1c`
          }
        }
      }
    },
    async mounted(){
      let { status, data: {pois: {data, tabs}} } = await this.$axios.get('/search/resultsByKeywords', {
        params: { keyword: this.kind, theme: 'cheap', limit: 20 }
      })
      if (status === 200) {
        this.list = data
        this.tabs = tabs
        this.reqList.push({
          kind: this.kind,
          list: data
        })
      }
    },
    methods: {
      over: async function (e) {
        let dom = e.target
        let tag = dom.tagName.toLowerCase()
        if (tag === 'dd') {
          this.kind = dom.getAttribute('kind')
          for (var item of this.reqList) {
            if (item.kind === this.kind) {
              this.list = item.list
              return
            }
          }
          let { status, data: {pois: {data}} } = await this.$axios.get('/search/resultsByKeywords', {
            params: { keyword: this.kind, theme: 'cheap', limit: 20 }
          })
          if (status === 200) {
            this.list = data
            this.reqList.push({
              kind: this.kind,
              list: data
            })
          }
        }
      }
    },

  }
</script>
<style lang="scss" scoped>
  @import "@/assets/css/index/discount.scss";
</style>
