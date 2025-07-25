<template>
  <div class="layout-container">
    <!-- 左侧菜单 -->
    <div class="layout-left" :class="{ collapsed: settingStore.isCollapse }">
      <IndexLogo :isCollapse="settingStore.isCollapse" />
      <!--滚动组件-->
      <el-scrollbar class="scrollbar">
        <!--菜单组件-->
        <el-menu
          :collapse="settingStore.isCollapse"
          background-color="#001529"
          text-color="#fff"
          :default-active="activeMenu"
          router
        >
          <el-menu-item index="/home">
            <el-icon>
              <HomeFilled />
            </el-icon>
            <span>首页</span>
          </el-menu-item>
          <!--根据路由动态生成菜单-->
          <IndexMenu :menuList="menuList" />
        </el-menu>
      </el-scrollbar>
    </div>
    <div class="layout-main">
      <!-- 顶部导航 -->
      <div class="layout-header">
        <IndexTabbar
          :fa_icon="String(route.matched[0]?.meta?.icon ?? '')"
          :fa_title="String(route.matched[0]?.meta?.title ?? '')"
          :icon="String(route.meta.icon ?? '')"
          :title="String(route.meta.title ?? '')"
          @toggleCollapse="settingStore.changeFold()"
        />
        <div class="header-right">
          <el-button icon="Refresh" @click="handleRefresh" circle />
          <el-button icon="FullScreen" @click="handleFullScreen" circle />
          <el-button icon="Setting" @click="handleSetting" circle />
          <el-avatar
            size="small"
            style="margin-left: 16px"
            :src="userStore.avatar"
          >
            A
          </el-avatar>

          <el-dropdown>
            <span class="username">
              {{ username }}
              <el-icon class="el-icon--right">
                <arrow-down />
              </el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="goToProfile">
                  <el-icon>
                    <User />
                  </el-icon>
                  个人中心
                </el-dropdown-item>
                <el-dropdown-item @click="handleLogout">
                  退出账号
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
      <!-- 右侧内容 -->
      <div class="layout-right">
        <router-view :key="viewKey" />
      </div>
    </div>
  </div>

  <el-drawer v-model="visible" :show-close="false">
    <template #header="{ titleId, titleClass }">
      <h4 :id="titleId" :class="titleClass">设置</h4>
    </template>
    <div class="switch-container">
      <div>主题颜色切换</div>
      <div class="switch-item">
        <el-color-picker
          v-model="color"
          show-alpha
          :predefine="['blue']"
          @change="setColor"
        />
      </div>
    </div>
    <div class="switch-container">
      <div>暗色主题切换</div>
      <div class="switch-item">
        <el-switch
          v-model="value1"
          :active-action-icon="Moon"
          :inactive-action-icon="Sunny"
          @change="changeDark"
        />
      </div>
    </div>
  </el-drawer>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { constantRoute } from '../router/routes'
import IndexLogo from './logo/IndexLogo.vue'
import IndexMenu from './menu/IndexMenu.vue'
//引入顶部tabbar组件
import { ArrowDown, User } from '@element-plus/icons-vue'
import useSettingStore from '../store/modules/setting'
import { Logout } from '../utils/Logout'
import IndexTabbar from './tabbar/indexTabbar.vue'
import useUserStore from '../store/modules/user'
import { Moon, Sunny } from '@element-plus/icons-vue'

let userStore = useUserStore()

const settingStore = useSettingStore()
const route = useRoute()
const activeMenu = computed(() => route.path)

const visible = ref(false)

const value1 = ref(false)

const username = ref('admin') // 可替换为实际用户名

const color = ref()

const secondLevelPath = computed(() => {
  // 假设 path 结构为 /parent/child
  const matched = route.matched
  return matched.length > 1 ? matched[1].path : route.fullPath
})

// 以当前二级路由的 path 作为 key
const viewKey = ref(route.fullPath)

const router = useRouter()

function handleRefresh() {
  viewKey.value = secondLevelPath.value + '?' + Date.now()
}

function handleFullScreen() {
  // 切换全屏
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}

function handleSetting() {
  // 打开设置弹窗或侧边栏
  // 这里可以用 ElDrawer/ElDialog 或自定义逻辑
  visible.value = true
}

function goToProfile() {
  router.push('/center') // 替换为你的个人中心路由地址
}

function handleLogout() {
  Logout()
}

// 只展示未隐藏的一级菜单
const menuList = computed(() =>
  constantRoute.filter((item) => !item.meta?.hidden),
)

const changeDark = () => {
  //获取HTML根节点
  let html = document.documentElement
  //判断HTML标签是否有类名dark
  if (value1.value) {
    html.classList.add('dark')
  } else {
    html.classList.remove('dark')
  }
}

const setColor = () => {
  const html = document.documentElement
  // console.log(html.style)
  html.style.setProperty('--el-color-primary', color.value)
}
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
  transition: all 0.3s;
  :deep(.el-menu) {
    border-right: none !important;
    box-shadow: none !important;
  }
}
.layout-left.collapsed {
  width: 64px;
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
    .header-btn {
      margin-left: 8px;
      background: #f5f6fa;
      border: none;
      box-shadow: none;
      &:hover {
        background: #e6e8eb;
      }
      .el-icon {
        font-size: 18px;
      }
    }
    .el-avatar {
      margin-left: 16px;
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
.switch-container {
  margin-top: 20px;
  width: 100%;
  height: 20px;
  .switch-item {
    float: right;
    margin-top: -24px;
  }
}
</style>
