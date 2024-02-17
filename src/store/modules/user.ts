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
import { constantRoute } from '@/router/routes'
const useuserStore = defineStore('User', {
  state: (): UserState => {
    return {
      token: get_token(),
      menuRoutes: constantRoute,
      username: '',
      avatar: '',
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
        return 'ok'
      } else {
        return Promise.reject(new Error(res.message))
      }
    },
  },
  getters: {},
})
export default useuserStore
