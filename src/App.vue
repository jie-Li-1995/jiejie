<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    DataPersonal: '',
    wechatuser: ''
  })
}
</script>

<style lang="less">
  @baseColor: #ff6700;
  * {
    margin: 0;
    padding: 0;
  }
</style>
