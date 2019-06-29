<template>
  <dl class="s-item">
    <dt>
      <img
        :src="meta.img"
        alt="商品图片">
    </dt>
    <dd>
      <h3><nuxt-link :to="{path:'detail',params:{keyword:'美食',type:meta.id}}">{{ meta.name }}</nuxt-link></h3>
      <el-rate
        v-model="meta.rate"
        :colors="['#ff9900', '#ff9900', '#FF9900']"
        disabled/>
      <span
        v-if="meta.rate>4"
        class="s-item-comment">很好</span><span
          v-else-if="meta.rate>3"
          class="s-item-comment">一般</span><span
            v-else
            class="s-item-comment">很差</span>
      <span class="s-item-value">{{ meta.rate }}分</span>
      <span class="s-item-comment-total">{{ meta.comment }}人评论</span>
      <p>
        <span class="s-item-type">{{ meta.type }}|{{meta.areaname}}</span>
        <span class="s-item-addr">{{ meta.addr }}</span>
      </p>
      <p>
        <em class="s-item-price">￥{{ meta.price }}起</em>
        <template>
          <b v-for="(item,index) of meta.tag" 
            :key="index">{{ item.text }}</b>
        </template>
      </p>
      <!-- <ul>
        <li>
          <span class="detail-type">门票</span>{{meta.ticket}}
        </li>
        <li>
          <span class="detail-type">跟团</span>{{meta.group}}
        </li>
        <li v-if="meta.scene&&meta.scene.length">
          <span class="detail-type">景酒</span>{{ meta.scene }}
        </li>
        <li v-else>
          <span class="detail-type">景酒</span>暂无描述
        </li>
      </ul> -->
      <ul v-if="meta.deals&&meta.deals.length">
        <li 
          v-for="(item,index) of meta.deals" 
          :key="index"
          v-show="index<showMore">
          <a href="">
            <div class="deal-title">
              <span class="hlt">{{item.title}}</span>
            </div>
            <div class="deal-info">
              <span class="price">
                <span class="yuan">￥</span>{{item.price}}
              </span>
              <span class="value">门市价￥{{item.value}}</span>
              <span class="sales">已售{{item.sales}}</span>
            </div>
          </a>
        </li>
        <p class="toggle-btn" 
          v-if="getMoreLength(meta.deals.length)"
          @click="moreShow">
          <span v-if="showMore===2">更多{{getMoreLength(meta.deals.length)}}个优惠</span>
          <span v-else>收起</span>
          <i class="el-icon-arrow-down" v-if="showMore===2"></i>
          <i class="el-icon-arrow-up" v-else></i> 
        </p>
      </ul>
    </dd>
  </dl>
</template>

<script>
export default {
  data () {
    return {
      showMore: 2
    }
  },
  props: {
    meta: {
      type:Object,
      default(){
        return {}
      }
    }
  },
  computed: {
    getMoreLength(){
      return function (length) {
        if (length<=2) return 0
        else return length-2
      }
    }
  },
  methods: {
    moreShow () {
      if (this.showMore===2) this.showMore=this.meta.deals.length
      else this.showMore=2
    }
  }
}
</script>
