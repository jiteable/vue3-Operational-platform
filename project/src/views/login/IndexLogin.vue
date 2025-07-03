<template>
  <div class="login-container">
    <div class="login-bg">
      <img
        src="@/assets/images/background.jpg"
        alt="background"
        class="bg-img"
      />
    </div>
    <div class="login-form-card">
      <h1>Hello</h1>
      <p>欢迎来到硅谷甄选</p>
      <el-form :model="loginForm" class="login-form">
        <el-form-item>
          <el-input
            v-model="loginForm.username"
            :prefix-icon="User"
            placeholder="请输入用户名"
          />
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="loginForm.password"
            :prefix-icon="Lock"
            :type="showPwd ? 'text' : 'password'"
            placeholder="请输入密码"
            :suffix-icon="showPwd ? 'el-icon-view' : 'el-icon-view-off'"
            @click-suffix="showPwd = !showPwd"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="login-btn" @click="login">
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { User, Lock } from '@element-plus/icons-vue'
import useUserStore from '../../store/modules/user'
import { ElMessage } from 'element-plus'

const loginForm = ref({
  username: '',
  password: '',
})
const showPwd = ref(false)
const showError = ref(false)

const login = async () => {
  try {
    showError.value = false // 清除之前的错误提示
    const userStore = useUserStore()
    const result = await userStore.userLogin(loginForm.value)
    if (result === 'ok') {
      // 登录成功，跳转到首页
      ElMessage.success('登录成功')
      // 这里可以添加路由跳转逻辑
    }
  } catch {
    // 登录失败，显示错误提示
    showError.value = true
    ElMessage.error('用户名或密码错误')
  }
}
</script>

<style scoped lang="scss">
.login-container {
  width: 100vw;
  height: 100vh;
  position: relative;
  background: #2563eb;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
.login-bg {
  position: absolute;
  left: 0;
  top: 0;
  width: 60vw;
  height: 100vh;
  .bg-img {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    object-fit: cover;
    z-index: 0;
  }
}
.login-form-card {
  position: relative;
  z-index: 10;
  width: 400px;
  background: #2266c6 0.5;
  border-radius: 8px;
  padding: 40px 32px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  margin-left: 50vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  h1 {
    color: #fff;
    font-size: 2.5rem;
    margin-bottom: 8px;
  }
  p {
    color: #fff;
    margin-bottom: 32px;
  }
  .login-form {
    width: 100%;
    .login-btn {
      width: 100%;
      font-size: 1.1rem;
      color: black;
    }
  }
  .error-alert {
    margin-top: 16px;
    width: 100%;
  }
}
</style>
