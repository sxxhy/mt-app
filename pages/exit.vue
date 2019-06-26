<template>
    <div></div>
</template>

<script>
  export default {
    layout: 'blank',
    middleware: async (ctx) => { // 利用中间件 进行数据请求 相当于在后台请求 该页面没有交互行为 作为中间件
      let {status,data} = await ctx.$axios.get('/users/exit')
      if (status === 200 && data && data.code === 0) window.location.href = '/'
    }
  }
</script>
