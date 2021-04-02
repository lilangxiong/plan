<!--
 * @Author: LiLangXiong680
 * @Date: 2021-03-29 22:24:06
 * @LastEditors: LiLangXiong680
 * @LastEditTime: 2021-03-30 18:44:55
 * @FilePath: /nuxt/example/nuxtjs-demo/pages/index.vue
-->
<template>
  <div class='wrapper'>
    <!-- a链接 刷新导航 走服务器端渲染 -->
    <a href="/">首页</a>
    <!-- router-link 导航链接组件 -->
    <router-link to='/about'>about页面</router-link>
    <h1>hello nuxtjs</h1>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  asyncData(vm) {
    console.log(vm)
  }
}
</script>

<style lang='scss' scoped>
</style>
