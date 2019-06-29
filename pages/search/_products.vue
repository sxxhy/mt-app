<template>
  <el-row class="page-product">
    <el-col :span="19">
      <crumbs :keyword="keyword"/>
      <category
        :types="types"
        :areas="areas"/>
      <list :list="list"/>
    </el-col>
    <el-col :span="5" style="margin:34px auto">
      <amap
        v-if="point.length"
        :width="230"
        :height="220"
        :point="point"/>
      <related :related="related"/>
    </el-col>
  </el-row>

</template>

<script>
import Crumbs from '@/components/products/crumbs.vue'
import Category from '@/components/products/category.vue'
import List from '@/components/products/list.vue'
import Amap from '@/components/public/map.vue'
import Related from "@/components/public/related.vue";
export default {
  components:{
    Crumbs,
    Category,
    List,
    Amap,
    Related
  },
  data(){
    return {
      list:[],
      types:[],
      areas:[],
      keyword:'',
      point:[],
      related:[]
    }
  },
  async asyncData(ctx){
    let keyword = ctx.params.products
    let {status,data:{data:{data:{searchResult,recommendResult}}}} = await ctx.$axios.get('/search/keywords',{
      params:{
        limit: 32,
        cateId: 1,
        q: keyword
      }
    })
    let {status:status2,data:{areas,types}} = await ctx.$axios.get('/category/crumbs',{
      params:{
        city: '九江'
      }
    })
    let {status:status3,data:{data:related}} = await ctx.$axios.get('/category/recommend')
    if (searchResult.length===0) searchResult = recommendResult
    if(status===200&&status2===200&&status3===200){
      return {
        list: searchResult.filter(item=>item.imageUrl.length).map(item=>{
          return {
            type: item.backCateName,
            img: function (imgUrl) {
              if (imgUrl.indexOf('img') === -1 && imgUrl.indexOf('w.h') === -1 && imgUrl.indexOf('deal') === -1) {
                return imgUrl
              } else {
                if (imgUrl.indexOf('deal') === -1) return `${imgUrl.replace('img', 'p1').replace('w.h', '')}@368w_208h_1e_1c`
                else return `${imgUrl.replace('img', 'p1').replace('w.h', '').split('@')[0]}@0_6_676_409a%7C388h_640w_2e_90Q%7C213w_120h_1e_1c`
              }
            }(item.imageUrl),
            name: item.title,
            comment: Math.floor(Math.random()*10000),
            rate: Number(item.avgscore),
            price: Number(item.lowestprice),
            scene: item.tag,
            tel: item.id,
            tag: item.tag,
            addr: item.address,
            module: item.showType,
            areaname: item.areaname,
            deals: item.deals
          }
        }),
        keyword,
        areas,
        types,
        point: searchResult.length>0?[searchResult[0].longitude,searchResult[0].latitude]:[],
        related
      }
    }
  }
}
</script>

<style lang="scss">
  @import "@/assets/css/products/index.scss";
</style>
