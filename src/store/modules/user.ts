//用户相关
import { defineStore } from 'pinia'
import type {
  loginForm,
  loginResponseData,
  userInfoResponseData,
} from '@/api/user/type'
import { requestLogin, requestUserInfo, requestLogout } from '@/api/user'
import { UserState } from './type/types'
import { get_token, set_token, remove_token } from '@/utils/token'
//引入路由
import { constantRoute, asyncRoutes, anyRoutes } from '@/router/routes'
import { router } from '@/router'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import cloneDeep from 'lodash/cloneDeep'

//过滤异步路由
function filterAsyncRoute(asnycRoute: any, routes: any) {
  return asnycRoute.filter((item: any) => {
    if (routes.includes(item.name)) {
      if (item.children && item.children.length > 0) {
        //硅谷333账号:product\trademark\attr\sku
        item.children = filterAsyncRoute(item.children, routes)
      }
      return true
    }
  })
}

const useuserStore = defineStore('User', {
  state: (): UserState => {
    return {
      token: get_token(),
      menuRoutes: constantRoute,
      username: '',
      avatar: '',
      buttons: [],
    }
  },
  actions: {
    async userLogin(data: loginForm) {
      const response: loginResponseData = await requestLogin(data)
      //   console.log(response)
      if (response.code === 200) {
        this.token = response.data as string
        set_token(this.token)
      } else {
        return Promise.reject(new Error(response.data))
      }
    },
    async userInfo() {
      const res: userInfoResponseData = await requestUserInfo()
      //   console.log(res)
      if (res.code === 200) {
        this.username = res.data.name
        this.avatar = res.data.avatar
        const userRoute: any[] = filterAsyncRoute(
          cloneDeep(asyncRoutes),
          res.data.routes,
        )
        this.buttons = res.data.buttons
        console.log(this.buttons)
        this.menuRoutes = [...constantRoute, ...userRoute, anyRoutes]
        //给路由器动态追加路由
        ;[...userRoute, anyRoutes].forEach((route: any) => {
          router.addRoute(route)
        })
        return 'ok'
      } else {
        return Promise.reject(res.message)
      }
    },
    async userLogout() {
      const res: any = await requestLogout()
      if (res.code === 200) {
        this.token = ''
        this.avatar = ''
        this.username = ''
        remove_token()
        asyncRoutes.forEach((route) => {
          router.removeRoute(route.name)
        })
        return 'ok'
      } else {
        return Promise.reject(new Error(res.message))
      }
    },
  },
  getters: {},
})
export default useuserStore
