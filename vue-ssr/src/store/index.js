import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      posts: []
    }),
    mutations: {
      setPosts(state, posts) {
        state.posts = posts
      }
    },
    actions: {
      // 服务器端渲染期间务必让action返回一个promise
      async getPosts({ commit }) {
        const { data } = await axios.get('https://cnodejs.org/api/v1/topics')
        commit('setPosts', data.data)
      }
    }
  })
}