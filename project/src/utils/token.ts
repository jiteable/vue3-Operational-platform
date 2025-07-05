// Token 过期时间管理
const TOKEN_KEY = 'token'
const TOKEN_EXPIRE_KEY = 'token_expire'

export const setToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token)

  // 如果没有传入过期时间，默认设置为 24 小时后过期
  const expire = 24 * 60 * 60 * 1000
  localStorage.setItem(TOKEN_EXPIRE_KEY, expire.toString())
}

export const getToken = () => {
  return localStorage.getItem('token')
}

export const removeToken = () => {
  localStorage.removeItem('token')
}