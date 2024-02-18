//引入项目中的全局组件
import SvgIcon from './SvgIcon/index.vue'
import { App } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import Category from './Category/index.vue'
const allGlobalComponents: any = { SvgIcon, Category }
export default {
  install(app: App) {
    Object.keys(allGlobalComponents).forEach((item) => {
      app.component(item, allGlobalComponents[item])
    })
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  },
}
