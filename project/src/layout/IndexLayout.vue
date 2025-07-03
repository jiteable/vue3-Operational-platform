<template>
  <div class="layout-container">
    <!-- 左侧菜单 -->
    <div class="layout-left">
      <Logo />
    </div>
    <!-- 顶部导航 -->
    <div class="layout-header">
      <el-menu></el-menu>
    </div>
    <!-- 右侧内容 -->
    <div class="layout-right">
      <div></div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import Logo from './logo/IndexLogo.vue'
</script>

<style scoped lang="scss">
.layout-container {
  width: 100%;
  height: 100vh;
  background: red;
  .layout-left {
    float: left;
    width: $base-menu-width;
    height: 100vh;
    background: $base-menu-background;
  }
  .layout-header {
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    float: left;
    background: white;
  }
  .layout-right {
    float: right;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-tabbar-height);
    background: cyan;
    overflow: auto;
    padding: 10px;

    div {
      width: 100%;
      height: 100%;
      background: red;
    }
  }
}
</style>