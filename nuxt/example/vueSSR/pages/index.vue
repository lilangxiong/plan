<!--
 * @Author: LiLangXiong680
 * @Date: 2021-03-28 22:36:33
 * @LastEditors: LiLangXiong680
 * @LastEditTime: 2021-03-29 21:23:43
 * @FilePath: /plan/nuxt/example/vueSSR/pages/index.vue
-->
<template>
  <div id="app">
    <h2>{{title}}</h2>
    <ul>
      <li v-for="(item, key) in posts" :key="key">
        {{item.title}}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Home',
  components: {},
  data() {
    return {
      posts: {},
      title: ''
    }
  },
  // Nuxt 中提供的一个特殊钩子函数，专门用于服务器端渲染获取数据
  async asyncData() {
    const { data } = await axios({
      method: 'GET',
      url: 'http://localhost:3000/data.json'
    })
    // 返回的数据会和data中的数据合并在一起给页面使用
    return {
      title: data.title,
      posts: data.posts
    }
  },
  // async created() {
  //   const { data } = await axios({
  //     method: 'GET',
  //     url: '/data.json'
  //   })
  //   this.title = data.title
  //   this.posts = data.posts
  // }
}
</script>

<style lang='scss' scoped>
</style>
