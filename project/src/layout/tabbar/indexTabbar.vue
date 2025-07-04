<template>
  <div>
    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item>
        <el-icon v-if="isCollapse" @click="handleClick">
          <Fold />
        </el-icon>
        <el-icon v-else @click="handleClick">
          <Expand />
        </el-icon>
      </el-breadcrumb-item>
      
      <el-breadcrumb-item>
        <el-icon>
          <component :is="icon" />
        </el-icon>
        {{ title }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue';
import { ref } from 'vue';

const isCollapse = ref(false)


const emit = defineEmits(['toggleCollapse'])

defineProps<{
  icon: string
  title: string
}>()

function handleClick() {
  isCollapse.value = !isCollapse.value
  emit('toggleCollapse')
}
</script>

<style scoped>
</style>