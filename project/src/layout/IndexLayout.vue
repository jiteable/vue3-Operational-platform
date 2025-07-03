<template>
  <div class="layout-container">
    <!-- 左侧菜单 -->
    <div class="layout-left">
      <IndexLogo />
      <el-menu
        class="side-menu"
        :default-active="activeMenu"
        background-color="#001529"
        text-color="#fff"
        active-text-color="#ffd04b"
        :collapse="isCollapse"
        router
      >
        <el-menu-item index="/">
          <el-icon><i class="el-icon-house"></i></el-icon>
          <span>首页</span>
        </el-menu-item>
        <el-menu-item index="/screen">
          <el-icon><i class="el-icon-monitor"></i></el-icon>
          <span>数据大屏</span>
        </el-menu-item>
        <el-sub-menu index="acl">
          <template #title>
            <el-icon><i class="el-icon-lock"></i></el-icon>
            <span>权限管理</span>
          </template>
          <el-menu-item index="/acl/user">用户管理</el-menu-item>
          <el-menu-item index="/acl/role">角色管理</el-menu-item>
          <el-menu-item index="/acl/menu">菜单管理</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="product">
          <template #title>
            <el-icon><i class="el-icon-goods"></i></el-icon>
            <span>商品管理</span>
          </template>
          <el-menu-item index="/product/category">分类管理</el-menu-item>
          <el-menu-item index="/product/list">商品列表</el-menu-item>
        </el-sub-menu>
      </el-menu>
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
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import IndexLogo from './logo/IndexLogo.vue'

const route = useRoute()
const activeMenu = computed(() => route.path)
const isCollapse = ref(false)


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