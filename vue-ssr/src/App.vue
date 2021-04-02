<!--
 * @Author: LiLangXiong680
 * @Date: 2021-03-30 21:58:10
 * @LastEditors: LiLangXiong680
 * @LastEditTime: 2021-04-01 11:04:15
 * @FilePath: /nuxt/vue-ssr/src/App.vue
-->
<template>
  <div id="app">
    <ul> 
      <li>
        <router-link to="/">Home</router-link>
      </li>
      <li>
        <router-link to="/about">About</router-link>
      </li> 
      <li>
        <router-link to="/posts">Posts</router-link>
      </li> 
    </ul>
    <!-- 路由出口 -->
    <router-view/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: 'Vue-SSR'
    }
  },
  methods: {
    onClick() {
      this.message = this.message === 'Vue-SSR' ? 'Vue SSR' : 'Vue-SSR'
    }
  }
}
</script>

<style lang='scss' scoped>
</style>
