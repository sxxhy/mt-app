<template>
  <div class="search-panel">
    <el-row class="m-header-searchbar" :style="{height:$route.name==='index'?'157px':'128px'}">
      <el-col
        :span="3"
        class="left">
        <img
          src="//s0.meituan.net/bs/fe-web-meituan/e5eeaef/img/logo.png"
          alt="美团">
      </el-col>
      <el-col
        :span="15"
        class="center">
        <div class="wrapper">
          <el-input
            v-model="search"
            @focus="focus"
            @blur="blur"
            @input="input"
            @keydown.13.native="searchProducts"
            placeholder="搜索商家或地点"
            />
          <button 
            class="el-button el-button--primary" 
            @click="searchProducts"><i class="el-icon-search"></i></button>
          <dl
            v-if="isHotPlace && $store.state.home.hotPlace.length"
            class="hotPlace">
            <dt>热门搜索</dt>
            <dd 
              v-for="(item,index) of $store.state.home.hotPlace.slice(0,5)" 
              :key="index">{{item.name}}</dd>
          </dl>
          <dl
            v-if="isSearchList"
            class="searchList">
            <dd 
              v-for="(item,index) of searchList" 
              :key="index">
              <nuxt-link 
                :to="`/search/${item.editorWord}`">{{item.editorWord}}</nuxt-link></dd>
          </dl>
        </div>
        <p class="suggest">
          <a 
            href="#" 
            v-for="(item,index) of $store.state.home.hotPlace.slice(0,5)" 
            :key="index">{{item.name}}</a>
        </p>
        <ul 
          class="nav" 
          v-if="$route.name==='index'">
          <li><nuxt-link
            to="/"
            class="takeout">美团外卖</nuxt-link></li>
          <li><nuxt-link
            to="/"
            class="movie">猫眼电影</nuxt-link></li>
          <li><nuxt-link
            to="/"
            class="hotel">美团酒店</nuxt-link></li>
          <li><nuxt-link
            to="/"
            class="apartment">民宿/公寓</nuxt-link></li>
          <li><nuxt-link
            to="/"
            class="business">商家入驻</nuxt-link></li>
        </ul>
      </el-col>
      <el-col
        :span="6"
        class="right">
        <ul class="security">
          <li><i class="refund"></i><p class="txt">随时退</p></li>
          <li><i class="single"></i><p class="txt">不满意免单</p></li>
          <li><i class="overdue"></i><p class="txt">过期退</p></li>
        </ul>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import _ from 'lodash' // 延时插件
  export default {
    data(){
      return {
        search:'',
        isFocus:false,
        hotPlace:[],
        searchList:[]
      }
    },
    computed: {
      isHotPlace () {
        return this.isFocus&&!this.search
      },
      isSearchList () {
        return this.isFocus&&this.search
      }
    },
    methods: {
      async focus () {
        this.isFocus = true
      },
      blur () {
        let self =this
        setTimeout(function () {
          self.isFocus = false
        }, 200)
      },
      input: _.debounce(async function(){ // 延时
        let self=this;
        if (!self.search) return
        let city=self.$store.state.geo.position.city.replace('市','')
        self.searchList=[]
        let {status,data:{data:{suggestItems:top}}}=await self.$axios.get('/search/top',{
          params:{
            name:self.search
          }
        })
        self.searchList=top.slice(0,10)
      }, 10),
      searchProducts () {
        console.log('1')
        if (!this.search) return
        this.$router.push({
          name: 'search-products',
          params: {
            products: this.search
          }
        })
      }
    }
  }
</script>

<style scoped lang="sass">

</style>
