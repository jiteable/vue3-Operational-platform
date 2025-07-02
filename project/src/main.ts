import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
//svg插件需要的配置代码
import 'virtual:svg-icons-register' // 注册 SVG 精灵图


//引入自定义插件对象:注册整个项目的全局组件
import globalComponents from '@/components'

//引入路由
import router from './router'

//引入模板的全局的样式
import '@/styles/index.scss'

createApp(App).use(ElementPlus, {
  locale: zhCn
}).use(globalComponents).use(router).mount('#app')


