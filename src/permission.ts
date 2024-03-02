import { router } from '@/router'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import store from './store'
import useuserStore from './store/modules/user'
nprogress.configure({ showSpinner: false })
const userStore = useuserStore(store)

router.beforeEach(async (to: any, _from: any, next: any) => {
  //   document.title = 'cc后台管理系统-' + to.meta.path
  nprogress.start()
  const token = userStore.token
  const username = userStore.username
  if (token) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      if (username) {
        next()
      } else {
        try {
          await userStore.userInfo()
          //防止还没获取路由信息就进入异步组件
          next({ ...to })
        } catch (error) {
          await userStore.userLogout()
          next({ path: '/login', query: { redirect: to.path } })
        }
      }
    }
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next({ path: '/login', query: { redirect: to.path } })
    }
  }
})

router.afterEach(() => {
  nprogress.done()
})

//路由鉴权
