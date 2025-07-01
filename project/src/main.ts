import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
//svg插件需要的配置代码
import 'virtual:svg-icons-register' // 注册 SVG 精灵图
import SvgIcon from '@/components/SvgIcon.vue'




createApp(App).use(ElementPlus, {
  locale: zhCn
}).component('svg-icon', SvgIcon).mount('#app')


