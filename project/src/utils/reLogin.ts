import { useRouter } from 'vue-router'

const router = useRouter()

export function reLogin() {
  // 清除本地 token
  localStorage.removeItem('token')
  // 跳转到登录页
  router.push('/login')
}
