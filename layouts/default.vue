<template>
  <div>
    <el-container>
      <el-header height="100%">
        <my-header/>
      </el-header>
      <el-main>
        <nuxt/>
      </el-main>
      <el-footer>
        <my-footer height="100%"/>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
  import MyHeader from '@/components/public/header/index.vue'
  import MyFooter from '@/components/public/footer/index.vue'
  export default {
    components: {
      MyHeader,
      MyFooter
    }
  }
</script>

<style>

</style>
