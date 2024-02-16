import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//@ts-expect-error忽略当前文件ts类型的检测否则有红色提示(打包会失败)
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
//引入模版全局样式
import '@/styles/index.scss'
//引入自定义插件对象：注册整个项目的全局组件
import globalComponent from '@/components'
import 'virtual:svg-icons-register'
import { router } from './router'
import  store from './store'

import './permission.ts'
const app = createApp(App)
app.use(ElementPlus, {
  locale: zhCn,
})

//安装自定义插件
app.use(globalComponent)

app.use(router)
app.use(store)
app.mount('#app')
