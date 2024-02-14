//用户相关
import request from '@/utils/request'
import { loginForm, loginResponseData, userResponseData } from './type'

enum API {
  LOGIN_URL = '/user/login',
  USERINFO_URL = '/user/info',
}
export const requestLogin = (data: loginForm) =>
  request.post<any, loginResponseData>(API.LOGIN_URL, data)
export const requestUserInfo = () =>
  request.get<any, userResponseData>(API.USERINFO_URL)
