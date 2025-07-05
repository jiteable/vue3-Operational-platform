import { useRouter } from 'vue-router'
import useUserStore from '../store/modules/user'

const userStore = useUserStore()
const router = useRouter()

export function Logout() {
  // 清除本地 token
  userStore.userLogout()
  // 跳转到登录页
  router.push('/login')
}
