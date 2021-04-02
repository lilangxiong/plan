<template>
  <div>
    <h1>Post List</h1>
    <ul>
      <li v-for="post in posts" :key="post.id">{{ post.title }}</li>
    </ul>
  </div>
</template>

<script>
// import axios from 'axios'
import {mapActions, mapState} from 'vuex'

export default {
  name: 'PostsPage',
  metaInfo: {
    title: 'Posts'
  },
  data() {
    return {
      // posts: []
    }
  },
  computed: {
    ...mapState(['posts'])
  },
  // Vue SSR 为服务器端渲染提供的一个声明周期钩子函数
  serverPrefetch() {
    // 调用action，返回promise
    // this.$store.dispatch('getPosts')
    return this.getPosts()
  },
  methods: {
    ...mapActions(['getPosts'])
  }
  // 服务端渲染
  //    只支持 beforeCreate 和 created
  //    不会等待 beforeCreate 和 created 中的异步操作 
  //    不支持响应式数据
  // 所有这种做法在服务端渲染中是不会工作的!!!
  // async created () {
  //   console.log('Posts Created Start')
  //   const { data } = await axios({
  //     method: 'GET',
  //     url: 'https://cnodejs.org/api/v1/topics'
  //   })
  //   this.posts = data.data
  //   console.log('Posts Created End')
  // }
}
</script>

<style lang='scss' scoped>
</style>
