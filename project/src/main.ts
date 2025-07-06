import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { createApp } from 'vue'
import App from './App.vue'
//svg插件需要的配置代码
import 'virtual:svg-icons-register'; // 注册 SVG 精灵图

//引入自定义插件对象:注册整个项目的全局组件
import globalComponents from '@/components'

//引入路由
import router from './router'

//引入模板的全局的样式
import '@/styles/index.scss'

import pinia from './store/index.ts'

//引入权限管理文件
import './permisstion'

// 最后导入Element Plus样式，确保不被其他样式覆盖
import 'element-plus/dist/index.css'

createApp(App).use(ElementPlus, {
  locale: zhCn
}).use(globalComponents).use(pinia).use(router).mount('#app')


