// 引入项目中全部的全局组件
import SvgIcon from '@/components/SvgIcon/indexSvg.vue'
import Pagination from '@/components/Pagination/indexPag.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const allGloableComponents = { SvgIcon, Pagination }
//暴露插件对象
import type { App } from 'vue'

export default {
  install(app: App) {
    Object.keys(allGloableComponents).forEach((key) => {
      app.component(key, allGloableComponents[key as keyof typeof allGloableComponents])
    })
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  }
}