<!--
 * @Author: LiLangXiong680
 * @Date: 2021-03-30 12:26:54
 * @LastEditors: LiLangXiong680
 * @LastEditTime: 2021-03-30 12:35:30
 * @FilePath: /nuxtjs-demo/pages/user/_id.vue
-->
<template>
  <div class='wrapper'>
    <h1>id page</h1>
    <h2>{{ $route.params.id}}</h2>
  </div>
</template>

<script>
export default {
  name: 'idPage'

}
</script>

<style lang='scss' scoped>
</style>

