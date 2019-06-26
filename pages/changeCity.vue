<template>
  <div class="page-changeCity">
    <el-row>
      <el-col :span="24">
        <iSelect/>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="m-hcity">
          <dl>
            <dt>热门城市：</dt>
            <dd
              v-for="item in list"
              :key="item.id">{{ item.name==='市辖区'?item.province:item.name }}</dd>
          </dl>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <category/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import iSelect from '@/components/changeCity/iselect.vue'
import Category from '@/components/changeCity/category.vue'
import axios from 'axios'
export default {
  data () {
    return {
    }
  },
  components:{
    iSelect,
    Category
  },
  async asyncData () {
    let {status,data:{hots}}=await axios.get('http://localhost:3000/geo/hotCity')
    if(status===200){
      return {
        list: hots
      }
    }
  }
}
</script>

<style lang="scss">
  @import "@/assets/css/changeCity/hot.scss";
</style>
