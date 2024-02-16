//用户相关
import { defineStore } from 'pinia'
import type { loginForm, loginResponseData } from '@/api/user/type'
import { requestLogin, requestUserInfo } from '@/api/user'
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
        this.token = response.data.token as string
        set_token(this.token)
      } else {
        return Promise.reject(new Error(response.data.message))
      }
    },
    async userInfo() {
      const res = await requestUserInfo()
      //   console.log(res)
      if (res.code === 200) {
        this.username = res.data.checkUser.username
        this.avatar = res.data.checkUser.avatar
        return 'ok'
      } else {
        return Promise.reject('获取用户信息失败')
      }
    },
    userLogout() {
      this.token = ''
      this.avatar = ''
      this.username = ''
      remove_token()
    },
  },
  getters: {},
})
export default useuserStore
