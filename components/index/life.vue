<template>
  <div class="m-life">
    <el-row>
      <el-col :span="14">
        <slider/>
      </el-col>
      <el-col :span="4">
        <div class="m-life-pic"/>
      </el-col>
      <el-col :span="6">
        <div class="m-life-login" v-show="!$store.state.user">
          <h4><img 
            src="//s0.meituan.net/bs/fe-web-meituan/2d05c2b/img/avatar.jpg" 
            alt=""></h4>
          <p class="m-life-login-name">Hi！你好</p>
          <p><nuxt-link to="/register"><el-button 
            round 
            size="medium">注册</el-button></nuxt-link></p>
          <p><nuxt-link to="/login"><el-button 
            round 
            size="medium">立即登录</el-button></nuxt-link></p>
        </div>
        <div class="user" v-show="$store.state.user">
          <div class="info">
            <i class="el-icon-s-tools"></i>
            <div class="head-img">
              <img src="https://s0.meituan.net/bs/fe-web-meituan/e3064a3/img/head-img.png">
            </div>
            <div class="name">{{$store.state.user}}</div>
            <div class="fn-row clearfix">
              <div class="fn-item">
                <i class="el-icon-s-order"></i>
                <p class="fn-name">我的订单</p>
              </div>
              <div class="fn-item">
                <i class="el-icon-star-on"></i>
                <p class="fn-name">我的收藏</p>
              </div>
              <div class="fn-item">
                <i class="el-icon-s-ticket"></i>
                <p class="fn-name">抵用券</p>
              </div>
            </div>
            <div class="fn-row clearfix">
              <div class="fn-item">
                <i class="el-icon-coin"></i>
                <p class="fn-name">余额</p>
              </div>
              <div class="fn-item">
                <i class="el-icon-more"></i>
                <p class="fn-name">更多</p>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="7">
        <div class="m-life-hotel"/>
      </el-col>
      <el-col :span="7">
        <div class="m-life-music"/>
      </el-col>
      <el-col :span="4">
        <div class="m-life-coop"/>
      </el-col>
      <el-col :span="6">
        <div class="m-life-downapp">
          <img 
            src="//s1.meituan.net/bs/fe-web-meituan/60ac9a0/img/download-qr.png" 
            alt="下载APP">
          <p>美团APP手机版</p>
          <h4><span class="red">1元起</span><em class="gary">吃喝玩乐</em></h4>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Slider from './slider.vue'
export default {
  components: {
    Slider
  }
}
</script>


<style lang="scss">
    @import "@/assets/css/index/life.scss";
</style>
