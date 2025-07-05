
import useUserStore from '../store/modules/user'


export async function Logout() {

  const userStore = useUserStore()
  // 清除本地 token
  await userStore.userLogout()
  // 跳转到登录页
  window.location.href = '/#/login'
}
