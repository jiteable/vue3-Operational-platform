//进行axios的二次封装: 使用请求与响应拦截器
import axios, { type AxiosInstance, type AxiosResponse, type InternalAxiosRequestConfig } from "axios";

// 基础响应数据类型
export interface BaseResponseData {
  code: number
  message: string
  ok: boolean
}

// 调试环境变量
console.log('VITE_APP_BASE_API:', import.meta.env.VITE_APP_BASE_API);

const request: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API || '/api',//基础路径上会携带/api
  timeout: 5000,//超时时间
})

request.interceptors.request.use(function (config: InternalAxiosRequestConfig) {
  // 在发送请求之前做些什么
  const token = localStorage.getItem("token")

  console.log('Request URL:', config.url)
  console.log('Token exists:', !!token)

  // 如果没有token且不是登录接口，则重定向到登录页
  if (!token && !config.url?.includes('/login')) {
    console.log('No token found, redirecting to login page')
    // 使用 hash 路由格式
    window.location.href = "/#/login"
    return Promise.reject(new Error('No token found'))
  }

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config;
}, function (error: unknown) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
request.interceptors.response.use(function (response: AxiosResponse) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  const { authorization } = response.headers
  if (authorization) {
    localStorage.setItem("token", authorization)
  }

  return response.data;
}, function (error: { response?: { status?: number } }) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  const { status } = error.response || {}
  if (status === 401) {
    localStorage.removeItem("token")
    window.location.href = "/#/login"
  }

  return Promise.reject(error);
});

export default request