<template>
  <div id="app">
    <tab-bar>
      <tab-bar-item>
        <img slot="item-icon" src="./assets/img/tabbar/home_svg" alt="">
      </tab-bar-item>
      <tab-bar-item></tab-bar-item>
      <tab-bar-item></tab-bar-item>
      <tab-bar-item></tab-bar-item>
    </tab-bar>
  </div>
</template>

<script>
import TabBar from './components/common/tabbar/TabBar.vue'
import TabBarItem from './components/common/tabbar/TabBarItem.vue'


export default {
  name: 'App',
  components: {
    TabBar,
    TabBarItem,
  }
}
    TabBar
</script>

<style>
  @import 'assets/css/base.css'

  
</style>
