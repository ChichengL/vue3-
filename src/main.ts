import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'element-plus/dist/index.css'
//引入模版全局样式
import '@/styles/index.scss'
//引入自定义插件对象：注册整个项目的全局组件
import globalComponent from '@/components'
import 'virtual:svg-icons-register'
import { router } from './router'
import store from './store'
//暗黑模式
import 'element-plus/theme-chalk/dark/css-vars.css'
import './permission.ts'
import { isHasButton } from './directive/has.ts'
const app = createApp(App)
isHasButton(app)
//安装自定义插件
app.use(globalComponent)

app.use(router)
app.use(store)
app.mount('#app')
