<template>
  <div class="page-index">
    <el-row>
      <el-col :span="5">
        <e-menu/>
      </el-col>
      <el-col :span="19">
        <life/>
      </el-col>
    </el-row>
    <el-row :span="24">
      <artistic/>
    </el-row>
    <el-row :span="24">
      <discount/>
    </el-row>
  </div>
</template>

<script>
import EMenu from '@/components/index/menu.vue'
import Life from '@/components/index/life.vue'
import Artistic from '@/components/index/artistic.vue'
import Discount from '@/components/index/discount.vue'
export default {
  components: {
    EMenu,
    Life,
    Artistic,
    Discount
  }
}
</script>

<style lang="scss">
  @import "@/assets/css/index/index.scss";
</style>
