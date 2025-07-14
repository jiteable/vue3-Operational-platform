<template>
  <template v-for="item in props.menuList" :key="item.path">
    <!-- 没有子菜单的情况 -->
    <el-menu-item
      v-if="!item.children && item.meta && item.meta.title"
      :index="getFullPath(item)"
    >
      <el-icon v-if="item.meta.icon">
        <component :is="item.meta.icon" />
      </el-icon>
      <span>{{ item.meta.title }}</span>
    </el-menu-item>

    <!-- 有子菜单的情况 -->
    <el-sub-menu
      v-else-if="item.children && item.meta && item.meta.title"
      :index="getFullPath(item)"
    >
      <template #title>
        <el-icon v-if="item.meta.icon">
          <component :is="item.meta.icon" />
        </el-icon>
        <span>{{ item.meta.title }}</span>
      </template>
      <IndexMenu :menuList="item.children" :basePath="getFullPath(item)" />
    </el-sub-menu>
    <!-- 其他情况（没有meta或没有title）什么都不渲染 -->
  </template>
</template>

<script setup lang="ts">
interface MenuItem {
  path: string
  name: string
  meta?: {
    title?: string
    icon?: string
    hidden?: boolean
  }
  children?: MenuItem[]
}

const props = defineProps<{ menuList: MenuItem[]; basePath?: string }>()
const getFullPath = (item) => {
  // basePath 可能为 undefined
  return props.basePath
    ? `${props.basePath}/${item.path}`.replace(/\/+/g, '/')
    : `/${item.path}`.replace(/\/+/g, '/')
}
</script>

<style scoped></style>
