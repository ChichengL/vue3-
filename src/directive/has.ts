import { App } from 'vue'
import store from '@/store'
import useuserStore from '@/store/modules/user.ts'
const userStore = useuserStore(store)
export const isHasButton = (app: App) => {
  //实现全局自定义指令,实现按钮权限
  app.directive('has', {
    mounted(el: any, options: any) {
      if (!userStore.buttons.includes(options.value)) {
        el.parentNode.removeChild(el)
      }
    },
  })
}
