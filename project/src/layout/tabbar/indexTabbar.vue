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

        <el-icon style="margin-left: 12px">
          <component :is="fa_icon === icon ? '' : fa_icon" />
        </el-icon>
        {{ fa_title === title ? '' : fa_title }}
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
import { ArrowRight } from '@element-plus/icons-vue'
import { ref } from 'vue'

const isCollapse = ref(false)

const emit = defineEmits(['toggleCollapse'])

defineProps<{
  fa_icon: string
  fa_title: string
  icon: string
  title: string
}>()

function handleClick() {
  isCollapse.value = !isCollapse.value
  emit('toggleCollapse')
}
</script>

<style scoped></style>
