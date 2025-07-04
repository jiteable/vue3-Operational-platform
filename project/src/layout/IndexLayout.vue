<template>
  <div class="layout-container">
    <!-- 左侧菜单 -->
    <div class="layout-left">
      <IndexLogo />
      <!--滚动组件-->
      <el-scrollbar class="scrollbar">
        <!--菜单组件-->
        <el-menu 
          background-color="#001529" 
          text-color="#fff"
          :default-active="activeMenu"
          router
        >
          <!--根据路由动态生成菜单-->
          <IndexMenu :menuList="menuList" />
        </el-menu>
      </el-scrollbar>
    </div>
    <div class="layout-main">
      <!-- 顶部导航 -->
      <div class="layout-header">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>权限管理</el-breadcrumb-item>
          <el-breadcrumb-item>角色管理</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="header-right">
          <el-button icon="el-icon-refresh" circle />
          <el-button icon="el-icon-full-screen" circle />
          <el-avatar size="small" style="margin-left: 16px">A</el-avatar>
          <span class="username">admin</span>
        </div>
      </div>
      <!-- 右侧内容 -->
      <div class="layout-right">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { constantRoute } from '../router/routes'
import IndexLogo from './logo/IndexLogo.vue'
import IndexMenu from './menu/IndexMenu.vue'

const route = useRoute()
const activeMenu = computed(() => route.path)

// 获取菜单数据（过滤掉隐藏的路由）
const menuList = computed(() => {
  return constantRoute.filter(route => !route.meta?.hidden)
})
</script>

<style scoped lang="scss">
.layout-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  background: #f5f6fa;
}
.layout-left {
  width: 220px;
  height: 100vh;
  background: #001529;
  display: flex;
  flex-direction: column;
  .side-menu {
    flex: 1;
    border-right: none;
    background: #001529;
    .el-menu-item,
    .el-sub-menu__title {
      height: 48px;
      line-height: 48px;
      font-size: 16px;
      .el-icon {
        margin-right: 10px;
      }
    }
    .el-menu-item.is-active {
      background: #0c2135 !important;
      color: #ffd04b !important;
    }
  }
}
.layout-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.layout-header {
  height: 56px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  box-shadow: 0 2px 8px #f0f1f2;
  .el-breadcrumb {
    font-size: 16px;
  }
  .header-right {
    display: flex;
    align-items: center;
    .el-button {
      margin-left: 8px;
    }
    .username {
      margin-left: 8px;
      color: #333;
      font-weight: 500;
    }
  }
}
.layout-right {
  flex: 1;
  background: #f5f6fa;
  overflow: auto;
  padding: 20px;
}
</style>