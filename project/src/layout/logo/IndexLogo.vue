<template>
  <div class="logo" v-if="setting.logoHidden">
    <img :src="setting.logo" alt="" />
    <transition name="fade">
      <p v-show="showTitle" class="title">{{ setting.title }}</p>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import setting from '../../setting';

// 定义 props
interface Props {
  isCollapse?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isCollapse: false
})

// 控制标题显示状态
const showTitle = ref(!props.isCollapse)

// 监听 isCollapse 变化
watch(() => props.isCollapse, (newVal) => {
  if (newVal) {
    // 折叠时，1秒后隐藏标题
    setTimeout(() => {
      showTitle.value = false
    }, 100)
  } else {
    // 展开时，立即显示标题
    showTitle.value = true
  }
}, { immediate: true })
</script>

<style scoped lang="scss">
.logo {
  width: 100%;
  height: $base-menu-logo-height;
  color: white;
  display: flex;
  align-items: center;
  overflow: hidden;
  padding-left: 20px;
  img {
    width: 40px;
    height: 40px;
  }
  p {
    font-size: $base-logo-title-fontSize;
    position: absolute;
    left: 70px;
  }
}

// 淡入淡出动画
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>