//用户相关
import { defineStore } from 'pinia'
import type { loginForm } from '@/api/user/type'
import { requestLogin } from '@/api/user'
const useuserStore = defineStore('User', {
  state: () => {
    return {
      token: '',
    }
  },
  actions: {
    async userLogin(data: loginForm) {
      const response: any = await requestLogin(data)
      //   console.log(response)
      if (response.code === 200) {
        this.token = response.data.token
        localStorage.setItem('token', this.token)
      } else {
        return Promise.reject(new Error(response.data.message))
      }
    },
  },
  getters: {},
})
export default useuserStore
