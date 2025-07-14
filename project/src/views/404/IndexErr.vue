<template>
  <div class="error-page">
    <div class="error-container">
      <!-- 404图片 -->
      <div class="error-image">
        <img src="@/assets/images/error_images/404.png" alt="404" />
      </div>

      <!-- 错误信息 -->
      <div class="error-content">
        <h1 class="error-title">404</h1>
        <h2 class="error-subtitle">页面未找到</h2>
        <p class="error-description">抱歉，您访问的页面不存在或已被移除</p>

        <!-- 操作按钮 -->
        <div class="error-actions">
          <el-button
            type="primary"
            size="large"
            @click="goHome"
            class="home-btn"
          >
            <el-icon><House /></el-icon>
            返回首页
          </el-button>

          <el-button size="large" @click="goBack" class="back-btn">
            <el-icon><Back /></el-icon>
            返回上页
          </el-button>
        </div>

        <!-- 装饰元素 -->
        <div class="decoration">
          <div class="floating-shapes">
            <div class="shape shape-1"></div>
            <div class="shape shape-2"></div>
            <div class="shape shape-3"></div>
            <div class="shape shape-4"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Back, House } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 返回首页
const goHome = () => {
  router.push('/')
}

// 返回上一页
const goBack = () => {
  router.go(-1)
}
</script>

<style scoped lang="scss">
.error-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('@/assets/images/error_images/cloud.png') no-repeat center;
    background-size: cover;
    opacity: 0.1;
    animation: float 6s ease-in-out infinite;
  }
}

.error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 600px;
  padding: 2rem;
  position: relative;
  z-index: 2;
}

.error-image {
  margin-bottom: 2rem;

  img {
    max-width: 300px;
    height: auto;
    filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.2));
    animation: bounce 2s ease-in-out infinite;
  }
}

.error-content {
  color: white;
}

.error-title {
  font-size: 6rem;
  font-weight: 900;
  margin: 0;
  background: linear-gradient(45deg, #fff, #f0f0f0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 0 30px rgba(255, 255, 255, 0.5);
  animation: glow 2s ease-in-out infinite alternate;
}

.error-subtitle {
  font-size: 2rem;
  font-weight: 600;
  margin: 1rem 0;
  color: #fff;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.error-description {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.9);
  margin: 1rem 0 2rem;
  line-height: 1.6;
}

.error-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;

  .home-btn {
    background: linear-gradient(45deg, #667eea, #764ba2);
    border: none;
    color: white;
    padding: 12px 24px;
    border-radius: 25px;
    font-weight: 600;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
    }

    .el-icon {
      margin-right: 8px;
    }
  }

  .back-btn {
    background: rgba(255, 255, 255, 0.2);
    border: 2px solid rgba(255, 255, 255, 0.3);
    color: white;
    padding: 12px 24px;
    border-radius: 25px;
    font-weight: 600;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);

    &:hover {
      background: rgba(255, 255, 255, 0.3);
      border-color: rgba(255, 255, 255, 0.5);
      transform: translateY(-2px);
    }

    .el-icon {
      margin-right: 8px;
    }
  }
}

.decoration {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 1;
}

.floating-shapes {
  position: relative;
  width: 100%;
  height: 100%;
}

.shape {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  animation: float 4s ease-in-out infinite;

  &.shape-1 {
    width: 80px;
    height: 80px;
    top: 20%;
    left: 10%;
    animation-delay: 0s;
  }

  &.shape-2 {
    width: 60px;
    height: 60px;
    top: 60%;
    right: 15%;
    animation-delay: 1s;
  }

  &.shape-3 {
    width: 40px;
    height: 40px;
    bottom: 30%;
    left: 20%;
    animation-delay: 2s;
  }

  &.shape-4 {
    width: 100px;
    height: 100px;
    top: 10%;
    right: 30%;
    animation-delay: 3s;
  }
}

// 动画定义
@keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

@keyframes glow {
  from {
    text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
  }
  to {
    text-shadow: 0 0 30px rgba(255, 255, 255, 0.8);
  }
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

// 响应式设计
@media (max-width: 768px) {
  .error-container {
    padding: 1rem;
  }

  .error-title {
    font-size: 4rem;
  }

  .error-subtitle {
    font-size: 1.5rem;
  }

  .error-image img {
    max-width: 200px;
  }

  .error-actions {
    flex-direction: column;
    align-items: center;

    .el-button {
      width: 200px;
    }
  }
}

@media (max-width: 480px) {
  .error-title {
    font-size: 3rem;
  }

  .error-subtitle {
    font-size: 1.2rem;
  }

  .error-description {
    font-size: 1rem;
  }
}
</style>
