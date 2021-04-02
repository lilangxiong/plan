<!--
 * @Author: LiLangXiong680
 * @Date: 2021-03-29 21:26:27
 * @LastEditors: LiLangXiong680
 * @LastEditTime: 2021-03-29 21:30:39
 * @FilePath: /plan/nuxt/example/vueSSR/layouts/default.vue
-->
<template>
  <div>
    <ul>
      <li>
        <!-- 类似于router-link，用于单页面应用导航 -->
        <nuxt-link to="/">Home</nuxt-link>
      </li>
      <li>
        <!-- 类似于router-link，用于单页面应用导航 -->
        <nuxt-link to="/about">About</nuxt-link>
      </li>
    </ul>
    <!-- 子页面出口 -->
    <nuxt />
  </div>

</template>

<script>
export default {
}
</script>

<style lang='scss' scoped>
</style>
