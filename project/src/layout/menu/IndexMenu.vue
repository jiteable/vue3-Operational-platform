<template>
  <template v-for="item in props.menuList" :key="item.path">
    <!-- 没有子菜单的情况 -->
    <el-menu-item v-if="!item.children" :index="item.path">
      <template #title>
        <el-icon>
          <component :is="item.meta.icon" />
        </el-icon>
        <span>{{ item.meta.title }}</span>
      </template>
    </el-menu-item>

    <!-- 有子菜单的情况 -->
    <el-sub-menu v-else :index="item.path">
      <template #title>
        <el-icon>
          <component :is="item.meta.icon" />
        </el-icon>
        <span>{{ item.meta.title }}</span>
      </template>
      <IndexMenu :menuList="item.children" />
    </el-sub-menu>
  </template>
</template>

<script setup lang="ts">
interface MenuItem {
  path: string
  name: string
  meta: {
    title: string,
    icon?: string
  }
  children?: MenuItem[]
}

const props = defineProps<{
  menuList: MenuItem[]
}>()



</script>


<style scoped>
</style>